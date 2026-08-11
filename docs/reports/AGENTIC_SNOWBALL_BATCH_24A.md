# Agentic Snowball Batch 24A

## Result

**PASS.** Starting revision: `9f5544aed9ea59cfa4bf88cb0d3958f8d6a299cf`. Zig baseline: 0.14.0.

## Frozen requirement/capability map

This map was frozen before implementation.

| Requirement | Start classification | Resolution |
|---|---|---|
| fixed-capacity owned byte/output storage | existing module concepts (`fixed-capacity-vector`, `byte-writer`) | Inline fixed-capacity byte array was the narrower no-allocation representation; no replacement general container was created. |
| checked address/range arithmetic | existing module | `checked-half-open-range` supplies range truth; checked standard arithmetic closes layout calculations. |
| alignment helpers | existing module | `aligned-address-and-size-helpers.alignDown`. |
| endian-safe RV64 word encoding | existing module | `endian-integer-codec.EndianIntegerCodec(u64, .little)`. |
| distinct guest virtual address | existing module | `distinct-memory-address-types.GuestVirtualAddress`. |
| argv/env validation and packing | missing reusable capability | Added as the new planner's primary policy. |
| startup table and sentinels | missing reusable capability | Added as the new planner's primary policy. |
| bounded auxv serialization | missing reusable capability | Added with immediate and symbolic string values. |
| failure atomicity | project-specific orchestration requirement | Entire result is locally owned and returned only after validation and construction. |
| external import contract | repository convention | Dedicated named-import smoke test. |
| machine/QEMU execution and Linux syscalls | out of scope | Deferred to Batch 24B and Batch 25 respectively. |

No additional requirement was discovered during implementation. No separate lower-level reusable module was missing.

## New canonical module

Identity: `bounded-rv64-linux-initial-stack-plan`; path: `projects/55-bounded-rv64-linux-initial-stack-plan`.

The public contract exposes `word_size = 8`, `stack_alignment = 16`, `at_null = 0`, typed `GuestVirtualAddress`/`GuestStackRange`, `AuxValue`, `AuxEntry`, `StackPlan(byte_capacity)`, and `plan`. Four independent compile-time capacities bound output bytes, argv count, env count, and aux count. `argv` must contain at least one entry; `envp` may be empty.

The exact image covers `[initial_sp, stack_range.end)`. Its low-to-high ordering is: little-endian `argc`; ordered argv pointers; zero; ordered envp pointers; zero; ordered auxv type/value pairs; internally appended `AT_NULL, 0`; deterministic zero padding; then argv strings in input order followed by env strings in input order. Every input string must lack an interior NUL and receives exactly one appended NUL. SP is aligned down to 16 bytes; all table words are 8-byte aligned.

Aux keys must be nonzero and unique. Values are either immediate `u64` values or symbolic references to a checked argv/env string index, enabling truthful `AT_EXECFN`-style composition without a second layout pass. Policy remains with the caller; no auxiliary facts are fabricated.

Errors explicitly cover empty/excess vectors, interior NULs, supplied `AT_NULL`, duplicate keys, bad symbolic indices, checked address/size failure, insufficient range, and insufficient image capacity. No external state is mutated and no partial plan escapes.

## Independent byte-image evidence

Unit tests decode little-endian words independently with `std.mem.readInt`, inspect all required sentinels, convert emitted guest pointers back to offsets, compare exact pointed-to strings, and verify every padding byte is zero. Further tests cover alignment, exact byte/range boundaries, maximum selected capacities, count failures, string failures, aux failures, and a near-`usize` stack top. The external smoke uses only the named public import.

## Validation

The new module unit and smoke tests passed, as did both focused bounded ELF load-plan regressions and both focused bounded user-memory transfer-plan regressions. `zig build check` and the command-manual drift check passed. `python3 tools/developer-command.py validate-repository` passed all 334/334 build steps and 230/230 tests under Zig 0.14.0; its Agent Fast Path result was 56 full modules and 0 partial modules.

## Snowball Yield

- composition: bounded RV64 Linux initial process stack planning
- base commit: `9f5544aed9ea59cfa4bf88cb0d3958f8d6a299cf`
- Zig baseline: 0.14.0
- requirements at start: 10
- existing-module requirements: 4 (`checked-half-open-range`, `aligned-address-and-size-helpers`, `endian-integer-codec`, `distinct-memory-address-types`)
- existing-composition/recipe requirements: 0
- missing reusable capabilities: 3 (string/vector startup policy, startup table/sentinels, bounded auxv serialization), unified in one module
- project-specific orchestration requirements: 2 (failure-atomic assembly, smoke integration)
- out-of-scope requirements: 1 (machine execution/syscalls)
- requirements discovered during run: 0
- existing modules actually reused: 4 named above
- existing recipes/compositions actually reused: 0
- new reusable modules created: 1 (`bounded-rv64-linux-initial-stack-plan`)
- new reusable recipes/compositions created: 0
- known diagnostic lookups used: 0
- unknown diagnostic lookups: 0
- new evidenced diagnostics added: 0
- source reads required for ordinary reuse: unmeasured
- focused validations executed: 6 required unit/smoke commands, all PASS
- aggregate validations executed: `zig build check` and `python3 tools/developer-command.py validate-repository`, both PASS
- unmeasured fields: elapsed engineering time, token savings, hypothetical future code reduction
- notes: no transitive dependency was double-counted; inline bytes are representation inside the new policy module, not a new general container.

## Explicit nonclaims

No new bytes were written to Alpz user memory; no initial process stack executed under QEMU; the current guest ELF does not receive these values. This is not full Linux `create_elf_tables`, ASLR, `AT_RANDOM`, `AT_PHDR`, HWCAP/HWCAP2, VDSO, platform strings, PT_INTERP, dynamic linking, TLS, libc/musl startup, syscall ABI, `execve`, processes, VFS/file descriptors, `mmap`/`brk`, signals/futexes/threads, BusyBox, Alpine, nested QEMU, KVM, or hardware virtualization.

## Next pressure

Batch 24B should copy this exact image into real allocator-owned U RW/NX stack memory, enter the Batch 23 ELF at its planned entry with this exact SP, and independently validate all startup relationships in U-mode under strict mutation-tested two-QEMU evidence. Batch 24B must consume this planner rather than recreate its policy.
