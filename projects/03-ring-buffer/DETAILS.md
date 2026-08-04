# Ring Buffer Details

## Purpose
Provide a fixed-capacity first-in, first-out queue whose logical sequence may wrap around its backing array.

## C pain addressed
C ring buffers commonly confuse full and empty states, duplicate head/tail arithmetic, mishandle zero capacity, and expose physical layout where callers need logical order.

## Public surface
- `RingBuffer(T, capacity){}`
- `push(value) !void`
- `pop() ?T`
- `peek() ?T`
- `get(logical_index) ?T`
- `count() usize`
- `isEmpty() bool`
- `isFull() bool`
- `clear()`

## Inputs
- Element type `T`.
- Compile-time capacity.
- Values copied into inline storage.

## Outputs
- Optional copied values.
- No borrowed storage is exposed.

## Invariants
- `len <= capacity`.
- `head` identifies the oldest logical element when nonempty.
- Logical element `i` maps to `(head + i) % capacity`.
- Equal physical positions never need to encode both full and empty because `len` carries occupancy.

## Failure behavior
- `push` returns `error.Full` without mutation when no slot exists.
- Empty reads return `null`.

## Ownership
Inline storage only; no allocator and no external ownership transfer.

## Dependencies
Conceptually depends on fixed-capacity storage and length/capacity reasoning, but imports no lower module.

## Expected dependents
- bounded work queues
- streaming buffers
- event loops
- serial-console buffers
- network receive queues
- producer/consumer queues after synchronization is added

## Adaptation notes
This module is not thread-safe. A concurrent wrapper must define synchronization, shutdown, and message ownership without changing FIFO semantics.

## Test command
```sh
zig build test-ring-buffer
```

## Source map
- implementation: `src/ring_buffer.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
