# Physical Page Frame Number and Address Conversion

Bridges physical page-frame indices and aligned physical addresses using one explicit 4 KiB page policy.

This is the first direct Hyper-Zig-oriented module in the new batch. It reuses the existing `PhysicalAddress` type instead of introducing another raw-address convention.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
