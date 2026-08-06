const std = @import("std");
const module = @import("riscv-sv39-virtual-address-indexing");
test "external named import exposes public contract" {
    std.testing.refAllDecls(module);
}
