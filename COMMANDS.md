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
<!-- END GENERATED MODULE COMMANDS -->

## Recipes and conformance

List or inspect recipes with `find recipes -mindepth 1 -maxdepth 1 -type d -print | sort` and `python3 tools/query-reference.py recipe NAME`. The six initial recipes are `construct-bounded-state-machine`, `create-stale-safe-object-registry`, `normalize-checked-memory-range`, `parse-length-prefixed-record`, `validate-physical-page-frame`, and `write-and-read-explicit-endian-record`. `zig build recipes` is the aggregate command; each has a `zig build test-recipe-<name>` step defined from `recipe_specs` in `build.zig`. These compiler-driven steps remain pending in this review.

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
