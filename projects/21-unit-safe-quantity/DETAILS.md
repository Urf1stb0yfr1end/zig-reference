# Unit-Safe Quantity Details

## Purpose
Represent scalar quantities whose units are part of their type.

## Public surface
`Quantity(Unit, Scalar)`, `init`, `get`, `add`, `subtract`.

## Inputs and outputs
Compile-time unit tag and scalar type; copied scalar values; no borrowed outputs.

## Invariants
Only the same generated quantity type participates in arithmetic.

## Failure behavior
No explicit errors; scalar arithmetic policy remains the backing type's policy.

## Ownership and cleanup
No allocator or cleanup.

## Dependencies
None.

## Expected dependents
Memory sizes, page counts, sector counts, durations, pixel dimensions, protocol units.

## Compatibility and complexity
Hosted and freestanding; O(1).

## Validation
`zig build test-unit-safe-quantity`; compiler validation pending.