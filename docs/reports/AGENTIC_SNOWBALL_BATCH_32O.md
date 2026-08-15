# Agentic Snowball Batch 32O handoff

## Persistence boundary

This run inherited current local main content at
`7e0f8a88b733026014736c37be2bc91d65b4f8c9`; no remote was configured, so the
requested fetch could not execute. The coherent runtime repair is commit
`86a761350e3d4ed0eed0b351950e30b340e395ea`; this handoff documentation follows
it. Push and PR creation remain pending the repository's unavailable remote.

## Trap-stack repair and exact evidence

The service entry retains `csrrw sp,sscratch,sp` as its first instruction, so
the interrupted user SP is captured before any store. It then selects the
supervisor-owned trap-stack identity instead of trusting a serialized swapped-in
value. `enterUserService` records that identity, and every ordinary return
explicitly rearms `sscratch` from it before restoring user SP. The return still
clears SIE, SPIE, SPP, and SUM through the existing `0x40122` mask. No cat,
pathname, syscall-134, or PC special case was added.

Real QEMU 8.2.2 pressure used the verified Alpine v3.22.0 RV64 namespace (517
objects, 7,069,903 regular-file bytes, namespace SHA-256
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`). The
unchanged external cat child reported calls 96/135/135/134 with trap-stack top
`0x802c4150`, frame `0x802c4030`, and user SP values `0x80402720`,
`0x80402730`, `0x804027d0`, and `0x80402700`. The inherited supervisor entry
store fault at `sepc=0x8020006e`, `stval=0x804026f8` did not recur. This proves
the opening sscratch/trap-stack blocker crossed while SUM remains clear.

## New real-QEMU frontier

The exact sequence reached `cd /tmp` and `pwd -> /tmp`, then the unchanged real
BusyBox `cat /tmp/hello` crossed all four child setup calls and stopped at:

```text
ZIGREF_LINUX_EDGE_TRAP cause=000000000000000d sepc=0000000080206ace stval=00000000000000c8
```

ELF debug lookup resolves `0x80206ace` to `RealPageOwner.owns` at
`freestanding_riscv64.zig:228`; disassembly shows its first load is from offset
200 of a null owner pointer. This is a causally later supervisor page-table
owner/query-context failure. `cat` did not print `hello`, so runtime read-back,
pipeline pressure, and the one-shell Playable Alpine gate remain unearned.

## Validation and rejected hypotheses

Bootstrap passed. Doctor reported only the absent `.venv` Python interpreter;
Zig 0.14.0 and generated indexes were usable. Artifact acquisition, the focused
Morphic recipe test, exact namespace-backed freestanding build, formatting, and
diff checks passed. `zig build check` and command-reference validation passed.
Canonical repository validation was attempted and failed closed at agent-contract
validation because the same documented `.venv/bin/python` prerequisite was
absent; its property, fuzz-smoke, and differential prerequisites passed. Real
QEMU was installed and used; the old fault was first
reproduced before the repair and the new frontier was then reproduced.

The evidence continues to reject runtime-file lookup as the opening cause,
signal-syscall implementation as the minimum repair, retaining SUM, and a
cat/path/PC special case. W+X=0, PREPARE -> COMMIT, immutable source namespace,
bounded capacities, parent snapshot behavior, and SUM-clear policy were not
weakened.

Highest honestly earned milestone: the fork-child trusted trap-stack handoff is
repaired under real QEMU; external runtime read-back is not yet earned.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** preserve the live `RealPageOwner` / page-table
query context through the fork-child continuation that follows syscall 134,
then retry unchanged `cat /tmp/hello` before implementing pipelines.
