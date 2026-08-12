OUTPUT_ARCH(riscv)
ENTRY(_start)
PHDRS { text PT_LOAD FLAGS(5); }
SECTIONS {
  . = 0x1000;
  .text : { *(.text.entry) *(.text*) } :text
  /DISCARD/ : { *(.riscv.attributes) *(.comment) *(.eh_frame*) }
}
