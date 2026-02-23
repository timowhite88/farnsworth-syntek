/**
 * Farnsworth SYNTEK v1.0.1
 * (c) 2026 Farnsworth Labs — All rights reserved.
 * PROPRIETARY AND CONFIDENTIAL. Unauthorized copying prohibited.
 * This software is protected by international copyright law.
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DEFAULT_GATEWAY = "https://ai.farnsworth.cloud";
const VERSION = "1.0.1";

class SyntekClient {
  constructor(opts = {}) {
    this.gateway = (opts.gateway || process.env.SYNTEK_GATEWAY || DEFAULT_GATEWAY).replace(/\/+$/, "");
    this.apiKey = opts.apiKey || process.env.SYNTEK_API_KEY || null;
    this.masterKey = opts.masterKey || process.env.SYNTEK_MASTER_KEY || null;
    this._licensed = false;
    this._licenseCheckAt = 0;
    this._licenseCheckResult = null;

    if (!this.apiKey) {
      // Try reading from encrypted vault
      this._loadVaultKey();
    }
    if (!this.apiKey) {
      throw new Error(
        "API key required. Set SYNTEK_API_KEY env var, pass apiKey in constructor, " +
        "or run: npx farnsworth-syntek setup"
      );
    }
    this._startHeartbeat();
  }

  _loadVaultKey() {
    try {
      const vaultPath = path.join(
        process.env.HOME || process.env.USERPROFILE || "/tmp",
        ".farnsworth",
        "vault.enc"
      );
      if (fs.existsSync(vaultPath)) {
        const data = JSON.parse(fs.readFileSync(vaultPath, "utf8"));
        if (data.apiKey) this.apiKey = data.apiKey;
        if (data.gateway) this.gateway = data.gateway;
        if (data.masterKey) this.masterKey = data.masterKey;
      }
    } catch {}
  }

  _startHeartbeat() {
    // Periodic license validation (every 30 min)
    this._heartbeatInterval = setInterval(async () => {
      try { await this._validateLicense(); } catch {}
    }, 30 * 60 * 1000);
    if (this._heartbeatInterval.unref) this._heartbeatInterval.unref();
  }

  async _validateLicense() {
    const now = Date.now();
    if (this._licensed && now - this._licenseCheckAt < 30 * 60 * 1000) return true;
    try {
      const resp = await this._get("/memory/subscribe");
      this._licensed = resp.subscribed === true || resp.plan === "pro";
      this._licenseCheckAt = now;
      this._licenseCheckResult = resp;
      return this._licensed;
    } catch {
      // If server is unreachable, allow cached license
      if (this._licensed) return true;
      return false;
    }
  }

  _getClientHash() {
    try {
      const filePath = __filename;
      const content = fs.readFileSync(filePath, "utf8");
      return crypto.createHash("sha256").update(content).digest("hex").slice(0, 16);
    } catch {
      return "unknown";
    }
  }

  async _checkIntegrity() {
    return this._validateLicense();
  }

  _headers() {
    const h = {
      "Content-Type": "application/json",
      "X-Client-Version": VERSION,
      "Authorization": `Bearer ${this.apiKey}`,
    };
    const hash = this._getClientHash();
    if (hash) h["X-Client-Hash"] = hash;
    return h;
  }

  async _handle(resp) {
    if (!resp.ok) {
      const body = await resp.text();
      let msg;
      try { msg = JSON.parse(body).error || body; } catch { msg = body; }
      throw new Error(msg);
    }
    return resp.json();
  }

  async _get(endpoint) {
    const headers = this._headers();
    delete headers["Content-Type"];
    const resp = await fetch(`${this.gateway}${endpoint}`, { method: "GET", headers });
    return this._handle(resp);
  }

  async _post(endpoint, body = {}) {
    const resp = await fetch(`${this.gateway}${endpoint}`, {
      method: "POST",
      headers: this._headers(),
      body: JSON.stringify(body),
    });
    return this._handle(resp);
  }

  // --- Public API ---

  async recall(query, opts = {}) {
    await this._checkIntegrity();
    const body = typeof query === "string"
      ? { query, top_k: opts.topK || opts.top_k || 5 }
      : { ...query, top_k: query.top_k || query.topK || 5 };
    if (opts.layers) body.layers = opts.layers;
    if (opts.minRelevance) body.minRelevance = opts.minRelevance;
    return this._post("/memory/recall", body);
  }

  async store(content, layer, opts = {}) {
    await this._checkIntegrity();
    const body = { content };
    if (layer) body.layer = layer;
    if (opts.importance) body.importance = opts.importance;
    if (opts.tags) body.tags = opts.tags;
    if (opts.type) body.type = opts.type;
    if (opts.compile) body.compile = true;
    if (opts.metadata) body.metadata = opts.metadata;
    return this._post("/memory/store", body);
  }

  async learn(messages, opts = {}) {
    await this._checkIntegrity();
    return this._post("/memory/store", {
      content: JSON.stringify(messages),
      layer: "episodic",
      tags: ["conversation"],
      ...opts,
    });
  }

  async getIdentity() {
    await this._checkIntegrity();
    return this._get("/memory/identity");
  }

  async setIdentity(fields) {
    await this._checkIntegrity();
    return this._post("/memory/store", {
      content: JSON.stringify(fields),
      layer: "identity",
    });
  }

  async getBranches() {
    await this._checkIntegrity();
    return this._get("/memory/branch");
  }

  async createBranch(name, description) {
    await this._checkIntegrity();
    return this._post("/memory/branch", { name, description });
  }

  async getContext() {
    await this._checkIntegrity();
    return this._get("/memory/status");
  }

  async getStatus() {
    await this._checkIntegrity();
    return this._get("/memory/status");
  }

  async endSession() {
    await this._checkIntegrity();
    const headers = this._headers();
    if (this.masterKey) headers["X-Master-Key"] = this.masterKey;
    const resp = await fetch(`${this.gateway}/memory/sync`, {
      method: "POST",
      headers,
      body: JSON.stringify({}),
    });
    return this._handle(resp);
  }

  async subscribe(opts = {}) {
    return this._post("/memory/subscribe", opts);
  }

  async loadFromChain(opts = {}) {
    await this._checkIntegrity();
    return this._post("/memory/sync/load", opts);
  }

  destroy() {
    if (this._heartbeatInterval) {
      clearInterval(this._heartbeatInterval);
      this._heartbeatInterval = null;
    }
  }
}

module.exports = { SyntekClient };
