const std = @import("std");
const subject = @import("stack");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
