const std = @import("std");
const subject = @import("fourcc-code");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
