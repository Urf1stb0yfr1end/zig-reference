const std = @import("std");
const subject = @import("source-span");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
