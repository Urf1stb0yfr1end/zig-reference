const std = @import("std");

fn Address(comptime domain_name: []const u8) type {
    return struct {
        const Self = @This();

        pub const domain = domain_name;

        value: usize,

        pub fn init(value: usize) Self {
            return .{ .value = value };
        }

        pub fn raw(self: Self) usize {
            return self.value;
        }

        pub fn add(self: Self, offset: usize) error{Overflow}!Self {
            const next = std.math.add(usize, self.value, offset) catch return error.Overflow;
            return .{ .value = next };
        }

        pub fn subtract(self: Self, offset: usize) error{Underflow}!Self {
            const next = std.math.sub(usize, self.value, offset) catch return error.Underflow;
            return .{ .value = next };
        }
    };
}

pub const PhysicalAddress = Address("physical");
pub const HostVirtualAddress = Address("host-virtual");
pub const GuestPhysicalAddress = Address("guest-physical");
pub const GuestVirtualAddress = Address("guest-virtual");

test "address domains are distinct types" {
    const physical = PhysicalAddress.init(0x1000);
    const host_virtual = HostVirtualAddress.init(0xffff_8000_0000_1000);

    try std.testing.expectEqual(@as(usize, 0x1000), physical.raw());
    try std.testing.expectEqual(@as(usize, 0xffff_8000_0000_1000), host_virtual.raw());
    try std.testing.expect(@TypeOf(physical) != @TypeOf(host_virtual));
}

test "address arithmetic is checked" {
    const physical = PhysicalAddress.init(0x1000);
    try std.testing.expectEqual(@as(usize, 0x2000), (try physical.add(0x1000)).raw());
    try std.testing.expectError(error.Underflow, physical.subtract(0x1001));
    try std.testing.expectError(error.Overflow, PhysicalAddress.init(std.math.maxInt(usize)).add(1));
}
