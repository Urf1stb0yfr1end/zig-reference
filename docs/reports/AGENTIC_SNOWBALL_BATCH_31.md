# Agentic Snowball Batch 31: preserved BusyBox frontier

## Scope and result

This checkpoint preserves safe evidence from an unsuccessful exact-static-BusyBox attempt. It does **not** claim Batch 31 completion or that BusyBox `true`, `echo`, or `sh` ran under Morphic. No experimental capacity or address-layout change is retained.

## Exact artifact pressure

The pressure artifact remains Alpine v3.22 `busybox-static-1.37.0-r20.apk` (SHA-256 `29072f0a72ff8f2ff19a8be703cf0e68d4722ea4dc0acf4830acc932f98cf31c`), executable `bin/busybox.static` (SHA-256 `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`). The new bounded inspector measured two `PT_LOAD` segments:

- RX: offset `0`, virtual address `0x10000`, file/memory size `0xedd48`;
- RW: offset `0xee2f0`, virtual address `0xfe2f0`, file size `0x303d`, memory size `0x4e00`.

Their union materializes 244 unique 4 KiB load pages with zero W+X pages. The separately prepared initial-stack page makes the complete machine candidate pressure 245 pages. Thus 245 is derived pressure, not a permanent Morphic constant.

## Failed attempt and causal discovery

The initial experiment replaced the historical four-page inline materializer/backing with a larger compile-time array. That is not independently safe: the arrays live in the kernel image, so growing them moved the image into the inherited `0x8040_0000` fixture/test virtual-address range. Attempts to relocate the storage exposed additional identity-mapping and Sv39 table-backing requirements. The unsafe edits were discarded.

The exact BusyBox build reached ELF planning and materialization in experimental runs. The next attempted phase was Sv39 PREPARE table preflight; no BusyBox command completed. This confirms that a correct repair needs a distinct bounded machine reservation/layout policy for candidate image backing and all required page-table backing before destructive COMMIT.

## Permanent advancement

`tools/inspect-elf-prepared-image.py` converts external ELF pressure into deterministic reviewable facts without vendoring the binary. It validates ELF64 identity, program-header bounds, source ranges, `filesz <= memsz`, unique page union, and W+X pressure. Its synthetic regression covers shared-page permission union and malformed/truncated load segments.

## Preserved guarantees and non-claims

The committed runtime is unchanged. Existing `ExecPlan -> MaterializedImage -> PREPARE/COMMIT -> Sv39 -> U-mode`, exact final permissions, W+X=0 behavior, and exact static-musl proof are therefore not weakened. This report does not claim any of the three BusyBox ladder commands passed.

## Exact next step

Introduce a distinct, bounded, replaceable machine-adapter reservation for candidate load pages and stack backing outside both the ordinary kernel image and inherited user fixture ranges. PREPARE must also reserve the Sv39 intermediate-table backing required for those ranges. Add a focused insufficient-capacity proof that the live image remains intact, rerun the exact static-musl proof, and only then retry the exact BusyBox artifact beginning with `busybox.static true`.
