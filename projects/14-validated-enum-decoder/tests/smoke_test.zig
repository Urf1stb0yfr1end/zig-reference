const std = @import("std");
const subject = @import("validated-enum-decoder");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
