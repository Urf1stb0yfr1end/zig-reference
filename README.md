# zig-reference

> **Solved once. Documented completely. Reused forever.**

`zig-reference` is an experimental systems-research repository targeting Zig 0.14.0. It combines reusable low-level modules, machine-readable engineering knowledge, Morphic, the Alpz RV64 kernel path, Linux-compatibility research, QuirkM native-interface research, and future Wasm and virtualization directions.

## Research project

**Everything in this repository is research.** The kernel work, Morphic substrate, Alpz machine work, QuirkM, Linux personality, agent tooling, compatibility experiments, and future virtualization work are research artifacts unless a narrower proof establishes more.

This repository is not presented as production-ready infrastructure. Its larger purpose is to make operating-system construction itself observable enough that the project can answer questions about kernels, compatibility, software inheritance, AI-assisted engineering, and the cost of building new systems.

### Where Morphic sits in the AI-assisted OS landscape

AI-assisted operating-system projects are now interesting enough that the question **“can AI help build a substantial operating system?”** no longer has to remain hypothetical.

[SlopOS](https://github.com/SlopLabs/slopos) and [VibeOS](https://github.com/kaansenol5/VibeOS) are neighboring experiments that we respect. They demonstrate different, valuable parts of the emerging landscape. Morphic, Alpz, and QuirkM do not need those projects to be lesser in order for this project to ask a different class of questions.

**While SlopOS establishes that an AI-heavy development process can contribute to a remarkably substantial from-scratch Rust operating system that boots on real hardware, runs its own desktop and drivers, carries a large QEMU test suite, and applies machine-checked verification to important invariants, we aim to ask what such success can teach us about the structure underneath an operating system.** How much mechanism is actually fundamental? How much is historical representation? How much can remain replaceable? How much of a modern software world can be inherited without importing the architecture of the system that world originally grew up on?

**While VibeOS demonstrates that a Claude-assisted, from-scratch ARM64 operating system can advance through a graphical desktop, networking, a browser, development tools, MicroPython, TCC, and real Raspberry Pi hardware across documented development sessions, we choose to treat comparable increases in capability as experimental pressure as well as engineering milestones.** When a new workload starts working, Morphic wants to know exactly which new semantic requirement made that possible, which layer owns it, whether unrelated workloads reuse it, and whether the permanent substrate had to grow at all.

Those projects help establish that AI-assisted kernel and OS development can produce consequential artifacts. **Our intended contribution is to use the same historical moment to investigate deeper systems questions that are not answered merely by reaching a shell, a working desktop, an attractive display, a browser, or a long feature list.** Those achievements matter. We simply want the project to remain useful after they are achieved, because the system itself can then become experimental apparatus.

This is not a claim that Morphic is superior to SlopOS, VibeOS, Linux, or any other system. It is a statement of research direction. Different projects can be excellent answers to different questions.

### The central Morphic question

The project is organized around a question that can be tested rather than merely advertised:

> **What is the smallest durable operating-system substrate capable of inheriting a modern software civilization without permanently inheriting the architecture of the operating system that civilization grew up on?**

A closely related hypothesis is the **Morphic Convergence Hypothesis**:

> **As a neutral operating-system substrate acquires the genuinely general semantics demanded by diverse real workloads, the rate at which additional inherited software requires new permanent substrate mechanisms approaches zero.**

In short: **does the kernel converge?**

If the answer is yes, increasingly large software ecosystems should eventually run while the neutral permanent substrate changes less and less. If the answer is no, that negative result is equally valuable: Morphic can show where semantic growth refuses to compress and why.

See [`docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md`](docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md).

### Questions this project is unusually positioned to investigate

Morphic is being built so that each compatibility frontier leaves behind machine evidence, causal failures, explicit semantic repairs, and a record of where each mechanism lives. That makes the repository suitable for questions that are difficult to isolate in a mature monolithic system.

#### What does a modern operating system actually need to provide?

Not everything Linux has accumulated. Not everything POSIX names. What does diverse real software *causally require* beneath those interfaces?

#### Does the permanent kernel semantic surface converge?

As we move from static programs to BusyBox, musl, real Alpine, `apk`, language runtimes, databases, browsers, graphical environments, scientific software, servers, and other workload families, does the rate of new permanent Morphic semantics fall?

#### How much historical API surface is representation rather than fundamental mechanism?

Can many Linux syscalls, ioctls, errno conventions, descriptor behaviors, and ABI structures be translated onto a smaller number of neutral operations? If so, how much semantic compression is possible without lying about behavior?

#### Can compatibility be migration scaffolding rather than permanent architecture?

Can Linux compatibility become broad and useful while Linux-specific meaning remains at a replaceable edge? Can another personality later reuse the same substrate without forcing a redesign?

#### Can one substrate support mutually incompatible systems ideas?

Can alternative schedulers, allocators, IPC models, filesystems, security models, task models, networking designs, deterministic execution models, VM mechanisms, or native APIs be evaluated against a shared substrate and shared workload corpus rather than each experiment reconstructing an entire operating system?

#### Can kernel experiments inherit a software civilization without first rebuilding one?

A new kernel idea often pays a huge bootstrap cost before the actual research begins. Morphic asks whether a researcher can reuse proven executable loading, compatibility translation, resource semantics, machine evidence, test workloads, and other neutral mechanisms, then replace the component they actually want to study.

#### Can a common proving ground reduce the marginal cost of kernel development?

This is a major long-term question for the repository.

Suppose a researcher wants to test a scheduler, memory manager, capability system, IPC design, filesystem, VM mechanism, or security policy. Today that idea may require months of unrelated bootstrapping before it encounters serious software.

Morphic aims to investigate whether the path can become closer to:

```text
new kernel/system hypothesis
        |
        v
reuse proven neutral mechanisms
        |
        v
insert or replace the mechanism under study
        |
        v
run the same workload-pressure corpus
        |
        v
compare behavior, evidence, failures, and semantic cost
```

The ambitious future is a **kernel and systems testing ground** where researchers can reach consequential workloads sooner because solved boundaries remain reusable.

“If it runs through Morphic, it will run everywhere” would be an unjustified claim, and this project will not make it. The research question is narrower and more useful: **can a shared substrate, compatibility corpus, and proof record substantially reduce the amount of unrelated work a new kernel experiment must repeat before its central hypothesis can be tested?**

#### Can cross-architecture work distinguish semantics from machinery?

RISC-V is the current proving architecture. A future second architecture can test which mechanisms are truly semantic, which belong to the platform backend, and how much of the system survives a hardware transition unchanged.

#### Can a second ABI personality expose hidden Linux assumptions?

Linux is currently the strongest compatibility pressure source. A future second personality would be a powerful falsification test. If apparently neutral Morphic mechanisms must be redesigned around assumptions inherited from Linux, we learn that the neutrality claim was weaker than believed.

#### Which workloads exert the highest semantic pressure?

Does a package manager change the substrate more than a language runtime? Does a database introduce more fundamental mechanism than a graphical desktop? Does a browser? A JIT? A scientific workload? A hypervisor? Morphic can measure the answer rather than guess.

#### Which mechanisms provide the highest software-unlock value?

For each admitted mechanism, how much unrelated software becomes possible afterward? Which mechanisms are repeatedly reused, and which were accidental one-workload residue?

#### How small can the trusted and permanent surface remain while capability explodes above it?

Total userspace may become enormous. The research target is not a tiny repository. It is understanding how much code and state must remain privileged, trusted, semantically permanent, or architecture-defining as the inherited world expands.

#### Can AI-assisted development produce better experimental history, not merely more code?

This repository records agent contracts, causal failures, machine evidence, validation artifacts, handoffs, and exact workload frontiers. We want to investigate whether AI-assisted development can produce a systems history that is unusually inspectable and reproducible, rather than merely increasing coding speed.

#### Can failure itself become reusable engineering knowledge?

A failed ELF load, missing syscall semantic, incorrect page permission, ABI mismatch, or process-lifetime bug should not disappear into chat history. Can those failures become indexed artifacts that prevent future kernels, ports, and agents from paying the same discovery cost again?

### The Morphic Semantic Atlas

A central future research artifact is the **Morphic Semantic Atlas**: a versioned, preferably machine-readable mapping from real workload frontiers to the neutral semantics they actually required.

Conceptually:

```text
WORKLOAD                       NEW NEUTRAL SEMANTICS       CUMULATIVE FRONTIER
----------------------------   -------------------------   -------------------
static userspace               measured                    measured
static BusyBox                 measured                    measured
static shell                   measured                    measured
dynamic musl                   measured                    measured
dynamic BusyBox                measured                    measured
real Alpine                    measured                    measured
interactive Alpine             future                      future
playable Alpine                future                      future
apk                            future                      future
Python                         future                      future
Git                            future                      future
SQLite                         future                      future
SSH                            future                      future
scientific stack               future                      future
browser engine                 future                      future
desktop                        future                      future
second ABI personality         future                      future
second hardware architecture   future                      future
```

The numbers must come from evidence, not from promotional estimates.

A mature atlas could support comparative work on semantic compression, trusted-surface growth, compatibility cost, mechanism reuse, workload pressure, cross-architecture stability, and convergence.

### Morphic as a future research launching dock

The long-term aim is broader than making one kernel implementation impressive.

We would like Morphic to become a **launching dock for systems inquiry**: a place where researchers, students, engineers, and agents can introduce a hypothesis without first recreating every unrelated solved boundary.

Possible future experiments include:

- replace the scheduler and run identical workload pressure;
- substitute a capability or object-security model;
- compare IPC designs under the same userspace;
- test alternative address-space and page-management policies;
- compare filesystem semantics without replacing the entire execution environment;
- study deterministic execution or record/replay;
- insert a new networking model;
- compare native QuirkM APIs with Linux compatibility over the same Morphic capabilities;
- introduce a second compatibility personality;
- move the substrate to another architecture;
- study VM/vCPU and hypervisor mechanisms;
- compare agent-generated kernel components using identical validation and workload evidence;
- measure which changes actually increase the admissible hypothesis space.

The ideal result is that future researchers spend more time testing the mechanism they care about and less time rebuilding boot code, loaders, test harnesses, compatibility plumbing, or userspace merely to reach the experiment.

See [`docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md`](docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md).

### We invite examination, including hostile examination

We want this repository studied, compared, reproduced, criticized, extended, and contradicted.

Useful future work includes questions such as:

```text
Does the Morphic convergence curve actually flatten?

Which Linux interfaces refuse semantic compression?

Does a database workload falsify mechanisms that looked general under Alpine?

Does a browser force permanent complexity back into the core?

Can a second personality reuse Morphic without Linux contamination?

Can another architecture preserve the same semantic decomposition?

Does a replacement scheduler inherit the same software frontier?

Can Morphic shorten time-to-experiment for a new kernel design?

Which Morphic abstractions are wrong?

Which can be deleted?

Which are missing?
```

A result that disproves a favored Morphic idea is not an attack on the project. It is research progress.

### Research launching points

If you want to study the project rather than merely boot it, begin here:

- [`docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md`](docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md) — the convergence thesis, Semantic Atlas, measurements, and falsifiability requirements.
- [`docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md`](docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md) — Morphic as a shared substrate for many classes of systems experiments.
- [`docs/papers/COMPATIBILITY_AS_MIGRATION_SCAFFOLD.md`](docs/papers/COMPATIBILITY_AS_MIGRATION_SCAFFOLD.md) — compatibility as an edge and migration instrument rather than permanent ontology.
- [`docs/research/FRESH_AGENT_ADVANCEMENT_AND_INHERITABLE_TECHNICAL_KNOWLEDGE.md`](docs/research/FRESH_AGENT_ADVANCEMENT_AND_INHERITABLE_TECHNICAL_KNOWLEDGE.md) — whether fresh agents can inherit enough explicit knowledge to advance systems work.
- [`docs/research/AGENT_FRAMEWORK_FAILURE_LEDGER.md`](docs/research/AGENT_FRAMEWORK_FAILURE_LEDGER.md) — preserved failures as research evidence.
- [`docs/reports/`](docs/reports/) — concrete implementation frontiers and machine evidence.
- [`COMMANDS.md`](COMMANDS.md) — durable reproduction commands.

The aspiration is not merely to join the genre of AI-assisted operating systems. **It is to help turn that genre into something researchers can measure.** SlopOS, VibeOS, Morphic, and future projects can then be more than impressive demonstrations in isolation: together they can become evidence about how AI changes systems construction, which architectures survive real workloads, what complexity is actually necessary, and how much development effort future kernels might inherit instead of repeat.

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

# ★ PERSISTENT INTERACTIVE REAL ALPINE SHELL ★

**Batches 32C through 32E are complete. Morphic now boots the exact Alpine v3.22.0 RV64 namespace, enters the real musl interpreter and BusyBox `/bin/sh`, accepts live keyboard input, preserves an interactive shell across commands, and creates a bounded fork-shaped child for external-command pressure.**

The current proof frontier is no longer shell startup or `clone(220)`. The real child reaches Linux/RV64 `execve(221)` for `/bin/ls`; that syscall is the exact next unsupported boundary.

```text
exact Alpine v3.22.0 RV64 minirootfs       PASS
complete namespace: 517 objects            PASS
regular-file backing: 7,069,903 bytes      PASS
runtime /bin/sh -> /bin/busybox lookup     PASS
same-namespace real musl PT_INTERP lookup  PASS
real ld-musl interpreter-first             PASS
PREPARE -> COMMIT -> execute               PASS
W+X=0                                      PASS

live keyboard input                        PASS
real interactive BusyBox /bin/sh           PASS
echo morphic                               PASS
persistent second command                  PASS
pwd -> /                                   PASS
PATH lookup for ls                         PASS
/bin/ls -> /bin/busybox resolution         PASS

clone(220), flags 0x11, null child stack   PASS
real child execution                       PASS
bounded parent snapshot/restoration        PASS
parent shell after child failure           PASS: still-alive
non-fatal saturating syscall evidence      PASS

execve(221) replacement                    CURRENT BLOCKER
ls /                                       PENDING
cat /etc/alpine-release                    PENDING
writable /tmp and redirection              PENDING
pipes and multi-process lifetime           PENDING
★ PLAYABLE ALPINE ★                         PENDING
```

The bounded `clone(220)` path does not fake a PID or execute child work inline in the parent. It snapshots the parent, runs a real child first, and restores the isolated parent state after child termination. When the child encountered unsupported `execve(221)`, ash reported `/bin/sh: ls: Function not implemented`; the restored shell then successfully printed `still-alive`.

The historical 64-entry syscall-evidence ceiling is also non-fatal now: the first window is retained, total/dropped counters expose saturation, and valid semantic execution continues.

This is **interactive Alpine**, but not yet **playable Alpine**. External programs still require bounded namespace-backed execution-image replacement and the later filesystem, descriptor, redirection, pipe, wait, and lifetime semantics proven necessary by unchanged Alpine commands.

See [`docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md), [`docs/reports/AGENTIC_SNOWBALL_BATCH_32D.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32D.md), and [`docs/reports/AGENTIC_SNOWBALL_BATCH_32E.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32E.md).

## Try the real Alpine proof in your own console

You can reproduce the foundational Batch 32C milestone from a fresh clone. This command runs the real Alpine `/bin/sh -c 'echo alpine'` path under Morphic and shows the proven userspace output. Batches 32D and 32E have since advanced the machine to the persistent interactive and bounded-child frontier summarized above.

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

- What is the minimum general execution-image replacement required for the cloned Alpine child to complete its real `execve(221)` request?
- After real `/bin/ls` executes, what directory, wait, FD-inheritance, pipe, redirection, TTY, and signal semantics does unchanged Alpine pressure actually demand?
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

**First real Alpine, persistent interaction, root `pwd`, `/bin/ls` resolution, bounded `clone(220)`, real child entry, parent restoration, and non-fatal trace saturation are complete. The exact active blocker is Linux/RV64 `execve(221)` in the child created for unchanged `ls /`.**

```text
FIRST STATIC BUSYBOX SHELL                complete
        |
        v
FIRST REAL DYNAMIC MUSL                   complete
        |
        v
DYNAMIC BUSYBOX SHELL                     complete
        |
        v
REAL ALPINE NAMESPACE                     complete
        |
        v
★ FIRST REAL ALPINE ★                     complete
        |
        v
PERSISTENT INTERACTIVE ALPINE SHELL       complete
echo morphic / second command / pwd
        |
        v
PATH + /bin/ls RESOLUTION                 complete
        |
        v
BOUNDED clone(220) + REAL CHILD           complete
parent restoration + still-alive
        |
        v
execve(221)                               <-- exact current blocker
        |
        v
REAL ls / + DIRECTORY ENUMERATION         pending
        |
        v
READ-ONLY PLAYABILITY
cat /etc/alpine-release
        |
        v
WRITABLE /tmp + REDIRECTION
        |
        v
PIPES + PROCESS / FD LIFETIME
        |
        v
★ PLAYABLE ALPINE ★
        |
        v
APK LOCAL DATABASE
        |
        v
LOCAL .APK INSTALL
        |
        v
NETWORKING / DNS / TLS
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
- [`docs/reports/AGENTIC_SNOWBALL_BATCH_32D.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32D.md)
- [`docs/reports/AGENTIC_SNOWBALL_BATCH_32E.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32E.md)

Current execution plan:

- [`docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_32F_EXECVE221_TO_PLAYABLE_ALPINE_BOUNDED_LEAPS_MANDATORY_30MIN_HANDOFF.txt`](docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_32F_EXECVE221_TO_PLAYABLE_ALPINE_BOUNDED_LEAPS_MANDATORY_30MIN_HANDOFF.txt)

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

Start with [`docs/README.md`](docs/README.md), [`AGENTS.md`](AGENTS.md), [`COMMANDS.md`](COMMANDS.md), [`docs/porting/PORTING.md`](docs/porting/PORTING.md), [`docs/project_vocab.md`](docs/project_vocab.md), [`docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md`](docs/research/MORPHIC_CONVERGENCE_HYPOTHESIS.md), [`docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md`](docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md), [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/), and [`docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_32C.md).

## Validation

The broad repository gates are `zig build check` and `python3 tools/developer-command.py validate-repository`. Focused commands are documented in [`COMMANDS.md`](COMMANDS.md).

Do not weaken a gate merely to make new work pass. Fix the work or narrow the claim.

## Contributing

Contribution guidance lives in [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

Research that proves an existing Morphic or QuirkM idea wrong is useful too. Prefer falsifiable evidence over protecting a favored architecture.

**If this problem space sounds fun, you are invited.** You do not need to wait for the project to become mature, and you do not need permission to explore a different direction. Fork it, test it, break an assumption, improve a mechanism, propose a competing design, or build something larger on top of it.

## Scope and nonclaims

Alpz is **not Linux**, QuirkM is **not a completed native operating environment**, and Morphic is **not presented as a production kernel platform**.

The project now has real static-musl execution, a proven static Alpine BusyBox shell, successful real dynamic-musl execution through the real userspace interpreter, a proven dynamic Alpine BusyBox shell, **first real Alpine through a complete serialized Alpine v3.22.0 RV64 namespace**, a persistent interactive shell, root `pwd`, real `/bin/ls` resolution, and bounded `clone(220)` child/parent-restoration semantics. It does **not yet claim** playable Alpine, successful external-command `execve(221)`, general Linux compatibility, working `apk add`, production security, production readiness, or completed virtualization.

Proof records, exact artifacts, machine traces, validation gates, and current code define what has actually been achieved.
