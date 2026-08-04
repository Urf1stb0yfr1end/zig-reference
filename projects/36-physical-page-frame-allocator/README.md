# Physical Page-Frame Allocator

Allocate physical frames from a validated usable region with fixed metadata.

## Problem and C comparison
A direct C representation is attractive because a slice, cursor, array, or integer fields are small. It degrades when bounds, rollback, ownership, arithmetic, and invalidation remain call-site conventions. This module centralizes those mechanisms; Zig still requires callers to choose capacities, policies, classifications, and lifetimes.

## Design and use
Import `@import("physical-page-frame-allocator")`; the public declarations in `src/physical_page_frame_allocator.zig` provide the complete API. Borrowed views never copy input, fixed-capacity modules allocate nothing, and owned storage requires explicit cleanup.

## Dependencies and inherited guarantees
`bit-set`, `bitmap-allocator`, `checked-half-open-range`, `distinct-memory-address-types`, `physical-page-frame-number-and-address-conversion`, `physical-memory-region-set`. Their checked bounds, casts, address domains, allocation state, and stale-handle rules are inherited rather than recreated.

## Future modules enabled
page tables, EPT tables, guest-memory backing.

## Non-goals
No hidden allocation, synchronization, universal format abstraction, or platform policy.

## Validation
Contracts are checked locally; compiler validation remains pending because Zig 0.14.0 is unavailable in this environment.

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
