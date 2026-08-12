OUTPUT_ARCH(riscv)
ENTRY(_start)

SECTIONS {
  . = 0x80200000;
  __image_begin = .;
  __text_domain_begin = .;
  .text : {
    *(.text.entry)
    . = ALIGN(4);
    *(.text.usertrap)
    . = ALIGN(4);
    *(.text.user_service_trap)
    . = ALIGN(4);
    *(.text.enteruser)
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
    . += 60K;
    __supervisor_stack_top = .;
    __user_trap_stack_begin = .;
    /* Real file/ELF syscall composition has deeper bounded call chains than
       the original register-only probe. Keep a distinct supervisor-only
       trap stack and make its bound explicit rather than overflowing it. */
    . += 16K;
    __user_trap_stack_end = .;
    __user_trap_stack_top = .;
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
