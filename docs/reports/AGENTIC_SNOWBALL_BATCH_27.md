# Agentic Snowball Batch 27 pressure journal

## Frontier summary

This campaign started from `e9e82fd` after inspecting the Batch 26 closure merge
`549c9d9`. Batch 26 remains additive evidence and was not replaced. The farthest
honestly established Batch 27 level in this checkpoint is **Level 0 (pressure
harness)**. Golden Linux-user execution proves both selected external artifacts
are viable; it is not evidence that Morphic executed them.

## Pressure step 1: tiny real static musl diagnostic

- **Target:** `tools/fixtures/batch27-static-musl-diagnostic.c`, compiled by Zig
  0.14.0's real musl CRT/libc using `zig cc -target riscv64-linux-musl -static
  -Os -s`.
- **Exact artifact:** RV64 little-endian static `ET_EXEC`, SHA-256
  `ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`.
- **Before / baseline:** `qemu-riscv64` prints `batch27-static-musl` and exits
  successfully. This establishes that the exact diagnostic is runnable.
- **Morphic result:** not yet executed; no Level 1 claim.

## Pressure step 2: real static BusyBox immediately attacked

- **Target:** Alpine v3.22 `riscv64/busybox-static-1.37.0-r20.apk` from the
  canonical Alpine CDN.
- **Package SHA-256:**
  `29072f0a72ff8f2ff19a8be703cf0e68d4722ea4dc0acf4830acc932f98cf31c`.
- **Executable:** `bin/busybox.static`, real static RV64 `ET_EXEC`, SHA-256
  `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704`;
  entry `0x101d4`; two `PT_LOAD` segments; no `PT_INTERP` or `DT_NEEDED`.
- **Baseline invocation:** `qemu-riscv64 busybox.static sh -c 'echo batch27'`
  prints `batch27` and exits successfully.
- **Morphic result:** not yet executed; no Level 2 claim.

## First current Morphic boundary

The Batch 26 machine executor commits only the first planned main-image segment
into one physical page (`main_plan.load.items()[0]`) and likewise one interpreter
page. Both real pressure targets require multiple `PT_LOAD` segments, and
BusyBox's executable segment alone spans far more than one page. The first
required repair is therefore **neutral multi-page, multi-segment address-space
image materialization**, a permanent Morphic mechanism. Linux syscall policy is
not yet the first question because control cannot truthfully reach the real entry
point with the present one-page commit path.

No syscall was speculatively added and no success was stubbed. The next exact
retry is `python3 tools/pressure-real-rv64-userspace.py`, followed by the Morphic
machine target once the neutral materializer is wired into the executor. Dynamic
musl, dynamic BusyBox, Alpine, and apk were not reached in Morphic and are not
claimed.

## Reproducible harness

`python3 tools/pressure-real-rv64-userspace.py` compiles and fail-closed hashes
the tiny diagnostic, downloads and fail-closed hashes the pinned Alpine package
and extracted executable, and executes both under the golden Linux-user oracle.
`--artifact-only` performs acquisition and identity validation without executing
the oracle. Temporary external artifacts are never committed.
