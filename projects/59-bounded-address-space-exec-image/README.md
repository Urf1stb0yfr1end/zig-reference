# Bounded address space and exec image

Linux-independent bounded mapping state plus failure-atomic main/interpreter planning and complete page-image materialization. It composes project 54, copies every validated segment contribution into zero-initialized owned pages, and enforces W+X=0; it does not implement Linux syscalls, physical allocation, live mapping, or userspace relocations.

See [port.js](port.js) for Zig-version migration constraints.
