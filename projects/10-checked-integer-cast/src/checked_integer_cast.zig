const std = @import("std");

/// Converts one integer value to another integer type only when the value is
/// representable by the destination type.
pub fn checkedIntegerCast(comptime Destination: type, value: anytype) error{OutOfRange}!Destination {
    const destination_info = @typeInfo(Destination);
    const source_info = @typeInfo(@TypeOf(value));

    if (destination_info != .int) {
        @compileError("Destination must be an integer type");
    }
    if (source_info != .int and source_info != .comptime_int) {
        @compileError("value must be an integer");
    }

    return std.math.cast(Destination, value) orelse error.OutOfRange;
}

test "accepts representable widening and narrowing conversions" {
    try std.testing.expectEqual(@as(u16, 255), try checkedIntegerCast(u16, @as(u8, 255)));
    try std.testing.expectEqual(@as(u8, 200), try checkedIntegerCast(u8, @as(u16, 200)));
    try std.testing.expectEqual(@as(i8, -12), try checkedIntegerCast(i8, @as(i32, -12)));
}

test "rejects values outside the destination range" {
    try std.testing.expectError(error.OutOfRange, checkedIntegerCast(u8, @as(u16, 256)));
    try std.testing.expectError(error.OutOfRange, checkedIntegerCast(u8, @as(i16, -1)));
    try std.testing.expectError(error.OutOfRange, checkedIntegerCast(i8, @as(u16, 128)));
}

test "supports comptime integer literals" {
    try std.testing.expectEqual(@as(u8, 42), try checkedIntegerCast(u8, 42));
    try std.testing.expectError(error.OutOfRange, checkedIntegerCast(u8, 1000));
}
