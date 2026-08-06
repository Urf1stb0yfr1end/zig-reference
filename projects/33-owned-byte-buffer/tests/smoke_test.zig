const std = @import("std");
const m = @import("owned-byte-buffer");
test "external owned buffer consumer" {
    var b = try m.OwnedByteBuffer.initCopy(std.testing.allocator, "a");
    defer b.deinit();
    try b.appendByte('b');
    try std.testing.expectEqualStrings("ab", b.bytes());
    b.clearRetainingCapacity();
    try std.testing.expectEqual(@as(usize, 0), b.bytes().len);
}
