const std = @import("std");
const intrusive = @import("intrusive-doubly-linked-list");
const free_list = @import("fixed-free-list");
const bump = @import("fixed-bump-allocator");
const priority = @import("fixed-capacity-priority-queue");
const topo = @import("fixed-capacity-topological-sort");

fn earlier(a: u8, b: u8) bool {
    return a < b;
}

test "bounded initialization composes storage ownership and dependency order" {
    var bytes: [64]u8 = undefined;
    var arena = bump.FixedBumpAllocator.init(&bytes);
    const node_bytes = try arena.allocate(2 * @sizeOf(intrusive.IntrusiveDoublyLinkedList(u8).Node), @alignOf(intrusive.IntrusiveDoublyLinkedList(u8).Node));
    const nodes: *[2]intrusive.IntrusiveDoublyLinkedList(u8).Node = @ptrCast(@alignCast(node_bytes.ptr));
    nodes.* = .{ .{ .value = 0 }, .{ .value = 1 } };
    var ready_list = intrusive.IntrusiveDoublyLinkedList(u8).init();
    try ready_list.pushBack(&nodes[0]);
    try ready_list.pushBack(&nodes[1]);

    var slots = free_list.FixedFreeList(2).init();
    const first_slot = try slots.allocate();
    const second_slot = try slots.allocate();
    try slots.release(first_slot);
    try std.testing.expectEqual(first_slot, try slots.allocate());
    try std.testing.expectEqual(@as(usize, 1), second_slot);

    var graph = try topo.FixedTopologicalGraph(2, 1).init(2);
    try graph.addEdge(0, 1);
    const order = try graph.sort();
    var queue = priority.FixedPriorityQueue(u8, 2, earlier).init();
    for (order.items()) |node| try queue.insert(@intCast(node));
    try std.testing.expectEqual(ready_list.popFront().?.value, try queue.remove());
    try std.testing.expectEqual(ready_list.popFront().?.value, try queue.remove());
}
