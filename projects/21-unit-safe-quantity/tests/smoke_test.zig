const std = @import("std");
const subject = @import("unit-safe-quantity");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
