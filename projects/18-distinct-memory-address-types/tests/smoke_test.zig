const std = @import("std");
const subject = @import("distinct-memory-address-types");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
