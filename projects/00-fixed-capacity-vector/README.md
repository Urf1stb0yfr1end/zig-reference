# Fixed-Capacity Vector

## What it is

A fixed-capacity vector stores a sequence of values in one contiguous block. It remembers how many positions are initialized, but it never allocates and never grows beyond a capacity chosen at compile time.

For `FixedVector(u32, 8)`, the object contains room for eight `u32` values and a length indicating how many of those positions currently belong to the sequence.

```text
capacity = 8
len      = 3

[ 10 ][ 20 ][ 30 ][ ?? ][ ?? ][ ?? ][ ?? ][ ?? ]
  initialized region     unused storage
```

The distinction between **capacity** and **length** is the central idea:

- Capacity is the amount of storage available.
- Length is the amount of storage containing valid values.

Code may inspect only the initialized region `[0..len)`.

## Why begin here

A dynamic array adds allocation, growth, reallocation, allocation failure, and destruction. Those are important, but they can obscure the simpler structure underneath.

This project isolates the base mechanism first:

- contiguous storage;
- an initialized prefix;
- checked insertion;
- checked access;
- removal and shifting;
- explicit invalidation rules.

Once these ideas are clear, heap growth can be added without pretending it is magic.

## The deceptively easy C version

A common C representation is straightforward:

```c
struct vector {
    int data[8];
    size_t len;
};
```

That representation is not itself bad. The problems begin when every operation depends on conventions that the type does not enforce:

```c
v->data[v->len++] = value;
```

That single line assumes:

- `v` is valid;
- `len` was initialized;
- `len <= 8` before the write;
- no previous operation corrupted `len`;
- the caller understands whether failure is possible;
- all code agrees that only `[0..len)` is initialized.

The compiler cannot tell whether the capacity check was forgotten. It also cannot distinguish initialized elements from unused storage.

The difficulty is not that C cannot implement this correctly. It can. The difficulty is that correctness remains distributed across habits, comments, and call sites.

## What the Zig design changes

The Zig implementation gathers the rules into one generic type:

```zig
var values = FixedVector(u32, 8).init();
try values.append(10);
try values.append(20);
```

The type provides the operations through which its state changes. `append` checks capacity before writing. `get` checks the initialized range rather than the raw backing storage. `items` exposes only valid elements as a slice.

This teaches several practices that will recur throughout `zig-reference`.

### State the invariant

The defining invariant is:

```text
len <= capacity
```

A second rule follows from it:

```text
only storage[0..len] is initialized
```

These are written in the type documentation, reflected in the implementation, and tested at boundaries.

### Make failure part of the operation

Appending to a full vector returns `error.Full`.

```zig
try std.testing.expectError(error.Full, values.append(3));
```

The caller cannot mistake the operation for one that always succeeds. The failed append also leaves the vector unchanged, introducing failure-atomic behavior before allocation failures enter the curriculum.

### Expose valid data, not raw storage

The backing array contains unused positions whose values are undefined. Returning the entire array would invite accidental reads from uninitialized storage.

Instead:

```zig
values.constItems()
```

returns a slice containing only `[0..len)`.

### Document invalidation

Low-level containers must explain when references stop identifying the same logical element.

- `append` does not move existing elements in this fixed-capacity implementation.
- `pop` invalidates a reference to the removed final element.
- `orderedRemove` shifts later values, invalidating references to those positions.
- `clear` invalidates references to every element.

This becomes especially important in the next project, where reallocation may move the entire backing buffer.

## What this project does not hide

The implementation deliberately exposes the essential representation:

```zig
storage: [capacity]T = undefined,
len: usize = 0,
```

There is no allocator, growth helper, trait hierarchy, or abstraction layer yet. The reader can account for every byte and every state transition.

The purpose is not to produce the most feature-rich container. Zig's standard library already provides production containers. The purpose is to provide a reference implementation whose reasoning is visible.

## Run the tests

With Zig 0.14.0:

```sh
zig build test-fixed-vector
```

The tests cover:

- empty state;
- initialized slices;
- exact capacity;
- rejection beyond capacity;
- state preservation after failure;
- checked access;
- removal order;
- zero-capacity behavior.

## What comes next

The dynamic array reuses the same model but moves storage to the heap.

That adds exactly the problems this project avoids:

- allocation ownership;
- checked capacity growth;
- failure during reallocation;
- destruction;
- whole-buffer reference invalidation.

The fixed-capacity vector is therefore not a disposable toy. It is the conceptual lower half of the dynamic array.
