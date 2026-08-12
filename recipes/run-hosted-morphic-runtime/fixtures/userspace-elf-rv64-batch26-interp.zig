pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\li a0, 0x26b
        \\li a7, 93
        \\.global batch26InterpreterEcall
        \\batch26InterpreterEcall:
        \\ecall
        \\1: unimp; j 1b
    );
}
