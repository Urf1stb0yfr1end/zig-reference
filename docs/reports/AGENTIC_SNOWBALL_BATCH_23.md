# Agentic Snowball Batch 23 — first writable RV64 userspace ELF data + BSS

## Scope and starting truth

Starting revision: `16a176dc7be423e8e5f0c8d0096b87aa491dbf67` on branch `work`; Zig baseline 0.14.0. The checked-out revision contained the Batch 23 plan over merged Batch 22B. This batch preserves the settled Batch 22A planner policy and executes the historical Batch 22B proof independently before the new proof. It does not begin Batch 24.

## Frozen requirement/capability map

| Requirement | Start classification | Result |
|---|---|---|
| RV64 ELF admission and failure-atomic load planning | existing module: `bounded-elf64-load-plan` | reused unchanged with capacity 2 |
| allocator-owned physical frames, Sv39 U leaves, trusted S→U→S trap path | existing `run-hosted-morphic-runtime` composition | reused |
| exact executable loading and strict Batch 22B proof | existing Batch 22B composition/verifier | preserved and executed independently |
| two-segment fixture, exact writable copy/zero, RW/NX mapping, mutation evidence | project-specific orchestration | added |
| Linux process ABI and general ELF loading | out of scope | deferred |

No missing generally reusable capability was discovered; no new module was created.

## Exact machine proof

`userspace-elf-rv64-data-bss` is a separately built, stripped, static RV64 ELF64 little-endian ET_EXEC artifact. It has exactly two ordered PT_LOAD entries: R-X `[0x80401000, 0x80401066)` with 102 file/memory bytes and e_entry `0x80401000`, and RW- `[0x80403000, 0x80403010)` with 8 file bytes, 16 memory bytes, and therefore exactly 8 non-empty BSS bytes. Both have alignment 4096; there is no interpreter, dynamic linking, TLS, relocation processing, or Linux initial stack.

The kernel supplies the exact embedded artifact to `bounded-elf64-load-plan`. It copies and directly compares all 102 executable bytes into the existing code frame, copies and directly compares all 8 initialized writable bytes into one newly allocated frame, zeros exactly the planner's 8-byte tail, and directly checks that tail before entry. It adds exactly one U RW/NX 4 KiB leaf at `0x80403000`, reuses the existing four page-table frames, executes global SFENCE.VMA for that real translation change, and executes FENCE.I only for the changed executable frame. The code leaf remains U R-X, the stack and data leaves remain U RW/NX, U leaf count becomes 3, and W+X remains 0. Allocation changes from 7 to 8; page-table count remains 4; SATP/root remain unchanged.

Starting at planner-derived e_entry in real U-mode, the guest loads initialized value `0x23da7a115eedc0de`, requires the BSS word to be zero, stores `0x23b55a5aa55ac33c` into that same BSS word, and issues its unique ECALL with marker `a0=0x2300`. The trusted supervisor trap records cause 8, SPP=0, the independently reconstructed ECALL PC `0x8040105e`, initialized marker in `t0`, mutation marker in `t1`, and then directly observes the mutation in the same allocator-owned physical frame. The executable bytes remain unchanged and supervisor continuation is reached.

## Validation results

The strict Batch 22B self-test and full two-QEMU verifier passed independently with its original one-R-X-segment artifact, U=2, W+X=0, and Morphic 765 bytes. The Batch 23 self-test passed one real fixture and rejected decisive evidence mutations. The Batch 23 full verifier passed two independent QEMU 8.2.2 machines with identical two-segment/data/BSS/mutation relationships and exact hosted/fake/two-machine Morphic equality at 765 bytes. Focused planner tests, command-reference checking, `zig build check`, and complete repository validation were also executed successfully under Zig 0.14.0.

## Explicit nonclaims

Batch 23 does not claim Linux userspace ABI compatibility; argc/argv/envp/auxv or an initial process stack; arbitrary many-segment loading; relocations or PIE/ET_DYN; PT_INTERP or dynamic linking; libc/musl; Linux syscalls; processes, fork/clone/execve; VFS or file descriptors; mmap/brk; signals, futexes, or threads; BusyBox or Alpine; QEMU hosted inside Alpz; KVM; or hardware virtualization.

## Snowball Yield

composition: first writable RV64 userspace ELF data + BSS
base commit: `16a176dc7be423e8e5f0c8d0096b87aa491dbf67`
Zig baseline: 0.14.0
requirements at start: 5 (table above)
existing-module requirements: 1 (`bounded-elf64-load-plan`)
existing-composition/recipe requirements: 2 (machine boundary; Batch 22B strict proof)
missing reusable capabilities: 0
project-specific orchestration requirements: 1
out-of-scope requirements: 1 group
requirements discovered during run: 0
existing modules actually reused: `bounded-elf64-load-plan`, Sv39 entry/builder/invalidation, physical-frame allocator
existing recipes/compositions actually reused: `run-hosted-morphic-runtime`, Batch 22B verifier chain
new reusable modules created: 0
new reusable recipes/compositions created: 0
known diagnostic lookups used: 0
unknown diagnostic lookups: 0
new evidenced diagnostics added: 0
source reads required for ordinary reuse: unmeasured
focused validations executed: 8
aggregate validations executed: 1
unmeasured fields: token/time savings
notes: all new implementation is bounded fixture/build/machine-verification orchestration.

## Next pressure

The smallest actionable next pressure is Batch 24 planning from the proved two-segment writable image boundary. Do not infer Linux startup or syscall semantics from Batch 23.
