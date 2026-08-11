# QuirkM Native API and Linux Quirk Quarantine Proposal

## Status

Architectural proposal.

QuirkM is the proposed native Morphic software personality: a clean-by-default native API and userspace model intentionally designed to avoid known Linux ABI/API quirks while retaining a strong, explicit path to Linux compatibility when software genuinely depends on those quirks.

The name captures the core promise:

> **QuirkM learns from Linux's accumulated interface debt without giving up access to the Linux software world.**

This is not a proposal to ridicule Linux or pretend decades of compatibility constraints were mistakes made in ignorance. Linux carries historical behavior because compatibility has value. QuirkM treats that history as unusually valuable design evidence.

Linux compatibility tells Morphic what existing software expects.

Linux's accumulated pain tells QuirkM what a new native API should avoid repeating.

---

# 1. Executive idea

The project should preserve two deliberately different user-facing lanes over one shared semantic substrate:

```text
                         APPLICATIONS
                              |
                +-------------+-------------+
                |                           |
                v                           v
         QUIRKM NATIVE                  LINUX ABI
         clean by default            compatibility exactness
                |                           |
                |                           |
       typed / explicit /            syscall numbers / errno /
       capability-shaped             historical Linux semantics
                |                           |
                +-------------+-------------+
                              |
                              v
                   MORPHIC SEMANTIC CORE
                              |
          resources / memory / process / IPC / wait
                              |
                              v
                           ALPZ/MACHINE
```

QuirkM should not become a separate reinvention of every kernel mechanism.

The preferred architecture is:

```text
Linux pressure
    |
    +--> fundamental concept discovered
    |         |
    |         v
    |   Morphic semantic primitive
    |         |
    |         +--> Linux adapter
    |         +--> QuirkM native API
    |         +--> WebAssembly host
    |         +--> future hypervisor control
    |
    +--> Linux-only historical behavior
              |
              v
       Linux compatibility quarantine
```

The rule is simple:

> **Fundamental mechanisms may descend into the shared core. Historical quirks must not leak downward merely because Linux requires them.**

---

# 2. Relationship to Morphic, Alpz, and the four-branch strategy

This proposal does not replace the existing architecture.

A useful naming model is:

```text
Morphic
    shared architectural family and semantic substrate

Alpz
    current RV64 machine/kernel embodiment and Linux-compatibility proving ground

QuirkM
    native Morphic API/personality whose contracts intentionally avoid inherited Linux quirks
```

QuirkM therefore belongs primarily to the Native branch while borrowing pressure and implementations from the Alpine and Compatibility Maximizer branches.

It should also remain compatible with the Hypervisor branch and an early WebAssembly personality.

The intended long-term shape is:

```text
                              MORPHIC CORE
                                   |
          +------------------------+------------------------+
          |                        |                        |
          v                        v                        v
      QUIRKM NATIVE           LINUX PERSONALITY          WASM HOST
          |                        |                        |
    native software          BusyBox / musl /           components
    clean contracts          Alpine / ports
          |                        |
          +------------+-----------+
                       |
                       v
            shared fundamental mechanisms
```

QuirkM succeeds when Linux compatibility can become broader without forcing QuirkM applications to inherit the Linux behavior that made that compatibility difficult.

---

# 3. The QuirkM promise

The intended developer experience is:

> "I need the capability, but I do not want the historical API baggage. Use QuirkM."

Examples:

```text
Need a process identity?
    QuirkM gives a typed process resource, not primarily a reusable integer PID.

Need to open something relative to a directory?
    QuirkM makes the authority and resolution policy explicit.

Need asynchronous completion?
    QuirkM gives a structured completion/wait model rather than requiring every subsystem to grow a separate polling convention.

Need device-specific functionality?
    QuirkM exposes typed/versioned operations rather than defaulting to arbitrary ioctl numbers and compiler-layout structs.

Need to spawn a child?
    QuirkM uses an explicit process builder rather than making full address-space duplication the native primitive.
```

At the same time:

> "I have software that depends on the Linux behavior exactly."

That remains possible through the Linux compatibility personality.

The goal is not to delete the old world.

The goal is to **quarantine it**.

---

# 4. Two semantics, one machine

The most important design law is that native and compatibility semantics must remain distinguishable.

Do not build this:

```text
QuirkM API
    |
    v
Linux syscall ABI
    |
    v
kernel
```

That would make QuirkM merely a prettier libc wrapper.

Prefer:

```text
                 Morphic semantic operations
                           |
             +-------------+-------------+
             |                           |
             v                           v
       QuirkM Native API            Linux ABI adapter
             |                           |
             v                           v
       native process                Linux ELF
```

The semantic layer should describe concepts such as:

```text
resource
memory object
mapping
process
thread/task
stream
channel
endpoint
wait/completion
clock/timer
filesystem object
namespace/root capability
```

without embedding Linux syscall numbers, errno numbers, RISC-V register names, `/proc` formatting, ioctl encodings, or other compatibility identity.

---

# 5. Quirk quarantine

All behavior that exists only to reproduce Linux compatibility should have an explicit architectural home.

Conceptually:

```text
compat/linux/
    syscall decode
    errno translation
    fd semantics
    signal compatibility
    ioctl compatibility
    procfs/sysfs compatibility
    path quirks
    polling compatibility
    futex compatibility
    namespace compatibility
    distro/application-specific pressure
```

The exact source layout is future work, but the conceptual boundary should exist from the beginning.

A Linux quirk is allowed to affect QuirkM native semantics only if a separate architectural argument proves that the underlying behavior is fundamental and desirable independent of Linux compatibility.

"Linux needs it" is not enough.

---

# 6. Native clean path and explicit compatibility escape hatch

QuirkM should make the clean operation the easy operation.

Conceptually:

```zig
const file = try qm.fs.open(root, path, .{
    .access = .read,
});
```

If exact Linux compatibility behavior is genuinely required, the caller should opt into it visibly.

Possible forms include:

```zig
const result = try qm.compat.linux.openat(...);
```

or, for a general operation where only one policy differs:

```zig
const result = try qm.fs.resolve(root, path, .{
    .semantics = .linux_compat,
});
```

The preferred rule is:

- use **typed native options** for real general policy choices;
- use an explicit **`compat.linux` namespace/personality** for Linux-only behavior;
- do not scatter generic `quirks=true` flags across the native API;
- do not let compatibility mode become an invisible global switch.

A developer should be able to tell from the source when they are leaving QuirkM-native semantics.

---

# 7. Linux programs remain first-class compatibility consumers

QuirkM does not require native applications to abandon the Linux software ecosystem.

A native program should eventually be able to invoke a Linux-personality process and exchange explicit resources with it.

Example:

```text
QuirkM native video editor
        |
        | gives input/output resources
        v
Linux-personality ffmpeg process
        |
        | consumes Linux ABI
        v
same Morphic semantic substrate
```

This permits a powerful migration path:

```text
1. use existing Linux program today
2. wrap it behind a clean QuirkM capability
3. replace it with a native or Wasm provider later if worthwhile
4. callers do not need to change if the capability contract remains stable
```

A Linux implementation can therefore serve a QuirkM-native system without forcing the native caller to adopt Linux's API shape.

---

# 8. Compatibility providers

Eventually QuirkM should be able to treat implementations as providers of typed capabilities.

Conceptually:

```text
need: media/transcode@1

providers:
    native-transcoder
    linux-ffmpeg
    wasm-transcoder
    hardware-video-service
```

A caller asks for the capability.

The provider may be native, Linux-compatible, WebAssembly, or hardware-backed.

The platform preserves the interface contract.

This turns Linux compatibility into an implementation reservoir rather than the definition of the native API.

---

# 9. The Linux Quirk Ledger

QuirkM should maintain a permanent, machine-readable **Linux Quirk Ledger**.

This is not merely documentation.

It is part of the design and regression system.

Every significant Linux compatibility behavior discovered during implementation should be classified.

A conceptual record:

```json
{
  "id": "linux-fd-reuse-identity",
  "linux_interface": "file descriptor identity",
  "class": "reusable-integer-identity",
  "quirk_or_pressure": "descriptor integers may be reused after close",
  "fundamental_concept": "process-local resource reference",
  "quirkm_counterdesign": "typed generational resource handle",
  "linux_compatibility": "preserve integer fd behavior in Linux personality",
  "shared_core": "resource identity and lifetime",
  "native_test": "stale native handle is rejected",
  "compat_test": "Linux fd reuse remains ABI-compatible",
  "status": "proposed"
}
```

Suggested future layout:

```text
quirks/
    linux/
        index.json
        fd-reuse.json
        pid-reuse.json
        cloexec-inheritance.json
        fork-state-copy.json
        vfork-sharing.json
        signal-eintr.json
        ioctl-encoding.json
        c-struct-layout.json
        path-resolution.json
        poll-epoll.json
        futex-evolution.json
        proc-sysfs.json
```

Generated views could include:

```text
docs/generated/Linux Quirk Matrix
native counterdesign coverage
compatibility coverage
unresolved quirks
quirks intentionally inherited
quirks quarantined
```

---

# 10. Every quirk produces two proofs

A particularly strong QuirkM rule is:

> **Every important Linux quirk should eventually produce both a compatibility proof and a native counter-proof.**

Example:

```text
LINUX FD REUSE

compatibility proof:
    Linux process observes Linux-compatible fd behavior

native counter-proof:
    stale QuirkM generational resource handle cannot silently name a new object
```

Another example:

```text
CLOEXEC / INHERITANCE

compatibility proof:
    Linux descriptor inheritance and close-on-exec behavior matches the supported Linux contract

native counter-proof:
    QuirkM process spawn inherits no resource unless explicitly transferred/inherited
```

This converts historical pain into permanent engineering value.

---

# 11. Initial quirk families to study

The following are high-value design-pressure families, not a claim that every listed Linux behavior is simply "bad."

## 11.1 Reusable integer identities

Linux-facing examples include file descriptors and PIDs.

QuirkM direction:

```text
typed handles
+ generation
+ object type
+ rights
+ explicit lifetime
```

Linux compatibility may continue exposing integers while the shared core resolves them to stable resources.

## 11.2 Ambient inheritance

Examples include process state and descriptors inherited across process creation/execution.

QuirkM direction:

```text
spawn builder
+ explicit resource inheritance
+ explicit environment
+ explicit namespace/root
+ explicit credentials/capabilities
```

## 11.3 Fork/vfork-shaped process construction

QuirkM should not assume duplicating the current process image is the ideal native primitive.

Prefer an explicit process construction model while retaining fork/clone/vfork behavior only where Linux compatibility requires it.

## 11.4 Signals and interruption semantics

Linux-compatible signals may remain necessary.

QuirkM-native asynchronous behavior should prefer:

```text
structured events
completion objects
cancellation
wait sets
explicit handlers/tasks
```

rather than making asynchronous signal interruption the foundation of ordinary native control flow.

## 11.5 ioctl-style extensibility

QuirkM should prefer:

```text
typed operations
versioned schemas
explicit input/output contracts
machine-readable capability discovery
```

rather than magic numeric commands over arbitrary ABI structs.

## 11.6 Compiler-layout ABI

Native public contracts should avoid accidental dependence on compiler-specific padding, pointer width, enum layout, bitfields, or host C struct representation.

Prefer fixed-width, explicitly versioned interface representations where a wire/shared boundary exists.

## 11.7 Path resolution and ambient filesystem authority

Prefer explicit directory/root resources and explicit resolution policy.

Native operations should make authority visible rather than deriving broad authority from process-global cwd/root state whenever practical.

## 11.8 Polling model proliferation

Design one coherent wait/completion substrate early enough that:

```text
Linux select/poll/epoll
QuirkM waits
Wasm async/futures
future device completion
```

can adapt to the same underlying mechanism where semantics genuinely overlap.

## 11.9 Synchronization evolution

Native synchronization should be designed around the requirements learned from modern threading and wait-many/cancellation pressure rather than freezing the exact historical futex interface as the native contract.

## 11.10 Text-shaped kernel introspection

Linux compatibility may eventually require `/proc` and `/sys` behavior.

QuirkM-native introspection should instead prefer typed, discoverable system/resource queries.

Text files can be generated views rather than the underlying object model.

---

# 12. QuirkM native design laws

The following should be treated as candidate constitutional rules for the native platform.

1. **No accidental Linux inheritance.** Linux compatibility behavior enters Native only through an explicit design decision.
2. **Typed identities over naked reusable integers.**
3. **Explicit ownership and lifetime.**
4. **Explicit rights/capabilities.**
5. **Explicit resource inheritance and transfer.**
6. **No compiler C layout as an accidental stable native ABI.**
7. **Versioned typed operations instead of opaque numeric extension channels where practical.**
8. **Structured completion/cancellation instead of pervasive asynchronous interruption semantics.**
9. **Explicit namespace and path authority.**
10. **Machine-readable interface contracts from the start.**
11. **Introspection is a platform feature, not an afterthought.**
12. **Compatibility quirks remain replaceable modules/adapters.**
13. **Every compatibility addition must identify its fundamental concept separately from its historical behavior.**
14. **The simple native path must remain easier than requesting compatibility behavior.**
15. **Agents and humans should be able to determine semantics without reading implementation source whenever the contract can express them.**

---

# 13. Agent-first consequences

QuirkM should make the Quirk Ledger directly queryable by agents.

Conceptual commands:

```text
morph quirk linux openat
morph quirk linux signals
morph quirk linux ioctl
morph counterdesign fd-reuse
morph compat why process.spawn
morph compat alternatives ioctl
```

A useful answer would be compact and structured:

```text
Linux behavior:
    reusable integer fd

Known pressure:
    stale/reused identity ambiguity

QuirkM native:
    generational ResourceHandle<File>

Linux compatibility:
    integer fd table adapter

Shared primitive:
    process-local resource table

Proofs:
    native stale-handle rejection PASS
    Linux fd compatibility PASS
```

This makes the operating system teach an agent how to use it correctly.

The agent should not need folklore about why a native API differs from Linux.

The reason should be machine-readable.

---

# 14. Quirk discovery becomes Snowball input

Every Linux compatibility batch should eventually emit a small additional section:

```text
QUIRK EXTRACTION

Linux behavior encountered:
Fundamental mechanism:
Historical/compatibility-specific behavior:
Native counterdesign candidate:
Can shared core absorb the fundamental part?:
Must compatibility behavior remain quarantined?:
Ledger update:
```

That creates a compounding loop:

```text
implement Linux compatibility
        |
        v
observe real-world pressure
        |
        +--> reusable mechanism -> Morphic core
        |
        +--> historical quirk -> Linux quarantine
        |
        +--> counterdesign -> QuirkM native
        |
        +--> regression -> permanent proof
        |
        v
next agent starts with more solved knowledge
```

Linux compatibility therefore becomes a research program for Native Morphic rather than a competing architecture.

---

# 14A. Progressive de-quirking as an agentic migration program

QuirkM should not treat application porting as a binary choice between "Linux program" and "native rewrite."

The stronger long-term model is **progressive semantic migration**.

A program may begin entirely on the Linux personality, then move one interface family at a time onto QuirkM-native contracts while preserving the functionality that made the original program useful.

Conceptually:

```text
LEVEL 0
unchanged Linux application
        |
        v
Linux compatibility personality

LEVEL 1
Linux application with generated/adapted boundaries
        |
        +--> some Linux interfaces
        |
        +--> some QuirkM-native services

LEVEL 2
mostly QuirkM-native application
        |
        +--> a small explicit Linux compatibility remainder

LEVEL 3
fully QuirkM-native application
        |
        v
no Linux semantic dependency required for normal execution
```

The compatibility side therefore serves not only as an escape hatch, but also as a **migration scaffold**.

A useful future execution model could allow a package to declare both a preferred native personality and a Linux fallback:

```text
execution:
    preferred: quirkm
    fallback: linux

interfaces:
    filesystem: quirkm-v2
    memory: quirkm-v1
    networking: quirkm-v1
    process: linux
    graphics: linux
```

Migration can then happen subsystem by subsystem rather than requiring a risky all-at-once port.

Later the same package might become:

```text
interfaces:
    filesystem: quirkm-v2
    memory: quirkm-v1
    networking: quirkm-v1
    process: quirkm-v2
    graphics: linux
```

and eventually:

```text
interfaces:
    filesystem: quirkm-v2
    memory: quirkm-v1
    networking: quirkm-v1
    process: quirkm-v2
    graphics: quirkm-v3
```

## The Quirk Ledger becomes a bounded work queue

This structure is unusually well suited to agents because it provides both:

1. one stable, comprehensible end goal; and
2. many small, named, independently testable subgoals.

Instead of asking an agent:

```text
Port this large Linux application to QuirkM.
```

which is broad and underspecified, the platform should be able to say:

```text
APPLICATION: example-app

Linux semantic dependencies discovered: 137
Already QuirkM-native: 121
Known compatibility remainder: 16

remaining work:
    Q-0042 fd duplication/sharing assumption
    Q-0071 signal/EINTR assumption
    Q-0118 ambient path-resolution assumption
    Q-0134 ioctl operation family
    ...
```

Each remaining item can have:

```text
quirk id
Linux behavior
native replacement contract
source/binding locations
required capability
compatibility fallback
acceptance tests
differential oracle where available
known nonclaims
```

That changes the task from "understand and port an enormous program" to:

> **Remove one named semantic dependency without regressing the application's required behavior.**

When one quirk class is solved generically, the solution should become reusable migration knowledge for every later program that encounters the same class.

```text
agent solves Q-0042 once
        |
        v
adapter/transformation + proof recorded
        |
        v
future application encounters Q-0042
        |
        v
reuse before reinvention
```

This is application-level Snowball.

## A possible agent migration loop

A mature toolchain could expose a deterministic loop such as:

```text
discover Linux dependency
        |
        v
classify against Quirk Ledger
        |
        v
find existing QuirkM counterdesign/provider
        |
        +--> known transformation: apply it
        |
        +--> missing transformation: create bounded task
        |
        v
rebuild / relink / regenerate bindings
        |
        v
run native contract tests
        |
        v
run Linux-vs-QuirkM differential tests where meaningful
        |
        v
repair until the declared behavior matches
        |
        v
record reusable migration result
        |
        v
reduce application's remaining Linux compatibility debt
```

The desired unit of progress is not necessarily "one application ported."

A more valuable unit is often:

> **one entire class of future porting work eliminated.**

## Source, component, and binary cases are different

The proposal must not pretend every Linux application is equally transformable.

A reasonable expectation hierarchy is:

```text
source available
    strongest candidate for agent-assisted API/binding migration

Wasm/componentized software
    strong candidate because interfaces can be explicit and replaceable

dynamic Linux binary
    some boundaries may be redirected through shims/providers/relinking

static or unusual binary-only software
    may remain permanently on the Linux personality unless binary translation is justified
```

Therefore Linux fallback is a permanent feature, not evidence that migration failed.

The system wins if valuable software can run immediately and increasingly migrate toward cleaner native contracts where the cost is justified.

## Functional preservation, not textual conversion

A migration is not successful merely because calls named `open`, `poll`, or `ioctl` disappear from source.

The target is preservation of the application's required externally observable behavior under the cleaner QuirkM contract.

Where possible, use differential evidence:

```text
same test/input corpus
        |
        +--> Linux-personality implementation
        |
        +--> QuirkM-native implementation
        |
        v
compare the behavior the contract says must match
```

Do not demand equivalence for behavior that QuirkM intentionally rejects as a quirk.

Instead, state the semantic mapping explicitly:

```text
Linux behavior to preserve:
QuirkM behavior replacing it:
behavior intentionally not inherited:
application-visible invariant that must remain true:
```

This keeps "quirk-free" from becoming a vague rewrite slogan.

## Why this maps naturally to agentic development

There is a real structural resemblance between this proposal and current coding-agent workflows, but it should be stated narrowly.

Modern coding agents are commonly given bounded repository tasks, allowed to inspect and modify code, run tests and linters, and return reviewable changes. Agent products also increasingly support multiple isolated tasks or agents working concurrently.

QuirkM's proposed migration graph naturally supplies that kind of work:

```text
large end state
    "remove unnecessary Linux semantic dependence"

        broken into

small explicit tasks
    Q-0042
    Q-0071
    Q-0118
    ...

        each with

machine-readable context
bounded source locations
acceptance criteria
compatibility oracle
native counter-proof
regression suite
```

The resemblance is architectural, not prophetic.

QuirkM is not justified by claiming agents will inevitably solve arbitrary ports, nor by claiming this workflow is unique to QuirkM.

Its stronger claim is simply:

> **If software migration can be decomposed into explicit semantic deltas with deterministic evidence, it becomes a much better target for humans and coding agents than an undifferentiated port.**

## Fact, inference, aspiration, and nonclaim

To keep this proposal evidence-led, distinguish four categories.

### Fact

Current coding-agent systems already operate effectively around bounded tasks, repository context, code modification, test execution, reviewable diffs/commits, and in some products parallel isolated work.

### Inference

A machine-readable Quirk Ledger, explicit compatibility boundaries, narrow migration tasks, and deterministic differential tests are therefore likely to be a particularly agent-friendly way to organize QuirkM compatibility work.

This is a design inference, not yet a measured QuirkM result.

### Aspiration

A mature QuirkM toolchain may eventually let an agent inspect an application, enumerate its remaining Linux-semantic dependencies, automatically migrate known classes, open bounded tasks for unresolved classes, prove behavior, and steadily raise a measurable native-compatibility percentage.

Conceptually:

```text
$ quirkm inspect example-app

Linux runnable:                  yes
QuirkM-native coverage:          93.8%
Known automatic migrations:     12
Remaining quirk classes:        3
Unknown semantic dependencies:  0
```

and later:

```text
$ quirkm migrate example-app

known migrations applied:       12
new transformations proved:      1
Linux-vs-QuirkM tests:        PASS
remaining Linux dependencies:    2
```

### Nonclaim

This proposal does **not** currently prove:

- arbitrary Linux applications can be automatically converted to QuirkM;
- binary-only software can always be de-quirked;
- semantic equivalence can always be inferred automatically;
- a finite Quirk Ledger will capture every future compatibility problem;
- agents can safely approve their own compatibility claims without independent evidence;
- QuirkM is uniquely or inevitably aligned with the future of software engineering.

Those are hypotheses to test, not achievements to advertise.

## A measurable agentic objective

If this program matures, track progress in terms such as:

```text
known Linux semantic dependencies
native replacements available
verified automatic migrations
agent-authored migrations accepted after proof
remaining compatibility-only dependencies
unknown/unclassified dependencies
applications with zero Linux dependency
average context required per migration
reused migrations vs newly invented migrations
```

The desired long-run curve is:

```text
new application encountered
        |
        v
more dependencies already classified
        |
        v
more transformations already proved
        |
        v
less novel work required
        |
        v
agents and humans solve an increasingly small remainder
```

That is the strongest form of the QuirkM/Snowball thesis: **compatibility work compounds because every solved semantic difference narrows the work required by the next port.**

---

# 15. Compatibility should be callable without contaminating Native

There are at least three legitimate ways a QuirkM application may need Linux behavior.

## A. Launch a Linux-personality process

Preferred for large existing programs.

```text
QuirkM app
   |
   +-- resources --> Linux process
   |
   <-- result/stream --+
```

## B. Use a Linux compatibility provider

Preferred when a Linux implementation can satisfy a clean QuirkM capability contract.

```text
QuirkM capability request
        |
        v
Linux-backed provider
        |
        v
Linux ABI internally
```

## C. Explicitly invoke a compatibility operation

Reserved for cases where the application genuinely needs Linux-specific semantics.

Conceptually:

```text
qm.compat.linux.*
```

This should be obvious in code and capability manifests.

A compatibility call should never masquerade as the normal native operation.

---

# 16. Why a generic flag is not enough

A tempting design is:

```text
operation(..., QUIRKY_LINUX_MODE)
```

QuirkM should resist making that the universal pattern.

One boolean cannot explain which historical semantics are being requested, and many interacting flags can recreate the same complexity the native API is trying to avoid.

Use flags/options when the choice is a genuine general policy:

```text
follow_symlinks
blocking/nonblocking
inherit/transfer
read/write rights
```

Use the explicit Linux compatibility namespace/personality when the behavior exists primarily because Linux software expects it.

This preserves a bright architectural line.

---

# 17. QuirkM errors

The native error model should not be forced to expose Linux errno as its fundamental vocabulary.

Conceptually:

```text
Morphic/QuirkM semantic error
        |
        +--> QuirkM typed/native result
        |
        +--> Linux errno adapter
        |
        +--> Wasm/component result
```

For example, a fundamental native distinction might be represented as a structured error or typed failure while the Linux adapter maps it to the closest required negative errno value.

Do not make `-EFOO` the shared internal truth merely because the first compatibility consumer is Linux.

---

# 18. QuirkM resources

The proposed resource direction is especially important to this design.

A mature native handle may eventually express:

```text
identity
type
generation
rights
ownership/lifetime
transferability
inheritable state
waitability
optional interface/capability discovery
```

Linux descriptors can map onto those resources without requiring native applications to inherit descriptor identity semantics.

Likewise, process IDs, sockets, timers, devices, shared memory, channels, and future hypervisor objects can reuse the same substrate where appropriate.

---

# 19. QuirkM process creation

The native process API should be designed around deliberate construction.

Conceptually:

```text
ProcessBuilder
    executable/component
    address-space policy
    arguments
    environment
    namespace/root resources
    inherited resources
    credentials/capabilities
    scheduling policy
    startup channels
```

Then:

```text
spawn(builder)
```

Linux `fork`, `clone`, `vfork`, `execve`, descriptor inheritance, and signal behavior remain compatibility mappings over the process substrate rather than defining the native process object.

---

# 20. QuirkM introspection

A native resource should eventually be discoverable through typed metadata rather than requiring arbitrary text parsing or implementation-specific probing.

Conceptually:

```text
inspect(resource)
interfaces(resource)
rights(resource)
owner(resource)
waitability(resource)
provider(resource)
contract(resource)
```

The platform should support both humans and agents asking:

```text
What is this?
What may I do with it?
What owns it?
Can I transfer it?
Can I wait on it?
What invalidates it?
What interface version does it implement?
What compatibility personality created it?
```

---

# 21. Native counterdesign must remain evidence-driven

QuirkM must not become a collection of clever alternatives invented without pressure.

For each counterdesign, require evidence of the problem being addressed.

Preferred evidence order:

```text
1. real Linux compatibility behavior encountered by Morphic
2. authoritative Linux ABI/API documentation
3. mature replacement/evolution inside Linux itself
4. repeated application/library pressure
5. cross-system convergence
6. carefully bounded original design reasoning
```

This keeps QuirkM practical rather than ideological.

---

# 22. Do not promise "zero quirks"

No nontrivial operating system can responsibly guarantee that it has no quirks, bugs, awkward interfaces, or future compatibility debt.

The defensible QuirkM promise is stronger in a different way:

> **Known Linux compatibility quirks are systematically cataloged, quarantined, tested, and prevented from becoming native defaults unless independently justified.**

And:

> **When QuirkM itself develops a bad native decision, it should receive the same treatment: document it, version it, provide a migration path, and avoid pretending it never happened.**

The project should be anti-accidental-complexity, not anti-history.

---

# 23. Proposed user-facing identity

A future concise description could be:

> **QuirkM is Morphic's native API and userspace: designed from the lessons of Linux compatibility, clean by default, machine-readable, capability-oriented, and able to invoke Linux-compatible software when the old semantics are actually needed.**

A more informal developer explanation might be:

> "If you need Linux, run the Linux side. If you need the capability without inheriting the baggage, use QuirkM."

That distinction should be visible in code, tooling, documentation, and proofs.

---

# 24. Proposed development policy

Beginning with the Linux syscall/resource era, every new compatibility feature should be evaluated through four questions:

```text
1. What fundamental capability does this reveal?

2. What part is specifically Linux compatibility behavior?

3. What should QuirkM native semantics look like if designed today?

4. Can both personalities reuse the same underlying Morphic mechanism?
```

Then classify the implementation:

```text
FUNDAMENTAL
    -> Morphic core

CLEAN NATIVE EXPOSURE
    -> QuirkM API

LINUX-SPECIFIC
    -> Linux compatibility quarantine

TOO EXPENSIVE TO ABSORB
    -> Linux process/provider or future hypervisor
```

---

# 25. Proposed near-term integration with Batch 25+

The current Batch 25A operation-boundary plan is a natural starting point.

Its architectural separation should become the first QuirkM prerequisite:

```text
Linux/RV64 ECALL
      |
      v
Linux adapter
      |
      v
Morphic semantic operation
      |
      v
executor
```

Then the next resource/FD work should explicitly separate:

```text
Morphic resource identity/lifetime
            |
      +-----+-----+
      |           |
      v           v
QuirkM handle   Linux fd
```

Each subsequent Linux capability can follow the same pattern.

This means QuirkM does not delay BusyBox/Alpine work.

It **harvests architecture from it**.

---

# 26. Long-term architecture

```text
                    SOFTWARE / AGENTS
                           |
          +----------------+----------------+
          |                |                |
          v                v                v
       QuirkM           Linux ABI         Wasm
       Native           personality       components
          |                |                |
          | clean          | exact          | portable
          | contracts      | compatibility  | contracts
          +----------------+----------------+
                           |
                           v
                MORPHIC SEMANTIC SUBSTRATE
                           |
          resources / memory / IPC / wait / process
                           |
                           v
                       ALPZ CORE
                           |
                           v
                        MACHINE

                         +

                   LINUX QUIRK LEDGER
                           |
         +-----------------+-----------------+
         |                 |                 |
         v                 v                 v
    compatibility      native          agent/design
      proofs        counter-proofs       knowledge
```

---

# 27. Success criteria

QuirkM should eventually be judged by measurable properties.

## Native cleanliness

- Known Linux quirks have explicit ledger entries.
- Native APIs do not inherit them accidentally.
- Native counterdesigns have tests.

## Compatibility strength

- Linux software can still obtain the Linux behavior where required.
- Quirk quarantine does not prevent real Linux ABI progress.

## Shared inheritance

- Linux and QuirkM reuse fundamental Morphic mechanisms.
- The same capability is not reimplemented independently merely to preserve architectural branding.

## Replaceability

- Linux-backed providers can later be replaced by native or Wasm providers behind stable contracts.
- Applications can migrate interface families independently rather than requiring all-or-nothing native rewrites.
- The compatibility personality remains a valid fallback when native migration is not economical or technically justified.

## Agent usability

- An agent can query why QuirkM differs from Linux and receive a compact, machine-readable answer.
- It can determine the compatibility escape hatch without source archaeology.
- It can enumerate an application's known Linux-semantic dependencies as bounded migration work.
- A solved migration class can be reused across later applications.
- Agent-authored migrations are accepted on evidence, not merely because the generated patch compiles.

## Complexity control

- Adding a Linux quirk does not automatically spend native API complexity.
- Adding a native improvement does not require breaking the Linux compatibility contract.

---

# 28. Core maxim

The proposal can be reduced to one rule:

> **Implement the capability once. Preserve Linux behavior where compatibility requires it. Expose a cleaner QuirkM contract where history does not. Never confuse the compatibility adapter with the architecture.**

And one compounding loop:

```text
Linux reveals pressure
        |
        v
Morphic extracts the fundamental mechanism
        |
        +--> Linux keeps compatibility
        |
        +--> QuirkM gets the clean design
        |
        +--> Wasm/native/agents inherit the mechanism
        |
        v
future work starts from a stronger base
```

The agentic migration extension adds a second compounding loop:

```text
application reveals Linux dependency
        |
        v
Quirk Ledger classifies it
        |
        +--> known migration reused
        |
        +--> unknown migration becomes one bounded task
        |
        v
proof turns the solution into reusable knowledge
        |
        v
future applications require less novel porting work
```

That is the intended role of QuirkM: not a rejection of Linux, but a native system built with the benefit of Linux's entire compatibility history available as design evidence, and structured so that humans and agents can progressively convert that evidence into reusable, verified migration knowledge.