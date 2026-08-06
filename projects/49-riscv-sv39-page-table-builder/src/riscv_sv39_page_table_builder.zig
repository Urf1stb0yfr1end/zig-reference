const std = @import("std");
const pte = @import("riscv-sv39-page-table-entry");
const va = @import("riscv-sv39-virtual-address-indexing");
const walker = @import("riscv-sv39-page-table-walker");
const inv = @import("riscv-sfence-vma-invalidation");
pub const Error = error{ NonCanonical, Misaligned, InvalidPageSize, Conflict, MissingMapping, MalformedMapping, OutOfPages, ProviderReadFailure, ProviderWriteFailure, RollbackCapacity, Overflow, CanonicalBoundary, IndexOutOfRange, OffsetOutOfRange };
pub const Mutation = struct { invalidation: ?inv.Plan };
pub fn Builder(comptime Owner: type) type {
    return struct {
        const Self = @This();
        owner: *Owner,
        root: u64,
        pub fn init(owner: *Owner) Error!Self {
            return .{ .owner = owner, .root = owner.allocate() catch return error.OutOfPages };
        }
        pub fn query(self: *Self, address: u64) walker.Error!walker.Result {
            return walker.walk(self.owner, self.root, address);
        }
        pub fn mapPage(self: *Self, v: u64, p: u64, level: pte.Level, permissions: pte.Permissions) Error!Mutation {
            try va.requireAligned(v, @enumFromInt(@intFromEnum(level)));
            const size = va.pageSize(@enumFromInt(@intFromEnum(level)));
            if (p & (size - 1) != 0) return error.Misaligned;
            const parts = va.decompose(v) catch return error.NonCanonical;
            const indices = [_]u16{ parts.vpn2, parts.vpn1, parts.vpn0 };
            const target: usize = 2 - @intFromEnum(level);
            var frame = self.root;
            var made: [2]u64 = undefined;
            var made_parent: [2]u64 = undefined;
            var made_index: [2]usize = undefined;
            var count: usize = 0;
            errdefer {
                while (count > 0) {
                    count -= 1;
                    self.owner.write(made_parent[count], made_index[count], 0) catch {};
                    self.owner.release(made[count]) catch {};
                }
            }
            for (indices, 0..) |idx, depth| {
                const raw = self.owner.read(frame, idx) catch return error.ProviderReadFailure;
                if (depth == target) {
                    if (raw != 0) return error.Conflict;
                    const leaf = pte.Entry.leaf(p, permissions, level) catch return error.MalformedMapping;
                    self.owner.write(frame, idx, leaf.raw) catch return error.ProviderWriteFailure;
                    return .{ .invalidation = null };
                }
                if (raw == 0) {
                    const child = self.owner.allocate() catch return error.OutOfPages;
                    made[count] = child;
                    made_parent[count] = frame;
                    made_index[count] = idx;
                    count += 1;
                    const branch = pte.Entry.branch(child) catch unreachable;
                    self.owner.write(frame, idx, branch.raw) catch return error.ProviderWriteFailure;
                    frame = child;
                } else {
                    const e = pte.Entry.decode(raw) catch return error.MalformedMapping;
                    if (e.kind() != .branch) return error.Conflict;
                    frame = e.address();
                }
            }
            unreachable;
        }
        pub fn mapRange(self: *Self, v: u64, p: u64, len: u64, exact: ?pte.Level, permissions: pte.Permissions) Error!Mutation {
            va.validateRange(v, len) catch |e| return switch (e) {
                error.Overflow => error.Overflow,
                error.CanonicalBoundary => error.CanonicalBoundary,
                else => error.NonCanonical,
            };
            var off: u64 = 0;
            while (off < len) {
                const remain = len - off;
                const level = exact orelse if (((v + off) | (p + off)) % (1 << 30) == 0 and remain >= 1 << 30) .page_1g else if (((v + off) | (p + off)) % (1 << 21) == 0 and remain >= 1 << 21) .page_2m else .page_4k;
                const size = va.pageSize(@enumFromInt(@intFromEnum(level)));
                if (remain < size) return error.InvalidPageSize;
                _ = try self.mapPage(v + off, p + off, level, permissions);
                off += size;
            }
            return .{ .invalidation = null };
        }
        pub fn unmapPage(self: *Self, v: u64, level: pte.Level) Error!Mutation {
            try va.requireAligned(v, @enumFromInt(@intFromEnum(level)));
            const parts = va.decompose(v) catch return error.NonCanonical;
            const indices = [_]u16{ parts.vpn2, parts.vpn1, parts.vpn0 };
            const target = 2 - @intFromEnum(level);
            var frame = self.root;
            for (indices, 0..) |idx, depth| {
                const raw = self.owner.read(frame, idx) catch return error.ProviderReadFailure;
                if (raw == 0) return error.MissingMapping;
                const e = pte.Entry.decode(raw) catch return error.MalformedMapping;
                if (depth == target) {
                    if (e.kind() != .leaf) return error.MalformedMapping;
                    e.validateAtLevel(level) catch return error.MalformedMapping;
                    self.owner.write(frame, idx, 0) catch return error.ProviderWriteFailure;
                    return .{ .invalidation = inv.forAddress(v) };
                }
                if (e.kind() != .branch) return error.Conflict;
                frame = e.address();
            }
            return error.MissingMapping;
        }
        pub fn protect(self: *Self, v: u64, level: pte.Level, p: pte.Permissions) Error!Mutation {
            const old = self.query(v) catch return error.MissingMapping;
            if (old.level != level) return error.Conflict;
            _ = try self.unmapPage(v, level);
            self.mapPage(v, old.physical_address, level, p) catch return error.ProviderWriteFailure;
            return .{ .invalidation = inv.forAddress(v) };
        }
    };
}
test "map query conflict unmap and atomic allocation failure" {
    const O = @import("riscv-page-table-page-owner").PageOwner(3);
    var o = O{};
    var b = try Builder(O).init(&o);
    _ = try b.mapPage(0, 0x4000, .page_4k, .{ .read = true, .write = true });
    try std.testing.expectEqual(@as(u64, 0x4003), (try b.query(3)).physical_address);
    try std.testing.expectError(error.Conflict, b.mapPage(0, 0x8000, .page_4k, .{ .read = true }));
    _ = try b.unmapPage(0, .page_4k);
    try std.testing.expectError(error.InvalidEntry, b.query(0));
    var tiny = @import("riscv-page-table-page-owner").PageOwner(2){};
    var x = try Builder(@TypeOf(tiny)).init(&tiny);
    const before = tiny.count();
    try std.testing.expectError(error.OutOfPages, x.mapPage(0, 0, .page_4k, .{ .read = true }));
    try std.testing.expectEqual(before, tiny.count());
}
