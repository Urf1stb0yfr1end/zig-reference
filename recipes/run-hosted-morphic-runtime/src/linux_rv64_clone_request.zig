const std = @import("std");

pub const sigchld: usize = 17;

/// The bounded fork shape proven by the Alpine ash pressure path. Linux flag
/// values stay in this compatibility-edge helper rather than neutral state.
pub fn supported(flags: usize, child_stack: usize, child_active: bool) bool {
    return !child_active and child_stack == 0 and flags & 0xff == sigchld and flags & ~@as(usize, 0xff) == 0;
}

test "accepts only observed SIGCHLD null-stack non-nested request" {
    try std.testing.expect(supported(sigchld, 0, false));
    try std.testing.expect(!supported(sigchld, 0, true));
    try std.testing.expect(!supported(0, 0, false));
    try std.testing.expect(!supported(9, 0, false));
    try std.testing.expect(!supported(sigchld, 0x1000, false));
    try std.testing.expect(!supported(sigchld | 0x100, 0, false));
}
