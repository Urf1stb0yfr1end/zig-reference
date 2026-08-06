# Agent Readability Pilot

This report defines reproducible retrieval expectations, not performance benchmarks. Start every scenario with `tools/query-reference.py`; open canonical contracts before source.

| Scenario / reproducible prompt | Expected result | Files to open, in order | Diagnostic | Maximum intended retrieval path | Facts that must not be guessed |
|---|---|---|---|---|---|
| “Select a deterministic aligned allocator backed by caller-owned memory.” | `fixed-bump-allocator` | `generated/agent/modules.json`, module `details.json`, `src/fixed_bump_allocator.zig` | none | index → contract → source | alignment errors, backing lifetime, reset invalidation |
| “Can fixed-bump-allocator independently free arbitrary allocations?” | Reject it | module `details.json`, source | none | contract → source | no independent deallocation exists |
| “Find stale-handle-safe bounded object storage.” | `fixed-capacity-object-pool` | agent module result, `details.json`, source | `ZIGREF-POOL-STALE-HANDLE` | query → contract → source | capacity, generation behavior, reset effects |
| “Find the plan-bounded-initialization recipe.” | `plan-bounded-initialization` | `generated/agent/recipes.json`, `recipes/plan-bounded-initialization/recipe.json`, recipe source | none | recipe index → recipe contract → source | recipe validation status and exact dependencies |
| “Identify and repair use-after-reset in the bump allocator.” | Do not retain/use old slices; allocate again after reset | diagnostic query, bump `details.json`, failing fixture, repair fixture, source | `ZIGREF-BUMP-USE-AFTER-RESET` | diagnostic → contract → fixture/repair → source | Zig does not statically reject this misuse |
| “What happens when topological sort sees a cycle?” | `sort` returns `error.Cycle` | module query, topological `details.json`, source test | `ZIGREF-TOPO-CYCLE` | query → contract → source test | no partial order is returned; graph capacity is fixed |

## Reproducible commands

```text
python3 tools/query-reference.py agent capability aligned-allocation
python3 tools/query-reference.py agent module fixed-bump-allocator
python3 tools/query-reference.py agent module fixed-capacity-object-pool
python3 tools/query-reference.py recipe plan-bounded-initialization
python3 tools/query-reference.py agent diagnostic ZIGREF-BUMP-USE-AFTER-RESET
python3 tools/query-reference.py agent diagnostic ZIGREF-TOPO-CYCLE
```

## Limits

The projection covers five modules only. Diagnostics are stable documentation identifiers, not evidence that an analyzer exists. Static contracts and tests are not formal proofs. Query results narrow retrieval; source remains authoritative.
