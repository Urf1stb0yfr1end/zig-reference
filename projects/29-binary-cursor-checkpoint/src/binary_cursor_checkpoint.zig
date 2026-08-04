const std = @import("std");
const bounded = @import("bounded-byte-reader");

pub const BinaryCursorCheckpoint = struct {
    position_: usize,
    extent_: usize,

    pub fn capture(reader: bounded.BoundedReader) BinaryCursorCheckpoint {
        return .{ .position_ = reader.position(), .extent_ = reader.extent() };
    }
    pub fn position(self: BinaryCursorCheckpoint) usize { return self.position_; }
    pub fn restore(self: BinaryCursorCheckpoint, reader: *bounded.BoundedReader) error{IncompatibleInput}!void {
        if (reader.extent() != self.extent_) return error.IncompatibleInput;
        reader.seek(self.position_) catch return error.IncompatibleInput;
    }
};

pub fn capture(reader: bounded.BoundedReader) BinaryCursorCheckpoint { return BinaryCursorCheckpoint.capture(reader); }
pub fn restore(checkpoint: BinaryCursorCheckpoint, reader: *bounded.BoundedReader) error{IncompatibleInput}!void { return checkpoint.restore(reader); }

test "capture and restore speculative reads" {
    var r = bounded.BoundedReader.init("abcd"); const mark = capture(r); _ = try r.readBytes(3); try restore(mark, &r);
    try std.testing.expectEqual(@as(usize, 0), r.position());
}
test "incompatible extents fail atomically" {
    const a = bounded.BoundedReader.init("abc"); var b = bounded.BoundedReader.init("xy"); try b.seek(1); const before = b.position();
    try std.testing.expectError(error.IncompatibleInput, capture(a).restore(&b)); try std.testing.expectEqual(before, b.position());
}
