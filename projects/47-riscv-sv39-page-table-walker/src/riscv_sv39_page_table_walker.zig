const std = @import("std");
const pte = @import("riscv-sv39-page-table-entry");
const va = @import("riscv-sv39-virtual-address-indexing");
pub const Error = error{ NonCanonical, InvalidEntry, MalformedEntry, MisalignedSuperpage, ProviderReadFailure };
pub const Result = struct { physical_address: u64, level: pte.Level, page_size: u64, permissions: pte.Permissions };
pub fn walk(provider: anytype, root: u64, address: u64) Error!Result {
    const parts = va.decompose(address) catch return error.NonCanonical;
    const indices = [_]u16{ parts.vpn2, parts.vpn1, parts.vpn0 };
    var frame = root;
    for (indices, 0..) |idx, depth| {
        const raw = provider.read(frame, idx) catch return error.ProviderReadFailure;
        const e = pte.Entry.decode(raw) catch return error.MalformedEntry;
        switch (e.kind()) {
            .invalid => return error.InvalidEntry,
            .branch => {
                if (depth == 2) return error.MalformedEntry;
                frame = e.address();
            },
            .leaf => {
                const level: pte.Level = @enumFromInt(2 - depth);
                e.validateAtLevel(level) catch return error.MisalignedSuperpage;
                const size = va.pageSize(@enumFromInt(2 - depth));
                return .{ .physical_address = e.address() + (address & (size - 1)), .level = level, .page_size = size, .permissions = e.permissions() };
            },
        }
    }
    return error.InvalidEntry;
}
test "walks leaf and reports provider failure" {
    const O = @import("riscv-page-table-page-owner").PageOwner(2);
    var o = O{};
    const root = try o.allocate();
    const child = try o.allocate();
    try o.write(root, 0, (try pte.Entry.branch(child)).raw);
    try o.write(child, 0, (try pte.Entry.leaf(0x200000, .{ .read = true }, .page_2m)).raw);
    const r = try walk(&o, root, 0x1234);
    try std.testing.expectEqual(@as(u64, 0x201234), r.physical_address);
    o.fail_reads = true;
    try std.testing.expectError(error.ProviderReadFailure, walk(&o, root, 0));
}
