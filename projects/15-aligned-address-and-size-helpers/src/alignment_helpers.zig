const std = @import("std");

pub const AlignmentError = error{ InvalidAlignment, Overflow };

pub fn isPowerOfTwo(value: usize) bool {
    return value != 0 and (value & (value - 1)) == 0;
}

pub fn isAligned(value: usize, alignment: usize) AlignmentError!bool {
    if (!isPowerOfTwo(alignment)) return error.InvalidAlignment;
    return (value & (alignment - 1)) == 0;
}

pub fn alignDown(value: usize, alignment: usize) AlignmentError!usize {
    if (!isPowerOfTwo(alignment)) return error.InvalidAlignment;
    return value & ~(alignment - 1);
}

pub fn alignUp(value: usize, alignment: usize) AlignmentError!usize {
    if (!isPowerOfTwo(alignment)) return error.InvalidAlignment;
    const mask = alignment - 1;
    const raised = std.math.add(usize, value, mask) catch return error.Overflow;
    return raised & ~mask;
}

pub fn paddingNeeded(value: usize, alignment: usize) AlignmentError!usize {
    const aligned = try alignUp(value, alignment);
    return aligned - value;
}

test "alignment helpers share one power-of-two policy" {
    try std.testing.expect(try isAligned(0x2000, 0x1000));
    try std.testing.expectEqual(@as(usize, 0x2000), try alignDown(0x2345, 0x1000));
    try std.testing.expectEqual(@as(usize, 0x3000), try alignUp(0x2345, 0x1000));
    try std.testing.expectEqual(@as(usize, 0x0cbb), try paddingNeeded(0x2345, 0x1000));
}

test "invalid alignment and overflow fail" {
    try std.testing.expectError(error.InvalidAlignment, alignUp(7, 0));
    try std.testing.expectError(error.InvalidAlignment, alignDown(7, 3));
    try std.testing.expectError(error.Overflow, alignUp(std.math.maxInt(usize), 8));
}
