const topo = @import("fixed-capacity-topological-sort");
test "cycle is rejected" {
    var g = try topo.FixedTopologicalGraph(2, 2).init(2);
    try g.addEdge(0, 1);
    try g.addEdge(1, 0);
    try @import("std").testing.expectError(error.Cycle, g.sort());
}
