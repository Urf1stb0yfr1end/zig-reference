const std = @import("std");

pub const CheckedRange = struct {
    start: usize,
    end: usize,

    pub const Error = error{ InvalidRange, Overflow };

    pub fn init(start_value: usize, end_value: usize) Error!CheckedRange {
        if (end_value < start_value) return error.InvalidRange;
        return .{ .start = start_value, .end = end_value };
    }

    pub fn fromStartAndLength(start_value: usize, range_length: usize) Error!CheckedRange {
        const end_value = std.math.add(usize, start_value, range_length) catch return error.Overflow;
        return init(start_value, end_value);
    }

    pub fn length(self: CheckedRange) usize {
        return self.end - self.start;
    }

    pub fn isEmpty(self: CheckedRange) bool {
        return self.start == self.end;
    }

    pub fn containsValue(self: CheckedRange, value: usize) bool {
        return self.start <= value and value < self.end;
    }

    pub fn containsRange(self: CheckedRange, other: CheckedRange) bool {
        return self.start <= other.start and other.end <= self.end;
    }

    pub fn overlaps(self: CheckedRange, other: CheckedRange) bool {
        return self.start < other.end and other.start < self.end;
    }

    pub fn intersection(self: CheckedRange, other: CheckedRange) ?CheckedRange {
        const intersection_start = @max(self.start, other.start);
        const intersection_end = @min(self.end, other.end);
        if (intersection_end <= intersection_start) return null;
        return .{ .start = intersection_start, .end = intersection_end };
    }
};

test "half-open boundaries remain unambiguous" {
    const range = try CheckedRange.init(10, 20);
    try std.testing.expect(range.containsValue(10));
    try std.testing.expect(!range.containsValue(20));
    try std.testing.expectEqual(@as(usize, 10), range.length());
}

test "overlap and intersection share one boundary policy" {
    const left = try CheckedRange.init(10, 20);
    const right = try CheckedRange.init(15, 25);
    const touching = try CheckedRange.init(20, 30);

    try std.testing.expect(left.overlaps(right));
    try std.testing.expect(!left.overlaps(touching));
    try std.testing.expectEqualDeep(try CheckedRange.init(15, 20), left.intersection(right).?);
    try std.testing.expect(left.intersection(touching) == null);
}

test "invalid and overflowing construction fails" {
    try std.testing.expectError(error.InvalidRange, CheckedRange.init(9, 8));
    try std.testing.expectError(error.Overflow, CheckedRange.fromStartAndLength(std.math.maxInt(usize), 1));
}
