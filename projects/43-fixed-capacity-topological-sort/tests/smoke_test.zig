const m = @import("fixed-capacity-topological-sort");
const std = @import("std");
test "named import" {
    var g = try m.FixedTopologicalGraph(2, 1).init(2);
    try g.addEdge(0, 1);
    try std.testing.expectEqualSlices(usize, &.{ 0, 1 }, (try g.sort()).items());
}
