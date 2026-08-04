# Wrapping Sequence Number

A typed unsigned sequence value whose modulo wraparound is deliberate rather than accidental.

Use it for protocol sequence numbers, ring epochs, hardware counters, and generation-like values where rollover is part of the domain.

```zig
const Seq = WrappingSequenceNumber(u16);
const next = Seq.init(65535).next(); // 0
```

The module owns no resources and is suitable for hosted or freestanding code.