const std = @import("std");
const image = @import("bounded-address-space-exec-image");
test "external consumer maps protects and unmaps" {
    var space = image.AddressSpace(1){};
    try space.map(0x8000, image.page_size, .{ .read = true, .write = true });
    try space.protect(0x8000, image.page_size, .{ .read = true });
    try std.testing.expect(space.contains(0x8000, .{ .read = true }));
    try space.unmap(0x8000, image.page_size);
}
