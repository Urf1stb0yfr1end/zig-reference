# Agentic Snowball Batch 05

## Baseline and scope

The batch started at commit `6fd379c` with Zig 0.14.0, 52 contracted modules, 47 full Agent Fast Path cards, and five partial cards. The five examined modules were `semantic-version`, `tagged-result`, `source-span`, `owned-byte-buffer`, and `intrusive-doubly-linked-list`; canonical source, tests, dependency contracts, and public surfaces supported promoting all five. The final projection is 52 full and 0 partial. No Morphic Alpine or formal benchmark work was started.

## Final five cards

All five cards now use functional named-import examples and exact public operations rather than declaration traversal.

- `semantic-version` records copied inline values, no allocation or errors, lexicographic comparison, same-major compatibility, and explicitly rejects parsing, ranges, metadata, and major-zero policy claims.
- `tagged-result` records its real `Success` and `Failure` comptime types, exclusive union tags, copied payload values (which can themselves contain references), and the important correction that the failure tag is not a Zig error and inspection is not fallible.
- `source-span` records the distinct `InvalidOrder`/`init` and `OutOfBounds`/`slice` mappings, half-open offsets, the borrowed source slice, and source-driven invalidation. It claims no source ownership or arbitrary resource limit.
- `owned-byte-buffer` records explicit allocator ownership/cleanup, allocation through `dynamic-array`, storage transfer to `ByteWriter`, borrowed mutable and immutable views, all mutation/reset/deinit invalidation boundaries, unspecified growth factor, and tested allocation-failure atomicity.
- `intrusive-doubly-linked-list` records the real `T` comptime parameter, caller-owned stable nodes, linkage ownership, double-insertion rejection, foreign removal behavior, link clearing, pointer invalidation, and the absence of allocation or list-owned cleanup.

## Debug Fast Path protocol

The existing module diagnostics remain canonical evidence records. The single generated `generated/agent/diagnostics.json` projection now adds compact lookup facts: canonical ID, aliases, category, summary, module, operation/phase, violated invariant, observed and expected conditions, native symptom aliases, evidence classification/status, repair status and strategy, exact validation command, and minimum useful locations. Generated confidence does not exceed module-authored evidence.

Canonical IDs retain the grammar `ZIGREF-[A-Z0-9-]+`. The actual category vocabulary is `ARITH`, `BOUNDS`, `CONTRACT`, `DEPENDENCY`, `INPUT`, `LIFETIME`, `RESOURCE`, and `STATE`. No category was added merely for completeness. The historical alias `ZIGREF-TOPOLOGICAL-CYCLE` resolves explicitly to `ZIGREF-TOPO-CYCLE`; no published canonical ID was renamed or reused.

The new deterministic command `python3 tools/query-reference.py agent diagnose TERM` searches only the committed projection—never source, network, embeddings, or a database. Exact canonical IDs, historical aliases, and native aliases rank above bounded loose matches; output is capped at five candidates and states why each matched. Authored native aliases include real Zig errors such as `error.Cycle`, `error.InvalidNode`, `error.DoubleFree`, `error.TraceFull`, `error.OutputTooSmall`, and the resource-plan errors. These aliases are candidates, not assertions that every occurrence has one unique cause. An unmatched term returns `status: unknown`, no candidates, and an explicitly unclassified diagnostic rather than a fabricated cause.

Validator self-tests now reject an unknown category, invalid repair status, alias collision, nonexistent diagnostic location/evidence, and nonexistent focused validation command in addition to the existing duplicate ID, missing fixture/repair, invalid dependency, unsupported evidence, and contract tests. Zero-context acceptance verifies exact and historical lookup, native and short-symptom discovery, bounded results, complete repair information, unknown behavior, and absence of declaration traversal in the final five cards.

## Reproducible cost measurements

Byte counts include the terminating newline from the exact compact JSON command output.

| Module/path | Select bytes | Integrate bytes | Ordinary reuse files | Implementation source required | Repair source inspection required |
|---|---:|---:|---:|---|---|
| semantic-version | 1,039 | 1,278 | 1 generated card | no | no known diagnostic |
| tagged-result | 1,028 | 1,261 | 1 generated card | no | no known diagnostic |
| source-span | 975 | 1,600 | 1 generated card | no | no known diagnostic |
| owned-byte-buffer | 1,060 | 2,332 | 1 generated card | no | no known diagnostic |
| intrusive-doubly-linked-list | 1,125 | 1,992 | 1 generated card | no | no known diagnostic |
| `diagnose error.Cycle` | — | — | 256-byte candidate projection | no | no |
| `diagnostic ZIGREF-TOPO-CYCLE` | — | — | 1,298-byte repair projection | no | no |

The measurements used `python3 tools/query-reference.py agent card MODULE --view select`, `--view integrate`, `agent diagnose error.Cycle`, and exact diagnostic lookup. Ordinary reuse needs only the generated card; the canonical `details.json` is the next disclosure level when more context is needed.

## Tooling truth and limitations

Native Zig errors remain unchanged. The Debug Fast Path is repair memory, not causal inference. Diagnostic operation data for older fixtures is conservatively described as a module contract invariant where a narrower authored phase is unavailable. There is no replacement graph beyond the one explicit compatibility alias, no claim that all native errors are cataloged, and no diagnosis for unknown symptoms. Repository-owned outer Developer Minimus commands continue to wait for their raw Zig child, emit exactly one final `LOCATIONS` then `MINIMUS`, and preserve child exit status; raw build prerequisites do not emit nested handoffs.

No silent/ambiguous failure conversion was found in the touched query/index/validation path. Index read failure, stale generation, validator failure, and unknown diagnosis remain visibly distinct and preserve nonzero status where the operation itself fails. Candidate absence is a successful information-retrieval result with explicit `unknown`, not a false PASS diagnosis.

## Validation

The run exercised the five focused unit and smoke targets, deterministic generation, command-reference drift, Agent Fast Path acceptance, diagnostic validator negative tests, Developer Minimus truthfulness, exact/native/short/unknown lookup, and all four canonical outer aggregate commands. Repository validation covered formatting, contracts, evidence, recipes, conformance, property, differential, fuzz-smoke, deterministic indexes, root-policy negative testing, and text-only policy. All completed successfully under Zig 0.14.0.

The recommended next frontier is evidence-driven whole-system composition and controlled cold-agent benchmarking, using Morphic only as the flagship pressure test after this batch—not Morphic Alpine implementation in this batch.
