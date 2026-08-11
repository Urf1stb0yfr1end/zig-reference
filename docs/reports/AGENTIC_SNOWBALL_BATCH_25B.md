# Agentic Snowball Batch 25B — bounded process resource table and Linux FD lifecycle

## Result

PASS. The raw RV64 ELF executes 15 Linux ECALLs: 14 return at exactly `sepc + 4`, and `exit_group(37)` terminates without returning. The proof bootstraps fd 0/1/2 through a real descriptor binding table, reads deterministic stdin into mapped writable U memory, writes those U bytes through fd 1, duplicates fd 0 to the lowest free fd 3, closes aliases independently, and proves EBADF, EFAULT, ENOSYS, failure atomicity, W+X=0, and inherited process-start truth in two independent QEMU processes.

## Frozen architecture and requirement map

```text
Linux fd integer
  -> Linux/RV64 personality and process-local BindingTable slot
  -> generational Morphic ResourceRef
  -> ResourceTable entry (backend identity + semantic capabilities + references)
  -> read_bytes/write_bytes semantic request
  -> deterministic stdin or bounded output backend
  -> semantic Completion/Failure
  -> Linux negative errno adapter
```

**Generation-preservation invariant:** A Morphic semantic I/O request carries enough identity to distinguish successive generations occupying the same resource-table slot. Linux resolves an fd to the full `ResourceRef`; `semanticIdentity` carries both slot and generation; the backend reconstructs that complete reference without a fixed-generation assumption.

Project 57 composes project 08 `HandleTable`; it does not duplicate generation or bounded-storage machinery. Project 53 validates an entire user range before read copy-out or write copy-in. Project 56 gains only justified ABI-neutral `read_bytes` and `operation_not_supported`; close and duplicate remain binding/resource lifetime operations rather than I/O union variants. The Linux layer alone owns descriptor allocation, fd 0/1/2/3 meanings, syscall numbers, EBADF/EFAULT/EMFILE/ENOSYS, and register decoding.

## Primary ABI sources checked

The implementation checked local installed Linux UAPI primary headers: `/usr/include/asm-generic/unistd.h` defines `dup=23`, `close=57`, `read=63`, `write=64`, `exit=93`, and `exit_group=94`; `/usr/include/asm-generic/errno-base.h` defines `EBADF=9`, `EFAULT=14`, and `EMFILE=24`; `/usr/include/asm-generic/errno.h` defines `ENOSYS=38`. `dup` uses deterministic lowest-free binding allocation. The proof intentionally implements no dup flags or close-on-exec state.

## Machine and lifecycle proof

Bootstrap first creates and finally releases a disposable resource, then reuses that same slot at generation 2 for stdin; it subsequently creates three distinct live resource entries and binds readable stdin to fd 0 and writable stdout/stderr to fd 1/2. The ordered fixture proves unsupported→ENOSYS; `read(0,...,5)`→`stdin`; `dup(0)`→3; `close(0)`; fd 0→EBADF; bad-destination read on fd 3→EFAULT without cursor movement; valid alias read→the unconsumed `-25b`; fd-table-routed write→exact `stdin-25b`; close fd 3; repeated read/close→EBADF; invalid write fd→EBADF; invalid write memory→EFAULT; read from write-only fd 1→EBADF; terminal exit group→37. The verifier requires `stdin_generation=2`. Final resource count is two, proving stdin destruction only after the final alias closes.

The backend plans the complete destination before copying or moving the stdin cursor, so the EFAULT read cannot consume input. Write likewise validates the complete source before appending output. Every returning event records cause 8, clear SPP, exact artifact ECALL PC and `PC+4`; the terminal event records no resume. The strict verifier independently parses the ELF and its 15 ECALL sites, composes the Batch 24B parser, checks event relations and exact bytes, compares two QEMU processes, and preserves hosted/fake/machine Morphic equality.

## Independent evidence and decisive mutations

Project 57 unit and external smoke tests independently prove generation-2 slot reuse through real `morphic-semantic-operation.execute` dispatch, stale-generation rejection, bounded creation, lowest-slot binding duplication, shared reference counts, surviving aliases, final destruction, stale-reference rejection, table-full behavior, invalid unbind, and failed-mutation preservation. The machine verifier mutation mode rejects descriptor allocation, close/use-after-close results, EFAULT atomicity evidence, semantic kind, exact output, cursor, resource count, resume PC, and inherited argc evidence.

## Failures and repairs

The initial environment lacked the repository venv and QEMU; the documented doctor repair created `.venv`, installed requirements, and the environment installed QEMU 8.2.2. Compilation exposed fixed Batch-25A array widths; they became a bounded 16-event trace. Contract validation exposed schema/endpoint, port dependency, generated manifest, catalog, and command-manual drift; canonical contracts were completed and textual indexes regenerated. A misplaced evidence field was moved into the Batch 25B frame. No proof gate was weakened.

## Inheritance check

A future QuirkM adapter can wrap project 57's generational `ResourceRef` in a typed handle and call `resolve`/lifecycle operations directly. A future Wasm adapter can bind the same `ResourceRef` in its own process-local table. Neither path passes through Linux fd integers, Linux errno, syscall numbers, or RISC-V registers. Backend identities and capabilities are Morphic values. This is a concrete structural check, not a frozen QuirkM Native ABI or Wasm interface.

## Nonclaims

No VFS/openat, filesystem object, seek/shared file offset, mmap, execve, fork/clone, signals, futex, pipe, poll, socket, tty, blocking input, terminal discipline, musl, BusyBox, Alpine, Wasm runtime, Native ABI, concurrency, stable ABI, hypervisor, or production readiness is claimed. Resource capabilities are only read/write proof capabilities, not a complete rights model. Deterministic stdin is a bounded synchronous fixture.

## Quirk Extraction

QuirkM should inherit typed access to `ResourceRef`, explicit capability failures, and alias-aware retain/release. It should not inherit Linux descriptor allocation, negative errno, syscall naming, fd flags, or RV64 decoding. The exact future public handle representation remains deliberately unfrozen.

## Snowball Yield

- Existing modules reused: 08 generational handles, 53 user-memory transfer, 54 ELF load, 55 Linux initial stack, 56 semantic operations.
- New reusable capability: one, project 57 bounded resource table.
- Project orchestration: Linux fd personality, deterministic stdin backend, ELF fixture, strict verifier.
- Diagnostic lookup: `ZIGREF-PYTHON-ENV-UNUSABLE`; repaired using the prescribed venv path.
- Requirements proved: bounded resource identity, bootstrap descriptors, read/write, close, dup aliasing, EBADF/EFAULT/ENOSYS, failure atomicity, exact resume/terminal split, ELF evidence, lifecycle evidence, mutations, two QEMU determinism, inherited Batch 24B/25A truth.
- Unmeasured: source-read count, universal productivity gain, and performance.

## Validations

- `zig build test-bounded-resource-table test-morphic-semantic-operation`
- `python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py --self-test`
- `python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py`
- focused reused-module unit/smoke checks and full `python3 tools/developer-command.py validate-repository` (final handoff records result)

## LOCATIONS

- `file:///workspace/zig-reference/projects/57-bounded-resource-table/details.json`
- `file:///workspace/zig-reference/projects/57-bounded-resource-table/src/bounded_resource_table.zig`
- `file:///workspace/zig-reference/projects/56-morphic-semantic-operation/src/morphic_semantic_operation.zig`
- `file:///workspace/zig-reference/recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig`
- `file:///workspace/zig-reference/recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-linux-syscalls.zig`
- `file:///workspace/zig-reference/tools/verify-freestanding-riscv64-linux-fd-lifecycle.py`

## MINIMUS

status: PASS
command: Batch 25B bounded resource/FD lifecycle
branch: work
summary: modules=58 qemu_runs=2 ecalls=15 returns=14 terminal=37 stdin_generation=2 stdin_cursor=9 resources_after=2 W+X=0
next: Batch 26 VFS/openat pressure without replacing resource identity

## Next pressure

Batch 26 should add the smallest VFS/openat-backed resource while retaining project 57 identity and keeping pathname, Linux flags, fd allocation, and errno at compatibility edges.
