const std = @import("std");

pub const Level = enum(u2) { page_4k = 0, page_2m = 1, page_1g = 2 };
pub const Kind = enum { invalid, branch, leaf };
pub const Permissions = struct { read: bool = false, write: bool = false, execute: bool = false, user: bool = false, global: bool = false, accessed: bool = false, dirty: bool = false };
pub const DecodeError = error{ ReservedBits, WriteWithoutRead, InvalidEncoding, PhysicalAddressTooLarge, MisalignedSuperpage };
pub const Entry = struct {
    raw: u64,
    pub const valid_mask: u64 = 1;
    const rwx_mask: u64 = 0x0e;
    const allowed_mask: u64 = 0x003f_ffff_ffff_ffff; // bits 0..53; Sv39 PPN is 44 bits
    pub fn invalid() Entry {
        return .{ .raw = 0 };
    }
    pub fn branch(frame_address: u64) DecodeError!Entry {
        return encode(frame_address, .{}, false);
    }
    pub fn leaf(frame_address: u64, perms: Permissions, level: Level) DecodeError!Entry {
        if (!perms.read and !perms.execute) return error.InvalidEncoding;
        const result = try encode(frame_address, perms, true);
        try result.validateAtLevel(level);
        return result;
    }
    fn encode(frame_addr: u64, p: Permissions, is_leaf: bool) DecodeError!Entry {
        if ((frame_addr & 0xfff) != 0) return error.InvalidEncoding;
        if ((frame_addr >> 56) != 0) return error.PhysicalAddressTooLarge;
        if (p.write and !p.read) return error.WriteWithoutRead;
        var flags: u64 = 1;
        if (is_leaf) {
            flags |= @as(u64, @intFromBool(p.read)) << 1;
            flags |= @as(u64, @intFromBool(p.write)) << 2;
            flags |= @as(u64, @intFromBool(p.execute)) << 3;
            flags |= @as(u64, @intFromBool(p.user)) << 4;
            flags |= @as(u64, @intFromBool(p.global)) << 5;
            flags |= @as(u64, @intFromBool(p.accessed)) << 6;
            flags |= @as(u64, @intFromBool(p.dirty)) << 7;
        }
        return .{ .raw = ((frame_addr >> 12) << 10) | flags };
    }
    pub fn decode(raw: u64) DecodeError!Entry {
        if ((raw & ~allowed_mask) != 0) return error.ReservedBits;
        const e = Entry{ .raw = raw };
        if ((raw & valid_mask) == 0) {
            if (raw != 0) return error.InvalidEncoding;
            return e;
        }
        if ((raw & 4) != 0 and (raw & 2) == 0) return error.WriteWithoutRead;
        if ((raw & rwx_mask) == 0 and (raw & 0xf0) != 0) return error.InvalidEncoding;
        return e;
    }
    pub fn kind(self: Entry) Kind {
        if ((self.raw & 1) == 0) return .invalid;
        return if ((self.raw & rwx_mask) == 0) .branch else .leaf;
    }
    pub fn address(self: Entry) u64 {
        return ((self.raw >> 10) & ((@as(u64, 1) << 44) - 1)) << 12;
    }
    pub fn permissions(self: Entry) Permissions {
        return .{ .read = (self.raw & 2) != 0, .write = (self.raw & 4) != 0, .execute = (self.raw & 8) != 0, .user = (self.raw & 16) != 0, .global = (self.raw & 32) != 0, .accessed = (self.raw & 64) != 0, .dirty = (self.raw & 128) != 0 };
    }
    pub fn validateAtLevel(self: Entry, level: Level) DecodeError!void {
        _ = try decode(self.raw);
        if (self.kind() != .leaf) return;
        const mask: u64 = switch (level) {
            .page_4k => 0,
            .page_2m => (1 << 21) - 1,
            .page_1g => (1 << 30) - 1,
        };
        if ((self.address() & mask) != 0) return error.MisalignedSuperpage;
    }
};

test "exact encodings and architectural rejection" {
    const e = try Entry.leaf(0x12345000, .{ .read = true, .write = true, .accessed = true, .dirty = true }, .page_4k);
    try std.testing.expectEqual(@as(u64, (0x12345 << 10) | 0xc7), e.raw);
    try std.testing.expectEqual(@as(u64, 0x12345000), (try Entry.decode(e.raw)).address());
    try std.testing.expectError(error.WriteWithoutRead, Entry.decode(0x5));
    try std.testing.expectError(error.ReservedBits, Entry.decode(@as(u64, 1) << 63));
    try std.testing.expectError(error.InvalidEncoding, Entry.decode(0x400));
    try std.testing.expectError(error.MisalignedSuperpage, e.validateAtLevel(.page_2m));
}
