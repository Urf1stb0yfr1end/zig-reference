const std = @import("std");
const bits = @import("bit-set");
const bitmap = @import("bitmap-allocator");
const ranges = @import("checked-half-open-range");
const addresses = @import("distinct-memory-address-types");
const frames = @import("physical-page-frame-number-and-address-conversion");
const region_sets = @import("physical-memory-region-set");

pub fn PhysicalPageFrameAllocator(comptime max_frames: usize) type {
    _ = bits.BitSet(max_frames);
    _ = ranges.CheckedRange;
    return struct {
        allocator: bitmap.BitmapAllocator(max_frames) = .{},
        base: usize = 0,
        frame_count: usize = 0,
        pub const Error = error{ NoUsableRegion, UnalignedRegion, TooManyFrames, Exhausted, ForeignFrame, DoubleFree };
        pub fn initFromRegions(comptime region_capacity: usize, set: *const region_sets.PhysicalMemoryRegionSet(region_capacity)) Error!@This() {
            var self = @This(){};
            var found = false;
            for (set.items()) |r| {
                if (r.kind != .usable) continue;
                if ((r.start.raw() & (frames.PageSize - 1)) != 0 or (r.length() & (frames.PageSize - 1)) != 0) return error.UnalignedRegion;
                const count = r.length() / frames.PageSize;
                if (count > max_frames) return error.TooManyFrames;
                self.base = (frames.PhysicalPageFrameNumber.fromAddress(r.start) catch return error.UnalignedRegion).value;
                self.frame_count = count;
                found = true;
                break;
            }
            if (!found) return error.NoUsableRegion;
            for (0..max_frames) |_| {
                _ = self.allocator.allocate() catch unreachable;
            }
            var i = self.frame_count;
            while (i > 0) {
                i -= 1;
                self.allocator.free(i) catch unreachable;
            }
            return self;
        }
        pub fn allocate(self: *@This()) Error!frames.PhysicalPageFrameNumber {
            const index = self.allocator.allocate() catch return error.Exhausted;
            return frames.PhysicalPageFrameNumber.init(self.base + index);
        }
        pub fn release(self: *@This(), frame: frames.PhysicalPageFrameNumber) Error!void {
            if (frame.value < self.base or frame.value - self.base >= self.frame_count) return error.ForeignFrame;
            self.allocator.free(frame.value - self.base) catch |e| switch (e) {
                error.DoubleFree => return error.DoubleFree,
                error.IndexOutOfBounds => return error.ForeignFrame,
                error.Full => unreachable,
            };
        }
        pub fn freeCount(self: *const @This()) usize {
            return self.frame_count - self.allocatedCount();
        }
        pub fn allocatedCount(self: *const @This()) usize {
            return self.allocator.allocatedCount() - (max_frames - self.frame_count);
        }
    };
}
test "allocates deterministically and rejects release errors" {
    var set = region_sets.PhysicalMemoryRegionSet(2){};
    try set.add(addresses.PhysicalAddress.init(0x2000), frames.PageSize * 2, .usable);
    var a = try PhysicalPageFrameAllocator(4).initFromRegions(2, &set);
    const f = try a.allocate();
    try std.testing.expectEqual(@as(usize, 2), f.value);
    try a.release(f);
    try std.testing.expectError(error.DoubleFree, a.release(f));
    try std.testing.expectError(error.ForeignFrame, a.release(frames.PhysicalPageFrameNumber.init(99)));
}
test "exhaustion and counts" {
    var set = region_sets.PhysicalMemoryRegionSet(1){};
    try set.add(addresses.PhysicalAddress.init(0), frames.PageSize, .usable);
    var a = try PhysicalPageFrameAllocator(1).initFromRegions(1, &set);
    _ = try a.allocate();
    try std.testing.expectEqual(@as(usize, 0), a.freeCount());
    try std.testing.expectError(error.Exhausted, a.allocate());
}
