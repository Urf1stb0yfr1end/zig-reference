# Optional Typed Handle

Creates opaque handle types distinguished by a compile-time tag and represents absence with Zig's optional type instead of magic integers.

Use separate tags for VMs, devices, timers, files, or any resource domain. Two handles with the same integer representation remain different concrete types.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
