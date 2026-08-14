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

# ★ FIRST REAL ALPINE UNDER MORPHIC ★

**Batch 32C is complete. Morphic now consumes a complete deterministic representation of the exact Alpine v3.22.0 RV64 minirootfs and executes its real `/bin/sh`.**

The success path no longer selects BusyBox and musl as two host-picked ELF files. The caller supplies the complete bounded Alpine namespace as a manifest plus immutable backing; Morphic itself resolves the real `/bin/sh -> /bin/busybox` relationship and obtains BusyBox's real `PT_INTERP=/lib/ld-musl-riscv64.so.1` from that same namespace before execution.

```text
exact Alpine v3.22.0 RV64 minirootfs       PASS
complete namespace: 517 objects            PASS
regular-file backing: 7,069,903 bytes      PASS
runtime /bin/sh -> /bin/busybox lookup     PASS
same-namespace real musl PT_INTERP lookup  PASS
real ld-musl interpreter-first             PASS
PREPARE -> COMMIT -> execute               PASS
exact stdout: alpine\n                     PASS
exit status 0                              PASS
W+X=0                                      PASS
```

There is still no kernel dynamic relocator and no direct-to-BusyBox shortcut. The real musl interpreter enters U-mode first and performs userspace loader startup.

Repository validation for the merged milestone is green, including `zig build check`, smoke, recipes, conformance, property, fuzz-smoke, differential, tests, `validate-repository`, repository policy, and the secret-pattern gate.

See [`docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md).

## Try the real Alpine proof in your own console

You can reproduce the current milestone from a fresh clone. This is **not yet an interactive Alpine prompt**; it runs the real Alpine `/bin/sh -c 'echo alpine'` path under Morphic and shows the proven userspace output.

Prerequisites:

- Git
- Python 3
- Zig **0.14.0**
- `qemu-system-riscv64`
- Internet access for the hash-pinned Alpine v3.22.0 RV64 minirootfs download

Clone and enter the repository:

```sh
git clone https://github.com/thanks-cohn/zig-reference.git
cd zig-reference
git switch main
git pull --ff-only
```

Confirm the important host tools:

```sh
zig version
qemu-system-riscv64 --version
python3 --version
```

`zig version` should report `0.14.0`.

Generate the complete verified Alpine namespace. The acquisition tool downloads the exact pinned Alpine archive, verifies its SHA-256, rejects unsafe archive relationships, verifies `/bin/sh -> /bin/busybox`, verifies the real musl interpreter and PT_INTERP relationship, and emits the complete deterministic namespace:

```sh
rm -rf /tmp/zigref-namespace /tmp/alpine-machine
python3 tools/pressure-real-rv64-alpine-minirootfs.py \
  --artifact-only \
  --namespace-output-dir /tmp/zigref-namespace
```

Build the Morphic RV64 machine with that complete namespace:

```sh
zig build install-freestanding-riscv64-morphic-runtime \
  -Dexternal-rv64-namespace-manifest=/tmp/zigref-namespace/namespace.json \
  -Dexternal-rv64-namespace-data=/tmp/zigref-namespace/namespace.data \
  -Dexternal-rv64-argv0=/bin/sh \
  -Dexternal-rv64-argv1=-c \
  '-Dexternal-rv64-argv2=echo alpine' \
  --prefix /tmp/alpine-machine
```

Run it on the QEMU RISC-V `virt` machine:

```sh
qemu-system-riscv64 \
  -machine virt \
  -nographic \
  -bios default \
  -kernel /tmp/alpine-machine/bin/morphic-freestanding-riscv64
```

The machine emits Morphic proof/evidence output, and the decisive Alpine userspace output is:

```text
alpine
```

The Batch 32C proof additionally establishes status `0`, real-musl interpreter-first execution, PREPARE -> COMMIT -> execute, and `W+X=0`.

The canonical command record lives in [`COMMANDS.md`](COMMANDS.md).

## Come attack the next boundary

This is a good time to join the project.

The interesting problems are no longer hypothetical kernel checklists. Real software is running far enough to expose precise boundaries, and each boundary can be attacked as a falsifiable systems problem.

If you work on kernels, Zig, RISC-V, ELF, linkers/loaders, filesystems, process models, verification, virtualization, capability systems, compatibility layers, reproducible systems research, or agent-assisted engineering, there is useful work here now.

You do **not** have to accept the current architecture as sacred. A strong result that proves a Morphic or QuirkM idea wrong is valuable. A smaller mechanism, a cleaner proof, a better abstraction, a stronger negative result, or an entirely better system built from these pieces is welcome.

Some of the next concrete questions are:

- What is the minimum filesystem mechanism required to turn today's one-shot real Alpine shell execution into a useful persistent shell environment?
- What process, FD-inheritance, pipe, redirection, TTY, and signal semantics does real Alpine pressure actually demand?
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

Future major milestones should accumulate the same chronology line by line. The real dynamic-musl, dynamic-BusyBox-shell, and first-real-Alpine milestones are complete and can each receive their own accumulated `time-till` chronology entries.

## Active frontier

**First real Alpine is complete. The active climb is from one-shot Alpine execution to a playable Alpine environment, then to Alpine's own package manager.**

```text
FIRST STATIC BUSYBOX SHELL         complete
        |
        v
FIRST REAL DYNAMIC MUSL            complete
        |
        v
DYNAMIC BUSYBOX SHELL              complete
        |
        v
REAL ALPINE NAMESPACE              complete
        |
        v
★ FIRST REAL ALPINE ★              complete  <-- current proven milestone
        |
        v
FILESYSTEM REALITY
pwd / directories / stat / getdents / writable /tmp
        |
        v
PROCESS REALITY
spawn/exec/wait + sane inherited resources
        |
        v
PIPES + REDIRECTION
pipe + dup + stdin/stdout/stderr behavior
        |
        v
CONSOLE / TTY
persistent keyboard input + shell prompt
        |
        v
SIGNALS / CTRL-C
foreground interruption without killing the shell
        |
        v
★ PLAYABLE ALPINE ★
        |
        v
APK LOCAL DATABASE
apk --version / apk info
        |
        v
LOCAL .APK INSTALL
filesystem mutation + package DB + scripts
        |
        v
NETWORKING / DNS / TLS
        |
        v
apk update
        |
        v
★ apk add FROM REAL ALPINE REPOSITORIES ★
```

A concrete playable-Alpine target looks like:

```text
Alpine Linux
/ # pwd
/
/ # ls /
bin dev etc lib sbin tmp usr var
/ # cat /etc/alpine-release
3.22...
/ # cd /tmp
/tmp # echo morphic > hello
/tmp # cat hello
morphic
/tmp # echo hello | cat
hello
/tmp #
```

Only real pressure should decide what filesystem, pathname, metadata, process, terminal, networking, or compatibility mechanisms are admitted next. The kernel should not grow a speculative Linux subsystem merely because Linux has one.

Completed reports:

- [`docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32B.md)
- [`docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md)

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

Start with [`docs/README.md`](docs/README.md), [`AGENTS.md`](AGENTS.md), [`COMMANDS.md`](COMMANDS.md), [`docs/porting/PORTING.md`](docs/porting/PORTING.md), [`docs/project_vocab.md`](docs/project_vocab.md), [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/), and [`docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md).

## Validation

The broad repository gates are `zig build check` and `python3 tools/developer-command.py validate-repository`. Focused commands are documented in [`COMMANDS.md`](COMMANDS.md).

Do not weaken a gate merely to make new work pass. Fix the work or narrow the claim.

## Contributing

Contribution guidance lives in [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

Research that proves an existing Morphic or QuirkM idea wrong is useful too. Prefer falsifiable evidence over protecting a favored architecture.

**If this problem space sounds fun, you are invited.** You do not need to wait for the project to become mature, and you do not need permission to explore a different direction. Fork it, test it, break an assumption, improve a mechanism, propose a competing design, or build something larger on top of it.

## Scope and nonclaims

Alpz is **not Linux**, QuirkM is **not a completed native operating environment**, and Morphic is **not presented as a production kernel platform**.

The project now has real static-musl execution, a proven static Alpine BusyBox shell, successful real dynamic-musl execution through the real userspace interpreter, a proven dynamic Alpine BusyBox shell, and **first real Alpine under Morphic through a complete serialized Alpine v3.22.0 RV64 namespace**. It does **not yet claim** an interactive/playable Alpine environment, general Linux compatibility, working `apk add`, production security, production readiness, or completed virtualization.

Proof records, exact artifacts, machine traces, validation gates, and current code define what has actually been achieved.
