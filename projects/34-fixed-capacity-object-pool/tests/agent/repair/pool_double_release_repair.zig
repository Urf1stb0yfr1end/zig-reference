const pool_mod = @import("fixed-capacity-object-pool");
test "remove once" {
    var pool = pool_mod.ObjectPool(u8, 1){};
    const handle = try pool.insert(1);
    try @import("std").testing.expectEqual(@as(?u8, 1), pool.remove(handle));
}
