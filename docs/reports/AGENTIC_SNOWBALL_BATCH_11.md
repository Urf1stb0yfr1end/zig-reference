# Agentic Snowball Batch 11 — Freestanding RISC-V Execution Boundary

## Environment and frozen requirement map

The supplied root is `/workspace/zig-reference`, branch `work`, based on commit
`27c322a0b901c080fbfbce2a5ac7c16598b32df9`; no remote was configured. Zig is
0.14.0. The validation virtual environment was provisioned from
`tools/requirements.txt`. System emulation was provisioned conventionally with
`apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y
qemu-system-misc qemu-user opensbi`. The installed packages are
`qemu-system-misc` and `qemu-user` 8.2.2+ds-0ubuntu1.18 and `opensbi`
1.7-1~24.04.1. The executed emulator is `/usr/bin/qemu-system-riscv64`, QEMU
8.2.2. QEMU's bundled default firmware identified itself at execution as OpenSBI
v1.3.

Repository aggregate validation additionally exposed the absent conventional
Node runtime; `DEBIAN_FRONTEND=noninteractive apt-get install -y nodejs`
installed Ubuntu `nodejs` 18.19.1+dfsg-6ubuntu5 before the successful rerun.

The pre-implementation map was:

| Classification | Frozen requirement |
|---|---|
| Existing modules | Resource plan, deterministic scheduler, and deterministic event trace remain the semantic foundations. |
| Existing recipe | `run-hosted-morphic-runtime` and its single `runCore` remain canonical. |
| Existing toolchain capability | Zig 0.14.0 supplies `riscv64-freestanding-none` ELF compilation and a linker-script surface. |
| Existing RISC-V capability | The repository's Sv39 modules are unrelated to this execution boundary and were rejected. |
| Missing reusable capability | None; demonstrated needs are tiny machine glue rather than a general module. |
| Project-specific orchestration | Entry/stack, SBI byte transport/shutdown, explicit framing, ELF inspection, bounded system-QEMU execution, and byte comparison. |
| External dependency | QEMU `virt` system emulation and its conventional bundled OpenSBI firmware. |
| Out of scope | Traps, interrupts, timers, page tables, FDT parsing, VirtIO, Linux/POSIX/Alpine, networking, kernel, and hypervisor work. |

Agent bootstrap reported 53 contracted/full modules and zero partial modules.
Preflight established that the three semantic modules are deterministic,
bounded, allocation-free, and freestanding-supported. No diagnostic lookup was
needed because no published invariant failed.

## Machine boundary and mechanical evidence

The target is exactly `riscv64-freestanding-none`. The ELF is statically linked,
has no `INTERP` program header, has RISC-V machine identity, and enters at
`0x80200000`. The linker script establishes a 64 KiB static stack. QEMU is
invoked as `qemu-system-riscv64 -machine virt -nographic -bios default -kernel
ARTIFACT`. Observed firmware evidence states that OpenSBI enters the payload at
`0x80200000` in S-mode, exposes runtime SBI 1.0, routes its console through
uart8250, and supports system reset.

The adapter uses only the legacy SBI console-putchar extension (`EID 0x1`) and
SBI system-reset extension (`EID 0x53525354`, function 0, shutdown type 0). Those
are specification-backed SBI identities; the selected firmware's support and
the QEMU load/entry behavior are directly observed environment evidence. Output
is enclosed in exact `ZIGREF_MORPHIC_BEGIN` / `ZIGREF_MORPHIC_END` framing.
Firmware text stays outside the frame; canonical bytes use deterministic
hexadecimal transport so console CR/LF handling cannot alter them, and are
decoded before comparison.
The verifier rejects missing, repeated, incomplete, or trailing completion
evidence and imposes a 15-second timeout.

Native hosted run 1, native hosted run 2, fake run 1, fake run 2, freestanding
payload 1, and freestanding payload 2 were byte-identical at 765 bytes. Raw QEMU
captures retain firmware output and were 3779 bytes in both observed runs. QEMU
completed through SBI shutdown rather than a process syscall or semihosting.
Batch 10's separate Linux-user command and artifact remain unchanged in meaning;
its verifier now has a finite timeout and whitespace-independent `Machine` field
parsing.

## Snowball Yield, preventables, and limits

- Existing modules reused: three plus their existing closure. Existing recipe
  reused: one. New reusable modules / recipes: **0 / 0**.
- Target files are the freestanding Zig adapter and linker script. Build and
  Python changes are project-specific execution orchestration.
- Source reads before selection: none. Reads after preflight: the recipe
  contract/source, build wiring, Batch 10 verifier/report, command manual,
  Minimus driver, and applicable standards. Byte volume is unmeasured.
- Durable One-Sentence Preventables: foreign execution must have a finite
  timeout; ELF identity checks must parse semantic fields rather than fixed
  spacing; firmware output must be explicitly framed before exact comparison.
  These now live at the verifier decision points with focused regressions.
- Removed Silent-Failure Cascade risks: unbounded emulator waits, spacing-based
  architecture false negatives, ambiguous/truncated frames, an unexpected ELF
  interpreter, and payload mismatch all fail closed.
- Normal repository validation and CI remain independent of QEMU. This run is
  execution-lab evidence, not a claim that existing GitHub CI ran system QEMU.
- Non-claims: hardware equivalence, Linux/POSIX/Alpine compatibility, kernel or
  hypervisor functionality, performance, interrupts, virtual memory, and inputs
  beyond this canonical scenario remain unmeasured or out of scope.
- Focused recipe tests, both verifier self-tests, the preserved Batch 10
  Linux-user verifier, and the Batch 11 system verifier passed. After canonical
  validation evidence/index regeneration, repository validation passed 322/322
  steps and 206/206 tests.

The next smallest evidence-backed pressure is trap entry plus bounded saved
state: it unlocks truthful exception and later timer/interrupt handling, the
repository has no executed trap boundary, and the current S-mode payload exposed
that absence directly. It reduces distance to a Linux-compatible Alpz by making
supervisor failures and asynchronous machine events explicit. It is not
implemented in Batch 11.
