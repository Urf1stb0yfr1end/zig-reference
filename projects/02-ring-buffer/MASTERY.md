# Ring Buffer Mastery

## Mental model

A ring buffer stores a logical queue inside a fixed array. The queue may wrap from the end of the array back to the beginning.

The physical index for logical offset `i` is derived from the head and capacity. Logical order matters more than physical adjacency.

## Invariants

- `len <= capacity`.
- `head < capacity` when capacity is nonzero.
- The logical queue contains exactly `len` live elements.
- Enqueue writes only to the logical tail position.
- Dequeue removes only the logical head element.
- Failed enqueue on a full buffer leaves all state unchanged.
- Empty and full are distinguished by `len`, not by guessing from equal indices.

## Ownership

The ring buffer owns its inline storage. It allocates nothing and requires no destruction.

Any returned views borrow the ring buffer. A wrapped queue may require two slices rather than one contiguous slice.

## Failure behavior

Enqueue fails with `error.Full` when `len == capacity`.

Dequeue or peek fails with `error.Empty` when `len == 0`.

Failures do not move the head or change the length.

## Invalidation

Enqueue and dequeue can overwrite or retire physical slots. Pointers into storage should not be treated as stable queue-element identities.

A pointer to the current head becomes invalid as a logical reference after dequeue, even if the bytes remain temporarily unchanged.

## Why not the obvious C version?

A common C ring buffer stores `head` and `tail`, then allows `head == tail` to mean either empty or full. The implementation must add another flag, waste a slot, or rely on undocumented convention.

Using `head + len` makes occupancy explicit. Full and empty states are direct comparisons, and failed operations can preserve state without repairing partially updated indices.

## Proof through tests

The tests should establish:

- first-in, first-out behavior;
- filling to capacity;
- failure while full;
- state preservation after failed enqueue;
- wraparound after dequeue and enqueue;
- repeated wraparound cycles;
- empty failure behavior;
- zero-capacity behavior.

## Adaptation notes

This is not yet a concurrent queue. Adding threads requires a separate synchronization and ownership design.

The structure can later support:

- byte streams;
- event queues;
- serial-console buffering;
- bounded producer-consumer queues;
- work scheduling.

## Mastery exercises

1. Return the logical contents as up to two borrowed slices.
2. Add bulk enqueue with all-or-nothing failure behavior.
3. Add overwrite-oldest mode as a separate policy and document the semantic change.
4. Build a byte-oriented stream reader on top of the ring buffer.
5. Explain why adding a mutex alone does not fully define concurrent ownership and shutdown.

## Readiness check

Before continuing, explain:

- why logical order can differ from physical order;
- how full and empty are distinguished;
- why modulo or conditional wrapping is required;
- which fields must remain unchanged after failed enqueue;
- why this implementation is not automatically thread-safe.
