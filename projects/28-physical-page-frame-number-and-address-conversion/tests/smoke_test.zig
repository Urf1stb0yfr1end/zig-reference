const std = @import("std");
const subject = @import("physical-page-frame-number-and-address-conversion");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
