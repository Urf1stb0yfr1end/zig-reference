const std = @import("std");
const bit_set = @import("bit-set");

/// A fixed-capacity allocator for integer slots.
///
/// A set bit means the corresponding slot is allocated.
pub fn BitmapAllocator(comptime slot_count: usize) type {
    return struct {
        const Self = @This();
        const Bits = bit_set.BitSet(slot_count);

        pub const Error = error{
            Full,
            IndexOutOfBounds,
            DoubleFree,
        };

        used: Bits = .{},
        next_hint: usize = 0,

        pub fn capacity(_: *const Self) usize {
            return slot_count;
        }

        pub fn allocatedCount(self: *const Self) usize {
            return self.used.countSet();
        }

        pub fn isAllocated(self: *const Self, index: usize) error{IndexOutOfBounds}!bool {
            return self.used.isSet(index) catch error.IndexOutOfBounds;
        }

        pub fn allocate(self: *Self) Error!usize {
            if (slot_count == 0 or self.used.all()) return error.Full;

            var offset: usize = 0;
            while (offset < slot_count) : (offset += 1) {
                const index = (self.next_hint + offset) % slot_count;
                if (!(self.used.isSet(index) catch unreachable)) {
                    self.used.set(index) catch unreachable;
                    self.next_hint = (index + 1) % slot_count;
                    return index;
                }
            }

            return error.Full;
        }

        pub fn free(self: *Self, index: usize) Error!void {
            const allocated = self.used.isSet(index) catch return error.IndexOutOfBounds;
            if (!allocated) return error.DoubleFree;

            self.used.clear(index) catch unreachable;
            if (slot_count != 0) self.next_hint = index;
        }

        pub fn reset(self: *Self) void {
            self.used.clearAll();
            self.next_hint = 0;
        }
    };
}

test "allocates every slot exactly once" {
    var allocator = BitmapAllocator(4){};

    try std.testing.expectEqual(@as(usize, 0), try allocator.allocate());
    try std.testing.expectEqual(@as(usize, 1), try allocator.allocate());
    try std.testing.expectEqual(@as(usize, 2), try allocator.allocate());
    try std.testing.expectEqual(@as(usize, 3), try allocator.allocate());
    try std.testing.expectError(error.Full, allocator.allocate());
    try std.testing.expectEqual(@as(usize, 4), allocator.allocatedCount());
}

test "freed slots are reusable and double free is rejected" {
    var allocator = BitmapAllocator(3){};
    const first = try allocator.allocate();
    _ = try allocator.allocate();

    try allocator.free(first);
    try std.testing.expectError(error.DoubleFree, allocator.free(first));
    try std.testing.expectEqual(first, try allocator.allocate());
}

test "invalid free leaves state unchanged" {
    var allocator = BitmapAllocator(2){};
    _ = try allocator.allocate();
    const before = allocator;

    try std.testing.expectError(error.IndexOutOfBounds, allocator.free(2));
    try std.testing.expectEqualDeep(before, allocator);
}

test "zero capacity allocator is valid and full" {
    var allocator = BitmapAllocator(0){};
    try std.testing.expectError(error.Full, allocator.allocate());
    try std.testing.expectEqual(@as(usize, 0), allocator.allocatedCount());
}
