# Ring Buffer

A ring buffer is a fixed-capacity queue stored in an array. New values enter at the logical tail, old values leave from the logical head, and both positions wrap around when they reach the end of the backing storage.

It is common in audio systems, network code, producer-consumer queues, logging, device drivers, and embedded programs.

## Why this project follows the dynamic array

The fixed-capacity vector introduced length and capacity. The dynamic array introduced owned growth. The ring buffer returns to fixed storage so the reader can focus on a different difficulty: logical order no longer matches one continuous physical region.

The new ideas are:

- first-in, first-out behavior;
- logical versus physical indices;
- modular wraparound;
- full and empty states;
- preserving state when insertion fails.

## The deceptively easy C version

A C implementation often stores:

```c
struct ring {
    int items[CAPACITY];
    size_t head;
    size_t tail;
};
```

That appears complete, but `head == tail` is ambiguous. It may mean either empty or full. Implementations then add a flag, reserve one unused slot, or track a separate length.

As features accumulate, mistakes commonly appear around:

- distinguishing full from empty;
- wrapping exactly at the array boundary;
- off-by-one errors in tail calculation;
- preserving FIFO order after several wraps;
- zero-capacity behavior;
- exposing physical storage as though it were logically contiguous;
- concurrent producers and consumers changing indices without a defined protocol.

C can implement a correct ring buffer efficiently. The burden is maintaining several related conventions across every operation.

## The Zig reference practices

### State has one interpretation

This implementation stores `head` and `len`. Empty means `len == 0`; full means `len == capacity`. No pair of indices has two meanings.

### Logical indexing is named

`get(logical_index)` translates queue order into physical storage internally. Callers do not need to repeat the wraparound formula.

### A failed push changes nothing

When the buffer is full, `push` returns `error.Full` before writing storage or changing state.

### Zero capacity is designed, not ignored

A zero-capacity ring buffer is a valid value. It is simultaneously empty and unable to accept an element. Tests state that behavior explicitly.

### Physical layout is not falsely exposed

After wrapping, the queue's logical contents may occupy two physical regions. This implementation does not pretend they form one ordinary slice.

## Invariants

```text
len <= capacity
```

When `capacity > 0`:

```text
head < capacity
```

The logical element at index `i` lives at:

```text
(head + i) % capacity
```

for every `i < len`.

## What comes later

This implementation is not thread-safe. That is intentional. A future work-queue project will preserve these queue invariants while adding:

- synchronization;
- blocking and wake-up behavior;
- ownership transfer between threads;
- cancellation;
- defined shutdown order.

Concurrency should be added to a queue whose ordinary behavior is already understood and tested.

## Study questions

1. Why does storing `len` remove the full-versus-empty ambiguity?
2. Why is the tail derived rather than stored?
3. Why does `pop` reset `head` when the queue becomes empty?
4. Why can the logical contents not always be returned as one slice?
5. Which new invariants would appear in a dynamically growing ring buffer?

## Run the tests

```bash
zig build test-ring-buffer
```
