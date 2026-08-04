# Mastery: Byte Writer

## Mental model

The writer owns a growing sequence of bytes. Public operations append complete logical fields, not arbitrary cursor mutations spread across callers.

## Core invariants

- `len <= capacity` through the underlying dynamic array.
- `bytes()` exposes exactly the initialized output.
- Every integer method states its byte order.
- Failed reservation leaves the prior output unchanged.

## Ownership

The writer owns its byte storage. Input slices are borrowed only for the duration of a write and are copied. The allocator is supplied but not owned.

## Invalidation

A slice returned by `bytes()` may be invalidated by any later write that causes growth and is invalid after `deinit`.

## C pain to recognize

The painful implementation is not one integer write. It is hundreds of call sites each updating an offset, checking capacity differently, and assuming host byte order. Centralization makes the binary contract auditable.

## Zig lesson

Use slices for input, explicit integer widths for fields, named byte-order operations, error unions for growth, and a lower storage module for ownership.

## What Zig does not decide

Zig cannot determine whether your file-format field order, checksums, versioning, or rollback policy are correct. The format specification remains the source of truth.

## Exercises

1. Add `writeU64Le` and `writeU64Be`.
2. Add signed integer methods without implicit bit-width changes.
3. Add length-prefixed byte strings with checked conversion.
4. Add an operation that reserves a field and patches it later.
5. Encode a tiny framed protocol and decode it with the bounded reader.

## Readiness questions

- Why does `writeAll` reserve before copying?
- What invalidates a returned byte slice?
- Why is byte order part of the method name?
- What does rollback restore, and what does it not erase physically?
- How would a fixed-capacity version differ?
