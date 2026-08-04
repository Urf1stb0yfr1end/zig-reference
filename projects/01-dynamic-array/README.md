# Dynamic Array

A dynamic array stores elements contiguously like a normal array, but it can acquire a larger backing allocation when it runs out of room.

It is one of the most useful structures in systems programming. It is also where a tiny C example begins accumulating hidden obligations.

## What this project adds

The fixed-capacity vector already taught:

- length versus capacity;
- initialized versus unused storage;
- checked access;
- slices;
- invalidation rules.

This project adds exactly four ideas:

1. the container owns heap memory;
2. capacity can grow;
3. growth can fail;
4. successful growth invalidates pointers into the old allocation.

## The deceptively easy C version

A typical C structure begins like this:

```c
struct vector {
    int *items;
    size_t len;
    size_t capacity;
};
```

Appending appears simple: if the array is full, double `capacity`, call `realloc`, then write the new item.

The difficulty is not the successful path. The difficulty is preserving every invariant when:

- `len + 1` overflows;
- doubling the capacity overflows;
- allocation fails;
- `realloc` moves the storage;
- callers retain pointers into the old allocation;
- cleanup ownership is unclear;
- an empty vector uses a special representation.

C can solve all of these problems. It does not force the solution to remain visible or consistent.

## The Zig reference practices

### The allocator is explicit

The container records the allocator that owns its storage. `deinit` releases memory through the same allocator.

### Growth is failure-atomic

The old storage remains valid until replacement storage has been allocated and populated successfully. A failed growth operation leaves the array unchanged.

### Arithmetic is checked

Required length and capacity growth use checked addition and multiplication. Overflow becomes an error instead of silently creating an undersized allocation.

### Initialized storage has its own view

`items()` and `constItems()` expose only `storage[0..len]`. Spare capacity remains an implementation detail.

### Invalidation is part of the lesson

Any operation that grows capacity may move the allocation. Pointers and slices previously obtained from the array must be treated as invalid after such an operation.

## Invariants

At every public operation boundary:

```text
len <= storage.len
```

The elements in `storage[0..len]` are initialized. The remainder is spare capacity and must not be read.

## Study questions

1. Why is allocation completed before `self.storage` changes?
2. Why does the implementation copy only `0..len`, not the full capacity?
3. Which operations can invalidate a slice returned by `items()`?
4. Why does clearing the array retain its allocation?
5. How would an `insert(index, value)` operation preserve failure atomicity?

## Run the tests

```bash
zig build test-dynamic-array
```

This is an educational reference implementation. Production Zig programs should also study the standard library containers, but this version keeps the ownership and growth machinery exposed for inspection.

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
