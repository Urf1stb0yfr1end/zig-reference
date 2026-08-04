const std = @import("std");

/// A fixed-size set of bits.
///
/// Owns:
/// - its inline word storage
///
/// Borrows:
/// - nothing
///
/// Invariants:
/// - only indices in 0..bit_count are observable
/// - unused high bits in the final storage word remain zero
///
/// Invalidation:
/// - no operation moves the value's storage
pub fn BitSet(comptime bit_count: usize) type {
    const bits_per_word = @bitSizeOf(u64);
    const word_count = (bit_count + bits_per_word - 1) / bits_per_word;

    return struct {
        const Self = @This();

        pub const Error = error{IndexOutOfBounds};

        words: [word_count]u64 = [_]u64{0} ** word_count,

        pub fn capacity(_: Self) usize {
            return bit_count;
        }

        pub fn isSet(self: Self, index: usize) Error!bool {
            if (comptime word_count == 0) return error.IndexOutOfBounds;
            const location = try locate(index);
            return (self.words[location.word] & location.mask) != 0;
        }

        pub fn set(self: *Self, index: usize) Error!void {
            if (comptime word_count == 0) return error.IndexOutOfBounds;
            const location = try locate(index);
            self.words[location.word] |= location.mask;
        }

        pub fn clear(self: *Self, index: usize) Error!void {
            if (comptime word_count == 0) return error.IndexOutOfBounds;
            const location = try locate(index);
            self.words[location.word] &= ~location.mask;
        }

        pub fn toggle(self: *Self, index: usize) Error!void {
            if (comptime word_count == 0) return error.IndexOutOfBounds;
            const location = try locate(index);
            self.words[location.word] ^= location.mask;
        }

        pub fn clearAll(self: *Self) void {
            @memset(self.words[0..], 0);
        }

        pub fn setAll(self: *Self) void {
            @memset(self.words[0..], ~@as(u64, 0));
            self.maskUnusedBits();
        }

        pub fn countSet(self: Self) usize {
            var total: usize = 0;
            for (self.words) |word| {
                total += @popCount(word);
            }
            return total;
        }

        pub fn none(self: Self) bool {
            return self.countSet() == 0;
        }

        pub fn all(self: Self) bool {
            return self.countSet() == bit_count;
        }

        fn locate(index: usize) Error!struct { word: usize, mask: u64 } {
            if (index >= bit_count) return error.IndexOutOfBounds;

            const word = index / bits_per_word;
            const shift: u6 = @intCast(index % bits_per_word);
            return .{
                .word = word,
                .mask = @as(u64, 1) << shift,
            };
        }

        fn maskUnusedBits(self: *Self) void {
            if (comptime word_count == 0) return;

            const used_in_last = bit_count % bits_per_word;
            if (used_in_last == 0) return;

            const shift: u6 = @intCast(used_in_last);
            const valid_mask = (@as(u64, 1) << shift) - 1;
            self.words[word_count - 1] &= valid_mask;
        }
    };
}

test "set, clear, toggle, and inspect bits" {
    var bits = BitSet(130){};

    try bits.set(0);
    try bits.set(64);
    try bits.set(129);

    try std.testing.expect(try bits.isSet(0));
    try std.testing.expect(try bits.isSet(64));
    try std.testing.expect(try bits.isSet(129));
    try std.testing.expectEqual(@as(usize, 3), bits.countSet());

    try bits.toggle(64);
    try std.testing.expect(!(try bits.isSet(64)));

    try bits.clear(129);
    try std.testing.expectEqual(@as(usize, 1), bits.countSet());
}

test "setAll masks storage outside the declared capacity" {
    var bits = BitSet(70){};
    bits.setAll();

    try std.testing.expect(bits.all());
    try std.testing.expectEqual(@as(usize, 70), bits.countSet());
    try std.testing.expectEqual(@as(u64, 0b11_1111), bits.words[1]);
}

test "out-of-range operations fail without mutation" {
    var bits = BitSet(8){};
    try bits.set(3);
    const before = bits;

    try std.testing.expectError(error.IndexOutOfBounds, bits.set(8));
    try std.testing.expectEqualDeep(before, bits);
}

test "zero-capacity bit set is valid" {
    var bits = BitSet(0){};

    try std.testing.expect(bits.none());
    try std.testing.expect(bits.all());
    bits.setAll();
    bits.clearAll();
    try std.testing.expectError(error.IndexOutOfBounds, bits.set(0));
}
