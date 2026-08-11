const std = @import("std");
const filesystem = @import("bounded-filesystem");
test "external consumer traverses a directory capability" {
    var fs = filesystem.FileSystem(3, 8, 16){};
    const etc = try fs.create(.root, "etc", .directory, "");
    _ = try fs.create(etc, "motd", .file, "alpz\n");
    var out: [8]u8 = undefined;
    const n = try fs.read(try fs.lookup(etc, "motd"), 0, &out);
    try std.testing.expectEqualStrings("alpz\n", out[0..n]);
}
