export var pre_ecall: u64 = 0;
export var post_return: u64 = 0;
export var read_buffer: [16]u8 = .{0} ** 16;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\la t2, pre_ecall
        \\li t3, 0x25b0
        \\sd t3, 0(t2)
        // unsupported -> ENOSYS
        \\li a0, 0x1111; li a1, 0x2222; li a2, 0x3333; li a7, 0x7fff; ecall
        \\li t0, -38; bne a0, t0, 9f
        // read(0, buffer, 5) => "stdin"
        \\li a0, 0; la a1, read_buffer; li a2, 5; li a7, 63; ecall
        \\li t0, 5; bne a0, t0, 9f
        // dup(0) allocates lowest free descriptor 3.
        \\li a0, 0; li a7, 23; ecall
        \\li t0, 3; bne a0, t0, 9f
        // close original; alias survives.
        \\li a0, 0; li a7, 57; ecall
        \\bnez a0, 9f
        \\li a0, 0; la a1, read_buffer; li a2, 1; li a7, 63; ecall
        \\li t0, -9; bne a0, t0, 9f
        // EFAULT must not consume stdin.
        \\li a0, 3; li a1, 0x90000000; li a2, 4; li a7, 63; ecall
        \\li t0, -14; bne a0, t0, 9f
        \\li a0, 3; la a1, read_buffer+5; li a2, 4; li a7, 63; ecall
        \\li t0, 4; bne a0, t0, 9f
        // Surviving bytes must be the unconsumed suffix; write via fd table.
        \\li a0, 1; la a1, read_buffer; li a2, 9; li a7, 64; ecall
        \\li t0, 9; bne a0, t0, 9f
        // final alias close and repeated invalid lifecycle checks.
        \\li a0, 3; li a7, 57; ecall
        \\bnez a0, 9f
        \\li a0, 3; la a1, read_buffer; li a2, 1; li a7, 63; ecall
        \\li t0, -9; bne a0, t0, 9f
        \\li a0, 3; li a7, 57; ecall
        \\li t0, -9; bne a0, t0, 9f
        \\li a0, 99; la a1, read_buffer; li a2, 1; li a7, 64; ecall
        \\li t0, -9; bne a0, t0, 9f
        \\li a0, 1; li a1, 0x90000000; li a2, 1; li a7, 64; ecall
        \\li t0, -14; bne a0, t0, 9f
        // read on write-only stdout is EBADF.
        \\li a0, 1; la a1, read_buffer; li a2, 1; li a7, 63; ecall
        \\li t0, -9; bne a0, t0, 9f
        \\la t2, post_return; li t3, 0x25b1; sd t3, 0(t2)
        \\li a0, 37; li a7, 94; ecall
        \\9: unimp
        \\j 9b
    );
}
