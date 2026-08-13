# Agentic Snowball Batch 31E: green recovery and auxiliary-vector repair

## Base, recovery, and persistence

This run started from request head `fd6f6b0d2c44735d42dc61d2f56e1d69c11f14b3` (current main content in the supplied checkout). Canonical unit and smoke evidence was regenerated with `PYTHONDONTWRITEBYTECODE=1 python3 tools/record-validation.py --level all`. `zig fmt --check build.zig projects recipes conformance` passed. `zig build check` reached 70/74 steps with all 30 tests passing, then failed because Node.js is absent; the Node-backed port-contract and repository-index checks could not run. Recovery commit `471d280403b0a87effaf8dfb2d015c28ed1c38e8` exists locally.

The supplied checkout has no configured Git remote, so both `git push -u origin codex/batch31e-green-recovery-busybox-shell` and remote-head verification failed with `origin does not appear to be a git repository`. Consequently no remote branch or draft PR could be created from this environment. This platform/tooling failure is recorded in the failure ledger rather than being attributed to the Morphic mechanism.

## Artifact and runtime environment

The artifact-only pressure helper produced the exact Alpine v3.22 `busybox.static` SHA-256 `62831fb7c4a0da509481107a8aeb022244235c5dced18101e3d39131d303d704` and static-musl diagnostic SHA-256 `ff9761d82b7ae05bc577ea46acd4bd9119e29a28e9b1ccb621514df11fd8b74d`.

Neither Node.js, `qemu-system-riscv64`, nor `qemu-riscv64` exists in the supplied environment. The exact echo and shell machine retries, QEMU versions, runtime W+X count, static-musl machine result, BusyBox `true`, and fixed-mmap regression therefore remain unexecuted in this run. The inherited Batch 31D results are not relabeled as newly executed evidence.

## First causal divergence and neutral repair

Inspection of the external-process stack construction found the earlier state divergence: Morphic supplied `AT_PHDR` and `AT_ENTRY` but omitted Linux auxiliary-vector entry `AT_PAGESZ`. Golden Linux supplies the page size before BusyBox reaches allocator initialization. The missing process-start fact explains why the later allocator size can remain zero; changing the mmap edge would only hide that earlier divergence.

The repair adds `AT_PAGESZ=frames.PageSize` to the general external Linux process initial stack and updates the declared auxiliary-vector count. It introduces no BusyBox identity, PC, address, mmap length, or Linux mmap flag into Morphic mapping semantics. `zig build test-recipe-run-hosted-morphic-runtime` and focused Zig formatting pass with the repair.

## Exact frontier

The repair is coherent and focused but cannot be machine-validated here because both required QEMU executables are absent. Exact `busybox.static echo batch31e` and `busybox.static sh -c 'echo batch31e'` are therefore **not claimed to pass**. The first remaining action is to run the exact echo artifact under `qemu-system-riscv64`, verify `len=4096`, exact output/status, artifact identity, and W+X=0, then immediately retry the static shell. Dynamic musl and Alpine were not begun.
