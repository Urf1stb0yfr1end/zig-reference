const std = @import("std");
const subject = @import("validated-bit-flags");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
