const std = @import("std");
const elf = @import("bounded-elf64-load-plan");

pub const page_size: usize = 4096;
pub const Permissions = packed struct { read: bool = false, write: bool = false, execute: bool = false };
pub const Mapping = struct { start: usize, length: usize, permissions: Permissions };
pub const Error = error{ Unaligned, Empty, AddressOverflow, Overlap, CapacityExceeded, WriteExecute, NotMapped, InvalidElf, InterpTooLong, SourceOutOfBounds };

pub const ImagePage = struct {
    virtual_start: usize,
    permissions: Permissions,
    bytes: [page_size]u8,
};

pub const PreparedPage = struct {
    virtual_start: usize,
    permissions: Permissions,
    backing_index: usize,
};

/// Materializes a candidate into caller-owned page backing. This keeps large
/// machine reservations out of the value returned by PREPARE while retaining
/// bounded metadata and the same complete-page/W+X guarantees.
pub fn PreparedImage(comptime page_capacity: usize) type {
    return struct {
        const Self = @This();
        pages: [page_capacity]PreparedPage = undefined,
        page_count: usize = 0,

        pub fn items(self: *const Self) []const PreparedPage {
            return self.pages[0..self.page_count];
        }

        pub fn prepare(bytes: []const u8, load: anytype, bias: usize, backing: [][page_size]u8) Error!Self {
            var result = Self{};
            for (load.items()) |segment| {
                if (segment.source.end > bytes.len) return error.SourceOutOfBounds;
                const memory_start = std.math.add(usize, segment.memory.start, bias) catch return error.AddressOverflow;
                const memory_end = std.math.add(usize, segment.memory.end, bias) catch return error.AddressOverflow;
                var page_start = memory_start - memory_start % page_size;
                const rounded_end = std.math.add(usize, memory_end, page_size - 1) catch return error.AddressOverflow;
                const page_end = rounded_end - rounded_end % page_size;
                while (page_start < page_end) : (page_start = std.math.add(usize, page_start, page_size) catch return error.AddressOverflow) {
                    const page = try result.getOrAdd(page_start, .{
                        .read = segment.permissions.read,
                        .write = segment.permissions.write,
                        .execute = segment.permissions.execute,
                    }, backing);
                    const contribution_start = @max(page_start, memory_start);
                    const contribution_end = @min(page_start + page_size, memory_end);
                    for (contribution_start..contribution_end) |address| {
                        const segment_offset = address - memory_start;
                        backing[page.backing_index][address - page_start] = if (segment_offset < segment.file_byte_count)
                            bytes[segment.source.start + segment_offset]
                        else
                            0;
                    }
                }
            }
            return result;
        }

        fn getOrAdd(self: *Self, virtual_start: usize, permissions: Permissions, backing: [][page_size]u8) Error!*PreparedPage {
            for (self.pages[0..self.page_count]) |*page| if (page.virtual_start == virtual_start) {
                const merged = Permissions{ .read = page.permissions.read or permissions.read, .write = page.permissions.write or permissions.write, .execute = page.permissions.execute or permissions.execute };
                if (merged.write and merged.execute) return error.WriteExecute;
                page.permissions = merged;
                return page;
            };
            if (permissions.write and permissions.execute) return error.WriteExecute;
            if (self.page_count == page_capacity or self.page_count == backing.len) return error.CapacityExceeded;
            @memset(&backing[self.page_count], 0);
            self.pages[self.page_count] = .{ .virtual_start = virtual_start, .permissions = permissions, .backing_index = self.page_count };
            self.page_count += 1;
            return &self.pages[self.page_count - 1];
        }
    };
}

/// Owns a complete, bounded, neutral page image prepared from validated segment
/// ranges. No physical frame or live address-space state is touched while this
/// value is built, so every ordinary failure precedes commit.
pub fn MaterializedImage(comptime page_capacity: usize) type {
    return struct {
        const Self = @This();
        pages: [page_capacity]ImagePage = undefined,
        page_count: usize = 0,

        pub fn items(self: *const Self) []const ImagePage {
            return self.pages[0..self.page_count];
        }

        pub fn prepare(bytes: []const u8, load: anytype, bias: usize) Error!Self {
            var result = Self{};
            for (load.items()) |segment| {
                if (segment.source.end > bytes.len) return error.SourceOutOfBounds;
                const memory_start = std.math.add(usize, segment.memory.start, bias) catch return error.AddressOverflow;
                const memory_end = std.math.add(usize, segment.memory.end, bias) catch return error.AddressOverflow;
                var page_start = memory_start - memory_start % page_size;
                const rounded_end = std.math.add(usize, memory_end, page_size - 1) catch return error.AddressOverflow;
                const page_end = rounded_end - rounded_end % page_size;
                while (page_start < page_end) : (page_start = std.math.add(usize, page_start, page_size) catch return error.AddressOverflow) {
                    const page = try result.getOrAdd(page_start, .{
                        .read = segment.permissions.read,
                        .write = segment.permissions.write,
                        .execute = segment.permissions.execute,
                    });
                    const contribution_start = @max(page_start, memory_start);
                    const contribution_end = @min(page_start + page_size, memory_end);
                    var address = contribution_start;
                    while (address < contribution_end) : (address += 1) {
                        const segment_offset = address - memory_start;
                        const destination_offset = address - page_start;
                        if (segment_offset < segment.file_byte_count) {
                            page.bytes[destination_offset] = bytes[segment.source.start + segment_offset];
                        } else {
                            page.bytes[destination_offset] = 0;
                        }
                    }
                }
            }
            return result;
        }

        fn getOrAdd(self: *Self, virtual_start: usize, permissions: Permissions) Error!*ImagePage {
            for (self.pages[0..self.page_count]) |*page| if (page.virtual_start == virtual_start) {
                const merged = Permissions{
                    .read = page.permissions.read or permissions.read,
                    .write = page.permissions.write or permissions.write,
                    .execute = page.permissions.execute or permissions.execute,
                };
                if (merged.write and merged.execute) return error.WriteExecute;
                page.permissions = merged;
                return page;
            };
            if (permissions.write and permissions.execute) return error.WriteExecute;
            if (self.page_count == page_capacity) return error.CapacityExceeded;
            self.pages[self.page_count] = .{ .virtual_start = virtual_start, .permissions = permissions, .bytes = .{0} ** page_size };
            self.page_count += 1;
            return &self.pages[self.page_count - 1];
        }
    };
}

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
        main: elf.DynamicLoadPlan(segment_capacity, interp_capacity),
        interpreter: ?elf.DynamicLoadPlan(segment_capacity, interp_capacity),
        interpreter_path: [interp_capacity]u8 = .{0} ** interp_capacity,
        interpreter_path_len: usize = 0,
        entry: usize,
        main_entry: usize,

        pub fn prepare(main_bytes: []const u8, interp_bytes: ?[]const u8) Error!@This() {
            var result: @This() = undefined;
            result.main = elf.planDynamic(segment_capacity, interp_capacity, main_bytes) catch return error.InvalidElf;
            result.main_entry = result.main.load.entry.raw();
            result.interpreter_path = .{0} ** interp_capacity;
            result.interpreter_path_len = 0;
            if (result.main.interpreterPath()) |path| {
                if (interp_bytes == null) return error.InvalidElf;
                result.interpreter = elf.planDynamic(segment_capacity, interp_capacity, interp_bytes.?) catch return error.InvalidElf;
                if (result.interpreter.?.interpreterPath() != null) return error.InvalidElf;
                @memcpy(result.interpreter_path[0..path.len], path);
                result.interpreter_path_len = path.len;
                result.entry = result.interpreter.?.load.entry.raw();
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

fn put(comptime T: type, bytes: []u8, at: usize, value: T) void {
    std.mem.writeInt(T, bytes[at..][0..@sizeOf(T)], value, .little);
}

fn executableFixture(comptime dynamic: bool, interpreter: ?[]const u8, entry: u64) [512]u8 {
    var bytes = [_]u8{0} ** 512;
    @memcpy(bytes[0..4], "\x7fELF");
    bytes[4] = 2;
    bytes[5] = 1;
    bytes[6] = 1;
    put(u16, &bytes, 16, if (dynamic) 3 else 2);
    put(u16, &bytes, 18, elf.riscv_machine);
    put(u32, &bytes, 20, 1);
    put(u64, &bytes, 24, entry);
    put(u64, &bytes, 32, 64);
    put(u16, &bytes, 52, 64);
    put(u16, &bytes, 54, 56);
    put(u16, &bytes, 56, if (interpreter == null) 1 else 3);
    put(u32, &bytes, 64, 1);
    put(u32, &bytes, 68, 5);
    put(u64, &bytes, 72, 0x180);
    put(u64, &bytes, 80, entry);
    put(u64, &bytes, 96, 1);
    put(u64, &bytes, 104, 1);
    put(u64, &bytes, 112, 1);
    if (interpreter) |path| {
        put(u32, &bytes, 120, 3);
        put(u64, &bytes, 128, 0x190);
        put(u64, &bytes, 152, path.len + 1);
        put(u64, &bytes, 160, path.len + 1);
        @memcpy(bytes[0x190..][0..path.len], path);
        bytes[0x190 + path.len] = 0;
        put(u32, &bytes, 176, 2); // PT_DYNAMIC is handed to the interpreter.
    }
    return bytes;
}

test "exec plan derives PT_INTERP and transfers control to ET_DYN interpreter" {
    const main = executableFixture(false, "/lib/ld.so", 0x1000);
    const interpreter = executableFixture(true, null, 0x4000);
    const result = try ExecPlan(2, 32).prepare(&main, &interpreter);
    try std.testing.expectEqualStrings("/lib/ld.so", result.interpreter_path[0..result.interpreter_path_len]);
    try std.testing.expectEqual(@as(usize, 0x1000), result.main_entry);
    try std.testing.expectEqual(@as(usize, 0x4000), result.entry);
    try std.testing.expect(result.interpreter != null);
    try std.testing.expectError(error.InvalidElf, ExecPlan(2, 32).prepare(&main, null));
}

test "materializes every page and segment with offsets BSS and final permissions" {
    var bytes = [_]u8{0} ** 0x2200;
    @memcpy(bytes[0..4], "\x7fELF");
    bytes[4] = 2;
    bytes[5] = 1;
    bytes[6] = 1;
    put(u16, &bytes, 16, 2);
    put(u16, &bytes, 18, elf.riscv_machine);
    put(u32, &bytes, 20, 1);
    put(u64, &bytes, 24, 0x1100);
    put(u64, &bytes, 32, 64);
    put(u16, &bytes, 52, 64);
    put(u16, &bytes, 54, 56);
    put(u16, &bytes, 56, 2);
    // Unaligned RX contribution spans three pages, including both partial pages.
    put(u32, &bytes, 64, 1);
    put(u32, &bytes, 68, 5);
    put(u64, &bytes, 72, 0x100);
    put(u64, &bytes, 80, 0x1100);
    put(u64, &bytes, 96, 0x1f20);
    put(u64, &bytes, 104, 0x1f20);
    put(u64, &bytes, 112, 1);
    // Separate RW page has file bytes followed by BSS.
    put(u32, &bytes, 120, 1);
    put(u32, &bytes, 124, 6);
    put(u64, &bytes, 128, 0x2080);
    put(u64, &bytes, 136, 0x5080);
    put(u64, &bytes, 152, 3);
    put(u64, &bytes, 160, 9);
    put(u64, &bytes, 168, 1);
    for (0..0x1f20) |i| bytes[0x100 + i] = @truncate(i *% 37 +% 11);
    bytes[0x2080] = 0xaa;
    bytes[0x2081] = 0xbb;
    bytes[0x2082] = 0xcc;

    const load = try elf.plan(2, &bytes);
    const image = try MaterializedImage(4).prepare(&bytes, &load, 0);
    try std.testing.expectEqual(@as(usize, 4), image.items().len);
    try std.testing.expectEqual(@as(usize, 0x1000), image.items()[0].virtual_start);
    try std.testing.expectEqual(bytes[0x100], image.items()[0].bytes[0x100]);
    try std.testing.expectEqual(bytes[0x100 + 0x1f1f], image.items()[2].bytes[0x1f]);
    try std.testing.expect(image.items()[0].permissions.execute and !image.items()[0].permissions.write);
    try std.testing.expectEqual(@as(u8, 0xaa), image.items()[3].bytes[0x80]);
    try std.testing.expectEqual(@as(u8, 0), image.items()[3].bytes[0x83]);
    try std.testing.expect(image.items()[3].permissions.write and !image.items()[3].permissions.execute);
    try std.testing.expectError(error.CapacityExceeded, MaterializedImage(3).prepare(&bytes, &load, 0));

    var backing: [4][page_size]u8 = undefined;
    const prepared = try PreparedImage(4).prepare(&bytes, &load, 0, &backing);
    try std.testing.expectEqual(@as(usize, 4), prepared.items().len);
    try std.testing.expectEqual(@as(usize, 0x1000), prepared.items()[0].virtual_start);
    try std.testing.expectEqual(bytes[0x100], backing[prepared.items()[0].backing_index][0x100]);
    try std.testing.expectEqual(@as(u8, 0xaa), backing[prepared.items()[3].backing_index][0x80]);
    try std.testing.expectEqual(@as(u8, 0), backing[prepared.items()[3].backing_index][0x83]);
    var short_backing: [3][page_size]u8 = undefined;
    try std.testing.expectError(error.CapacityExceeded, PreparedImage(4).prepare(&bytes, &load, 0, &short_backing));
}
