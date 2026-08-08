const std = @import("std");
const morphic = @import("morphic-core");

const begin_marker = "\nZIGREF_MORPHIC_BEGIN\n";
const end_marker = "ZIGREF_MORPHIC_END\n";

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
    observed_sepc = frame.sepc;
    observed_sstatus = frame.sstatus;
    observed_scause = frame.scause;
    observed_stval = frame.stval;
    trap_count += 1;
    // This policy applies only to the known 32-bit EBREAK probe below.
    frame.sepc += 4;
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
