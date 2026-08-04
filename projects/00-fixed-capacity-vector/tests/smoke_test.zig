const std = @import("std");
const subject = @import("fixed-capacity-vector");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
