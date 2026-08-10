# zig-reference

> **Solved once. Documented completely. Reused forever.**

## What if a systems project could remember enough that the 1,000th agent starts far above the first?

`zig-reference` is an experiment in cumulative systems engineering for humans and coding agents.

It began as a library of small, explicit Zig 0.14.0 building blocks. It is becoming something larger:

- **Z-Ref** — reusable systems knowledge: source, contracts, dependencies, failure behavior, diagnostics, validation, evidence, and porting knowledge;
- **Morphic** — machine-independent composition whose behavior can be carried across different machine bodies;
- **Alpz** — the real kernel embodiment currently pressure-testing the idea on RV64.

The long-term target is deliberately absurd in the best possible way:

```text
reusable proved primitives
        ↓
real RV64 kernel
        ↓
Linux-compatible userspace
        ↓
BusyBox / musl / Alpine
        ↓
QEMU/TCG running inside Alpz
        ↓
Alpz tests a newer Alpz
        ↓
recursive differential qualification
        ↓
RISC-V H-extension virtualization
        ↓
VMM / eventually /dev/kvm
        ↓
QEMU + hardware-accelerated guests
```

The point is not merely to write an operating system.

The point is to see whether **solved engineering can compound**.

---

## Less than a week in

On **August 10, 2026**, this repository was still less than a week old.

Zig 0.14.0, the toolchain version this repository deliberately targets, had itself only been released on **March 5, 2025**. Zig's own release notes still warn that non-trivial work on the language may encounter bugs, miscompilations, and regressions.

And yet, before the repository was a week old, Alpz had already crossed these real machine boundaries:

```text
S-mode execution
→ synchronous traps
→ asynchronous supervisor timer interrupts
→ bounded monotonic time
→ deterministic scheduling pressure
→ allocator-owned physical frames
→ active Sv39
→ hardened RX / R-NX / RW-NX permission domains
→ real S→U→S transition
→ ECALL service and return to U-mode
→ bounded real copy-IN
→ bounded real copy-OUT
→ bounded RV64 ELF load planning
→ real RV64 ELF execution from parsed e_entry
→ separate writable PT_LOAD
→ initialized data
→ real non-empty BSS
→ U-mode mutation of ELF-backed writable memory
→ supervisor observes the mutation in the actual backing frame
```

Those are not roadmap bullets pretending to be accomplishments. They are checked-in milestones with focused tests, strict verifiers, explicit nonclaims, and real `qemu-system-riscv64` execution.

The current completed machine milestone is **Batch 23**.

The current frontier is **Batch 24A**: a reusable bounded RV64 Linux initial-process-stack planner for `argc`, `argv`, `envp`, and `auxv`. The plan exists. The implementation has not yet been earned.

That distinction matters here.

A plan is a plan.

A claim is a claim.

A passing machine proof is something else.

---

# Why this could matter historically

History is not something a README gets to award itself.

There are already serious alternative operating-system projects. [Redox](https://github.com/redox-os/redox) is a substantial Rust microkernel operating system. [Theseus](https://github.com/theseus-os/Theseus) is a research OS written from scratch in Rust and explores using language semantics to reshape operating-system design. [Pluto](https://github.com/ZystemOS/pluto) demonstrates that a kernel written almost entirely in Zig is not itself a unique idea. [VibeOS](https://github.com/kaansenol5/VibeOS) demonstrates how quickly an AI-assisted ARM64 hobby OS can accumulate visible features, applications, and ports.

So we will not claim:

> first Zig kernel

or:

> first AI-built OS

or:

> first memory-safe-language operating system

or:

> first experimental hypervisor project

Those claims would be false or meaningless.

The potentially unusual thing is the **combination**.

`zig-reference` is trying to build a real operating system while simultaneously building a machine-readable memory of how the operating system was built, what each layer promises, what it does **not** promise, what depends on it, what failures have already been understood, and what evidence qualifies a replacement.

If that works at scale, the historical contribution is not:

> an AI wrote a kernel quickly.

It is closer to:

> **a software repository learned to preserve enough engineering truth that later agents could continue from validated knowledge instead of repeatedly rediscovering the same system.**

That is the bet.

## The historical case, without the bullshit

A project like this becomes historically interesting only if several hard things eventually become true.

### 1. The repository gets easier to extend as it gets larger

Most large software accumulates knowledge debt.

More code means more assumptions, more hidden coupling, more archaeology, and more fear of touching anything.

Z-Ref is attempting the opposite curve:

```text
solve boundary
→ record contract
→ record dependencies
→ record failures
→ record validation
→ record evidence
→ expose it through deterministic indexes
→ next contributor reuses it
```

If the thousandth change is cheaper because the first 999 left behind usable truth, that is a meaningful systems-engineering result whether or not Alpz itself ever becomes famous.

### 2. Applications eventually stop caring that Alpz exists

Many experimental operating systems expose their own application API and then port software to that environment.

That is legitimate engineering, but Alpz is making the more expensive bet: **absorb compatibility into the operating system**.

The intended target is the Linux userspace contract closely enough that existing software increasingly does not need an Alpz-specific edition.

The dream demo is therefore not a bespoke graphical application.

It is something much more boring and much more powerful:

```text
existing Linux program
        ↓
run it
        ↓
it works
```

No Alpz port.

No special application API.

Bring your programs.

### 3. The implementation language becomes less important than the preserved semantics

The repository currently targets Zig 0.14.0.

That is intentional, but Zig is not meant to become a prison.

A future agent should eventually be able to take a proved subsystem and ask:

> Re-embody this in a newer Zig.

Or:

> Re-embody this in C.

Or Rust.

Or a language that does not exist yet.

The goal is not mechanical translation. The goal is semantic transfer:

```text
implementation A
      ↓
contracts + evidence + tests
      ↓
implementation B
      ↓
same qualification boundary
```

If that becomes routine, then the repository has preserved something more durable than source code.

### 4. The operating system eventually participates in qualifying its own successor

The long-range experiment is recursive.

Once Alpz can host enough Alpine userspace to run QEMU/TCG, a trusted generation can become a laboratory for the next one:

```text
trusted Alpz N
      ↓
Alpine userspace
      ↓
QEMU/TCG
      ↓
Alpz N+1 candidate
      ↓
controlled probes
      ↓
compare against known-good behavior
      ↓
minimize disagreement
      ↓
repair
      ↓
permanent regression
      ↓
promote N+1
```

The concise version is:

> **A trusted generation of the system should eventually be able to construct, execute, interrogate, compare, and qualify its successor before handing control to it.**

If we reach that point, Alpz is no longer merely an operating system project.

It becomes an experiment in **regenerative engineering infrastructure**.

### 5. The principles may matter even if this repository does not become the standard

The highest ambition is that one day an engineering agent might begin low-level work by synchronizing an approved corpus like Z-Ref before inventing anything.

Maybe that corpus is literally this repository.

Maybe it is not.

Perhaps another project eventually implements these ideas better, at larger scale, in another language.

That would still be a victory for the underlying principle:

```text
search before inventing
reuse before rewriting
make contracts machine-readable
separate claims from evidence
preserve negative knowledge
qualify replacements mechanically
leave the next agent less uncertainty
```

The standard does not have to carry our name for the idea to have mattered.

---

# Where we actually are

## Proven now

The repository already contains a broad set of reusable, contracted systems modules covering bounded storage, checked arithmetic and ranges, byte parsing/writing, ELF64 parsing, typed addresses, physical memory regions and frame allocation, Sv39 page-table primitives, walkers/builders, invalidation semantics, user-memory transfer planning, and bounded ELF load planning.

The agent-facing layer provides deterministic discovery, dependency information, machine-readable `details.json` contracts, validation evidence, generated indexes, diagnostics, composition information, impact queries, and repository-wide validation.

The real RV64 kernel has mechanically demonstrated, among other things:

- active Sv39 translation using allocator-owned page-table frames;
- supervisor text RX, rodata R/NX, writable memory RW/NX;
- no intentional supervisor/user W+X mapping in the proved leaf sets;
- real U-mode entry through `SRET`;
- trusted U→S trap-stack switching;
- ECALL return to supervisor and deliberate return back to U-mode;
- bounded real user-memory copy-IN and copy-OUT;
- one real separately built RV64 ET_EXEC executing from the ELF planner's parsed `e_entry`;
- a second real ELF fixture with separate R-X and RW- `PT_LOAD` segments;
- exact initialized writable bytes;
- an 8-byte non-empty BSS tail proven zero before U-mode;
- a U-mode write into that BSS-backed storage;
- supervisor observation of the exact mutation in the same allocator-owned backing frame;
- repeated real-QEMU verification while preserving the same canonical 765-byte Morphic result across hosted, fake, and machine embodiments.

The complete Batch 23 record is in [`docs/reports/AGENTIC_SNOWBALL_BATCH_23.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_23.md).

## Not proven yet

This is **not Linux yet**.

We do not currently claim:

- Linux syscall compatibility;
- a general process model;
- `fork`, `clone`, or `execve`;
- file descriptors or a VFS;
- `mmap`, `brk`, or mature fault recovery;
- Linux signals;
- futex/thread completeness;
- musl compatibility;
- dynamic ELF / `PT_INTERP` support;
- BusyBox compatibility;
- an Alpine shell;
- `/proc`, `/sys`, or general `/dev` support;
- networking;
- QEMU running inside Alpz;
- SMP;
- production security;
- RISC-V H-extension virtualization;
- `/dev/kvm`;
- production readiness of any kind.

There is also known proof-hardening debt. Milestone tags and reports are expected to preserve the good, the bad, and the ugly rather than laundering old limitations into future guarantees.

That is not modesty theater.

It is how later agents avoid building on fictional truth.

---

# How far from the big goal?

The batch numbers are **planning bands, not promises**. If one real workload exposes five closely related missing behaviors, they may belong in one batch. If one supposedly tiny boundary turns out to hide three independent contracts, it may be split.

The current working shape is roughly:

```text
23      DONE: real R-X + RW ELF, initialized data, BSS, U-mode mutation
24A     NEXT: bounded Linux initial-stack planner
24B     real argc/argv/envp/auxv stack under U-mode + QEMU

25–35   core Linux ABI
         syscalls / fd / VFS / mmap / process / signals / futex

~35     static BusyBox / first serious shell territory

~40s    musl + dynamic ELF pressure

~45–50  first credible Alpine shell

~50–55  increasingly useful Alpine
         networking / apk / proc/dev / broader compatibility

~60s    QEMU/TCG pressure inside Alpz
         eventually booting another machine

~70     recursive successor-qualification laboratory

~75–90 RISC-V H-extension / stage-2 / VS-mode VMM work

~100    serious native hypervisor territory

101+    optional KVM-compatible interface pressure
```

Do not fetishize the numbers.

The destination matters more:

```text
ALPZ RUNS PROGRAMS
      ↓
ALPZ LOOKS LIKE LINUX
      ↓
ALPINE RUNS
      ↓
QEMU RUNS
      ↓
ALPZ CAN TEST ALPZ
      ↓
HARDWARE VIRTUALIZATION
```

See [`docs/roadmaps/ALPZ_TO_ALPINE_QEMU_KVM_AND_BEYOND.md`](docs/roadmaps/ALPZ_TO_ALPINE_QEMU_KVM_AND_BEYOND.md).

---

# If we stop, you should take it

Maybe the original maintainer gets Alpz all the way to Alpine, recursive QEMU, and hardware virtualization.

Maybe not.

That possibility is part of the architecture.

This repository is specifically trying **not** to require the original author's memory in order to continue.

If development stops, the intended reaction is not:

> Damn. I wonder what he meant by all this.

It is:

> I can see the exact last proved boundary. I can see the contracts. I can see the nonclaims. I can run the validators. I can see what depends on what. I can continue.

And yes, there is a real opportunity here for an ambitious systems engineer.

If you are the person who takes this from the current RV64 process-image boundary to a real Alpine shell, that is objectively difficult public engineering.

If you are the person who makes Alpz host QEMU and qualify a successor generation, you will have completed a genuinely unusual systems experiment.

If you are the person who turns the accumulated RISC-V machinery into a real H-extension VMM or a credible KVM-compatible substrate, your work will be attached permanently to that milestone.

That is not a promise of fame.

Nobody can promise historical importance in advance.

But difficult public projects have identifiable firsts **inside their own history**, and the person who closes one of these boundaries gets to own the work that closed it.

So if your reaction to this README is:

> He got this far. I think I can get farther.

Good.

That is exactly the reaction we want.

Think the architecture is overbuilt? Prove a simpler one while preserving the evidence.

Think the batch plan is too conservative? Collapse three milestones without weakening the truth boundary.

Think the original implementation is wrong? Replace it and make the same qualification suite pass.

Think you can get to Alpine faster?

**Please do.**

The repository is not a monument to its author.

It is a challenge to its successor.

---

# Why not just build features?

Because features are only one form of progress.

A feature-first OS can optimize for visible capability:

```text
kernel
→ custom API
→ port applications
→ visible demos
```

That is a perfectly legitimate project shape. VibeOS, for example, openly documents an ARM64 hobby OS built with Claude Code over 64 sessions, with a GUI, networking, MicroPython, TinyCC, DOOM, and other software, including several third-party components.

Alpz is optimizing for a different long-term payoff:

```text
primitive
→ explicit contract
→ machine-readable dependency truth
→ focused tests
→ real machine evidence
→ reusable composition
→ Linux compatibility pressure
→ existing ecosystem
```

One produces screenshots earlier.

The other is trying to make the next thousand changes cheaper.

Neither automatically wins.

This repository exists to find out whether the second strategy can compound far enough to become extraordinary.

---

# The Snowball Principle

Every expensive discovery should leave behind something cheap enough to reuse.

A solved checked range should make future parsers easier.

A solved frame allocator should make paging easier.

A solved page-table builder should make U-mode easier.

A solved U-mode boundary should make ELF execution easier.

A solved ELF process-image boundary should make Linux startup easier.

A solved user-pointer boundary should make many syscalls cheaper.

Eventually:

```text
one difficult discovery
      ↓
small permanent proof
      ↓
future agent finds it
      ↓
future agent does not rediscover it
```

That is **Snowball Yield**.

Read [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md) and [`docs/standards/SNOWBALL_YIELD.md`](docs/standards/SNOWBALL_YIELD.md).

---

# Evidence, not vibes

This repository is comfortable saying **no**.

No, a test is not a formal proof.

No, a JSON contract does not make code trustworthy by declaration.

No, a boot message does not prove an invariant.

No, an old milestone does not automatically remain numerically identical after the machine changes.

No, a successful happy path does not prove the verifier rejects contradictory evidence.

The preferred pattern is:

```text
claim
→ exact evidence relationship
→ focused positive test
→ negative / mutation test when appropriate
→ real machine execution when the claim is machine-specific
→ explicit nonclaims
→ repository validation
```

A later milestone should preserve earlier strict verifiers whenever practical instead of quietly weakening them to make new work pass.

Known weaknesses should remain visible until they are actually repaired.

---

# Agent-native by design

A coding agent should not need to read the entire repository before touching one component.

Start with:

```sh
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
```

Then ask the repository what it already knows:

```sh
python3 tools/query-reference.py agent decide "YOUR TASK"
python3 tools/query-reference.py capability "CAPABILITY"
```

The intended workflow is:

```text
task
→ discover
→ select or reject
→ inspect compact contract
→ compose existing capabilities
→ inspect impact
→ implement only the missing behavior
→ validate narrowly
→ validate globally
→ leave better knowledge behind
```

Not:

```text
open random files
→ guess architecture
→ rewrite solved primitive
→ debug for an hour
→ discover the primitive already existed
```

Each reusable module normally carries:

```text
src/*.zig
README.md
MASTERY.md
DETAILS.md
details.json
port.js
focused tests
```

The human-readable files teach.

The machine-readable files let agents select and compose.

The tests and evidence decide what may actually be claimed.

---

# Portability is part of the experiment

`zig-reference` currently targets **Zig 0.14.0**.

That version was released on March 5, 2025, and the repository deliberately treats version migration as engineering work rather than search-and-replace.

Implemented modules carry `port.js` migration knowledge describing version-sensitive syntax, standard-library APIs, build definitions, dependency order, semantic risks, and validation commands.

The long-term experiment is whether a future agent can migrate or re-embody a subsystem while preserving what **solved** meant.

See [`docs/porting/PORTING.md`](docs/porting/PORTING.md).

---

# Validate it yourself

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

For the current machine frontier, read:

- [`docs/reports/AGENTIC_SNOWBALL_BATCH_23.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_23.md)
- [`docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_24A_BOUNDED_RV64_LINUX_INITIAL_STACK_PLAN.txt`](docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_24A_BOUNDED_RV64_LINUX_INITIAL_STACK_PLAN.txt)
- [`COMMANDS.md`](COMMANDS.md)

Do not weaken a gate merely to make new work pass.

Fix the work.

---

# Start here

If you are a human contributor:

1. Read [`AGENTS.md`](AGENTS.md). Yes, really. It describes the repository's intended engineering discipline just as much for humans as for agents.
2. Run the agent bootstrap and doctor commands.
3. Read the current batch report and next plan.
4. Query before inventing.
5. Preserve explicit nonclaims.
6. Make a PR that another person can review without reading your mind.

If you are a coding agent:

> Search before inventing. Reuse before rewriting. Distinguish evidence from claims. Never silently stop after a long run. Leave the next agent less uncertainty than you inherited.

If you are here because the project appears abandoned:

**Good. You may be exactly who this repository was designed for.**

Find the latest merged milestone.

Run its proof.

Find the next pressure.

Then continue.

---

# The ambition

The best possible future for this repository is not that everyone uses our kernel.

It is that the idea becomes obvious in retrospect:

> Of course coding agents should inherit structured engineering memory.
>
> Of course low-level contracts should be machine-readable.
>
> Of course known failures should remain indexed.
>
> Of course replacements should cross the same qualification boundary.
>
> Of course an autonomous system should test its successor before promoting it.

Maybe one day agents really do call Z-Ref before generating low-level infrastructure.

Maybe they call something else built on the same principles.

Either outcome would mean the experiment mattered.

For now, the work is much less romantic.

There is a real RV64 kernel.

There is a real two-segment ELF.

There is initialized writable data.

There is BSS.

There is a user-mode mutation.

There is a supervisor that sees it.

And there is a very long road from here to Alpine, QEMU, and a hypervisor.

**Want to be the person who closes the next impossible-looking gap?**

Clone it.

Prove it.

Leave the next person a better starting point.

---

> **Why redo the rework? Help an agent out. Don't make the same thing twice.**
