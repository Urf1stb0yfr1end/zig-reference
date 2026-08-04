# Endian Integer Codec Details

## Purpose
Convert fixed-width integers to and from exact byte arrays using an explicit byte order.

## Public surface
`EndianIntegerCodec(T, endian)`, `encode`, `decode`.

## Inputs and outputs
Compile-time integer type and endian policy; copied integer values and fixed arrays.

## Invariants
Encoded and decoded widths equal `@sizeOf(T)`; no borrowing or cursor state.

## Failure behavior
No runtime errors for valid integer types.

## Ownership and cleanup
All values are copied; no allocation.

## Dependencies
Zig standard memory integer primitives.

## Expected dependents
Bounded readers and writers, protocol fields, ELF/PE readers, firmware and device structures.

## Compatibility and complexity
Hosted and freestanding; O(sizeof(T)).

## Validation
`zig build test-endian-integer-codec`; compiler validation pending.