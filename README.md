# zig-reference

> **Solved once. Documented completely. Reused forever.**

`zig-reference` is an experimental cumulative systems-engineering repository targeting Zig 0.14.0. It combines reusable low-level modules, machine-readable engineering knowledge, an RV64 kernel, Linux-compatibility work, and several deliberately different future userspace/virtualization directions over one shared foundation.

## The project in 30 seconds

| Name | Role |
|---|---|
| **Z-Ref** | The reusable knowledge/evidence layer: solved modules, contracts, dependencies, diagnostics, tests, proof records, porting knowledge, and agent-facing discovery. |
| **Morphic** | The shared architectural/semantic substrate. The goal is to keep fundamental mechanisms reusable across compatibility, native, Wasm, and virtualization directions. |
| **Alpz** | The current RV64 kernel/machine embodiment and Linux-compatibility proving ground. It is where real paging, privilege, ELF, userspace, syscall, filesystem, process, and later virtualization pressure is exercised. |
| **QuirkM** | The proposed clean native Morphic personality/API: learn from Linux compatibility debt without making those historical quirks the native default. |
| **Linux personality** | The compatibility edge. Linux syscall numbers, errno, fd semantics, proc/sys/ioctl quirks, and other required historical behavior belong here rather than defining Morphic internally. |
| **WebAssembly** | A planned early peer consumer of Morphic resources/contracts, useful as a portable non-Linux proof that the substrate is actually general. |
| **Hypervisor direction** | A planned way to contain whole foreign software worlds when direct compatibility would cost more complexity than it is worth. |

The short architectural idea is:

```text
                         SOFTWARE / AGENTS
                                |
          +---------------------+---------------------+
          |                     |                     |
          v                     v                     v
      QuirkM Native         Linux personality       Wasm
      clean contracts       exact compatibility    portable contracts
          |                     |                     |
          +---------------------+---------------------+
                                |
                                v
                      MORPHIC SEMANTIC CORE
                                |
              resources / memory / process / IPC /
                   wait / files / networking / ...
                                |
                                v
                             ALPZ
                                |
                             RV64 now
```

**Current fact:** only a portion of that diagram exists today. **Architectural intent:** new compatibility work should increasingly land on shared Morphic mechanisms instead of becoming one-off Linux-only kernel internals. **Long-term possibility:** the same solved mechanism can then support Linux software, cleaner QuirkM-native software, Wasm components, agent tooling, and later virtualization control without being implemented five times.

---

## Maximum visibility, minimum context

A useful way to state one of Zig's attractions to this project is a simple question:

> **Why can’t everything be visible?**

Zig does not literally make every property of a program visible, nor is that an official Zig slogan. The point is the engineering instinct: prefer explicit mechanisms, inspectable structure, understandable control, and fewer hidden layers when the cost is reasonable. `zig-reference` takes that instinct and asks a second question for machine-scale software engineering:

> **How can everything be made as visible as possible to a machine without requiring the machine to read everything?**

The governing principle is:

> **Maximum visibility, minimum context.**

Visibility is not the same as putting the entire repository into an LLM context window. A human engineer can glance at a directory tree, names, types, call relationships, conventions, tests, and familiar abstractions and acquire useful peripheral knowledge without reading every implementation. The repository tries to build a machine-readable equivalent of that peripheral vision.

The intended progression is:

```text
everything exists
      |
      v
everything important is addressable
      |
      v
cheap semantic descriptions expose what exists
      |
      v
capability / dependency / symbol / validation indexes expose relationships
      |
      v
an agent decides what is relevant
      |
      v
only the relevant contract, evidence, or source is loaded
```

An agent should be able to answer progressively more expensive questions without immediately reading source:

```text
0. Does the capability exist?
1. What does it do?
2. What does it depend on?
3. What guarantees and failure semantics does it provide?
4. How is it used?
5. Which symbols and files matter?
6. Which exact implementation details matter?
7. Read the source only when the task actually requires it.
```

That is why the generated indexes, module cards, dependency graphs, capability maps, diagnostics, validation records, query tools, and focused contracts are not treated as decorative documentation. They are attempts to make a growing codebase **navigable as knowledge rather than only readable as text**.

A useful design test follows:

> **Every important piece of repository knowledge should have a cheap representation sufficient to decide whether its expensive representation needs to be read.**

The long-horizon research problem is therefore not merely whether an agent can ingest a large repository. It is whether an arbitrarily large software system can remain **perceptible through a bounded context window**, with progressive disclosure allowing humans and machines to descend from a cheap whole-system map to exact source only where necessary.

---

## Why growth in one direction can strengthen the others

One of the central bets in Morphic is that compatibility work can become **positive inheritance** rather than architectural contamination.

As Alpz grows toward a serious Linux userspace, it must gain fundamental capabilities such as resource identity, files, memory mappings, processes, pipes, waiting, threads, synchronization, sockets, timers, and device interfaces. Where those mechanisms are genuinely general, they belong in the shared Morphic substrate. Linux-specific encodings and historical behavior remain in the Linux personality.

That means, for example, that if Alpz becomes increasingly capable of running Alpine Linux userspace, and later absorbs more Linux ABI pressure from additional distributions and applications, QuirkM can also gain access to the **fundamental capabilities uncovered by that work**. QuirkM does not automatically inherit every Linux syscall or quirk; instead it can expose a cleaner native contract over the same underlying mechanism.

Conceptually:

```text
new Linux software pressure
        |
        v
what capability is actually missing?
        |
        +--> general mechanism ------> Morphic core
        |                                  |
        |                    +-------------+-------------+
        |                    |             |             |
        |                    v             v             v
        |                 Linux          QuirkM         Wasm
        |
        +--> historical Linux-only behavior
                              |
                              v
                     compatibility quarantine
```

So broader compatibility can make the native system more capable **without requiring the native API to become Linux-shaped**. The reverse can also happen: a cleaner native resource, completion, or capability model can provide a better internal implementation underneath Linux adapters.

This is a design goal, not an automatic law. Every shared mechanism still has to earn its place through evidence, tests, and a clear separation between the fundamental capability and compatibility-specific semantics.

---

## QuirkM: compatibility history as native design evidence

QuirkM is the proposed native Morphic API/personality.

Its working rule is:

> **Implement the capability once. Preserve Linux behavior where compatibility requires it. Expose a cleaner QuirkM contract where history does not. Never confuse the compatibility adapter with the architecture.**

The idea is not “Linux is bad.” Stable compatibility is one of Linux's great practical strengths, and that same stability makes old interfaces difficult to remove once enormous amounts of software depend on them. QuirkM gets the unusual advantage of being able to preserve that software world through a Linux personality while designing its native contracts with decades of compatibility history already visible.

The QuirkM research program therefore asks, for every important Linux-facing behavior:

```text
What is the fundamental capability?
What is specifically historical Linux behavior?
What must be preserved for Linux software?
What would a clean native contract look like today?
Can both use the same Morphic mechanism?
Can the difference become a reusable migration rule?
```

The canonical QuirkM documentation lives in [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/). It includes the architecture proposal, the first **100 paramount Linux compatibility-debt candidates**, and another **400 broader Linux/system design pressures** intended to seed a future machine-readable Quirk Ledger.

Those 500 entries are a research backlog, not a claim that 500 Linux bugs have already been proved. Candidates are expected to be promoted, corrected, downgraded, merged, or rejected as evidence accumulates.

---

## Why QuirkM may be unusually well suited to coding agents

The proposed Quirk Ledger gives one large objective — progressively remove unnecessary Linux-semantic dependence — while decomposing it into many named, bounded semantic differences.

Instead of giving an agent an underspecified task such as:

```text
"Port this enormous Linux application."
```

QuirkM aims to make the work look more like:

```text
application: example
Linux runnable: yes
QuirkM-native interfaces: 121 / 137

remaining semantic dependencies:
    Q-0042
    Q-0071
    Q-0118
    Q-0134

for each:
    exact Linux behavior
    native replacement contract
    affected source/binding locations
    compatibility fallback
    acceptance tests
    differential oracle where meaningful
    explicit nonclaims
```

A solved migration class can then become reusable knowledge for later programs. The valuable unit of progress is often not merely **one application ported**, but **one class of future porting work eliminated**.

That is an architectural fit with agentic coding, not a claim that arbitrary Linux programs can already be automatically converted. Source-available and componentized software should be much easier candidates than opaque static binaries, and the Linux personality remains a permanent fallback when migration is not economical or safe.

See [`docs/concepts/QuirkM/README.md`](docs/concepts/QuirkM/README.md).

---

## MinMax Memo™

The project doctrine for permanent architecture is the **MinMax Memo™**:

> **Minimum implementation surface. Maximum capability surface. Maximum whole-system mental model.**

Or, more compactly:

> **Minimize what must be understood. Maximize what can be built. Preserve the whole-machine mental model.**

The goal is not the smallest kernel at any cost. It is the smallest coherent foundation that unlocks the largest useful computing world while remaining understandable enough that a determined systems engineer can still form a whole-system model.

See [`docs/project_vocab.md`](docs/project_vocab.md).

---

## Current machine status

The current completed machine milestone is **Batch 25A**.

Under real `qemu-system-riscv64` execution, Alpz has progressed through:

```text
S-mode execution
→ synchronous and timer traps
→ allocator-owned physical frames
→ active Sv39
→ RX / R-NX / RW-NX permission domains
→ real S→U→S transitions
→ trusted ECALL return boundary
→ bounded real copy-IN / copy-OUT
→ bounded RV64 ELF load planning
→ real RV64 ELF execution from parsed e_entry
→ separate R-X and RW- PT_LOAD segments
→ initialized writable data + zeroed BSS
→ U-mode mutation of ELF-backed writable storage
→ exact Linux-style argc/argv/envp/auxv stack planning
→ materialization of that stack into real U RW/NX memory
→ U-mode independent parsing/validation of the initial stack
→ generic Morphic semantic write/terminate operation boundary
→ Linux/RV64 syscall decode and negative-errno encoding at the adapter edge
→ real returning write/error ECALLs plus terminal exit_group
→ strict external verification across two QEMU executions
```

Batch 25A proves a deliberately narrow Linux/RV64 syscall surface: unsupported syscall → `-ENOSYS`, `write` success plus `EBADF`/`EFAULT`, exact returning `sepc + 4`, and terminal `exit_group`, while Linux syscall numbers and errno remain outside the reusable semantic-operation module.

The next pressure is **Batch 25B/26**: a bounded per-process resource/FD table with real stdin/stdout/stderr entries, then read/write/close and dup-family pressure while preserving the Batch 25A semantic boundary.

See [`docs/reports/AGENTIC_SNOWBALL_BATCH_25A.md`](docs/reports/AGENTIC_SNOWBALL_BATCH_25A.md) and the executed plan [`docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_25A_MORPHIC_OPERATION_BOUNDARY_LINUX_RV64_SYSCALL_ADAPTER.txt`](docs/plans/CODEX_AGENTIC_SNOWBALL_BATCH_25A_MORPHIC_OPERATION_BOUNDARY_LINUX_RV64_SYSCALL_ADAPTER.txt).

---

## Long-horizon directions

The branches are intended to reinforce one another rather than become four unrelated operating systems.

```text
                           MORPHIC CORE
                                |
      +-------------------------+-------------------------+
      |                         |                         |
      v                         v                         v
Linux/Alpine               QuirkM Native          Compatibility Maximizer
proving ground             clean native world     high-leverage ports
      |                         |                         |
      +-------------------------+-------------------------+
                                |
                                +----------> Wasm
                                |
                                +----------> Hypervisor
```

A possible mature system could therefore combine a small understandable kernel, direct Linux userspace compatibility, a cleaner native QuirkM ecosystem, portable Wasm components, and a hypervisor for software worlds that are too expensive to absorb directly.

That is a research direction, not a completion claim.

---

## Research value

The repository is intended to be useful even before the full operating-system vision exists. Its current and proposed work creates testable research surfaces around cumulative agent-assisted engineering, reusable low-level contracts, evidence-carrying systems modules, Linux compatibility as architectural pressure, clean-native counterdesign, capability/resource models, machine-readable ABI knowledge, progressive application migration, WebAssembly/native interface sharing, recursive successor qualification, and the tradeoff between compatibility growth and whole-system comprehensibility.

A major question behind the project is:

> **Can capability grow faster than conceptual complexity?**

A second is:

> **Can each solved compatibility difference make the next port measurably cheaper for both humans and agents?**

Those are hypotheses to measure, not conclusions already established.

---

## Engineering model

The repository is built around one rule: expensive discoveries should become cheap future dependencies.

```text
solve one boundary
      ↓
record its contract
      ↓
record failure behavior
      ↓
record focused validation
      ↓
make it discoverable
      ↓
reuse it in the next boundary
```

Reusable modules normally carry source, focused tests, integration contracts, machine-readable metadata, and Zig-version migration knowledge. Repository tooling derives catalogs, dependency views, validation evidence, and agent-facing indexes from canonical sources.

Machine-specific milestones use stricter evidence where appropriate: exact observable relationships, rejection/mutation tests, real QEMU execution, explicit nonclaims, and repository-wide validation.

The detailed principles live under [`docs/concepts/`](docs/concepts/) and [`docs/standards/`](docs/standards/).

---

## Repository layout

```text
.github/       contribution and pull-request workflow
conformance/   cross-module conformance work
docs/          plans, reports, roadmaps, standards, concepts, and indexes
generated/     deterministic generated repository views
projects/      canonical reusable modules
recipes/       executable compositions
tools/         repository, validation, and agent tooling
AGENTS.md      repository engineering rules for humans and agents
COMMANDS.md    canonical command manual
README.md      project entry point
build.zig      root Zig build graph
```

Root-level schemas and generated indexes remain at the root where repository tooling expects their canonical paths. Long-form design and vision documents belong under `docs/`.

See [`docs/README.md`](docs/README.md) for the documentation map and [`docs/standards/REPOSITORY_LAYOUT.md`](docs/standards/REPOSITORY_LAYOUT.md) for placement rules.

---

## Getting started

The repository targets Zig 0.14.0.

Create the repository-local Python environment:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r tools/requirements.txt
python3 tools/python-environment.py --check
```

For a zero-context repository entry:

```sh
python3 tools/query-reference.py agent bootstrap
python3 tools/query-reference.py agent doctor
```

Query before reading broad source:

```sh
python3 tools/query-reference.py capability "bounded binary parsing"
python3 tools/query-reference.py agent decide "YOUR TASK"
```

## Validation

Run the broad repository gates:

```sh
zig build check
python3 tools/developer-command.py validate-repository
```

Focused module and machine commands are documented in [`COMMANDS.md`](COMMANDS.md).

Do not weaken a gate merely to make new work pass. Fix the work or narrow the claim.

---

## Documentation

Start with [`docs/README.md`](docs/README.md).

Important entry points include [`AGENTS.md`](AGENTS.md), [`COMMANDS.md`](COMMANDS.md), [`docs/catalog/MODULES.md`](docs/catalog/MODULES.md), [`docs/concepts/SNOWBALL_PRINCIPLE.md`](docs/concepts/SNOWBALL_PRINCIPLE.md), [`docs/standards/SNOWBALL_YIELD.md`](docs/standards/SNOWBALL_YIELD.md), [`docs/porting/PORTING.md`](docs/porting/PORTING.md), [`docs/project_vocab.md`](docs/project_vocab.md), the long-horizon Alpz roadmap under [`docs/roadmaps/`](docs/roadmaps/), and the QuirkM research area at [`docs/concepts/QuirkM/`](docs/concepts/QuirkM/).

---

## Contributing

Contribution guidance lives in [`.github/CONTRIBUTING.md`](.github/CONTRIBUTING.md).

The short version is: query before inventing, preserve existing contracts unless intentionally revising them, keep claims narrower than evidence, run focused validation before broad validation, update runnable-command documentation when the command surface changes, and always leave a reviewable commit plus an explicit handoff.

---

## Scope and nonclaims

Alpz is **not Linux today**, and QuirkM is **not a completed native operating environment today**.

The project does not currently claim a general Linux syscall ABI, mature file-descriptor/VFS/process semantics, complete `mmap`, Linux signals, futex/thread completeness, networking, musl, BusyBox, Alpine compatibility, automatic QuirkM migration of arbitrary Linux applications, production security, QEMU self-hosting, SMP, RISC-V H-extension virtualization, `/dev/kvm`, a finished Wasm personality, or production readiness.

The architectural documents describe intended pressure and possible futures. Proof records and current code define what has actually been achieved.

---

## Licensing

No repository license is currently declared. Do not assume redistribution or reuse terms until a license is added explicitly.