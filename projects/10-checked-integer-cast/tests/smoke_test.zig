const std = @import("std");
const subject = @import("checked-integer-cast");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
