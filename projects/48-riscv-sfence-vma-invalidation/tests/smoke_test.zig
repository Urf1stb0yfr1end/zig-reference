const std = @import("std");
const module = @import("riscv-sfence-vma-invalidation");
test "external named import exposes public contract" {
    std.testing.refAllDecls(module);
}
