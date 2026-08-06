const std = @import("std");
const module = @import("riscv-sv39-page-table-builder");
test "external named import exposes public contract" {
    std.testing.refAllDecls(module);
}
