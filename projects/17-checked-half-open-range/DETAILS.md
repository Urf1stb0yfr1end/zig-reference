# Checked Half-Open Range: Integration Contract

## Purpose
Represent a validated `[start, end)` interval with one shared boundary policy.

## Public surface
- `CheckedRange.init(start, end) Error!CheckedRange`
- `CheckedRange.fromStartAndLength(start, length) Error!CheckedRange`
- `length`, `isEmpty`, `containsValue`, `containsRange`, `overlaps`, `intersection`
- Errors: `InvalidRange`, `Overflow`

## Inputs and outputs
All integers and ranges are copied. No borrowing, allocation, cleanup, or invalidation.

## Invariants
`start <= end`; the end is exclusive; touching ranges do not overlap.

## Failure behavior
Construction validates before returning. Failure has no effects. `intersection` returns null for empty or disjoint intersections.

## Dependencies
No repository dependencies. Uses `std.math` for checked addition.

## Expected dependents
Memory-region sets, page allocators, address-space allocators, parsers, ELF loaders, MMIO registries, file extents, and storage engines.

## Compatibility
Hosted and freestanding suitable; architecture-neutral; thread-safe.

## Complexity
All operations O(1), O(1) space.

## Validation
```sh
zig build test-checked-half-open-range
```
Compiler validation remains pending.
