const op = @import("morphic-semantic-operation");
test "public import" {
    try @import("std").testing.expectEqual(@as(u8, 3), (op.Request{ .terminate = 3 }).terminate);
}
