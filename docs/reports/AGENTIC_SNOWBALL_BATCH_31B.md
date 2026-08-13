# Agentic Snowball Batch 31B: distinct prepared-image reservation

## Strongest frontier

Level 1 is implemented: the neutral executor can materialize a bounded candidate directly into caller-owned page backing, and the RISC-V machine adapter places 256 candidate pages, one candidate stack page, and four PREPARE-time Sv39 table pages in a distinct linker reservation beginning at `0x80600000`. The ordinary kernel image ends at `0x803a1000`, below the inherited `0x80400000` fixture window.

The exact pinned `busybox.static` (SHA-256 `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`) successfully builds through the existing external-artifact transport. `readelf -lW` shows separate ordinary RW and reservation `PT_LOAD` segments; no load segment spans the fixture window. Runtime execution was not attempted because `qemu-system-riscv64` is absent, so this report does not claim PREPARE/COMMIT, U-mode, `true`, `echo`, or shell success.

## Safety boundary

`PreparedImage.prepare` fails with `CapacityExceeded` before live mapping mutation when either metadata or caller backing is insufficient. Its focused test also covers complete RX/RW page materialization, BSS zeroing, and W+X exclusion. The machine path materializes all load pages and the initial stack in reserved backing, then preflights temporary Sv39 leaves before COMMIT. COMMIT installs only already-backed leaves with final permissions.

The historical four-page Batch 26 inline path remains unchanged. The exact static-musl runtime verifier could not execute in this environment because QEMU is absent; the freestanding kernel build succeeds under Zig 0.14.0.

## Exact next action

Run `python3 tools/verify-freestanding-riscv64-external-artifact-transport.py --self-test` on a host with `qemu-system-riscv64`, then run the same exact BusyBox artifact beginning with `busybox.static true`. If PREPARE fails, preserve its first diagnostic and repair only that boundary; do not enlarge inline arrays.
