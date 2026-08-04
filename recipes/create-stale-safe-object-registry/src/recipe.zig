const std = @import("std");
const pool_mod = @import("fixed-capacity-object-pool");

pub const Registry = pool_mod.ObjectPool(u32, 2);

test "removed identity remains stale after slot reuse" {
    var registry = Registry{};
    const old = try registry.insert(10);
    try std.testing.expectEqual(@as(?u32, 10), registry.remove(old));
    const current = try registry.insert(20);
    try std.testing.expect(old.generation != current.generation);
    try std.testing.expect(registry.get(old) == null);
    try std.testing.expectEqual(@as(u32, 20), registry.get(current).?.*);
}
