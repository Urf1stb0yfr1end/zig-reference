const handles = @import("generational-handles");

/// Operations are substrate capabilities, not Linux access-mode bits.
pub const Capabilities = packed struct { read: bool = false, write: bool = false };
pub const BackendId = enum(u32) { _ };

pub fn ResourceTable(comptime capacity: usize) type {
    return struct {
        const Self = @This();
        const Entry = struct { backend: BackendId, capabilities: Capabilities, references: usize = 1 };
        const Storage = handles.HandleTable(Entry, capacity);
        pub const ResourceRef = Storage.Handle;
        pub const Description = struct { backend: BackendId, capabilities: Capabilities };
        pub const Error = error{ Full, InvalidReference, ReferenceOverflow };

        storage: Storage = .{},

        pub fn create(self: *Self, description: Description) Error!ResourceRef {
            return self.storage.insert(.{ .backend = description.backend, .capabilities = description.capabilities }) catch error.Full;
        }
        pub fn retain(self: *Self, reference: ResourceRef) Error!void {
            const entry = self.storage.get(reference) orelse return error.InvalidReference;
            if (entry.references == std.math.maxInt(usize)) return error.ReferenceOverflow;
            entry.references += 1;
        }
        pub fn release(self: *Self, reference: ResourceRef) Error!bool {
            const entry = self.storage.get(reference) orelse return error.InvalidReference;
            if (entry.references > 1) {
                entry.references -= 1;
                return false;
            }
            _ = self.storage.remove(reference).?;
            return true;
        }
        pub fn resolve(self: *const Self, reference: ResourceRef) ?Description {
            const entry = self.storage.getConst(reference) orelse return null;
            return .{ .backend = entry.backend, .capabilities = entry.capabilities };
        }
        pub fn referenceCount(self: *const Self, reference: ResourceRef) ?usize {
            return if (self.storage.getConst(reference)) |entry| entry.references else null;
        }
        pub fn count(self: *const Self) usize {
            return self.storage.count();
        }
    };
}

/// Bounded process-local bindings. Slot numbers have no OS meaning here.
pub fn BindingTable(comptime ResourceRef: type, comptime capacity: usize) type {
    return struct {
        const Self = @This();
        pub const Error = error{ Full, Occupied, InvalidBinding };
        slots: [capacity]?ResourceRef = [_]?ResourceRef{null} ** capacity,

        pub fn bindAt(self: *Self, slot: usize, reference: ResourceRef) Error!void {
            if (slot >= capacity) return error.InvalidBinding;
            if (self.slots[slot] != null) return error.Occupied;
            self.slots[slot] = reference;
        }
        pub fn resolve(self: *const Self, slot: usize) ?ResourceRef {
            if (slot >= capacity) return null;
            return self.slots[slot];
        }
        pub fn duplicateLowest(self: *Self, source: usize) Error!usize {
            const reference = self.resolve(source) orelse return error.InvalidBinding;
            for (&self.slots, 0..) |*slot, index| if (slot.* == null) {
                slot.* = reference;
                return index;
            };
            return error.Full;
        }
        pub fn unbind(self: *Self, slot: usize) Error!ResourceRef {
            const reference = self.resolve(slot) orelse return error.InvalidBinding;
            self.slots[slot] = null;
            return reference;
        }
    };
}

const std = @import("std");
test "aliases share an underlying resource and stale references fail" {
    var resources = ResourceTable(2){};
    const input = try resources.create(.{ .backend = @enumFromInt(7), .capabilities = .{ .read = true } });
    var bindings = BindingTable(@TypeOf(input), 4){};
    try bindings.bindAt(0, input);
    const alias = try bindings.duplicateLowest(0);
    try resources.retain(input);
    try std.testing.expectEqual(@as(usize, 1), alias);
    try std.testing.expect(!(try resources.release(try bindings.unbind(0))));
    try std.testing.expect(resources.resolve(bindings.resolve(alias).?) != null);
    try std.testing.expect(try resources.release(try bindings.unbind(alias)));
    try std.testing.expect(resources.resolve(input) == null);
    try std.testing.expectError(error.InvalidReference, resources.retain(input));
}

test "bounds and failed mutations are explicit" {
    var resources = ResourceTable(1){};
    const one = try resources.create(.{ .backend = @enumFromInt(1), .capabilities = .{ .write = true } });
    try std.testing.expectError(error.Full, resources.create(.{ .backend = @enumFromInt(2), .capabilities = .{} }));
    var bindings = BindingTable(@TypeOf(one), 1){};
    try bindings.bindAt(0, one);
    try std.testing.expectError(error.Full, bindings.duplicateLowest(0));
    try std.testing.expectError(error.InvalidBinding, bindings.unbind(1));
    try std.testing.expect(bindings.resolve(0) != null);
}
