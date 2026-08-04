# Distinct Memory Address Types

Separate physical, host-virtual, guest-physical, and guest-virtual addresses at the type level.

## C pain

Systems code often represents every address as `uintptr_t` or `usize`. A guest-physical address can then be passed where a host pointer or machine-physical address was expected, and the compiler sees nothing suspicious.

## Zig form

```zig
const host = HostVirtualAddress.init(raw_host_address);
const guest = GuestPhysicalAddress.init(raw_guest_address);
```

The wrappers expose checked addition and subtraction but require explicit unwrapping at translation boundaries.

## Reuse

Page tables, EPT, DMA, boot memory maps, guest loaders, MMIO registries, and address translators.

## Test

```sh
zig build test-distinct-memory-address-types
```
