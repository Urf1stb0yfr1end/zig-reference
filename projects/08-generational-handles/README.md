# Generational Handles

This module stores values in a fixed-capacity table and returns an index plus a generation. Access succeeds only while both still identify the occupied slot, so removing and reusing a slot does not make an old handle silently name its replacement.

A C table of values and integer indices is attractive because it is compact and direct. As removal and reuse arrive, validity becomes an informal convention; raw pointers also escape without recording the slot lifetime. `HandleTable` makes occupancy and generation checks part of every lookup. It still cannot clean up resources owned by `T`, choose an acceptable generation-wrap policy for an indefinitely running system, or synchronize callers.

```zig
const HandleTable = @import("src/generational_handles.zig").HandleTable;
var table = HandleTable(u32, 8){};
const handle = try table.insert(42);
const value = table.get(handle).?;
```

Registries for devices, timers, entities, virtual machines, and vCPUs can build on this identity boundary.

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
