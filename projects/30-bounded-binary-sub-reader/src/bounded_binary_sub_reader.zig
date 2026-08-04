const std = @import("std");
const bounded = @import("bounded-byte-reader");
const checkpoints = @import("binary-cursor-checkpoint");

pub const AdvancementPolicy = enum { immediate, on_commit };
pub const BoundedBinarySubReader = struct {
    parent: *bounded.BoundedReader,
    child: bounded.BoundedReader,
    checkpoint: checkpoints.BinaryCursorCheckpoint,
    length: usize,
    policy: AdvancementPolicy,
    committed: bool,

    pub fn create(parent_reader: *bounded.BoundedReader, sub_length: usize, advancement_policy: AdvancementPolicy) bounded.BoundedReader.Error!BoundedBinarySubReader {
        const mark = checkpoints.capture(parent_reader.*);
        const child_reader = try parent_reader.subReader(sub_length);
        if (advancement_policy == .on_commit) mark.restore(parent_reader) catch unreachable;
        return .{ .parent = parent_reader, .child = child_reader, .checkpoint = mark, .length = sub_length, .policy = advancement_policy, .committed = advancement_policy == .immediate };
    }
    pub fn reader(self: *BoundedBinarySubReader) *bounded.BoundedReader {
        return &self.child;
    }
    pub fn unread(self: *const BoundedBinarySubReader) usize {
        return self.child.remaining();
    }
    pub fn commit(self: *BoundedBinarySubReader) bounded.BoundedReader.Error!void {
        if (self.committed) return;
        try self.parent.skip(self.length);
        self.committed = true;
    }
    pub fn rollback(self: *BoundedBinarySubReader) void {
        if (self.policy == .immediate and self.committed) self.checkpoint.restore(self.parent) catch unreachable;
        self.committed = false;
    }
};

test "policies confine child and control parent" {
    var p = bounded.BoundedReader.init("abcd");
    var s = try BoundedBinarySubReader.create(&p, 2, .on_commit);
    try std.testing.expectEqual(@as(usize, 0), p.position());
    _ = try s.reader().readBytes(2);
    try std.testing.expectError(error.UnexpectedEnd, s.reader().readByte());
    try s.commit();
    try std.testing.expectEqual(@as(usize, 2), p.position());
}
test "failed and zero creation are atomic" {
    var p = bounded.BoundedReader.init("x");
    try std.testing.expectError(error.UnexpectedEnd, BoundedBinarySubReader.create(&p, 2, .immediate));
    try std.testing.expectEqual(@as(usize, 0), p.position());
    const z = try BoundedBinarySubReader.create(&p, 0, .immediate);
    try std.testing.expectEqual(@as(usize, 0), z.unread());
}
