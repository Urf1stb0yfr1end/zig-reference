# Agentic Snowball Batch 21C — real user copy-OUT and atomic rejection

## Result

Batch 21C composes the existing `bounded-user-memory-transfer-plan` in `write_to_user` mode. The freestanding supervisor validates a complete U-mode range first and, only after a complete plan exists, copies the trusted 16-byte `kernel-to-user!!` payload through the plan's physical segments. The user probe observes all 16 bytes and unchanged surrounding guards while `sstatus.SUM` remains clear; S-mode never dereferences the original user VA.

The same four-trap probe obtains the real `NotWritable` result for `0x80401000`, the existing U RX page, with identical physical code guard snapshots. It then requests `[0x80402ff8,0x80403008)`: the first eight bytes resolve through the writable U stack leaf and the next page is unmapped. Planning returns `Unmapped` before the write loop is reachable, and both supervisor and resumed U-mode observe the exact unchanged `0x8877665544332211` prefix sentinel. No uncontrolled supervisor fault occurs.

## Executed evidence

- Zig: 0.14.0.
- QEMU: 8.2.2.
- Two independent `qemu-system-riscv64` executions passed.
- Four expected cause-8 U-origin ECALL traps occurred per machine through the trusted `csrrw sp,sscratch,sp` entry and supervisor-only trap frame.
- Allocated physical frames remained `7 -> 7`; page-table frames remained `4 -> 4`.
- `satp`, root, every raw PTE/leaf, and the existing user code/stack physical frames remained unchanged; no physical or page-table frame was added.
- Raw final leaf decoding remained U=2 and W+X=0.
- Local `FENCE.I` followed repopulation of the existing code frame; no SFENCE.VMA was claimed because no translation changed.
- Hosted, fake, QEMU-A, and QEMU-B Morphic artifacts were byte-identical at exactly 765 bytes.
- The strict mutation/rejection self-test and complete repository validation passed.

Batch 21 is mechanically complete only for this narrow native boundary: bounded real copy-IN, bounded real copy-OUT, permission rejection, later-page atomic rejection, SUM=0, physical-segment-only supervisor access, unchanged mappings/resources, and strict two-QEMU evidence.

## Nonclaims

This is not Linux `copy_from_user`/`copy_to_user`, EFAULT or fault-fixup semantics, concurrent-remapping safety, page pinning, demand paging, arbitrary process address spaces, a syscall table or Linux ABI, errno, a userspace ELF loader, `execve`, VFS/file descriptors, mmap/brk, signals, futexes, threads, procfs/sysfs/devfs, networking, BusyBox, musl, APK, Alpine boot, QEMU hosting, or KVM.
