# Mastery: Endian Integer Codec

## Mental model
Bytes have an external order; integers have a logical value. The codec is the explicit boundary between them.

## Invariants
- encoded output has exactly `@sizeOf(T)` bytes;
- decode consumes exactly that fixed array;
- byte order is a compile-time policy;
- host endianness is irrelevant.

## C pain
Casting byte buffers to integer pointers assumes alignment, object representation, and host byte order. Manual shifts are duplicated and easily reversed.

## Zig answer
`std.mem.readInt` and `writeInt` require an explicit endian value and fixed byte extent.

## Remaining danger
The caller must still select the byte order required by the format and ensure `T` matches the field width.