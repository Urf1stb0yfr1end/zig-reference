OUTPUT_ARCH(riscv)
ENTRY(_start)

PHDRS {
  text PT_LOAD FLAGS(5);
}

SECTIONS {
  . = 0x80401000;
  .text : ALIGN(4) { *(.text.entry) *(.text .text.*) } :text
  .rodata : ALIGN(4) { *(.rodata .rodata.*) } :text
  /DISCARD/ : { *(.comment) *(.riscv.attributes) *(.eh_frame*) }
}
