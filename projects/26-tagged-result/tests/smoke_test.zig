const std = @import("std");
const subject = @import("tagged-result");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
