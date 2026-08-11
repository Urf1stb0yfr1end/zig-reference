const std = @import("std");
const elf = @import("bounded-elf64-load-plan");

pub const page_size: usize = 4096;
pub const Permissions = packed struct { read: bool = false, write: bool = false, execute: bool = false };
pub const Mapping = struct { start: usize, length: usize, permissions: Permissions };
pub const Error = error{ Unaligned, Empty, AddressOverflow, Overlap, CapacityExceeded, WriteExecute, NotMapped, InvalidElf, InterpTooLong };

pub fn AddressSpace(comptime capacity: usize) type {
    return struct {
        const Self = @This();
        mappings: [capacity]Mapping = undefined,
        count: usize = 0,

        pub fn map(self: *Self, start: usize, length: usize, permissions: Permissions) Error!void {
            try validate(start, length, permissions);
            const end = std.math.add(usize, start, length) catch return error.AddressOverflow;
            for (self.mappings[0..self.count]) |item| if (start < item.start + item.length and item.start < end) return error.Overlap;
            if (self.count == capacity) return error.CapacityExceeded;
            self.mappings[self.count] = .{ .start = start, .length = length, .permissions = permissions };
            self.count += 1;
        }
        pub fn protect(self: *Self, start: usize, length: usize, permissions: Permissions) Error!void {
            try validate(start, length, permissions);
            for (self.mappings[0..self.count]) |*item| if (item.start == start and item.length == length) {
                item.permissions = permissions;
                return;
            };
            return error.NotMapped;
        }
        pub fn unmap(self: *Self, start: usize, length: usize) Error!void {
            for (self.mappings[0..self.count], 0..) |item, index| if (item.start == start and item.length == length) {
                std.mem.copyForwards(Mapping, self.mappings[index .. self.count - 1], self.mappings[index + 1 .. self.count]);
                self.count -= 1;
                return;
            };
            return error.NotMapped;
        }
        pub fn contains(self: *const Self, address: usize, access: Permissions) bool {
            for (self.mappings[0..self.count]) |item| if (address >= item.start and address < item.start + item.length)
                return (!access.read or item.permissions.read) and (!access.write or item.permissions.write) and (!access.execute or item.permissions.execute);
            return false;
        }
        fn validate(start: usize, length: usize, permissions: Permissions) Error!void {
            if (length == 0) return error.Empty;
            if (start % page_size != 0 or length % page_size != 0) return error.Unaligned;
            if (permissions.write and permissions.execute) return error.WriteExecute;
            _ = std.math.add(usize, start, length) catch return error.AddressOverflow;
        }
    };
}

pub fn ExecPlan(comptime segment_capacity: usize, comptime interp_capacity: usize) type {
    return struct {
        main: elf.LoadPlan(segment_capacity),
        interpreter: ?elf.LoadPlan(segment_capacity),
        interpreter_path: [interp_capacity]u8 = .{0} ** interp_capacity,
        interpreter_path_len: usize = 0,
        entry: usize,
        main_entry: usize,

        pub fn prepare(main_bytes: []const u8, interp_path: ?[]const u8, interp_bytes: ?[]const u8) Error!@This() {
            var result: @This() = undefined;
            result.main = elf.plan(segment_capacity, main_bytes) catch return error.InvalidElf;
            result.main_entry = result.main.entry.raw();
            result.interpreter_path = .{0} ** interp_capacity;
            result.interpreter_path_len = 0;
            if (interp_path) |path| {
                if (path.len == 0 or path.len > interp_capacity or interp_bytes == null) return error.InterpTooLong;
                result.interpreter = elf.plan(segment_capacity, interp_bytes.?) catch return error.InvalidElf;
                @memcpy(result.interpreter_path[0..path.len], path);
                result.interpreter_path_len = path.len;
                result.entry = result.interpreter.?.entry.raw();
            } else {
                result.interpreter = null;
                result.entry = result.main_entry;
            }
            return result;
        }
    };
}

test "mapping mutations are atomic and W+X is rejected" {
    var space = AddressSpace(2){};
    try space.map(0x4000, page_size, .{ .read = true, .write = true });
    const before = space;
    try std.testing.expectError(error.WriteExecute, space.protect(0x4000, page_size, .{ .write = true, .execute = true }));
    try std.testing.expectEqualDeep(before, space);
    try space.protect(0x4000, page_size, .{ .read = true });
    try std.testing.expect(space.contains(0x4001, .{ .read = true }));
    try space.unmap(0x4000, page_size);
    try std.testing.expect(!space.contains(0x4001, .{ .read = true }));
}
