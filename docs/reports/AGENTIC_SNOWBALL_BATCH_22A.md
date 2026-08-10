# Agentic Snowball Batch 22A — Bounded RV64 ELF Load Planning

## Baseline and frozen capability map

Starting revision: `11d9da127ce1322668c5b63ebd790dd43c4e4172` on branch `work`.

| Requirement | Classification | Resolution |
|---|---|---|
| bounded bytes and checked cursor/table decoding | already solved | modules 04, 29, 30, 37, and 38 |
| checked ranges, addresses, flags, alignment, and fixed storage | already solved | modules 00, 15–18 |
| whole-file RV64 acceptance and immutable PT_LOAD plan | genuinely missing reusable capability | new module 54 |
| physical allocation, mapping, copy/zero, fences, U-mode entry, ECALL | deliberately deferred | Batch 22B or later |

The generated fast path did not identify an equivalent load planner. Module 54 therefore composes the existing parsers rather than duplicating ELF decoding.

## Supported subset and plan contract

`bounded-elf64-load-plan` accepts ELF64 version 1, little endian, `ET_EXEC`, RISC-V machine 243, at most 64 program headers, and one or more `PT_LOAD` rows. It rejects dynamic/interpreter/TLS/shared-library/unknown features, W+X, W without R, incoherent alignment congruence, out-of-file source ranges, overlapping virtual ranges, excess capacity, entries that do not fit the guest-address backing type, and entries outside executable load memory. Null, note, and program-header metadata rows are ignored.

The owned allocation-free result retains `e_entry` and program-header ordering. Each segment records the exact source and virtual-memory half-open ranges, typed guest virtual start, file/memory/zero-fill byte counts, exact R/W/X booleans, and alignment. Boundary-touching ranges are admitted; actual overlaps are rejected. BSS is represented as `p_memsz - p_filesz`, but no memory is zeroed in this batch.

Planning is failure-atomic because all construction occurs in a local fixed vector and the value is returned only after every relevant row and the entry relation validate. A valid first row followed by a bad later row returns only an error. While instantiating the existing program-table composition, Batch 22A also repaired its previously latent impossible-seek error mapping so malformed tables remain explicit `TableOutOfBounds` failures.

## Executed evidence

Focused unit fixtures cover exact source/memory/permission facts, program-header ordering, equal file/memory sizes, BSS, touching and overlapping ranges, W+X, W without R, checked entry-conversion boundaries, file bounds, non-executable and exclusive-end entries, capacity, canonical magic/class/table failures, endian/machine/type policy, no load row, and later-row failure atomicity. The smoke test proves an external named import can consume the bounded public type and constants.

The run chose deterministic in-memory ELF fixtures rather than committing a compiler-produced binary. No ELF was executed.

Final validation results are recorded in the completion handoff and committed validation evidence.

## Explicit nonclaims

Batch 22A does not prove ELF execution, U-mode execution, physical allocation, page-table mutation, copying into user pages, actual BSS zeroing, `FENCE.I`, `SFENCE.VMA`, entry privilege transition, ECALL return, Linux ABI behavior, arguments/environment/auxv, `PT_INTERP`, relocations, dynamic linking, processes, `execve`, VFS, `mmap`/`brk`, signals, futexes, threads, BusyBox, musl, Alpine, QEMU hosting, or KVM.

## Snowball Yield and next pressure

Already-solved bounded parsing and value foundations now compose into one settled ELF interpretation primitive. Batch 22B can consume an immutable plan and focus narrowly on physical destination selection, mapping/reuse, byte copy and zero, instruction-cache synchronization, `e_entry` U-mode entry, and an ECALL proof. The actionable next pressure is to plan Batch 22B around `python3 tools/query-reference.py agent preflight bounded-elf64-load-plan`; it must not re-derive ELF policy.
