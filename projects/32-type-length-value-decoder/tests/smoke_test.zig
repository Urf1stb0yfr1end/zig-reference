const std=@import("std");const m=@import("type-length-value-decoder");
test "external TLV consumer" {var d=m.TlvDecoder(u8,u8,.big).init(&.{3,1,9});const r=(try d.next()).?;try std.testing.expectEqual(@as(u8,3),r.tag);var bad=m.TlvDecoder(u8,u8,.big).init(&.{1,2});try std.testing.expectError(error.UnexpectedEnd,bad.next());}
