# Length-Prefixed Binary Field

Decode an explicitly endian length prefix and borrow its bounded payload.

## Problem and C comparison
A direct C representation is attractive because a slice, cursor, array, or integer fields are small. It degrades when bounds, rollback, ownership, arithmetic, and invalidation remain call-site conventions. This module centralizes those mechanisms; Zig still requires callers to choose capacities, policies, classifications, and lifetimes.

## Design and use
Import `@import("length-prefixed-binary-field")`; the public declarations in `src/length_prefixed_binary_field.zig` provide the complete API. Borrowed views never copy input, fixed-capacity modules allocate nothing, and owned storage requires explicit cleanup.

## Dependencies and inherited guarantees
`bounded-byte-reader`, `checked-integer-cast`, `endian-integer-codec`, `binary-cursor-checkpoint`, `bounded-binary-sub-reader`. Their checked bounds, casts, address domains, allocation state, and stale-handle rules are inherited rather than recreated.

## Future modules enabled
binary strings, network frames, metadata blocks.

## Non-goals
No hidden allocation, synchronization, universal format abstraction, or platform policy.

## Validation
Contracts are checked locally; compiler validation remains pending because Zig 0.14.0 is unavailable in this environment.
