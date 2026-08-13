# Agentic Snowball Batch 31D: bounded anonymous-mapping checkpoint

## Exact base and artifact

This checkpoint starts from main `99da43c2d2f2c4ce4b09bb6f8522db1247c5cdab` plus the Batch 31D request commit. The exact Alpine v3.22 `busybox.static` SHA-256 remains `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704` (package SHA-256 `29072f0a72ff8f2ff19a8be703cf0e68d4722ea4dc0acf4830acc932f98cf31c`). Runtime pressure used QEMU system emulation 8.2.2.

## Authoritative mmap classification

The installed kernel UAPI header `/usr/include/asm-generic/mman-common.h` defines `MAP_FIXED=0x10` and `MAP_ANONYMOUS=0x20`; `/usr/include/linux/mman.h` defines `MAP_PRIVATE=0x02`. Thus the observed `0x32` is exactly `MAP_PRIVATE | MAP_FIXED | MAP_ANONYMOUS`, and `prot=0` is a no-access fixed anonymous mapping. Linux-user `qemu-riscv64 -strace` confirms the exact sequence begins with:

```text
brk(NULL) = 0x104000
brk(0x106000) = 0x106000
mmap(0x104000,4096,PROT_NONE,MAP_PRIVATE|MAP_ANONYMOUS|MAP_FIXED,-1,0) = 0x104000
mmap(NULL,4096,PROT_READ|PROT_WRITE,MAP_PRIVATE|MAP_ANONYMOUS,-1,0) = <address>
```

The fixed request replaces a brk-backed page with a no-access reservation. The following non-fixed request requires real zeroed RW backing; the Linux oracle later writes nine bytes, unmaps that page, and exits zero.

## Neutral mechanism and Linux edge

`BoundedRuntimeMappings` now owns a fixed-capacity set of checked, page-aligned, half-open ranges. It rejects zero length, misalignment, overflow, overlap, exhaustion, external page collisions unless replacement is explicit, and W+X, without mutation on validation failure. It contains no Linux syscall, flag, or errno identity.

The RV64 Linux edge decodes syscall 222 and translates only the observed no-access fixed anonymous slice. Linux flag and errno values remain in that edge. Fixed placement removes an existing leaf only after the bounded reservation succeeds. No BusyBox hash, observed address, length, or flag set is a Morphic architectural constant.

The inherited brk origin is now page-rounded, matching the Linux oracle's `0x104000` initial result for this ELF rather than exposing the raw segment end `0x1030f0`.

## Exact commands and results

- `python3 tools/verify-freestanding-riscv64-external-artifact-transport.py --self-test`: PASS; exact static musl output/status, three pages, W+X=0, and identity mutation rejection.
- Exact `busybox.static true` machine build followed by `qemu-system-riscv64 -machine virt -nographic -bios default -kernel ...`: PASS; 12 syscalls, empty output, status 0, 244 pages, W+X=0.
- `zig build test-recipe-run-hosted-morphic-runtime`: PASS; includes the focused bounded mapping range, collision, capacity, overflow, atomicity, replacement, and W+X tests.
- Exact `busybox.static echo batch31d`: PARTIAL. PREPARE and COMMIT pass and the first mmap now returns `0x104000`. Echo still prints `echo: out of memory` and exits 1.

## First remaining blocker

After successful fixed no-access reservation, Morphic observes the following request as syscall 222 with `addr=0`, `len=0`, `prot=3`, and `flags=0x22`, and correctly returns `-EINVAL`. The golden oracle instead observes `len=4096` at that point. This argument divergence occurs before a general non-fixed anonymous RW mapping can be exercised. The next step is to causally locate why the BusyBox allocator computes/presents zero length under Morphic, repair that earlier state divergence, then retry the identical echo artifact. Shell was not attempted because echo did not pass. Dynamic musl and Alpine were not begun.

PREPARE/COMMIT remains intact, the exact artifact remains hash-pinned, and every reported machine result retains W+X=0.
