const std = @import("std");
const m = @import("elf64-program-header-parser");
const rmod = @import("bounded-byte-reader");
test "external ELF segment consumer" {
    var bytes = [_]u8{0} ** 56;
    bytes[0] = 1;
    bytes[4] = 4;
    var r = rmod.BoundedReader.init(&bytes);
    const s = try m.parseOne(&r, .little);
    try std.testing.expect(s.permissions.contains(.read));
    var short = rmod.BoundedReader.init(&.{0});
    try std.testing.expectError(error.UnexpectedEnd, m.parseOne(&short, .little));
}
