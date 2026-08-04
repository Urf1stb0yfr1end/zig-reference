const std = @import("std");
const addresses = @import("distinct-memory-address-types");

pub const PageSize = 4096;

pub const PhysicalPageFrameNumber = struct {
    value: usize,

    pub fn init(value: usize) PhysicalPageFrameNumber {
        return .{ .value = value };
    }

    pub fn toAddress(self: PhysicalPageFrameNumber) error{Overflow}!addresses.PhysicalAddress {
        const raw = std.math.mul(usize, self.value, PageSize) catch return error.Overflow;
        return addresses.PhysicalAddress.init(raw);
    }

    pub fn fromAddress(address: addresses.PhysicalAddress) error{Unaligned}!PhysicalPageFrameNumber {
        if ((address.raw() & (PageSize - 1)) != 0) return error.Unaligned;
        return .{ .value = address.raw() / PageSize };
    }
};

test "page frame numbers and aligned physical addresses round trip" {
    const frame = PhysicalPageFrameNumber.init(3);
    const address = try frame.toAddress();
    try std.testing.expectEqual(@as(usize, 0x3000), address.raw());
    try std.testing.expectEqual(@as(usize, 3), (try PhysicalPageFrameNumber.fromAddress(address)).value);
    try std.testing.expectError(error.Unaligned, PhysicalPageFrameNumber.fromAddress(addresses.PhysicalAddress.init(0x3001)));
}
