# Mastery: Physical Page Frame Conversion

## Mental model
A physical page-frame number identifies a 4 KiB page by index. Its physical byte address is `frame * PageSize` and must remain aligned.

## Invariants
- page size is 4096 bytes;
- frame-to-address multiplication is checked;
- address-to-frame conversion rejects unaligned addresses;
- returned addresses use the repository's existing `PhysicalAddress` type.

## C pain
Raw integers blur frame indices and addresses, while shifts and multiplication can overflow or silently accept unaligned values.

## Zig answer
Distinct address types, explicit errors, and checked multiplication preserve the conversion contract.

## Remaining danger
A valid frame number does not prove that the page exists, is usable, or is owned. Physical-memory region and ownership modules must establish those facts.