const std = @import("std");
const subject = @import("optional-typed-handle");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
