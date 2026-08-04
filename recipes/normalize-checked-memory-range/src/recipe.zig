const std = @import("std");
const ranges = @import("checked-half-open-range");
const alignment = @import("aligned-address-and-size-helpers");

pub fn normalize(start: usize, end: usize, page_size: usize) !ranges.CheckedRange {
    const checked = try ranges.CheckedRange.init(start, end);
    return ranges.CheckedRange.init(try alignment.alignDown(checked.start, page_size), try alignment.alignUp(checked.end, page_size));
}

test "range expands to page boundaries and invalid input fails" {
    const result = try normalize(0x1001, 0x2fff, 0x1000);
    try std.testing.expectEqual(@as(usize, 0x1000), result.start);
    try std.testing.expectEqual(@as(usize, 0x3000), result.end);
    try std.testing.expectError(error.InvalidRange, normalize(8, 7, 4));
}
