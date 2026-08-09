const std = @import("std");
const FixedVector = @import("fixed-capacity-vector").FixedVector;
const CheckedRange = @import("checked-half-open-range").CheckedRange;
const addresses = @import("distinct-memory-address-types");

pub const GuestVirtualAddress = addresses.GuestVirtualAddress;
pub const PhysicalAddress = addresses.PhysicalAddress;
pub const page_size: usize = 4096;

pub const Access = enum { read_from_user, write_to_user };

pub const PageResolution = struct {
    physical_page_start: PhysicalAddress,
    user: bool,
    readable: bool,
    writable: bool,
};

pub const PageQuery = struct {
    context: *const anyopaque,
    queryFn: *const fn (*const anyopaque, GuestVirtualAddress) ?PageResolution,

    pub fn query(self: PageQuery, page_start: GuestVirtualAddress) ?PageResolution {
        return self.queryFn(self.context, page_start);
    }
};

pub const Segment = struct {
    physical_start: PhysicalAddress,
    virtual_start: GuestVirtualAddress,
    request_offset: usize,
    byte_count: usize,
};

pub const Error = error{
    AddressOverflow,
    CapacityExceeded,
    Unmapped,
    SupervisorOnly,
    NotReadable,
    NotWritable,
    UnalignedPhysicalPage,
};

/// Builds an allocation-free, failure-atomic transfer plan. A zero-length range
/// succeeds with an empty plan and does not query the provider.
pub fn TransferPlan(comptime capacity: usize) type {
    return struct {
        const Self = @This();
        segments: FixedVector(Segment, capacity) = .{},

        pub fn items(self: *const Self) []const Segment {
            return self.segments.constItems();
        }

        pub fn plan(start: GuestVirtualAddress, length: usize, access: Access, resolver: PageQuery) Error!Self {
            const range = CheckedRange.fromStartAndLength(start.raw(), length) catch return error.AddressOverflow;
            var result = Self{};
            if (range.isEmpty()) return result;

            const first_page = range.start - (range.start % page_size);
            const last_byte = range.end - 1;
            const last_page = last_byte - (last_byte % page_size);
            const page_span = std.math.sub(usize, last_page, first_page) catch unreachable;
            const touched_pages = page_span / page_size + 1;
            if (touched_pages > capacity) return error.CapacityExceeded;

            var cursor = range.start;
            while (cursor < range.end) {
                const virtual_page = cursor - (cursor % page_size);
                const page = resolver.query(GuestVirtualAddress.init(virtual_page)) orelse return error.Unmapped;
                if (!page.user) return error.SupervisorOnly;
                if (access == .read_from_user and !page.readable) return error.NotReadable;
                if (access == .write_to_user and !page.writable) return error.NotWritable;
                if (page.physical_page_start.raw() % page_size != 0) return error.UnalignedPhysicalPage;

                const page_offset = cursor - virtual_page;
                const remaining_in_page = page_size - page_offset;
                const fragment_length = @min(range.end - cursor, remaining_in_page);
                const physical_start = page.physical_page_start.add(page_offset) catch return error.AddressOverflow;
                result.segments.append(.{
                    .physical_start = physical_start,
                    .virtual_start = GuestVirtualAddress.init(cursor),
                    .request_offset = cursor - range.start,
                    .byte_count = fragment_length,
                }) catch unreachable;
                cursor += fragment_length;
            }
            return result;
        }
    };
}

const Mapping = struct { virtual_page: usize, physical_page: usize, user: bool = true, readable: bool = true, writable: bool = true };
const TestResolver = struct {
    mappings: []const Mapping,
    queries: *usize,
    fn query(raw: *const anyopaque, address: GuestVirtualAddress) ?PageResolution {
        const self: *const TestResolver = @ptrCast(@alignCast(raw));
        self.queries.* += 1;
        for (self.mappings) |mapping| if (mapping.virtual_page == address.raw()) return .{
            .physical_page_start = PhysicalAddress.init(mapping.physical_page),
            .user = mapping.user,
            .readable = mapping.readable,
            .writable = mapping.writable,
        };
        return null;
    }
    fn provider(self: *const TestResolver) PageQuery {
        return .{ .context = self, .queryFn = query };
    }
};

fn testResolver(mappings: []const Mapping, queries: *usize) TestResolver {
    return .{ .mappings = mappings, .queries = queries };
}

test "same-page read preserves offsets" {
    var queries: usize = 0;
    const r = testResolver(&.{.{ .virtual_page = 0x1000, .physical_page = 0x9000 }}, &queries);
    const result = try TransferPlan(1).plan(GuestVirtualAddress.init(0x1123), 20, .read_from_user, r.provider());
    try std.testing.expectEqual(@as(usize, 1), result.items().len);
    try std.testing.expectEqualDeep(Segment{ .physical_start = PhysicalAddress.init(0x9123), .virtual_start = GuestVirtualAddress.init(0x1123), .request_offset = 0, .byte_count = 20 }, result.items()[0]);
}
test "same-page write requires writable" {
    var queries: usize = 0;
    const r = testResolver(&.{.{ .virtual_page = 0x2000, .physical_page = 0xa000, .readable = false }}, &queries);
    const result = try TransferPlan(1).plan(GuestVirtualAddress.init(0x2008), 8, .write_to_user, r.provider());
    try std.testing.expectEqual(@as(usize, 8), result.items()[0].byte_count);
}
test "page crossing preserves exact fragments and non-contiguous physical backing" {
    var queries: usize = 0;
    const r = testResolver(&.{ .{ .virtual_page = 0x3000, .physical_page = 0xb000 }, .{ .virtual_page = 0x4000, .physical_page = 0xf000 } }, &queries);
    const result = try TransferPlan(2).plan(GuestVirtualAddress.init(0x3ff8), 24, .read_from_user, r.provider());
    try std.testing.expectEqual(@as(usize, 2), result.items().len);
    try std.testing.expectEqualDeep(Segment{ .physical_start = PhysicalAddress.init(0xbff8), .virtual_start = GuestVirtualAddress.init(0x3ff8), .request_offset = 0, .byte_count = 8 }, result.items()[0]);
    try std.testing.expectEqualDeep(Segment{ .physical_start = PhysicalAddress.init(0xf000), .virtual_start = GuestVirtualAddress.init(0x4000), .request_offset = 8, .byte_count = 16 }, result.items()[1]);
}
test "virtual range overflow is rejected before query" {
    var queries: usize = 0;
    const r = testResolver(&.{}, &queries);
    try std.testing.expectError(error.AddressOverflow, TransferPlan(1).plan(GuestVirtualAddress.init(std.math.maxInt(usize)), 2, .read_from_user, r.provider()));
    try std.testing.expectEqual(@as(usize, 0), queries);
}
test "unmapped and permission failures are deterministic" {
    var queries: usize = 0;
    var r = testResolver(&.{}, &queries);
    try std.testing.expectError(error.Unmapped, TransferPlan(1).plan(GuestVirtualAddress.init(0), 1, .read_from_user, r.provider()));
    r = testResolver(&.{.{ .virtual_page = 0, .physical_page = 0, .user = false }}, &queries);
    try std.testing.expectError(error.SupervisorOnly, TransferPlan(1).plan(GuestVirtualAddress.init(0), 1, .read_from_user, r.provider()));
    r = testResolver(&.{.{ .virtual_page = 0, .physical_page = 0, .readable = false }}, &queries);
    try std.testing.expectError(error.NotReadable, TransferPlan(1).plan(GuestVirtualAddress.init(0), 1, .read_from_user, r.provider()));
    r = testResolver(&.{.{ .virtual_page = 0, .physical_page = 0, .writable = false }}, &queries);
    try std.testing.expectError(error.NotWritable, TransferPlan(1).plan(GuestVirtualAddress.init(0), 1, .write_to_user, r.provider()));
}
test "zero length succeeds without resolving" {
    var queries: usize = 0;
    const r = testResolver(&.{}, &queries);
    const result = try TransferPlan(0).plan(GuestVirtualAddress.init(std.math.maxInt(usize)), 0, .read_from_user, r.provider());
    try std.testing.expectEqual(@as(usize, 0), result.items().len);
    try std.testing.expectEqual(@as(usize, 0), queries);
}
test "capacity exhaustion is rejected before resolving" {
    var queries: usize = 0;
    const r = testResolver(&.{}, &queries);
    try std.testing.expectError(error.CapacityExceeded, TransferPlan(1).plan(GuestVirtualAddress.init(0xfff), 2, .read_from_user, r.provider()));
    try std.testing.expectEqual(@as(usize, 0), queries);
}
test "later invalid page returns no partial plan value" {
    var queries: usize = 0;
    const r = testResolver(&.{.{ .virtual_page = 0x1000, .physical_page = 0x8000 }}, &queries);
    try std.testing.expectError(error.Unmapped, TransferPlan(2).plan(GuestVirtualAddress.init(0x1fff), 2, .read_from_user, r.provider()));
    try std.testing.expectEqual(@as(usize, 2), queries);
}
