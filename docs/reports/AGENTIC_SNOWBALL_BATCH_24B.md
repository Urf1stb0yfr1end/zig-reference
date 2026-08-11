# Agentic Snowball Batch 24B — real RV64 Linux initial stack

## Result

PASS. Work began at `15174a114e1ba19ecb882b0833645d5c998c29fb` (the only delta from the historical Batch 24A merge was this checked-in plan). The implementation revision is the commit containing this report.

## Frozen requirement/capability map

| Requirement | Reused truth / work |
|---|---|
| ELF planning and `e_entry` | project 54, reused |
| startup image/layout policy | project 55, reused unchanged |
| explicit S→U SP and trusted ECALL return | existing Batch 23 machine boundary, composed |
| bounded transfer and U RW/NX mapping | project 53 and existing physical backing, composed |
| sanitization/materialization | new orchestration: zero all 4096 stack bytes, copy and byte-compare the planner image |
| independent U parser | new two-segment ELF fixture |
| strict external proof/mutations/two machines | new verifier composing Batch 23 |

No new reusable module was needed.

## Exact fixture and proof

The separately linked RV64 ET_EXEC has one R-X `PT_LOAD` at `0x80401000` and one RW- `PT_LOAD` at `0x80403000` with non-empty BSS. Project 55 receives `argv=["alpz-24b","stack-proof"]`, `envp=["ALPZ_BATCH=24B","MODE=qemu-proof"]`, and ordered auxv `AT_PAGESZ=4096`, `AT_ENTRY=e_entry`, `AT_EXECFN=argv[0]` (followed by planner-owned `AT_NULL,0`). Both machines observed `initial_sp=used_start=0x80402f50`, `used_end=0x80403000`, and 176 exact bytes.

The naked U entry observes architectural SP, validates 16-byte alignment, argc, ordered argv/envp pointers and NULLs, ordered auxv and AT_NULL, pointer range and exact NUL-terminated strings, AT_ENTRY against `_start`, and AT_EXECFN pointer identity. It also preserves Batch 23 initialized-data/BSS checking and writes the Batch 23 BSS marker before its unique ECALL. Supervisor evidence establishes cause 8, SPP=0, exact artifact-derived ECALL PC, exact SP and markers, U R-X code, U RW/NX stack/data, W+X=0, unchanged planner bytes, and trusted return.

The strict Python verifier independently parses ELF64 little-endian ET_EXEC/EM_RISCV and both PT_LOADs, locates the unique ECALL, independently constructs the frozen image, requires exact emitted bytes and relationships, composes Batch 23, rejects mutations of argc, image bytes, SP, stack execute permission, trap cause, and success marker, and compares two independent QEMU processes plus hosted/fake/machine Morphic output.

## Sanitization and limits

Immediately before materialization, orchestration zeros and thereby sanitizes the entire existing 4096-byte physical stack frame, copies the exact 176 planner bytes at planner `initial_sp`, and compares every byte before entry and after return. This proves that one frame at this boundary; it is not a general allocator sanitization guarantee.

## Snowball Yield

Reused projects 53/54/55, the Batch 23 two-segment load and trap composition, existing page tables, and prior strict parser chain. New reusable modules: 0. New work is fixture/build/kernel/verifier orchestration. Source reads and executed commands are recorded in this report and the final handoff; unavailable universal productivity quantities remain `unmeasured`.

## Nonclaims and next pressure

This does not claim general Linux `create_elf_tables`, arbitrary argv/env, ASLR, AT_RANDOM, HWCAP, VDSO, PT_INTERP, PIE, dynamic linking, libc/musl startup, syscalls/errno/FD/VFS, mmap/brk/execve, processes/fork/clone, signals/futex/threads, BusyBox, Alpine, nested QEMU, KVM/H-extension, or a secure general loader. Batch 25 syscall ABI work was not begun. The next pressure is the separately planned minimal syscall boundary.
