# Dynamic Array Details

## Purpose
Own a contiguous, growable sequence of values using an explicit allocator.

## C pain addressed
C vectors routinely suffer from unchecked capacity arithmetic, lost pointers after failed `realloc`, unclear allocator ownership, partial mutation, and undocumented reference invalidation.

## Public surface
- `DynamicArray(T).init(allocator)`
- `deinit()`
- `append(value) !void`
- `pop() ?T`
- `get(index) ?T`
- `items() []T`
- `constItems() []const T`
- `capacity() usize`
- `ensureUnusedCapacity(additional) !void`
- `clearRetainingCapacity()`

## Inputs
- Element type `T`.
- Explicit allocator valid for the array lifetime.
- Values copied into owned storage.

## Outputs
- Optional copied values from `get` and `pop`.
- Borrowed slices over initialized storage.

## Invariants
- `len <= storage.len`.
- Initialized values occupy `storage[0..len]`.
- Capacity growth preserves existing values.
- Storage replacement occurs only after successful allocation and copy.

## Failure behavior
- Growth may return allocator errors or checked-arithmetic overflow.
- Failed growth leaves pointer, length, capacity, and values unchanged.

## Ownership
The array owns `storage`; the allocator is borrowed. `deinit` releases the owned allocation. Returned slices and element pointers may be invalidated by any operation that grows storage.

## Dependencies
None beyond Zig standard-library allocator and arithmetic facilities.

## Expected dependents
- stack
- byte writer
- hash table storage
- parser token collections
- graph adjacency lists
- database indexes

## Adaptation notes
For freestanding systems, provide a suitable allocator or preserve the API over caller-supplied or region-backed storage. Types owning nested resources need a higher-layer element-destruction policy.

## Test command
```sh
zig build test-dynamic-array
```

## Source map
- implementation: `src/dynamic_array.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
