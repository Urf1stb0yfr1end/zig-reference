# Master Module Checklist Progress

This file is the current completion overlay for [`MASTER_MODULE_CHECKLIST.md`](MASTER_MODULE_CHECKLIST.md).

## Current count

- Unique checklist capabilities: **757**
- Implemented or functionally represented: **32**
- Compiler-validated in the current environment: **0**

A check mark records an implementation and complete repository contract set. It does not claim successful Zig compilation unless the corresponding `details.json` says so.

## Newly completed in this batch

- [x] **003. Wrapping sequence number** — `projects/19-wrapping-sequence-number`
- [x] **008. Tagged result** — `projects/26-tagged-result`
- [x] **009. Optional handle** — `projects/20-optional-typed-handle`
- [x] **010. Unit-safe quantity** — `projects/21-unit-safe-quantity`
- [x] **011. Endian integer** — `projects/22-endian-integer-codec`
- [x] **015. Version type** — `projects/25-semantic-version`
- [x] **016. FourCC code** — `projects/24-fourcc-code`
- [x] **017. ASCII byte** — `projects/23-validated-ascii-byte`
- [x] **098. Source span** — `projects/27-source-span`
- [x] **Hyper-Zig: physical page-frame number and address conversion** — `projects/28-physical-page-frame-number-and-address-conversion`

## Earlier completed foundation batch

- [x] **006. Validated enum decoder** — `projects/14-validated-enum-decoder`
- [x] **007. Bit flags type** — `projects/16-validated-bit-flags`
- [x] **012. Aligned address** — `projects/15-aligned-address-and-size-helpers`
- [x] **014. Range type** — `projects/17-checked-half-open-range`
- [x] **Repository-specific: distinct memory address types** — `projects/18-distinct-memory-address-types`

## Previously implemented

- [x] Checked cast
- [x] Saturating counter
- [x] Nonzero integer
- [x] Bounded integer
- [x] Fixed-capacity vector
- [x] Inline queue / ring buffer
- [x] Fixed bit set
- [x] Dynamic array
- [x] Bounded byte reader
- [x] Allocator-backed stack
- [x] Allocator-backed byte writer
- [x] Bitmap allocator
- [x] Generational handle table
- [x] Generic explicit state machine
- [x] Handle table capability
- [x] Explicit lifecycle-machine capability
- [x] Ring-buffer repository form

## Snowball evidence

The page-frame conversion module imports `PhysicalAddress` from `18-distinct-memory-address-types`. It therefore adds only page-specific conversion rules while inheriting the lower module's address-domain separation. Future physical page allocators, page tables, EPT builders, and guest-memory managers can now inherit both layers.

## Synchronization note

The main checklist remains the complete 757-capability planning ledger. This overlay should be updated with each implementation batch until the planned `module-contract-consistency-checker`, `details-json-schema-validator`, and `repository-dependency-graph-generator` can generate status directly from `details.json`.
