//! Linux- and architecture-independent bounded operation vocabulary.
/// Complete generation-bearing resource identity. `slot` is deliberately not
/// a Linux descriptor and `generation` prevents identity from collapsing when
/// bounded resource storage reuses a slot.
pub const ResourceId = struct { slot: usize, generation: u32 };
pub const GuestAddress = enum(u64) { _ };
pub const WriteBytes = struct { destination: ResourceId, source: GuestAddress, byte_count: usize };
pub const ReadBytes = struct { source: ResourceId, destination: GuestAddress, byte_count: usize };
pub const Request = union(enum) { read_bytes: ReadBytes, write_bytes: WriteBytes, terminate: u8 };
pub const Failure = enum { invalid_resource, operation_not_supported, invalid_user_memory };
pub const Completion = union(enum) { success: usize, failure: Failure, terminated: u8 };
pub fn execute(request: Request, backend: anytype) Completion {
    return switch (request) {
        .read_bytes => |op| backend.readBytes(op),
        .write_bytes => |op| backend.writeBytes(op),
        .terminate => |status| backend.terminate(status),
    };
}
test "ABI-neutral write and termination dispatch" {
    const B = struct {
        fn readBytes(_: @This(), op: ReadBytes) Completion {
            return .{ .success = op.byte_count };
        }
        fn writeBytes(_: @This(), op: WriteBytes) Completion {
            return if (op.destination.slot == 7 and op.destination.generation == 3) .{ .success = op.byte_count } else .{ .failure = .invalid_resource };
        }
        fn terminate(_: @This(), status: u8) Completion {
            return .{ .terminated = status };
        }
    };
    try @import("std").testing.expectEqual(@as(usize, 13), execute(.{ .write_bytes = .{ .destination = .{ .slot = 7, .generation = 3 }, .source = @enumFromInt(0x1000), .byte_count = 13 } }, B{}).success);
    try @import("std").testing.expectEqual(@as(usize, 5), execute(.{ .read_bytes = .{ .source = .{ .slot = 7, .generation = 3 }, .destination = @enumFromInt(0x2000), .byte_count = 5 } }, B{}).success);
    try @import("std").testing.expectEqual(@as(u8, 42), execute(.{ .terminate = 42 }, B{}).terminated);
}
test "semantic failures do not encode errno" {
    const B = struct {
        fn readBytes(_: @This(), _: ReadBytes) Completion {
            return .{ .failure = .invalid_user_memory };
        }
        fn writeBytes(_: @This(), _: WriteBytes) Completion {
            return .{ .failure = .invalid_user_memory };
        }
        fn terminate(_: @This(), status: u8) Completion {
            return .{ .terminated = status };
        }
    };
    try @import("std").testing.expectEqual(Failure.invalid_user_memory, execute(.{ .write_bytes = .{ .destination = .{ .slot = 1, .generation = 9 }, .source = @enumFromInt(0), .byte_count = 1 } }, B{}).failure);
}
