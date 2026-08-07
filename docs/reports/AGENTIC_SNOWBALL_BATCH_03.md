# Agentic Snowball Batch 03

## Baseline and scope

The batch started at commit `0d108ae51bd073520ce49162b09c7bd43a5996e2` with 52 contracted modules, 27 full Agent Fast Path v2 projections, and 25 partial projections. The requested `git pull --rebase origin main` could not run because this checkout has no `origin` remote; work therefore used the recorded local baseline. The Zig baseline remains 0.14.0 and both root vision documents remain in place.

## Semantic repair and bounded Batch 02 audit

`dynamic-array` now identifies the mutable `items()` and immutable `constItems()` slices as views borrowed from array-owned storage. Their lifetime is explicitly bounded by growth, deinitialization, and removal of referenced elements, coherently matching the existing invalidation map. Its error map was also narrowed to the growth operations that expose allocation and capacity arithmetic failure.

`riscv-sv39-page-table-entry` now uses `Entry` as its integration symbol and `Entry.decode(raw)` followed by level validation as its minimal functional path, rather than treating the incidental `DecodeError` declaration as the constructed object.

The other eight Batch 02 projections were boundedly checked against their canonical public symbols, ownership/borrowing, invalidation, resources, environment constraints, and usage snippets. No additional direct contradiction or unrelated copy residue was demonstrable without strengthening claims beyond canonical evidence. Narrow regression assertions in the existing fast-path test cover both independently reported defects.

## Mechanical selection

Part B recomputed the 25-module pending frontier and used `agent impact`, recursive dependency/dependent queries, and recipe closure rather than a synthetic score. Exactly ten modules that were partial at that point were selected:

| Module | Leverage rationale |
|---|---|
| `riscv-sv39-page-table-walker` | Foundation of the builder and the Sv39 recipe closure. |
| `riscv-sfence-vma-invalidation` | Direct builder dependency and explicit privileged invalidation boundary in the Sv39 recipe. |
| `riscv-sv39-page-table-builder` | Completes the remaining Sv39 composition chain. |
| `length-prefixed-binary-field` | Direct TLV dependency and participant in the length-prefixed-record recipe. |
| `type-length-value-decoder` | Completes the selected allocation-free binary decoding cluster. |
| `physical-memory-region-set` | Direct foundation for physical-page-frame allocation. |
| `physical-page-frame-allocator` | Completes the selected physical-memory cluster. |
| `validated-bit-flags` | Direct foundation for ELF64 program-header permissions. |
| `elf64-file-header-parser` | Direct foundation for the ELF64 program-header parser. |
| `elf64-program-header-parser` | Completes the selected ELF64 parsing cluster and combines two selected foundations. |

The result is 52 contracted modules, 37 full projections, and 15 partial projections. Seven unique direct/transitive downstream modules were improved (`type-length-value-decoder`, `physical-page-frame-allocator`, `elf64-program-header-parser`, and the Sv39 builder chain, counting each unique graph node once). Recipe closures gaining full modules are `parse-length-prefixed-record` and `construct-and-verify-sv39-address-space`.

## Representation measurements

Each module required its canonical source for ordinary selection/integration while partial and requires zero source files for those ordinary operations after migration. Exact post-migration stdout sizes include the trailing newline. Baseline card bytes were not retained by the partial projection, so no invented before values are reported.

| Module | Select bytes | Integrate bytes | Source files before/after |
|---|---:|---:|---:|
| `validated-bit-flags` | 847 | 1120 | 1 / 0 |
| `length-prefixed-binary-field` | 997 | 1551 | 1 / 0 |
| `type-length-value-decoder` | 977 | 1545 | 1 / 0 |
| `physical-memory-region-set` | 980 | 1628 | 1 / 0 |
| `physical-page-frame-allocator` | 1013 | 1599 | 1 / 0 |
| `elf64-file-header-parser` | 953 | 1398 | 1 / 0 |
| `elf64-program-header-parser` | 978 | 1778 | 1 / 0 |
| `riscv-sv39-page-table-walker` | 1002 | 1270 | 1 / 0 |
| `riscv-sfence-vma-invalidation` | 1035 | 1100 | 1 / 0 |
| `riscv-sv39-page-table-builder` | 1011 | 1518 | 1 / 0 |

## Acceptance and validation

Bootstrap reports 37/15 and doctor reports status `ok`. Natural-language selection finds the selected modules, select/integrate cards expose constraints and construction, composition crosses earlier fixed-capacity/parser/Sv39 foundations, impact exposes downstream validation, and missing capabilities and nonexistent diagnostics remain missing. The agent index was regenerated twice and the second pass produced no diff.

The strict root policy rejected `UNAPPROVED_ROOT_DOCUMENT.md`; it was then removed. `MAYBE_THE_NEW_WORLD_FITS_IN_5_GB.md` and `Prospectively.md` remain at repository root. All requested Python, Node, Zig, Git whitespace, root-policy, and text-only gates were executed at completion; their actual outcomes are reflected in the final response.

## Next partial frontier

The recomputed frontier after this batch begins with `owned-byte-buffer`, `intrusive-doubly-linked-list`, `state-machine`, and remaining reusable scalar/value modules such as `nonzero-integer`, `wrapping-sequence-number`, `optional-typed-handle`, and `semantic-version`. A future batch must recompute current impact and recipe closure rather than preserving this advisory ordering.
