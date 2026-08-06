const std = @import("std");
const bounded = @import("bounded-byte-reader");
const cast = @import("checked-integer-cast");
const enums = @import("validated-enum-decoder");
const ranges = @import("checked-half-open-range");
const codec = @import("endian-integer-codec");
const checkpoints = @import("binary-cursor-checkpoint");

pub const ElfEndian = enum(u8) { little = 1, big = 2 };
pub const ElfType = union(enum) {
    known: Known,
    unknown: u16,
    pub const Known = enum(u16) { relocatable = 1, executable = 2, shared = 3, core = 4 };
};
pub const Elf64FileHeader = struct {
    endian: ElfEndian,
    os_abi: u8,
    abi_version: u8,
    object_type: ElfType,
    machine: u16,
    entry: u64,
    program_offset: u64,
    section_offset: u64,
    flags: u32,
    header_size: u16,
    program_entry_size: u16,
    program_count: u16,
    section_entry_size: u16,
    section_count: u16,
    section_names_index: u16,
    pub fn programTableRange(self: @This(), file_length: usize) error{ OutOfRange, TableOutOfBounds }!ranges.CheckedRange {
        return tableRange(self.program_offset, self.program_entry_size, self.program_count, file_length);
    }
    pub fn sectionTableRange(self: @This(), file_length: usize) error{ OutOfRange, TableOutOfBounds }!ranges.CheckedRange {
        return tableRange(self.section_offset, self.section_entry_size, self.section_count, file_length);
    }
};
pub const ParseError = error{ UnexpectedEnd, BadMagic, UnsupportedClass, UnsupportedEndian, BadVersion, InvalidHeaderSize, OutOfRange, TableOutOfBounds };
fn read(comptime T: type, r: *bounded.BoundedReader, e: ElfEndian) error{UnexpectedEnd}!T {
    const b = r.readBytes(@sizeOf(T)) catch return error.UnexpectedEnd;
    var a: [@sizeOf(T)]u8 = undefined;
    @memcpy(&a, b);
    return switch (e) {
        .little => codec.EndianIntegerCodec(T, .little).decode(&a),
        .big => codec.EndianIntegerCodec(T, .big).decode(&a),
    };
}
fn tableRange(offset: u64, size: u16, count: u16, file_length: usize) error{ OutOfRange, TableOutOfBounds }!ranges.CheckedRange {
    const start = cast.checkedIntegerCast(usize, offset) catch return error.OutOfRange;
    const bytes = std.math.mul(usize, @as(usize, size), @as(usize, count)) catch return error.OutOfRange;
    const range = ranges.CheckedRange.fromStartAndLength(start, bytes) catch return error.OutOfRange;
    if (range.end > file_length) return error.TableOutOfBounds;
    return range;
}
pub fn parse(reader: *bounded.BoundedReader) ParseError!Elf64FileHeader {
    const mark = checkpoints.capture(reader.*);
    errdefer mark.restore(reader) catch unreachable;
    const ident = reader.readBytes(16) catch return error.UnexpectedEnd;
    if (!std.mem.eql(u8, ident[0..4], &.{ 0x7f, 'E', 'L', 'F' })) return error.BadMagic;
    if (ident[4] != 2) return error.UnsupportedClass;
    const endian: ElfEndian = switch (ident[5]) {
        1 => .little,
        2 => .big,
        else => return error.UnsupportedEndian,
    };
    if (ident[6] != 1) return error.BadVersion;
    const raw_type = try read(u16, reader, endian);
    const object_type: ElfType = if (enums.decodeEnum(ElfType.Known, raw_type)) |known| .{ .known = known } else |_| .{ .unknown = raw_type };
    const machine = try read(u16, reader, endian);
    if (try read(u32, reader, endian) != 1) return error.BadVersion;
    const h = Elf64FileHeader{ .endian = endian, .os_abi = ident[7], .abi_version = ident[8], .object_type = object_type, .machine = machine, .entry = try read(u64, reader, endian), .program_offset = try read(u64, reader, endian), .section_offset = try read(u64, reader, endian), .flags = try read(u32, reader, endian), .header_size = try read(u16, reader, endian), .program_entry_size = try read(u16, reader, endian), .program_count = try read(u16, reader, endian), .section_entry_size = try read(u16, reader, endian), .section_count = try read(u16, reader, endian), .section_names_index = try read(u16, reader, endian) };
    if (h.header_size != 64) return error.InvalidHeaderSize;
    return h;
}
test "parses little-endian header and validates table" {
    var bytes = [_]u8{0} ** 64;
    bytes[0] = 0x7f;
    bytes[1] = 'E';
    bytes[2] = 'L';
    bytes[3] = 'F';
    bytes[4] = 2;
    bytes[5] = 1;
    bytes[6] = 1;
    bytes[16] = 2;
    bytes[18] = 0x3e;
    bytes[20] = 1;
    bytes[52] = 64;
    bytes[54] = 56;
    var r = bounded.BoundedReader.init(&bytes);
    const h = try parse(&r);
    try std.testing.expectEqual(@as(u16, 0x3e), h.machine);
}
test "bad identity rolls back" {
    var bytes = [_]u8{0} ** 64;
    var r = bounded.BoundedReader.init(&bytes);
    try std.testing.expectError(error.BadMagic, parse(&r));
    try std.testing.expectEqual(@as(usize, 0), r.position());
}
