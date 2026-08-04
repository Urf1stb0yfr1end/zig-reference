const std = @import("std");

/// Half-open byte span into a source buffer.
pub const SourceSpan = struct {
    start: usize,
    end: usize,

    pub const Error = error{InvalidOrder};

    pub fn init(start: usize, end: usize) Error!SourceSpan {
        if (end < start) return error.InvalidOrder;
        return .{ .start = start, .end = end };
    }

    pub fn len(self: SourceSpan) usize {
        return self.end - self.start;
    }

    pub fn isEmpty(self: SourceSpan) bool {
        return self.start == self.end;
    }

    pub fn slice(self: SourceSpan, source: []const u8) error{OutOfBounds}![]const u8 {
        if (self.end > source.len) return error.OutOfBounds;
        return source[self.start..self.end];
    }
};

test "source spans preserve half-open boundaries" {
    const span = try SourceSpan.init(2, 5);
    try std.testing.expectEqual(@as(usize, 3), span.len());
    try std.testing.expectEqualStrings("cde", try span.slice("abcdef"));
    try std.testing.expectError(error.InvalidOrder, SourceSpan.init(5, 4));
}
