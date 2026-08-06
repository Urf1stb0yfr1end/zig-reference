# Fixed Capacity Priority Queue integration contract

## Purpose

Order a bounded set of values without allocation while preserving insertion order for equal priorities.

## C pain addressed

The direct C form is compact and attractive, but bounds, ownership, membership, arithmetic failure, and invalidation are conventions rather than types. This module names those guarantees without claiming Zig chooses capacity, cleanup, or synchronization policy.

## Public surface

The public root symbol is `FixedPriorityQueue`. Its constructors and methods are defined in `src/fixed_capacity_priority_queue.zig`; all mutations are bounded, allocation-free, and report `Full, Empty, SequenceOverflow` where applicable.

## Import and location

Import `fixed-capacity-priority-queue`. Implementation and unit tests: `projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig`. External smoke test: `projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig`.

## Inputs

Values and indices are copied. Any supplied byte storage or intrusive nodes remain caller-owned, must outlive their borrows, and must not be concurrently mutated. Compile-time capacities are hard limits and may be zero.

## Outputs

Scalar and element removals are copied. Returned pointers or slices borrow caller/module storage, require no release, and end when that storage ends; reset and removal invalidate affected borrows.

## State and invariants

Counts never exceed capacity. Only initialized logical entries are exposed. Links, free indices, heap order, alignment, and graph bounds remain internally consistent after every successful operation.

## Failure behavior

`Full, Empty, SequenceOverflow` are explicit. Every reported failure is failure-atomic and leaves state unchanged. Empty optional queries also leave state unchanged.

## Ownership and cleanup

No allocator is called. The module owns inline metadata only; callers own supplied values, backing storage, and element-level cleanup.

## Dependencies

- `fixed-capacity-vector`: imported through its named module and inherits its bounded/failure semantics.

## Expected dependents

Schedulers, parsers, compilers, build planners, kernels, embedded runtimes, databases, games, pools, and service request machinery where the specific contract fits.

## Composition examples

```zig
const foundation = @import("fixed-capacity-priority-queue");
_ = foundation.FixedPriorityQueue;
```

The snowball recipe combines this contract with other batch storage and ordering foundations.

## Compatibility and adaptation

Targets Zig 0.14.0; hosted and freestanding; endian- and platform-independent; no allocator; no internal synchronization; not a stable C ABI. External locking is required for shared mutable use.

## Complexity and limits

Storage is fixed at compile time. Operation-specific complexity is recorded in `details.json`; no behavior silently grows capacity.

## Validation

Run `zig build test-fixed-capacity-priority-queue` and `zig build smoke-fixed-capacity-priority-queue` under Zig 0.14.0. Tests cover success, empty/zero capacity, full/bounds, overflow or invalid state where applicable, and failure atomicity.

## Source map

- `projects/42-fixed-capacity-priority-queue/src/fixed_capacity_priority_queue.zig`
- `projects/42-fixed-capacity-priority-queue/tests/smoke_test.zig`
- `projects/42-fixed-capacity-priority-queue/README.md`
- `projects/42-fixed-capacity-priority-queue/MASTERY.md`
- `projects/42-fixed-capacity-priority-queue/details.json`
- `projects/42-fixed-capacity-priority-queue/port.js`
