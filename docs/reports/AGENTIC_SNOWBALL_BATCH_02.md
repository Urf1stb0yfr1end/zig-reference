# Agentic Snowball Batch 02

## Scope and selection

This batch restores the two flagship root documents and migrates exactly ten
existing contracts through Agent Fast Path v2. It does not change that interface,
implementation behavior, or the Zig 0.14.0 baseline.

The ranking used repository-native `agent impact` output, ordered by transitive
dependents, direct dependents, removal of partial foundations from full-module
closures, recipe participation, and low-level reuse. No synthetic score was used.

| Rank | Module | Mechanical rationale |
|---:|---|---|
| 1 | `binary-cursor-checkpoint` | Five direct/transitive parser dependents and the length-prefixed parsing recipe. |
| 2 | `validated-enum-decoder` | Three direct and four transitive decoding, ELF, and memory dependents. |
| 3 | `bounded-binary-sub-reader` | Three parser dependents and the length-prefixed parsing recipe. |
| 4 | `dynamic-array` | Three direct dependents across containers, writing, and owned buffers. |
| 5 | `bit-set` | Two direct and three transitive allocator/object-pool dependents. |
| 6 | `physical-page-frame-number-and-address-conversion` | Two memory dependents and the page-frame validation recipe. |
| 7 | `riscv-sv39-page-table-entry` | Two direct Sv39 dependents and the Sv39 composition recipe. |
| 8 | `riscv-sv39-virtual-address-indexing` | Two direct Sv39 dependents and the Sv39 composition recipe. |
| 9 | `riscv-page-table-page-owner` | Two direct Sv39 dependents and explicit bounded ownership for the composition. |
| 10 | `bounded-integer` | Improves an already-full priority-queue closure and the bounded state-machine recipe. |

## Snowball measurements

| Measure | Before | After |
|---|---:|---:|
| Contracted modules | 52 | 52 |
| Full fast-path modules | 17 | 27 |
| Partial modules | 35 | 25 |
| Unique direct dependents improved | 0 | 14 |
| Unique transitive dependents touched | 0 | 15 |
| Recipes whose closure gained full modules | 0 | 4 |

The affected recipes are `construct-and-verify-sv39-address-space`,
`construct-bounded-state-machine`, `parse-length-prefixed-record`, and
`validate-physical-page-frame`.

Sizes below are exact stdout bytes, including the trailing newline, from
`agent card MODULE --view VIEW`. Before values were measured in a detached
worktree at the batch baseline. Ordinary selection/integration required opening
one source file before migration and zero afterward for every row.

| Module | Select before/after | Integrate before/after | Source before/after |
|---|---:|---:|---:|
| `binary-cursor-checkpoint` | 162 / 456 | 1053 / 1067 | 1 / 0 |
| `validated-enum-decoder` | 158 / 373 | 937 / 1189 | 1 / 0 |
| `bounded-binary-sub-reader` | 164 / 515 | 1018 / 1150 | 1 / 0 |
| `dynamic-array` | 140 / 328 | 918 / 1926 | 1 / 0 |
| `bit-set` | 128 / 298 | 919 / 1240 | 1 / 0 |
| `physical-page-frame-number-and-address-conversion` | 212 / 601 | 1109 / 1737 | 1 / 0 |
| `riscv-sv39-page-table-entry` | 168 / 439 | 960 / 1140 | 1 / 0 |
| `riscv-sv39-virtual-address-indexing` | 184 / 479 | 1021 / 1180 | 1 / 0 |
| `riscv-page-table-page-owner` | 168 / 439 | 1050 / 1090 | 1 / 0 |
| `bounded-integer` | 144 / 371 | 920 / 1308 | 1 / 0 |

## Contract and policy results

The contracts expose exact named imports, public operations, ownership, borrowing,
invalidation, environment, resources, errors, deterministic behavior, and focused
validation. Unknown interrupt/async/signal guarantees remain unclaimed. No proof
contract or diagnostic was invented; each new expectation manifest is intentionally
empty. Sparse copy residue in the three parser contracts (physical-memory wording)
was not projected as a false guarantee.

`MAYBE_THE_NEW_WORLD_FITS_IN_5_GB.md` and `Prospectively.md` are restored to the
root. The existing strict allowlist names those exact files; a temporary
`UNAPPROVED_ROOT_DOCUMENT.md` was rejected with the existing explicit error and
removed. `COMMANDS.md` was reviewed and updated with the current 27/25 state and
the runnable root-policy validation command.

Agent indexes were generated twice; the second pass produced no diff. Fast-path
spot checks selected newly migrated modules, exposed rejection and integration
facts, crossed Batch 01 and Batch 02 foundations in composition, reported impact,
and kept nonexistent capabilities and diagnostics absent.

## Next partial frontier

The next graph-first frontier is the remaining Sv39 walker/invalidation/builder
chain, `length-prefixed-binary-field`, `physical-memory-region-set`,
`elf64-file-header-parser`, and `validated-bit-flags`, followed by standalone
recipe participants. This ordering should be recomputed from the future tree.
