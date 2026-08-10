# Agentic Snowball Batch 22B — first real RV64 userspace ELF execution

## Scope and starting truth

Starting revision: `29d42b0209541954f973e8de801c401b538b875a` on branch `work`; Zig baseline 0.14.0. The checked-out revision adds only the Batch 22B plan over the Batch 22A baseline. This batch consumes `bounded-elf64-load-plan` as the sole kernel ELF policy authority and does not begin Batch 23.

## Frozen requirement/capability map

| Requirement | Start classification | Result |
|---|---|---|
| RV64 ELF policy and failure-atomic planning | existing module: `bounded-elf64-load-plan` | reused directly |
| allocator-owned user code/stack frames, Sv39 U RX/RW leaves, trusted S→U→S path | existing `run-hosted-morphic-runtime` composition | reused unchanged |
| strict resource/PTE/Morphic proof chain | existing Batch 21C composition/verifier | composed, not rewritten |
| independently built fixture, embedding, copy, FENCE.I, entry and bounded evidence | project-specific orchestration | added |
| generic loader, writable ELF segment/BSS, Linux startup/ABI | out of scope | deferred |

No missing generally reusable capability was discovered and no new module was created.

## What was proved

The source `recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64.zig` is separately compiled and linked by `userspace-elf-rv64.ld`; the single emitted artifact is both installed for independent inspection and embedded in the kernel build. Its ELF64 little-endian RV64 ET_EXEC plan has one R-X PT_LOAD at `0x80401000`, `p_filesz == p_memsz == 26`, alignment 4096, zero BSS, and `e_entry == 0x80401000`.

The kernel passes the exact embedded file to `bounded-elf64-load-plan.plan(1, ...)`, copies only the returned source range to the existing allocator-owned user code frame, exact-compares it through matching FNV-1a digests, retains the U RX leaf and U RW/NX stack leaf, changes no PTE, executes one local `FENCE.I` and no new `SFENCE.VMA`, and supplies `LoadPlan.entry` to the established SRET path.

The guest establishes `a0=0x22b0`, `t0=0x22b1`, and `t1=0x22b2`, then issues its unique ECALL. Two real QEMU machines trapped cause 8 at the independently reconstructed guest ECALL PC on the existing trusted supervisor trap frame and reached the known supervisor continuation. Allocated-frame count, page-table-frame count, SATP/root, code/stack physical frames, two U leaves, and zero W+X leaves were conserved. Hosted, fake, and both machine Morphic artifacts remained exactly 765 bytes and equal.

## Validation

- `zig build test-bounded-elf64-load-plan` — PASS.
- `zig build smoke-bounded-elf64-load-plan` — PASS.
- `python3 tools/verify-freestanding-riscv64-user-memory-transfer.py --self-test` — PASS after installing QEMU 8.2.2 in the execution environment.
- `python3 tools/verify-freestanding-riscv64-userspace-elf.py --self-test` — PASS; one real fixture and decisive relationship mutations rejected.
- `python3 tools/verify-freestanding-riscv64-userspace-elf.py` — PASS; two real QEMU machines.
- `PYTHONDONTWRITEBYTECODE=1 python3 tools/check-command-reference.py --check` — PASS.
- `python3 tools/developer-command.py validate-repository` — PASS (final counts are recorded in the command output and completion handoff).

## What is still not claimed

This is not Linux userspace ABI compatibility; argc/argv/envp/auxv startup; a multiple-segment general loader; writable ELF data/BSS machine proof; PT_INTERP, dynamic linking, or relocation support; libc or musl; Linux syscalls; process creation or execve; VFS; mmap/brk; signals, futexes, or threads; BusyBox, Alpine, nested QEMU, or KVM.

## Snowball Yield

composition: first real RV64 userspace ELF execution
base commit: `29d42b0209541954f973e8de801c401b538b875a`
Zig baseline: 0.14.0
requirements at start: 5 (table above)
existing-module requirements: 1 (`bounded-elf64-load-plan`)
existing-composition/recipe requirements: 2 (machine boundary; Batch 21C strict chain)
missing reusable capabilities: 0
project-specific orchestration requirements: 1
out-of-scope requirements: 1 group
requirements discovered during run: 0
existing modules actually reused: `bounded-elf64-load-plan` and its declared closure
existing recipes/compositions actually reused: `run-hosted-morphic-runtime`, Batch 21C verifier chain
new reusable modules created: 0
new reusable recipes/compositions created: 0
known diagnostic lookups used: 0
unknown diagnostic lookups: 0
new evidenced diagnostics added: 0
source reads required for ordinary reuse: unmeasured
focused validations executed: 5
aggregate validations executed: 1
unmeasured fields: token/time savings
notes: all new implementation is bounded fixture/build/machine-verification orchestration.

## Next pressure

Plan Batch 23 from this evidence: consider one deliberately bounded writable PT_LOAD/BSS process-image pressure while preserving this exact first-execution proof. Do not implement it as part of Batch 22B.
