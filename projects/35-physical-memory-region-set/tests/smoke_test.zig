const std = @import("std");
const m = @import("physical-memory-region-set");
const a = @import("distinct-memory-address-types");
test "external region set consumer" {
    var s = m.PhysicalMemoryRegionSet(1){};
    try s.add(a.PhysicalAddress.init(0x1000), 0x1000, .usable);
    try std.testing.expect(s.findContaining(a.PhysicalAddress.init(0x1000)) != null);
    try std.testing.expectError(error.Overlap, s.add(a.PhysicalAddress.init(0x1000), 1, .reserved));
}
