const std = @import("std");
pub const Plan = union(enum) { global: void, address: u64, asid: u16, address_asid: struct { address: u64, asid: u16 } };
pub fn global() Plan {
    return .{ .global = {} };
}
pub fn forAddress(address: u64) Plan {
    return .{ .address = address };
}
pub fn forAsid(asid: u16) Plan {
    return .{ .asid = asid };
}
pub fn forAddressAsid(address: u64, asid: u16) Plan {
    return .{ .address_asid = .{ .address = address, .asid = asid } };
}
/// Privileged RISC-V execution boundary. Caller supplies hart synchronization and architectural pre/post ordering.
pub fn executeUnsafe(plan: Plan) void {
    if (comptime @import("builtin").cpu.arch == .riscv64) {
        switch (plan) {
            .global => asm volatile ("sfence.vma zero, zero" ::: "memory"),
            .address => |a| asm volatile ("sfence.vma %[a], zero"
                :
                : [a] "r" (a),
                : "memory"
            ),
            .asid => |id| asm volatile ("sfence.vma zero, %[id]"
                :
                : [id] "r" (@as(usize, id)),
                : "memory"
            ),
            .address_asid => |x| asm volatile ("sfence.vma %[a], %[id]"
                :
                : [a] "r" (x.address),
                  [id] "r" (@as(usize, x.asid)),
                : "memory"
            ),
        }
    } else @panic("SFENCE.VMA requires riscv64 privileged execution");
}

test "plans all scopes without privileged execution" {
    try std.testing.expect(global() == .global);
    try std.testing.expectEqual(@as(u64, 0x1000), forAddress(0x1000).address);
    try std.testing.expectEqual(@as(u16, 7), forAsid(7).asid);
    try std.testing.expectEqual(@as(u16, 9), forAddressAsid(0, 9).address_asid.asid);
}
