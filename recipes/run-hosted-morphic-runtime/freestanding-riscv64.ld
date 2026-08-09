OUTPUT_ARCH(riscv)
ENTRY(_start)

SECTIONS {
  . = 0x80200000;
  __image_begin = .;
  __text_domain_begin = .;
  .text : {
    *(.text.entry)
    . = ALIGN(4);
    *(.text.trap)
    *(.text .text.*)
  }
  . = ALIGN(4096);
  __text_domain_end = .;
  __rodata_domain_begin = .;
  .rodata : { *(.rodata .rodata.*) }
  . = ALIGN(4096);
  __rodata_domain_end = .;
  __writable_domain_begin = .;
  .data : { *(.data .data.*) }
  .bss (NOLOAD) : {
    *(.bss .bss.* COMMON)
    . = ALIGN(16);
    __stack_bottom = .;
    . += 64K;
    __stack_top = .;
  }
  .physical_page_pool (NOLOAD) : ALIGN(4096) {
    __physical_page_pool_begin = .;
    . += 8 * 4096;
    __physical_page_pool_end = .;
  }
  __writable_domain_end = .;
  __image_end = .;
}
