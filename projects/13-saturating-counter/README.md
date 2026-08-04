# Saturating Counter

An unsigned counter with an explicit maximum and a deliberate saturation policy.

C counters frequently wrap because overflow behavior was never chosen as part of the design. This module makes the policy visible: addition clamps at the configured maximum and subtraction clamps at zero.

```zig
const SaturatingCounter = @import("src/saturating_counter.zig").SaturatingCounter;
const RetryCount = SaturatingCounter(u8, 8);
var retries = RetryCount.init(0);
retries.increment();
```

## Reuse

Useful for quotas, retry counts, telemetry, bounded resource pressure, error counters, and hardware-style status fields.

## Test

```sh
zig build test-saturating-counter
```

## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
