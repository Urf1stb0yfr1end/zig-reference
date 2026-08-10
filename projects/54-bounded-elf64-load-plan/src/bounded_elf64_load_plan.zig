const std = @import("std");
const bounded = @import("bounded-byte-reader");
const vectors = @import("fixed-capacity-vector");
const ranges = @import("checked-half-open-range");
const addresses = @import("distinct-memory-address-types");
const file_header = @import("elf64-file-header-parser");
const program_header = @import("elf64-program-header-parser");

pub const max_program_headers: usize = 64;
pub const riscv_machine: u16 = 243;

pub const Permissions = struct { read: bool, write: bool, execute: bool };
pub const SegmentPlan = struct {
    source: ranges.CheckedRange,
    memory: ranges.CheckedRange,
    memory_start: addresses.GuestVirtualAddress,
    file_byte_count: usize,
    memory_byte_count: usize,
    zero_fill_byte_count: usize,
    permissions: Permissions,
    alignment: u64,
};

pub const Error = file_header.ParseError || program_header.ParseError || error{
    UnsupportedEndian,
    UnsupportedMachine,
    UnsupportedObjectType,
    UnsupportedFeature,
    NoLoadableSegment,
    SegmentFileOutOfBounds,
    UnsupportedPermissions,
    UnsupportedAlignment,
    OverlappingLoadSegments,
    EntryNotExecutable,
    PlanCapacityExceeded,
};

pub fn LoadPlan(comptime capacity: usize) type {
    return struct {
        entry: addresses.GuestVirtualAddress,
        segments: vectors.FixedVector(SegmentPlan, capacity),

        pub fn items(self: *const @This()) []const SegmentPlan {
            return self.segments.constItems();
        }
    };
}

/// Accepts the deliberately narrow static RV64 ELF64 subset and returns an
/// owned, allocation-free plan in program-header order. No machine state is changed.
pub fn plan(comptime capacity: usize, bytes: []const u8) Error!LoadPlan(capacity) {
    var reader = bounded.BoundedReader.init(bytes);
    const header = try file_header.parse(&reader);
    if (header.endian != .little) return error.UnsupportedEndian;
    if (header.machine != riscv_machine) return error.UnsupportedMachine;
    switch (header.object_type) {
        .known => |kind| if (kind != .executable) return error.UnsupportedObjectType,
        .unknown => return error.UnsupportedObjectType,
    }

    const rows = try program_header.parseTable(max_program_headers, &reader, header);
    var result = LoadPlan(capacity){
        .entry = addresses.GuestVirtualAddress.init(@intCast(header.entry)),
        .segments = vectors.FixedVector(SegmentPlan, capacity).init(),
    };

    for (rows.constItems()) |row| {
        const is_load = switch (row.segment_type) {
            .known => |kind| kind == .load,
            .unknown => false,
        };
        if (!is_load) {
            switch (row.segment_type) {
                .known => |kind| if (kind == .dynamic or kind == .interpreter or kind == .tls or kind == .shared_library) return error.UnsupportedFeature,
                .unknown => return error.UnsupportedFeature,
            }
            continue;
        }

        if (row.file_range.end > bytes.len) return error.SegmentFileOutOfBounds;
        const write = row.permissions.contains(.write);
        const execute = row.permissions.contains(.execute);
        if (write and execute) return error.UnsupportedPermissions;
        if (row.alignment > 1 and row.file_range.start % @as(usize, @intCast(row.alignment)) != row.virtual_range.start % @as(usize, @intCast(row.alignment))) return error.UnsupportedAlignment;

        for (result.segments.constItems()) |existing| {
            if (existing.memory.overlaps(row.virtual_range)) return error.OverlappingLoadSegments;
        }
        result.segments.append(.{
            .source = row.file_range,
            .memory = row.virtual_range,
            .memory_start = addresses.GuestVirtualAddress.init(row.virtual_range.start),
            .file_byte_count = row.file_range.length(),
            .memory_byte_count = row.virtual_range.length(),
            .zero_fill_byte_count = row.virtual_range.length() - row.file_range.length(),
            .permissions = .{ .read = row.permissions.contains(.read), .write = write, .execute = execute },
            .alignment = row.alignment,
        }) catch return error.PlanCapacityExceeded;
    }
    if (result.segments.isEmpty()) return error.NoLoadableSegment;
    for (result.segments.constItems()) |segment| {
        if (segment.permissions.execute and segment.memory.containsValue(result.entry.raw())) return result;
    }
    return error.EntryNotExecutable;
}

fn put(comptime T: type, bytes: []u8, at: usize, value: T) void {
    std.mem.writeInt(T, bytes[at..][0..@sizeOf(T)], value, .little);
}
fn fixture(phnum: u16) [512]u8 {
    var bytes = [_]u8{0} ** 512;
    bytes[0] = 0x7f;
    bytes[1] = 'E';
    bytes[2] = 'L';
    bytes[3] = 'F';
    bytes[4] = 2;
    bytes[5] = 1;
    bytes[6] = 1;
    put(u16, &bytes, 16, 2);
    put(u16, &bytes, 18, riscv_machine);
    put(u32, &bytes, 20, 1);
    put(u64, &bytes, 24, 0x1001);
    put(u64, &bytes, 32, 64);
    put(u16, &bytes, 52, 64);
    put(u16, &bytes, 54, 56);
    put(u16, &bytes, 56, phnum);
    return bytes;
}
fn writeSegment(bytes: []u8, index: usize, flags: u32, offset: u64, vaddr: u64, filesz: u64, memsz: u64, segment_align: u64) void {
    const at = 64 + index * 56;
    put(u32, bytes, at, 1);
    put(u32, bytes, at + 4, flags);
    put(u64, bytes, at + 8, offset);
    put(u64, bytes, at + 16, vaddr);
    put(u64, bytes, at + 32, filesz);
    put(u64, bytes, at + 40, memsz);
    put(u64, bytes, at + 48, segment_align);
}

test "plans ordered RX and RW segments including explicit BSS" {
    var bytes = fixture(2);
    writeSegment(&bytes, 0, 5, 0x101, 0x1001, 3, 3, 1);
    writeSegment(&bytes, 1, 6, 0x180, 0x2000, 2, 8, 1);
    const result = try plan(2, &bytes);
    try std.testing.expectEqual(@as(usize, 0x1001), result.entry.raw());
    try std.testing.expectEqual(@as(usize, 2), result.items().len);
    try std.testing.expectEqualDeep(try ranges.CheckedRange.init(0x101, 0x104), result.items()[0].source);
    try std.testing.expectEqualDeep(try ranges.CheckedRange.init(0x2000, 0x2008), result.items()[1].memory);
    try std.testing.expect(result.items()[0].permissions.read and result.items()[0].permissions.execute);
    try std.testing.expectEqual(@as(usize, 6), result.items()[1].zero_fill_byte_count);
}

test "touching ranges succeed while overlap is rejected" {
    var bytes = fixture(2);
    writeSegment(&bytes, 0, 5, 0x100, 0x1000, 2, 0x10, 1);
    writeSegment(&bytes, 1, 4, 0x120, 0x1010, 2, 0x10, 1);
    _ = try plan(2, &bytes);
    writeSegment(&bytes, 1, 4, 0x120, 0x100f, 2, 0x10, 1);
    try std.testing.expectError(error.OverlappingLoadSegments, plan(2, &bytes));
}

test "rejects policy, bounds, entry, and capacity failures" {
    var bytes = fixture(1);
    writeSegment(&bytes, 0, 7, 0x100, 0x1000, 1, 2, 1);
    try std.testing.expectError(error.UnsupportedPermissions, plan(1, &bytes));
    writeSegment(&bytes, 0, 5, 0x200, 0x1000, 400, 400, 1);
    try std.testing.expectError(error.SegmentFileOutOfBounds, plan(1, &bytes));
    writeSegment(&bytes, 0, 4, 0x100, 0x1000, 1, 2, 1);
    try std.testing.expectError(error.EntryNotExecutable, plan(1, &bytes));
    put(u64, &bytes, 24, 0x1002);
    writeSegment(&bytes, 0, 5, 0x100, 0x1000, 1, 2, 1);
    try std.testing.expectError(error.EntryNotExecutable, plan(1, &bytes));

    var two = fixture(2);
    writeSegment(&two, 0, 5, 0x100, 0x1000, 1, 2, 1);
    writeSegment(&two, 1, 4, 0x110, 0x2000, 1, 2, 1);
    try std.testing.expectError(error.PlanCapacityExceeded, plan(1, &two));
}

test "canonical parser failures and RV64 acceptance failures propagate" {
    var bytes = fixture(0);
    try std.testing.expectError(error.NoLoadableSegment, plan(1, &bytes));
    bytes[0] = 0;
    try std.testing.expectError(error.BadMagic, plan(1, &bytes));
    bytes = fixture(1);
    bytes[4] = 1;
    try std.testing.expectError(error.UnsupportedClass, plan(1, &bytes));
    bytes = fixture(1);
    bytes[5] = 2;
    std.mem.writeInt(u16, bytes[16..18], 2, .big);
    std.mem.writeInt(u16, bytes[18..20], riscv_machine, .big);
    std.mem.writeInt(u32, bytes[20..24], 1, .big);
    std.mem.writeInt(u64, bytes[24..32], 0x1001, .big);
    std.mem.writeInt(u64, bytes[32..40], 64, .big);
    std.mem.writeInt(u16, bytes[52..54], 64, .big);
    std.mem.writeInt(u16, bytes[54..56], 56, .big);
    std.mem.writeInt(u16, bytes[56..58], 1, .big);
    try std.testing.expectError(error.UnsupportedEndian, plan(1, &bytes));
    bytes = fixture(1);
    put(u16, &bytes, 18, 62);
    try std.testing.expectError(error.UnsupportedMachine, plan(1, &bytes));
    bytes = fixture(1);
    put(u16, &bytes, 16, 3);
    try std.testing.expectError(error.UnsupportedObjectType, plan(1, &bytes));
    bytes = fixture(1);
    put(u16, &bytes, 56, 9);
    try std.testing.expectError(error.TableOutOfBounds, plan(1, bytes[0..128]));
}

test "later invalid segment invalidates the whole value-returning operation" {
    var bytes = fixture(2);
    writeSegment(&bytes, 0, 5, 0x100, 0x1000, 1, 2, 1);
    writeSegment(&bytes, 1, 7, 0x110, 0x2000, 1, 2, 1);
    try std.testing.expectError(error.UnsupportedPermissions, plan(2, &bytes));
}

test "rejects malformed load arithmetic, alignment, and unsupported features" {
    var bytes = fixture(1);
    writeSegment(&bytes, 0, 5, std.math.maxInt(u64), 0x1000, 2, 2, 1);
    try std.testing.expectError(error.OutOfRange, plan(1, &bytes));

    bytes = fixture(1);
    writeSegment(&bytes, 0, 5, 0x100, 0x1000, 2, 1, 1);
    try std.testing.expectError(error.FileSizeExceedsMemorySize, plan(1, &bytes));

    bytes = fixture(1);
    writeSegment(&bytes, 0, 5, 0x100, std.math.maxInt(u64), 1, 2, 1);
    try std.testing.expectError(error.OutOfRange, plan(1, &bytes));

    bytes = fixture(1);
    writeSegment(&bytes, 0, 5, 0x101, 0x1000, 1, 2, 0x1000);
    try std.testing.expectError(error.UnsupportedAlignment, plan(1, &bytes));

    bytes = fixture(1);
    writeSegment(&bytes, 0, 5, 0x100, 0x1000, 1, 2, 1);
    put(u32, &bytes, 64, 2);
    try std.testing.expectError(error.UnsupportedFeature, plan(1, &bytes));
}
