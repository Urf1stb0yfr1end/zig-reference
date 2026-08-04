# Byte Writer

A byte writer constructs a binary message or file one explicit field at a time.

It is the output-side companion to the bounded byte reader. The reader turns trusted ranges of bytes into values. The writer turns values into an owned byte sequence.

## Why this module exists

Binary output in C often begins with a pointer and an offset. Soon every call site must remember capacity, byte order, overflow, rollback, and which writes completed before an error.

This implementation centralizes those responsibilities:

- storage growth belongs to the dynamic array;
- byte order appears in each integer-writing operation;
- whole-slice writes reserve capacity before mutation;
- checkpoints permit a caller to abandon a partially designed record;
- returned bytes are explicitly borrowed from the writer.

## Where it leads

This module will support binary formats, network packets, database records, object files, and virtual-device messages.

## Study order

1. Read `DETAILS.md` for the component contract.
2. Compare the implementation with the bounded byte reader.
3. Read `MASTERY.md`.
4. Run `zig build test-byte-writer`.

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
