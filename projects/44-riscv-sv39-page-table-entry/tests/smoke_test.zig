const std = @import("std");
const module = @import("riscv-sv39-page-table-entry");
test "external named import exposes public contract" {
    std.testing.refAllDecls(module);
}
