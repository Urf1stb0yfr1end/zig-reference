const free = @import("fixed-free-list");
test "double release returns an error" {
    var slots = free.FixedFreeList(1).init();
    const slot = try slots.allocate();
    try slots.release(slot);
    try @import("std").testing.expectError(error.DoubleFree, slots.release(slot));
}
