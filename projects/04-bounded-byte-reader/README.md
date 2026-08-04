# Project 04: Bounded Byte Reader

A bounded byte reader turns an untrusted byte slice into a sequence of checked reads. It is the foundation for binary formats, network protocols, executable loaders, archive readers, and device messages.

The reader does not own or copy the input. It borrows the bytes and owns only a cursor.

## The problem it solves

Low-level parsing often begins with direct indexing and pointer arithmetic:

```c
uint32_t value = data[offset]
    | data[offset + 1] << 8
    | data[offset + 2] << 16
    | data[offset + 3] << 24;
offset += 4;
```

The useful work is simple. The surrounding obligations are not:

- prove that four bytes remain;
- prevent `offset + 4` from escaping the input;
- state the byte order;
- avoid advancing after a failed read;
- ensure a nested section cannot read into the following section;
- carry the same discipline into every parser function.

C performs the byte operations exceptionally well. The common failure is that the boundary checks remain distributed conventions rather than one defended interface.

## The Zig design

`BoundedReader` places the cursor and the borrowed slice in one type. All movement passes through `readBytes`. Higher-level reads build on that one checked primitive.

A failed read returns `error.UnexpectedEnd` and leaves the cursor unchanged. This makes parsing failure-atomic at the cursor level.

`subReader(count)` creates a reader confined to one declared section. A parser for that section cannot accidentally consume bytes belonging to the next structure.

## Invariants

1. `cursor <= input.len`.
2. Every returned slice lies completely inside `input`.
3. A failed operation leaves `cursor` unchanged.
4. Endianness is explicit in the operation name.
5. A sub-reader cannot escape its parent-provided slice.

## Why this showcases Zig

The implementation retains the directness of byte slices and shifts while making important distinctions visible:

- slices pair addresses with lengths;
- errors are part of the function type;
- borrowed data requires no allocation;
- methods collect state transitions around one cursor;
- nested readers express structural boundaries as values;
- tests can prove failure behavior directly.

Zig does not remove low-level responsibility. It gives that responsibility a form that can be inspected and reused.

## Run

```sh
zig build test-bounded-reader
```

This project will later support archive, image, ELF, and protocol parsers.

Continue with [MASTERY.md](MASTERY.md) after reading the implementation and tests together.

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
