# Integration Contract

Import `bounded-deterministic-scheduler`, instantiate `BoundedDeterministicScheduler(capacity)`, and call `init(initial_time)`. `schedule` copies `Task` values and can return `Full` or `SequenceOverflow`. `advanceTo` rejects `TimeReversed`. `nextReady` removes one task only when `ready_at <= now()`; `nextWakeTime` observes the earliest time.

Storage is inline, cleanup is unnecessary, and operations allocate nothing. The type is target-neutral and freestanding-compatible. It is not thread-safe. Reset discards all tasks. Equal time and priority preserve insertion order through `fixed-capacity-priority-queue`.
