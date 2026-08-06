const std = @import("std");
const bounded = @import("bounded-byte-reader");
const endian_codec = @import("endian-integer-codec");
const cast = @import("checked-integer-cast");
const checkpoints = @import("binary-cursor-checkpoint");
const sub = @import("bounded-binary-sub-reader");
const fields = @import("length-prefixed-binary-field");

pub fn TlvDecoder(comptime Tag: type, comptime Length: type, comptime endian: std.builtin.Endian) type {
    _ = fields;
    return struct {
        pub const Record = struct {
            tag: Tag,
            value: []const u8,
            pub fn valueReader(self: @This()) bounded.BoundedReader {
                return bounded.BoundedReader.init(self.value);
            }
        };
        pub const Error = error{ UnexpectedEnd, OutOfRange };
        reader: bounded.BoundedReader,
        pub fn init(bytes: []const u8) @This() {
            return .{ .reader = bounded.BoundedReader.init(bytes) };
        }
        pub fn next(self: *@This()) Error!?Record {
            if (self.reader.isAtEnd()) return null;
            const mark = checkpoints.capture(self.reader);
            errdefer mark.restore(&self.reader) catch unreachable;
            const tag_bytes = self.reader.readBytes(@sizeOf(Tag)) catch return error.UnexpectedEnd;
            var tag_fixed: [@sizeOf(Tag)]u8 = undefined;
            @memcpy(&tag_fixed, tag_bytes);
            const tag = endian_codec.EndianIntegerCodec(Tag, endian).decode(&tag_fixed);
            const len_bytes = self.reader.readBytes(@sizeOf(Length)) catch return error.UnexpectedEnd;
            var len_fixed: [@sizeOf(Length)]u8 = undefined;
            @memcpy(&len_fixed, len_bytes);
            const len = cast.checkedIntegerCast(usize, endian_codec.EndianIntegerCodec(Length, endian).decode(&len_fixed)) catch return error.OutOfRange;
            var region = sub.BoundedBinarySubReader.create(&self.reader, len, .immediate) catch return error.UnexpectedEnd;
            return .{ .tag = tag, .value = region.reader().readBytes(len) catch unreachable };
        }
        pub fn position(self: @This()) usize {
            return self.reader.position();
        }
    };
}
test "iterates unknown tags and empty values" {
    var d = TlvDecoder(u8, u8, .big).init(&.{ 99, 0, 1, 2, 7, 8 });
    const a = (try d.next()).?;
    try std.testing.expectEqual(@as(u8, 99), a.tag);
    try std.testing.expectEqual(@as(usize, 0), a.value.len);
    const b = (try d.next()).?;
    try std.testing.expectEqualSlices(u8, &.{ 7, 8 }, b.value);
    try std.testing.expect((try d.next()) == null);
}
test "truncation is failure atomic" {
    var d = TlvDecoder(u8, u16, .big).init(&.{ 1, 0 });
    try std.testing.expectError(error.UnexpectedEnd, d.next());
    try std.testing.expectEqual(@as(usize, 0), d.position());
}
