const std = @import("std");

/// Selects retained evidence slots without allowing bounded diagnostics to
/// become a semantic execution limit. The first `capacity` calls receive
/// stable slots; later calls increment `dropped` and receive null.
pub fn observe(comptime capacity: usize, retained: *usize, total: *usize, dropped: *usize) ?usize {
    comptime std.debug.assert(capacity > 0);
    if (total.* < std.math.maxInt(usize)) total.* += 1;
    if (retained.* < capacity) {
        const index = retained.*;
        retained.* += 1;
        return index;
    }
    if (dropped.* < std.math.maxInt(usize)) dropped.* += 1;
    return null;
}

test "preserves the first retained window and counts later calls as dropped" {
    var retained: usize = 0;
    var total: usize = 0;
    var dropped: usize = 0;
    var records = [_]usize{0} ** 4;
    for (0..7) |value| {
        if (observe(records.len, &retained, &total, &dropped)) |index| records[index] = value;
    }
    try std.testing.expectEqualSlices(usize, &.{ 0, 1, 2, 3 }, &records);
    try std.testing.expectEqual(@as(usize, 4), retained);
    try std.testing.expectEqual(@as(usize, 7), total);
    try std.testing.expectEqual(@as(usize, 3), dropped);
}

test "counters saturate instead of wrapping" {
    var retained: usize = 1;
    var total: usize = std.math.maxInt(usize);
    var dropped: usize = std.math.maxInt(usize);
    try std.testing.expect(observe(1, &retained, &total, &dropped) == null);
    try std.testing.expectEqual(std.math.maxInt(usize), total);
    try std.testing.expectEqual(std.math.maxInt(usize), dropped);
}
