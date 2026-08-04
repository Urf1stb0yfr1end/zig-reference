const std = @import("std");
const subject = @import("wrapping-sequence-number");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
