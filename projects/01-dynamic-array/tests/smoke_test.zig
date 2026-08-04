const std = @import("std");
const subject = @import("dynamic-array");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
