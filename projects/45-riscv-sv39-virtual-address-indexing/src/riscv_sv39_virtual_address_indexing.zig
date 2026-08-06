const std = @import("std");
pub const Level = enum(u2) { page_4k = 0, page_2m = 1, page_1g = 2 };
pub const Error = error{ NonCanonical, IndexOutOfRange, OffsetOutOfRange, Misaligned, Overflow, CanonicalBoundary };
pub const Parts = struct { vpn2: u16, vpn1: u16, vpn0: u16, offset: u16 };
pub fn isCanonical(v: u64) bool {
    const upper = v >> 39;
    return upper == (if (((v >> 38) & 1) == 1) @as(u64, 0x1ffffff) else @as(u64, 0));
}
pub fn decompose(v: u64) Error!Parts {
    if (!isCanonical(v)) return error.NonCanonical;
    return .{ .vpn2 = @intCast((v >> 30) & 0x1ff), .vpn1 = @intCast((v >> 21) & 0x1ff), .vpn0 = @intCast((v >> 12) & 0x1ff), .offset = @intCast(v & 0xfff) };
}
pub fn construct(p: Parts) Error!u64 {
    if (p.vpn2 > 511 or p.vpn1 > 511 or p.vpn0 > 511) return error.IndexOutOfRange;
    if (p.offset > 4095) return error.OffsetOutOfRange;
    var v = (@as(u64, p.vpn2) << 30) | (@as(u64, p.vpn1) << 21) | (@as(u64, p.vpn0) << 12) | p.offset;
    if ((v & (@as(u64, 1) << 38)) != 0) v |= 0xffff_ff80_0000_0000;
    return v;
}
pub fn pageSize(level: Level) u64 {
    return switch (level) {
        .page_4k => 4096,
        .page_2m => 2 * 1024 * 1024,
        .page_1g => 1024 * 1024 * 1024,
    };
}
pub fn requireAligned(v: u64, level: Level) Error!void {
    if (!isCanonical(v)) return error.NonCanonical;
    if (v & (pageSize(level) - 1) != 0) return error.Misaligned;
}
pub fn validateRange(start: u64, len: u64) Error!void {
    if (!isCanonical(start)) return error.NonCanonical;
    if (len == 0) return;
    const last = std.math.add(u64, start, len - 1) catch return error.Overflow;
    if (!isCanonical(last) or ((start >> 38) & 1) != ((last >> 38) & 1)) return error.CanonicalBoundary;
}
test "canonical boundaries, holes, indices and alignment" {
    const vals = [_]u64{ 0, 0x3fff_ffff_ff, 0xffff_ffc0_0000_0000, 0xffff_ffff_ffff_ffff };
    for (vals) |v| try std.testing.expectEqual(v, try construct(try decompose(v)));
    try std.testing.expectError(error.NonCanonical, decompose(0x40_0000_0000));
    try std.testing.expectError(error.NonCanonical, decompose(0xffff_ffbf_ffff_ffff));
    const p = try decompose(0x3fff_ffff_ff);
    try std.testing.expectEqual(@as(u16, 255), p.vpn2);
    try std.testing.expectError(error.Misaligned, requireAligned(4096, .page_2m));
    try std.testing.expectError(error.CanonicalBoundary, validateRange(0x3fff_fff000, 8192));
    try std.testing.expectError(error.Overflow, validateRange(0xffff_ffff_ffff_f000, 8192));
}
