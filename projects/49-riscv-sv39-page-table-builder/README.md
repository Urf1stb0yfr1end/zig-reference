# RISC-V Sv39 Page Table Builder

Deterministic Sv39 mapping, walking, protection, unmapping, and rollback. It preserves reusable architectural rules, ownership, and failure behavior.

Live permission replacement preserves the mapped physical target and leaf level, performs one valid-leaf-to-valid-leaf provider write, and returns the required translation invalidation plan; it does not transiently unmap the address.

See [Zig portability contract](port.js).
