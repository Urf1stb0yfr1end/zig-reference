const std = @import("std");
const subject = @import("bounded-byte-reader");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
