# Zig Reference Command Manual

Solved once, documented completely, reused forever.

Write truth once. Derive every view. Verify continuously.

This is the canonical human-readable inventory of repository operations. Command definitions and canonical metadata remain authoritative; `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` detects drift. “Text-verified” below means executed without Zig compiler output in the foundation review. Zig steps are defined and statically inspected but remain pending Zig 0.14.0 execution unless a validation record says otherwise.

## Fast start

1. Inspect with `git status --short --branch`.
2. Validate contracts with the Python and Node contract checkers.
3. Regenerate indexes with `python3 tools/build-repository-index.py`.
4. Check drift with `python3 tools/build-repository-index.py --check`.
5. Query with `python3 tools/query-reference.py capability "bounded binary parsing"`.
6. Inspect order with `python3 tools/query-reference.py dependencies <module> --recursive`.
7. Run applicable Zig tests in an artifact-safe development environment.
8. Review `python3 tools/query-reference.py status`.
9. Finish with `git diff --check`, `git diff --stat`, and `git diff --numstat`.

## Status legend

| Status | Meaning |
|---|---|
| Text-verified | Available and successfully executed in a text-only environment. |
| Defined, pending | Available in source but not compiler-executed during this task. |
| Planned and defined | Interface exists; eligible targets or complete integration may still be absent. |
| Proposed | Documented direction without a command definition; never presented as runnable. |
| Deprecated / removed | Must not be used. |

## Compact command index

| Category | Commands | Status | Source of truth |
|---|---|---|---|
| Environment | `zig version`, `python3 --version`, `node --version`, `git status`, `git diff --stat`, `git diff --numstat`, `git diff --check` | Python, Node, Git text-verified; Zig pending | installed tools |
| Contracts | `python3 tools/module-contract-consistency-checker.py`; `python3 tools/format-module-contracts.py [--check]`; `python3 tools/create-module-contract-template.py --module-id ID --canonical-name NAME [--force]` | Available | tool source |
| Ports | `node tools/check-port-contracts.js`; `node tools/port-contract-consistency-checker.js`; `node tools/format-port-contracts.js [--check]`; `node tools/generate-port-index.js`; `node tools/create-port-contract.js --module PATH [--force]`; `node tools/portability-smoke-test.js` | Available; execution status is reported separately | tool source, `port.js` |
| Indexes | `python3 tools/build-repository-index.py [--check]` | Text-verified | `tools/build-repository-index.py` |
| Graphs | `python3 tools/build-dependency-graphs.py [--check]` | Text-verified; textual output only | `tools/build-dependency-graphs.py` |
| Policy | `python3 tools/check-repository-policy.py`; `python3 tools/check-command-reference.py [--check]` | Text-verified | tool source |
| Query | `python3 tools/query-reference.py KIND [TERM] [FLAGS]` | Text-verified | `tools/query-reference.py` |
| Evidence | `python3 tools/record-validation.py --level {unit,smoke,all}`; `python3 tools/record-validation.py --check`; `zig build check-validation-evidence` | Compiler-executed in this review | `tools/record-validation.py`, `validation-evidence.schema.json` |
| Specialized | `python3 tools/test-specialized-levels.py {property,fuzz-smoke,differential}` | Planned and defined; eligible targets vary | tool source |
| Status | `python3 tools/status.py`; `python3 tools/query-reference.py status` | Available | generated health index |

All Python invocations may be prefixed with `PYTHONDONTWRITEBYTECODE=1`; this is required for strict text-only work.

## Contract and generation details

Formatting commands without `--check` modify canonical contracts. Template creators write module or port contract text and refuse replacement unless `--force` is supplied. Index and graph generators write committed derived JSON, Markdown, Mermaid, and DOT; their `--check` modes do not modify the tree. Successful generation yields deterministic, two-space JSON with a generated notice. Failures include invalid JSON/schema, stale paths, dependency cycles, contract/import mismatch, or derived drift. Related aggregate steps are `zig build check`, `zig build index`, and `zig build graph`.

`node tools/generate-port-index.js` writes `ports.json`; `node tools/format-port-contracts.js` writes canonical `port.js` formatting. Portability checks read the Zig 0.14.0 contracts and do not prove a later compiler version. Inspect `port.js`, then query `python3 tools/query-reference.py port-order --target 0.16.0`; this gives migration order, not compatibility evidence.

## Query reference

Supported kinds and examples:

```text
python3 tools/query-reference.py module fixed-capacity-vector
python3 tools/query-reference.py capability "physical page allocation"
python3 tools/query-reference.py symbol PhysicalAddress
python3 tools/query-reference.py endpoint append
python3 tools/query-reference.py error Overflow
python3 tools/query-reference.py dependencies physical-page-frame-allocator --recursive
python3 tools/query-reference.py dependents checked-half-open-range --recursive
python3 tools/query-reference.py build-order hyper-zig
python3 tools/query-reference.py port-order --target 0.16.0
python3 tools/query-reference.py lifecycle active
python3 tools/query-reference.py maturity contracted
python3 tools/query-reference.py deprecated
python3 tools/query-reference.py replacement old-module-name
python3 tools/query-reference.py unvalidated
python3 tools/query-reference.py paths bounded-byte-reader
python3 tools/query-reference.py recipe parse-length-prefixed-record
python3 tools/query-reference.py status
```

Common flags are `--json`, `--compact` (compact JSON), `--paths-only`, `--symbols-only`, `--recursive`, and `--explain-selection`. `port-order` additionally accepts `--target`; it does not assert support. No-match, ambiguous alias, and text-only semantic matches are reported without inventing certainty.

## Repository build commands

| Command | Status in this review | Purpose / effects | Source |
|---|---|---|---|
| `zig build check` | Compiler-executed in this review | Runs contract, port, policy, command-manual, evidence, index-drift, and graph-drift checks; check mode updates nothing. | `build.zig` |
| `zig build index` | Defined, pending | Regenerates committed textual indexes. | `build.zig` |
| `zig build graph` | Defined, pending | Regenerates textual graph datasets and Mermaid/DOT reports. | `build.zig` |
| `zig build status` | Compiler-executed in this review | Prints generated evidence-backed health. | `build.zig` |
| `zig build check-validation-evidence` | Compiler-executed in this review | Checks the evidence schema contract, exact module/target identity, Zig 0.14.0 attribution, and current source digests without modifying evidence. | `build.zig` |
| `zig build query` | Defined, pending | Runs the default status query; use Python for arguments. | `build.zig` |
| `zig build recipes` | Defined, pending | Compiles and tests recipe adapters and dependencies. May create compiler output. | `build.zig` |
| `zig build conformance` | Defined, pending | Compiles and runs configured behavioral adapters without checking committed validation evidence. May create compiler output. | `build.zig` |
| `zig build property` | Planned and defined | Runs configured deterministic property targets. May create compiler output. | `build.zig` |
| `zig build fuzz-smoke` | Planned and defined | Runs bounded configured fuzz-smoke targets; never implies full fuzzing. | `build.zig` |
| `zig build differential` | Planned and defined | Runs configured oracle comparisons. | `build.zig` |
| `zig build smoke` | Defined, pending | Runs named-import external consumer tests without checking committed validation evidence. May create compiler output. | `build.zig` |
| `zig build test` | Defined, pending | Runs contracts, unit tests, and smoke tests under Zig 0.14.0 without checking committed validation evidence. | `build.zig` |
| `zig build validate-repository` | Defined, pending | Aggregates policy, unit, smoke, recipe, conformance, and specialized checks. | `build.zig` |
| `zig build check-module-contracts` | Defined, pending | Validates module contracts. | `build.zig` |
| `zig build check-port-contracts` | Defined, pending | Validates port contracts. | `build.zig` |
| `zig build format-port-contracts` | Defined, pending | Rewrites port contracts. | `build.zig` |
| `zig build generate-port-index` | Defined, pending | Rewrites `ports.json`. | `build.zig` |
| `zig build smoke-portability-infrastructure` | Defined, pending | Checks port discovery and ordering; not compiler portability. | `build.zig` |

## Module commands

The following section is derived from `generated/modules.json` and canonical module metadata. Every Zig command may create compiler/build output and was not run in the text-only task.

<!-- BEGIN GENERATED MODULE COMMANDS -->
| Module import | Unit test | External smoke test | Contract |
|---|---|---|---|
| `fixed-capacity-vector` | `zig build test-fixed-capacity-vector` | `zig build smoke-fixed-capacity-vector` | `projects/00-fixed-capacity-vector/details.json` |
| `dynamic-array` | `zig build test-dynamic-array` | `zig build smoke-dynamic-array` | `projects/01-dynamic-array/details.json` |
| `ring-buffer` | `zig build test-ring-buffer` | `zig build smoke-ring-buffer` | `projects/02-ring-buffer/details.json` |
| `bit-set` | `zig build test-bit-set` | `zig build smoke-bit-set` | `projects/03-bit-set/details.json` |
| `bounded-byte-reader` | `zig build test-bounded-byte-reader` | `zig build smoke-bounded-byte-reader` | `projects/04-bounded-byte-reader/details.json` |
| `stack` | `zig build test-stack` | `zig build smoke-stack` | `projects/05-stack/details.json` |
| `byte-writer` | `zig build test-byte-writer` | `zig build smoke-byte-writer` | `projects/06-byte-writer/details.json` |
| `bitmap-allocator` | `zig build test-bitmap-allocator` | `zig build smoke-bitmap-allocator` | `projects/07-bitmap-allocator/details.json` |
| `generational-handles` | `zig build test-generational-handles` | `zig build smoke-generational-handles` | `projects/08-generational-handles/details.json` |
| `state-machine` | `zig build test-state-machine` | `zig build smoke-state-machine` | `projects/09-state-machine/details.json` |
| `checked-integer-cast` | `zig build test-checked-integer-cast` | `zig build smoke-checked-integer-cast` | `projects/10-checked-integer-cast/details.json` |
| `nonzero-integer` | `zig build test-nonzero-integer` | `zig build smoke-nonzero-integer` | `projects/11-nonzero-integer/details.json` |
| `bounded-integer` | `zig build test-bounded-integer` | `zig build smoke-bounded-integer` | `projects/12-bounded-integer/details.json` |
| `saturating-counter` | `zig build test-saturating-counter` | `zig build smoke-saturating-counter` | `projects/13-saturating-counter/details.json` |
| `validated-enum-decoder` | `zig build test-validated-enum-decoder` | `zig build smoke-validated-enum-decoder` | `projects/14-validated-enum-decoder/details.json` |
| `aligned-address-and-size-helpers` | `zig build test-aligned-address-and-size-helpers` | `zig build smoke-aligned-address-and-size-helpers` | `projects/15-aligned-address-and-size-helpers/details.json` |
| `validated-bit-flags` | `zig build test-validated-bit-flags` | `zig build smoke-validated-bit-flags` | `projects/16-validated-bit-flags/details.json` |
| `checked-half-open-range` | `zig build test-checked-half-open-range` | `zig build smoke-checked-half-open-range` | `projects/17-checked-half-open-range/details.json` |
| `distinct-memory-address-types` | `zig build test-distinct-memory-address-types` | `zig build smoke-distinct-memory-address-types` | `projects/18-distinct-memory-address-types/details.json` |
| `wrapping-sequence-number` | `zig build test-wrapping-sequence-number` | `zig build smoke-wrapping-sequence-number` | `projects/19-wrapping-sequence-number/details.json` |
| `optional-typed-handle` | `zig build test-optional-typed-handle` | `zig build smoke-optional-typed-handle` | `projects/20-optional-typed-handle/details.json` |
| `unit-safe-quantity` | `zig build test-unit-safe-quantity` | `zig build smoke-unit-safe-quantity` | `projects/21-unit-safe-quantity/details.json` |
| `endian-integer-codec` | `zig build test-endian-integer-codec` | `zig build smoke-endian-integer-codec` | `projects/22-endian-integer-codec/details.json` |
| `validated-ascii-byte` | `zig build test-validated-ascii-byte` | `zig build smoke-validated-ascii-byte` | `projects/23-validated-ascii-byte/details.json` |
| `fourcc-code` | `zig build test-fourcc-code` | `zig build smoke-fourcc-code` | `projects/24-fourcc-code/details.json` |
| `semantic-version` | `zig build test-semantic-version` | `zig build smoke-semantic-version` | `projects/25-semantic-version/details.json` |
| `tagged-result` | `zig build test-tagged-result` | `zig build smoke-tagged-result` | `projects/26-tagged-result/details.json` |
| `source-span` | `zig build test-source-span` | `zig build smoke-source-span` | `projects/27-source-span/details.json` |
| `physical-page-frame-number-and-address-conversion` | `zig build test-physical-page-frame-number-and-address-conversion` | `zig build smoke-physical-page-frame-number-and-address-conversion` | `projects/28-physical-page-frame-number-and-address-conversion/details.json` |
| `binary-cursor-checkpoint` | `zig build test-binary-cursor-checkpoint` | `zig build smoke-binary-cursor-checkpoint` | `projects/29-binary-cursor-checkpoint/details.json` |
| `bounded-binary-sub-reader` | `zig build test-bounded-binary-sub-reader` | `zig build smoke-bounded-binary-sub-reader` | `projects/30-bounded-binary-sub-reader/details.json` |
| `length-prefixed-binary-field` | `zig build test-length-prefixed-binary-field` | `zig build smoke-length-prefixed-binary-field` | `projects/31-length-prefixed-binary-field/details.json` |
| `type-length-value-decoder` | `zig build test-type-length-value-decoder` | `zig build smoke-type-length-value-decoder` | `projects/32-type-length-value-decoder/details.json` |
| `owned-byte-buffer` | `zig build test-owned-byte-buffer` | `zig build smoke-owned-byte-buffer` | `projects/33-owned-byte-buffer/details.json` |
| `fixed-capacity-object-pool` | `zig build test-fixed-capacity-object-pool` | `zig build smoke-fixed-capacity-object-pool` | `projects/34-fixed-capacity-object-pool/details.json` |
| `physical-memory-region-set` | `zig build test-physical-memory-region-set` | `zig build smoke-physical-memory-region-set` | `projects/35-physical-memory-region-set/details.json` |
| `physical-page-frame-allocator` | `zig build test-physical-page-frame-allocator` | `zig build smoke-physical-page-frame-allocator` | `projects/36-physical-page-frame-allocator/details.json` |
| `elf64-file-header-parser` | `zig build test-elf64-file-header-parser` | `zig build smoke-elf64-file-header-parser` | `projects/37-elf64-file-header-parser/details.json` |
| `elf64-program-header-parser` | `zig build test-elf64-program-header-parser` | `zig build smoke-elf64-program-header-parser` | `projects/38-elf64-program-header-parser/details.json` |
| `intrusive-doubly-linked-list` | `zig build test-intrusive-doubly-linked-list` | `zig build smoke-intrusive-doubly-linked-list` | `projects/39-intrusive-doubly-linked-list/details.json` |
| `fixed-free-list` | `zig build test-fixed-free-list` | `zig build smoke-fixed-free-list` | `projects/40-fixed-free-list/details.json` |
| `fixed-bump-allocator` | `zig build test-fixed-bump-allocator` | `zig build smoke-fixed-bump-allocator` | `projects/41-fixed-bump-allocator/details.json` |
| `fixed-capacity-priority-queue` | `zig build test-fixed-capacity-priority-queue` | `zig build smoke-fixed-capacity-priority-queue` | `projects/42-fixed-capacity-priority-queue/details.json` |
| `fixed-capacity-topological-sort` | `zig build test-fixed-capacity-topological-sort` | `zig build smoke-fixed-capacity-topological-sort` | `projects/43-fixed-capacity-topological-sort/details.json` |
| `riscv-sv39-page-table-entry` | `zig build test-riscv-sv39-page-table-entry` | `zig build smoke-riscv-sv39-page-table-entry` | `projects/44-riscv-sv39-page-table-entry/details.json` |
| `riscv-sv39-virtual-address-indexing` | `zig build test-riscv-sv39-virtual-address-indexing` | `zig build smoke-riscv-sv39-virtual-address-indexing` | `projects/45-riscv-sv39-virtual-address-indexing/details.json` |
| `riscv-page-table-page-owner` | `zig build test-riscv-page-table-page-owner` | `zig build smoke-riscv-page-table-page-owner` | `projects/46-riscv-page-table-page-owner/details.json` |
| `riscv-sv39-page-table-walker` | `zig build test-riscv-sv39-page-table-walker` | `zig build smoke-riscv-sv39-page-table-walker` | `projects/47-riscv-sv39-page-table-walker/details.json` |
| `riscv-sfence-vma-invalidation` | `zig build test-riscv-sfence-vma-invalidation` | `zig build smoke-riscv-sfence-vma-invalidation` | `projects/48-riscv-sfence-vma-invalidation/details.json` |
| `riscv-sv39-page-table-builder` | `zig build test-riscv-sv39-page-table-builder` | `zig build smoke-riscv-sv39-page-table-builder` | `projects/49-riscv-sv39-page-table-builder/details.json` |
| `bounded-system-resource-plan` | `zig build test-bounded-system-resource-plan` | `zig build smoke-bounded-system-resource-plan` | `projects/50-bounded-system-resource-plan/details.json` |
| `bounded-deterministic-event-trace` | `zig build test-bounded-deterministic-event-trace` | `zig build smoke-bounded-deterministic-event-trace` | `projects/51-bounded-deterministic-event-trace/details.json` |
| `bounded-deterministic-scheduler` | `zig build test-bounded-deterministic-scheduler` | `zig build smoke-bounded-deterministic-scheduler` | `projects/52-bounded-deterministic-scheduler/details.json` |
<!-- END GENERATED MODULE COMMANDS -->

## Recipes and conformance

List or inspect recipes with `find recipes -mindepth 1 -maxdepth 1 -type d -print | sort` and `python3 tools/query-reference.py recipe NAME`. The composition recipes include `plan-bounded-initialization`; the original six are `construct-bounded-state-machine`, `create-stale-safe-object-registry`, `normalize-checked-memory-range`, `parse-length-prefixed-record`, `validate-physical-page-frame`, and `write-and-read-explicit-endian-record`. `zig build recipes` is the aggregate command; each has a `zig build test-recipe-<name>` step defined from `recipe_specs` in `build.zig`. These compiler-driven steps remain pending in this review.

Suites are `allocator`, `binary-writer`, `bounded-reader`, `fixed-capacity-container`, `growable-container`, `handle-registry`, `integer-codec`, and `range-value`. Inspect `conformance/<suite>/suite.json`; run configured adapters with `zig build conformance`. Presence of metadata is not conformance evidence, and no per-suite build steps currently exist. Use `python3 tools/query-reference.py unvalidated` to locate modules without unit evidence.

## Property, fuzz, differential, and evidence

Testing is risk-based; not every module is eligible. `zig build property`, `zig build fuzz-smoke`, and `zig build differential` are defined aggregate interfaces. A zero-target run is infrastructure status, not module evidence. The eight conformance suite declarations currently reuse module unit tests and explicitly set `dedicated_shared_adapter` and `maturity_credit` false, so `zig build conformance` earns no per-module conformance credit.

Passing evidence may only be produced by `PYTHONDONTWRITEBYTECODE=1 python3 tools/record-validation.py --level unit`, `--level smoke`, or `--level all`. The generator obtains `zig version`, runs every exact canonical `zig build test-<module>` and/or `zig build smoke-<module>` target, stops on the first failure, and writes a single deterministic `generated/validation/modules.json`. It intentionally records no wall-clock timestamp. Each record names the module, target, Zig version, native target and optimization, baseline Git revision, and a SHA-256 digest over root build wiring, its canonical source, contract, and external smoke source. Normal development intentionally separates behavior from evidence freshness: first modify source; run unit, smoke, recipe, and conformance behavior with `zig build test`, `zig build smoke`, `zig build recipes`, and `zig build conformance`; regenerate evidence with `PYTHONDONTWRITEBYTECODE=1 python3 tools/record-validation.py --level all`; regenerate indexes with `PYTHONDONTWRITEBYTECODE=1 python3 tools/build-repository-index.py`; then run `zig build check-validation-evidence`, `zig build check`, `zig build status`, and `zig build validate-repository`. Non-mutating drift validation remains available through `PYTHONDONTWRITEBYTECODE=1 python3 tools/record-validation.py --check` or `zig build check-validation-evidence`, and aggregate repository gates (`zig build check`, `zig build status`, and `zig build validate-repository`) still enforce current committed evidence. Behavioral aggregate runs (`zig build test`, `smoke`, and `conformance`) do not reject stale committed evidence before executing tests and do not rewrite Git-tracked evidence.

The generated status interprets a current unit pass as maturity level 3 and requires that pass plus a current smoke pass for level 4. Conformance is a separate counter and does not raise maturity under the current level policy. Levels 5–9 still require advanced, reuse, system, review, and stability evidence described in `docs/standards/MATURITY_LEVELS.md`; therefore smoke-tested experimental modules are not called stable or system proven.

## Contribution and CI equivalence

```text
git status
git switch -c <branch>
git diff
git diff --check
git add <paths>
git diff --cached
git commit -m "<message>"
git push -u origin <branch>
```

Run the strongest applicable checks before committing. CI maps formatting to `python3 tools/format-module-contracts.py --check` and `zig fmt --check`; contracts/policy to `zig build check`; drift to the index and graph `--check` commands; then smoke, recipe, conformance, specialized, unit, and aggregate validation steps. GitHub permissions, runner images, secrets, and branch protection cannot be reproduced or configured locally by a repository command.

## Release preparation

No release, signing, SBOM, attestation, or artifact-publication command is currently defined. The proposed process is documented in `docs/standards/RELEASE_PROVENANCE.md`; it remains intentionally non-runnable until real reproducibility and authority exist.

## Prohibited and removed commands

Database generators, SQLite generation, binary indexes, rendered graph generation, and a database build step are removed and unsupported. Deterministic JSON indexes are the complete acceleration layer. Repository generation supports reviewable text only.

## RISC-V Sv39 foundation commands
Each module has `zig build test-<module>` and `zig build smoke-<module>` targets for `riscv-sv39-page-table-entry`, `riscv-sv39-virtual-address-indexing`, `riscv-page-table-page-owner`, `riscv-sv39-page-table-walker`, `riscv-sfence-vma-invalidation`, and `riscv-sv39-page-table-builder`. Run the composition independently with `zig build test-recipe-construct-and-verify-sv39-address-space`.

## Agent-readable pilot commands

<!-- CURRENT AGENT CORPUS -->
Agent Fast Path v2 currently projects 53 contracted modules as 53 full cards with 0 partial cards.
The Batch 07 repair revalidated bootstrap/doctor discovery, deterministic preflight, command-reference drift, ports, Developer Minimus, hosted Morphic verification, and the complete repository pipeline under Zig 0.14.0; exact results are recorded in `docs/reports/AGENTIC_SNOWBALL_BATCH_07_REPAIR.md`.
The root-document policy is checked by `node tools/check-port-contracts.js`; it accepts
only the explicit flagship/root allowlist and rejects any other root Markdown file.

| Command | Purpose |
|---|---|
| `PYTHONDONTWRITEBYTECODE=1 python3 tools/build-agent-index.py [--check]` | Generate or check the compact deterministic agent projection. |
| `PYTHONDONTWRITEBYTECODE=1 python3 tools/validate-agent-contracts.py [--self-test]` | Validate pilot contracts/proof evidence or run negative validator tests. |
| `zig build validate-agent-contracts` | Run the agent contract validator and generated-index drift check. |
| `python3 tools/query-reference.py agent capability TERM` | Discover pilot modules by controlled capability ID. |
| `python3 tools/query-reference.py agent module NAME` | Inspect a compact pilot module projection. |
| `python3 tools/query-reference.py agent diagnostic ID` | Locate misuse evidence and its repair. |
| `python3 tools/query-reference.py agent diagnose TERM` | Return at most five deterministic diagnostic candidates matched from authored IDs, aliases, native errors, modules, operations, or summaries; unmatched terms remain explicitly unknown. |
| `python3 tools/query-reference.py agent symbol SYMBOL` | Discover a pilot module by public symbol. |
| `python3 tools/query-reference.py agent pending` | List modules awaiting migration without calling them invalid. |

Batch 05 validated the 52-card projection and Debug Fast Path under Zig 0.14.0. Exact historical aliases resolve to canonical identities; `diagnose` is candidate discovery rather than causal inference, and native error text remains authoritative when a symptom is ambiguous or unknown.
| `python3 tools/query-reference.py agent bootstrap` | Return the compact zero-context repository entry card. |
| `python3 tools/query-reference.py agent doctor` | Check fast-path prerequisites, drift, contracts, and Zig 0.14.0. |
| `python3 tools/query-reference.py agent card MODULE --view {select,integrate,repair,all}` | Return a purpose-sized module card. |
| `python3 tools/query-reference.py agent preflight MODULE_OR_RECIPE` | Return deterministic compact JSON containing correctness obligations, explicit unknowns, minimum locations, and validation closure before integration. |
| `python3 tools/query-reference.py agent decide "TASK"` | Rank or reject up to three modules by deterministic contract matching. |
| `python3 tools/query-reference.py agent compose CAPABILITY [...]` | Resolve provided, ambiguous, and missing capabilities plus closure and recipes. |
| `python3 tools/query-reference.py agent impact MODULE` | Derive downstream modules, recipes, and validation commands. |
| `PYTHONDONTWRITEBYTECODE=1 python3 tools/test-agent-fast-path.py` | Run the deterministic zero-context acceptance test. |

Batch 03 established the prior 37/15 projection, including explicit DynamicArray borrowed-view semantics and the `Entry.decode` Sv39 page-table-entry construction path. The acceptance test guards both semantic projections.

## Bounded system resource plan commands

- `zig build plan-morphic-runtime` prints the canonical plan.
- `zig build verify-morphic-plan` runs deterministic composition, negative, storage, and agent-contract checks.
- `zig build trace-morphic-example` prints the canonical normalized Morphic event trace.
- `zig build test-recipe-trace-morphic-example` tests the 4096-capacity composition.
- `zig build verify-morphic-trace` runs module unit, external smoke, recipe, and agent checks.

## Developer handoff output (Batch 04 repair)

Raw `zig build` commands remain implementation surfaces and preserve normal Zig output; they do not claim to append output after Zig's own final Build Summary. Use the single canonical outer driver below for build-backed serious checks. It streams the underlying command's ordinary output, waits for completion, appends exactly one `LOCATIONS` then `MINIMUS` handoff for the invoked outer operation, and preserves the underlying exit status. Direct Agent Fast Path doctor remains a canonical Python surface.

| Canonical command | Purpose |
|---|---|
| `python3 tools/query-reference.py agent doctor` | Check Agent Fast Path prerequisites and end its JSON output with its own handoff. |
| `python3 tools/developer-command.py smoke` | Run `zig build smoke --summary all` and append the final aggregate-smoke handoff. |
| `python3 tools/developer-command.py validate-repository` | Run `zig build validate-repository --summary all` and append the final complete-validation handoff. |
| `python3 tools/developer-command.py verify-morphic-plan` | Run `zig build verify-morphic-plan --summary all` and append the final plan-verification handoff. |
| `python3 tools/developer-command.py verify-morphic-trace` | Run `zig build verify-morphic-trace --summary all` and append the final trace-verification handoff. |
| `python3 tools/developer-command.py verify-hosted-morphic-runtime` | Run `zig build verify-hosted-morphic-runtime --summary all` and append the final hosted-runtime verification handoff. |
| `PYTHONDONTWRITEBYTECODE=1 python3 tools/test-developer-minimus.py` | Test deterministic formatting, ordering, existing locations, doctor output, controlled success/failure, singular handoffs, and exit preservation. |
| `node tools/test-port-public-surface.js` | Regression-test rejection of a dependency/public-surface substitution in a port contract. |

The implementation prerequisite steps ending in `-checks` and the raw public build steps never emit subordinate Minimus blocks. Batch 04 repair replaced test-only integration snippets with functional public API usage and corrected the promoted cards' semantic projections.

Raw prerequisite commands are `zig build smoke-checks`, `zig build validate-repository-checks`, `zig build verify-morphic-plan-checks`, and `zig build verify-morphic-trace-checks`. They exist for build-graph composition and deliberately emit no handoff. `python3 tools/developer-minimus.py --command COMMAND --summary TEXT [--status {PASS,FAIL,PARTIAL}] [--failure TEXT] [--next COMMAND] [--modules] [--location LABEL=RELATIVE_PATH ...]` is the internal deterministic formatter used by the doctor and outer driver; developers normally use the canonical surfaces above.

## Hosted Morphic runtime composition commands

Batch 06 established these Zig 0.14.0 command surfaces and validated them in this run:

- `zig build test-bounded-deterministic-scheduler` runs the scheduler unit tests.
- `zig build smoke-bounded-deterministic-scheduler` runs its external-consumer smoke test.
- `zig build test-recipe-run-hosted-morphic-runtime` checks bounded execution, explicit output exhaustion, and byte repeatability.
- `zig build run-hosted-morphic-runtime` prints the canonical capturable output followed by its normalized event trace.
- `zig build verify-hosted-morphic-runtime` validates the hosted recipe and Agent Fast Path contracts.

The raw `zig build verify-hosted-morphic-runtime` step is an implementation surface. The canonical serious outer verification is `python3 tools/developer-command.py verify-hosted-morphic-runtime`, which preserves Zig output and exit status and appends exactly one `LOCATIONS` then `MINIMUS` handoff.
