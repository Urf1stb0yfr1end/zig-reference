# Agentic Snowball Batch 32D handoff

## State and implementation

- Inherited working-tree SHA: `0783083ee010f55211afdff96c869eb06acb1da1` (the plan's inherited main frontier remains `7e9d55db4d30312d11d0e21e4943237adc4481ff`).
- `ResourceTable.Description` now carries backend-owned scalar state. `setState` advances it only through a generation-checked resource reference, so aliases share one stream position while independently created resources do not share a global cursor.
- The deterministic stdin fixture now reads and advances its resource's state. Its bytes and expected nine-byte cursor boundary are unchanged.
- A namespace-backed `/bin/sh` invocation without `argv[1]` binds fd 0 to a live platform backend. That backend blocks on SBI legacy console getchar and performs a one-byte checked copy to user memory. fd 1/fd 2 already use SBI legacy console putchar; writes now continue after the bounded diagnostic capture fills.
- Linux syscall numbers, descriptors, errno translation, Alpine paths, and RISC-V register decoding remain outside the neutral resource table. SBI details remain in the freestanding platform backend.

## Measured validation and Alpine retry

- `zig build test-bounded-resource-table`: PASS under Zig 0.14.0, including the new alias/shared-state proof.
- `zig build install-freestanding-riscv64-morphic-runtime --prefix /tmp/zigref32d`: PASS under Zig 0.14.0.
- `python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py`: NOT RUN to completion; the verifier failed closed before execution because `qemu-system-riscv64` is not installed.
- `zig fmt --check build.zig projects recipes conformance`: PASS.
- `zig build check`: BLOCKED by the missing repository `.venv` and missing `node`; its command-reference subcheck passed and dependency-graph check reported an acyclic graph.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check`: PASS (executed by the aggregate before its environment failures).
- Exact Alpine `/bin/sh` interactive retry: NOT RUN for the same environment limitation. No prompt, banner, shell output, ioctl, or unsupported syscall result is claimed.
- PREPARE/COMMIT and W+X=0 were not weakened by these changes; Batch 32C evidence is preserved, but runtime re-verification requires QEMU.

## Causal handoff

The process-I/O resource and live console path compile, but machine execution is not measurable in this environment. The **one next causal blocker** is: install/provide `qemu-system-riscv64`, then run the documented no-`argv1` exact Alpine `/bin/sh` machine and capture its first real runtime failure.

## Final status

| Result | Status |
|---|---|
| Batch 32C real Alpine regression | NOT RUN |
| exact namespace identity | NOT RUN (preserved implementation) |
| process I/O resource | PASS |
| fixture/live backend separation | PASS |
| deterministic fixture regression | NOT RUN (QEMU unavailable) |
| live QEMU console input | NOT RUN |
| fd0 live input | NOT RUN |
| fd1/fd2 console output | NOT RUN |
| real Alpine `/bin/sh` entered | NOT RUN |
| real musl interpreter-first | NOT RUN |
| PREPARE/COMMIT | NOT RUN (preserved implementation) |
| W+X=0 | NOT RUN (preserved implementation) |
| persistent interactive shell | NOT RUN |
| `echo morphic` round-trip | NOT RUN |
| `pwd` | NOT RUN |
| `ls /` | NOT RUN |
| `cat /etc/alpine-release` | NOT RUN |
| writable `/tmp` | NOT RUN |
| redirection | NOT RUN |
| pipe | NOT RUN |
| repository validation | BLOCKED (missing `.venv` and `node`) |
| remote persistence | BLOCKED (no Git remote configured) |
