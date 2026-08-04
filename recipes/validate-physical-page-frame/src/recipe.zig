const std = @import("std");
const addresses = @import("distinct-memory-address-types");
const frames = @import("physical-page-frame-number-and-address-conversion");

pub fn validate(raw: usize) !frames.PhysicalPageFrameNumber {
    return frames.PhysicalPageFrameNumber.fromAddress(addresses.PhysicalAddress.init(raw));
}

test "aligned physical addresses become frames and unaligned values fail" {
    try std.testing.expectEqual(@as(usize, 3), (try validate(0x3000)).value);
    try std.testing.expectError(error.Unaligned, validate(0x3001));
}
