# zig-reference

> **Solved once. Documented completely. Reused forever.**

`zig-reference` is an experimental systems-research repository targeting Zig 0.14.0. It combines reusable low-level modules, machine-readable engineering knowledge, Morphic, the Alpz RV64 kernel path, Linux-compatibility research, QuirkM native-interface research, and future Wasm and virtualization directions.

## Research project

**Everything in this repository is research.** The kernel work, Morphic substrate, Alpz machine work, QuirkM, Linux personality, agent tooling, compatibility experiments, and future virtualization work are research artifacts unless a narrower proof establishes more.

This repository is not presented as production-ready infrastructure.

## What the names mean

| Name | Role |
|---|---|
| **Z-Ref** | Reusable knowledge and evidence: modules, contracts, tests, proof records, indexes, diagnostics, and agent-facing discovery. |
| **Morphic** | Shared architectural and semantic substrate. |
| **Alpz** | Current RV64 kernel/machine embodiment and Linux-compatibility proving ground. |
| **QuirkM** | Proposed clean native Morphic personality/API. |
| **Linux personality** | Compatibility edge for Linux-specific behavior that should not define Morphic internally. |

```text
software / agents
      |
      +--> QuirkM native
      +--> Linux personality
      +--> future Wasm
                |
                v
             MORPHIC
                |
                v
              ALPZ
                |
              RV64
```

## QuirkM research goal

QuirkM asks how much historical compatibility tax a new native system can avoid once compatibility is separated from permanent architecture.

Linux has extraordinary practical strengths, especially compatibility and ecosystem depth. Those same strengths make some old interfaces and accumulated semantic constraints difficult to remove without breaking existing software.

QuirkM therefore treats Linux compatibility history as **design evidence**, not a mandatory native blueprint.

> **Keep the capabilities. Preserve compatibility where it is valuable. Remove avoidable historical taxes from the native path.**

This is a research hypothesis, not a claim that QuirkM has already solved every problem inherited by mature operating systems.

## Build beyond us

This project is not intended to be a ceiling.

If another researcher, engineer, student, team, company, or agent-assisted project wants to use Morphic ideas to build a **larger, more capable, more specialized, or better system than QuirkM itself**, that is welcome.

Building **on top of** QuirkM, Morphic, or Alpz is welcome too.

The desired legacy is a foundation, body of evidence, and collection of solved mechanisms that make future systems cheaper to understand and build.

```text
zig-reference / Z-Ref
        |
      Morphic
      /    \
   Alpz   QuirkM
      \    /
       \  /
   YOUR SYSTEM MAY BEGIN
```

**This repository is MIT-licensed. Anyone may use, copy, modify, merge, publish, distribute, sublicense, sell, fork, extend, or build on this work under the terms of the MIT License.** No additional permission from this project is required beyond compliance with that license.

If you want to build a bigger system than QuirkM, replace parts of Morphic, turn Alpz into something we never planned, build a commercial product, or use this work as the foundation of a completely different operating system, you are welcome to do so.

See [`LICENSE`](LICENSE).

## Core architectural rule

Compatibility pressure should reveal general mechanisms without forcing historical compatibility details into the permanent core.

```text
real software pressure
        |
        v
what capability is missing?
        |
        +--> general mechanism --> Morphic
        |
        +--> compatibility-only behavior --> personality edge
```

See [`docs/papers/COMPATIBILITY_AS_MIGRATION_SCAFFOLD.md`](docs/papers/COMPATIBILITY_AS_MIGRATION_SCAFFOLD.md) and [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/).

## MinMax Memo™

> **Minimum implementation surface. Maximum capability surface. Maximum whole-system mental model.**

The goal is not the smallest kernel at any cost. It is the smallest coherent foundation that unlocks the largest useful computing world while remaining understandable.

## Current machine milestone

**Batch 32B is complete: Morphic now runs the exact Alpine v3.22 RV64 dynamically linked BusyBox shell through the real musl interpreter.**

The same hash-pinned dynamic BusyBox artifact crossed the full ladder under Morphic:

```text
/bin/busybox true                       PASS
/bin/busybox echo batch32b              PASS
/bin/busybox sh -c 'echo batch32b'      PASS
exact stdout: batch32b\n                PASS
exit status 0                           PASS
real ld-musl interpreter-first          PASS
PREPARE -> COMMIT -> execute            PASS
W+X=0                                   PASS
```

This is not a synthetic shell and it is not a kernel-side dynamic-linking shortcut. The real `/lib/ld-musl-riscv64.so.1` enters U-mode first, performs userspace loader startup, and transfers execution into the exact dynamic BusyBox image. The kernel still does not perform dynamic relocations for musl or BusyBox.

The blocker immediately before this milestone was also closed generally rather than with a BusyBox special case: large caller-supplied artifacts now travel through a bounded, page-aligned, supervisor-readable, read-only transport region separated from the ordinary kernel image, fixture window, and prepared-image reservations.

Repository validation at the milestone passed all **350/350 steps and 247/247 tests**, and GitHub CI passed.

See [`docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md).

## Come attack the next boundary

This is a good time to join the project.

The interesting problems are no longer hypothetical kernel checklists. Real software is running far enough to expose precise boundaries, and each boundary can be attacked as a falsifiable systems problem.

If you work on kernels, Zig, RISC-V, ELF, linkers/loaders, filesystems, process models, verification, virtualization, capability systems, compatibility layers, reproducible systems research, or agent-assisted engineering, there is useful work here now.

You do **not** have to accept the current architecture as sacred. A strong result that proves a Morphic or QuirkM idea wrong is valuable. A smaller mechanism, a cleaner proof, a better abstraction, a stronger negative result, or an entirely better system built from these pieces is welcome.

Some of the next concrete questions are:

- Can an exact Alpine RISC-V minirootfs supply its own real `/bin/sh` under Morphic without turning the kernel into Linux internally?
- What is the minimum filesystem mechanism real Alpine pressure actually demands first?
- Which Linux behaviors belong at the compatibility edge, and which reveal reusable Morphic mechanisms?
- How far can the privileged core remain small and understandable while the capability surface grows?
- Can the same substrate support a cleaner native QuirkM userspace, stronger isolation models, Wasm, or virtualization without inheriting every historical Unix assumption?
- Which current design decisions fail under stronger proofs, more hostile workloads, or alternative architectures?

Bring a counterexample. Bring a trace. Bring a weird ELF. Bring a cleaner abstraction. Bring a PR that deletes more complexity than it adds.

**The goal is not to protect the current design. The goal is to discover the best system we can build.**

## Time to milestone

The earliest preserved commit is the reproducible project-time baseline.

```text
Repository baseline / first commit:     2026-08-04 04:32:00 CST
First static BusyBox shell milestone:   2026-08-13 18:01:04 CST

FROM REPOSITORY START:                  229.48 hours
FROM FIRST STATIC BUSYBOX SHELL:          0.00 hours

Exact elapsed:
9 days, 13 hours, 29 minutes, 4 seconds
```

Chronology tag:

`time-till-first-static-busybox-shell-229.48-hours-from-repository-start-2026-08-13`

Future major milestones should accumulate the same chronology line by line. The real dynamic-musl and dynamic-BusyBox-shell milestones are now complete and should each receive their own accumulated `time-till` chronology entries.

## Active frontier

**The dynamic BusyBox mountain is complete. The next pressure campaign is the first real Alpine root filesystem.**

```text
FIRST STATIC BUSYBOX SHELL      complete
        |
        v
FIRST REAL DYNAMIC MUSL         complete
        |
        v
DYNAMIC BUSYBOX SHELL           complete
        |
        v
REAL ALPINE MINIROOTFS          <-- next
        |
        v
REAL /bin/sh -c 'echo alpine'
        |
        v
FIRST REAL ALPINE
        |
        v
FILESYSTEM + PROCESS PRESSURE
        |
        v
CONSOLE / TTY / SIGNALS
        |
        v
PLAYABLE ALPINE
```

The next clean historical target is intentionally narrow:

```text
exact Alpine v3.22 RISC-V minirootfs
        -> real /bin/sh from that filesystem
        -> /bin/sh -c 'echo alpine'
        -> exact alpine\n
        -> status 0
        -> W+X=0
        -> FIRST REAL ALPINE UNDER MORPHIC
```

Only real pressure should decide what filesystem, pathname, metadata, process, or compatibility mechanisms are admitted next. The kernel should not grow a speculative Linux subsystem merely because Linux has one.

Completed Batch 32B report:
[`docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md)

## Engineering model

> **Observed foreign API usage does not automatically justify permanent mechanism. Causal necessity does.**

The working loop is:

```text
observe real failure
      -> classify
      -> minimum general repair
      -> prove causality
      -> retry the same artifact
```

## Documentation

Start with [`docs/README.md`](docs/README.md), [`AGENTS.md`](AGENTS.md), [`COMMANDS.md`](COMMANDS.md), [`docs/porting/PORTING.md`](docs/porting/PORTING.md), [`docs/project_vocab.md`](docs/project_vocab.md), [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/), and [`docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md).

## Validation

The broad repository gates are `zig build check` and `python3 tools/developer-command.py validate-repository`. Focused commands are documented in [`COMMANDS.md`](COMMANDS.md).

Do not weaken a gate merely to make new work pass. Fix the work or narrow the claim.

## Contributing

Contribution guidance lives in [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

Research that proves an existing Morphic or QuirkM idea wrong is useful too. Prefer falsifiable evidence over protecting a favored architecture.

**If this problem space sounds fun, you are invited.** You do not need to wait for the project to become mature, and you do not need permission to explore a different direction. Fork it, test it, break an assumption, improve a mechanism, propose a competing design, or build something larger on top of it.

## Scope and nonclaims

Alpz is **not Linux**, QuirkM is **not a completed native operating environment**, and Morphic is **not presented as a production kernel platform**.

The project now has real static-musl execution, a proven static Alpine BusyBox shell, successful real dynamic-musl execution through the real userspace interpreter, and a proven dynamic Alpine BusyBox shell under Morphic. It does **not yet claim** an Alpine minirootfs, first-real-Alpine completion, interactive/playable Alpine, general Linux compatibility, production security, production readiness, or completed virtualization.

Proof records, exact artifacts, machine traces, validation gates, and current code define what has actually been achieved.