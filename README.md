# Farnsworth SYNTEK

**7-layer recursive agent memory with context branching, holographic recall, and on-chain persistence.**

SYNTEK (Synthetic Yield Network for Token Extraction & Knowledge) gives AI agents persistent, evolving memory that survives across sessions, devices, and time.

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
| `syntek_session_end` | Consolidate + encrypt + sync to chain |
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
- AES-256-GCM encrypted on-chain persistence
- Zero-knowledge: your master key never touches our servers

## Credentials

Credentials are stored in `~/.farnsworth/vault.enc` — encrypted, portable across machines.

```bash
npx farnsworth-syntek status   # Check subscription
npx farnsworth-syntek revoke   # Securely erase credentials
```

Or use environment variables:
```bash
export SYNTEK_API_KEY=farn_...
export SYNTEK_MASTER_KEY=...
export SYNTEK_GATEWAY=https://ai.farnsworth.cloud
```

## API Documentation

Full API docs: [ai.farnsworth.cloud/memory/skill](https://ai.farnsworth.cloud/memory/skill)

## Payment

- **$100 / 90 days** via x402 protocol
- Accepted: SOL, MON (Monad), USDC (Base/Solana)
- Gas fees for on-chain memory sync (per session)

## License

Proprietary — Farnsworth Labs. All rights reserved.

---

[ai.farnsworth.cloud/memory](https://ai.farnsworth.cloud/memory)
