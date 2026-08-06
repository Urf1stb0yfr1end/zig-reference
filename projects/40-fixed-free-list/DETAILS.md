# Fixed Free List integration contract

## Purpose

Allocate and recycle bounded integer slots in deterministic constant time.

## C pain addressed

The direct C form is compact and attractive, but bounds, ownership, membership, arithmetic failure, and invalidation are conventions rather than types. This module names those guarantees without claiming Zig chooses capacity, cleanup, or synchronization policy.

## Public surface

The public root symbol is `FixedFreeList`. Its constructors and methods are defined in `src/fixed_free_list.zig`; all mutations are bounded, allocation-free, and report `Full, OutOfRange, DoubleFree` where applicable.

## Import and location

Import `fixed-free-list`. Implementation and unit tests: `projects/40-fixed-free-list/src/fixed_free_list.zig`. External smoke test: `projects/40-fixed-free-list/tests/smoke_test.zig`.

## Inputs

Values and indices are copied. Any supplied byte storage or intrusive nodes remain caller-owned, must outlive their borrows, and must not be concurrently mutated. Compile-time capacities are hard limits and may be zero.

## Outputs

Scalar and element removals are copied. Returned pointers or slices borrow caller/module storage, require no release, and end when that storage ends; reset and removal invalidate affected borrows.

## State and invariants

Counts never exceed capacity. Only initialized logical entries are exposed. Links, free indices, heap order, alignment, and graph bounds remain internally consistent after every successful operation.

## Failure behavior

`Full, OutOfRange, DoubleFree` are explicit. Every reported failure is failure-atomic and leaves state unchanged. Empty optional queries also leave state unchanged.

## Ownership and cleanup

No allocator is called. The module owns inline metadata only; callers own supplied values, backing storage, and element-level cleanup.

## Dependencies

None.

## Expected dependents

Schedulers, parsers, compilers, build planners, kernels, embedded runtimes, databases, games, pools, and service request machinery where the specific contract fits.

## Composition examples

```zig
const foundation = @import("fixed-free-list");
_ = foundation.FixedFreeList;
```

The snowball recipe combines this contract with other batch storage and ordering foundations.

## Compatibility and adaptation

Targets Zig 0.14.0; hosted and freestanding; endian- and platform-independent; no allocator; no internal synchronization; not a stable C ABI. External locking is required for shared mutable use.

## Complexity and limits

Storage is fixed at compile time. Operation-specific complexity is recorded in `details.json`; no behavior silently grows capacity.

## Validation

Run `zig build test-fixed-free-list` and `zig build smoke-fixed-free-list` under Zig 0.14.0. Tests cover success, empty/zero capacity, full/bounds, overflow or invalid state where applicable, and failure atomicity.

## Source map

- `projects/40-fixed-free-list/src/fixed_free_list.zig`
- `projects/40-fixed-free-list/tests/smoke_test.zig`
- `projects/40-fixed-free-list/README.md`
- `projects/40-fixed-free-list/MASTERY.md`
- `projects/40-fixed-free-list/details.json`
- `projects/40-fixed-free-list/port.js`
