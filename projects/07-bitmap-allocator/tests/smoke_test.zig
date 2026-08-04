const std = @import("std");
const subject = @import("bitmap-allocator");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
