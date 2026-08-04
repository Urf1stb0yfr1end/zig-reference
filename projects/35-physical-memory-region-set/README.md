# Physical Memory Region Set

Validate, order, merge, and query fixed-capacity physical regions.

## Problem and C comparison
A direct C representation is attractive because a slice, cursor, array, or integer fields are small. It degrades when bounds, rollback, ownership, arithmetic, and invalidation remain call-site conventions. This module centralizes those mechanisms; Zig still requires callers to choose capacities, policies, classifications, and lifetimes.

## Design and use
Import `@import("physical-memory-region-set")`; the public declarations in `src/physical_memory_region_set.zig` provide the complete API. Borrowed views never copy input, fixed-capacity modules allocate nothing, and owned storage requires explicit cleanup.

## Dependencies and inherited guarantees
`fixed-capacity-vector`, `validated-enum-decoder`, `checked-half-open-range`, `distinct-memory-address-types`, `physical-page-frame-number-and-address-conversion`. Their checked bounds, casts, address domains, allocation state, and stale-handle rules are inherited rather than recreated.

## Future modules enabled
firmware memory maps, reserved-region exclusion, boot planning.

## Non-goals
No hidden allocation, synchronization, universal format abstraction, or platform policy.

## Validation
Contracts are checked locally; compiler validation remains pending because Zig 0.14.0 is unavailable in this environment.
