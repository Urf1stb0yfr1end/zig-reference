const std = @import("std");
const subject = @import("saturating-counter");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
