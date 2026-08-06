const std = @import("std");
const module = @import("riscv-page-table-page-owner");
test "external named import exposes public contract" {
    std.testing.refAllDecls(module);
}
