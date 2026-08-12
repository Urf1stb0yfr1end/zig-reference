pub export var path_ok: [13]u8 = "/etc/message\x00".*;
pub export var path_missing: [13]u8 = "/etc/missing\x00".*;
pub export var path_exec: [10]u8 = "/bin/main\x00".*;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\li a0, -100; la a1, path_ok; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, 3; bne a0, t0, 9f
        \\li a0, -100; la a1, path_missing; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, -2; bne a0, t0, 9f
        \\li a0, -100; li a1, 0x90000000; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, -14; bne a0, t0, 9f
        \\li a0, 0; li a1, 4096; li a2, 3; li a3, 0x22; li a4, -1; li a5, 0; li a7, 222; ecall
        \\li t0, 0x80404000; bne a0, t0, 9f
        \\mv s0, a0; li t1, 0x26; sd t1, 0(s0)
        \\mv a0, s0; li a1, 4096; li a2, 1; li a7, 226; ecall
        \\bnez a0, 9f
        \\mv a0, s0; li a1, 4096; li a7, 215; ecall
        \\bnez a0, 9f
        \\la a0, path_exec; li a1, 0; li a2, 0; li a7, 221; ecall
        \\9: unimp; j 9b
    );
}
