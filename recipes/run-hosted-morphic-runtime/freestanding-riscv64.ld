OUTPUT_ARCH(riscv)
ENTRY(_start)

SECTIONS {
  . = 0x80200000;
  .text : {
    *(.text.entry)
    . = ALIGN(4);
    *(.text.trap)
    *(.text .text.*)
  }
  .rodata : { *(.rodata .rodata.*) }
  .data : { *(.data .data.*) }
  .bss (NOLOAD) : {
    *(.bss .bss.* COMMON)
    . = ALIGN(16);
    __stack_bottom = .;
    . += 64K;
    __stack_top = .;
  }
}
