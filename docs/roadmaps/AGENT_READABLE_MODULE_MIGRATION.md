# Agent-readable module migration roadmap

The five original pilot modules and the agent-readable-from-creation `bounded-system-resource-plan` are intentionally excluded. There are now six agent-readable modules and 45 pending migrations. Pending modules remain valid contracted modules; this roadmap does not migrate them. Batches are ordered by numeric module identity and should be refined by dependency review before work begins.

## Batch 1 (7 modules)

- `fixed-capacity-vector`
- `dynamic-array`
- `ring-buffer`
- `bit-set`
- `bounded-byte-reader`
- `stack`
- `byte-writer`

## Batch 2 (7 modules)

- `bitmap-allocator`
- `generational-handles`
- `state-machine`
- `checked-integer-cast`
- `nonzero-integer`
- `bounded-integer`
- `saturating-counter`

## Batch 3 (7 modules)

- `validated-enum-decoder`
- `aligned-address-and-size-helpers`
- `validated-bit-flags`
- `checked-half-open-range`
- `distinct-memory-address-types`
- `wrapping-sequence-number`
- `optional-typed-handle`

## Batch 4 (7 modules)

- `unit-safe-quantity`
- `endian-integer-codec`
- `validated-ascii-byte`
- `fourcc-code`
- `semantic-version`
- `tagged-result`
- `source-span`

## Batch 5 (7 modules)

- `physical-page-frame-number-and-address-conversion`
- `binary-cursor-checkpoint`
- `bounded-binary-sub-reader`
- `length-prefixed-binary-field`
- `type-length-value-decoder`
- `owned-byte-buffer`
- `physical-memory-region-set`

## Batch 6 (7 modules)

- `physical-page-frame-allocator`
- `elf64-file-header-parser`
- `elf64-program-header-parser`
- `intrusive-doubly-linked-list`
- `riscv-sv39-page-table-entry`
- `riscv-sv39-virtual-address-indexing`
- `riscv-page-table-page-owner`

## Batch 7 (3 modules)

- `riscv-sv39-page-table-walker`
- `riscv-sfence-vma-invalidation`
- `riscv-sv39-page-table-builder`
