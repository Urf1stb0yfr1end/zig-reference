# Trace Morphic example

Composes the generic trace with recipe-local runtime, initialization, scheduler, and allocation codes. It records nine representative lifecycle observations in the canonical 4096-event Morphic capacity. It is observation scaffolding, not a scheduler, replay engine, runtime, or system proof.

Run `zig build trace-morphic-example`; test with `zig build test-recipe-trace-morphic-example` or the integrated `zig build verify-morphic-trace`.
