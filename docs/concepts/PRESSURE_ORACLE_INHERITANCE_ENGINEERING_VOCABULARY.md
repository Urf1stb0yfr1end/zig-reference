# Pressure-Oracle Inheritance Engineering Vocabulary

This document defines project vocabulary for a recurring engineering method in `zig-reference`, Morphic, and Alpz: use real external software as a pressure source, implement the smallest missing reusable mechanism, retry, and let compatibility accumulate until an existing software ecosystem becomes reachable.

These terms are project language, not claimed industry standards. The purpose is to give agents and humans a precise way to discuss why a small kernel mechanism can be more valuable than a large amount of locally invented functionality.

The central question is:

> What is the smallest permanent mechanism whose implementation causes the largest existing software world to become reachable?

The governing principle remains:

> **Minimum permanent mechanism. Maximum inherited civilization.**

---

## 1. Pressure Oracle

A **Pressure Oracle** is real target software used as an executable source of truth for what compatibility work is actually missing.

Instead of beginning from a speculative checklist of every syscall, ioctl, flag, ABI rule, or subsystem that *might* be required, run the software that matters and observe the first concrete incompatibility.

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

This changes engineering from:

```text
"we think this compatibility surface should be enough"
```

into:

```text
"the real consumer advanced to the next boundary"
```

A pressure target is therefore both software to inherit and a test instrument.

---

## 3. First Missing Mechanism

The **First Missing Mechanism** is the earliest reusable semantic capability whose absence prevents the pressure target from advancing.

This term deliberately distinguishes a mechanism from the immediate symptom.

Example:

```text
symptom:
QEMU receives ENOTTY from an ioctl

possible first missing mechanism:
VM-fd ioctl dispatch with one required KVM operation
```

Or:

```text
symptom:
BusyBox shell startup hangs

possible first missing mechanism:
futex wait/wake semantics
```

The engineering task is not merely to remove the observed error. It is to find the smallest underlying capability that explains the failure and is likely to be reusable by later software.

---

## 4. Smallest Sufficient Surface

The **Smallest Sufficient Surface** is the minimum externally visible compatibility surface needed to let the current inheritance target make meaningful progress.

It is narrower than "implement the subsystem" and stronger than "hard-code the test."

For KVM, the Smallest Sufficient Surface should not mean implementing the complete Linux KVM API. It means implementing the smallest correct subset stock RISC-V QEMU actually requires, discovered through pressure.

Conceptually:

```text
complete historical API
        ≠
required compatibility surface
```

The desired relationship is:

```text
small permanent adapter
        ↓
large inherited implementation above it
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

```text
implement interface boundary
        ↓
reuse software already written by others
        ↓
new capabilities arrive without equivalent kernel growth
```

---

## 6. Inheritance Multiplier

An **Inheritance Multiplier** is software that, once reachable, makes additional software dramatically easier to acquire.

High-value examples:

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

An **Inheritance Steal** is the deliberate act of implementing a comparatively small compatibility boundary in order to reuse a mature external software civilization rather than rebuilding its upper layers locally.

"Steal" is used here informally and positively: no code is misappropriated. The project is inheriting through legitimate public interfaces and open-source software instead of needlessly reproducing solved engineering.

The KVM strategy is the archetypal example:

```text
native RISC-V H-extension engine
        +
small stock-QEMU-compatible /dev/kvm surface
        ↓
QEMU supplies mature VM orchestration and device-model machinery
```

Without the inheritance boundary, the project might be tempted to build VM launch logic, device models, disk formats, networking, firmware integration, monitor behavior, and other surrounding machinery itself.

The Inheritance Steal asks whether one narrow interface can make that unnecessary.

---

## 8. Civilization Leverage

**Civilization Leverage** measures how much useful existing software becomes reachable per unit of permanent new complexity.

Conceptually:

```text
                     useful existing software newly reachable
Civilization Leverage = ------------------------------------
                         permanent new system complexity
```

This is not a literal universal metric. It is a decision heuristic.

A feature with modest standalone usefulness may have enormous Civilization Leverage if it opens a stable inheritance boundary.

For example, a small `/dev/kvm` adapter may be more strategically valuable than a much larger custom virtual-machine manager because QEMU already contains decades of surrounding virtualization work.

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

The ideal pressure repair looks like:

```text
QEMU exposes missing behavior
        ↓
repair identifies reusable mechanism
        ↓
Linux/KVM adapter becomes thin
        ↓
mechanism remains useful to QuirkM and future personalities
```

---

## 10. Compatibility Adapter

A **Compatibility Adapter** translates the historical semantics of an inherited ecosystem into small permanent Morphic mechanisms.

The adapter owns quirks that should not contaminate the common core.

Examples:

```text
Linux syscall numbers
negative errno
AT_FDCWD
Linux mmap flags
KVM ioctl numbers
KVM fd hierarchy
```

belong at compatibility edges, while mechanisms such as resource identity, address-space mutation, VM creation, vCPU state, and stage-2 mappings should remain semantically cleaner beneath them.

The desired architecture is:

```text
historical external ABI
        ↓
compatibility adapter
        ↓
small reusable Morphic mechanisms
```

This is **Quirk Quarantine** applied to inheritance engineering.

---

## 11. Quirk Quarantine

**Quirk Quarantine** is the rule that historical compatibility behavior should remain confined to the personality or adapter that requires it instead of becoming the internal ontology of the system.

For example, KVM may expose VM fds, vCPU fds, `mmap(kvm_run)`, and ioctls because that is the interface QEMU expects. Morphic does not therefore need to define virtualization internally as "a pile of Linux ioctl numbers."

The adapter can translate:

```text
KVM_CREATE_VM
    ↓
Morphic CreateVm operation
```

```text
KVM_CREATE_VCPU
    ↓
Morphic CreateVcpu operation
```

```text
KVM_RUN
    ↓
Morphic RunVcpu operation
```

External compatibility is preserved without allowing external historical accidents to dictate the clean core.

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

Its purpose is to ensure each stage creates leverage for the next rather than merely accumulating unrelated features.

---

## 13. Pressure Cascade

A **Pressure Cascade** occurs when satisfying one missing mechanism exposes the next missing mechanism immediately, creating a productive sequence of target-driven repairs.

Example:

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

A healthy Pressure Cascade is preferable to designing the whole endpoint from imagination because it keeps implementation coupled to demonstrated demand.

---

## 14. Retry Distance

**Retry Distance** is the amount of engineering work between observing a pressure failure and rerunning the same external target against a corrected system.

Low Retry Distance is strategically important for agentic development.

Desired cycle:

```text
failure
→ localize
→ implement
→ focused proof
→ rerun target
```

rather than:

```text
failure
→ redesign several subsystems
→ implement speculative dependencies
→ wait for broad integration
→ discover original target still fails differently
```

Small, verifiable repairs make the pressure oracle useful at high frequency.

---

## 15. Frontier Movement

**Frontier Movement** is measurable advancement in the most ambitious real external program the system can execute correctly.

Examples of frontier states:

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

A small patch that moves the frontier through an important interface can be disproportionately valuable.

---

## 16. Boundary Win

A **Boundary Win** occurs when a compatibility boundary becomes sufficiently correct that responsibility for a large class of behavior transfers to existing userspace software.

Examples:

- once `PT_INTERP` handoff is correct, dynamic relocation belongs to the userspace loader rather than the kernel;
- once `apk` can operate correctly, package acquisition belongs largely to Alpine tooling rather than bespoke project scripts;
- once stock QEMU can use the Alpz KVM personality, virtual machine orchestration and device emulation remain QEMU's job rather than becoming kernel features.

Boundary Wins are the preferred stopping points for major campaigns.

They mark where the project can stop implementing an upper layer because an inherited ecosystem has taken over.

---

## 17. Responsibility Transfer

**Responsibility Transfer** is the deliberate handoff of work from the kernel to an existing userspace component once the kernel has supplied the minimum correct mechanism.

The dynamic-loader case is illustrative:

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

The KVM/QEMU case follows the same pattern:

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

The project should actively seek Responsibility Transfers because they prevent permanent kernel complexity from expanding into mature userspace domains.

---

## 18. Causal Proof

A **Causal Proof** demonstrates that the external operation being tested actually caused the machine state being claimed.

This term emerged from Batch 26, where a superficially convincing proof was rejected because supervisor-precomputed results could imitate successful behavior.

A valid causal proof prefers:

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

rather than:

```text
expected operation number
    ↓
hard-coded expected answer
    ↓
print PASS
```

Pressure-oracle development depends on causal proof. Otherwise a target can appear to advance while the claimed compatibility mechanism is not actually present.

---

## 19. Independent Oracle

An **Independent Oracle** is a verifier that reconstructs decisive facts from artifacts and machine observations rather than trusting the implementation's own success labels.

Examples include independently checking:

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

These roles should not be confused.

---

## 20. Batch Collapse

**Batch Collapse** is the desirable disappearance of planned intermediate milestones when one implemented mechanism unlocks several downstream targets at once.

Example:

```text
planned:
BusyBox compatibility
then Alpine shell
then apk prerequisites

observed:
one missing mechanism repaired
    ↓
BusyBox works
    ↓
Alpine shell also works immediately
```

The correct response is not to preserve the roadmap ceremonially. Accept the larger inheritance win and move the frontier forward.

Batches organize objectives. They are not quotas of work.

---

## 21. Inheritance Escape Velocity

**Inheritance Escape Velocity** is the point where the system can acquire useful software through existing package managers, compilers, runtimes, and compatibility interfaces faster than equivalent functionality would need to be ported or recreated manually.

A representative path is:

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

The important transition is from manually adding applications to creating mechanisms that make applications arrive through established ecosystems.

This is the larger Snowball target.

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

The first successful `KVM_RUN` round trip is a major boundary win because it proves the external KVM ABI is connected to the native virtualization engine rather than merely emulated as interface-shaped stubs.

---

## 23. Hypervisor Steal

A **Hypervisor Steal** is the high-leverage strategy of keeping the native hypervisor mechanism small while inheriting QEMU as the mature userspace virtualization frontend through a minimal KVM-compatible boundary.

Target architecture:

```text
                 stock QEMU
                     │
              RISC-V KVM client
                     │
                 /dev/kvm
                     │
             Alpz KVM adapter
                     │
        ┌────────────┴────────────┐
        │ reusable Morphic VM/vCPU│
        │ mechanisms              │
        └────────────┬────────────┘
                     │
             RISC-V H extension
                     │
               guest execution
```

The value comes from what *does not* need to move into the kernel.

The project should avoid reimplementing mature QEMU responsibilities merely because native virtualization is exciting. The KVM boundary exists precisely so the hypervisor can remain a mechanism while QEMU remains the rich policy/frontend layer.

---

## 24. Multiplicative Roadmap

A **Multiplicative Roadmap** orders work by inheritance consequence rather than by subsystem taxonomy.

A conventional roadmap might group all filesystem work, then all process work, then all signal work, and so on.

A Multiplicative Roadmap asks which next boundary creates the greatest increase in reachable software.

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

# Distilled Principles

The vocabulary above reduces to a small set of unique principles.

## Principle A — Let the Consumer Choose the Work

Do not guess the entire compatibility surface.

Run the most valuable real consumer currently within reach. Treat its first legitimate failure as prioritization information.

This prevents years of compatibility archaeology from replacing actual ecosystem progress.

## Principle B — Repair Mechanisms, Not Symptoms

The first observed failure is evidence, not necessarily the correct abstraction boundary.

Trace it downward until the smallest reusable missing mechanism is identified. Implement that mechanism once, then keep the external quirk in a thin adapter.

This is how pressure work compounds instead of becoming a collection of hacks.

## Principle C — Stop at the Inheritance Boundary

When a correct interface allows mature external software to take responsibility, stop implementing the upper layer locally.

A kernel that correctly enters a dynamic loader should not become a dynamic loader.

A hypervisor with a sufficient KVM boundary should not become QEMU.

The project grows by knowing where **not** to grow.

## Principle D — Optimize for Leverage, Not Surface Count

Ten new syscalls are not automatically better than one.

One interface operation that opens a major software world may have greater value than dozens of isolated capabilities.

Measure progress by Frontier Movement and Civilization Leverage, not by the number of API entries implemented.

## Principle E — Require Machine-Caused Evidence

Compatibility claims must be caused by the real operation and independently reconstructed where practical.

The same discipline that rejected supervisor-precomputed Batch 26 evidence should apply to musl, `apk`, QEMU, H-extension entry/exit, and KVM.

A pressure target is useful only if false progress is difficult to manufacture accidentally.

## Principle F — Retry Aggressively

Keep Retry Distance low.

Every correction should be followed quickly by the same real target. The target then reveals either success or the next pressure point.

This converts external software into a high-frequency development instrument.

## Principle G — Welcome Roadmap Collapse

If one repair makes several planned milestones work, do not manufacture additional batches to preserve the plan.

The roadmap exists to predict inheritance gates. Reality is allowed to outperform it.

## Principle H — Seek Responsibility Transfers

The most valuable mechanism is often one that allows a large mature system to take over responsibility from us.

Examples:

```text
PT_INTERP handoff
    → loader owns dynamic linking

apk compatibility
    → Alpine owns package acquisition

KVM compatibility
    → QEMU owns rich VM frontend/device behavior
```

Responsibility Transfer is one of the strongest forms of MinMax engineering.

---

# The Pressure-Oracle Law

The method can be compressed into one project law:

> **Run the most valuable real software that is almost reachable. Implement the first missing reusable mechanism it exposes. Prove the mechanism causally. Retry immediately. Stop implementing when a compatibility boundary transfers responsibility to the inherited ecosystem.**

Or, in operational form:

```text
TARGET
  ↓
PRESSURE
  ↓
FIRST MISSING MECHANISM
  ↓
MINIMUM PERMANENT REPAIR
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

This is the intended engineering loop for the path from musl to BusyBox to Alpine to `apk`, and then from QEMU/TCG to RISC-V H-extension virtualization and the smallest useful `/dev/kvm` surface.

The final objective is not maximum local implementation.

It is maximum capability under minimum permanent mechanism.
