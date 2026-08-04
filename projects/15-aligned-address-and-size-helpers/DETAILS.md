# Alignment Helpers: Integration Contract

## Purpose
Provide one checked policy for power-of-two alignment arithmetic.

## Public surface
- `isPowerOfTwo(value: usize) bool`
- `isAligned(value, alignment) AlignmentError!bool`
- `alignDown(value, alignment) AlignmentError!usize`
- `alignUp(value, alignment) AlignmentError!usize`
- `paddingNeeded(value, alignment) AlignmentError!usize`
- Errors: `InvalidAlignment`, `Overflow`

## Ownership
Pure copied integers. No allocation, borrowing, cleanup, or invalidation.

## Failure atomicity
Every operation computes before returning; failure has no effects.

## Dependencies
No repository dependencies. Uses checked arithmetic from `std.math`.

## Expected dependents
Address types, page allocators, page-table builders, DMA buffers, ELF loaders, binary-format padding, storage layouts, and boot arenas.

## Compatibility
Hosted and freestanding suitable; architecture-neutral; thread-safe.

## Complexity
All operations O(1), O(1) space.

## Validation
```sh
zig build test-alignment-helpers
```
Compiler validation remains pending.
