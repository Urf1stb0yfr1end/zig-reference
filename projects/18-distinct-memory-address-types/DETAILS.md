# Distinct Memory Address Types: Integration Contract

## Purpose
Prevent accidental interchange of physical, host-virtual, guest-physical, and guest-virtual address domains.

## Public surface
- `PhysicalAddress`
- `HostVirtualAddress`
- `GuestPhysicalAddress`
- `GuestVirtualAddress`

Each type provides:
- `init(value: usize) Self`
- `raw() usize`
- `add(offset) error{Overflow}!Self`
- `subtract(offset) error{Underflow}!Self`

## Inputs and outputs
All values are copied. No allocation, borrowing, cleanup, or invalidation.

## Invariants
Arithmetic preserves the address domain. Domain crossing cannot happen implicitly.

## Failure behavior
Overflow and underflow return errors before a new address is produced.

## Dependencies
No repository dependencies. Uses checked `std.math` arithmetic.

## Expected dependents
Host page tables, EPT, physical allocators, DMA mappings, guest memory managers, executable loaders, MMIO registries, and address translation diagnostics.

## Compatibility
Target-width `usize`; hosted and freestanding suitable; allocation-free and thread-safe.

## Complexity
All operations O(1), one `usize` of storage.

## Validation
```sh
zig build test-distinct-memory-address-types
```
Compiler validation remains pending.
