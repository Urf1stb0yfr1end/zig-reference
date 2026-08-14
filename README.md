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

The current completed external-userspace milestone is **Batch 32A: the first proven real dynamically linked RV64 musl program under Morphic**.

The exact hash-pinned dynamic main was entered through the real `/lib/ld-musl-riscv64.so.1` interpreter. System-QEMU evidence shows real interpreter startup syscalls, loader completion, transfer into the mapped main image, exact stdout `batch32a-dynamic-musl\n`, exit status 0, and W+X=0. PREPARE/COMMIT ordering remained intact, with no kernel-side dynamic relocator and no direct-main-entry bypass.

The proven ladder now includes real S-mode and U-mode execution, active Sv39, real ELF execution, Linux-style process startup, bounded file/memory/exec behavior, exact static musl, the static Alpine BusyBox shell, caller-supplied real PT_INTERP transport, and successful real dynamic-musl loader startup and main execution.

See [`docs/reports/AGENTIC_SNOWBALL_BATCH_32A.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32A.md).

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

Future major milestones should accumulate the same chronology line by line. The Batch 32A dynamic-musl milestone is now complete and ready for its own engineering and `time-till` tags.

## Active frontier

The next pressure campaign is **dynamic BusyBox**.

```text
FIRST STATIC BUSYBOX SHELL      complete
        |
        v
FIRST REAL DYNAMIC MUSL         complete
        |
        v
DYNAMIC BUSYBOX                 next
        |
        v
DYNAMIC BUSYBOX SHELL
        |
        v
REAL ALPINE MINIROOTFS
        |
        v
FIRST REAL ALPINE
        |
        v
PLAYABLE ALPINE
```

A central constraint remains that the Morphic kernel should not become the dynamic linker. Real userspace interpreters should perform userspace loader work; Morphic should provide the general mechanisms and compatibility-edge semantics demanded by real pressure.

Completed Batch 32A plan:
[`docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_32A_FIRST_REAL_DYNAMIC_MUSL_PT_INTERP_LOADER_ONE_AND_DONE_30MIN_HANDOFF.txt`](docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_32A_FIRST_REAL_DYNAMIC_MUSL_PT_INTERP_LOADER_ONE_AND_DONE_30MIN_HANDOFF.txt)

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

Start with [`docs/README.md`](docs/README.md), [`AGENTS.md`](AGENTS.md), [`COMMANDS.md`](COMMANDS.md), [`docs/porting/PORTING.md`](docs/porting/PORTING.md), [`docs/project_vocab.md`](docs/project_vocab.md), [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/), and [`docs/reports/AGENTIC_SNOWBALL_BATCH_32A.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32A.md).

## Validation

The broad repository gates are `zig build check` and `python3 tools/developer-command.py validate-repository`. Focused commands are documented in [`COMMANDS.md`](COMMANDS.md).

Do not weaken a gate merely to make new work pass. Fix the work or narrow the claim.

## Contributing

Contribution guidance lives in [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

Research that proves an existing Morphic or QuirkM idea wrong is useful too. Prefer falsifiable evidence over protecting a favored architecture.

## Scope and nonclaims

Alpz is **not Linux**, QuirkM is **not a completed native operating environment**, and Morphic is **not presented as a production kernel platform**.

The project now has real static-musl execution, a proven static Alpine BusyBox shell boundary, and successful real dynamic-musl execution through the real userspace interpreter. It does **not yet claim** dynamic BusyBox, a dynamic BusyBox shell, an Alpine minirootfs, general Linux compatibility, production security, production readiness, or completed virtualization.

Proof records, exact artifacts, machine traces, validation gates, and current code define what has actually been achieved.