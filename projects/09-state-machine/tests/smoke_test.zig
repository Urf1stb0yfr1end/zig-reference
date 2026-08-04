const std = @import("std");
const subject = @import("state-machine");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
