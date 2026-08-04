# Wrapping Sequence Number Details

## Purpose
Represent an unsigned modulo sequence explicitly.

## C pain addressed
Rollover is usually implicit in a raw integer and may be confused with ordinary checked arithmetic.

## Public surface
`WrappingSequenceNumber(T)`, `init`, `get`, `next`, `advance`, `distanceForward`.

## Import and location
Implementation: `projects/19-wrapping-sequence-number/src/wrapping_sequence_number.zig`.

## Inputs and outputs
`T` must be unsigned. Values are copied. Outputs own no resources.

## State and invariants
One value of `T`; all arithmetic is modulo `2^bitSizeOf(T)`.

## Failure behavior
No runtime errors. Invalid signed types fail at compile time.

## Ownership and cleanup
No allocation, borrowing, or cleanup.

## Dependencies
None.

## Expected dependents
Protocol counters, packet windows, ring epochs, hardware sequence values.

## Compatibility and complexity
Zig 0.14.0 target; hosted and freestanding; O(1) time and space.

## Validation
`zig build test-wrapping-sequence-number`. Compiler validation remains pending.