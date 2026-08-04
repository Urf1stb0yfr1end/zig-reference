const std = @import("std");

/// Exclusive success or failure payload without detached status/output pairs.
pub fn TaggedResult(comptime Success: type, comptime Failure: type) type {
    return union(enum) {
        success: Success,
        failure: Failure,

        const Self = @This();

        pub fn isSuccess(self: Self) bool {
            return switch (self) {
                .success => true,
                .failure => false,
            };
        }

        pub fn successValue(self: Self) ?Success {
            return switch (self) {
                .success => |value| value,
                .failure => null,
            };
        }

        pub fn failureValue(self: Self) ?Failure {
            return switch (self) {
                .success => null,
                .failure => |value| value,
            };
        }
    };
}

test "outcomes are exclusive" {
    const Result = TaggedResult(u32, []const u8);
    const ok = Result{ .success = 42 };
    const failed = Result{ .failure = "bad input" };
    try std.testing.expect(ok.isSuccess());
    try std.testing.expectEqual(@as(?u32, 42), ok.successValue());
    try std.testing.expectEqualStrings("bad input", failed.failureValue().?);
}
