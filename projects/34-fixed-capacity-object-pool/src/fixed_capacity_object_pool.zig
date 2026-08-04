const std = @import("std");
const bitmap = @import("bitmap-allocator");
const handles = @import("generational-handles");

/// Explicit pool contract layered on the existing stale-resistant handle table.
pub fn ObjectPool(comptime T: type, comptime capacity_: usize) type {
    const Table = handles.HandleTable(T, capacity_);
    _ = bitmap.BitmapAllocator(capacity_);
    return struct {
        const Self = @This();
        pub const Handle = Table.Handle;
        pub const Error = Table.Error;
        table: Table = .{},
        pub fn capacity(_: *const @This()) usize {
            return capacity_;
        }
        pub fn count(self: *const @This()) usize {
            return self.table.count();
        }
        pub fn insert(self: *@This(), value: T) Error!Handle {
            return self.table.insert(value);
        }
        pub fn get(self: *@This(), handle: Handle) ?*T {
            return self.table.get(handle);
        }
        pub fn getConst(self: *const @This(), handle: Handle) ?*const T {
            return self.table.getConst(handle);
        }
        pub fn remove(self: *@This(), handle: Handle) ?T {
            return self.table.remove(handle);
        }
        pub fn reset(self: *@This()) void {
            while (true) {
                var removed = false;
                for (0..capacity_) |i| {
                    const generation = self.table.slots[i].generation;
                    if (self.table.remove(.{ .index = i, .generation = generation }) != null) removed = true;
                }
                if (!removed) break;
            }
        }
        pub const Iterator = struct {
            pool: *const Self,
            index: usize = 0,
            pub fn next(it: *Iterator) ?*const T {
                while (it.index < capacity_) : (it.index += 1) {
                    const i = it.index;
                    it.index += 1;
                    const slot = &it.pool.table.slots[i];
                    if (slot.occupied) return &slot.value;
                }
                return null;
            }
        };
        pub fn iterator(self: *const @This()) Iterator {
            return .{ .pool = self };
        }
    };
}
test "stale handles and deterministic reuse" {
    var p = ObjectPool(u8, 2){};
    const a = try p.insert(1);
    _ = try p.insert(2);
    try std.testing.expectError(error.Full, p.insert(3));
    try std.testing.expectEqual(@as(?u8, 1), p.remove(a));
    const b = try p.insert(4);
    try std.testing.expect(a.generation != b.generation);
    try std.testing.expect(p.get(a) == null);
}
test "iteration reset and zero capacity" {
    var p = ObjectPool(u8, 2){};
    _ = try p.insert(1);
    var it = p.iterator();
    try std.testing.expectEqual(@as(u8, 1), it.next().?.*);
    p.reset();
    try std.testing.expectEqual(@as(usize, 0), p.count());
    var z = ObjectPool(u8, 0){};
    try std.testing.expectError(error.Full, z.insert(1));
}
