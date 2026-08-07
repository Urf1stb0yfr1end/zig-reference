# Bounded Deterministic Scheduler

An allocation-free scheduler for a fixed number of copied task descriptors. The caller supplies time explicitly; runnable order is `(ready_at, priority, insertion sequence)`.

The direct C design—an array plus ordering convention—is attractive, but capacity, tie order, time monotonicity, and mutation-on-failure are usually informal. This module makes them explicit while leaving task execution and synchronization to the caller.

Porting metadata: [`port.js`](port.js).
