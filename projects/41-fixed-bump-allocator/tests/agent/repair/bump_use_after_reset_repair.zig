const bump = @import("fixed-bump-allocator");
test "allocate a fresh slice after reset" {
    var bytes: [1]u8 = undefined;
    var arena = bump.FixedBumpAllocator.init(&bytes);
    _ = try arena.allocate(1, 1);
    arena.reset();
    const current = try arena.allocate(1, 1);
    current[0] = 7;
}
