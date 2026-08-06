const free = @import("fixed-free-list");
test "release only an allocated slot" {
    var slots = free.FixedFreeList(1).init();
    const slot = try slots.allocate();
    if (try slots.isAllocated(slot)) try slots.release(slot);
}
