export var initialized_data: u64 = 0x23da_7a11_5eed_c0de;
export var zero_bss: u64 = 0;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\la t2, initialized_data
        \\ld t0, 0(t2)
        \\li t3, 0x23da7a115eedc0de
        \\bne t0, t3, 1f
        \\la t2, zero_bss
        \\ld t1, 0(t2)
        \\bnez t1, 1f
        \\li t1, 0x23b55a5aa55ac33c
        \\sd t1, 0(t2)
        \\li a0, 0x2300
        \\ecall
        \\1: unimp
        \\j 1b
    );
}
