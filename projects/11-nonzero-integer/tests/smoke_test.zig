const std = @import("std");
const subject = @import("nonzero-integer");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
