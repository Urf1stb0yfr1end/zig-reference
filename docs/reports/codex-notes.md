# Codex Notes

## Batch 12 — resumable supervisor trap

- The existing freestanding Morphic payload now takes one real delegated S-mode
  breakpoint exception through its own direct `stvec`, restores its declared
  integer context, returns with `sret`, and only then runs the unchanged Morphic
  scenario.
- A first executable linked the newly introduced trap routine at the conventional
  firmware load address even though the ELF header entry pointed later; explicit
  entry/trap sections now keep `_start` at `0x80200000`. This is why entry ordering
  and ELF identity remain mechanical verifier obligations.
- QEMU 8.2.2/OpenSBI 1.3 executed the path twice with cause 3, interrupt false,
  resume delta 4, preservation probes PASS, and identical 765-byte Morphic output.
  Ordinary CI still does not imply this execution-lab proof.

## Issues

### Batch 10 — RISC-V Execution Probe / PR #30

- The first Batch 10 starter incorrectly assumed the Codex task would have `~/dev/zig-reference` and a usable `origin`. The supplied task checkout was actually `/workspace/zig-reference` on branch `work` with no configured remote. The first run stopped before making changes, which was the correct response to that original instruction.
- The Batch 10 plan was then repaired so a supplied checkout without a remote is authoritative and absence of `origin` is recorded rather than treated as a blocker.
- The successful Batch 10 authoring run used the supplied checkout at base commit `edccfd47839e1b15ed8be790edb418f82dea417e`, Zig 0.14.0, and produced the cross-target execution proof now published in PR #30.
- The technical result is narrow and useful: the existing Morphic `runCore` was compiled as `riscv64-linux-musl` without a RISC-V-specific semantic copy; native hosted, native fake, and two QEMU riscv64 executions produced the same 765-byte canonical artifact. The PR adds zero reusable modules, zero recipes, and zero target-specific Zig source files.
- Process defect: the authoring agent provisioned QEMU with `apt-get update && apt-get install -y qemu-user`. The Batch 10 request explicitly said to stop if the only path required privileged package installation. Therefore the real RISC-V execution evidence is technically credible, but the run did not satisfy that particular process constraint and should not be treated as a perfect execution of the request.
- Publication defect: the Batch 10 execution request explicitly said not to commit, push, or open a PR, so the agent correctly ended with `AGENTIC SNOWBALL BATCH 10 PASSED` while leaving the work uncommitted. A later publication follow-up first spent its response dumping the full generated diff instead of publishing. A second publication instruction preserved the existing worktree and produced PR #30 rather than redoing the batch.
- Audit of PR #30 found the implementation structurally consistent with the intended Snowball result. `build.zig` adds only a cross-install step for the same executable, and `tools/verify-riscv64-morphic-runtime.py` cross-compiles it, checks RISC-V ELF identity, runs hosted/fake and QEMU execution twice, and performs raw byte equality checks before the Developer Minimus handoff.
- GitHub Actions run 171 passed the normal repository workflow, including formatting, contracts, smoke, recipes, conformance, property, fuzz-smoke, differential, tests, repository validation, policy, and secret checks. The workflow intentionally does not install QEMU or run `tools/verify-riscv64-morphic-runtime.py`, so GitHub CI independently proves normal repository integrity but does not independently reproduce the cross-ISA execution claim.
- The large `generated/validation/modules.json` diff is expected in this repository because `build.zig` is part of each module's validation source set and the evidence was regenerated after the Batch 10 build change. It should not be mistaken for dozens of semantic module edits.
- Non-blocking robustness note: the verifier currently recognizes `readelf` machine identity using an exact padded English line (`Machine:                           RISC-V`). A future cleanup can parse the `Machine:` field without depending on spacing. This does not invalidate the recorded QEMU 8.2.2 execution.

### Audit disposition

PR #30 is technically suitable to merge as the historical Batch 10 execution probe, provided the process defect above remains recorded. The next machine-execution batch should make emulator provisioning an explicit approved prerequisite or put the RISC-V execution verifier in a dedicated CI/profile job before claiming a fully reproducible PASS. Do not silently repeat privileged package installation when a batch forbids it.
