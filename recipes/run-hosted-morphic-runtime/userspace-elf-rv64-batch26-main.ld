OUTPUT_ARCH(riscv)
ENTRY(_start)
PHDRS {
  interp PT_INTERP FLAGS(4);
  text PT_LOAD FLAGS(5);
}
SECTIONS {
  . = 0x80406000;
  .interp : { KEEP(*(.interp)) } :interp :text
  . = ALIGN(16);
  .text : { *(.text.entry) *(.text*) } :text
  /DISCARD/ : { *(.riscv.attributes) *(.comment) *(.eh_frame*) }
}
