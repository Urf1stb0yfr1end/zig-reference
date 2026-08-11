# Agentic Snowball Batch 25A — Morphic operation boundary and Linux/RV64 syscalls

## Result

PASS. A real RV64 ET_EXEC starts with the unchanged project-55 process stack, executes five raw Linux ECALLs, returns through four exact `sepc + 4` U→S→U paths, and terminates through `exit_group(37)`. Linux identity is confined to the RV64 adapter; project 56 contains only semantic resource identity, guest address, write, terminate, success, failure, and terminal completion.

## Frozen requirement/capability map

| Requirement | Start classification | Final implementation |
|---|---|---|
| trap-register capture | existing composition | full `TrapFrame` and `userServiceTrapEntry` reused |
| Linux/RV64 decode and errno encode | project orchestration | thin switch/encoder in freestanding composition |
| ABI-neutral request/completion | missing reusable capability | project 56 |
| whole-range readable validation | existing module | project 53 `TransferPlan(2)` |
| stdout/stderr resolution | project orchestration | proof-only identities 1/2; other identities fail |
| returning and terminal paths | existing composition plus orchestration | existing SRET path, exact `sepc + 4`, supervisor terminal handoff |
| ELF/startup/mappings | existing modules/composition | projects 54/55 and Batch 24B unchanged |
| strict mutation/two-machine proof | project orchestration | Batch 25A verifier composing Batch 24B |
| FD table, VFS, mmap, execve, Wasm, Native ABI | out of scope | deferred |

## ABI facts and primary local sources

The adapter freezes generic Linux UAPI values `write=64`, `exit=93`, and `exit_group=94` from `/usr/include/asm-generic/unistd.h`; `EBADF=9` and `EFAULT=14` from `/usr/include/asm-generic/errno-base.h`; and `ENOSYS=38` from `/usr/include/asm-generic/errno.h`. RV64 Linux uses `a7` for the syscall number, `a0-a5` for the six ordinary arguments, and `a0` for the result/negative errno. The semantic project contains none of these identities.

## Generic operation API

`Request` is a tagged union of `write_bytes { destination: ResourceId, source: GuestAddress, byte_count }` and `terminate(status)`. `Completion` distinguishes `success(value)`, semantic `failure` (`invalid_resource` or `invalid_user_memory`), and `terminated(status)`. `execute` synchronously dispatches to a caller-owned backend without allocation or retained borrowing. Native, Wasm, non-RISC-V Linux, and the next FD-table layer can reuse or replace edge policy without changing this vocabulary; no compatibility for those future consumers is claimed.

## Machine sequence and exact proof

The ELF has R-X code and RW-/BSS data, starts at `0x80401000` with planner SP `0x80402f50`, writes U-owned pre/post sentinels, and judges all returned `a0` values itself. Ordered events are:

1. syscall `0x7fff` → semantic unsupported → `a0=-38`;
2. `write(1, artifact_message, 24)` → `write_bytes` → exact 24 bytes `MORPHIC-LINUX-WRITE-25A!` and `a0=24`;
3. `write(99, ...)` → invalid resource → `a0=-9`, no output;
4. `write(1, 0x90000000, 24)` → whole-range project-53 rejection → `a0=-14`, no output;
5. `exit_group(37)` → terminal completion 37, no U return.

Every returning event records cause 8, clear SPP, artifact-derived ECALL PC, resume PC exactly four bytes later, raw arguments, semantic identity, and Linux result. All three U leaves retain R-X/RW-NX truth, W+X remains zero, and allocation count, page-table count, and SATP remain unchanged. `exit(93)` and `exit_group(94)` both decode to the same semantic termination in compile-checked adapter coverage. There is no thread-group model, so their current terminal effect is intentionally identical; this is not complete Linux `exit_group` semantics.

## First divergence and repair

The recovered experiment exposed a real latent alignment dependency: growth shifted `userServiceTrapEntry` to an address whose low two bits were nonzero. `stvec` masks those bits, so the first service ECALL entered before the intended handler and recursively faulted while saving through a user SP. The linker now aligns and places `.text.user_service_trap` explicitly on a four-byte boundary. Bounded QEMU interrupt tracing identified the first U ECALL followed by supervisor store faults; after repair the raw gate and complete five-call path returned deterministically.

## Strict evidence and mutations

The verifier parses the ELF64 headers and both PT_LOADs, locates exactly five ECALL instructions and the unique message bytes, composes the full Batch 24B parser, parses structured event records, byte-compares output, and compares two independent QEMU processes plus hosted/fake/machine Morphic bytes. Self-test mutations reject syscall number/order, trap/resume PC, fd, pointer, count, message byte, write count, EBADF, EFAULT, ENOSYS, semantic identity, terminal status, cause, executable stack/W+X evidence, and inherited Batch 24B argc truth.

## Nonclaims

No full Linux syscall surface, general FD/resource table, read/openat/VFS, files, processes/thread groups, signals, futex/TLS, mmap/brk/mprotect, execve, pipes/poll, sockets, libc/musl, BusyBox, Alpine, stable Native Morphic ABI, Wasm/WASI, capability security, async I/O, VMM/KVM, or production readiness is claimed. The two-segment transfer capacity and bootstrap identities are bounded proof policy, not arbitrary Linux write or descriptor semantics.

## Snowball Yield

composition: Batch 25A Linux/RV64 syscall personality over Morphic semantics
base commit: `d940e5c495770b7e55b009105495b8cf31a6829a`
Zig baseline: 0.14.0

requirements at start: 14
existing-module requirements: 3 (projects 53, 54, 55)
existing-composition/recipe requirements: 5 (Batch 24B startup, copy-IN machinery, trap frame/return, Sv39 mappings, strict verifier chain)
missing reusable capabilities: 1 (semantic operation request/completion)
project-specific orchestration requirements: 5 (Linux decode, errno encode, bootstrap resolver/backend, fixture, verifier)
out-of-scope requirements: FD/VFS/mmap/execve/Wasm/Native ABI
requirements discovered during run: 1 (`stvec.BASE` handler alignment)

existing modules actually reused: 53, 54, 55
existing recipes/compositions actually reused: run-hosted-morphic-runtime and Batch 24B proof chain
new reusable modules created: 1 (`morphic-semantic-operation`)
new reusable recipes/compositions created: 0
known diagnostic lookups used: `ZIGREF-PYTHON-ENV-UNUSABLE`
unknown diagnostic lookups: 0
new evidenced diagnostics added: 0
source reads required for ordinary reuse: exact count unmeasured
focused validations executed: recorded in final handoff
aggregate validations executed: recorded in final handoff
unmeasured fields: token, time, and universal productivity savings
notes: Batch 25B can replace the bootstrap resolver while retaining project 56 and the register decoder shape.

## Next pressure

Batch 25B/26: a bounded per-process resource and Linux FD table with real stdin/stdout/stderr entries, then read/write/close and dup-family pressure while preserving the Batch 25A semantic boundary.
