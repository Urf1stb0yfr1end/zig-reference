const std = @import("std");
const bounded = @import("bounded-byte-reader");
const cast = @import("checked-integer-cast");
const endian_codec = @import("endian-integer-codec");
const checkpoints = @import("binary-cursor-checkpoint");
const sub = @import("bounded-binary-sub-reader");

pub fn LengthPrefixedField(comptime Prefix: type, comptime endian: std.builtin.Endian) type {
    return struct {
        pub const Error = error{ UnexpectedEnd, OutOfRange };
        payload: []const u8,
        pub fn read(reader: *bounded.BoundedReader) Error!@This() {
            const mark = checkpoints.capture(reader.*); errdefer mark.restore(reader) catch unreachable;
            const bytes = reader.readBytes(@sizeOf(Prefix)) catch return error.UnexpectedEnd;
            var fixed: [@sizeOf(Prefix)]u8 = undefined; @memcpy(&fixed, bytes);
            const raw = endian_codec.EndianIntegerCodec(Prefix, endian).decode(&fixed);
            const length = cast.checkedIntegerCast(usize, raw) catch return error.OutOfRange;
            var region = sub.BoundedBinarySubReader.create(reader, length, .immediate) catch return error.UnexpectedEnd;
            return .{ .payload = region.reader().readBytes(length) catch unreachable };
        }
        pub fn bytes(self: @This()) []const u8 { return self.payload; }
        pub fn subReader(self: @This()) bounded.BoundedReader { return bounded.BoundedReader.init(self.payload); }
    };
}

test "reads borrowed field and rolls back truncation" {
    var r = bounded.BoundedReader.init(&.{ 0, 2, 9, 8 }); const f = try LengthPrefixedField(u16, .big).read(&r);
    try std.testing.expectEqualSlices(u8, &.{9,8}, f.bytes());
    var bad = bounded.BoundedReader.init(&.{ 3, 1 }); try std.testing.expectError(error.UnexpectedEnd, LengthPrefixedField(u8, .little).read(&bad)); try std.testing.expectEqual(@as(usize,0), bad.position());
}
test "zero payload is supported" { var r = bounded.BoundedReader.init(&.{0}); const f = try LengthPrefixedField(u8,.little).read(&r); try std.testing.expectEqual(@as(usize,0), f.bytes().len); }
