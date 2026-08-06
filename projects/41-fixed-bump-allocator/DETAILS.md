# Fixed Bump Allocator integration contract

## Purpose

Allocate aligned slices monotonically from a caller-owned byte region.

## C pain addressed

The direct C form is compact and attractive, but bounds, ownership, membership, arithmetic failure, and invalidation are conventions rather than types. This module names those guarantees without claiming Zig chooses capacity, cleanup, or synchronization policy.

## Public surface

The public root symbol is `FixedBumpAllocator`. Its constructors and methods are defined in `src/fixed_bump_allocator.zig`; all mutations are bounded, allocation-free, and report `InvalidAlignment, Overflow, OutOfMemory` where applicable.

## Import and location

Import `fixed-bump-allocator`. Implementation and unit tests: `projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig`. External smoke test: `projects/41-fixed-bump-allocator/tests/smoke_test.zig`.

## Inputs

Values and indices are copied. Any supplied byte storage or intrusive nodes remain caller-owned, must outlive their borrows, and must not be concurrently mutated. Compile-time capacities are hard limits and may be zero.

## Outputs

Scalar and element removals are copied. Returned pointers or slices borrow caller/module storage, require no release, and end when that storage ends; reset and removal invalidate affected borrows.

## State and invariants

Counts never exceed capacity. Only initialized logical entries are exposed. Links, free indices, heap order, alignment, and graph bounds remain internally consistent after every successful operation.

## Failure behavior

`InvalidAlignment, Overflow, OutOfMemory` are explicit. Every reported failure is failure-atomic and leaves state unchanged. Empty optional queries also leave state unchanged.

## Ownership and cleanup

No allocator is called. The module owns inline metadata only; callers own supplied values, backing storage, and element-level cleanup.

## Dependencies

- `aligned-address-and-size-helpers`: imported through its named module and inherits its bounded/failure semantics.

## Expected dependents

Schedulers, parsers, compilers, build planners, kernels, embedded runtimes, databases, games, pools, and service request machinery where the specific contract fits.

## Composition examples

```zig
const foundation = @import("fixed-bump-allocator");
_ = foundation.FixedBumpAllocator;
```

The snowball recipe combines this contract with other batch storage and ordering foundations.

## Compatibility and adaptation

Targets Zig 0.14.0; hosted and freestanding; endian- and platform-independent; no allocator; no internal synchronization; not a stable C ABI. External locking is required for shared mutable use.

## Complexity and limits

Storage is fixed at compile time. Operation-specific complexity is recorded in `details.json`; no behavior silently grows capacity.

## Validation

Run `zig build test-fixed-bump-allocator` and `zig build smoke-fixed-bump-allocator` under Zig 0.14.0. Tests cover success, empty/zero capacity, full/bounds, overflow or invalid state where applicable, and failure atomicity.

## Source map

- `projects/41-fixed-bump-allocator/src/fixed_bump_allocator.zig`
- `projects/41-fixed-bump-allocator/tests/smoke_test.zig`
- `projects/41-fixed-bump-allocator/README.md`
- `projects/41-fixed-bump-allocator/MASTERY.md`
- `projects/41-fixed-bump-allocator/details.json`
- `projects/41-fixed-bump-allocator/port.js`
