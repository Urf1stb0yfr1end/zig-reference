const std = @import("std");
const subject = @import("aligned-address-and-size-helpers");

test "external named import exposes a compilable public surface" {
    std.testing.refAllDeclsRecursive(subject);
}
