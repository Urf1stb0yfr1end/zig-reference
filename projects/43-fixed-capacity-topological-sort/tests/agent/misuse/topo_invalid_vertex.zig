const topo = @import("fixed-capacity-topological-sort");
test "invalid vertex is rejected" {
    var g = try topo.FixedTopologicalGraph(1, 1).init(1);
    try @import("std").testing.expectError(error.InvalidNode, g.addEdge(0, 1));
}
