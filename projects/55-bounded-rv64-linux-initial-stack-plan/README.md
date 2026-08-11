# Bounded RV64 Linux Initial Stack Plan

An allocation-free, failure-atomic planner for a deliberately narrow Linux-style RV64 initial process stack. It emits one deterministic byte image for `[initial_sp, stack_top)` containing `argc`, ordered `argv`/`envp` pointers and sentinels, ordered auxiliary-vector pairs and `AT_NULL`, zero padding, and NUL-terminated strings.

Use `plan` with explicit compile-time byte/vector capacities and a checked guest virtual stack range. The module writes no guest memory and performs no ELF, page-table, kernel, QEMU, or syscall work.

Zig-version migration constraints are recorded in [`port.js`](port.js).
