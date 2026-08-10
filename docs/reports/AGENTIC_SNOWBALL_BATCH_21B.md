# Agentic Snowball Batch 21B: real user copy-IN

Batch 21A supplied architecture-independent, bounded and failure-atomic user-range planning. Batch 21B composes that canonical planner with the active Sv39 builder query: raw leaf U/R/W permissions and physical backing become `PageResolution` values.

A relocation-safe U-mode probe writes the exact 16-byte payload `zig-user-memory!` to its existing RW/NX stack frame and passes pointer plus length in registers through a U-to-S ECALL. The trusted trap entry retains `csrrw sp,sscratch,sp` as its first instruction. With SUM clear, supervisor code plans the whole range before copying and reads only planner-produced physical segments. A fixed 32-byte scratch buffer begins poisoned; exact payload equality, exact coverage, and an unchanged tail are required before returning success with SRET. Resumed user code writes a marker and issues a distinct terminal ECALL back to a known supervisor continuation.

The integration reuses the Batch 19 code and stack frames and changes no PTE. It records unchanged allocator, page-table, SATP/root and leaf truth, U=2, W+X=0, local FENCE.I after code repopulation, and no SFENCE.VMA claim. The strict verifier reuses the Batch 20 parser and derives probe locations independently from the ELF.

This does not prove Linux `copy_from_user`, syscall dispatch, copy-OUT, page pinning, concurrent-remapping safety, fault recovery, processes, an ELF loader, VFS, mmap, signals, futexes, BusyBox, APK, or Alpine. Mapping lifetime remains the controlled single-machine phase; the planner does not freeze mappings.
