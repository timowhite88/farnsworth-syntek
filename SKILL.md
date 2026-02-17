# SYNTEK Memory Service

> 7-layer recursive agent memory with context branching, holographic recall, and on-chain persistence.

## Endpoint

`https://ai.farnsworth.cloud/memory`

## Authentication

All routes except `/memory/health` and `/memory/skill` require an API key:
```
Authorization: Bearer <api-key>
```
Or:
```
X-API-Key: <api-key>
```

## MCP Integration

```bash
claude mcp add farnsworth-syntek -- npx farnsworth-syntek-mcp
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `syntek_recall` | Search memory across all 7 layers |
| `syntek_store` | Store knowledge to a specific layer |
| `syntek_learn` | Process conversation into structured memory via 5-pass compiler |
| `syntek_identity` | Get/set core identity genome |
| `syntek_graph` | Query knowledge graph (entities, paths, neighborhoods) |
| `syntek_branch` | Manage context branches (create, switch, merge, delete) |
| `syntek_context` | Get current context snapshot with budget info |
| `syntek_status` | Check memory status across all layers |
| `syntek_session_end` | Trigger dream consolidation + prepare for upload |
| `syntek_subscribe` | Initiate on-chain subscription |

## REST API

### Public

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/memory/health` | Health check |
| `GET` | `/memory/skill` | This file |

### Authenticated

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/memory/recall` | Search memory — `{ query, topK?, layers?, minRelevance? }` |
| `POST` | `/memory/store` | Store knowledge — `{ content, layer?, importance?, tags? }` |
| `GET` | `/memory/identity` | Get identity genome |
| `PUT` | `/memory/identity` | Update identity — `{ preferences }` |
| `GET` | `/memory/status` | Full memory status with layer stats |
| `POST` | `/memory/branch` | Create branch — `{ name }` |
| `GET` | `/memory/branch` | List branches |
| `DELETE` | `/memory/branch` | Delete branch — `{ name }` |
| `POST` | `/memory/branch/merge` | Merge branch — `{ name, strategy? }` |
| `POST` | `/memory/subscribe` | Start subscription — `{ wallet, tier }` |
| `GET` | `/memory/subscribe` | Check subscription status |
| `POST` | `/memory/sync` | Sync to chain (subscribers only) |

## Memory Layers

| # | Layer | Purpose | Token Budget |
|---|-------|---------|-------------|
| L1 | **Identity** | Core preferences, personality, style | 200 |
| L2 | **Active Context** | Working memory with branch support | 2,000 |
| L3 | **Episodic** | Session journal with temporal compression | 16,000 |
| L4 | **Semantic** | Factual knowledge with abstraction levels | 32,000 |
| L5 | **Procedural** | Learned workflows and patterns | 16,000 |
| L6 | **Graph** | Entity-relationship knowledge graph | 32,000 |
| L7 | **Synthesis** | Cross-domain insights and meta-knowledge | 24,000 |

## SYNTEK Compiler (5-Pass)

1. **Extract** — Pull structured knowledge from raw input
2. **Integrate** — Merge with existing knowledge, resolve conflicts
3. **Abstract** — Climb the abstraction ladder (instance > category > concept > principle > axiom)
4. **Synthesize** — Find cross-domain patterns, generate insights
5. **Compress** — Minimize token footprint, maximize information density

## Example Usage

```bash
# Health check
curl https://ai.farnsworth.cloud/memory/health

# Store knowledge
curl -X POST https://ai.farnsworth.cloud/memory/store \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"content": "React hooks enable stateful functional components", "layer": "semantic"}'

# Recall
curl -X POST https://ai.farnsworth.cloud/memory/recall \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "React state management", "topK": 5}'

# Get status
curl https://ai.farnsworth.cloud/memory/status \
  -H "Authorization: Bearer YOUR_KEY"
```
