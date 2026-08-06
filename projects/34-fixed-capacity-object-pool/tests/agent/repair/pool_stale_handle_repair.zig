const pool_mod = @import("fixed-capacity-object-pool");
test "replace a stale handle after reinsertion" {
    var pool = pool_mod.ObjectPool(u8, 1){};
    const old = try pool.insert(1);
    _ = pool.remove(old);
    const current = try pool.insert(2);
    try @import("std").testing.expectEqual(@as(u8, 2), pool.get(current).?.*);
}
