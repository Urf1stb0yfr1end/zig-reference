const std = @import("std");
const subject = @import("checked-half-open-range");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
