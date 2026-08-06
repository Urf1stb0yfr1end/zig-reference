const topo = @import("fixed-capacity-topological-sort");
test "edge endpoints are in range" {
    var g = try topo.FixedTopologicalGraph(2, 1).init(2);
    try g.addEdge(0, 1);
}
