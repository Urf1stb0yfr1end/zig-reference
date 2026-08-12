# Pressure-Oracle Inheritance Engineering Vocabulary

This document defines project vocabulary for a recurring engineering method in `zig-reference`, Morphic, Alpz, and QuirkM: use real external software as a pressure source, implement the smallest missing reusable mechanism, retry, and let compatibility accumulate until an existing software ecosystem becomes reachable.

These terms are project language, not claimed industry standards. Where an established systems or software-engineering term already fits, this document prefers that ordinary term over inventing a new label.

The central question is:

> What is the smallest permanent mechanism whose implementation causes the largest existing software world to become reachable?

The governing principle remains:

> **Minimum permanent mechanism. Maximum inherited civilization.**

A second constraint now sits beside it:

> **Maximize inheritance without allowing compatibility policy to dictate the permanent foundation.**

The goal is not merely to reach Linux, Alpine, QEMU, or KVM quickly. The goal is to reach them while preserving Morphic as a general-purpose foundation from which QuirkM and other future systems can be built without inheriting unnecessary historical constraints.

---

## 1. Pressure Oracle

A **Pressure Oracle** is real target software used as an executable source of truth for what compatibility work is actually missing.

Instead of beginning from a speculative checklist of every syscall, ioctl, flag, ABI rule, or subsystem that might be required, run the software that matters and observe the first concrete incompatibility.

Canonical loop:

```text
run target
    ↓
observe first real incompatibility
    ↓
identify underlying missing mechanism
    ↓
implement the smallest reusable correction
    ↓
validate independently
    ↓
retry target
```

Examples:

```text
musl fails on missing brk semantics
    ↓
implement the smallest correct brk mechanism
    ↓
retry musl
```

```text
QEMU -accel kvm fails on KVM_GET_API_VERSION
    ↓
implement that KVM ABI operation correctly
    ↓
retry QEMU
```

The important property is that the target determines priority. The roadmap predicts likely pressure, but the running program decides what is next.

### Anti-pattern: Checklist-First Compatibility

Implementing a long compatibility list because Linux exposes it, rather than because a target currently requires it.

Checklist-first work can produce enormous surface area without moving the inheritance frontier.

---

## 2. Executable Specification

An **Executable Specification** is a real program whose observed behavior constrains the compatibility layer more strongly than prose alone.

Musl, BusyBox, `apk`, QEMU, and later stock applications can each act as executable specifications. Their source code and documentation remain useful, but the decisive question is whether the actual binary progresses under the implemented semantics.

A pressure target is therefore both software to inherit and a test instrument.

---

## 3. First Missing Mechanism

The **First Missing Mechanism** is the earliest reusable semantic capability whose absence prevents the pressure target from advancing.

This deliberately distinguishes the underlying mechanism from the immediate symptom.

```text
symptom:
QEMU receives ENOTTY from an ioctl

possible first missing mechanism:
VM-fd ioctl dispatch with one required KVM operation
```

The engineering task is not merely to remove the observed error. It is to identify the smallest underlying capability that explains the failure and is likely to remain useful later.

---

## 4. Smallest Sufficient Surface

The **Smallest Sufficient Surface** is the minimum externally visible compatibility surface needed to let the current inheritance target make meaningful progress.

It is narrower than "implement the subsystem" and stronger than "hard-code the test."

For KVM, this does not mean implementing the complete Linux KVM API. It means implementing the smallest correct subset stock RISC-V QEMU actually requires, discovered through pressure.

```text
complete historical API
        ≠
required compatibility surface
```

---

## 5. Inheritance Surface

An **Inheritance Surface** is an interface boundary whose compatibility grants access to a body of software much larger than the boundary itself.

Examples include:

- Linux syscall/ABI semantics sufficient for musl;
- `PT_INTERP` and process-start semantics sufficient for a userspace dynamic loader;
- `apk`-required kernel behavior sufficient for Alpine package inheritance;
- the KVM userspace ABI sufficient for stock QEMU to drive a native hypervisor;
- WASI or another stable runtime boundary sufficient for portable modules.

Inheritance surfaces are strategically valuable because their payoff is nonlinear.

---

## 6. Inheritance Multiplier

An **Inheritance Multiplier** is software that, once reachable, makes additional software dramatically easier to acquire.

Examples:

```text
musl
    → dynamically linked C programs

BusyBox
    → practical shell/core userspace

apk
    → Alpine package universe

Clang
    → local compilation of C/C++ software

Python
    → Python package/runtime ecosystem

Node
    → JavaScript/TypeScript ecosystem

QEMU
    → machine models, device emulation, firmware paths, guest execution

/dev/kvm compatibility
    → QEMU becomes a frontend for the native Alpz hypervisor
```

An Inheritance Multiplier should usually outrank a similarly sized isolated feature because it changes the rate at which future capability can be acquired.

---

## 7. Inheritance Steal

An **Inheritance Steal** is the deliberate act of implementing a comparatively small compatibility boundary in order to reuse a mature external software ecosystem rather than rebuilding its upper layers locally.

"Steal" is informal project language. It does not mean misappropriating code. It means obtaining leverage from legitimate public interfaces and open-source software instead of recreating solved engineering.

The KVM strategy is the archetypal example:

```text
native RISC-V H-extension engine
        +
small stock-QEMU-compatible /dev/kvm surface
        ↓
QEMU supplies mature VM orchestration and device-model machinery
```

---

## 8. Civilization Leverage

**Civilization Leverage** is a decision heuristic for how much useful existing software becomes reachable per unit of permanent new complexity.

Conceptually:

```text
                       useful existing software newly reachable
Civilization Leverage = --------------------------------------
                           permanent new system complexity
```

A small `/dev/kvm` adapter may therefore be strategically more valuable than a much larger custom VM manager if it allows QEMU to supply the surrounding virtualization machinery.

---

## 9. Permanent Mechanism

A **Permanent Mechanism** is a kernel or Morphic capability expected to remain useful across multiple personalities, targets, or future applications.

Examples include:

- generational resources;
- bounded user memory transfer;
- page mapping/protection/unmapping;
- execution-image preparation;
- virtual-machine and vCPU resource objects;
- stage-2 translation primitives;
- generic wait/wake or event mechanisms.

A Permanent Mechanism is preferred over a target-specific shortcut when both cost roughly the same.

---

## 10. Compatibility Adapter

A **Compatibility Adapter** translates the historical semantics of an inherited ecosystem into permanent Morphic mechanisms.

The adapter owns details such as:

```text
Linux syscall numbers
negative errno
AT_FDCWD
Linux mmap flags
KVM ioctl numbers
KVM fd hierarchy
```

while resource identity, address-space mutation, VM creation, vCPU state, and stage-2 mappings remain general mechanisms beneath it.

```text
historical external ABI
        ↓
compatibility adapter
        ↓
reusable Morphic mechanisms
```

---

## 11. Quirk Quarantine

**Quirk Quarantine** is project shorthand for keeping historical compatibility behavior inside the personality or adapter that requires it rather than making it the internal ontology of the system.

The standard design idea behind it is **compatibility isolation** and **separation of mechanism and policy**.

For example:

```text
KVM_CREATE_VM
    ↓
KVM adapter
    ↓
Morphic VM creation
```

Morphic need not define virtualization internally as Linux file descriptors and ioctl numbers merely because QEMU expects that external ABI.

---

## 12. Pressure Ladder

A **Pressure Ladder** is an ordered sequence of increasingly consequential real targets, where each successful target makes the next one cheaper to attack.

Current intended ladder:

```text
exec correctness
    ↓
musl
    ↓
BusyBox
    ↓
Alpine shell
    ↓
apk
    ↓
QEMU/TCG
    ↓
RISC-V H-extension guest
    ↓
stock QEMU through /dev/kvm
```

The ladder is not sacred. If one step collapses into another, take the larger win immediately.

---

## 13. Pressure Cascade

A **Pressure Cascade** occurs when satisfying one missing mechanism exposes the next missing mechanism immediately, creating a productive sequence of target-driven repairs.

```text
QEMU starts
    ↓
asks KVM API version
    ↓
version works
    ↓
asks capabilities
    ↓
capabilities work
    ↓
creates VM
    ↓
creates vCPU
    ↓
maps kvm_run
    ↓
KVM_RUN
```

Each successful repair is evidence that the compatibility frontier moved forward.

---

## 14. Retry Distance

**Retry Distance** is the amount of engineering work between observing a pressure failure and rerunning the same external target against a corrected system.

Desired cycle:

```text
failure
→ localize
→ implement
→ focused proof
→ rerun target
```

Low Retry Distance lets external software serve as a high-frequency development instrument.

---

## 15. Frontier Movement

**Frontier Movement** is measurable advancement in the most ambitious real external program the system can execute correctly.

```text
static RV64 fixture
→ dynamic musl binary
→ BusyBox shell
→ Alpine userspace
→ apk transaction
→ QEMU/TCG guest
→ QEMU reaches KVM_RUN
→ accelerated guest execution
```

A large patch with no Frontier Movement may still be necessary substrate, but it should not be confused with ecosystem inheritance.

---

## 16. Boundary Win

A **Boundary Win** occurs when a compatibility boundary becomes sufficiently correct that responsibility for a large class of behavior transfers to existing userspace software.

Examples:

- correct `PT_INTERP` handoff transfers dynamic relocation to the userspace loader;
- working `apk` transfers package acquisition to Alpine tooling;
- a sufficient KVM boundary transfers VM frontend and device-model work to QEMU.

Boundary Wins are preferred stopping points for major campaigns.

---

## 17. Responsibility Transfer

**Responsibility Transfer** is the deliberate handoff of work from the kernel to an existing userspace component once the kernel has supplied the minimum correct mechanism.

```text
kernel:
map executable + interpreter
construct startup state
enter interpreter

userspace loader:
load dependencies
perform relocations
resolve symbols
initialize runtime state
```

The KVM/QEMU relationship follows the same principle:

```text
Alpz/Morphic:
VM resources
vCPU resources
stage-2 mappings
entry/exit
interrupt/time virtualization
KVM-compatible boundary

QEMU:
machine models
device emulation
firmware integration
image formats
VM orchestration
```

---

## 18. Causal Proof

A **Causal Proof** demonstrates that the external operation being tested actually caused the machine state being claimed.

```text
userspace operation
    ↓
actual trap / ABI decode
    ↓
real mechanism mutation
    ↓
real machine consequence
    ↓
independent verifier reconstructs relation
```

This is stronger than returning the expected value or printing a success marker according to a predetermined fixture sequence.

---

## 19. Independent Oracle

An **Independent Oracle** is a verifier that reconstructs decisive facts from artifacts and machine observations rather than trusting the implementation's own success labels.

It may independently check:

- ELF structure;
- ECALL instruction sites;
- fault PCs and causes;
- page-table permissions;
- resource generations;
- entry/bias relationships;
- VM-exit reasons;
- `kvm_run` contents;
- deterministic behavior across separate QEMU executions.

The Pressure Oracle tells us **what to implement next**.

The Independent Oracle tells us **whether we actually implemented it**.

---

## 20. Batch Collapse

**Batch Collapse** is the desirable disappearance of planned intermediate milestones when one implemented mechanism unlocks several downstream targets at once.

Batches organize objectives. They are not quotas of work.

If one repair makes BusyBox, an Alpine shell, and part of the next planned campaign work, accept the larger result instead of manufacturing work to preserve the roadmap.

---

## 21. Inheritance Escape Velocity

**Inheritance Escape Velocity** is the point where the system can acquire useful software through existing package managers, compilers, runtimes, and compatibility interfaces faster than equivalent functionality would need to be ported or recreated manually.

```text
Alpine + apk
    ↓
install compilers/runtimes/tools
    ↓
those tools build or install more software
    ↓
QEMU opens guest ecosystems
    ↓
KVM compatibility accelerates those guests
```

---

## 22. KVM Pressure Build

A **KVM Pressure Build** is the specific application of Pressure-Oracle engineering to stock QEMU's KVM client.

The goal is not "implement Linux KVM." The goal is:

> Implement the smallest correct RISC-V KVM userspace surface stock QEMU actually requires to drive the native Alpz hypervisor.

Canonical progression:

```text
run:
qemu-system-riscv64 -accel kvm ...

fails on KVM_GET_API_VERSION
        ↓
implement it
        ↓
retry

fails on KVM_CHECK_EXTENSION
        ↓
implement only the capabilities QEMU needs
        ↓
retry

fails on KVM_CREATE_VM
        ↓
implement it
        ↓
retry

...

QEMU reaches KVM_RUN
        ↓
vCPU fd translates to Morphic RunVcpu
        ↓
enter VS-mode
        ↓
guest executes
        ↓
VM exit
        ↓
populate kvm_run
        ↓
return to QEMU
```

The first successful `KVM_RUN` round trip is a major Boundary Win because it proves that the external KVM ABI is connected to the native virtualization engine rather than merely emulated as interface-shaped stubs.

---

## 23. Hypervisor Steal

A **Hypervisor Steal** is the high-leverage strategy of keeping the native hypervisor mechanism small while inheriting QEMU as the mature userspace virtualization frontend through a minimal KVM-compatible boundary.

```text
                 stock QEMU
                     │
              RISC-V KVM client
                     │
                 /dev/kvm
                     │
             Alpz KVM adapter
                     │
        reusable Morphic VM/vCPU mechanisms
                     │
             RISC-V H extension
                     │
               guest execution
```

The value comes from what does **not** need to move into the kernel.

---

## 24. Multiplicative Roadmap

A **Multiplicative Roadmap** orders work by inheritance consequence rather than by subsystem taxonomy.

For Alpz, the intended shape is approximately:

```text
exec truth
    ↓
musl + BusyBox
    ↓
Alpine + apk
    ↓
QEMU/TCG
    ↓
native RISC-V H
    ↓
minimal KVM compatibility
    ↓
QEMU/KVM on Alpz
```

The sequence may change under real pressure. Its invariant is that each major campaign should create leverage for the following campaigns.

---

# Foundation Design Vocabulary

The pressure method must not be allowed to turn Morphic into a historical compatibility clone. The following established engineering ideas constrain how pressure-driven features enter the permanent foundation.

## 25. Architectural Neutrality

**Architectural Neutrality** means that the permanent foundation does not structurally privilege one external ecosystem when the underlying capability is more general.

Linux may be a major client of Morphic without becoming the definition of Morphic.

```text
BAD:
Morphic resource = Linux fd

GOOD:
Morphic ResourceRef
        ↓
Linux compatibility adapter
        ↓
fd 3
```

Likewise, a Morphic virtual machine should not be defined as a `/dev/kvm` file descriptor. KVM is one external representation of a more general VM/vCPU mechanism.

Architectural Neutrality is what allows QuirkM, Linux compatibility, WASI, future personalities, and systems not yet imagined to reuse the same foundation without first undoing Linux-specific assumptions.

---

## 26. Separation of Mechanism and Policy

**Separation of Mechanism and Policy** is the classic systems-design rule that the foundation should provide general capabilities while higher layers decide how those capabilities are presented and governed.

Examples:

```text
MECHANISM                     POLICY / ABI

resource binding              Linux fd numbering
address-space mapping         Linux mmap flags
image replacement             execve ABI
VM creation                   KVM_CREATE_VM
vCPU execution                KVM_RUN
clock source                  clock_gettime ABI
```

This distinction is central to making Morphic useful beyond Alpz.

Pressure from Linux or QEMU may reveal that a mechanism is missing, but the historical interface that exposed the need does not automatically become the internal API.

---

## 27. Compatibility Isolation

**Compatibility Isolation** is the containment of ecosystem-specific behavior in replaceable compatibility layers.

Linux syscall numbers, Linux errno conventions, KVM ioctl layouts, POSIX edge cases, and similar historical details belong at the edge unless they reveal a truly general mechanism beneath them.

Compatibility Isolation allows the project to inherit aggressively without permanently absorbing every historical design choice of the inherited system.

`Quirk Quarantine` is the project's informal shorthand for this more ordinary engineering principle.

---

## 28. Stable Core, Replaceable Edges

**Stable Core, Replaceable Edges** describes the preferred dependency shape of the system.

The stable core contains mechanisms expected to survive many personalities and applications. The edges contain adapters, ABI translations, presentation choices, and compatibility policy that may evolve or be replaced.

```text
Linux personality      QuirkM native API      future personality
        \                    |                    /
         \                   |                   /
          +--------- replaceable edges --------+
                            ↓
                     stable Morphic core
```

This lets the project move quickly at the edges while applying much stricter design standards to assumptions that would be expensive to reverse later.

---

## 29. Reversibility

**Reversibility** is the degree to which an architectural decision can be changed later without forcing unrelated parts of the system to change with it.

The deeper and more widely depended-on a decision is, the more important reversibility becomes.

A useful design gradient is:

```text
easier to replace
────────────────────────
fixture
verifier presentation
Linux syscall adapter
KVM compatibility adapter
QuirkM API spelling

harder to replace
────────────────────────
resource identity
ownership model
address-space semantics
task model
capability model
VM/vCPU abstraction
interrupt model
concurrency primitives
```

This produces a practical rule:

> Move fast on replaceable compatibility code. Move carefully on permanent ontology.

---

## 30. Dependency Inversion

**Dependency Inversion** means high-level compatibility policy should depend on general mechanisms, rather than general mechanisms depending on one compatibility personality.

For example:

```text
Linux dup
    ↓
duplicate resource binding
    ↓
Morphic resource mechanism
```

not:

```text
Morphic resource mechanism
    ↓
defined in terms of Linux dup semantics
```

The same applies to KVM:

```text
KVM_RUN
    ↓
KVM adapter
    ↓
Morphic vCPU run operation
```

This keeps Linux and KVM as clients of the foundation rather than architects of it.

---

## 31. Orthogonal Primitives

**Orthogonal Primitives** are small mechanisms whose responsibilities overlap as little as practical and which can be composed into many higher-level behaviors.

Examples might include:

```text
resource
address space
mapping
task
execution context
channel
event
timer
VM
vCPU
interrupt endpoint
```

The goal is not the fewest functions or the smallest source file. The goal is a small set of independent concepts that can be recombined without importing unrelated policy.

Orthogonality is what lets the same mechanism support Linux compatibility, QuirkM-native interfaces, virtualization, and later personalities in different combinations.

---

## 32. Minimal Basis

A **Minimal Basis** is the smallest set of sufficiently general primitives from which the required higher-level systems can be composed.

This is a more useful target than simply minimizing the number of kernel features.

```text
smallest kernel
        ≠
fewest capabilities at any cost

useful minimal basis
        =
fewest independent primitives
that generate the largest useful design space
```

The Minimal Basis is therefore the foundation-side counterpart to MinMax inheritance.

The objective is not a kernel that can only imitate today's target with very little code. It is a foundation whose compact set of mechanisms can express today's target and remain useful for systems built tomorrow.

---

## 33. Pressure-Informed Abstraction

**Pressure-Informed Abstraction** means using a real compatibility failure to discover that a capability is needed, then designing the permanent abstraction according to the underlying general problem rather than copying the shape of the historical API that exposed it.

Canonical decision:

```text
real target fails
      ↓
identify missing behavior
      ↓
ask what kind of thing it is
  ┌───────────────┴───────────────┐
  │                               │
general mechanism          compatibility-specific rule
  │                               │
  ↓                               ↓
Morphic core                 adapter/personality
  └───────────────┬───────────────┘
                  ↓
                retry
```

Pressure determines **priority**. Architecture determines **placement and shape**.

This prevents Pressure-Oracle engineering from degenerating into target-shaped kernel design.

---

## 34. General-Purpose Foundation

A **General-Purpose Foundation** is a base system deliberately structured so that unrelated future systems can be built on it without first removing assumptions imposed by the first compatibility target.

For Morphic, this means Linux compatibility may become extremely broad while remaining one client of mechanisms such as resources, address spaces, tasks, events, VM/vCPU state, and device control.

A General-Purpose Foundation should allow someone to build:

- a Linux-compatible Alpz system;
- QuirkM-native userspace with cleaner APIs;
- a virtualization-focused system;
- a WASI-oriented personality;
- a constrained embedded system;
- or a future design not anticipated by the current roadmap.

The test is not that every future system is already implemented. The test is that today's compatibility work does not unnecessarily close those design possibilities.

---

# Distilled Principles

The vocabulary above reduces to a small set of project principles.

## Principle A — Let the Consumer Choose the Work

Do not guess the entire compatibility surface.

Run the most valuable real consumer currently within reach. Treat its first legitimate failure as prioritization information.

---

## Principle B — Repair Mechanisms, Not Symptoms

The first observed failure is evidence, not necessarily the correct abstraction boundary.

Trace it downward until the smallest reusable missing mechanism is identified. Implement that mechanism once, then keep the external quirk in a thin adapter.

---

## Principle C — Stop at the Inheritance Boundary

When a correct interface allows mature external software to take responsibility, stop implementing the upper layer locally.

A kernel that correctly enters a dynamic loader should not become a dynamic loader.

A hypervisor with a sufficient KVM boundary should not become QEMU.

The project grows partly by knowing where not to grow.

---

## Principle D — Optimize for Leverage, Not Surface Count

Ten new syscalls are not automatically better than one.

One interface operation that opens a major software world may have greater value than dozens of isolated capabilities.

Measure progress by Frontier Movement and Civilization Leverage, not raw API count.

---

## Principle E — Require Machine-Caused Evidence

Compatibility claims must be caused by the real operation and independently reconstructed where practical.

The same discipline applies to musl, `apk`, QEMU, H-extension entry/exit, and KVM.

---

## Principle F — Retry Aggressively

Keep Retry Distance low.

Every correction should be followed quickly by the same real target. The target then reveals either success or the next pressure point.

---

## Principle G — Welcome Roadmap Collapse

If one repair makes several planned milestones work, do not manufacture additional batches to preserve the plan.

The roadmap exists to predict inheritance gates. Reality is allowed to outperform it.

---

## Principle H — Seek Responsibility Transfers

The most valuable mechanism is often one that allows a large mature system to take over responsibility from us.

```text
PT_INTERP handoff
    → loader owns dynamic linking

apk compatibility
    → Alpine owns package acquisition

KVM compatibility
    → QEMU owns rich VM frontend/device behavior
```

---

## Principle I — Preserve Architectural Neutrality

Maximize inherited capability, but do not buy it by making the permanent core synonymous with the first ecosystem that happens to need a feature.

Linux can be a major compatibility target without becoming Morphic's internal ontology.

---

## Principle J — Separate Mechanism from Policy

When pressure exposes a missing capability, first determine whether it is a general mechanism or merely a historical compatibility rule.

General mechanisms belong in the stable foundation. Compatibility rules belong in adapters and personalities.

---

## Principle K — Prefer Reversible Edges and Conservative Foundations

A compatibility adapter can be replaced cheaply. A flawed resource or VM model may constrain everything built above it.

Spend design caution in proportion to the cost of reversal.

---

## Principle L — Build a Minimal Basis, Not a Minimal Dead End

The objective is not the smallest kernel capable of passing the current test.

The objective is the smallest coherent set of orthogonal mechanisms capable of generating the largest useful space of systems.

A successful MinMax design therefore minimizes permanent mechanism while preserving generality and composability.

---

# The Pressure-Oracle Law

The method can be compressed into one project law:

> **Run the most valuable real software that is almost reachable. Implement the first missing reusable mechanism it exposes. Prove the mechanism causally. Retry immediately. Stop implementing when a compatibility boundary transfers responsibility to the inherited ecosystem.**

Operationally:

```text
TARGET
  ↓
PRESSURE
  ↓
FIRST MISSING MECHANISM
  ↓
CLASSIFY: GENERAL OR COMPATIBILITY-SPECIFIC?
  ↓
MINIMUM PERMANENT REPAIR OR THIN ADAPTER
  ↓
CAUSAL PROOF
  ↓
RETRY
  ↓
FRONTIER MOVEMENT
  ↓
BOUNDARY WIN
  ↓
INHERITED MULTIPLIER
  ↓
NEXT TARGET
```

The long-term design constraint is equally compact:

> **Inherit aggressively. Keep the core general. Put compatibility at the edges. Prefer a small set of orthogonal, permanent mechanisms over target-shaped foundations.**

This is the intended engineering method for moving quickly from musl to BusyBox to Alpine to `apk`, and then from QEMU/TCG to RISC-V H-extension virtualization and the smallest useful `/dev/kvm` surface, without sacrificing Morphic's usefulness as a general-purpose foundation.