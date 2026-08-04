const std = @import("std");
const subject = @import("endian-integer-codec");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
