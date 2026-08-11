const std = @import("std");
const alignment = @import("aligned-address-and-size-helpers");
const ranges = @import("checked-half-open-range");
const addresses = @import("distinct-memory-address-types");
const endian = @import("endian-integer-codec");

pub const word_size: usize = 8;
pub const stack_alignment: usize = 16;
pub const at_null: u64 = 0;
pub const GuestVirtualAddress = addresses.GuestVirtualAddress;
pub const GuestStackRange = ranges.CheckedRange;

pub const AuxValue = union(enum) {
    immediate: u64,
    argv_string: usize,
    env_string: usize,
};

pub const AuxEntry = struct {
    type: u64,
    value: AuxValue,
};

pub const Error = error{
    EmptyArgv,
    TooManyArgv,
    TooManyEnv,
    TooManyAuxv,
    InteriorNul,
    CallerSuppliedAtNull,
    DuplicateAuxType,
    InvalidSymbolicTarget,
    AddressOverflow,
    StackRangeTooSmall,
    OutputCapacityExceeded,
};

pub fn StackPlan(comptime byte_capacity: usize) type {
    return struct {
        const Self = @This();
        storage: [byte_capacity]u8 = [_]u8{0} ** byte_capacity,
        len: usize,
        initial_sp: GuestVirtualAddress,
        used_range: GuestStackRange,
        argv_offset: usize,
        envp_offset: usize,
        auxv_offset: usize,
        strings_offset: usize,

        pub fn bytes(self: *const Self) []const u8 {
            return self.storage[0..self.len];
        }
    };
}

/// Produces the exact contiguous image for [initial_sp, stack_range.end).
/// Strings are packed argv-order then envp-order at the high end; alignment
/// padding between the AT_NULL pair and strings is deterministically zero.
pub fn plan(
    comptime byte_capacity: usize,
    comptime argv_capacity: usize,
    comptime env_capacity: usize,
    comptime aux_capacity: usize,
    stack_range: GuestStackRange,
    argv: []const []const u8,
    envp: []const []const u8,
    auxv: []const AuxEntry,
) Error!StackPlan(byte_capacity) {
    if (argv.len == 0) return error.EmptyArgv;
    if (argv.len > argv_capacity) return error.TooManyArgv;
    if (envp.len > env_capacity) return error.TooManyEnv;
    if (auxv.len > aux_capacity) return error.TooManyAuxv;
    if (stack_range.isEmpty()) return error.StackRangeTooSmall;

    var strings_len: usize = 0;
    for (argv) |s| {
        if (std.mem.indexOfScalar(u8, s, 0) != null) return error.InteriorNul;
        const terminated_len = std.math.add(usize, s.len, 1) catch return error.AddressOverflow;
        strings_len = std.math.add(usize, strings_len, terminated_len) catch return error.AddressOverflow;
    }
    for (envp) |s| {
        if (std.mem.indexOfScalar(u8, s, 0) != null) return error.InteriorNul;
        const terminated_len = std.math.add(usize, s.len, 1) catch return error.AddressOverflow;
        strings_len = std.math.add(usize, strings_len, terminated_len) catch return error.AddressOverflow;
    }
    for (auxv, 0..) |entry, i| {
        if (entry.type == at_null) return error.CallerSuppliedAtNull;
        for (auxv[0..i]) |prior| {
            if (prior.type == entry.type) return error.DuplicateAuxType;
        }
        switch (entry.value) {
            .argv_string => |index| if (index >= argv.len) return error.InvalidSymbolicTarget,
            .env_string => |index| if (index >= envp.len) return error.InvalidSymbolicTarget,
            .immediate => {},
        }
    }

    const words = std.math.add(
        usize,
        1 + argv.len + 1 + envp.len + 1,
        2 * (auxv.len + 1),
    ) catch return error.AddressOverflow;
    const table_len = std.math.mul(usize, words, word_size) catch return error.AddressOverflow;
    const raw_len = std.math.add(usize, table_len, strings_len) catch return error.AddressOverflow;
    if (raw_len > stack_range.end) return error.StackRangeTooSmall;
    const unaligned_sp = stack_range.end - raw_len;
    const sp = alignment.alignDown(unaligned_sp, stack_alignment) catch unreachable;
    if (sp < stack_range.start) return error.StackRangeTooSmall;
    const image_len = stack_range.end - sp;
    if (image_len > byte_capacity) return error.OutputCapacityExceeded;
    const strings_offset = image_len - strings_len;

    var result: StackPlan(byte_capacity) = .{
        .len = image_len,
        .initial_sp = GuestVirtualAddress.init(sp),
        .used_range = .{ .start = sp, .end = stack_range.end },
        .argv_offset = word_size,
        .envp_offset = word_size * (2 + argv.len),
        .auxv_offset = word_size * (3 + argv.len + envp.len),
        .strings_offset = strings_offset,
    };
    var string_cursor = strings_offset;
    var argv_addresses: [@max(argv_capacity, 1)]u64 = undefined;
    var env_addresses: [@max(env_capacity, 1)]u64 = undefined;
    for (argv, 0..) |s, i| {
        const address = std.math.add(usize, sp, string_cursor) catch return error.AddressOverflow;
        argv_addresses[i] = std.math.cast(u64, address) orelse return error.AddressOverflow;
        @memcpy(result.storage[string_cursor..][0..s.len], s);
        string_cursor += s.len + 1;
    }
    for (envp, 0..) |s, i| {
        const address = std.math.add(usize, sp, string_cursor) catch return error.AddressOverflow;
        env_addresses[i] = std.math.cast(u64, address) orelse return error.AddressOverflow;
        @memcpy(result.storage[string_cursor..][0..s.len], s);
        string_cursor += s.len + 1;
    }

    var cursor: usize = 0;
    writeWord(&result.storage, &cursor, @intCast(argv.len));
    for (argv_addresses[0..argv.len]) |value| writeWord(&result.storage, &cursor, value);
    writeWord(&result.storage, &cursor, 0);
    for (env_addresses[0..envp.len]) |value| writeWord(&result.storage, &cursor, value);
    writeWord(&result.storage, &cursor, 0);
    for (auxv) |entry| {
        writeWord(&result.storage, &cursor, entry.type);
        const value = switch (entry.value) {
            .immediate => |value| value,
            .argv_string => |index| argv_addresses[index],
            .env_string => |index| env_addresses[index],
        };
        writeWord(&result.storage, &cursor, value);
    }
    writeWord(&result.storage, &cursor, 0);
    writeWord(&result.storage, &cursor, 0);
    std.debug.assert(cursor == table_len);
    return result;
}

fn writeWord(storage: []u8, cursor: *usize, value: u64) void {
    const encoded = endian.EndianIntegerCodec(u64, .little).encode(value);
    @memcpy(storage[cursor.*..][0..word_size], &encoded);
    cursor.* += word_size;
}

fn readWord(bytes: []const u8, offset: usize) u64 {
    var encoded: [8]u8 = undefined;
    @memcpy(&encoded, bytes[offset..][0..8]);
    return std.mem.readInt(u64, &encoded, .little);
}

test "independently decodes ordered argv envp auxv pointers and sentinels" {
    const argv = [_][]const u8{ "app", "different" };
    const envp = [_][]const u8{ "A=1", "B=two" };
    const auxv = [_]AuxEntry{
        .{ .type = 6, .value = .{ .immediate = 4096 } },
        .{ .type = 31, .value = .{ .argv_string = 0 } },
    };
    const made = try plan(
        256,
        2,
        2,
        2,
        try GuestStackRange.init(0x7000, 0x7100),
        &argv,
        &envp,
        &auxv,
    );
    try std.testing.expectEqual(@as(usize, 0), made.initial_sp.raw() % 16);
    const b = made.bytes();
    try std.testing.expectEqual(@as(u64, 2), readWord(b, 0));
    const a0 = readWord(b, 8);
    const a1 = readWord(b, 16);
    try std.testing.expectEqual(@as(u64, 0), readWord(b, 24));
    const e0 = readWord(b, 32);
    const e1 = readWord(b, 40);
    try std.testing.expectEqual(@as(u64, 0), readWord(b, 48));
    try std.testing.expectEqual(@as(u64, 6), readWord(b, 56));
    try std.testing.expectEqual(@as(u64, 4096), readWord(b, 64));
    try std.testing.expectEqual(@as(u64, 31), readWord(b, 72));
    try std.testing.expectEqual(a0, readWord(b, 80));
    try std.testing.expectEqual(@as(u64, 0), readWord(b, 88));
    try std.testing.expectEqual(@as(u64, 0), readWord(b, 96));
    const base = made.initial_sp.raw();
    try std.testing.expectEqualStrings("app", std.mem.sliceTo(b[@intCast(a0 - base)..], 0));
    try std.testing.expectEqualStrings("different", std.mem.sliceTo(b[@intCast(a1 - base)..], 0));
    try std.testing.expectEqualStrings("A=1", std.mem.sliceTo(b[@intCast(e0 - base)..], 0));
    try std.testing.expectEqualStrings("B=two", std.mem.sliceTo(b[@intCast(e1 - base)..], 0));
    for (b[104..made.strings_offset]) |byte| {
        try std.testing.expectEqual(@as(u8, 0), byte);
    }
}

test "minimal empty environment has deterministic padding and exact capacity boundaries" {
    const argv = [_][]const u8{"x"};
    const auxv = [_]AuxEntry{};
    const made = try plan(
        64,
        1,
        0,
        0,
        try GuestStackRange.init(0x1000, 0x1040),
        &argv,
        &.{},
        &auxv,
    );
    try std.testing.expectEqual(@as(usize, 64), made.bytes().len);
    try std.testing.expectError(
        error.OutputCapacityExceeded,
        plan(63, 1, 0, 0, try GuestStackRange.init(0x1000, 0x1040), &argv, &.{}, &auxv),
    );
    try std.testing.expectError(
        error.StackRangeTooSmall,
        plan(64, 1, 0, 0, try GuestStackRange.init(0x1001, 0x1040), &argv, &.{}, &auxv),
    );
}

test "rejects every bounded input policy violation" {
    const one = [_][]const u8{"x"};
    const two = [_][]const u8{ "x", "y" };
    const bad = [_][]const u8{"a\x00b"};
    const a = [_]AuxEntry{.{ .type = 1, .value = .{ .immediate = 0 } }};
    const dup = [_]AuxEntry{
        .{ .type = 1, .value = .{ .immediate = 0 } },
        .{ .type = 1, .value = .{ .immediate = 1 } },
    };
    const terminal = [_]AuxEntry{.{ .type = 0, .value = .{ .immediate = 0 } }};
    const symbolic = [_]AuxEntry{.{ .type = 31, .value = .{ .argv_string = 1 } }};
    const range = try GuestStackRange.init(0x1000, 0x1100);
    try std.testing.expectError(error.EmptyArgv, plan(256, 1, 1, 1, range, &.{}, &.{}, &.{}));
    try std.testing.expectError(error.TooManyArgv, plan(256, 1, 1, 1, range, &two, &.{}, &.{}));
    try std.testing.expectError(error.TooManyEnv, plan(256, 1, 0, 1, range, &one, &one, &.{}));
    try std.testing.expectError(error.TooManyAuxv, plan(256, 1, 0, 0, range, &one, &.{}, &a));
    try std.testing.expectError(error.InteriorNul, plan(256, 1, 0, 0, range, &bad, &.{}, &.{}));
    try std.testing.expectError(error.InteriorNul, plan(256, 1, 1, 0, range, &one, &bad, &.{}));
    try std.testing.expectError(
        error.CallerSuppliedAtNull,
        plan(256, 1, 0, 1, range, &one, &.{}, &terminal),
    );
    try std.testing.expectError(
        error.DuplicateAuxType,
        plan(256, 1, 0, 2, range, &one, &.{}, &dup),
    );
    try std.testing.expectError(
        error.InvalidSymbolicTarget,
        plan(256, 1, 0, 1, range, &one, &.{}, &symbolic),
    );
}

test "maximum capacities, no-padding boundary, and near-usize top remain checked" {
    const argv = [_][]const u8{ "a", "bb" };
    const envp = [_][]const u8{"E=v"};
    const auxv = [_]AuxEntry{.{ .type = 9, .value = .{ .immediate = 0x1234 } }};
    const made = try plan(
        128,
        2,
        1,
        1,
        try GuestStackRange.init(0x2000, 0x2070),
        &argv,
        &envp,
        &auxv,
    );
    try std.testing.expectEqual(@as(usize, 0), made.initial_sp.raw() % 16);
    const high = std.math.maxInt(usize);
    const near = try plan(
        128,
        1,
        0,
        0,
        try GuestStackRange.init(high - 127, high),
        &[_][]const u8{"z"},
        &.{},
        &.{},
    );
    try std.testing.expect(near.used_range.end == high);
}
