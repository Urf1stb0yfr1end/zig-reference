const bump = @import("fixed-bump-allocator");
// Future analyzer expectation: Zig permits `old` to be read after reset even though the module contract invalidates it.
test "document use after reset that Zig does not reject" {
    var bytes: [1]u8 = .{7};
    var arena = bump.FixedBumpAllocator.init(&bytes);
    const old = try arena.allocate(1, 1);
    arena.reset();
    _ = old[0];
}
