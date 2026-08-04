const std = @import("std");
const subject = @import("bit-set");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
