# Byte Writer Details

## Purpose

Construct owned binary output with explicit byte order and rollback points.

## C pain addressed

C serializers commonly combine pointer arithmetic, capacity growth, byte-order conversion, and cursor mutation in each call site. A failed append may leave partial output, while host-endian integer copies silently produce nonportable formats.

## Public surface

- `ByteWriter.init(allocator)`
- `deinit()`
- `bytes() []const u8`
- `len() usize`
- `checkpoint() usize`
- `rollback(checkpoint)`
- `writeByte(value)`
- `writeAll(input)`
- `writeU16Le`, `writeU16Be`
- `writeU32Le`, `writeU32Be`

## Inputs

- Explicit allocator.
- Borrowed byte slices copied into owned storage.
- Integer values with byte order selected by the operation name.

## Outputs

`bytes` returns a borrowed view valid until mutation that reallocates or until destruction.

## Invariants

- Logical bytes occupy `storage[0..len]`.
- A completed write appends all requested bytes in order.
- Integer encoding never depends on host byte order.
- A valid rollback only shortens logical output.

## Failure behavior

Allocation failure leaves the previous logical byte sequence unchanged because capacity is reserved before bytes are copied. Invalid rollback checkpoints do not mutate state.

## Dependencies

- `projects/01-dynamic-array`

## Expected dependents

- binary serializers
- network frame builders
- database record encoders
- executable and object-file writers
- virtual-device packet construction

## Adaptation notes

A fixed-capacity or caller-supplied-storage version can preserve the same writing contract for freestanding systems. Borrowed views are invalidated by reallocation.

## Test command

```sh
zig build test-byte-writer
```

## Source map

- implementation: `src/byte_writer.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
