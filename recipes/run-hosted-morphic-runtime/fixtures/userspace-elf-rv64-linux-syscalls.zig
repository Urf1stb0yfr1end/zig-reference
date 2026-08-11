export var pre_ecall: u64 = 0;
export var post_return: u64 = 0;
export var zero_bss: u64 = 0;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\la t2, pre_ecall
        \\li t3, 0x25a0
        \\sd t3, 0(t2)
        // Unknown syscall, then exact Linux negative errno.
        \\li a0, 0x1111
        \\li a1, 0x2222
        \\li a2, 0x3333
        \\li a7, 0x7fff
        \\ecall
        \\li t0, -38
        \\bne a0, t0, 9f
        \\la t2, post_return
        \\li t3, 0x25a1
        \\sd t3, 0(t2)
        // write(1, frozen message, 24).
        \\li a0, 1
        \\la a1, batch25a_message
        \\li a2, 24
        \\li a7, 64
        \\ecall
        \\li t0, 24
        \\bne a0, t0, 9f
        // Invalid descriptor.
        \\li a0, 99
        \\la a1, batch25a_message
        \\li a2, 24
        \\li a7, 64
        \\ecall
        \\li t0, -9
        \\bne a0, t0, 9f
        // Invalid whole range.
        \\li a0, 1
        \\li a1, 0x90000000
        \\li a2, 24
        \\li a7, 64
        \\ecall
        \\li t0, -14
        \\bne a0, t0, 9f
        // exit_group(37), terminal.
        \\li a0, 37
        \\li a7, 94
        \\ecall
        \\9: unimp
        \\j 9b
        \\.global batch25a_message
        \\batch25a_message: .ascii "MORPHIC-LINUX-WRITE-25A!"
    );
}
