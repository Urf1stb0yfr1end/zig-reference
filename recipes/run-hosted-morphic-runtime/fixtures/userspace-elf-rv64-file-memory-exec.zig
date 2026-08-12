pub export var path_ok: [13]u8 = "/etc/message\x00".*;
pub export var path_missing: [13]u8 = "/etc/missing\x00".*;
pub export var path_exec: [10]u8 = "/bin/main\x00".*;
pub export var exec_arg0: [10]u8 = "/bin/main\x00".*;
pub export var exec_env0: [15]u8 = "BATCH26=causal\x00".*;
pub export var exec_argv: [2]usize = .{ 0, 0 };
pub export var exec_envp: [2]usize = .{ 0, 0 };
pub export var program_a_continuation: usize = 0;
pub export var read_buffer: [16]u8 = [_]u8{0} ** 16;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\.option norvc
        \\li a0, -100; la a1, path_ok; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, 3; bne a0, t0, 9f
        \\li a0, 3; la a1, read_buffer; li a2, 12; li a7, 63; ecall
        \\li t0, 12; bne a0, t0, 9f
        \\li a0, -100; la a1, path_missing; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, -2; bne a0, t0, 9f
        \\li a0, -100; li a1, 0x90000000; li a2, 0; li a3, 0; li a7, 56; ecall
        \\li t0, -14; bne a0, t0, 9f
        \\li a0, 0; li a1, 4096; li a2, 3; li a3, 0x22; li a4, -1; li a5, 0; li a7, 222; ecall
        \\li t0, 0x80404000; bne a0, t0, 9f
        \\mv s0, a0; li t1, 0x26; sd t1, 0(s0)
        \\mv a0, s0; li a1, 4096; li a2, 1; li a7, 226; ecall
        \\bnez a0, 9f
        \\.global batch26ProtectedStore
        \\batch26ProtectedStore:
        \\sd t1, 0(s0)
        \\.global batch26AfterProtectedStore
        \\batch26AfterProtectedStore:
        \\mv a0, s0; li a1, 4096; li a7, 215; ecall
        \\bnez a0, 9f
        \\.global batch26UnmappedLoad
        \\batch26UnmappedLoad:
        \\ld t1, 0(s0)
        \\.global batch26AfterUnmappedLoad
        \\batch26AfterUnmappedLoad:
        \\la t0, exec_arg0; la t1, exec_argv; sd t0, 0(t1); sd zero, 8(t1)
        \\la t0, exec_env0; la t1, exec_envp; sd t0, 0(t1); sd zero, 8(t1)
        \\la a0, path_missing; la a1, exec_argv; la a2, exec_envp; li a7, 221; ecall
        \\li t0, -2; bne a0, t0, 9f
        \\.global batch26AfterFailedExec
        \\batch26AfterFailedExec:
        \\la t0, program_a_continuation; li s1, 0x26a; sd s1, 0(t0)
        \\la a0, path_exec; la a1, exec_argv; la a2, exec_envp; li a7, 221; ecall
        \\9: unimp; j 9b
    );
}
