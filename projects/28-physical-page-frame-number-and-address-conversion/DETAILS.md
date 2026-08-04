# Physical Page Frame Number and Address Conversion Details

## Purpose
Convert between physical page-frame indices and aligned physical byte addresses.

## Public surface
`PageSize`, `PhysicalPageFrameNumber`, `init`, `toAddress`, `fromAddress`.

## Inputs and outputs
Copied `usize` frame indices and repository `PhysicalAddress` values.

## Invariants
Page size is 4096. Produced addresses are page-aligned. Address conversion accepts only page-aligned physical addresses.

## Failure behavior
`toAddress` returns `Overflow`; `fromAddress` returns `Unaligned`. Failure changes no state.

## Ownership and cleanup
Value types only; no allocation.

## Dependencies
`18-distinct-memory-address-types`, symbol `PhysicalAddress`.

## Expected dependents
Physical page allocators, page-frame databases, host page tables, EPT builders, DMA and guest-memory managers.

## Compatibility and complexity
Hosted and freestanding; O(1); currently fixed to 4 KiB pages.

## Validation
`zig build test-physical-page-frame-conversion`; compiler validation pending.