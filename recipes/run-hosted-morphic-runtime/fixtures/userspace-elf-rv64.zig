pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\li a0, 0x22b0
        \\li t0, 0x22b1
        \\li t1, 0x22b2
        \\ecall
        \\1: unimp
        \\j 1b
    );
}
