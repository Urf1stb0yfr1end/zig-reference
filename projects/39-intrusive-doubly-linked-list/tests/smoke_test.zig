const m = @import("intrusive-doubly-linked-list");
const std = @import("std");
test "named import" {
    const L = m.IntrusiveDoublyLinkedList(u8);
    var l = L.init();
    var n = L.Node{ .value = 7 };
    try l.pushBack(&n);
    try std.testing.expectEqual(@as(u8, 7), l.popFront().?.value);
}
