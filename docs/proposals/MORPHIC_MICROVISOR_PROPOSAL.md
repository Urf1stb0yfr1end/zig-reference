# Morphic Microvisor

## Flagship proposal for `zig-reference`

> **One system. Many machines. No second implementation.**

## Executive thesis

`zig-reference` should not prove itself by building another object that Rust and C have already built many times.

A server, kernel, database, firmware image, or hypervisor written in Zig could be impressive, but the obvious reply would remain: Rust and C can build those too.

The flagship should instead demonstrate something more distinctly Zig-shaped:

> **A single systems architecture, described once, that becomes a freestanding RISC-V runtime, a hosted simulator, a deterministic replay harness, a fuzz target, and a C-callable integration library without splitting into separate semantic implementations.**

The working name is **Morphic Microvisor**.

“Morphic” means that the system changes form while preserving identity. The target changes. The allocation policy changes. Device adapters change. The surrounding environment changes. The system’s core contracts, state machines, parsers, scheduler rules, memory model, traces, diagnostics, and tests do not quietly become separate projects.

This is not a proposal to attack Rust or C. They are our competitors because they are excellent systems languages. Rust brings strong static safety and a mature modern ecosystem. C brings unmatched reach, ABI stability, institutional knowledge, and decades of hardware support.

The proposal is narrower and more defensible:

> **For a system whose defining challenge is preserving one body of truth across compile-time construction, hosted simulation, freestanding execution, cross-compilation, C integration, explicit resource bounds, and agent-driven maintenance, Zig is the best architectural fit.**

Other languages can reproduce the outputs.

The Morphic Microvisor should prove that Zig reaches them through a straighter, more unified, more inspectable path.

---

## 1. What the flagship must prove

The project succeeds only if it demonstrates all of the following together:

1. **One semantic core**
   
   Scheduling, parsing, state transitions, memory planning, resource ownership, diagnostics, and trace semantics are implemented once.

2. **Several concrete embodiments**
   
   The same core becomes a hosted Linux simulator, a freestanding RISC-V build, a deterministic replay build, and specialized test or fuzz builds.

3. **Static resource construction**
   
   A system description produces exact capacities, dependency order, required modules, memory budgets, and configuration errors before the target begins execution.

4. **No hidden allocation after sealing**
   
   Startup may use an explicitly selected boot allocator. After initialization, the system transitions into a sealed state in which every resource comes from declared bounded storage.

5. **Trace equivalence across forms**
   
   The hosted and freestanding versions execute the same deterministic scenario and produce equivalent normalized traces.

6. **Agent-legible construction**
   
   An agent can discover the required `zig-reference` modules, follow declared dependencies, generate only the missing integration code, and repair failures through stable diagnostics.

7. **Honest comparison**
   
   Rust and C versions or architectural counterexamples are treated seriously. Zig does not win by ignoring what its competitors do well.

The flagship is not successful merely because it boots.

It is successful when the architecture remains one thing while inhabiting several execution worlds.

---

## 2. The proposed system

The Morphic Microvisor is a deterministic, bounded RISC-V execution substrate assembled from `zig-reference` modules.

Its first complete form should include:

```text
RISC-V 64-bit freestanding target under QEMU
hosted Linux simulation target
fixed-capacity deterministic scheduler
explicit boot allocation followed by sealed operation
Sv39 address-space construction and verification
bounded object and handle management
ELF payload loading
UART-backed target diagnostics
normalized deterministic event tracing
host/target trace comparison
replay of a recorded execution
agent-readable contracts and repair paths
```

The first release does **not** need to boot a full Linux guest.

That would create enormous scope before the core thesis had been proved.

The project should advance through two identities:

### Stage A: morphic runtime

A small freestanding RISC-V supervisory runtime and hosted twin execute the same bounded workloads, memory plans, scheduler transitions, and trace schema.

### Stage B: true microvisor

After the morphic runtime is stable, add the RISC-V virtualization boundary, guest state, trap routing, virtual devices, and a small guest or payload.

The name describes the destination. The roadmap remains honest about the steps required to reach it.

---

## 3. The system description

The flagship should be configured through ordinary Zig values and types rather than an external schema language.

A conceptual configuration might look like this:

```zig
const system = System(.{
    .architecture = .riscv64,
    .execution_profile = .microvisor,

    .memory = .{
        .total_bytes = 4 * 1024 * 1024,
        .page_size = 4096,
        .boot_allocator = .bump,
        .allocation_after_seal = false,
    },

    .scheduler = .{
        .maximum_tasks = 64,
        .maximum_priorities = 8,
        .policy = .deterministic_priority,
    },

    .resources = .{
        .maximum_handles = 512,
        .maximum_initialization_nodes = 64,
        .trace_events = 4096,
    },

    .devices = .{
        Uart16550,
        VirtualTimer,
    },

    .tracing = .deterministic,
});
```

Compile-time construction should derive concrete artifacts such as:

```text
selected module graph
concrete storage types
exact capacities
initialization dependency order
memory-region plan
page-table requirements
scheduler queues
device registry
command registry
trace event union
compile-time incompatibility diagnostics
build targets
validation obligations
```

The result must remain ordinary inspectable Zig code and concrete types.

The project must not hide its architecture behind an unreadable private generator.

---

## 4. Why Zig is the best fit

No single Zig feature makes this flagship unique.

The advantage is the concentration of several features in one language and toolchain.

### 4.1 Compile-time construction uses the language itself

Zig’s `comptime` model allows ordinary functions to execute during compilation and allows types to be manipulated as values without runtime overhead. Zig also evaluates compile-time code with awareness of the target architecture.

For this project, that means the same language can express:

```text
system configuration
resource arithmetic
type construction
dependency validation
capability selection
compile-time rejection
runtime implementation
unit tests
build orchestration
```

There is no separate macro language to learn and no requirement that the important architectural layer operate primarily on token streams.

The design objective is not to perform clever code generation.

It is to make the system’s structure directly executable and inspectable.

### 4.2 No hidden allocation supports a real sealing boundary

Zig’s standard style makes allocation an explicit dependency. The language and standard library do not silently provide a universal ambient allocator for ordinary operations.

That fits the flagship’s strongest runtime contract:

```text
before seal:
    explicitly selected boot allocation is permitted

after seal:
    every allocation comes from declared fixed storage
    every exhaustion path is explicit
    every capacity is queryable
```

The hosted simulator can use the same bounded allocators as the freestanding target. A separate testing build can substitute a checking allocator without changing the semantic core.

The allocation policy becomes part of the system description, not a rumor hidden in implementation details.

### 4.3 Hosted and freestanding forms can share direct code

The goal is not merely to use the same language on host and target.

The goal is to share the same implementations wherever the environment allows:

```text
same bounded containers
same parsers
same state machines
same page-table logic
same scheduler rules
same resource planner
same trace encoding
same diagnostics
same repair fixtures
```

Only the irreducibly environmental edge should change:

```text
clock source
UART transport
interrupt entry
physical memory provider
QEMU or host execution adapter
```

Zig does not require a separate macro ecosystem or a separate language mode to describe this relationship. Target-specific decisions can remain direct compile-time branches and concrete type selection.

### 4.4 Cross-compilation is part of the normal toolchain

Zig treats cross-compilation as an ordinary compiler operation. The same installation can target hosted and freestanding systems and can also act as a C or C++ compiler for cross-target dependencies.

This matters because the flagship must produce several artifacts repeatedly:

```text
host simulator
RISC-V freestanding image
unit-test build
fuzz build
replay utility
C ABI library
```

The project should be able to express those outputs in one `build.zig` dependency graph with cached, independently runnable steps.

Cross-target construction must feel like part of the project rather than a special expedition.

### 4.5 The build system is programmable but remains part of Zig

Zig’s build system models work as a directed acyclic graph of steps. It can compile Zig, C, and C++ sources; expose build configuration as compile-time values; run tests; check outputs; and define custom validation tasks.

This is especially well matched to `zig-reference`, which already treats the build graph as executable repository knowledge.

The flagship should expose commands resembling:

```sh
zig build plan
zig build simulator
zig build run-simulator
zig build riscv-image
zig build run-qemu
zig build replay
zig build compare-traces
zig build fuzz
zig build verify-morphic
```

One command should eventually prove the complete thesis:

```sh
zig build verify-morphic
```

That command should build both forms, execute the deterministic scenario, normalize their traces, compare the results, validate resource plans, and run all applicable repository checks.

### 4.6 C is a boundary Zig can absorb without surrendering the architecture

Zig can import C headers, export C-compatible APIs, compile C and C++ sources, and act as the C/C++ compiler within its build graph.

That gives the project a practical path to hardware support:

```text
use a proven C component when necessary
wrap its boundary in an explicit Zig contract
compile it through the same build
replace it gradually only when replacement is worthwhile
```

C code does not need to become a separate build civilization.

The Morphic Microvisor can remain a Zig architecture while making respectful use of the enormous C ecosystem.

### 4.7 The absence of a preprocessor or macro system improves agent legibility

Zig deliberately avoids a preprocessor and language-level macro system.

That does not eliminate complexity. `comptime` can itself be abused.

But it gives this project an important opportunity: the structure an agent reads can remain mostly ordinary syntax, ordinary functions, ordinary values, and ordinary types.

For an AI-oriented systems corpus, this matters.

An agent should not need to reconstruct a large token transformation pipeline before it can answer:

```text
Which type exists in this configuration?
Why was this device selected?
Where was this capacity derived?
Which allocator owns this memory?
What target distinction changes this implementation?
```

This is a hypothesis to benchmark, not a victory to assume. The flagship must measure whether agents actually inspect fewer files, use fewer tokens, and make fewer incorrect changes.

---

## 5. Rust: a serious competitor

Rust can build every major artifact proposed here.

Rust supports bare-metal development through `no_std`, provides strong static safety, offers mature package management, and has proven itself in kernels, firmware, virtualization, networking, and safety-sensitive systems.

Rust is likely to beat Zig in several areas:

```text
compile-time memory-safety enforcement
ecosystem breadth
availability of mature libraries
production deployment history
number of experienced engineers
established security practice
```

The Morphic Microvisor should never pretend otherwise.

### Where Rust is less naturally aligned with this particular flagship

A sophisticated Rust implementation may distribute the architecture across:

```text
no_std and hosted crate boundaries
feature combinations
traits and target adapters
procedural-macro crates
Cargo build scripts
code generated into OUT_DIR
external C compilation or binding tools
host-versus-target configuration channels
```

None of those mechanisms is inherently bad.

Rust procedural macros are powerful, but they operate on token streams, must be defined in `proc-macro` crates, and cannot be used from the same crate in which they are defined. Cargo build scripts are separately compiled host programs executed before the package build. Rust’s own documentation warns that build scripts must distinguish host configuration from target configuration during cross-compilation.

A disciplined Rust team can manage this architecture well.

The Zig wager is that the equivalent system can preserve more meaning in one directly readable body of source:

```text
fewer project layers
fewer generated semantic intermediates
fewer crate boundaries required solely for metaprogramming
more direct target-aware compile-time construction
one integrated path for Zig and C compilation
```

### Where Rust may still win

If the Zig implementation has more memory-safety defects, harder upgrades, unreadable `comptime`, or inferior tooling, architectural neatness will not rescue it.

Rust should be treated as the strongest comparison implementation, not a straw man.

The flagship claim is therefore not:

> Zig is safer than Rust.

It is:

> **Zig may preserve one cross-form system with less architectural fragmentation while retaining explicit low-level control and competitive runtime behavior.**

That claim must be tested.

---

## 6. C: the foundational competitor

C is not an obsolete opponent. It remains the language of operating systems, firmware, boot code, hypervisors, drivers, embedded platforms, ABIs, and vendor SDKs.

C is likely to beat Zig in:

```text
hardware reach
compiler availability
ABI universality
existing driver volume
institutional knowledge
tiny-platform support
long-term source stability
```

A C implementation can reproduce the Morphic Microvisor by combining:

```text
preprocessor configuration
static tables
generated headers
custom build files
external code generators
platform abstraction layers
simulator shims
manual resource planning
separate validation utilities
```

Capable C teams have built systems of far greater complexity.

### Where Zig is better suited to this flagship

The question is not whether C can produce the machine.

The question is where the system’s truth lives.

In a traditional C architecture, meaning is often distributed among:

```text
headers
preprocessor branches
linker scripts
build-system conditionals
generated code
configuration files
external generators
manual conventions
```

Zig can keep more of that meaning in typed, executable source while still producing C-compatible boundaries and using C components directly.

Compared with C, the expected Zig advantage is:

```text
compile-time type construction rather than primarily textual substitution
explicit error sets rather than convention-only status propagation
slices carrying length with addresses
precise integer and alignment types
integrated tests
integrated cross-compilation
integrated C compilation
one language for build logic and runtime logic
more direct machine-readable contracts
```

C remains the standard of practical reach.

Zig must demonstrate that it can retain that low-level directness while reducing the external scaffolding needed to keep several forms of one system synchronized.

---

## 7. Comparative scorecard

The proposal should be judged by a public scorecard rather than by rhetoric.

| Dimension | Zig expectation | Rust expectation | C expectation |
|---|---|---|---|
| Static memory safety | Weaker than Rust; stronger diagnostics than raw C in safe modes | Strongest | Primarily manual and tool-assisted |
| Compile-time system construction | Direct functions, values, types, and target-aware `comptime` | Const evaluation, generics, traits, macros, and build scripts | Preprocessor, compiler extensions, and external generators |
| Allocation visibility | Explicit allocator and bounded-storage design fit naturally | Strong in disciplined `no_std`; may involve `alloc` and allocator configuration | Fully controllable but convention-heavy |
| Hosted/freestanding shared core | Expected to be direct and broad | Fully possible, often organized around `no_std` boundaries | Fully possible, often organized around platform macros and adapters |
| Cross-compilation | Integrated in the standard toolchain | Strong target support; may require target components and linker/tool configuration | Depends heavily on compiler and target toolchain |
| C integration | First-class compilation and header import | Strong FFI, generally through C ABI and external C build/binding steps | Native |
| Build coherence | One Zig DAG for artifacts, tests, C code, and validation | Cargo plus build scripts and ecosystem tools | Usually an external build system chosen by the project |
| Ecosystem breadth | Youngest | Large and modern | Largest historical systems ecosystem |
| Agent legibility | Central hypothesis of this project | Must be measured fairly | Must be measured fairly |
| Runtime performance | Expected to be competitive | Expected to be competitive | Expected to be competitive |
| Long-term maturity | Youngest and highest migration risk | Mature | Most mature |

Zig does not need to win every row.

For this flagship, the weighted priorities are:

```text
25% preservation of shared truth
20% cross-form reuse
15% explicit resource and allocation behavior
15% build and cross-target coherence
15% agent retrieval and modification cost
10% runtime performance and footprint
```

Rust may win the safety category.

C may win reach and maturity.

Zig wins the flagship overall only if the implemented project demonstrates a decisive advantage in shared truth, coherence, and agent comprehensibility without becoming materially worse in correctness or runtime behavior.

---

## 8. The static resource plan

The signature feature of the Morphic Microvisor should be a complete resource plan generated from the system description.

A successful build should be able to emit something like:

```text
MORPHIC SYSTEM PLAN

Architecture:                  riscv64
Execution profile:             supervisory-runtime
Maximum tasks:                 64
Maximum handles:               512
Maximum initialization nodes:  64
Trace capacity:                4096 events
Page size:                     4096 bytes
Maximum page-table pages:      37
Post-seal allocation:          forbidden

Static object storage:         196,608 bytes
Scheduler storage:              32,768 bytes
Trace storage:                 262,144 bytes
Page-table reserve:            151,552 bytes
Device state:                   16,384 bytes
Boot arena:                    524,288 bytes

Required memory:             1,183,744 bytes
Declared memory:             4,194,304 bytes
Reserve:                     3,010,560 bytes

Dependency graph:              acyclic
Capacity constraints:          satisfied
Required modules:              present
Target adapters:               present
Validation obligations:        satisfied
```

This plan must not be decorative output.

The concrete storage types used by the simulator and target must be derived from the same capacities.

An impossible configuration should fail during compilation or validation with a stable diagnostic and a repair path.

Examples:

```text
MORPHIC-PLAN-MEMORY-EXCEEDED
MORPHIC-PLAN-INITIALIZATION-CYCLE
MORPHIC-PLAN-MISSING-DEVICE-ADAPTER
MORPHIC-PLAN-POST-SEAL-ALLOCATOR
MORPHIC-PLAN-TRACE-CAPACITY
```

Each diagnostic should point to:

```text
violated contract
calculation or dependency edge
known failing fixture
repair example
focused validation command
```

---

## 9. Architecture

The flagship should be separated into four conceptual layers.

### 9.1 Reference foundations

Existing and future `zig-reference` modules provide mechanisms such as:

```text
bounded vectors and queues
fixed object pools
generational handles
fixed free lists
bump allocation
checked ranges and addresses
physical memory region normalization
physical page-frame allocation
ELF64 parsing
bounded topological ordering
state machines
Sv39 entry representation
Sv39 indexing
page-table ownership
page-table walking
invalidation planning
page-table construction and rollback
```

These modules remain independently useful. They do not become private implementation details of the flagship.

### 9.2 Morphic system core

The system core contains environment-independent semantics:

```text
resource planning
initialization graph
scheduler state
object lifecycle
payload loading policy
virtual address-space policy
device-independent event model
trace schema
replay rules
diagnostics
```

This is the shared heart of every embodiment.

### 9.3 Environment adapters

Adapters contain only irreducibly environmental behavior:

```text
host clock versus RISC-V timer
host output versus UART
host memory mapping versus physical frame access
simulated interrupt delivery versus trap entry
host file payload versus embedded payload image
```

Adapters must not reimplement core policy.

### 9.4 Build and evidence layer

The build graph creates artifacts and evidence:

```text
system plan
simulator executable
freestanding image
QEMU run step
trace files
trace comparison report
fuzz target
C ABI library
validation records
agent indexes
```

Every generated artifact must be deterministic or explicitly record why it cannot be.

---

## 10. The no-second-implementation rule

This rule defines the entire project:

> **The hosted simulator may replace hardware effects, but it may not replace system semantics.**

The simulator may provide:

```text
simulated memory pages
simulated timer ticks
simulated UART transport
simulated interrupt injection
host-backed payload input
```

It may not introduce a separate:

```text
scheduler
parser
address-space policy
resource planner
state machine
trace interpretation
initialization algorithm
```

A contribution that duplicates system semantics must justify why the existing core cannot be shared.

Shared source alone is not enough. The project must also prove that the same code paths are exercised.

Coverage and trace reports should identify host-only, target-only, and genuinely shared paths.

---

## 11. The killer demonstration

The public demonstration should be understandable in minutes.

### Step 1: describe one machine

A single Zig configuration declares memory, task limits, devices, tracing, and allocation policy.

### Step 2: print the plan

```sh
zig build plan
```

The build prints the exact resource budget, dependency order, selected modules, and rejected capabilities.

### Step 3: run the hosted form

```sh
zig build run-simulator
```

The simulator loads a deterministic ELF payload, initializes the same scheduler and address-space plan used by the target, executes a bounded workload, and emits a normalized trace.

### Step 4: run the freestanding form

```sh
zig build run-qemu
```

The RISC-V image performs the same scenario under QEMU and emits the same normalized event identities.

### Step 5: compare

```sh
zig build compare-traces
```

The traces match after removing explicitly declared transport or timing noise.

### Step 6: introduce one fault

Examples:

```text
an initialization dependency cycle
an undersized trace buffer
an invalid page-table transition
a stale object handle
a post-seal allocation attempt
```

### Step 7: observe one identity everywhere

The same diagnostic appears through:

```text
contract validation
hosted negative test
simulator execution
freestanding debug execution
agent query
repair fixture
```

### Step 8: repair once

An agent follows the diagnostic to the canonical repair, changes the shared source or configuration once, and both embodiments pass.

That is the flagship moment:

```text
same specification
same core
same workload
same state transitions
same failure identity
same repair
different execution worlds
```

---

## 12. Existing foundations and missing work

The current repository already contains unusually relevant foundations.

### Existing high-value modules

```text
fixed-capacity-object-pool
fixed-free-list
fixed-bump-allocator
fixed-capacity-priority-queue
fixed-capacity-topological-sort
physical-memory-region-set
physical-page-frame-allocator
elf64-file-header-parser
elf64-program-header-parser
riscv-sv39-page-table-entry
riscv-sv39-virtual-address-indexing
riscv-page-table-page-owner
riscv-sv39-page-table-walker
riscv-sfence-vma-invalidation
riscv-sv39-page-table-builder
```

The existing `plan-bounded-initialization` and `construct-and-verify-sv39-address-space` recipes are direct precursors.

### Major missing foundations

The exact module list should be refined through the normal checklist process, but likely requirements include:

```text
RISC-V privilege and CSR types
trap-frame representation
trap dispatch
SBI interface
UART 16550 driver boundary
RISC-V timer boundary
interrupt-controller boundary
bounded deterministic scheduler
system resource-plan arithmetic
post-seal allocation guard
deterministic event trace
trace normalization and comparison
ELF segment installation policy
supervisory runtime entry and startup
QEMU run integration
host memory and interrupt adapters
later: RISC-V H-extension state
later: guest context switching
later: virtual interrupt injection
later: minimal VirtIO device boundary
```

Every new foundation should remain independently reusable and agent-readable.

The flagship must consume `zig-reference`; it must not turn `zig-reference` into one giant application repository.

---

## 13. Roadmap

### Phase 0: lock the agent-readable pilot

Before flagship work accelerates:

```text
complete the substance audit
freeze the initial agent-contract shape
tag the pilot standard
prove deterministic indexes
retain honest evidence classifications
```

### Phase 1: resource-plan kernel

Build a hosted-only morphic core that can:

```text
consume a Zig system description
resolve bounded capacities
construct initialization order
calculate memory requirements
reject impossible configurations
emit a deterministic textual plan
```

No QEMU work is required yet.

### Phase 2: hosted deterministic runtime

Add:

```text
bounded scheduler
object lifecycle
trace events
payload-state machine
replay harness
negative diagnostics
```

The hosted form becomes the fastest testing ground.

### Phase 3: freestanding RISC-V twin

Add:

```text
startup
SBI or machine boundary
UART
physical memory provider
Sv39 plan installation
trap and timer boundaries
QEMU execution
```

The hosted and target forms must share the morphic core.

### Phase 4: trace equivalence

Define a normalized event model and prove that the same deterministic scenario produces equivalent traces in hosted and QEMU execution.

This is the first major public milestone.

### Phase 5: microvisor boundary

Add the RISC-V virtualization-specific components required for an actual guest boundary.

Do not begin this phase until the no-second-implementation rule and trace comparison are already credible.

### Phase 6: additional embodiments

Only after the central thesis is proved:

```text
fuzz target
C ABI library
WebAssembly trace inspector
additional RISC-V board profile
x86_64 or AArch64 experiment
```

Breadth is a reward for architectural success, not a substitute for it.

---

## 14. Benchmark plan

The comparison must test engineering cost, not merely runtime speed.

### 14.1 Artifact comparison

For Zig, Rust, and C, record:

```text
source languages used
build/configuration languages used
number of generators
number of generated semantic files
number of target-specific implementation files
number of duplicated state models
number of commands required from a clean clone
external toolchain dependencies
```

### 14.2 Agent comparison

Give comparable agents tasks such as:

```text
increase maximum tasks without violating memory budget
add a bounded device type
repair an initialization cycle
find and fix a stale-handle misuse
add one trace event across host and target
replace the boot allocator policy
```

Measure:

```text
tokens consumed
files inspected
commands run
incorrect architectural choices
repair attempts
human interventions
whether both forms remain correct
```

### 14.3 Runtime comparison

Measure:

```text
binary size
static memory footprint
boot time
scheduler operation cost
trace overhead
page-table construction cost
host simulation throughput
```

### 14.4 Drift comparison

Introduce one semantic change and count how many places must be updated in each implementation.

The decisive question is:

> How many independent representations of the same truth must remain synchronized?

---

## 15. Success criteria

The first flagship release should not be declared complete until it satisfies measurable thresholds.

### Required

```text
one system description produces host and RISC-V builds
host and target share the core scheduler and trace schema
no hidden allocation after the seal transition
resource plan is exact and machine-readable
impossible plans fail before target execution
host and QEMU traces match for the canonical scenario
all reused reference modules pass their focused tests
full repository validation passes
agent query locates every flagship dependency and diagnostic
```

### Strong targets

```text
at least 90% of semantic-core lines shared across host and target
no duplicated parser, scheduler, planner, or state-machine implementation
one top-level command verifies the complete morphic property
one clean-clone setup document
one structured benchmark report against serious Rust and C designs
```

### Not required for v1

```text
full Linux guest
production security certification
multi-core scheduling
complete VirtIO ecosystem
real hardware support
formal proof
network stack
GUI trace viewer
```

---

## 16. Failure conditions

The project should be considered architecturally unsuccessful if any of the following becomes normal:

```text
the simulator reimplements target semantics
comptime becomes an unreadable private language
generated code becomes the only understandable source
resource plans are estimates rather than enforced inputs
host and target require unrelated build systems
target-specific branches spread throughout the semantic core
diagnostics claim guarantees that tests do not prove
an agent must inspect the entire repository for a routine change
Zig version upgrades repeatedly require near-rewrites
benchmark comparisons use deliberately weak Rust or C designs
```

Booting is not enough.

Performance is not enough.

A beautiful demo is not enough.

The architecture must preserve shared truth under real change.

---

## 17. Risks and mitigations

### Risk: `comptime` becomes macro soup

**Mitigation:** Keep compile-time functions small, typed, testable, and named after engineering concepts. Generate compact textual plans. Require direct diagnostics for impossible configurations. Reject token-style cleverness.

### Risk: hosted and target behavior drift

**Mitigation:** Share source, compare normalized traces, require common fixtures, and report coverage of shared versus adapter-only paths.

### Risk: Zig version instability

**Mitigation:** Continue static `port.js` contracts, pin demonstrated releases, port lower dependencies first, and treat migration evidence as a first-class artifact.

### Risk: Rust wins the real comparison

**Mitigation:** Accept the result. The benchmark is valuable even if it reveals where Zig or `zig-reference` needs improvement. Do not adjust scoring after seeing results.

### Risk: C remains simpler

**Mitigation:** Compare complete systems, including generators, build scripts, configuration layers, simulator maintenance, and agent changes—not only the target binary.

### Risk: safety defects overshadow architectural gains

**Mitigation:** Use safety-checked builds, bounded APIs, explicit unsafe boundaries, negative fixtures, sanitizers where applicable, fuzzing, differential tests, and honest evidence.

### Risk: flagship swallows the reference repository

**Mitigation:** Every reusable mechanism remains a standalone module. The flagship contains orchestration and policy. Module additions must remain useful outside the flagship.

### Risk: scope expands into an operating system

**Mitigation:** Preserve staged acceptance criteria. No new device family, guest type, architecture, or UI is admitted before the current phase proves its thesis.

---

## 18. What Zig must demonstrably do better

The proposal is strongest when “better” is defined precisely.

Zig must demonstrate that it is better **for this project** in these ways:

### Better preservation of shared truth

One scheduler rule, one memory plan, one trace identity, one parser, one repair.

### Better architectural locality

A reader should find system construction in Zig source rather than reconstructing it from several languages and generated layers.

### Better explicit resource behavior

Every allocation phase, capacity, exhaustion path, and ownership boundary should be visible and queryable.

### Better cross-target coherence

Hosted and freestanding outputs should emerge from one build graph and one module graph.

### Better integration with C without capitulation to C architecture

The project should consume C where useful while preserving Zig contracts and build ownership.

### Better agent economics

Agents should use fewer tokens, open fewer files, make fewer wrong selections, and repair failures through fewer attempts.

### Competitive runtime results

The architecture must not purchase elegance with unacceptable footprint or performance.

That is the complete wager.

Not “Zig can do things no other language can possibly do.”

Rather:

> **Zig combines the required abilities so directly that reproducing the complete development model elsewhere should require more layers, more duplication, or more agent effort.**

---

## 19. Relationship to `zig-reference`

The Morphic Microvisor is the flagship because it expresses the repository’s philosophy at system scale.

`zig-reference` says:

```text
solve recurring mechanisms once
make their contracts explicit
preserve dependency knowledge
record known failures
record canonical repairs
validate continuously
reuse them in higher layers
```

The Morphic Microvisor adds:

```text
compose those foundations into one real system
let that system inhabit several execution environments
prove that one fault keeps one identity across those forms
let an agent repair the shared cause rather than patching several symptoms
```

The flagship therefore does not replace the module corpus.

It demonstrates why the corpus exists.

A future agent receiving a substantial systems request should be able to conclude:

```text
most mechanisms already exist
their contracts are queryable
their dependencies are known
their tests are runnable
the missing work is architecture and policy
```

Then it generates only what is genuinely new.

---

## 20. Final position

Rust can build the target.

C can build the target.

Both deserve serious respect.

Rust may provide stronger static safety. C may provide broader hardware reach. Either may outperform Zig in particular measurements.

The Morphic Microvisor is nevertheless the right flagship because the real product is not one binary.

The product is a coherent family of binaries, simulations, tests, traces, contracts, diagnostics, and repairs derived from one body of systems knowledge.

Zig is unusually well suited to that goal because it brings together:

```text
direct compile-time execution
first-class type manipulation
explicit allocation
low-level representations
hosted and freestanding targets
integrated cross-compilation
programmable build DAGs
C and C++ compilation
C header interoperability
ordinary readable syntax without a preprocessor or macro system
```

No competitor is incapable of reproducing the destination.

The flagship must prove that Zig takes the straighter road, carries less architectural baggage, preserves more shared truth, and leaves behind a system that human engineers and AI agents can understand without excavating several parallel worlds.

That is a worthwhile, difficult, testable ambition.

> **One system. Many machines. No second implementation.**

---

## Official technical references

- [Zig language and toolchain overview](https://ziglang.org/)
- [Zig language documentation](https://ziglang.org/documentation/master/)
- [Zig build system documentation](https://ziglang.org/learn/build-system/)
- [Rust procedural macros reference](https://doc.rust-lang.org/stable/reference/procedural-macros.html)
- [Cargo build scripts reference](https://doc.rust-lang.org/stable/cargo/reference/build-scripts.html)
- [The Embedded Rust Book: `no_std`](https://doc.rust-lang.org/stable/embedded-book/intro/no-std.html)
- [The Embedded Rust Book: C interoperability](https://doc.rust-lang.org/stable/embedded-book/interoperability/c-with-rust.html)
- [ISO/IEC JTC1/SC22/WG14, the C language working group](https://open-std.org/jtc1/sc22/wg14/)

## Implemented planning foundation

`projects/50-bounded-system-resource-plan` and `recipes/plan-morphic-runtime` now provide the hosted-only deterministic resource-planning slice described by this proposal. They reuse bounded values, checked casts, alignment helpers, fixed bump layout, and bounded deterministic topological ordering. They do **not** implement the Morphic Microvisor, a scheduler, tracing, RISC-V startup, traps, devices, or post-seal enforcement. The remaining hosted runtime must supply those mechanisms and apply the returned policy.
