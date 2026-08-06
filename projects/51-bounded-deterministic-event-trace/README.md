# Bounded deterministic event trace

A single-threaded, allocation-free trace mechanism for normalized fixed-width events. Callers define stable numeric domains and kinds; the trace supplies bounded inline storage, sequence assignment, failure atomicity, semantic comparison, and canonical text. It is not a scheduler, replay engine, clock, dynamic-string logger, file/UART writer, hypervisor, runtime, or allocation enforcer.

Unlike native struct dumping, `render` formats every field explicitly, so host and target traces can be compared as bytes. The module is a tested observation foundation, not proof of a Morphic system.

See the [porting contract](port.js) before changing the Zig baseline.
