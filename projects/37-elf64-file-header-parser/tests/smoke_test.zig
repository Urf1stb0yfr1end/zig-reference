const std=@import("std");const m=@import("elf64-file-header-parser");const rmod=@import("bounded-byte-reader");
test "external ELF header consumer" {var bad=[_]u8{0}**64;var r=rmod.BoundedReader.init(&bad);try std.testing.expectError(error.BadMagic,m.parse(&r));try std.testing.expectEqual(@as(usize,0),r.position());}
