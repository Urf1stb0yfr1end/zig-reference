# Agentic Snowball Batch 07 — Correct-Use Preflight

## Baseline and starting state

Base commit: `bda669e` (`Strengthen Batch 07 with Batch 06 semantic repair gates`). The checkout has no `origin` remote and `/root/dev/zig-reference` does not exist, so the requested pull could not execute and work continued in the supplied `/workspace/zig-reference` checkout. Zig reports 0.14.0.

Batch 06 started with 53 contracted modules, 53 full Agent Fast Path cards, no partial cards, the bounded deterministic scheduler, and the `run-hosted-morphic-runtime` recipe. Its functional behavior remained intact. No `benchmark-pre-morphic-52` content or tag was modified.

## Phase 0 integrity repairs

The scheduler's authored `port.js` named its dependency `FixedPriorityQueue` as the scheduler's public surface even though canonical `details.json` and Zig source export `Task` and `BoundedDeterministicScheduler`. The generator already derives public surface from `details.json`; the checker only compared shape, identity, dependency order, and paths, so an old or incorrectly generated semantic value passed. `check-port-contracts.js` now compares all six public-surface collections against `contractFor`, and `test-port-public-surface.js` deterministically substitutes the dependency identity and proves rejection. Regeneration also exposed and repaired two older public-surface drifts in modules 38 and 50 rather than silently exempting them.

The raw `verify-hosted-morphic-runtime` build step lacked a registered canonical outer operation. `developer-command.py` now wraps it with the recipe location while preserving ordinary output and exit status. The Minimus regression test derives every serious public `verify-*` step from `build.zig`, excludes implementation-only `*-checks`, and requires an outer mapping; it also directly checks hosted success, singular ordered handoff, and location validity. This is coverage policy rather than another independent handwritten coverage list.

Phase 0's focused port, Minimus, command-manual, scheduler, recipe, hosted verification, and byte-repeatability checks passed before preflight work continued. The complete hosted output remained byte-identical across two identical runs and measured 765 bytes.

## Truth precedence and compact correctness surface

Zig source/compiler remains authoritative for exports and execution; `details.json` is canonical semantic module metadata; `recipe.json` and recipe source govern compositions; `port.js` must agree with canonical semantic public identity; generated indexes are projections; and `COMMANDS.md` describes real runnable surfaces. A detected contradiction fails a consistency gate rather than being compressed.

The canonical operation is:

```text
python3 tools/query-reference.py agent preflight MODULE_OR_RECIPE
```

It reads the committed Agent Fast Path projection and canonical recipe metadata. It returns deterministic compact JSON with identity and construction, Zig baseline, environment, dependency order, ownership and cleanup, borrowing and invalidation, resources, thread state, failures and failure guarantees, determinism, known diagnostic repair summaries, validation closure, minimum useful locations, and explicit unknowns. Module public symbols are now retained in the generated agent index so the construction identity can be checked without source parsing. Recipe results conservatively aggregate selected module obligations and explicitly state that composition-level facts are only inherited module-by-module unless the recipe supplies stronger truth.

Validation closure distinguishes module unit/smoke commands, raw recipe/build commands, the canonical hosted Developer Minimus operation, and final repository validation. Unknown borrowing or failure atomicity is not upgraded to a guarantee. No private lifetime language, compiler substitute, source scanner, database, or new formal term was introduced.

## Exact response sizes

Sizes include the trailing newline and are exact UTF-8 bytes from deterministic command output:

| Subject | Bytes |
|---|---:|
| `semantic-version` (simple value) | 1665 |
| `owned-byte-buffer` (ownership/borrowing/invalidation) | 2450 |
| `bounded-system-resource-plan` (bounded resources and diagnostics) | 4374 |
| `bounded-deterministic-scheduler` | 2371 |
| `run-hosted-morphic-runtime` | 7336 |

The resource-plan response was reduced from 9137 bytes by projecting only diagnostic identity, meaning, repair, and focused validation instead of copying complete diagnostic records. Bytes are not converted to token estimates and establish no language or agent performance comparison.

## Semantic pressure test and misuse evidence

The representative set was `semantic-version`, `owned-byte-buffer`, `bounded-system-resource-plan`, `bounded-deterministic-scheduler`, and `run-hosted-morphic-runtime`. Together they exercise copied values, explicit allocator ownership and cleanup, borrowed slices and invalidation, bounded compile-time storage, explicit failures, caller-controlled time, stable ordering, and a hosted composition with no post-initialization allocation.

No existing Zig public API required a justified redesign: the selected boundaries already express explicit allocators/cleanup, typed construction, error unions, compile-time capacity, monotonic state transition errors, and deterministic ordering. Existing runtime tests already cover scheduler capacity/reversed-time failure atomicity, tie ordering, hosted output exhaustion, and byte repeatability. New repository-consistency fixtures cover the port dependency/public-identity substitution and missing serious Developer Minimus coverage. Their evidence is correctly described as repository validation, not compiler rejection. Native Zig errors remain unchanged.

No new `ZIGREF-*` diagnostic was added. Existing resource-plan diagnostics are projected with their established repair paths; the Phase 0 defects naturally belong to consistency validation. Ordinary reuse of full contracts required no implementation-source reads during the preflight implementation; source was read for the mandated Phase 0 authoritative-surface investigation and semantic pressure review.

## Zero-context acceptance and progressive disclosure

`test-agent-fast-path.py` now queries all five representative subjects twice, requires byte determinism and every correctness category, verifies explicit unknowns and minimum locations, requires the hosted canonical outer operation, and fails if scheduler identity again becomes `FixedPriorityQueue`. Bootstrap, decide, card, compose, diagnose, and ordinary module output are unchanged; correctness obligations appear only when `preflight` is requested.

`AGENTS.md` adds the durable preflight step to the normal discovery workflow. `COMMANDS.md` documents preflight, the port regression, and the canonical/raw distinction for hosted Morphic verification. No obsolete command was retained or imaginary command added.

## Limits and validation

The preflight is constraint-preserving repository metadata, not rustc, a borrow checker, a proof system, or a guarantee against all memory errors. Empty canonical facts remain explicit unknowns. Recipe-level semantics remain limited by facts represented in selected modules and `recipe.json`. The work makes no Rust/C/Zig benchmark claim and does not begin Alpine, boot, a privileged RISC-V backend, or the formal benchmark.

Focused and aggregate commands executed are recorded below in Snowball Yield and in the completion summary. Generated textual projections were regenerated through repository tools; no binary generated artifact is committed.

## Snowball Yield

composition: compact correct-use preflight for modules and the hosted Morphic recipe  
base commit: `bda669e`  
Zig baseline: 0.14.0

requirements at start: 4 — repair public-surface consistency; repair serious outer verification coverage; derive compact correctness obligations; prove zero-context use  
existing-module requirements: 3 — scheduler, resource planner, event trace (plus their declared closure)  
existing-composition/recipe requirements: 1 — `run-hosted-morphic-runtime`  
missing reusable capabilities: 1 — compact correctness-preflight projection  
project-specific orchestration requirements: 0  
out-of-scope requirements: compiler/type-system replacement, Alpine/boot, privileged RISC-V backend, formal language benchmark  
requirements discovered during run: 2 pre-existing port drifts (modules 38 and 50) exposed by the stronger general gate

existing modules actually reused: `semantic-version`, `owned-byte-buffer`, `bounded-system-resource-plan`, `bounded-deterministic-scheduler`, `bounded-deterministic-event-trace`  
existing recipes/compositions actually reused: `run-hosted-morphic-runtime`  
new reusable modules created: 0  
new reusable recipes/compositions created: 0

known diagnostic lookups used: resource-plan diagnostic records already in the generated Debug Fast Path  
unknown diagnostic lookups: 0  
new evidenced diagnostics added: 0

source reads required for ordinary reuse: 0 for the tested full-contract preflight path; mandated repair/pressure-review source reads are not ordinary reuse  
focused validations executed: agent bootstrap/doctor; agent fast-path and contract self-tests; agent-index drift; command reference; port checker/regression; Developer Minimus regression and hosted outer verification; scheduler unit/smoke; hosted recipe test; two hosted runs plus `cmp`  
aggregate validations executed: `zig build check`, `zig build smoke`, `zig build test`, `zig build recipes`, `zig build conformance`, Morphic plan/trace outer verification, and canonical repository validation

unmeasured fields: token counts; hidden compute; hypothetical implementation cost; cross-language performance  
notes: no tempting new scheduler, container, identity, trace, resource, or output mechanism was created because Batch 06 foundations already supplied them. New work is projection and consistency infrastructure only.
