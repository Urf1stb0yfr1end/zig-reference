# Agentic Snowball Batch 01

## Scope and method

This batch migrates exactly ten existing canonical `details.json` contracts to the
already-established Agent Contract v2 projection. It does not change the schema,
query language, generator, or Zig 0.14.0 baseline.

The selection was made from `agent impact` results for all 45 partial modules.
Ranking used, in order, transitive dependents, direct dependents, recipe
participation, removal of partial foundations from an already-full module's
dependency closure, and primitive reuse. No synthetic score was assigned.

## Selected foundation set

| Rank | Module | Mechanical leverage rationale |
|---:|---|---|
| 1 | `fixed-capacity-vector` | Four direct and six transitive dependents; it is in the closure of the already-full priority queue, topological sort, and resource planner. |
| 2 | `bounded-byte-reader` | Six direct/transitive parser dependents and two recipes, making it the broadest binary-reading foundation. |
| 3 | `checked-integer-cast` | Five direct/transitive dependents, including the already-full bounded resource planner and four binary/ELF modules. |
| 4 | `checked-half-open-range` | Four direct/transitive memory and ELF dependents plus the checked-memory-range recipe. |
| 5 | `distinct-memory-address-types` | Four direct/transitive memory dependents plus the physical-page-frame recipe. |
| 6 | `endian-integer-codec` | Four direct/transitive parser dependents plus the explicit-endian record recipe. |
| 7 | `aligned-address-and-size-helpers` | Three dependents, one recipe, and removal of another partial foundation from the already-full resource planner closure. |
| 8 | `bitmap-allocator` | Two direct dependents, including the already-full object pool, and one additional transitive allocator dependent. |
| 9 | `byte-writer` | One direct dependent and the explicit-endian record recipe; it completes the write/read/codec composition. |
| 10 | `generational-handles` | One direct dependent, the already-full object pool, plus the stale-safe registry recipe. |

The first eight ranks maximize graph reach. `byte-writer` and
`generational-handles` then maximize recipe completion and improve the closures of
already-full modules. This is why lower-impact standalone modules and the
higher-level binary cursor remain for a later batch.

## Before and after

| Measure | Before | After |
|---|---:|---:|
| Contracted modules | 52 | 52 |
| Full fast-path modules | 7 | 17 |
| Partial modules | 45 | 35 |
| Selected modules | 0 migrated in this batch | 10 migrated in this batch |
| Unique direct dependents improved | 0 | 15 |
| Unique transitive dependents touched | 0 | 15 |
| Recipes with more full modules in their closure | 0 | 5 |

The affected recipes are `create-stale-safe-object-registry`,
`normalize-checked-memory-range`, `parse-length-prefixed-record`,
`validate-physical-page-frame`, and
`write-and-read-explicit-endian-record`. The last recipe gains three full
components; the other four gain one or two.

## Fast-path byte measurements

Sizes are exact stdout byte counts from
`python3 tools/query-reference.py agent card MODULE --view VIEW`, including its
trailing newline. Before values were measured in a detached worktree at the batch
baseline; those responses are intentionally small partial-module notices. After
values are the generated full cards.

| Module | Select before | Select after | Integrate before | Integrate after | Source files needed for ordinary use before / after |
|---|---:|---:|---:|---:|---:|
| `fixed-capacity-vector` | 156 | 1047 | 368 | 1637 | 1 / 0 |
| `bounded-byte-reader` | 152 | 1068 | 428 | 1622 | 1 / 0 |
| `byte-writer` | 136 | 909 | 388 | 1394 | 1 / 0 |
| `bitmap-allocator` | 146 | 1080 | 362 | 1587 | 1 / 0 |
| `generational-handles` | 154 | 1125 | 398 | 1455 | 1 / 0 |
| `checked-integer-cast` | 154 | 994 | 363 | 1114 | 1 / 0 |
| `aligned-address-and-size-helpers` | 178 | 979 | 455 | 1459 | 1 / 0 |
| `checked-half-open-range` | 160 | 1011 | 410 | 1432 | 1 / 0 |
| `distinct-memory-address-types` | 172 | 1112 | 438 | 1369 | 1 / 0 |
| `endian-integer-codec` | 154 | 1023 | 402 | 970 | 1 / 0 |

“Source files needed” counts source files that must be opened to answer the
minimum-read-set questions for ordinary selection and integration. Before, each
partial response directed the agent onward and source remained authoritative for
missing operational facts. After, select and integrate cards contain the required
contract facts, so ordinary use requires no source file; debugging or modification
still does.

## Contract content and evidence

Each selected contract now records selection and rejection criteria, controlled
capabilities, exact named import and public symbols, graph-derived dependencies,
ownership and borrowing, invalidation, errors and failure guarantees, effects,
environment and resource constraints, construction, operation maps, composition,
determinism scope, gaps, minimal usage, and focused validation commands.

No implementation behavior was changed. No proof contract or diagnostic was
manufactured: all ten projections use `proof_contract: null`, empty diagnostic
lists, and matching empty fixture-expectation manifests. Existing unit and smoke
tests remain the validation evidence. Canonical uncertainty is retained for the
`byte-writer` hosted/freestanding contract, and its allocator-backed growth is
reported rather than described as allocation-free.

The migration exposed incomplete older descriptive metadata for `byte-writer`
(blank purpose/discovery fields and unknown compatibility) and sparse descriptive
metadata for `endian-integer-codec`. The Agent Contract projection fills only the
facts supported by existing public signatures, dependencies, source behavior, and
tests; it does not silently strengthen the unknown compatibility claims.

## Representative fast-path acceptance

- `agent decide` selects `fixed-capacity-vector` first for an allocation-free,
  compile-time-capacity mutable sequence.
- The `byte-writer` select card rejects fixed-capacity or allocation-free output;
  the resource profile reports allocator-backed, unbounded growth.
- `agent card bounded-byte-reader --view integrate` returns construction,
  borrow/invalidation rules, operation and error maps, both matching recipes, and
  exact focused validation commands without source access.
- `agent compose bounded-system-resource-planning` resolves an eight-module build
  order whose closure crosses three migrated foundations:
  `aligned-address-and-size-helpers`, `checked-integer-cast`, and
  `fixed-capacity-vector`.
- `agent impact fixed-capacity-vector` reports four direct dependents, six
  transitive dependents, affected contracts, and focused/aggregate validation.
- This batch adds no legitimate diagnostic. Querying an unknown `ZIGREF-*` ID
  returns an empty partial result rather than inventing repair evidence.
- Composing `capability-that-does-not-exist` reports it in
  `missing_capabilities`, with no guessed module or build order.

## Determinism and validation

The agent indexes were regenerated from canonical contracts. A second generator
run produced no Git diff. The validator self-test passed all negative cases. All
focused, aggregate, formatting, command-reference, smoke, recipe, conformance, and
repository validation gates listed in the batch request were then run under Zig
0.14.0.

## Next partial frontier

The next highest-leverage partial candidates are:

1. `binary-cursor-checkpoint` (five direct/transitive parser dependents and one recipe);
2. `validated-enum-decoder` (three direct and four transitive ELF/memory dependents);
3. `bounded-binary-sub-reader` (three dependents and the parser recipe);
4. `bit-set` (two direct and three transitive allocator dependents);
5. `dynamic-array` (three direct dependents, including the now-full byte writer);
6. `physical-page-frame-number-and-address-conversion` (two memory dependents and one recipe).

This frontier continues the same graph-first migration without changing Agent
Contract v2.
