const std = @import("std");
const subject = @import("ring-buffer");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
