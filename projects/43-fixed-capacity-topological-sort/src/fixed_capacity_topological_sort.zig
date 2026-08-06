const std = @import("std");
const vector = @import("fixed-capacity-vector");
const priority = @import("fixed-capacity-priority-queue");

fn earlier(a: usize, b: usize) bool {
    return a < b;
}

/// Deterministic Kahn topological sort for nodes `0..node_count`.
pub fn FixedTopologicalGraph(comptime max_nodes: usize, comptime max_edges: usize) type {
    const Edge = struct { from: usize, to: usize };
    const Edges = vector.FixedVector(Edge, max_edges);
    const Ready = priority.FixedPriorityQueue(usize, max_nodes, earlier);
    return struct {
        const Self = @This();
        pub const Error = error{ TooManyNodes, InvalidNode, DuplicateEdge, Full, Cycle };
        pub const Order = struct {
            storage: [max_nodes]usize = undefined,
            len: usize = 0,
            pub fn items(self: *const @This()) []const usize {
                return self.storage[0..self.len];
            }
        };
        node_count: usize,
        edges: Edges = Edges.init(),

        pub fn init(node_count: usize) Error!Self {
            if (node_count > max_nodes) return error.TooManyNodes;
            return .{ .node_count = node_count };
        }
        pub fn addEdge(self: *Self, from: usize, to: usize) Error!void {
            if (from >= self.node_count or to >= self.node_count) return error.InvalidNode;
            for (self.edges.constItems()) |edge| if (edge.from == from and edge.to == to) return error.DuplicateEdge;
            self.edges.append(.{ .from = from, .to = to }) catch return error.Full;
        }
        pub fn sort(self: *const Self) Error!Order {
            if (comptime max_nodes == 0) return Order{};
            var indegree = [_]usize{0} ** max_nodes;
            for (self.edges.constItems()) |edge| indegree[edge.to] += 1;
            var ready = Ready.init();
            for (0..self.node_count) |node| if (indegree[node] == 0) ready.insert(node) catch unreachable;
            var order = Order{};
            while (ready.count() != 0) {
                const node = ready.remove() catch unreachable;
                order.storage[order.len] = node;
                order.len += 1;
                for (self.edges.constItems()) |edge| if (edge.from == node) {
                    indegree[edge.to] -= 1;
                    if (indegree[edge.to] == 0) ready.insert(edge.to) catch unreachable;
                };
            }
            if (order.len != self.node_count) return error.Cycle;
            return order;
        }
    };
}

test "deterministic order, duplicate, invalid, full, cycle, and empty graph" {
    var graph = try FixedTopologicalGraph(4, 4).init(4);
    try graph.addEdge(0, 2);
    try graph.addEdge(1, 2);
    try graph.addEdge(2, 3);
    try std.testing.expectError(error.DuplicateEdge, graph.addEdge(0, 2));
    try std.testing.expectError(error.InvalidNode, graph.addEdge(4, 0));
    const order = try graph.sort();
    try std.testing.expectEqualSlices(usize, &.{ 0, 1, 2, 3 }, order.items());
    var cyclic = try FixedTopologicalGraph(2, 2).init(2);
    try cyclic.addEdge(0, 1);
    try cyclic.addEdge(1, 0);
    try std.testing.expectError(error.Cycle, cyclic.sort());
    const empty = try FixedTopologicalGraph(0, 0).init(0);
    try std.testing.expectEqual(@as(usize, 0), (try empty.sort()).items().len);
}
