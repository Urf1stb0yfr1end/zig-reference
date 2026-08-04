const std = @import("std");

pub const SemanticVersion = struct {
    major: u32,
    minor: u32,
    patch: u32,

    pub fn compare(self: SemanticVersion, other: SemanticVersion) std.math.Order {
        if (self.major != other.major) return std.math.order(self.major, other.major);
        if (self.minor != other.minor) return std.math.order(self.minor, other.minor);
        return std.math.order(self.patch, other.patch);
    }

    pub fn isCompatibleWith(self: SemanticVersion, required: SemanticVersion) bool {
        return self.major == required.major and self.compare(required) != .lt;
    }
};

test "semantic versions compare field by field" {
    const a = SemanticVersion{ .major = 1, .minor = 4, .patch = 0 };
    const b = SemanticVersion{ .major = 1, .minor = 3, .patch = 9 };
    try std.testing.expectEqual(std.math.Order.gt, a.compare(b));
    try std.testing.expect(a.isCompatibleWith(b));
    try std.testing.expect(!a.isCompatibleWith(.{ .major = 2, .minor = 0, .patch = 0 }));
}
