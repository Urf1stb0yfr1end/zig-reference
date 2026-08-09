# Bounded User Memory Transfer Plan

Plans an entire user virtual byte range as ordered physical fragments before a caller performs a copy. The planner is allocation-free, checks range arithmetic and permissions, preserves page offsets, and returns no plan on any failure.

It is policy-only: it does not dereference user pointers, copy bytes, walk Sv39 tables, or implement syscalls. A caller adapts its bounded page-table query to `PageQuery`.

Run `zig build test-bounded-user-memory-transfer-plan` and `zig build smoke-bounded-user-memory-transfer-plan`.

Porting metadata: [`port.js`](port.js).
