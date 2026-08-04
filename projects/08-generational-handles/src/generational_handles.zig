const std = @import("std");

/// A fixed-capacity table that detects stale references by pairing each slot
/// index with a generation number.
pub fn HandleTable(comptime T: type, comptime capacity: usize) type {
    return struct {
        const Self = @This();

        pub const Handle = struct {
            index: usize,
            generation: u32,
        };

        pub const Error = error{Full};

        const Slot = struct {
            generation: u32 = 1,
            occupied: bool = false,
            value: T = undefined,
        };

        slots: [capacity]Slot = [_]Slot{.{}} ** capacity,
        len: usize = 0,

        pub fn count(self: *const Self) usize {
            return self.len;
        }

        pub fn insert(self: *Self, value: T) Error!Handle {
            for (&self.slots, 0..) |*slot, index| {
                if (!slot.occupied) {
                    slot.value = value;
                    slot.occupied = true;
                    self.len += 1;
                    return .{ .index = index, .generation = slot.generation };
                }
            }
            return error.Full;
        }

        pub fn get(self: *Self, handle: Handle) ?*T {
            const slot = self.validSlot(handle) orelse return null;
            return &slot.value;
        }

        pub fn getConst(self: *const Self, handle: Handle) ?*const T {
            if (handle.index >= capacity) return null;
            const slot = &self.slots[handle.index];
            if (!slot.occupied or slot.generation != handle.generation) return null;
            return &slot.value;
        }

        pub fn remove(self: *Self, handle: Handle) ?T {
            const slot = self.validSlot(handle) orelse return null;
            const value = slot.value;
            slot.occupied = false;
            slot.generation +%= 1;
            if (slot.generation == 0) slot.generation = 1;
            self.len -= 1;
            return value;
        }

        fn validSlot(self: *Self, handle: Handle) ?*Slot {
            if (handle.index >= capacity) return null;
            const slot = &self.slots[handle.index];
            if (!slot.occupied or slot.generation != handle.generation) return null;
            return slot;
        }
    };
}

test "insert and retrieve values" {
    var table = HandleTable(u32, 2){};
    const handle = try table.insert(42);

    try std.testing.expectEqual(@as(u32, 42), table.get(handle).?.*);
    try std.testing.expectEqual(@as(usize, 1), table.count());
}

test "removed handles become stale" {
    var table = HandleTable(u8, 1){};
    const old = try table.insert(7);
    try std.testing.expectEqual(@as(?u8, 7), table.remove(old));
    try std.testing.expect(table.get(old) == null);

    const fresh = try table.insert(9);
    try std.testing.expectEqual(old.index, fresh.index);
    try std.testing.expect(old.generation != fresh.generation);
    try std.testing.expectEqual(@as(u8, 9), table.get(fresh).?.*);
}

test "invalid removal does not mutate state" {
    var table = HandleTable(u16, 1){};
    const valid = try table.insert(5);
    const invalid = HandleTable(u16, 1).Handle{
        .index = valid.index,
        .generation = valid.generation + 1,
    };

    try std.testing.expectEqual(@as(?u16, null), table.remove(invalid));
    try std.testing.expectEqual(@as(usize, 1), table.count());
}

test "full and zero-capacity tables fail explicitly" {
    var one = HandleTable(u8, 1){};
    _ = try one.insert(1);
    try std.testing.expectError(error.Full, one.insert(2));

    var zero = HandleTable(u8, 0){};
    try std.testing.expectError(error.Full, zero.insert(1));
}
