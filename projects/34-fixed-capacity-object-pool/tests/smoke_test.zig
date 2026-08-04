const std=@import("std");const m=@import("fixed-capacity-object-pool");
test "external pool consumer" {var p=m.ObjectPool(u8,1){};const h=try p.insert(7);try std.testing.expectEqual(@as(u8,7),p.get(h).?.*);try std.testing.expectError(error.Full,p.insert(8));_=p.remove(h);try std.testing.expect(p.get(h)==null);}
