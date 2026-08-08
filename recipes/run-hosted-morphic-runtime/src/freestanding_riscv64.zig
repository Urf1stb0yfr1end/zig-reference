const std = @import("std");
const morphic = @import("morphic-core");
const scheduler_module = @import("bounded-deterministic-scheduler");
const addresses = @import("distinct-memory-address-types");
const frames = @import("physical-page-frame-number-and-address-conversion");
const region_sets = @import("physical-memory-region-set");
const frame_allocators = @import("physical-page-frame-allocator");

const begin_marker = "\nZIGREF_MORPHIC_BEGIN\n";
const end_marker = "ZIGREF_MORPHIC_END\n";
const physical_pool_pages = 8;

extern var __physical_page_pool_begin: u8;
extern var __physical_page_pool_end: u8;

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
        \\la sp, __stack_top
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
