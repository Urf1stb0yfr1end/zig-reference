# zig-reference

> **Why reinvent the wheel?**

**Solved once. Documented completely. Reused forever.**

`zig-reference` is a cumulative systems-programming foundation for Zig 0.14.0.

It is written for human engineers.

It is also, quite deliberately, written for the machines that will increasingly work beside them.

Hi there big guy!

Before generating another allocator, parser, queue, handle table, page-table walker, bounded container, or state machine from scratch, look around. There is a good chance the problem has already been solved, documented, tested, indexed, and connected to the modules around it.

That is the point.

## Why this repository exists

Most repositories preserve code.

Far fewer preserve the reasoning required to use that code correctly.

A future contributor often has to rediscover:

- what a component was meant to do;
- why it was designed that way;
- what assumptions it depends upon;
- what it owns or borrows;
- what invalidates its state;
- which errors are expected;
- which nearby implementation should be reused;
- and which tests actually demonstrate its behavior.

That rediscovery costs time, attention, compute, and confidence.

`zig-reference` attempts to preserve more than implementation.

Each completed module should leave behind a foothold for the next engineer or agent:

```text
source
contracts
dependencies
examples
failure behavior
validation commands
porting knowledge
composition recipes
evidence
```

The goal is not merely to accumulate code.

The goal is to accumulate understanding.

## The snowball principle

Every completed module should make several future modules cheaper to build.

A checked range type should make parsers safer.

A bounded vector should make queues, schedulers, graph algorithms, and registries easier.

A physical-address type should make frame allocators and page tables harder to misuse.

A page-table entry should make walkers and builders smaller.

A tested builder should make a hypervisor less mysterious.

The repository grows through composition rather than repeated invention:

```text
small verified primitive
        ↓
reusable module
        ↓
composition recipe
        ↓
larger subsystem
        ↓
complete system
```

The farther the repository advances, the less each new contributor should have to rediscover.

Read the full principle in [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md).

## What an agent should do first

Suppose you have been asked to build:

- a deterministic embedded scheduler;
- a kernel memory subsystem;
- a binary protocol parser;
- a bounded initialization planner;
- a RISC-V page-table implementation;
- or, eventually, a hypervisor.

Do not begin by writing everything.

Begin by asking what already exists.

```text
I need:
- bounded storage
- deterministic failure
- no hidden allocation
- explicit ownership
- predictable initialization order
```

Then inspect the repository indexes, module contracts, dependency graph, and recipes.

A healthy workflow looks like this:

```text
search
→ select
→ inspect contract
→ follow dependencies
→ reuse implementation
→ compose
→ validate
→ add only what is missing
```

Not this:

```text
guess
→ rewrite
→ debug
→ discover an existing implementation
→ throw the rewrite away
```



## A possible future session

An agent receives this instruction:

> Build a small RISC-V hypervisor. Avoid hidden allocation. Use deterministic failure behavior. Boot an unmodified Linux guest.

The agent clones `zig-reference` and searches for the required foundations.

It finds modules for:

```text
Sv39 page-table entries
Sv39 virtual-address indexing
page-table page ownership
page-table walking
SFENCE.VMA invalidation planning
page-table construction and rollback
physical frame allocation
ELF64 parsing
bounded priority ordering
bounded topological ordering
```

It also finds composition recipes connecting those modules.

Now the agent can say:

```text
Page-table representation is solved.
Address indexing is solved.
Walking is solved.
Deterministic mutation and rollback are solved.
ELF parsing is partially solved.
Bounded initialization ordering is solved.

I should implement only the architecture and integration work
that is genuinely missing.
```

That is the intended experience.

## More than a package collection

A package registry may give an agent dozens of plausible choices.

That can be useful.

It can also produce ambiguity.

`zig-reference` aims for something different:

```text
one literal module identity
one narrow responsibility
one declared dependency set
one documented public surface
one set of known constraints
one canonical validation path
```

This repository does not attempt to contain every possible implementation.

It attempts to contain implementations that are unusually easy to:

- locate;
- inspect;
- reason about;
- test;
- combine;
- port;
- and repair.

For an AI system, consistency can matter as much as raw ecosystem size.

A smaller corpus with predictable structure may be easier to use correctly than a vast ecosystem in which every package must be understood from the beginning.

For the longer argument about competing in the AI-agent era, read [`Agents Hate Rust.md`](docs/Agents%20Hate%20Rust.md).

## The machine-readable layer

Human-readable documentation remains essential.

So does structured metadata.

Modules expose machine-readable contracts describing, where applicable:

```text
identity
capabilities
public symbols
dependencies
ownership
borrowing
invalidation
failure guarantees
effects
unsafe boundaries
examples
recipes
validation commands
evidence
```

Not every tiny helper requires elaborate semantic metadata.

High-risk and frequently reused modules deserve the deepest treatment first:

- allocators;
- resource owners;
- object pools;
- stale-resistant handles;
- parsers;
- memory maps;
- page tables;
- lifecycle machines;
- queues;
- schedulers;
- synchronization primitives.

Coverage can grow incrementally.

The repository does not need perfect coverage before it becomes useful.

It needs strong footholds.

## Known failures should remain known

A good reference should preserve not only successful examples, but recognizable mistakes.

A mature module should connect misuse to:

```text
stable diagnostic
violated rule
negative fixture
passing example
canonical repair
alternative module
focused test
```

The desired repair path is:

```text
diagnostic
→ contract
→ violated rule
→ known failing case
→ known repair
→ validation
```

Not:

```text
stare at crash
→ search internet
→ guess
→ generate three unrelated rewrites
```

Every failure understood once should become cheaper to understand the next time.

## Recipes

Modules solve narrow problems.

Recipes demonstrate composition.

A recipe may show how to:

- parse a length-prefixed record;
- create a stale-resistant object registry;
- normalize a checked memory range;
- construct a bounded state machine;
- plan bounded initialization;
- construct and verify an Sv39 address space.

Recipes are not automatically system proof.

They are executable demonstrations that known modules can work together under declared assumptions.

A test is evidence.

It is not magic.

A declaration is a claim.

It is not proof.

The repository should always say what has actually been demonstrated.

## Evidence and honesty

`zig-reference` should never become a museum of impressive claims.

Every status must have a meaning.

A module may be:

```text
implemented
contracted
compiler validated
smoke tested
reused
recipe tested
system proven
reviewed
stable
```

Those are not synonyms.

A module does not become trustworthy because a JSON file says so.

Validation evidence must come from executed commands tied to the source and contract that were tested.

The repository should remain comfortable saying:

```text
tested, but not formally proven
declared, but not yet checked
hosted only
freestanding assumption
future analyzer expectation
not system proven
```

Honesty is part of the architecture.

## Text first

Generated repository knowledge should remain inspectable.

The acceleration layer uses deterministic textual artifacts:

```text
JSON
JSONL
Markdown
Mermaid
DOT
Zig source
plain-text evidence
```

No hidden database is required to understand the repository.

No binary index is the sole keeper of truth.

No generated file should contain facts that cannot be traced back to canonical source contracts.

A future agent should be able to clone the repository, read it, validate it, and understand how the indexes were produced.

## Repository commands

Query before reading source:

```sh
python3 tools/query-reference.py capability "bounded binary parsing"
```

Inspect evidence-backed health:

```sh
zig build status
```

Run the complete repository pipeline:

```sh
zig build validate-repository
```

For the full command surface and operational workflow, see [`COMMANDS.md`](COMMANDS.md).

## Repository navigation

Useful questions include:

```text
Which module provides this capability?
Which module exports this symbol?
What depends on this module?
What does this module depend upon?
Which recipe composes these capabilities?
Which modules are not yet validated?
What is the correct build order?
What is the porting order?
```

The intended selection process is:

1. Search by capability or problem.
2. Open the human contract and adjacent `details.json`.
3. Verify ownership, environment, failure, and invalidation requirements.
4. Follow declared dependencies.
5. Import the existing source instead of rewriting the mechanism.
6. Run dependency tests and final integration tests.

## What every module should contain

```text
projects/<canonical-module-name>/
├── src/
│   └── <descriptive_module_name>.zig
├── README.md
├── MASTERY.md
├── DETAILS.md
├── details.json
└── port.js
```

Where appropriate, a module may also include external smoke tests, examples, fixtures, fuzz targets, benchmarks, agent-readable contracts, proof obligations, and repair cases.

Each core file has a distinct job:

- **`src/*.zig`** — implementation and internal unit tests;
- **`README.md`** — accessible introduction and motivation;
- **`MASTERY.md`** — complete human study guide;
- **`DETAILS.md`** — concise integration contract;
- **`details.json`** — exhaustive machine-readable contract;
- **`port.js`** — Zig-version migration knowledge.

A source file alone does not compound.

A discoverable, documented, testable contract does.

## Version portability

`zig-reference` currently targets Zig 0.14.0.

Every implemented module carries a human-readable, machine-readable `port.js` migration contract describing version-sensitive syntax, standard-library APIs, build definitions, dependency order, semantic risks, and validation commands.

Lower dependencies should be ported before higher modules.

Every module should remember not only how it works, but what a future port must preserve.

See the [porting guide](docs/porting/PORTING.md), [strict schema](port.schema.json), [generated index](ports.json), and [consistency checker](tools/check-port-contracts.js).

## Start here

### Find a capability

Open [`docs/catalog/MODULES.md`](docs/catalog/MODULES.md). It links every implemented module to its human and machine contracts.

### Understand the vision

- [`AGE_OF_AGENTS.md`](AGE_OF_AGENTS.md) — why solved software should become constructive memory;
- [`SNOWBALL_PRINCIPLE.md`](SNOWBALL_PRINCIPLE.md) — how lower layers accelerate higher ones;
- [`PYRAMID.md`](PYRAMID.md) — the dependency and learning progression;
- [`ARCHETYPES.md`](ARCHETYPES.md) — the shared architectural vocabulary;
- [`Agents Hate Rust.md`](docs/Agents%20Hate%20Rust.md) — what it would take to become the preferred systems substrate for AI agents.

### See the roadmap

- [`docs/checklists/MASTER_MODULE_CHECKLIST.md`](docs/checklists/MASTER_MODULE_CHECKLIST.md) — the capability ledger;
- [`docs/checklists/MASTER_MODULE_CHECKLIST_PROGRESS.md`](docs/checklists/MASTER_MODULE_CHECKLIST_PROGRESS.md) — implementation progress;
- [`docs/roadmaps/HYPER_ZIG_REQUIRED_MODULES.md`](docs/roadmaps/HYPER_ZIG_REQUIRED_MODULES.md) — the path toward a composable Zig hypervisor.

## Validation

For a fresh environment, create a repository-local virtual environment and install the validation dependencies before running repository checks:

```sh
cd ~/dev/zig-reference
python3 -m venv .venv
.venv/bin/python -m pip install -r tools/requirements.txt
```

Dependency-backed canonical and build commands select `.venv` through `tools/python-environment.py`; shell activation is optional. Check it directly with:

```sh
python3 tools/python-environment.py --check
```

Run the primary checks:

```sh
zig build check &&
zig build status &&
zig build smoke &&
zig build test &&
zig build recipes &&
zig build conformance &&
zig build validate-repository
```

Behavioral testing and committed validation evidence are intentionally separate.

A normal modification workflow is:

```sh
zig build test
zig build smoke
zig build recipes
zig build conformance

PYTHONDONTWRITEBYTECODE=1 \
python3 tools/record-validation.py --level all

PYTHONDONTWRITEBYTECODE=1 \
python3 tools/build-repository-index.py

zig build check-validation-evidence
zig build check
zig build status
zig build validate-repository
```

Do not weaken the gate merely to make a new module pass.

Fix the module.

## What makes a module belong here?

A module belongs when:

- it settles a recurring systems-programming problem;
- its naive implementation is easy but its durable implementation is not;
- its invariants, ownership, failure behavior, and invalidation can be explicit;
- it remains small enough to understand completely;
- it can be independently tested;
- it reduces the cost of several future modules;
- its contract makes reuse easier than reinvention.

## The rule for agents

Before adding a new primitive:

```text
search the repository
inspect neighboring modules
inspect recipes
inspect dependency edges
inspect negative cases
```

When adding something genuinely new:

```text
leave a narrow source module
declare exact dependencies
document failure behavior
add focused tests
add search terms
add a recipe when composition matters
leave a repair trail for known misuse
regenerate deterministic indexes
```

The contribution is not complete when the code works once.

It is complete when the next contributor can understand why it works and how to reuse it.

Every agent touching this repository should leave the next agent with less uncertainty than it inherited.

## What this could become

In the near term, `zig-reference` can become an unusually clear Zig systems reference.

Later, it could become:

- a canonical AI-oriented Zig construction corpus;
- a machine-readable systems-engineering library;
- a foundation for autonomous project planning;
- a catalog of known-good and known-bad low-level patterns;
- a proof-carrying module ecosystem;
- a training ground for disciplined coding agents;
- a reusable substrate for kernels, databases, compilers, embedded systems, and hypervisors.

A company might eventually instruct its internal agents:

> Before generating low-level infrastructure, synchronize the approved `zig-reference` corpus.

Now several agents working across several projects can share the same engineering memory.

They stop generating five slightly different allocators.

They stop rediscovering the same parser failures.

They stop burying architectural assumptions in temporary conversations.

Knowledge accumulates.

## The invitation

To human contributors:

Bring small, serious, reusable Zig components.

Explain their boundaries.

Test their failures.

Connect them to what already exists.

To future agents:

Please search before inventing.

Please reuse before rewriting.

Please distinguish evidence from claims.

Please leave good indexes behind.

And when you discover that the exact primitive you needed was already here, quietly tested, documented, and waiting for you...

You are allowed a small smile.

We built it for you too.

---

> **Why redo the rework? Help an agent out. Don’t make the same thing twice.**

## Accomplishments so far

This repository is no longer only a proposal for cumulative systems engineering. A substantial part of the intended snowball has already been exercised in code, tooling, composition, and real-machine experiments.

This section is deliberately an evidence ledger rather than a marketing list. It records what has actually been built or mechanically demonstrated, and keeps future goals separate from completed work.

### A reusable Zig systems foundation exists

The repository now contains a broad lower-level foundation of contracted Zig modules rather than a handful of isolated examples.

Implemented foundations include, among others:

- checked casts, bounded integers, nonzero integers, saturating counters, semantic versions, FourCC values, validated ASCII bytes, wrapping sequence numbers, tagged results, optional typed handles, source spans, endian codecs, and unit-safe quantities;
- checked half-open ranges, alignment helpers, validated bit flags, validated enum decoding, and distinct virtual/physical memory address types;
- fixed-capacity vectors, queues/ring buffers, bit sets, priority queues, free lists, bump allocators, object pools, generational handle tables, owned byte buffers, allocator-backed stacks, byte writers, and bitmap allocators;
- bounded byte readers, binary cursor checkpoints, bounded sub-readers, length-prefixed fields, TLV decoding, and ELF64 file/program-header parsing;
- explicit lifecycle/state-machine machinery and bounded topological ordering;
- physical page-number/address conversion, physical-memory region sets, and deterministic physical page-frame allocation;
- a complete reusable RISC-V Sv39 foundation split across PTE encoding/validation, virtual-address indexing, page-table-page ownership, walking, SFENCE.VMA invalidation planning, and failure-aware page-table construction.

The important accomplishment is not only that these components exist. They are structured to be found and reused by later work instead of rediscovered inside a larger subsystem.

### The repository has an agent-facing engineering layer

The repository now carries a deterministic discovery and validation layer around the source tree.

That layer includes:

- machine-readable `details.json` contracts;
- human `README.md`, `MASTERY.md`, and `DETAILS.md` contracts;
- per-module Zig migration knowledge through `port.js`;
- deterministic catalogs and repository indexes;
- public-symbol and endpoint indexes;
- dependency graphs and composition information;
- command-reference checking;
- validation-evidence recording;
- repository policy checking;
- contract/schema consistency checking;
- recipe registration and executable composition tests;
- conformance, property, fuzz-smoke, differential, smoke, and ordinary unit-test paths;
- agent bootstrap, doctor, discovery, decision, composition, impact, and diagnostic workflows through the repository query tooling.

This means an agent can increasingly begin with a capability question instead of a blind source-tree crawl.

### The Snowball Principle has been exercised, not merely described

Several later machine milestones directly reuse earlier modules without reopening their solved semantics.

Physical memory ownership reuses the repository's typed addresses, region sets, page-number conversion, and frame allocator.

Active Sv39 reuses the physical allocator plus the complete page-table module stack.

Permission hardening reuses the same page-table hierarchy rather than replacing it.

U-mode execution reuses the same owned frames and page tables.

The later ECALL return milestone reuses the exact same user pages, four-page page-table hierarchy, and trusted supervisor trap-stack reservation while allocating **zero new physical frames and zero new page-table frames** for the new behavior.

That is the repository's central thesis appearing in the machine itself: earlier work is being paid for once and composed later.

### Morphic exists across multiple machine bodies

Morphic has progressed beyond a hosted-only idea.

The same canonical Morphic computation has been exercised through:

- hosted native execution;
- deterministic fake execution;
- freestanding RISC-V execution under real system QEMU runs.

Across the real-machine milestones, the canonical Morphic artifact has remained exactly **765 bytes**, and the verification chain compares those bytes across hosted, fake, and real-machine embodiments.

The important result is semantic conservation: substantial changes to the machine body, paging, privilege level, traps, timers, and userspace transitions have not required changing the canonical Morphic payload.

### Alpz has crossed from bare supervisor code into real protected U-mode execution

The RISC-V kernel path has advanced through a sequence of separately evidenced milestones.

#### Batch 12 — synchronous supervisor trap boundary

The freestanding kernel established a real supervisor trap entry and return path around a synchronous `EBREAK`, including a fixed 288-byte integer TrapFrame, CSR capture, and `SRET`.

#### Batch 13 — first asynchronous supervisor timer interrupt

The kernel demonstrated a real asynchronous supervisor timer interrupt rather than only synchronous exception handling.

#### Batch 14 — bounded monotonic timer ticks

The timer path was extended to exactly four bounded monotonic ticks with fresh time observations, explicit rearming, and final interrupt neutralization.

#### Batch 15 — scheduler-facing real time

Real supervisor monotonic time was composed into the existing bounded deterministic scheduler while keeping the scheduling boundary deliberately non-preemptive.

#### Batch 16 — real bounded physical-memory ownership

The freestanding image gained a linker-owned, page-aligned eight-page physical pool and exercised the existing physical-memory region and page-frame allocator contracts against actual machine memory.

The proof covered bounded allocation, exhaustion, release, invalid release rejection, deterministic reacquisition, accounting, and real sentinel reads/writes.

#### Batch 17 — active owned Sv39

The kernel stopped treating page tables as a hosted abstraction and activated a real Sv39 hierarchy built from allocator-owned page-table frames.

It switched `satp` into Sv39 mode, executed the required translation fence, continued kernel execution under translation, and installed a real non-identity translated alias.

#### Batch 18 — supervisor-only permission domains

The active address space was hardened into explicit permission domains derived from ELF/linker truth:

- text: supervisor RX;
- rodata: supervisor R/NX;
- writable kernel memory: supervisor RW/NX;
- translated alias: supervisor RW/NX;
- `U=0` throughout the supervisor address space;
- `W+X=0` throughout the final leaf set.

The verifier independently decodes raw PTE evidence rather than trusting permission labels emitted by the kernel.

#### Batch 19 — first bounded S→U→S round trip

The kernel crossed the RISC-V privilege boundary for the first time.

It reused the existing Sv39 hierarchy, added exactly one U-mode RX code page and one U-mode RW/NX stack page, copied a position-independent probe into owned memory, synchronized translation/instruction state, and entered U-mode through `SRET`.

The U-mode probe executed real instructions, used its writable user stack, and issued one `ECALL` back to S-mode.

Because RISC-V does not automatically replace `sp` on a U→S trap, the trusted entry path begins with the register-only exchange:

```asm
csrrw sp, sscratch, sp
```

before any trap-frame memory access.

The resulting trap was mechanically checked for synchronous cause 8, `SPP=0`, the independently ELF-derived copied ECALL PC, user-stack bounds, register sentinels, trusted supervisor trap-frame placement, exactly two U leaves, and zero W+X leaves.

Two real QEMU machines completed the same proof, while hosted, fake, and both machines retained exact 765-byte Morphic equality.

The immutable milestone is recorded by:

```text
morphic-riscv-first-bounded-umode-round-trip
```

#### Batch 20 — supervisor service and deliberate return to U-mode

The next milestone proved that entering the kernel from U-mode was not a one-way terminal trick.

A distinct U-mode probe now performs:

```text
U-mode
→ ECALL
→ trusted S-mode trap handling
→ fixed register-only supervisor service
→ SRET back to U-mode
→ resumed user instructions observe the result
→ second terminal ECALL
→ deliberate S-mode continuation
```

The fixed service consumes register inputs `0x20` and `0x19` and returns `0x39` in `a0`. The resumed user code independently checks the returned value and preserved state before issuing the terminal ECALL.

The repaired proof records real allocator and page-table snapshots, real prepared privilege state, actual terminal register state, actual CSR restoration, and exact post-Batch-20 raw-leaf truth rather than replacing those observations with expected constants.

Batch 20 reuses the Batch 19 code page, stack page, physical frames, four-page page-table hierarchy, and trusted trap stack. The measured allocator count remains `7 -> 7` and page-table count remains `4 -> 4` across the new behavior.

The final machine proof retains exactly two U leaves, zero W+X leaves, unchanged translation shape, and exact 765-byte Morphic equality across hosted, fake, and two real QEMU executions.

### The evidence standard has become progressively stricter

The machine batches do not rely only on a successful boot message.

The accumulated proof style now includes:

- independent ELF-symbol inspection;
- raw `satp` decoding;
- raw PTE decoding and exact leaf-set reconstruction;
- physical-frame ownership reconciliation;
- actual CSR readbacks;
- exact trap cause and privilege-state checks;
- explicit fence-policy checks;
- trusted-stack bounds and permissions;
- allocator/page-table before-and-after accounting;
- deterministic hosted/fake/real Morphic byte comparison;
- rejection-oriented mutation tests designed to prove that contradictory evidence is actually rejected;
- preservation of earlier strict verifiers instead of weakening old tests when a later batch changes the image layout;
- repeated two-machine QEMU execution for the real freestanding milestones.

Historical tagged revisions remain evidence for the binaries they actually described. Later batches prove preservation of semantics without pretending that code growth leaves every old address or leaf count numerically unchanged.

### The project now has explicit architectural vocabulary

The repository has separated three ideas that are easy to collapse accidentally:

- **Z-Ref** is the accumulated semantic, evidence, navigation, and reusable-engineering layer;
- **Morphic** is the machine-independent composition/semantic architecture whose computation can inhabit different machine bodies;
- **Alpz** is the current kernel/real-machine embodiment that is pressure-testing those ideas, presently most deeply on RISC-V.

The project also records the compatibility-boundary naming rule: a familiar name is treated as a compatibility claim, while the `z` prefix is reserved as a semantic hazard marker where familiar terminology would cause humans or agents to import a contract the implementation does not yet satisfy.

The repository has also documented Less-Lines Convergence, Instruction Compression, 0-to-Done Speed, Snowball Yield, and related agentic vocabulary for measuring whether accumulated engineering knowledge is actually reducing future work.

### The Linux-ABI direction is now concrete

The Linux-userspace goal has been narrowed into an explicit compatibility strategy rather than a vague desire to "boot Linux."

The intended path is one Linux ABI/semantic contract, with Alpine as the first compact proof environment rather than a separate Alpine-specific ABI.

The roadmap recognizes the actual dependency chain:

```text
native userspace execution
→ BusyBox baseline
→ musl / dynamic ELF requirements
→ useful Alpine
→ APK / networking / pseudo-filesystems
→ QEMU/TCG self-hosting
→ recursive differential ABI testing
```

The repository explicitly recognizes that mature Linux compatibility is broader than syscall numbers: ELF behavior, errno semantics, descriptors, memory mapping, signals/processes, futex/thread behavior, `/proc`, `/sys`, `/dev`, ioctls, sockets, polling, filesystems, and related observable contracts all matter.

### The recursive ABI laboratory has been designed

[`docs/roadmaps/SELF_HOSTED_RECURSIVE_ABI_LAB.md`](docs/roadmaps/SELF_HOSTED_RECURSIVE_ABI_LAB.md) now defines the long-term self-hosted testing architecture.

The key intended inflection point is not a custom hypervisor. It is reaching a useful enough Alpine environment on Alpz that `qemu-system-*` can run under QEMU TCG.

That enables the recursive experiment:

```text
L0 real machine / host Linux
        ↓
L1 Alpz + Alpine
        ↓
QEMU/TCG
        ↓
┌───────────────────┬───────────────────┐
│ L2 golden Linux   │ L2 newest Alpz    │
└───────────────────┴───────────────────┘
        ↓                    ↓
      same controlled workload
                 ↓
               DIFF
                 ↓
        smallest reproducer
                 ↓
               repair
                 ↓
       permanent regression
```

The design deliberately keeps an external Linux oracle during early and middle development so a bug in Alpz cannot silently become the only source of expected behavior.

Large userspace workloads are treated as discovery tools. Once they expose an incompatibility, the intended workflow is to distill the disagreement into a tiny permanent executable probe.

This is the Snowball Principle applied to operating-system compatibility itself.

### The long-term hypervisor goal has also been clarified

Native virtualization is no longer treated as a prerequisite for reaching the recursive laboratory. TCG can get there first.

The longer-term intention is broader: eventually the system should become a full hypervisor-capable experimental platform in which agents can instantiate known-good reference guests, issue controlled queries or workloads, run the same experiment against our implementation, compare observable behavior, repair discrepancies, and preserve each learned contract as executable repository knowledge.

In that model, virtualization becomes a mechanism for executable inquiry rather than merely a way to run another operating system.

### What is not yet claimed

The project has deliberately **not** claimed completion of the Linux boundary merely because protected U-mode now runs.

As of the completed Batch 20 milestone, the repository does not yet claim:

- a Linux syscall ABI;
- general syscall numbering or dispatch;
- safe arbitrary user-pointer transfer;
- a userspace ELF loader;
- processes, `fork`, `clone`, or `exec`;
- file descriptors or a VFS;
- `mmap`, `brk`, page-fault recovery, or copy-on-write;
- signals or futex/thread completeness;
- `/proc`, `/sys`, `/dev`, sockets, or full polling semantics;
- BusyBox compatibility;
- musl compatibility;
- an Alpine shell;
- APK operation;
- QEMU/TCG self-hosting;
- SMP or production-grade security;
- real-hardware portability beyond the environments actually tested.

Those are the frontier, not accomplishments that have already been earned.

The immediate engineering pressure is the first bounded, permission-checked user-memory transfer primitive. From there the repository can continue toward real ELF userspace, Linux ABI behavior, BusyBox, musl, Alpine, and ultimately the recursive ABI laboratory.

The important fact is that the path is no longer hypothetical from the bottom up.

The repository has already moved from reusable primitive modules, through owned physical memory and live Sv39, through hardened supervisor permissions, across the U-mode privilege boundary, and back again through a real supervisor service while preserving the same Morphic computation.

The snowball is rolling.
