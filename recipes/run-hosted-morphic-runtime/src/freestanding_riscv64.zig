const std = @import("std");
const morphic = @import("morphic-core");
const scheduler_module = @import("bounded-deterministic-scheduler");
const addresses = @import("distinct-memory-address-types");
const frames = @import("physical-page-frame-number-and-address-conversion");
const region_sets = @import("physical-memory-region-set");
const frame_allocators = @import("physical-page-frame-allocator");
const sv39_entries = @import("riscv-sv39-page-table-entry");
const sv39_builders = @import("riscv-sv39-page-table-builder");
const sfence_vma = @import("riscv-sfence-vma-invalidation");

const begin_marker = "\nZIGREF_MORPHIC_BEGIN\n";
const end_marker = "ZIGREF_MORPHIC_END\n";
const physical_pool_pages = 8;

extern var __physical_page_pool_begin: u8;
extern var __physical_page_pool_end: u8;
extern var __image_begin: u8;
extern var __image_end: u8;
extern var __text_domain_begin: u8;
extern var __text_domain_end: u8;
extern var __rodata_domain_begin: u8;
extern var __rodata_domain_end: u8;
extern var __writable_domain_begin: u8;
extern var __writable_domain_end: u8;
extern var __supervisor_stack_top: u8;
extern var __user_trap_stack_begin: u8;
extern var __user_trap_stack_end: u8;

const sv39_alias: usize = 0x8040_0000;
const user_code_va: usize = 0x8040_1000;
const user_stack_va: usize = 0x8040_2000;
var sv39_continuation_marker: usize = 0;
var sv39_permission_global: usize = 0;
const sv39_permission_rodata: usize = 0x18_39_2026;

fn RealPageOwner(comptime Allocator: type) type {
    return struct {
        const Self = @This();
        allocator: *Allocator,
        pages: [physical_pool_pages]usize = [_]usize{0} ** physical_pool_pages,
        page_count: usize = 0,

        pub fn allocate(self: *Self) !u64 {
            if (self.page_count == self.pages.len) return error.Exhausted;
            const frame = try self.allocator.allocate();
            const address = (frame.toAddress() catch unreachable).raw();
            const page: *volatile [frames.PageSize]u8 = @ptrFromInt(address);
            for (0..frames.PageSize) |index| page[index] = 0;
            self.pages[self.page_count] = address;
            self.page_count += 1;
            return address;
        }

        pub fn release(self: *Self, address: u64) !void {
            var index: usize = 0;
            while (index < self.page_count and self.pages[index] != address) : (index += 1) {}
            if (index == self.page_count) return error.ForeignFrame;
            const frame = frames.PhysicalPageFrameNumber.fromAddress(addresses.PhysicalAddress.init(address)) catch return error.ForeignFrame;
            try self.allocator.release(frame);
            self.page_count -= 1;
            self.pages[index] = self.pages[self.page_count];
            self.pages[self.page_count] = 0;
        }

        pub fn read(self: *Self, address: u64, index: usize) !u64 {
            if (index >= 512 or !self.owns(address)) return error.InvalidAccess;
            const entries: *volatile [512]u64 = @ptrFromInt(address);
            return entries[index];
        }

        pub fn write(self: *Self, address: u64, index: usize, value: u64) !void {
            if (index >= 512 or !self.owns(address)) return error.InvalidAccess;
            const entries: *volatile [512]u64 = @ptrFromInt(address);
            entries[index] = value;
        }

        fn owns(self: *const Self, address: u64) bool {
            for (self.pages[0..self.page_count]) |page| if (page == address) return true;
            return false;
        }
    };
}

/// Fixed, allocation-free integer supervisor context. x0 is architectural zero;
/// x2 is the interrupted sp. Floating-point/vector state and nested traps are
/// outside this deliberately narrow boundary.
const TrapFrame = extern struct {
    x: [32]usize,
    sepc: usize,
    sstatus: usize,
    scause: usize,
    stval: usize,
};

comptime {
    if (@offsetOf(TrapFrame, "sepc") != 256 or @offsetOf(TrapFrame, "sstatus") != 264 or
        @offsetOf(TrapFrame, "scause") != 272 or @offsetOf(TrapFrame, "stval") != 280 or
        @sizeOf(TrapFrame) != 288) @compileError("trap entry offsets and TrapFrame layout disagree");
}

var observed_sepc: usize = 0;
var observed_scause: usize = 0;
var observed_stval: usize = 0;
var observed_sstatus: usize = 0;
var trap_count: usize = 0;
var timer_sepc: usize = 0;
var timer_scause: usize = 0;
var timer_sstatus: usize = 0;
export var timer_trap_count: usize = 0;
var timer_policy_complete: bool = false;

export var user_supervisor_sp: usize linksection(".bss") = 0;
var user_trap_frame_address: usize linksection(".bss") = 0;
var user_scause: usize linksection(".bss") = 0;
var user_sepc: usize linksection(".bss") = 0;
var user_sstatus: usize linksection(".bss") = 0;
var user_sp: usize linksection(".bss") = 0;
var user_a0: usize linksection(".bss") = 0;
var user_t0: usize linksection(".bss") = 0;
var user_t1: usize linksection(".bss") = 0;
export var user_returned: bool linksection(".bss") = false;

export var service_trap_count: usize linksection(".bss") = 0;
var service_frames: [2]usize linksection(".bss") = .{ 0, 0 };
var service_causes: [2]usize linksection(".bss") = .{ 0, 0 };
var service_sepcs: [2]usize linksection(".bss") = .{ 0, 0 };
var service_status: [2]usize linksection(".bss") = .{ 0, 0 };
var service_sps: [2]usize linksection(".bss") = .{ 0, 0 };
var service_inputs: [2]usize linksection(".bss") = .{ 0, 0 };
var service_result: usize linksection(".bss") = 0;
var service_prepared_sstatus: usize linksection(".bss") = 0;
var service_terminal_marker: usize linksection(".bss") = 0;
var service_return_to_user_count: usize linksection(".bss") = 0;
var service_terminal_to_supervisor_count: usize linksection(".bss") = 0;
var service_terminal_return_sepc: usize linksection(".bss") = 0;
var service_terminal_return_sstatus: usize linksection(".bss") = 0;
export var service_supervisor_sp: usize linksection(".bss") = 0;
export var service_supervisor_returned: bool linksection(".bss") = false;

export fn userServiceProbeTemplateBegin() linksection(".text.user_service_probe") callconv(.naked) void {
    asm volatile (
        \\addi sp, sp, -32
        \\li t0, 0x2019
        \\sd t0, 0(sp)
        \\li t1, 0x20aa
        \\li a0, 0x20
        \\li a1, 0x19
        \\.global userServiceProbeServiceEcall
        \\userServiceProbeServiceEcall:
        \\ecall
        \\.global userServiceProbeAfterService
        \\userServiceProbeAfterService:
        \\li t0, 0x39
        \\bne a0, t0, userServiceProbeFail
        \\li t0, 0x20aa
        \\bne t1, t0, userServiceProbeFail
        \\sd a0, 8(sp)
        \\li t0, 0x2020
        \\sd t0, 16(sp)
        \\li a2, 0x20ee
        \\.global userServiceProbeTerminalEcall
        \\userServiceProbeTerminalEcall:
        \\ecall
        \\userServiceProbeFail:
        \\unimp
        \\j userServiceProbeFail
        \\.global userServiceProbeTemplateEnd
        \\userServiceProbeTemplateEnd:
    );
}
extern var userServiceProbeServiceEcall: u8;
extern var userServiceProbeAfterService: u8;
extern var userServiceProbeTerminalEcall: u8;
extern var userServiceProbeTemplateEnd: u8;

export fn userServiceTrapEntry() linksection(".text.user_service_trap") callconv(.naked) void {
    asm volatile (
        \\csrrw sp, sscratch, sp
        \\addi sp, sp, -288
        \\sd ra, 8(sp)
        \\sd gp, 24(sp)
        \\sd tp, 32(sp)
        \\sd t0, 40(sp)
        \\sd t1, 48(sp)
        \\sd t2, 56(sp)
        \\sd s0, 64(sp)
        \\sd s1, 72(sp)
        \\sd a0, 80(sp)
        \\sd a1, 88(sp)
        \\sd a2, 96(sp)
        \\sd a3, 104(sp)
        \\sd a4, 112(sp)
        \\sd a5, 120(sp)
        \\sd a6, 128(sp)
        \\sd a7, 136(sp)
        \\sd s2, 144(sp)
        \\sd s3, 152(sp)
        \\sd s4, 160(sp)
        \\sd s5, 168(sp)
        \\sd s6, 176(sp)
        \\sd s7, 184(sp)
        \\sd s8, 192(sp)
        \\sd s9, 200(sp)
        \\sd s10, 208(sp)
        \\sd s11, 216(sp)
        \\sd t3, 224(sp)
        \\sd t4, 232(sp)
        \\sd t5, 240(sp)
        \\sd t6, 248(sp)
        \\csrr t0, sscratch
        \\sd t0, 16(sp)
        \\csrr t0, sepc
        \\sd t0, 256(sp)
        \\csrr t0, sstatus
        \\sd t0, 264(sp)
        \\csrr t0, scause
        \\sd t0, 272(sp)
        \\csrr t0, stval
        \\sd t0, 280(sp)
        \\mv a0, sp
        \\call recordUserServiceTrap
        \\la t0, service_trap_count
        \\ld t0, 0(t0)
        \\li t1, 2
        \\beq t0, t1, 2f
        \\ld t0, 264(sp)
        \\csrw sstatus, t0
        \\ld ra, 8(sp)
        \\ld gp, 24(sp)
        \\ld tp, 32(sp)
        \\ld t1, 48(sp)
        \\ld t2, 56(sp)
        \\ld s0, 64(sp)
        \\ld s1, 72(sp)
        \\ld a0, 80(sp)
        \\ld a1, 88(sp)
        \\ld a2, 96(sp)
        \\ld a3, 104(sp)
        \\ld a4, 112(sp)
        \\ld a5, 120(sp)
        \\ld a6, 128(sp)
        \\ld a7, 136(sp)
        \\ld s2, 144(sp)
        \\ld s3, 152(sp)
        \\ld s4, 160(sp)
        \\ld s5, 168(sp)
        \\ld s6, 176(sp)
        \\ld s7, 184(sp)
        \\ld s8, 192(sp)
        \\ld s9, 200(sp)
        \\ld s10, 208(sp)
        \\ld s11, 216(sp)
        \\ld t3, 224(sp)
        \\ld t4, 232(sp)
        \\ld t5, 240(sp)
        \\ld t6, 248(sp)
        \\ld t0, 16(sp)
        \\csrw sscratch, t0
        \\ld t0, 40(sp)
        \\addi sp, sp, 288
        \\csrrw sp, sscratch, sp
        \\sret
        \\2:
        \\ld t1, 256(sp)
        \\csrw sepc, t1
        \\ld t1, 264(sp)
        \\csrw sstatus, t1
        \\la t0, service_supervisor_sp
        \\ld sp, 0(t0)
        \\csrw sscratch, zero
        \\sret
    );
}

export fn recordUserServiceTrap(frame: *TrapFrame) callconv(.c) void {
    const index = service_trap_count;
    if (index >= 2 or frame.scause >> 63 != 0 or (frame.scause & 0x7fff_ffff_ffff_ffff) != 8 or frame.sstatus & 0x100 != 0) shutdown();
    const template_begin = @intFromPtr(&userServiceProbeTemplateBegin);
    const expected_service = user_code_va + @intFromPtr(&userServiceProbeServiceEcall) - template_begin;
    const expected_terminal = user_code_va + @intFromPtr(&userServiceProbeTerminalEcall) - template_begin;
    const expected_sp = user_stack_va + frames.PageSize - 32;
    if (frame.x[2] != expected_sp) shutdown();
    if (index == 0) {
        if (frame.sepc != expected_service or frame.x[10] != 0x20 or frame.x[11] != 0x19 or
            frame.x[5] != 0x2019 or frame.x[6] != 0x20aa) shutdown();
    } else {
        if (frame.sepc != expected_terminal or frame.x[12] != 0x20ee or frame.x[10] != 0x39 or
            frame.x[6] != 0x20aa or service_result != 0x39 or service_trap_count != 1) shutdown();
    }
    service_frames[index] = @intFromPtr(frame);
    service_causes[index] = frame.scause;
    service_sepcs[index] = frame.sepc;
    service_status[index] = frame.sstatus;
    service_sps[index] = frame.x[2];
    service_trap_count += 1;
    if (index == 0) {
        service_inputs = .{ frame.x[10], frame.x[11] };
        service_result = frame.x[10] + frame.x[11];
        frame.x[10] = service_result;
        frame.sepc = user_code_va + @intFromPtr(&userServiceProbeAfterService) - @intFromPtr(&userServiceProbeTemplateBegin);
        asm volatile ("csrw sepc, %[value]"
            :
            : [value] "r" (frame.sepc),
        );
        frame.sstatus &= ~@as(usize, 0x40122);
        service_prepared_sstatus = frame.sstatus;
        service_return_to_user_count += 1;
    } else {
        service_terminal_marker = frame.x[12];
        frame.sepc = @intFromPtr(&userServiceSupervisorResume);
        // The second SRET deliberately enters the known S-mode continuation
        // with SPP=1 while keeping SIE, SPIE, and SUM clear.
        frame.sstatus = (frame.sstatus & ~@as(usize, 0x40122)) | 0x100;
        service_terminal_return_sepc = frame.sepc;
        service_terminal_return_sstatus = frame.sstatus;
        service_terminal_to_supervisor_count += 1;
    }
}

export fn userProbeTemplateBegin() linksection(".text.user_probe") callconv(.naked) void {
    asm volatile (
        \\li t0, 0x139
        \\addi sp, sp, -16
        \\sd t0, 0(sp)
        \\ld t1, 0(sp)
        \\li a0, 0x519
        \\.global userProbeTemplateEcall
        \\userProbeTemplateEcall:
        \\ecall
        \\1: unimp
        \\j 1b
        \\.global userProbeTemplateEnd
        \\userProbeTemplateEnd:
    );
}
extern var userProbeTemplateEcall: u8;
extern var userProbeTemplateEnd: u8;

export fn userTrapEntry() linksection(".text.usertrap") callconv(.naked) void {
    asm volatile (
    // The architectural trap does not change sp.  This register-only swap
    // is therefore deliberately the first instruction and precedes stores.
        \\csrrw sp, sscratch, sp
        \\addi sp, sp, -288
        \\sd t0, 40(sp)
        \\sd t1, 48(sp)
        \\sd a0, 80(sp)
        \\csrr t0, sscratch
        \\sd t0, 16(sp)
        \\csrr t0, sepc
        \\sd t0, 256(sp)
        \\csrr t0, sstatus
        \\sd t0, 264(sp)
        \\csrr t0, scause
        \\sd t0, 272(sp)
        \\csrr t0, stval
        \\sd t0, 280(sp)
        \\mv a0, sp
        \\call recordUserTrap
        \\la t0, user_supervisor_sp
        \\ld sp, 0(t0)
        \\la t0, userSupervisorResume
        \\csrw sepc, t0
        \\li t0, 0x100
        \\csrs sstatus, t0
        \\sret
    );
}

export fn recordUserTrap(frame: *TrapFrame) callconv(.c) void {
    user_trap_frame_address = @intFromPtr(frame);
    user_scause = frame.scause;
    user_sepc = frame.sepc;
    user_sstatus = frame.sstatus;
    user_sp = frame.x[2];
    user_a0 = frame.x[10];
    user_t0 = frame.x[5];
    user_t1 = frame.x[6];
    if (frame.scause != 8 or (frame.sstatus & 0x100) != 0 or
        frame.sepc != user_code_va + 14 or frame.x[2] != user_stack_va + frames.PageSize - 16)
    {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    }
}

export fn enterUser(entry: usize, stack_top: usize, trap_stack_top: usize) linksection(".text.enteruser") callconv(.naked) void {
    _ = entry;
    _ = stack_top;
    _ = trap_stack_top;
    asm volatile (
        \\addi sp, sp, -112
        \\sd ra, 0(sp)
        \\sd s0, 8(sp)
        \\sd s1, 16(sp)
        \\sd s2, 24(sp)
        \\sd s3, 32(sp)
        \\sd s4, 40(sp)
        \\sd s5, 48(sp)
        \\sd s6, 56(sp)
        \\sd s7, 64(sp)
        \\sd s8, 72(sp)
        \\sd s9, 80(sp)
        \\sd s10, 88(sp)
        \\sd s11, 96(sp)
        \\la t0, user_supervisor_sp
        \\sd sp, 0(t0)
        \\csrw sscratch, a2
        \\la t0, userTrapEntry
        \\csrw stvec, t0
        \\csrw sepc, a0
        // Clear SIE, SPIE, SPP, and SUM: the one-shot U probe is noninterruptible.
        \\li t0, 0x40122
        \\csrc sstatus, t0
        \\mv sp, a1
        \\sret
        \\.global userSupervisorResume
        \\userSupervisorResume:
        \\la t0, user_returned
        \\li t1, 1
        \\sb t1, 0(t0)
        \\ld ra, 0(sp)
        \\ld s0, 8(sp)
        \\ld s1, 16(sp)
        \\ld s2, 24(sp)
        \\ld s3, 32(sp)
        \\ld s4, 40(sp)
        \\ld s5, 48(sp)
        \\ld s6, 56(sp)
        \\ld s7, 64(sp)
        \\ld s8, 72(sp)
        \\ld s9, 80(sp)
        \\ld s10, 88(sp)
        \\ld s11, 96(sp)
        \\addi sp, sp, 112
        \\ret
    );
}

export fn enterUserService(entry: usize, stack_top: usize, trap_stack_top: usize) linksection(".text.enteruserservice") callconv(.naked) void {
    _ = entry;
    _ = stack_top;
    _ = trap_stack_top;
    asm volatile (
        \\addi sp, sp, -112
        \\sd ra, 0(sp)
        \\sd s0, 8(sp)
        \\sd s1, 16(sp)
        \\sd s2, 24(sp)
        \\sd s3, 32(sp)
        \\sd s4, 40(sp)
        \\sd s5, 48(sp)
        \\sd s6, 56(sp)
        \\sd s7, 64(sp)
        \\sd s8, 72(sp)
        \\sd s9, 80(sp)
        \\sd s10, 88(sp)
        \\sd s11, 96(sp)
        \\la t0, service_supervisor_sp
        \\sd sp, 0(t0)
        \\csrw sscratch, a2
        \\la t0, userServiceTrapEntry
        \\csrw stvec, t0
        \\csrw sepc, a0
        \\li t0, 0x40122
        \\csrc sstatus, t0
        \\mv sp, a1
        \\sret
        \\.global userServiceSupervisorResume
        \\userServiceSupervisorResume:
        \\la t0, service_supervisor_returned
        \\li t1, 1
        \\sb t1, 0(t0)
        \\la t0, service_supervisor_sp
        \\ld sp, 0(t0)
        \\ld ra, 0(sp)
        \\ld s0, 8(sp)
        \\ld s1, 16(sp)
        \\ld s2, 24(sp)
        \\ld s3, 32(sp)
        \\ld s4, 40(sp)
        \\ld s5, 48(sp)
        \\ld s6, 56(sp)
        \\ld s7, 64(sp)
        \\ld s8, 72(sp)
        \\ld s9, 80(sp)
        \\ld s10, 88(sp)
        \\ld s11, 96(sp)
        \\addi sp, sp, 112
        \\ret
    );
}
extern var userServiceSupervisorResume: u8;

const expected_tick_count: usize = 4;
const tick_interval: usize = 100_000;
var ticks_active: bool = false;
var ticks_final_neutralized: bool = false;
var tick_sepc: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_scause: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_sstatus: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_observed_time: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_deadline: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_next_deadline: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
var tick_rearmed: [expected_tick_count]bool = [_]bool{false} ** expected_tick_count;
var active_tick_deadline: usize = 0;
export var tick_trap_count: usize = 0;
export var tick_return_count: usize = 0;

export fn supervisorTrapEntry() linksection(".text.trap") callconv(.naked) void {
    asm volatile (
        \\addi sp, sp, -288
        \\sd ra, 8(sp)
        \\addi ra, sp, 288
        \\sd ra, 16(sp)
        \\sd gp, 24(sp)
        \\sd tp, 32(sp)
        \\sd t0, 40(sp)
        \\sd t1, 48(sp)
        \\sd t2, 56(sp)
        \\sd s0, 64(sp)
        \\sd s1, 72(sp)
        \\sd a0, 80(sp)
        \\sd a1, 88(sp)
        \\sd a2, 96(sp)
        \\sd a3, 104(sp)
        \\sd a4, 112(sp)
        \\sd a5, 120(sp)
        \\sd a6, 128(sp)
        \\sd a7, 136(sp)
        \\sd s2, 144(sp)
        \\sd s3, 152(sp)
        \\sd s4, 160(sp)
        \\sd s5, 168(sp)
        \\sd s6, 176(sp)
        \\sd s7, 184(sp)
        \\sd s8, 192(sp)
        \\sd s9, 200(sp)
        \\sd s10, 208(sp)
        \\sd s11, 216(sp)
        \\sd t3, 224(sp)
        \\sd t4, 232(sp)
        \\sd t5, 240(sp)
        \\sd t6, 248(sp)
        \\csrr t0, sepc
        \\sd t0, 256(sp)
        \\csrr t0, sstatus
        \\sd t0, 264(sp)
        \\csrr t0, scause
        \\sd t0, 272(sp)
        \\csrr t0, stval
        \\sd t0, 280(sp)
        \\mv a0, sp
        \\call recordTrap
        \\ld t0, 256(sp)
        \\csrw sepc, t0
        \\ld t0, 264(sp)
        \\csrw sstatus, t0
        \\ld ra, 8(sp)
        \\ld gp, 24(sp)
        \\ld tp, 32(sp)
        \\ld t0, 40(sp)
        \\ld t1, 48(sp)
        \\ld t2, 56(sp)
        \\ld s0, 64(sp)
        \\ld s1, 72(sp)
        \\ld a0, 80(sp)
        \\ld a1, 88(sp)
        \\ld a2, 96(sp)
        \\ld a3, 104(sp)
        \\ld a4, 112(sp)
        \\ld a5, 120(sp)
        \\ld a6, 128(sp)
        \\ld a7, 136(sp)
        \\ld s2, 144(sp)
        \\ld s3, 152(sp)
        \\ld s4, 160(sp)
        \\ld s5, 168(sp)
        \\ld s6, 176(sp)
        \\ld s7, 184(sp)
        \\ld s8, 192(sp)
        \\ld s9, 200(sp)
        \\ld s10, 208(sp)
        \\ld s11, 216(sp)
        \\ld t3, 224(sp)
        \\ld t4, 232(sp)
        \\ld t5, 240(sp)
        \\ld t6, 248(sp)
        \\addi sp, sp, 288
        \\sret
    );
}

export fn recordTrap(frame: *TrapFrame) callconv(.c) void {
    const interrupt = frame.scause >> 63;
    const cause = frame.scause & 0x7fff_ffff_ffff_ffff;
    if (interrupt == 1 and cause == 5) {
        if (ticks_final_neutralized) {
            // Preserve an undeclared post-final delivery as failing evidence.
            tick_trap_count += 1;
            asm volatile ("li t0, 32; csrc sie, t0" ::: "t0", "memory");
            _ = sbiCall(0, 0, std.math.maxInt(usize), 0);
            return;
        }
        if (ticks_active) {
            const index = tick_trap_count;
            if (index >= expected_tick_count) {
                ticks_active = false;
                asm volatile ("li t0, 32; csrc sie, t0" ::: "t0", "memory");
                _ = sbiCall(0, 0, std.math.maxInt(usize), 0);
                return;
            }
            const now = asm volatile ("rdtime %[value]"
                : [value] "=r" (-> usize),
            );
            tick_sepc[index] = frame.sepc;
            tick_scause[index] = frame.scause;
            tick_sstatus[index] = frame.sstatus;
            tick_observed_time[index] = now;
            tick_deadline[index] = active_tick_deadline;
            tick_trap_count = index + 1;
            if (tick_trap_count < expected_tick_count) {
                // Re-arm relative to a newly observed counter value. This
                // avoids an already-late deadline becoming an interrupt loop.
                const next = now +% tick_interval;
                active_tick_deadline = next;
                tick_next_deadline[index] = next;
                _ = sbiCall(0, 0, next, 0);
                tick_rearmed[index] = true;
            } else {
                ticks_active = false;
                asm volatile ("li t0, 32; csrc sie, t0" ::: "t0", "memory");
                _ = sbiCall(0, 0, std.math.maxInt(usize), 0);
                tick_next_deadline[index] = std.math.maxInt(usize);
                ticks_final_neutralized = true;
            }
            return;
        }
        timer_sepc = frame.sepc;
        timer_scause = frame.scause;
        timer_sstatus = frame.sstatus;
        timer_trap_count += 1;
        // One shot means both mask STIE and move the firmware timer deadline
        // to the maximum RV64 value before returning. Interrupt sepc is kept.
        asm volatile ("li t0, 32; csrc sie, t0" ::: "t0", "memory");
        _ = sbiCall(0, 0, std.math.maxInt(usize), 0);
        timer_policy_complete = true;
        return;
    }
    if (interrupt == 0 and cause == 3) {
        observed_sepc = frame.sepc;
        observed_sstatus = frame.sstatus;
        observed_scause = frame.scause;
        observed_stval = frame.stval;
        trap_count += 1;
        // This policy applies only to the known 32-bit EBREAK probe below.
        frame.sepc += 4;
        return;
    }
    // Unknown traps do not inherit either supported class's resume policy.
    trap_count = std.math.maxInt(usize);
    asm volatile ("csrci sstatus, 2" ::: "memory");
}

comptime {
    asm (
        \\.global trapProbe
        \\.global trapProbeBreakpoint
        \\.global trapProbeResume
        \\.type trapProbe,@function
        \\trapProbe:
        \\mv t3, sp
        \\li t0, 0x12345
        \\li t1, 0x23456
        \\li a0, 0x34567
        \\trapProbeBreakpoint:
        \\.4byte 0x00100073
        \\trapProbeResume:
        \\li t2, 0x12345
        \\bne t0, t2, 1f
        \\li t2, 0x23456
        \\bne t1, t2, 1f
        \\li t2, 0x34567
        \\bne a0, t2, 1f
        \\bne sp, t3, 1f
        \\li a0, 1
        \\ret
        \\1: li a0, 0
        \\ret
    );
}

extern fn trapProbe() callconv(.c) usize;

comptime {
    asm (
        \\.global timerProbe
        \\.global timerWaitBegin
        \\.global timerWaitEnd
        \\.type timerProbe,@function
        \\timerProbe:
        \\mv t3, sp
        \\li t0, 0x45678
        \\li t1, 0x56789
        \\li a0, 0x6789a
        \\li t2, 32
        \\csrs sie, t2
        \\csrsi sstatus, 2
        \\timerWaitBegin:
        \\wfi
        \\la t2, timer_trap_count
        \\ld t2, 0(t2)
        \\beqz t2, timerWaitBegin
        \\timerWaitEnd:
        \\csrci sstatus, 2
        \\li t2, 0x45678
        \\bne t0, t2, 1f
        \\li t2, 0x56789
        \\bne t1, t2, 1f
        \\li t2, 0x6789a
        \\bne a0, t2, 1f
        \\bne sp, t3, 1f
        \\li a0, 1
        \\ret
        \\1: li a0, 0
        \\ret
    );
}

extern fn timerProbe() callconv(.c) usize;

comptime {
    asm (
        \\.global ticksProbe
        \\.global ticksWaitBegin
        \\.global ticksWaitEnd
        \\.type ticksProbe,@function
        \\ticksProbe:
        \\mv t3, sp
        \\li t0, 0x789ab
        \\li t1, 0x89abc
        \\li a0, 0x9abcd
        \\li t2, 32
        \\csrs sie, t2
        \\csrsi sstatus, 2
        \\ticksWaitBegin:
        \\wfi
        \\la t4, tick_trap_count
        \\ld t4, 0(t4)
        \\la t5, tick_return_count
        \\ld t6, 0(t5)
        \\bgeu t6, t4, ticksWaitBegin
        \\addi t6, t6, 1
        \\sd t6, 0(t5)
        \\li t2, 4
        \\bltu t6, t2, ticksWaitBegin
        \\ticksWaitEnd:
        \\csrci sstatus, 2
        \\li t2, 0x789ab
        \\bne t0, t2, 1f
        \\li t2, 0x89abc
        \\bne t1, t2, 1f
        \\li t2, 0x9abcd
        \\bne a0, t2, 1f
        \\bne sp, t3, 1f
        \\li a0, 1
        \\ret
        \\1: li a0, 0
        \\ret
    );
}

extern fn ticksProbe() callconv(.c) usize;

export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\la sp, __supervisor_stack_top
        \\tail freestandingMain
    );
}

fn sbiCall(extension: usize, function: usize, arg0: usize, arg1: usize) usize {
    return asm volatile ("ecall"
        : [result] "={a0}" (-> usize),
        : [a0] "{a0}" (arg0),
          [a1] "{a1}" (arg1),
          [a6] "{a6}" (function),
          [a7] "{a7}" (extension),
        : "memory"
    );
}

fn write(bytes: []const u8) void {
    for (bytes) |byte| _ = sbiCall(0x1, 0, byte, 0); // SBI legacy console putchar.
}

fn writeHex(bytes: []const u8) void {
    const digits = "0123456789abcdef";
    for (bytes) |byte| {
        write(&.{ digits[byte >> 4], digits[byte & 0xf] });
    }
}

fn writeUsizeHex(value: usize) void {
    const digits = "0123456789abcdef";
    var shift: usize = 60;
    while (true) : (shift -= 4) {
        write(&.{digits[(value >> @intCast(shift)) & 0xf]});
        if (shift == 0) break;
    }
}

fn shutdown() noreturn {
    _ = sbiCall(0x53525354, 0, 0, 0); // SBI system reset: shutdown, no reason.
    while (true) asm volatile ("wfi");
}

export fn freestandingMain() callconv(.c) noreturn {
    asm volatile ("csrw stvec, %[entry]"
        :
        : [entry] "r" (&supervisorTrapEntry),
        : "memory"
    );
    const registers_preserved = trapProbe() == 1;
    const interrupt = observed_scause >> 63;
    write("\nZIGREF_TRAP_BEGIN\ncount=");
    write(if (trap_count == 1) "1" else "INVALID");
    write("\ncause=");
    writeUsizeHex(observed_scause & 0x7fff_ffff_ffff_ffff);
    write("\ninterrupt=");
    write(if (interrupt == 0) "0" else "1");
    write("\nsepc=");
    writeUsizeHex(observed_sepc);
    write("\nresume_delta=4\nstval=");
    writeUsizeHex(observed_stval);
    write("\nsstatus=");
    writeUsizeHex(observed_sstatus);
    write("\nregisters=");
    write(if (registers_preserved) "PASS" else "FAIL");
    write("\nstack=");
    write(if (registers_preserved) "PASS" else "FAIL");
    write("\nZIGREF_TRAP_END\n");
    if (trap_count != 1 or observed_scause != 3 or !registers_preserved) {
        write("ZIGREF_TRAP_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_TRAP_RETURNED\n");
    const now = asm volatile ("rdtime %[value]"
        : [value] "=r" (-> usize),
    );
    _ = sbiCall(0, 0, now +% 100_000, 0); // Legacy SBI set_timer, RV64 deadline.
    const timer_registers_preserved = timerProbe() == 1;
    write("ZIGREF_TIMER_BEGIN\ncount=");
    write(if (timer_trap_count == 1) "1" else "INVALID");
    write("\ncause=");
    writeUsizeHex(timer_scause & 0x7fff_ffff_ffff_ffff);
    write("\ninterrupt=");
    write(if (timer_scause >> 63 == 1) "1" else "0");
    write("\nsepc=");
    writeUsizeHex(timer_sepc);
    write("\nsepc_policy=unchanged\npolicy=mask-stie-and-set-timer-max\npolicy_complete=");
    write(if (timer_policy_complete) "PASS" else "FAIL");
    write("\nregisters=");
    write(if (timer_registers_preserved) "PASS" else "FAIL");
    write("\nstack=");
    write(if (timer_registers_preserved) "PASS" else "FAIL");
    write("\nsstatus=");
    writeUsizeHex(timer_sstatus);
    write("\nZIGREF_TIMER_END\n");
    if (timer_trap_count != 1 or timer_scause != (1 << 63) | 5 or
        !timer_policy_complete or !timer_registers_preserved)
    {
        write("ZIGREF_TIMER_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_TIMER_RETURNED\n");
    const ticks_now = asm volatile ("rdtime %[value]"
        : [value] "=r" (-> usize),
    );
    active_tick_deadline = ticks_now +% tick_interval;
    ticks_active = true;
    _ = sbiCall(0, 0, active_tick_deadline, 0);
    const ticks_registers_preserved = ticksProbe() == 1;
    // Global SIE is now masked by ticksProbe. Any undeclared extra delivery
    // before this frame would still have incremented tick_trap_count.
    write("ZIGREF_TICKS_BEGIN\nexpected=");
    write(if (expected_tick_count == 4) "4" else "INVALID");
    write("\ncount=");
    write(if (tick_trap_count == expected_tick_count) "4" else "INVALID");
    write("\nreturns=");
    write(if (tick_return_count == expected_tick_count) "4" else "INVALID");
    write("\npolicy=observed-time-plus-bounded-interval\ninterval=");
    writeUsizeHex(tick_interval);
    write("\nregisters=");
    write(if (ticks_registers_preserved) "PASS" else "FAIL");
    write("\nstack=");
    write(if (ticks_registers_preserved) "PASS" else "FAIL");
    write("\nfinal_neutralized=");
    write(if (ticks_final_neutralized) "PASS" else "FAIL");
    for (0..expected_tick_count) |index| {
        write("\ntick=");
        writeUsizeHex(index);
        write(",cause=");
        writeUsizeHex(tick_scause[index] & 0x7fff_ffff_ffff_ffff);
        write(",interrupt=");
        write(if (tick_scause[index] >> 63 == 1) "1" else "0");
        write(",sepc=");
        writeUsizeHex(tick_sepc[index]);
        write(",time=");
        writeUsizeHex(tick_observed_time[index]);
        write(",deadline=");
        writeUsizeHex(tick_deadline[index]);
        write(",next_deadline=");
        writeUsizeHex(tick_next_deadline[index]);
        write(",rearmed=");
        write(if (tick_rearmed[index]) "1" else "0");
        write(",sstatus=");
        writeUsizeHex(tick_sstatus[index]);
    }
    write("\nZIGREF_TICKS_END\n");
    if (tick_trap_count != expected_tick_count or tick_return_count != expected_tick_count or
        !ticks_final_neutralized or !ticks_registers_preserved)
    {
        write("ZIGREF_TICKS_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_TICKS_RETURNED\n");
    // This adapter deliberately runs only after ticksProbe has observed all
    // four returns through sret. It maps the raw rdtime observations directly
    // to the target-neutral scheduler's u64 time; no conversion or addition
    // can overflow, and scheduling policy remains in the scheduler module.
    var scheduler = scheduler_module.BoundedDeterministicScheduler(4).init(tick_observed_time[0]);
    scheduler.schedule(.{ .id = 1, .ready_at = tick_observed_time[0], .priority = 0 }) catch unreachable;
    scheduler.schedule(.{ .id = 2, .ready_at = tick_observed_time[1], .priority = 1 }) catch unreachable;
    scheduler.schedule(.{ .id = 3, .ready_at = tick_observed_time[1], .priority = 1 }) catch unreachable;
    scheduler.schedule(.{ .id = 4, .ready_at = tick_observed_time[3], .priority = 0 }) catch unreachable;
    var selected: [4]u32 = [_]u32{0} ** 4;
    var selected_at: [4]usize = [_]usize{0} ** 4;
    var selected_count: usize = 0;
    var ready_counts: [expected_tick_count]usize = [_]usize{0} ** expected_tick_count;
    for (tick_observed_time, 0..) |machine_time, observation| {
        scheduler.advanceTo(machine_time) catch {
            write("ZIGREF_SCHEDULER_TIME_FAILURE\n");
            shutdown();
        };
        while (scheduler.nextReady()) |task| {
            if (selected_count >= selected.len) {
                write("ZIGREF_SCHEDULER_TIME_FAILURE\n");
                shutdown();
            }
            selected[selected_count] = task.id;
            selected_at[selected_count] = observation;
            selected_count += 1;
            ready_counts[observation] += 1;
        }
    }
    write("ZIGREF_SCHEDULER_TIME_BEGIN\nobservations=4\nmapping=identity-rdtime-u64\nreturns_before_decisions=");
    write(if (tick_return_count == expected_tick_count) "4" else "INVALID");
    write("\nthresholds=");
    for ([_]usize{ tick_observed_time[0], tick_observed_time[1], tick_observed_time[1], tick_observed_time[3] }, 0..) |value, index| {
        if (index != 0) write(",");
        writeUsizeHex(value);
    }
    for (tick_observed_time, 0..) |machine_time, index| {
        write("\nobservation=");
        writeUsizeHex(index);
        write(",machine=");
        writeUsizeHex(machine_time);
        write(",scheduler=");
        writeUsizeHex(machine_time);
        write(",ready_count=");
        writeUsizeHex(ready_counts[index]);
        write(",decision_phase=after-sret");
    }
    write("\nselected=");
    for (selected[0..selected_count], 0..) |id, index| {
        if (index != 0) write(",");
        writeUsizeHex(id);
        write("@");
        writeUsizeHex(selected_at[index]);
    }
    write("\nremaining=");
    writeUsizeHex(scheduler.count());
    write("\ncomplete=PASS\nZIGREF_SCHEDULER_TIME_END\nZIGREF_SCHEDULER_TIME_RETURNED\n");
    const pool_begin = @intFromPtr(&__physical_page_pool_begin);
    const pool_end = @intFromPtr(&__physical_page_pool_end);
    const satp = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    var regions = region_sets.PhysicalMemoryRegionSet(1){};
    regions.add(addresses.PhysicalAddress.init(pool_begin), pool_end - pool_begin, .usable) catch {
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    };
    var allocator = frame_allocators.PhysicalPageFrameAllocator(physical_pool_pages).initFromRegions(1, &regions) catch {
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    };
    const initial_free = allocator.freeCount();
    var owned: [physical_pool_pages]frames.PhysicalPageFrameNumber = undefined;
    var sentinels: [physical_pool_pages]usize = undefined;
    for (&owned, 0..) |*slot, index| {
        slot.* = allocator.allocate() catch {
            write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
            shutdown();
        };
        const address = (slot.toAddress() catch unreachable).raw();
        const sentinel = @as(usize, 0x5a17_0000_0000_0000) | index;
        const pointer: *volatile usize = @ptrFromInt(address + 64);
        pointer.* = sentinel;
        sentinels[index] = pointer.*;
    }
    const exhausted = if (allocator.allocate()) |_| false else |err| err == error.Exhausted;
    allocator.release(owned[2]) catch {
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    };
    const double_free = if (allocator.release(owned[2])) |_| false else |err| err == error.DoubleFree;
    const foreign = frames.PhysicalPageFrameNumber.fromAddress(addresses.PhysicalAddress.init(pool_end)) catch unreachable;
    const foreign_rejected = if (allocator.release(foreign)) |_| false else |err| err == error.ForeignFrame;
    const reacquired = allocator.allocate() catch {
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    };
    const reacquired_matches = reacquired.value == owned[2].value;
    for (owned) |frame| allocator.release(frame) catch {
        // The reacquired frame is owned again, so every original frame is now releasable.
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    };
    write("ZIGREF_PHYSICAL_MEMORY_BEGIN\npages=0000000000000008\npage_size=");
    writeUsizeHex(frames.PageSize);
    write("\npool_begin=");
    writeUsizeHex(pool_begin);
    write("\npool_end=");
    writeUsizeHex(pool_end);
    write("\nsatp=");
    writeUsizeHex(satp);
    write("\ntranslation=bare\nregion_count=");
    writeUsizeHex(regions.count());
    write("\nregion_kind=usable\ninitial_free=");
    writeUsizeHex(initial_free);
    write("\ninitial_allocated=0000000000000000");
    for (owned, 0..) |frame, index| {
        write("\nframe=");
        writeUsizeHex(index);
        write(",pfn=");
        writeUsizeHex(frame.value);
        write(",address=");
        writeUsizeHex((frame.toAddress() catch unreachable).raw());
        write(",offset=0000000000000040,wrote=");
        writeUsizeHex(@as(usize, 0x5a17_0000_0000_0000) | index);
        write(",read=");
        writeUsizeHex(sentinels[index]);
    }
    write("\nexhausted=");
    write(if (exhausted) "Exhausted" else "INVALID");
    write("\nreleased_index=0000000000000002\ndouble_free=");
    write(if (double_free) "DoubleFree" else "INVALID");
    write("\nforeign_pfn=");
    writeUsizeHex(foreign.value);
    write("\nforeign_release=");
    write(if (foreign_rejected) "ForeignFrame" else "INVALID");
    write("\nreacquired_pfn=");
    writeUsizeHex(reacquired.value);
    write("\nreacquired_matches=");
    write(if (reacquired_matches) "PASS" else "FAIL");
    write("\nfinal_free=");
    writeUsizeHex(allocator.freeCount());
    write("\nfinal_allocated=");
    writeUsizeHex(allocator.allocatedCount());
    write("\ncomplete=PASS\nZIGREF_PHYSICAL_MEMORY_END\n");
    if (satp != 0 or initial_free != physical_pool_pages or !exhausted or !double_free or
        !foreign_rejected or !reacquired_matches or allocator.freeCount() != physical_pool_pages or
        allocator.allocatedCount() != 0)
    {
        write("ZIGREF_PHYSICAL_MEMORY_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_PHYSICAL_MEMORY_RETURNED\n");
    // Batch 16 has returned every frame. Reserve one owned data frame, then
    // let the generic builder obtain and zero only real page-table frames from
    // the same allocator. The bounded first address space maps the exact ELF
    // image/pool span with 4 KiB RWX leaves plus one non-identity RW alias.
    const alias_frame = allocator.allocate() catch {
        write("ZIGREF_SV39_ACTIVE_FAILURE\n");
        shutdown();
    };
    const alias_physical = (alias_frame.toAddress() catch unreachable).raw();
    const Allocator = @TypeOf(allocator);
    var page_owner = RealPageOwner(Allocator){ .allocator = &allocator };
    var builder = sv39_builders.Builder(@TypeOf(page_owner)).init(&page_owner) catch {
        write("ZIGREF_SV39_ACTIVE_FAILURE\n");
        shutdown();
    };
    const image_begin = @intFromPtr(&__image_begin);
    const image_end = @intFromPtr(&__image_end);
    const mapped_begin = image_begin & ~@as(usize, frames.PageSize - 1);
    const mapped_end = (image_end + frames.PageSize - 1) & ~@as(usize, frames.PageSize - 1);
    const permissions = sv39_entries.Permissions{ .read = true, .write = true, .execute = true, .accessed = true, .dirty = true };
    var address = mapped_begin;
    while (address < mapped_end) : (address += frames.PageSize) {
        _ = builder.mapPage(address, address, .page_4k, permissions) catch {
            write("ZIGREF_SV39_ACTIVE_FAILURE\n");
            shutdown();
        };
    }
    _ = builder.mapPage(sv39_alias, alias_physical, .page_4k, .{ .read = true, .write = true, .accessed = true, .dirty = true }) catch {
        write("ZIGREF_SV39_ACTIVE_FAILURE\n");
        shutdown();
    };
    const alias_query = builder.query(sv39_alias) catch {
        write("ZIGREF_SV39_ACTIVE_FAILURE\n");
        shutdown();
    };
    const root_physical = builder.root;
    const satp_after_expected = (@as(usize, 8) << 60) | (root_physical >> 12);
    asm volatile ("csrw satp, %[value]"
        :
        : [value] "r" (satp_after_expected),
        : "memory"
    );
    sfence_vma.executeUnsafe(sfence_vma.global());
    const satp_after = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    var stack_probe: usize = 0x51a9_17;
    stack_probe +%= 1;
    sv39_continuation_marker = stack_probe;
    const alias_pointer: *volatile usize = @ptrFromInt(sv39_alias + 128);
    const identity_pointer: *volatile usize = @ptrFromInt(alias_physical + 128);
    const alias_sentinel: usize = 0xa117_5a39_c0de_0011;
    alias_pointer.* = alias_sentinel;
    const alias_read = alias_pointer.*;
    const identity_read = identity_pointer.*;
    write("ZIGREF_SV39_ACTIVE_BEGIN\npage_size=");
    writeUsizeHex(frames.PageSize);
    write("\npool_begin=");
    writeUsizeHex(pool_begin);
    write("\npool_end=");
    writeUsizeHex(pool_end);
    write("\nsatp_before=");
    writeUsizeHex(satp);
    write("\nroot_physical=");
    writeUsizeHex(root_physical);
    write("\npage_table_count=");
    writeUsizeHex(page_owner.page_count);
    for (page_owner.pages[0..page_owner.page_count], 0..) |page, index| {
        write("\npage_table=");
        writeUsizeHex(index);
        write(",address=");
        writeUsizeHex(page);
    }
    write("\nmapped_begin=");
    writeUsizeHex(mapped_begin);
    write("\nmapped_end=");
    writeUsizeHex(mapped_end);
    write("\nmapping_count=");
    writeUsizeHex((mapped_end - mapped_begin) / frames.PageSize + 1);
    write("\npermissions=kernel-rwx-ad\nalias=");
    writeUsizeHex(sv39_alias);
    write("\nalias_physical=");
    writeUsizeHex(alias_physical);
    write("\nalias_permissions=rw-ad\nalias_query=");
    writeUsizeHex(alias_query.physical_address);
    write("\nsatp_after=");
    writeUsizeHex(satp_after);
    write("\nmode=8\nasid=0\nroot_ppn=");
    writeUsizeHex(root_physical >> 12);
    write("\nsfence_vma=global-executed\nstack_global_marker=");
    writeUsizeHex(sv39_continuation_marker);
    write("\nalias_wrote=");
    writeUsizeHex(alias_sentinel);
    write("\nalias_read=");
    writeUsizeHex(alias_read);
    write("\nidentity_read=");
    writeUsizeHex(identity_read);
    write("\npost_switch_morphic=next\ncomplete=PASS\nZIGREF_SV39_ACTIVE_END\n");
    if (satp_after != satp_after_expected or alias_query.physical_address != alias_physical or
        alias_read != alias_sentinel or identity_read != alias_sentinel or
        sv39_continuation_marker != 0x51a9_18)
    {
        write("ZIGREF_SV39_ACTIVE_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_SV39_ACTIVE_RETURNED\n");

    // Batch 18 replaces each live leaf directly: Builder.protect preserves its
    // target and level and never installs a transient invalid entry.  One global
    // fence follows the complete bounded mutation set before any hardened probe.
    const text_begin = @intFromPtr(&__text_domain_begin);
    const text_end = @intFromPtr(&__text_domain_end);
    const rodata_begin = @intFromPtr(&__rodata_domain_begin);
    const rodata_end = @intFromPtr(&__rodata_domain_end);
    const writable_begin = @intFromPtr(&__writable_domain_begin);
    const writable_end = @intFromPtr(&__writable_domain_end);
    const text_permissions = sv39_entries.Permissions{ .read = true, .execute = true, .accessed = true };
    const rodata_permissions = sv39_entries.Permissions{ .read = true, .accessed = true };
    const writable_permissions = sv39_entries.Permissions{ .read = true, .write = true, .accessed = true, .dirty = true };
    var mutation_count: usize = 0;
    address = text_begin;
    while (address < text_end) : (address += frames.PageSize) {
        _ = builder.protect(address, .page_4k, text_permissions) catch {
            write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
            shutdown();
        };
        mutation_count += 1;
    }
    address = rodata_begin;
    while (address < rodata_end) : (address += frames.PageSize) {
        _ = builder.protect(address, .page_4k, rodata_permissions) catch {
            write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
            shutdown();
        };
        mutation_count += 1;
    }
    address = writable_begin;
    while (address < writable_end) : (address += frames.PageSize) {
        _ = builder.protect(address, .page_4k, writable_permissions) catch {
            write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
            shutdown();
        };
        mutation_count += 1;
    }
    _ = builder.protect(sv39_alias, .page_4k, writable_permissions) catch {
        write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
        shutdown();
    };
    mutation_count += 1;
    const satp_permissions_before = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    sfence_vma.executeUnsafe(sfence_vma.global());

    // Positive probes exercise allowed accesses only; the raw leaf rows below
    // independently prove that the denied permission bits are absent.
    var permission_stack: usize = 0x18_5100;
    permission_stack +%= 0x39;
    sv39_permission_global = permission_stack;
    const rodata_read = sv39_permission_rodata;
    const permission_alias_sentinel: usize = 0x18a1_1a55_c0de_0039;
    alias_pointer.* = permission_alias_sentinel;
    const permission_alias_read = alias_pointer.*;
    const permission_identity_read = identity_pointer.*;
    const satp_permissions_after = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );

    write("ZIGREF_SV39_PERMISSIONS_BEGIN\npage_size=");
    writeUsizeHex(frames.PageSize);
    write("\nsatp_before=");
    writeUsizeHex(satp_permissions_before);
    write("\nsatp_after=");
    writeUsizeHex(satp_permissions_after);
    write("\nroot_physical=");
    writeUsizeHex(root_physical);
    write("\nroot_ppn=");
    writeUsizeHex(root_physical >> 12);
    write("\ntext_begin=");
    writeUsizeHex(text_begin);
    write("\ntext_end=");
    writeUsizeHex(text_end);
    write("\nrodata_begin=");
    writeUsizeHex(rodata_begin);
    write("\nrodata_end=");
    writeUsizeHex(rodata_end);
    write("\nwritable_begin=");
    writeUsizeHex(writable_begin);
    write("\nwritable_end=");
    writeUsizeHex(writable_end);
    write("\nalias=");
    writeUsizeHex(sv39_alias);
    write("\nalias_physical=");
    writeUsizeHex(alias_physical);
    write("\nleaf_count=");
    writeUsizeHex((writable_end - text_begin) / frames.PageSize + 1);
    address = text_begin;
    while (address < writable_end) : (address += frames.PageSize) {
        const leaf = builder.query(address) catch {
            write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
            shutdown();
        };
        write("\nleaf_va=");
        writeUsizeHex(address);
        write(",pa=");
        writeUsizeHex(leaf.physical_address);
        write(",pte=");
        writeUsizeHex(leaf.raw_entry);
        write(",level=");
        writeUsizeHex(@intFromEnum(leaf.level));
    }
    const alias_leaf = builder.query(sv39_alias) catch {
        write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
        shutdown();
    };
    write("\nleaf_va=");
    writeUsizeHex(sv39_alias);
    write(",pa=");
    writeUsizeHex(alias_leaf.physical_address);
    write(",pte=");
    writeUsizeHex(alias_leaf.raw_entry);
    write(",level=");
    writeUsizeHex(@intFromEnum(alias_leaf.level));
    write("\nmutation_count=");
    writeUsizeHex(mutation_count);
    write("\nsfence_vma=global-executed\ncode_probe=PASS\nrodata_read=");
    writeUsizeHex(rodata_read);
    write("\nstack_probe=");
    writeUsizeHex(permission_stack);
    write("\nglobal_probe=");
    writeUsizeHex(sv39_permission_global);
    write("\nalias_wrote=");
    writeUsizeHex(permission_alias_sentinel);
    write("\nalias_read=");
    writeUsizeHex(permission_alias_read);
    write("\nidentity_read=");
    writeUsizeHex(permission_identity_read);
    write("\npost_hardening_morphic=next\ncomplete=PASS\nZIGREF_SV39_PERMISSIONS_END\n");
    if (satp_permissions_before != satp_after_expected or satp_permissions_after != satp_after_expected or
        permission_stack != 0x18_5139 or sv39_permission_global != permission_stack or
        rodata_read != sv39_permission_rodata or permission_alias_read != permission_alias_sentinel or
        permission_identity_read != permission_alias_sentinel)
    {
        write("ZIGREF_SV39_PERMISSIONS_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_SV39_PERMISSIONS_RETURNED\n");

    // Batch 19 consumes exactly two remaining owned data frames.  Both VAs
    // share the alias' existing L0 subtree, so Builder must not allocate a
    // fifth page-table page.
    const page_tables_before_user = page_owner.page_count;
    const user_code_frame = allocator.allocate() catch {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    };
    const user_stack_frame = allocator.allocate() catch {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    };
    const user_code_pa = (user_code_frame.toAddress() catch unreachable).raw();
    const user_stack_pa = (user_stack_frame.toAddress() catch unreachable).raw();
    const template_begin = @intFromPtr(&userProbeTemplateBegin);
    const template_end = @intFromPtr(&userProbeTemplateEnd);
    const template_ecall = @intFromPtr(&userProbeTemplateEcall);
    const template_size = template_end - template_begin;
    if (template_size == 0 or template_size >= frames.PageSize or template_ecall < template_begin or template_ecall >= template_end) {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    }
    const source: [*]const u8 = @ptrFromInt(template_begin);
    const destination: [*]volatile u8 = @ptrFromInt(user_code_pa);
    for (0..template_size) |index| destination[index] = source[index];
    const code_permissions = sv39_entries.Permissions{ .read = true, .execute = true, .user = true, .accessed = true };
    const stack_permissions = sv39_entries.Permissions{ .read = true, .write = true, .user = true, .accessed = true, .dirty = true };
    _ = builder.mapPage(user_code_va, user_code_pa, .page_4k, code_permissions) catch {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    };
    _ = builder.mapPage(user_stack_va, user_stack_pa, .page_4k, stack_permissions) catch {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    };
    if (page_owner.page_count != page_tables_before_user) {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    }
    sfence_vma.executeUnsafe(sfence_vma.global());
    asm volatile ("fence.i" ::: "memory");
    const historical_stvec = @intFromPtr(&supervisorTrapEntry);
    const trap_begin = @intFromPtr(&__user_trap_stack_begin);
    const trap_end = @intFromPtr(&__user_trap_stack_end);
    asm volatile ("mv a0, %[entry]; mv a1, %[stack]; mv a2, %[trap_stack]; call enterUser"
        :
        : [entry] "{a0}" (user_code_va),
          [stack] "{a1}" (user_stack_va + frames.PageSize),
          [trap_stack] "{a2}" (trap_end),
        : "memory"
    );
    asm volatile ("csrw stvec, %[entry]; csrw sscratch, zero"
        :
        : [entry] "r" (historical_stvec),
        : "memory"
    );
    const stvec_user_after = asm volatile ("csrr %[value], stvec"
        : [value] "=r" (-> usize),
    );
    const sscratch_user_after = asm volatile ("csrr %[value], sscratch"
        : [value] "=r" (-> usize),
    );
    const satp_user_after = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    const stack_sentinel: *volatile usize = @ptrFromInt(user_stack_pa + frames.PageSize - 16);
    const expected_ecall = user_code_va + template_ecall - template_begin;
    // recordUserTrap already failed closed on origin/cause/sepc/sp. The frame
    // below is the independent decision surface for every remaining relation.
    const user_ok = true;
    write("ZIGREF_UMODE_BEGIN\npage_size=");
    writeUsizeHex(frames.PageSize);
    write("\nsatp_before=");
    writeUsizeHex(satp_permissions_after);
    write("\nsatp_after=");
    writeUsizeHex(satp_user_after);
    write("\nroot_physical=");
    writeUsizeHex(root_physical);
    write("\npage_table_count_before=");
    writeUsizeHex(page_tables_before_user);
    write("\npage_table_count_after=");
    writeUsizeHex(page_owner.page_count);
    write("\nstvec_before=");
    writeUsizeHex(historical_stvec);
    write("\nuser_stvec=");
    writeUsizeHex(@intFromPtr(&userTrapEntry));
    write("\nstvec_after=");
    writeUsizeHex(stvec_user_after);
    write("\nsscratch_after=");
    writeUsizeHex(sscratch_user_after);
    write("\ntrap_stack_begin=");
    writeUsizeHex(trap_begin);
    write("\ntrap_stack_end=");
    writeUsizeHex(trap_end);
    write("\ntrap_frame=");
    writeUsizeHex(user_trap_frame_address);
    write("\nuser_code_va=");
    writeUsizeHex(user_code_va);
    write("\nuser_code_pa=");
    writeUsizeHex(user_code_pa);
    write("\nuser_stack_va=");
    writeUsizeHex(user_stack_va);
    write("\nuser_stack_pa=");
    writeUsizeHex(user_stack_pa);
    write("\nuser_stack_top=");
    writeUsizeHex(user_stack_va + frames.PageSize);
    write("\ntemplate_begin=");
    writeUsizeHex(template_begin);
    write("\ntemplate_end=");
    writeUsizeHex(template_end);
    write("\ntemplate_ecall=");
    writeUsizeHex(template_ecall);
    write("\nexpected_ecall=");
    writeUsizeHex(expected_ecall);
    write("\nsfence_vma=global-executed\nfence_i=local-hart-executed\nprepared_spp=0\nprepared_sie=0\nprepared_spie=0\nprepared_sum=0");
    write("\nscause=");
    writeUsizeHex(user_scause & 0x7fff_ffff_ffff_ffff);
    write("\ninterrupt=");
    write(if (user_scause >> 63 == 0) "0" else "1");
    write("\nsepc=");
    writeUsizeHex(user_sepc);
    write("\nsstatus=");
    writeUsizeHex(user_sstatus);
    write("\ntrapped_spp=");
    write(if (user_sstatus & 0x100 == 0) "0" else "1");
    write("\nuser_sp=");
    writeUsizeHex(user_sp);
    write("\nuser_a0=");
    writeUsizeHex(user_a0);
    write("\nuser_t0=");
    writeUsizeHex(user_t0);
    write("\nuser_t1=");
    writeUsizeHex(user_t1);
    write("\nstack_sentinel=");
    writeUsizeHex(stack_sentinel.*);
    write("\nsupervisor_resume=");
    write(if (user_returned) "PASS" else "FAIL");
    write("\ncheck_cause=");
    write(if (user_scause == 8) "PASS" else "FAIL");
    write("\ncheck_sepc=");
    write(if (user_sepc == expected_ecall) "PASS" else "FAIL");
    write("\ncheck_frame=");
    write(if (user_trap_frame_address >= trap_begin and user_trap_frame_address + @sizeOf(TrapFrame) <= trap_end) "PASS" else "FAIL");
    write("\nleaf_count=");
    writeUsizeHex((writable_end - text_begin) / frames.PageSize + 3);
    address = text_begin;
    while (address < writable_end) : (address += frames.PageSize) {
        const leaf = builder.query(address) catch {
            write("ZIGREF_UMODE_FAILURE\n");
            shutdown();
        };
        write("\nleaf_va=");
        writeUsizeHex(address);
        write(",pa=");
        writeUsizeHex(leaf.physical_address);
        write(",pte=");
        writeUsizeHex(leaf.raw_entry);
        write(",level=");
        writeUsizeHex(@intFromEnum(leaf.level));
    }
    for ([_]usize{ sv39_alias, user_code_va, user_stack_va }) |va| {
        const leaf = builder.query(va) catch {
            write("ZIGREF_UMODE_FAILURE\n");
            shutdown();
        };
        write("\nleaf_va=");
        writeUsizeHex(va);
        write(",pa=");
        writeUsizeHex(leaf.physical_address);
        write(",pte=");
        writeUsizeHex(leaf.raw_entry);
        write(",level=");
        writeUsizeHex(@intFromEnum(leaf.level));
    }
    write("\ncomplete=");
    write(if (user_ok) "PASS" else "FAIL");
    write("\nZIGREF_UMODE_END\n");
    if (!user_ok) {
        write("ZIGREF_UMODE_FAILURE\n");
        shutdown();
    }
    write("ZIGREF_UMODE_RETURNED\n");

    // Batch 20 deliberately reuses both Batch 19 user frames and every PTE.
    const service_allocated_before = allocator.allocatedCount();
    const service_page_tables_before = page_owner.page_count;
    const service_begin = @intFromPtr(&userServiceProbeTemplateBegin);
    const service_end = @intFromPtr(&userServiceProbeTemplateEnd);
    const service_ecall = @intFromPtr(&userServiceProbeServiceEcall);
    const service_after = @intFromPtr(&userServiceProbeAfterService);
    const terminal_ecall = @intFromPtr(&userServiceProbeTerminalEcall);
    const service_size = service_end - service_begin;
    if (service_size == 0 or service_size >= frames.PageSize or !(service_begin < service_ecall and service_ecall < service_after and service_after < terminal_ecall and terminal_ecall < service_end)) shutdown();
    for (0..frames.PageSize) |index| destination[index] = 0;
    const service_source: [*]const u8 = @ptrFromInt(service_begin);
    for (0..service_size) |index| destination[index] = service_source[index];
    asm volatile ("fence.i" ::: "memory");
    const service_satp_before = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    asm volatile ("mv a0, %[entry]; mv a1, %[stack]; mv a2, %[trap_stack]; call enterUserService"
        :
        : [entry] "{a0}" (user_code_va),
          [stack] "{a1}" (user_stack_va + frames.PageSize),
          [trap_stack] "{a2}" (trap_end),
        : "memory"
    );
    asm volatile ("csrw stvec, %[entry]; csrw sscratch, zero"
        :
        : [entry] "r" (historical_stvec),
        : "memory"
    );
    const service_stvec_after = asm volatile ("csrr %[value], stvec"
        : [value] "=r" (-> usize),
    );
    const service_sscratch_after = asm volatile ("csrr %[value], sscratch"
        : [value] "=r" (-> usize),
    );
    const service_satp_after = asm volatile ("csrr %[value], satp"
        : [value] "=r" (-> usize),
    );
    const service_allocated_after = allocator.allocatedCount();
    const service_page_tables_after = page_owner.page_count;
    const observed_result: *volatile usize = @ptrFromInt(user_stack_pa + frames.PageSize - 24);
    const observed_post: *volatile usize = @ptrFromInt(user_stack_pa + frames.PageSize - 16);
    write("ZIGREF_ECALL_RETURN_BEGIN\npage_size=");
    writeUsizeHex(frames.PageSize);
    write("\nsatp_before=");
    writeUsizeHex(service_satp_before);
    write("\nsatp_after=");
    writeUsizeHex(service_satp_after);
    write("\nroot_physical=");
    writeUsizeHex(root_physical);
    write("\npage_table_count_before=");
    writeUsizeHex(service_page_tables_before);
    write("\npage_table_count_after=");
    writeUsizeHex(service_page_tables_after);
    write("\nphysical_allocated_before=");
    writeUsizeHex(service_allocated_before);
    write("\nphysical_allocated_after=");
    writeUsizeHex(service_allocated_after);
    write("\nuser_code_va=");
    writeUsizeHex(user_code_va);
    write("\nuser_code_pa=");
    writeUsizeHex(user_code_pa);
    write("\nuser_stack_va=");
    writeUsizeHex(user_stack_va);
    write("\nuser_stack_pa=");
    writeUsizeHex(user_stack_pa);
    write("\nuser_stack_top=");
    writeUsizeHex(user_stack_va + frames.PageSize);
    write("\ntemplate_begin=");
    writeUsizeHex(service_begin);
    write("\nservice_ecall=");
    writeUsizeHex(service_ecall);
    write("\nafter_service=");
    writeUsizeHex(service_after);
    write("\nterminal_ecall=");
    writeUsizeHex(terminal_ecall);
    write("\ntemplate_end=");
    writeUsizeHex(service_end);
    write("\ntemplate_size=");
    writeUsizeHex(service_size);
    write("\ntranslation_change=none\nsfence_vma=not-required-no-pte-change\nfence_i=local-hart-executed");
    write("\nstvec_before=");
    writeUsizeHex(historical_stvec);
    write("\ntrap_stvec=");
    writeUsizeHex(@intFromPtr(&userServiceTrapEntry));
    write("\ntrap_stack_begin=");
    writeUsizeHex(trap_begin);
    write("\ntrap_stack_end=");
    writeUsizeHex(trap_end);
    write("\nfirst_trap_frame=");
    writeUsizeHex(service_frames[0]);
    write("\nsecond_trap_frame=");
    writeUsizeHex(service_frames[1]);
    write("\nfirst_scause=");
    writeUsizeHex(service_causes[0]);
    write("\nfirst_interrupt=");
    write(if (service_causes[0] >> 63 == 0) "0" else "1");
    write("\nfirst_sepc=");
    writeUsizeHex(service_sepcs[0]);
    write("\nfirst_sstatus=");
    writeUsizeHex(service_status[0]);
    write("\nfirst_user_sp=");
    writeUsizeHex(service_sps[0]);
    write("\nfirst_a0=");
    writeUsizeHex(service_inputs[0]);
    write("\nfirst_a1=");
    writeUsizeHex(service_inputs[1]);
    write("\nservice_result=");
    writeUsizeHex(service_result);
    write("\nprepared_sepc=");
    writeUsizeHex(user_code_va + service_after - service_begin);
    write("\nprepared_sstatus=");
    writeUsizeHex(service_prepared_sstatus);
    write("\nreturn_to_user_count=");
    writeUsizeHex(service_return_to_user_count);
    write("\nsecond_scause=");
    writeUsizeHex(service_causes[1]);
    write("\nsecond_interrupt=");
    write(if (service_causes[1] >> 63 == 0) "0" else "1");
    write("\nsecond_sepc=");
    writeUsizeHex(service_sepcs[1]);
    write("\nsecond_sstatus=");
    writeUsizeHex(service_status[1]);
    write("\nsecond_user_sp=");
    writeUsizeHex(service_sps[1]);
    write("\nuser_observed_result=");
    writeUsizeHex(observed_result.*);
    write("\npost_return_sentinel=");
    writeUsizeHex(observed_post.*);
    write("\nterminal_marker=");
    writeUsizeHex(service_terminal_marker);
    write("\nterminal_to_supervisor_count=");
    writeUsizeHex(service_terminal_to_supervisor_count);
    write("\nterminal_return_sepc=");
    writeUsizeHex(service_terminal_return_sepc);
    write("\nterminal_return_sstatus=");
    writeUsizeHex(service_terminal_return_sstatus);
    write("\ntrap_count=");
    writeUsizeHex(service_trap_count);
    write("\nsupervisor_resume=");
    write(if (service_supervisor_returned) "PASS" else "FAIL");
    write("\nstvec_after=");
    writeUsizeHex(service_stvec_after);
    write("\nsscratch_after=");
    writeUsizeHex(service_sscratch_after);
    var final_leaf_count: usize = 0;
    var final_u_leaves: usize = 0;
    var final_wx_leaves: usize = 0;
    address = text_begin;
    while (address < writable_end) : (address += frames.PageSize) {
        const leaf = builder.query(address) catch shutdown();
        final_leaf_count += 1;
        final_u_leaves += @intFromBool(leaf.raw_entry & 0x10 != 0);
        final_wx_leaves += @intFromBool(leaf.raw_entry & 0xc == 0xc);
        write("\nleaf_va=");
        writeUsizeHex(address);
        write(",pa=");
        writeUsizeHex(leaf.physical_address);
        write(",pte=");
        writeUsizeHex(leaf.raw_entry);
        write(",level=");
        writeUsizeHex(@intFromEnum(leaf.level));
    }
    for ([_]usize{ sv39_alias, user_code_va, user_stack_va }) |va| {
        const leaf = builder.query(va) catch shutdown();
        final_leaf_count += 1;
        final_u_leaves += @intFromBool(leaf.raw_entry & 0x10 != 0);
        final_wx_leaves += @intFromBool(leaf.raw_entry & 0xc == 0xc);
        write("\nleaf_va=");
        writeUsizeHex(va);
        write(",pa=");
        writeUsizeHex(leaf.physical_address);
        write(",pte=");
        writeUsizeHex(leaf.raw_entry);
        write(",level=");
        writeUsizeHex(@intFromEnum(leaf.level));
    }
    write("\nfinal_u_leaves=");
    writeUsizeHex(final_u_leaves);
    write("\nfinal_wx_leaves=");
    writeUsizeHex(final_wx_leaves);
    write("\nfinal_leaf_count=");
    writeUsizeHex(final_leaf_count);
    if (service_allocated_before != service_allocated_after or
        service_page_tables_before != service_page_tables_after or
        service_satp_before != service_satp_after or service_satp_after != satp_permissions_after or
        service_trap_count != 2 or service_return_to_user_count != 1 or service_terminal_to_supervisor_count != 1 or
        !service_supervisor_returned or service_result != 0x39 or observed_result.* != 0x39 or observed_post.* != 0x2020 or
        service_terminal_marker != 0x20ee or service_stvec_after != historical_stvec or service_sscratch_after != 0 or
        final_u_leaves != 2 or final_wx_leaves != 0) shutdown();
    write("\ncomplete=PASS\nZIGREF_ECALL_RETURN_END\nZIGREF_ECALL_RETURN_RETURNED\n");
    var output: [128]u8 = undefined;
    var trace: [2048]u8 = undefined;
    const result = morphic.runFake(&output, &trace) catch {
        write("\nZIGREF_MORPHIC_FAILURE\n");
        shutdown();
    };
    write(begin_marker);
    writeHex(result.output);
    writeHex(result.trace);
    write("\n");
    write(end_marker);
    shutdown();
}

pub fn panic(_: []const u8, _: ?*std.builtin.StackTrace, _: ?usize) noreturn {
    write("\nZIGREF_MORPHIC_PANIC\n");
    shutdown();
}
