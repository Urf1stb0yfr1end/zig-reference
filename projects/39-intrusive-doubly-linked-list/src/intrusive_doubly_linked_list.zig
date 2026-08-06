const std = @import("std");

/// Allocation-free list. The caller owns every Node and must keep both the list
/// and linked nodes at stable addresses until removal.
pub fn IntrusiveDoublyLinkedList(comptime T: type) type {
    return struct {
        const Self = @This();
        pub const Error = error{AlreadyLinked};
        pub const Node = struct {
            value: T,
            previous: ?*Node = null,
            next: ?*Node = null,
            owner: ?*Self = null,
        };

        first: ?*Node = null,
        last: ?*Node = null,
        len: usize = 0,

        pub fn init() Self {
            return .{};
        }
        pub fn count(self: *const Self) usize {
            return self.len;
        }
        pub fn isEmpty(self: *const Self) bool {
            return self.len == 0;
        }

        pub fn pushFront(self: *Self, node: *Node) Error!void {
            if (node.owner != null) return error.AlreadyLinked;
            node.*.previous = null;
            node.*.next = self.first;
            node.*.owner = self;
            if (self.first) |first| first.previous = node else self.last = node;
            self.first = node;
            self.len += 1;
        }

        pub fn pushBack(self: *Self, node: *Node) Error!void {
            if (node.owner != null) return error.AlreadyLinked;
            node.*.previous = self.last;
            node.*.next = null;
            node.*.owner = self;
            if (self.last) |last| last.next = node else self.first = node;
            self.last = node;
            self.len += 1;
        }

        pub fn remove(self: *Self, node: *Node) bool {
            if (node.owner != self) return false;
            if (node.previous) |previous| previous.next = node.next else self.first = node.next;
            if (node.next) |next| next.previous = node.previous else self.last = node.previous;
            node.previous = null;
            node.next = null;
            node.owner = null;
            self.len -= 1;
            return true;
        }

        pub fn popFront(self: *Self) ?*Node {
            const node = self.first orelse return null;
            std.debug.assert(self.remove(node));
            return node;
        }

        pub fn popBack(self: *Self) ?*Node {
            const node = self.last orelse return null;
            std.debug.assert(self.remove(node));
            return node;
        }
    };
}

test "links, unlinks, rejects duplicate and preserves endpoints" {
    const List = IntrusiveDoublyLinkedList(u8);
    var list = List.init();
    var other = List.init();
    var a = List.Node{ .value = 1 };
    var b = List.Node{ .value = 2 };
    try list.pushBack(&a);
    try list.pushBack(&b);
    try std.testing.expectError(error.AlreadyLinked, list.pushFront(&a));
    try std.testing.expect(!other.remove(&a));
    try std.testing.expectEqual(@as(u8, 1), list.popFront().?.value);
    try std.testing.expectEqual(@as(u8, 2), list.popBack().?.value);
    try std.testing.expect(list.isEmpty());
    try std.testing.expect(list.popFront() == null);
}
