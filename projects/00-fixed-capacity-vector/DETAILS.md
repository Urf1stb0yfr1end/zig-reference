# Fixed-Capacity Vector Details

## Purpose
Store up to a compile-time maximum number of values without heap allocation.

## C pain addressed
C implementations often expose raw arrays plus an independent length, leaving bounds, initialization, and mutation order to caller discipline.

## Public surface
- `FixedVector(T, capacity){}`
- `append(value) !void`
- `pop() ?T`
- `get(index) ?T`
- `items() []T`
- `constItems() []const T`
- `clear()`
- `count() usize`

## Inputs
- Element type `T`.
- Compile-time `capacity`.
- Values copied into internal storage.

## Outputs
- Optional copied values from `get` and `pop`.
- Borrowed slices over initialized elements only.

## Invariants
- `len <= capacity`.
- Initialized elements occupy `storage[0..len]`.
- Failed append leaves state unchanged.

## Failure behavior
- `append` returns `error.Full` when capacity is exhausted.
- Empty `pop` and invalid `get` return `null`.

## Ownership
The vector owns inline storage and performs no allocation. Borrowed slices remain valid until mutation that changes logical contents or the vector goes out of scope.

## Dependencies
None.

## Expected dependents
- fixed stacks
- small queues
- parser scratch state
- embedded and freestanding tables
- bootstrap structures before allocator initialization

## Adaptation notes
Safe for hosted and freestanding code. Large capacities increase value size and copying cost.

## Test command
```sh
zig build test-fixed-vector
```

## Source map
- implementation: `src/fixed_capacity_vector.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
