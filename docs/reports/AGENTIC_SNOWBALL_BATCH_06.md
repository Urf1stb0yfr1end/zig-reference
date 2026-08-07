# Agentic Snowball Batch 06 — Morphic Composition

## Worktree and scope

Final state: intended Batch 06 changes committed on the current `work` branch; worktree clean after validation and commit.

Base commit: `e4a3613698033ffdae4c341de04626595700f255`. The requested `origin main` fast-forward could not run because this checkout has no `origin` remote. The requested `~/dev/zig-reference` path and pre-existing `.venv` were absent, so work continued in the supplied `/workspace/zig-reference` checkout and a local ignored environment was created from `tools/requirements.txt`. The historical `benchmark-pre-morphic-52` tag was absent and was not created or modified.

Target: hosted Linux, Zig 0.14.0, deterministic bounded execution. This batch does not implement boot, Alpine, QEMU orchestration, RISC-V privilege, CSR/trap/SBI/FDT/UART/VirtIO/networking, or a hypervisor.

## Frozen requirement map

Recorded before implementation from Agent Fast Path queries.

| Requirement | Initial classification | Selected truth |
|---|---|---|
| Exact bounded resource derivation and initialization order | existing module | `bounded-system-resource-plan` |
| Normalized bounded event recording and canonical rendering | existing module | `bounded-deterministic-event-trace` |
| Stable bounded priority/order mechanism | existing module | `fixed-capacity-priority-queue` |
| Fixed storage, checked arithmetic, bump allocation, dependency ordering | existing module/transitive foundation | existing closure selected by resource planner and priority queue |
| Caller-controlled monotonic time plus runnable selection | missing reusable capability | new `bounded-deterministic-scheduler` |
| Target-neutral capturable output | project-specific orchestration | caller-provided fixed output slice in hosted recipe |
| Hosted initialization, schedule/run loop, trace normalization, and shutdown boundary | project-specific orchestration | new `run-hosted-morphic-runtime` recipe |
| Existing partial Morphic compositions | existing composition/recipe | `plan-morphic-runtime`, `trace-morphic-example` |
| Linux process adapter | project-specific orchestration | recipe executable only; canonical logic remains target-neutral |
| Freestanding/RISC-V backend and boot capabilities | out of scope | deferred |

No requirements were discovered during implementation.

## Selection and rejection

The scheduler reuses `fixed-capacity-priority-queue` because its stable tie ordering and inline capacity exactly fit. `generational-handles` and `state-machine` were investigated but rejected: this scenario copies explicit task IDs and needs no stale-object registry or configurable lifecycle graph. `byte-writer` was rejected for canonical capture because it owns allocator-backed dynamic storage; a caller-provided fixed buffer provides the required deterministic exhaustion behavior without post-initialization allocation.

Ordinary reuse required source reads for `fixed-capacity-priority-queue` after compilation exposed that its error type is named `Error`, a detail absent from the compact integration card. The resource-plan recipe source was read because the compact contract did not contain a complete `Planner` description literal. These are recorded rather than treated as invisible traversal.

## New reusable capability

`bounded-deterministic-scheduler` stores copied task descriptors inline. Its total order is earlier `ready_at`, then smaller numeric `priority`, then the stable insertion sequence inherited from the existing priority queue. The caller advances time monotonically; no canonical operation reads wall-clock time. Full capacity, insertion-sequence exhaustion, and reversed time are explicit errors with failure-atomic behavior. Reset discards queued work. The module allocates nothing, requires no cleanup, is unsynchronized, and remains target-neutral.

## Hosted Morphic composition

`run-hosted-morphic-runtime` first validates the existing resource plan with post-seal allocation forbidden, initializes inline scheduler and trace state, schedules two tasks, advances caller-controlled time, emits output into a caller slice, and renders the normalized trace into another caller slice. The output boundary is therefore byte-comparable and independent of terminal behavior; only `main` is the hosted stdout adapter.

The canonical scenario was run twice from identical inputs. `cmp` compared the complete 765-byte stdout artifacts and found them identical. The recipe test separately compares both captured output slices and normalized trace slices byte-for-byte. No cross-target equivalence is claimed.

## Diagnostic and repair record

The Debug Fast Path lookup for native Zig symptom `has no member named InsertError` returned `ZIGREF-DIAGNOSIS-UNKNOWN`. The native compiler error was preserved; source inspection established the actual public type name `Error`. This single integration mistake did not justify a new stable diagnostic.

## Validation

Focused commands executed are listed in Snowball Yield below. Aggregate gates were executed only after focused behavior passed. Validation evidence and generated textual indexes were regenerated from the implemented 53-module state. Exact results are the command outcomes from this run; no skipped check is called passed.

## Limitations and next frontier

This is a hosted deterministic runtime foundation, not a Linux boot milestone. It does not prove hosted/freestanding trace equivalence and contains no privileged-machine backend. The next smallest frontier is a target-neutral machine-operations interface with an additional deterministic fake adapter; only after that contract is validated should a later batch consider the separately scoped RISC-V privileged implementation.

## Snowball Yield

composition: hosted deterministic Morphic runtime
base commit: `e4a3613698033ffdae4c341de04626595700f255`
Zig baseline: 0.14.0

requirements at start: 10 named rows
existing-module requirements: 4 — resource plan; event trace; stable priority ordering; transitive fixed-storage/arithmetic/allocation/dependency foundations
existing-composition/recipe requirements: 1 — partial Morphic plan and trace compositions
missing reusable capabilities: 1 — caller-timed bounded deterministic scheduling
project-specific orchestration requirements: 3 — capture boundary; hosted run loop; Linux stdout adapter
out-of-scope requirements: 1 grouped frontier — freestanding/RISC-V and boot capabilities
requirements discovered during run: 0

existing modules actually reused: 3 direct — `bounded-system-resource-plan`, `bounded-deterministic-event-trace`, `fixed-capacity-priority-queue`; their declared closure is inherited
existing recipes/compositions actually reused: 2 — `plan-morphic-runtime`, `trace-morphic-example`
new reusable modules created: 1 — `bounded-deterministic-scheduler`
new reusable recipes/compositions created: 1 — `run-hosted-morphic-runtime`

known diagnostic lookups used: 0
unknown diagnostic lookups: 1 — `has no member named InsertError`
new evidenced diagnostics added: 0

source reads required for ordinary reuse: 2 — priority-queue source and Morphic plan recipe source
focused validations executed: `zig build test-bounded-deterministic-scheduler`; `zig build smoke-bounded-deterministic-scheduler`; `zig build test-recipe-run-hosted-morphic-runtime`; two `zig build run-hosted-morphic-runtime` executions; `cmp /tmp/morphic-a /tmp/morphic-b`; `zig build verify-hosted-morphic-runtime`
aggregate validations executed: see final validation section recorded by the completed run

unmeasured fields: token counts; hidden compute; elapsed-time comparison; hypothetical implementation cost without zig-reference
notes: deterministic command output measured 765 bytes. This is factual run bookkeeping, not a speedup or universal benchmark claim.
