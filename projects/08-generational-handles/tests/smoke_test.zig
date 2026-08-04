const std = @import("std");
const subject = @import("generational-handles");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
