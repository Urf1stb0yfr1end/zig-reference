const pool_mod = @import("fixed-capacity-object-pool");
test "second removal is rejected at runtime" {
    var pool = pool_mod.ObjectPool(u8, 1){};
    const handle = try pool.insert(1);
    _ = pool.remove(handle);
    try @import("std").testing.expect(pool.remove(handle) == null);
}
