# zig-reference

> **Solved once. Documented completely. Reused forever.**

`zig-reference` is a cumulative systems-engineering project for Zig 0.14.0.

It has three connected parts:

- **Z-Ref** — reusable systems knowledge: source, contracts, dependencies, failure behavior, diagnostics, validation, evidence, and porting knowledge;
- **Morphic** — machine-independent composition intended to preserve behavior across different machine bodies;
- **Alpz** — the RV64 kernel currently being used to pressure-test those ideas against real machine boundaries.

The central question is simple:

> Can a systems repository preserve enough engineering truth that later contributors and coding agents spend less time rediscovering solved problems?

The project is trying to answer that question with an operating system rather than with toy examples.

## Current state

As of August 10, 2026, the current completed machine milestone is **Batch 23**.

Alpz has already demonstrated, under real `qemu-system-riscv64` execution:

```text
S-mode execution
→ synchronous and timer traps
→ allocator-owned physical frames
→ active Sv39
→ RX / R-NX / RW-NX permission domains
→ real S→U→S transitions
→ ECALL service and return to U-mode
→ bounded real copy-IN and copy-OUT
→ bounded RV64 ELF load planning
→ real RV64 ELF execution from parsed e_entry
→ separate R-X and RW- PT_LOAD segments
→ initialized writable data
→ non-empty BSS zeroed before U-mode
→ U-mode mutation of ELF-backed writable storage
→ supervisor observation of that mutation in the backing frame
```

These are not intended as broad Linux-compatibility claims. Each machine milestone has focused tests, strict verifiers, explicit nonclaims, and repeated real-QEMU execution where the claim depends on the machine.

The next planned boundary is **Batch 24A**: a reusable bounded RV64 Linux initial-process-stack planner for `argc`, `argv`, `envp`, and `auxv`.

The plan exists. The implementation does not yet count as accomplished.

For the exact current evidence, see [`docs/reports/AGENTIC_SNOWBALL_BATCH_23.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_23.md).

## The long path

The intended progression is:

```text
reusable systems primitives
        ↓
real RV64 kernel
        ↓
Linux-compatible process startup
        ↓
Linux syscall / fd / VFS / memory / process semantics
        ↓
BusyBox and musl
        ↓
Alpine
        ↓
QEMU/TCG running inside Alpz
        ↓
Alpz testing a newer Alpz
        ↓
recursive differential qualification
        ↓
RISC-V H-extension virtualization
        ↓
VMM
        ↓
possible /dev/kvm-compatible interface
```

This is a roadmap, not a completion claim. The batch numbers are planning bands and may move as real workloads expose the actual dependency structure.

See [`docs/roadmaps/ALPZ_TO_ALPINE_QEMU_KVM_AND_BEYOND.md`](docs/roadmaps/ALPZ_TO_ALPINE_QEMU_KVM_AND_BEYOND.md).

## Why this project is unusual

There are already serious operating-system projects in Rust, Zig, C, C++, and other languages. Redox and Theseus explore substantial Rust-based operating-system designs. Pluto and other projects demonstrate that writing a kernel in Zig is not itself novel. AI-assisted operating-system projects also exist.

So the interesting part here is not a claim to be the first Zig kernel, the first AI-assisted OS, or the first experimental hypervisor.

The unusual part is the combination of goals:

1. build a real kernel rather than only a reference library;
2. target an existing userspace contract instead of inventing a private application ABI;
3. preserve reusable low-level knowledge in machine-readable form;
4. distinguish claims from executed evidence;
5. keep negative knowledge and known proof limitations visible;
6. make later agents discover and reuse earlier work mechanically;
7. eventually use the running system itself as part of the qualification environment for its successor.

That combination is the experiment.

If it works, the interesting result will not be that an AI helped write a kernel. It will be that a large systems project became easier to continue because previous engineering decisions, invariants, failures, and validation paths remained usable by later contributors.

## A young project on a young toolchain

The public work represented here is very recent. By August 10, 2026, the kernel progression above had been assembled in less than a week of repository development.

The repository deliberately targets **Zig 0.14.0**, a comparatively young systems-language release. That makes portability, version-sensitive behavior, and explicit migration knowledge part of the project rather than an afterthought.

The speed of the early work is interesting, but it is not the argument for the project. Early kernel milestones are much smaller than Linux compatibility, a useful distribution, QEMU self-hosting, or a hardware VMM.

What matters is whether the pace continues to benefit from accumulated reusable work instead of collapsing under its own complexity.

That is what the later batches are meant to test.

## The Snowball Principle

Every expensive discovery should leave behind something cheaper to reuse.

A checked range should make later parsers simpler.

A frame allocator should make paging simpler.

A page-table builder should make U-mode work smaller.

A settled U-mode boundary should make ELF execution smaller.

A settled user-memory boundary should make many future syscalls smaller.

The intended loop is:

```text
solve one boundary
      ↓
record its contract
      ↓
record its failure behavior
      ↓
record focused validation
      ↓
make it discoverable
      ↓
reuse it in the next boundary
```

That is the **Snowball Principle**.

The repository records **Snowball Yield** for major composition work: what already existed, what was genuinely missing, what new reusable work was created, and what evidence closed the run.

See [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md) and [`docs/standards/SNOWBALL_YIELD.md`](docs/standards/SNOWBALL_YIELD.md).

## More than source code

A normal source tree often leaves later contributors to reconstruct important facts from implementation details and commit history.

Z-Ref tries to keep those facts explicit.

A reusable module normally carries:

```text
src/*.zig
README.md
MASTERY.md
DETAILS.md
details.json
port.js
focused tests
```

Where relevant, the repository also records:

```text
public symbols
ownership and borrowing
resource bounds
failure atomicity
invalid states
known diagnostics
canonical repairs
dependency edges
reverse impact
validation commands
machine evidence
porting risks
```

The goal is not documentation volume. The goal is to make selection and reuse cheaper than rediscovery.

## Agent-native, not agent-dependent

The repository is designed so a coding agent can begin with a capability query rather than a blind source-tree crawl:

```sh
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
python3 tools/query-reference.py agent decide "YOUR TASK"
python3 tools/query-reference.py capability "CAPABILITY"
```

The intended workflow is:

```text
task
→ discover
→ select or reject
→ inspect compact contract
→ inspect impact
→ reuse existing capability
→ implement only the missing behavior
→ validate narrowly
→ validate globally
→ leave better knowledge behind
```

Humans can use the same path. Nothing important is intended to be locked inside model context or a private service.

## Evidence, not declaration

This repository deliberately separates different levels of confidence.

A component can be implemented without being system-proven. A test can pass without proving every invariant. A machine-readable contract can describe intended behavior without making that behavior true by declaration.

For machine-specific claims, the preferred pattern is:

```text
claim
→ exact observable relationship
→ focused positive test
→ rejection / mutation test where useful
→ real machine execution
→ explicit nonclaims
→ repository-wide validation
```

Known weaknesses are supposed to remain visible until repaired.

A milestone report should make it possible to tell the difference between:

- what happened;
- what was inferred;
- what was tested;
- and what remains outside the claim.

## What is not done

Alpz is **not Linux** today.

The project does not currently claim:

- Linux syscall compatibility;
- a general process model;
- `fork`, `clone`, or `execve`;
- file descriptors or a VFS;
- `mmap`, `brk`, or mature fault recovery;
- Linux signal semantics;
- futex/thread completeness;
- musl compatibility;
- dynamic ELF / `PT_INTERP` support;
- BusyBox compatibility;
- an Alpine shell;
- general `/proc`, `/sys`, or `/dev` support;
- networking;
- QEMU running inside Alpz;
- SMP;
- production security;
- RISC-V H-extension virtualization;
- `/dev/kvm`;
- production readiness.

Those are future pressures, not implied accomplishments.

## Rough distance to the larger milestones

The current planning bands are approximately:

```text
23      completed: writable two-segment RV64 ELF + BSS machine proof
24A     next: bounded Linux initial-stack planner
24B     real argc/argv/envp/auxv stack under U-mode
25–35   core Linux ABI and process/filesystem/memory foundations
~35     static BusyBox / serious shell territory
~40s    musl and dynamic ELF pressure
~45–50  first credible Alpine shell
~50–55  increasingly useful Alpine
~60s    QEMU/TCG running as an Alpz workload
~70     recursive successor-qualification laboratory
~75–90 RISC-V H-extension and VMM work
~100    serious native hypervisor territory
101+    optional KVM-compatible interface pressure
```

These numbers are intentionally rough. The repository follows dependency pressure rather than a fixed release calendar.

## Why Linux compatibility

Many experimental operating systems define a new application environment and then port software to it. That is a valid design choice.

Alpz is taking a different route: move the compatibility burden downward so existing software increasingly does not need to know that Alpz is underneath it.

The eventual test is intentionally ordinary:

```text
existing Linux program
        ↓
Alpz
        ↓
works without an Alpz-specific port
```

That makes the Linux ABI campaign larger and slower than a private application API, but it also makes success more broadly useful.

## Why QEMU matters

QEMU/TCG is not only a flashy workload milestone.

If Alpz can host enough Linux-compatible userspace to run QEMU, the system gains a useful recursive laboratory:

```text
trusted Alpz generation
        ↓
QEMU/TCG
        ↓
known-good guest       candidate Alpz guest
        ↓                    ↓
       same controlled workload
                 ↓
               compare
                 ↓
        smallest reproducer
                 ↓
              permanent test
```

That is where operating-system compatibility work can begin feeding directly back into Z-Ref as small, permanent pieces of executable knowledge.

## Why the hypervisor path comes later

Native virtualization is not required for the first recursive laboratory. QEMU/TCG can provide that earlier.

The RISC-V H-extension path is therefore deliberately later:

```text
HS-mode
→ hypervisor CSRs
→ guest-physical address model
→ stage-2 translation
→ VS-mode entry
→ VM exits
→ virtual interrupts and timers
→ guest devices
→ usable VMM
```

If that matures, a later compatibility layer may explore a `/dev/kvm`-style interface so existing QEMU acceleration paths can target Alpz rather than a bespoke VMM API.

That is a long-term research direction, not a present capability.

## Why it may be worth finishing

The project is far enough along that a new contributor does not have to begin with a blank kernel, but early enough that many of the consequential boundaries remain open.

Someone continuing the work could still be responsible for the first version of this project that:

- starts a Linux-shaped process with a real initial stack;
- runs a serious BusyBox shell;
- boots Alpine;
- runs QEMU/TCG as an ordinary workload;
- uses one Alpz generation to qualify another;
- enters a guest through the RISC-V H extension;
- or exposes a useful hardware-virtualization interface.

Those are substantial systems milestones on their own. They do not need exaggerated claims attached to them.

The repository is structured so that, if development changes hands, a contributor should be able to identify the last proved boundary, reproduce it, inspect its known limitations, and continue from there.

That continuity is itself part of what Z-Ref is trying to demonstrate.

## The larger hope

The strongest outcome would be for agent-assisted engineering to stop treating every new repository as a blank slate.

Perhaps Z-Ref itself eventually becomes a corpus that agents routinely query before generating low-level infrastructure.

Perhaps a different project implements the idea better.

Either way, the principles are intended to be portable:

```text
search before inventing
reuse before rewriting
make important contracts machine-readable
preserve negative knowledge
separate claims from evidence
qualify replacements against the same boundary
leave the next contributor less uncertainty
```

If those practices become ordinary, then the project will have succeeded at something broader than producing one kernel.

## Portability

The repository currently targets Zig 0.14.0.

Implemented modules carry `port.js` migration knowledge describing version-sensitive syntax, standard-library APIs, build definitions, dependency order, semantic risks, and validation commands.

The longer-term experiment is not only whether the source can be upgraded. It is whether a subsystem can be reimplemented while preserving the same semantic and validation boundary.

See [`docs/porting/PORTING.md`](docs/porting/PORTING.md).

## Validate it yourself

Create the repository-local Python environment:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r tools/requirements.txt
python3 tools/python-environment.py --check
```

Run the broad repository gate:

```sh
zig build check
python3 tools/developer-command.py validate-repository
```

For the current frontier:

- [`docs/reports/AGENTIC_SNOWBALL_BATCH_23.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_23.md)
- [`docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_24A_BOUNDED_RV64_LINUX_INITIAL_STACK_PLAN.txt`](docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_24A_BOUNDED_RV64_LINUX_INITIAL_STACK_PLAN.txt)
- [`COMMANDS.md`](COMMANDS.md)


## Start here

If you are new to the repository:

1. Read [`AGENTS.md`](AGENTS.md).
2. Run `agent bootstrap` and `agent doctor`.
3. Read the latest completed batch report and the next plan.
4. Query existing capabilities before adding another primitive.
5. Preserve explicit nonclaims.
6. Keep evidence reproducible


The repository is meant to make the next result testable.
