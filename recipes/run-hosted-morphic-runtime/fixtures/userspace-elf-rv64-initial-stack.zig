export var initialized_data: u64 = 0x23da_7a11_5eed_c0de;
export var zero_bss: u64 = 0;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile (
        \\mv s0, sp
        \\andi t0, s0, 15
        \\bnez t0, 9f
        \\ld t0, 0(s0)
        \\li t1, 2
        \\bne t0, t1, 9f
        \\ld s1, 8(s0)
        \\ld s2, 16(s0)
        \\ld t0, 24(s0)
        \\bnez t0, 9f
        \\ld s3, 32(s0)
        \\ld s4, 40(s0)
        \\ld t0, 48(s0)
        \\bnez t0, 9f
        \\li t0, 6
        \\ld t1, 56(s0)
        \\bne t0, t1, 9f
        \\ld t1, 64(s0)
        \\li t0, 4096
        \\bne t0, t1, 9f
        \\li t0, 9
        \\ld t1, 72(s0)
        \\bne t0, t1, 9f
        \\ld t1, 80(s0)
        \\la t0, _start
        \\bne t0, t1, 9f
        \\li t0, 31
        \\ld t1, 88(s0)
        \\bne t0, t1, 9f
        \\ld t1, 96(s0)
        \\bne s1, t1, 9f
        \\ld t0, 104(s0)
        \\bnez t0, 9f
        \\ld t0, 112(s0)
        \\bnez t0, 9f
        \\li t0, 0x80402000
        \\bltu s1, t0, 9f
        \\bltu s2, t0, 9f
        \\bltu s3, t0, 9f
        \\bltu s4, t0, 9f
        \\li t0, 0x80403000
        \\bgeu s1, t0, 9f
        \\bgeu s2, t0, 9f
        \\bgeu s3, t0, 9f
        \\bgeu s4, t0, 9f
        \\la a0, expected0
        \\mv a1, s1
        \\jal ra, equal
        \\beqz a0, 9f
        \\la a0, expected1
        \\mv a1, s2
        \\jal ra, equal
        \\beqz a0, 9f
        \\la a0, expected2
        \\mv a1, s3
        \\jal ra, equal
        \\beqz a0, 9f
        \\la a0, expected3
        \\mv a1, s4
        \\jal ra, equal
        \\beqz a0, 9f
        \\la t2, initialized_data
        \\ld t0, 0(t2)
        \\li t3, 0x23da7a115eedc0de
        \\bne t0, t3, 9f
        \\la t2, zero_bss
        \\ld t1, 0(t2)
        \\bnez t1, 9f
        \\li t1, 0x23b55a5aa55ac33c
        \\sd t1, 0(t2)
        \\li a0, 0x24b0
        \\li t0, 0x24b024b024b024b0
        \\ecall
        \\9: unimp
        \\j 9b
        \\equal:
        \\lbu t5, 0(a0)
        \\lbu t6, 0(a1)
        \\bne t5, t6, 2f
        \\addi a0, a0, 1
        \\addi a1, a1, 1
        \\bnez t5, equal
        \\li a0, 1
        \\ret
        \\2: li a0, 0
        \\ret
        \\expected0: .asciz "alpz-24b"
        \\expected1: .asciz "stack-proof"
        \\expected2: .asciz "ALPZ_BATCH=24B"
        \\expected3: .asciz "MODE=qemu-proof"
    );
}
