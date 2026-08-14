# Agentic Snowball Batch 32D handoff

## State and implementation

- Inherited working-tree SHA: `0783083ee010f55211afdff96c869eb06acb1da1` (the plan's inherited main frontier remains `7e9d55db4d30312d11d0e21e4943237adc4481ff`).
- `ResourceTable.Description` now carries backend-owned scalar state. `setState` advances it only through a generation-checked resource reference, so aliases share one stream position while independently created resources do not share a global cursor.
- The deterministic stdin fixture now reads and advances its resource's state. Its bytes and expected nine-byte cursor boundary are unchanged.
- The explicit `-Dexternal-rv64-live-console-input=true` build/runtime selection binds external-process fd 0 to a live platform backend independently of its argument vector. That backend blocks on SBI legacy console getchar and performs a one-byte checked copy to user memory. fd 1/fd 2 already use SBI legacy console putchar; writes now continue after the bounded diagnostic capture fills.
- Linux syscall numbers, descriptors, errno translation, Alpine paths, and RISC-V register decoding remain outside the neutral resource table. SBI details remain in the freestanding platform backend.

## Measured validation and Alpine retry

- `zig build test-bounded-resource-table`: PASS under Zig 0.14.0, including the new alias/shared-state proof.
- `zig build install-freestanding-riscv64-morphic-runtime --prefix /tmp/zigref32d`: PASS under Zig 0.14.0.
- `python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py`: FAIL under the installed system QEMU 8.2.2; see the PR #75 continuation result below.
- `zig fmt --check build.zig projects recipes conformance`: PASS.
- `zig build check`: PASS after provisioning the declared Python and Node dependencies.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check`: PASS (executed by the aggregate before its environment failures).
- Exact Alpine `/bin/sh` interactive retry: NOT RUN because the inherited deterministic QEMU regression floor did not validate. No prompt, banner, shell output, ioctl, or unsupported syscall result is claimed.
- PREPARE/COMMIT and W+X=0 were not weakened by these changes; Batch 32C evidence is preserved, but runtime re-verification requires QEMU.

## PR #75 review continuation

- Removed the argument-vector coupling: `external-rv64-live-console-input` is an explicit boolean option, defaults to the deterministic fixture, and is passed independently into the freestanding runtime.
- Added `setState` to the bounded-resource-table Zig port contract and regenerated the affected endpoint index.
- Regenerated all 60 canonical unit/smoke validation records using `python3 tools/python-environment.py tools/record-validation.py --level all`; no evidence was edited manually.
- Regenerated the port, repository, agent-facing, and dependency-graph textual views with their canonical generators.
- `zig build check`: PASS.
- `python3 tools/developer-command.py validate-repository`: PASS, 350/350 steps and 248/248 tests under Zig 0.14.0.
- After installing system QEMU 8.2.2, the Batch 25B verifier did not complete: the current machine stopped after `stdin-25b`, while an isolated inherited commit also failed earlier at its page-table owned-pool assertion. This environment-specific real-QEMU result is not reported as a Batch 32C or interactive-shell regression pass.

## Causal handoff

The process-I/O resource and live console path compile, but the inherited real-QEMU regression floor is not yet measurable as passing in this environment. The **one next causal blocker** is: determine why the Batch 25B verifier stops after `stdin-25b` under system QEMU 8.2.2 before retrying the explicitly live-console-backed exact Alpine `/bin/sh`.

## Final status

| Result | Status |
|---|---|
| Batch 32C real Alpine regression | NOT RUN |
| exact namespace identity | NOT RUN (preserved implementation) |
| process I/O resource | PASS |
| fixture/live backend separation | PASS |
| deterministic fixture regression | FAIL (system-QEMU verifier incomplete) |
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
| repository validation | PASS (350/350 steps, 248/248 tests) |
| remote persistence | BLOCKED (GitHub credentials unavailable; HTTPS push cannot prompt) |
