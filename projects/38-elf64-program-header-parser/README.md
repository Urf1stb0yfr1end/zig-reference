# ELF64 Program-Header Parser

Parse validated ELF64 segments and bounded fixed-capacity tables.

## Problem and C comparison
A direct C representation is attractive because a slice, cursor, array, or integer fields are small. It degrades when bounds, rollback, ownership, arithmetic, and invalidation remain call-site conventions. This module centralizes those mechanisms; Zig still requires callers to choose capacities, policies, classifications, and lifetimes.

## Design and use
Import `@import("elf64-program-header-parser")`; the public declarations in `src/elf64_program_header_parser.zig` provide the complete API. Borrowed views never copy input, fixed-capacity modules allocate nothing, and owned storage requires explicit cleanup.

## Dependencies and inherited guarantees
`fixed-capacity-vector`, `bounded-byte-reader`, `checked-integer-cast`, `validated-enum-decoder`, `aligned-address-and-size-helpers`, `validated-bit-flags`, `checked-half-open-range`, `distinct-memory-address-types`, `endian-integer-codec`, `binary-cursor-checkpoint`, `bounded-binary-sub-reader`, `elf64-file-header-parser`. Their checked bounds, casts, address domains, allocation state, and stale-handle rules are inherited rather than recreated.

## Future modules enabled
ELF load plans, kernel image loaders, W^X mapping planners.

## Non-goals
No hidden allocation, synchronization, universal format abstraction, or platform policy.

## Validation
Contracts are checked locally; compiler validation remains pending because Zig 0.14.0 is unavailable in this environment.
