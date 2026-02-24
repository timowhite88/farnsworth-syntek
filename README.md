# Farnsworth SYNTEK

**7-layer recursive agent memory with context branching, holographic recall, and on-chain persistence.**

SYNTEK (Synthetic Yield Network for Token Extraction & Knowledge) gives AI agents persistent, evolving memory that survives across sessions, devices, and time. Memory is encrypted and stored on-chain via [DropClaw](https://github.com/timowhite88/dropclaw) — files go directly on-chain as Monad calldata.

## Quick Start

### 1. Subscribe
```bash
npx farnsworth-syntek setup
```
Walks you through x402 payment ($100 / 90 days) and securely stores your credentials.

### 2. Connect to Claude Code
```bash
claude mcp add farnsworth-syntek -- npx farnsworth-syntek-mcp
```

### 3. Use Memory
Your agent now has 10 MCP tools:

| Tool | Description |
|------|-------------|
| `syntek_recall` | Search memory across all 7 layers (holographic recall) |
| `syntek_store` | Store knowledge — auto-detects the right layer |
| `syntek_learn` | Process conversation history into memory |
| `syntek_identity` | Get/set core identity (always in context) |
| `syntek_graph` | Query the knowledge graph |
| `syntek_branch` | Create parallel context branches |
| `syntek_context` | Get context snapshot for prompt injection |
| `syntek_status` | Check memory system status |
| `syntek_session_end` | Consolidate + encrypt + upload memory to chain via DropClaw |
| `syntek_subscribe` | Check subscription status |

## Architecture



**7 Memory Layers:**
- **L1 Identity** — Core traits, always in context
- **L2 Active Context** — Working memory with branching
- **L3 Episodic** — Timestamped experiences
- **L4 Semantic** — Facts and knowledge
- **L5 Procedural** — How-to patterns
- **L6 Graph** — Entity relationships with temporal decay
- **L7 Synthesis** — Cross-domain insights

**Key Features:**
- Holographic recall (BM25 + vector + graph + recency fusion)
- Context branching (multiverse memory)
- SYNTEK 5-pass knowledge compiler
- Dream consolidation (session-end compression)
- AES-256-GCM encrypted on-chain persistence via DropClaw
- Files go directly on-chain as Monad calldata — Syntek never stores user data

## On-Chain Persistence

Syntek uses DropClaw for permanent memory storage on Monad blockchain:

1. On session end, memory is consolidated and compressed (dream consolidation)
2. Consolidated memory is encrypted client-side (AES-256-GCM) — encryption keys stay with the user
3. Encrypted blob is written directly on-chain as Monad calldata via DropClaw
4. On next session, memory is loaded from chain and decrypted locally

**Syntek subscription includes DropClaw access for Syntek memory uploads** — the $30 DropClaw service fee is waived. User still pays Monad gas fees for on-chain storage.

## Credentials

Credentials are stored in `~/.farnsworth/vault.enc` — encrypted, portable across machines.

```bash
npx farnsworth-syntek status   # Check subscription
npx farnsworth-syntek revoke   # Securely erase credentials
```

Or use environment variables:
```bash
export SYNTEK_API_KEY=farn_...
export SYNTEK_GATEWAY=https://ai.farnsworth.cloud
```

## API Documentation

Full API docs: [ai.farnsworth.cloud/memory/skill](https://ai.farnsworth.cloud/memory/skill)

## Payment

- **$100 / 90 days** via x402 protocol
- Accepted: SOL, MON (Monad), USDC (Base)
- Includes DropClaw access for Syntek memory uploads (gas only, no $30 service fee)
- Gas fees for on-chain memory sync (per session)

## Ecosystem

- **Syntek** — Agent memory engine ($100/90 days, includes DropClaw for Syntek uploads — gas only)
- **[DropClaw](https://github.com/timowhite88/dropclaw)** — Encrypted on-chain storage ($30 + gas, Syntek subscribers pay gas only for Syntek uploads)
- **[PlanetExpress](https://github.com/timowhite88/farnsworth-planetexpress)** — Agent marketplace ($30 to list, $15 for Syntek subscribers)

## License

Proprietary — Farnsworth Labs. All rights reserved.

---

[ai.farnsworth.cloud/memory](https://ai.farnsworth.cloud/memory)
