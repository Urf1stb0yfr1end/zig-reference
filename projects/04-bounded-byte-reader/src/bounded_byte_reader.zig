const std = @import("std");

/// A cursor over borrowed bytes that never advances beyond its input.
///
/// Owns:
/// - only its cursor
///
/// Borrows:
/// - the input slice for the reader's entire useful lifetime
///
/// Invariants:
/// - cursor <= input.len
/// - failed reads leave cursor unchanged
/// - every returned slice lies completely inside input
pub const BoundedReader = struct {
    pub const Error = error{UnexpectedEnd};

    input: []const u8,
    cursor: usize = 0,

    pub fn init(input: []const u8) BoundedReader {
        return .{ .input = input };
    }

    pub fn position(self: BoundedReader) usize {
        return self.cursor;
    }

    pub fn remaining(self: BoundedReader) usize {
        return self.input.len - self.cursor;
    }

    /// Total extent of the borrowed input. Useful for validating parser checkpoints.
    pub fn extent(self: BoundedReader) usize {
        return self.input.len;
    }

    /// Move to a previously validated position. Invalid positions leave the reader unchanged.
    pub fn seek(self: *BoundedReader, position_: usize) error{InvalidPosition}!void {
        if (position_ > self.input.len) return error.InvalidPosition;
        self.cursor = position_;
    }

    pub fn isAtEnd(self: BoundedReader) bool {
        return self.cursor == self.input.len;
    }

    pub fn readByte(self: *BoundedReader) Error!u8 {
        const bytes = try self.readBytes(1);
        return bytes[0];
    }

    pub fn readBytes(self: *BoundedReader, count: usize) Error![]const u8 {
        if (count > self.remaining()) return error.UnexpectedEnd;

        const start = self.cursor;
        const end = start + count;
        self.cursor = end;
        return self.input[start..end];
    }

    pub fn skip(self: *BoundedReader, count: usize) Error!void {
        _ = try self.readBytes(count);
    }

    pub fn subReader(self: *BoundedReader, count: usize) Error!BoundedReader {
        return BoundedReader.init(try self.readBytes(count));
    }

    pub fn readU16Le(self: *BoundedReader) Error!u16 {
        const bytes = try self.readBytes(2);
        return @as(u16, bytes[0]) |
            (@as(u16, bytes[1]) << 8);
    }

    pub fn readU16Be(self: *BoundedReader) Error!u16 {
        const bytes = try self.readBytes(2);
        return (@as(u16, bytes[0]) << 8) |
            @as(u16, bytes[1]);
    }

    pub fn readU32Le(self: *BoundedReader) Error!u32 {
        const bytes = try self.readBytes(4);
        return @as(u32, bytes[0]) |
            (@as(u32, bytes[1]) << 8) |
            (@as(u32, bytes[2]) << 16) |
            (@as(u32, bytes[3]) << 24);
    }

    pub fn readU32Be(self: *BoundedReader) Error!u32 {
        const bytes = try self.readBytes(4);
        return (@as(u32, bytes[0]) << 24) |
            (@as(u32, bytes[1]) << 16) |
            (@as(u32, bytes[2]) << 8) |
            @as(u32, bytes[3]);
    }
};

test "read bytes and track remaining input" {
    var reader = BoundedReader.init(&[_]u8{ 10, 20, 30, 40 });

    try std.testing.expectEqual(@as(u8, 10), try reader.readByte());
    try std.testing.expectEqualSlices(u8, &[_]u8{ 20, 30 }, try reader.readBytes(2));
    try std.testing.expectEqual(@as(usize, 3), reader.position());
    try std.testing.expectEqual(@as(usize, 1), reader.remaining());
    try std.testing.expect(!reader.isAtEnd());

    try reader.skip(1);
    try std.testing.expect(reader.isAtEnd());
}

test "failed reads do not move the cursor" {
    var reader = BoundedReader.init(&[_]u8{ 1, 2, 3 });
    try reader.skip(2);
    const before = reader.position();

    try std.testing.expectError(error.UnexpectedEnd, reader.readBytes(2));
    try std.testing.expectEqual(before, reader.position());
}

test "read explicit little and big endian integers" {
    var little = BoundedReader.init(&[_]u8{ 0x34, 0x12, 0x78, 0x56, 0x34, 0x12 });
    try std.testing.expectEqual(@as(u16, 0x1234), try little.readU16Le());
    try std.testing.expectEqual(@as(u32, 0x12345678), try little.readU32Le());

    var big = BoundedReader.init(&[_]u8{ 0x12, 0x34, 0x12, 0x34, 0x56, 0x78 });
    try std.testing.expectEqual(@as(u16, 0x1234), try big.readU16Be());
    try std.testing.expectEqual(@as(u32, 0x12345678), try big.readU32Be());
}

test "sub-reader cannot escape its declared section" {
    var outer = BoundedReader.init(&[_]u8{ 1, 2, 3, 4, 5 });
    var section = try outer.subReader(3);

    try std.testing.expectEqualSlices(u8, &[_]u8{ 1, 2, 3 }, try section.readBytes(3));
    try std.testing.expectError(error.UnexpectedEnd, section.readByte());
    try std.testing.expectEqual(@as(usize, 3), outer.position());
    try std.testing.expectEqualSlices(u8, &[_]u8{ 4, 5 }, try outer.readBytes(2));
}

test "zero-length reads are valid and do not advance" {
    var reader = BoundedReader.init(&[_]u8{9});

    try std.testing.expectEqual(@as(usize, 0), (try reader.readBytes(0)).len);
    try std.testing.expectEqual(@as(usize, 0), reader.position());
}

test "seek validates the input extent and is failure atomic" {
    var reader = BoundedReader.init("abc");
    try reader.seek(2);
    try std.testing.expectEqual(@as(usize, 2), reader.position());
    try std.testing.expectError(error.InvalidPosition, reader.seek(4));
    try std.testing.expectEqual(@as(usize, 2), reader.position());
    try std.testing.expectEqual(@as(usize, 3), reader.extent());
}
