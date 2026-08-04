# Mastery: FourCC Code

## Mental model
A FourCC is four ordered bytes, not an implementation-defined integer literal.

## Invariants
- every value contains exactly four bytes;
- construction from a slice requires length four;
- equality compares byte order exactly;
- host endianness does not participate.

## C pain
Multi-character constants are implementation-defined and integer masks obscure the visible code.

## Zig answer
A `[4]u8` keeps width and byte order structural.

## Remaining danger
Some formats display or store four-byte signatures in reversed conventions. The format adapter must state that policy rather than changing this neutral value type.