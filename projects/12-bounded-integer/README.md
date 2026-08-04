# Bounded Integer

A generic integer value constrained to a compile-time inclusive range.

Instead of allowing impossible values to travel through a program and checking them repeatedly, construction and mutation enforce the range once.

```zig
const BoundedInteger = @import("src/bounded_integer.zig").BoundedInteger;
const InterruptPriority = BoundedInteger(u8, 0, 15);
var priority = try InterruptPriority.init(raw_priority);
```

Failed construction or mutation returns `error.OutOfRange`; failed mutation leaves the previous value unchanged.

## Reuse

Useful for priorities, ports, dimensions, queue limits, CPU identifiers, register fields, protocol versions, and configuration values.

## Test

```sh
zig build test-bounded-integer
```

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
