const std = @import("std");
const m = @import("bounded-binary-sub-reader");
const rmod = @import("bounded-byte-reader");
test "external sub-reader consumer" {
    var r = rmod.BoundedReader.init("ab");
    var s = try m.BoundedBinarySubReader.create(&r, 1, .on_commit);
    try std.testing.expectEqual(@as(u8, 'a'), try s.reader().readByte());
    try s.commit();
    try std.testing.expectError(error.UnexpectedEnd, m.BoundedBinarySubReader.create(&r, 2, .immediate));
}
