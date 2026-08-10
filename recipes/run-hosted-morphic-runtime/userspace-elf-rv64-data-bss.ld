OUTPUT_ARCH(riscv)
ENTRY(_start)

PHDRS {
  text PT_LOAD FLAGS(5);
  data PT_LOAD FLAGS(6);
}

SECTIONS {
  . = 0x80401000;
  .text : ALIGN(4) { *(.text.entry) *(.text .text.*) } :text
  .rodata : ALIGN(4) { *(.rodata .rodata.*) } :text
  . = 0x80403000;
  .data : ALIGN(8) { *(.data .data.* .sdata .sdata.*) } :data
  .bss : ALIGN(8) { *(.bss .bss.* .sbss .sbss.*) *(COMMON) } :data
  /DISCARD/ : { *(.comment) *(.riscv.attributes) *(.eh_frame*) }
}
