const std = @import("std");
const subject = @import("byte-writer");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
