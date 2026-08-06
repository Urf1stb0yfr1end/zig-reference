const std = @import("fixed-capacity-object-pool");
test "removed handle is stale at runtime" {
    var pool = std.ObjectPool(u8, 1){};
    const handle = try pool.insert(1);
    _ = pool.remove(handle);
    try @import("std").testing.expect(pool.get(handle) == null);
}
