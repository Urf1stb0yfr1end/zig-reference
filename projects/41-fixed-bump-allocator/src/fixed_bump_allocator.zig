const std = @import("std");
const alignment = @import("aligned-address-and-size-helpers");

/// Monotonic allocator over caller-owned bytes. Every returned slice is
/// invalidated by reset or by the caller ending the backing buffer lifetime.
pub const FixedBumpAllocator = struct {
    buffer: []u8,
    cursor: usize = 0,
    pub const Error = error{ InvalidAlignment, Overflow, OutOfMemory };

    pub fn init(buffer: []u8) FixedBumpAllocator {
        return .{ .buffer = buffer };
    }
    pub fn used(self: *const FixedBumpAllocator) usize {
        return self.cursor;
    }
    pub fn remaining(self: *const FixedBumpAllocator) usize {
        return self.buffer.len - self.cursor;
    }
    pub fn reset(self: *FixedBumpAllocator) void {
        self.cursor = 0;
    }

    pub fn allocate(self: *FixedBumpAllocator, length: usize, requested_alignment: usize) Error![]u8 {
        if (!alignment.isPowerOfTwo(requested_alignment)) return error.InvalidAlignment;
        const base = @intFromPtr(self.buffer.ptr);
        const current = std.math.add(usize, base, self.cursor) catch return error.Overflow;
        const aligned = alignment.alignUp(current, requested_alignment) catch |err| return switch (err) {
            error.InvalidAlignment => error.InvalidAlignment,
            error.Overflow => error.Overflow,
        };
        const offset = aligned - base;
        const end = std.math.add(usize, offset, length) catch return error.Overflow;
        if (end > self.buffer.len) return error.OutOfMemory;
        self.cursor = end;
        return self.buffer[offset..end];
    }
};

test "alignment, exhaustion, failure atomicity, reset, and empty backing" {
    var storage: [32]u8 = undefined;
    var arena = FixedBumpAllocator.init(&storage);
    const first = try arena.allocate(3, 1);
    const second = try arena.allocate(4, 8);
    try std.testing.expectEqual(@as(usize, 0), @intFromPtr(second.ptr) & 7);
    try std.testing.expect(first.len == 3 and second.len == 4);
    const before = arena.used();
    try std.testing.expectError(error.OutOfMemory, arena.allocate(100, 1));
    try std.testing.expectEqual(before, arena.used());
    try std.testing.expectError(error.InvalidAlignment, arena.allocate(1, 3));
    arena.reset();
    try std.testing.expectEqual(@as(usize, 0), arena.used());
    var empty: [0]u8 = .{};
    var zero = FixedBumpAllocator.init(&empty);
    try std.testing.expectError(error.OutOfMemory, zero.allocate(1, 1));
}
