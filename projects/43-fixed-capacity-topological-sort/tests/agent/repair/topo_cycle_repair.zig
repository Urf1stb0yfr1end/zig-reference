const topo = @import("fixed-capacity-topological-sort");
test "acyclic graph sorts" {
    var g = try topo.FixedTopologicalGraph(2, 1).init(2);
    try g.addEdge(0, 1);
    _ = try g.sort();
}
