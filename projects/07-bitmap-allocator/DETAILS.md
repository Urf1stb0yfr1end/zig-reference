# Bitmap Allocator Details

## Purpose
Allocate and release integer slot identifiers from a compile-time fixed universe.

## C pain addressed
Centralizes bit mapping, bounds, fullness, double-free detection, and reuse policy that otherwise become repeated caller conventions.

## Public surface
- `BitmapAllocator(slot_count)`
- `allocate() Error!usize`
- `free(index) Error!void`
- `isAllocated(index) error{IndexOutOfBounds}!bool`
- `allocatedCount() usize`
- `capacity() usize`
- `reset() void`

Errors: `Full`, `IndexOutOfBounds`, `DoubleFree`.

## Import and location
Implementation: `projects/07-bitmap-allocator/src/bitmap_allocator.zig`

Root symbol: `BitmapAllocator`

## Inputs
`slot_count` is compile-time and may be zero. Freed indices must have originated from the same allocator universe.

## Outputs
`allocate()` returns a copied integer index. The represented external resource is not created or destroyed by this module.

## State and invariants
A set bit means allocated. The count matches set bits. `next_hint` remains valid. Failed operations preserve state.

## Ownership and cleanup
Owns inline allocation metadata only. Borrows and allocates no memory. `reset()` releases every logical slot at once.

## Dependencies
- `03-bit-set`
- path: `projects/03-bit-set/src/bit_set.zig`
- symbol: `BitSet`
- reason: bounded compact allocation metadata

## Expected dependents
Page-frame allocators, descriptor pools, VM identifier pools, device slots, object slabs, and filesystem block maps.

## Compatibility and adaptation
Zig 0.14.0. Hosted and freestanding. No allocator. No internal synchronization. Index-to-address translation belongs to a dependent layer.

## Complexity and limits
Allocation is O(slot_count) worst case. Free and lookup are O(1). Metadata is O(slot_count) bits.

## Validation
`zig build test-bitmap-allocator`

Compiler validation remains pending in the current environment.

## Source map
- `README.md`
- `MASTERY.md`
- `DETAILS.md`
- `details.json`
- `src/bitmap_allocator.zig`
