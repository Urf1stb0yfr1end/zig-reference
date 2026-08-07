# Full-Stack Agentic Engineering Roadmap

> **Aim:** make `zig-reference` the foundation from which coding agents can build almost any class of software as directly, correctly, and efficiently as possible.

`zig-reference` began as a systems-programming reference. The long-range goal is larger: create a cumulative engineering corpus whose components, contracts, diagnostics, recipes, and validation rules let an agent move from hardware-adjacent code all the way to complete applications without repeatedly rediscovering solved knowledge.

This roadmap is aspirational. It does not claim that every domain is already covered, that one language is universally best, or that all software can be reduced to a fixed recipe. The objective is to make the solved parts of software engineering maximally reusable so that future humans and agents spend their effort only on genuinely new work.

The governing principles remain:

- **Solved once. Documented completely. Reused forever.**
- **Write truth once. Derive every view. Verify continuously.**
- Prefer canonical components over duplicated implementations.
- Prefer machine-readable contracts over repository archaeology.
- Prefer exact validation and repair paths over ambiguous documentation.
- Prefer cross-domain reuse over isolated demonstrations.
- Optimize for **Cost of Correct Use**, **Discovery Compression Ratio**, **One-Shot Integration Rate**, and other agentic metrics defined by the project.

---

## 1. The destination

The intended endpoint is a software corpus that can support work across essentially the full computing stack:

```text
Hardware
  ↓
Hypervisor / virtualization
  ↓
Operating system / Linux guest environment
  ↓
Native runtimes and systems libraries
  ↓
Reusable application cores
  ↓
WebAssembly portability boundary
  ↓
Browser and frontend applications
  ↓
Backend and cloud services
  ↓
Distributed and networked applications
```

A coding agent should eventually be able to describe the capabilities a system needs and let the corpus answer:

- which canonical modules already solve each requirement;
- which implementation language is appropriate for each boundary;
- what dependencies are required;
- what is owned, borrowed, allocated, or invalidated;
- what environments are supported;
- what diagnostics and repair paths exist;
- what exact commands prove the integration still works;
- what genuinely new code remains to be written.

The ideal interaction is capability-first, not language-first.

---

## 2. Phase One: Zig systems foundation

The first layer remains `zig-reference` itself.

Its job is to accumulate small, definitive systems components with strong contracts and high reuse value:

- bounded containers;
- allocators;
- handles and registries;
- parsers and binary codecs;
- memory maps;
- page tables;
- state machines;
- scheduling foundations;
- tracing;
- executable loading;
- device abstractions;
- concurrency foundations;
- networking primitives;
- storage primitives;
- runtime infrastructure.

The goal is not maximum module count. The goal is maximum future leverage per solved module.

At sufficient scale, `zig-reference` should let agents assemble large systems mostly by composition rather than reimplementation.

---

## 3. Phase Two: Hyper-Zig

Hyper-Zig is the systems proof that the module corpus can compose upward into serious virtualization infrastructure.

The long-range path includes:

- architectural initialization;
- memory ownership;
- page-frame allocation;
- host translation;
- guest translation;
- trap handling;
- vCPU state;
- interrupts and timers;
- SBI or equivalent platform interfaces;
- device discovery;
- UART;
- VirtIO;
- guest loading;
- guest execution;
- multi-vCPU support;
- deterministic trace and replay;
- system-level validation.

Hyper-Zig is not merely a product. It is a stress test for the repository's dependency graph, contracts, diagnostics, recipes, and agent-readable structure.

A successful hypervisor demonstrates that many small canonical pieces can become one large machine without discarding the information that made the pieces understandable.

---

## 4. Phase Three: Alpine Linux guest capability

Booting Alpine is a major integration milestone because it proves that the stack can host a real operating-system environment rather than only synthetic payloads.

The target progression is approximately:

```text
QEMU boot
→ Linux kernel execution
→ serial console
→ Alpine userspace
→ shell
→ storage
→ networking
→ SSH
→ reproducible guest lifecycle
```

Alpine is valuable because it gives the project a practical Linux environment above the low-level Zig infrastructure while keeping the virtualization work honest.

The project should preserve the distinction between:

- reusable low-level foundations;
- hypervisor policy;
- Linux-specific integration;
- Alpine-specific integration.

The reusable layers should remain broadly useful beyond Alpine.

---

## 5. Phase Four: Morphic

Morphic is the flagship architecture for proving that one semantic system can inhabit several execution environments without becoming several drifting implementations.

The core principle is:

> **One system. Many machines. No second implementation.**

The same canonical logic should be reusable as appropriate across:

- freestanding execution;
- hosted simulation;
- deterministic replay;
- fuzzing;
- testing;
- native tools;
- eventual browser-facing analysis.

Morphic should make explicit use of Zig's strengths:

- compile-time specialization;
- explicit allocation;
- precise data representation;
- freestanding and hosted targets;
- straightforward cross-compilation;
- C interoperability;
- one build graph capable of producing several embodiments of the same system.

The flagship win is not that another language is incapable of reproducing an output. The win is preserving more shared truth with fewer duplicated models and less architectural machinery.

---

## 6. Phase Five: Zig to WebAssembly

WebAssembly is the first major crossing from systems code into universal application delivery.

It should be treated as a portability boundary, not as a replacement language.

High-value Zig components should be able to expose stable WebAssembly interfaces where appropriate, including:

- parsers;
- codecs;
- compression;
- image processing;
- search algorithms;
- geometry;
- simulation;
- binary file formats;
- document engines;
- cryptographic primitives;
- deterministic state machines;
- game logic;
- audio processing;
- data transformation.

The objective is simple:

> Do not rewrite a correct Zig implementation in JavaScript merely because the user interface lives in a browser.

Where the same semantic core belongs in native software and in the browser, compile the canonical implementation to WebAssembly and place a thin, explicit application boundary around it.

This extends the Morphic idea upward into application development.

---

## 7. Phase Six: TypeScript web reference

After the Zig/Wasm bridge is mature, the next language corpus should be TypeScript.

TypeScript owns the browser and application surfaces that Zig should not attempt to replace directly:

- DOM interaction;
- browser events;
- forms;
- accessibility;
- networking APIs;
- WebSocket clients;
- WebRTC;
- Canvas;
- WebGL/WebGPU integration;
- Web Workers;
- Service Workers;
- IndexedDB;
- browser storage;
- frontend state management;
- routing;
- UI framework integration;
- application shell behavior.

The TypeScript corpus should inherit the same agentic standards established by `zig-reference`:

```text
identity
capabilities
use_when
do_not_use_when
dependencies
effects
ownership / lifecycle
failure modes
diagnostics
repair paths
examples
recipes
validation
```

The purpose is not to recreate npm.

The purpose is to identify and preserve canonical, high-leverage solutions for recurring application problems so agents do not repeatedly choose among dozens of superficially similar approaches.

The target experience should remain:

```text
requirement
→ canonical capability
→ compact contract
→ exact integration
→ focused validation
```

---

## 8. Phase Seven: Go service and cloud reference

Go should follow TypeScript as the service-oriented companion language.

Its natural responsibility is the networked and operational application layer:

- HTTP services;
- API servers;
- reverse proxies;
- gateways;
- background workers;
- concurrent I/O;
- distributed-service components;
- networking daemons;
- observability tools;
- cloud utilities;
- infrastructure agents;
- container-oriented services;
- orchestration utilities;
- data ingestion services.

Go is attractive here because its language and tooling are intentionally regular and relatively small, which aligns strongly with agentic goals.

As with TypeScript, the project should not attempt to mirror the entire public package ecosystem.

It should preserve the best canonical patterns, components, contracts, and recipes needed to build reliable services with low discovery cost.

---

## 9. Phase Eight: cross-language recipes

This is the phase where the project becomes genuinely full-stack.

The agent should no longer need to think primarily in terms of repositories or languages.

It should ask for capabilities.

Example:

```text
Need: collaborative browser CAD system

Geometry engine
→ Zig canonical implementation

Browser compute
→ same Zig implementation via WebAssembly

Frontend shell
→ TypeScript canonical modules

Realtime collaboration
→ TypeScript client + Go server recipe

Backend API
→ Go canonical modules

Native CLI
→ same Zig parser and geometry engine

Project format
→ one canonical Zig codec shared by native and Wasm forms
```

The cross-language recipe should answer:

- which language owns each concern;
- why that boundary was selected;
- which components are shared;
- which data contracts cross boundaries;
- which adapters are necessary;
- which implementations must never be duplicated;
- how the complete system is validated.

This is where the project's core idea becomes visible at application scale.

---

## 10. Phase Nine: capability federation

Long term, the agent-facing interface should become larger than any single language repository.

A future organization might resemble:

```text
reference/
├── zig/
├── wasm/
├── typescript/
├── go/
├── capabilities/
├── recipes/
├── diagnostics/
└── generated/agent/
```

This is only a conceptual destination. Repository boundaries should not be reorganized prematurely.

The critical idea is that capability identity becomes stable across implementations.

An agent could query:

```text
capability: image-resize
```

and receive:

```text
canonical compute implementation: zig/image-resize
browser embodiment: zig/image-resize → wasm
browser adapter: typescript/image-worker-adapter
service recipe: go/image-processing-service
```

The agent asks **what must be done**.

The corpus determines **where it should be done**.

---

## 11. What "almost anything and everything" means

The project should aim very high, but define the phrase carefully.

It does not mean every future application is already written.

It means the repository family should progressively cover the reusable engineering foundations needed for nearly every major class of software:

- command-line tools;
- embedded software;
- firmware;
- kernels;
- hypervisors;
- operating-system infrastructure;
- parsers and compilers;
- databases;
- storage engines;
- network services;
- distributed systems;
- game and simulation cores;
- native desktop foundations;
- WebAssembly libraries;
- browser applications;
- backend applications;
- cloud services;
- developer tooling;
- infrastructure software.

Application-specific business logic will still need to be written.

Novel research will still need to be done.

Unknown hardware and protocols will still need investigation.

But everything already solved should become progressively cheaper to discover, compose, verify, and repair.

That is the real meaning of universality for this project.

---

## 12. Efficiency is part of correctness

The project is not only trying to produce correct implementations.

It is trying to reduce the total cost of producing a correct system.

That includes:

- fewer tokens spent on discovery;
- fewer files opened;
- fewer candidate implementations considered;
- fewer duplicated modules;
- fewer generated replacement lines;
- fewer compile/repair iterations;
- fewer undocumented assumptions;
- fewer inconsistent implementations of the same concept;
- fewer tools necessary to understand the system;
- fewer places where architectural truth can drift.

This is why agentic metrics matter.

Important project measures include:

- **One-Shot Integration Rate**
- **Cost of Correct Use**
- **Discovery Compression Ratio**
- **Correct-Use Distance**
- **Choice Entropy**
- **Minimum Read Set**
- **Rediscovery Tax**
- **Repair Locality**
- **Validation Closure**
- **Knowledge Reuse Yield**
- **Snowball Yield**
- **Foothold Density**
- **Corpus Scaling Advantage**

As the corpus grows, the target is not merely more capabilities.

The target is **more capabilities without proportionally increasing the agent's cognitive burden**.

---

## 13. The scaling law we want

Traditional large repositories often behave like this:

```text
more code
→ more choices
→ more files
→ more uncertainty
→ more search
→ more context consumption
```

The desired `zig-reference` family should increasingly behave like this:

```text
more solved components
→ more available capabilities
→ same standard interface
→ deterministic selection
→ bounded read set
→ reuse
```

That is the long-term competitive advantage.

The project should be able to grow from tens of modules to hundreds or thousands without forcing an agent to understand the whole corpus before using one piece.

---

## 14. Order of execution

The proposed order is:

```text
1. Harden zig-reference agent interface and standards
2. Continue high-leverage Zig foundations
3. Hyper-Zig
4. Alpine Linux guest milestone
5. Morphic flagship
6. Zig ↔ WebAssembly bridge standards
7. TypeScript agent-readable reference corpus
8. Go agent-readable service/cloud corpus
9. Cross-language recipes
10. Capability federation and universal agent query surface
```

These phases can overlap where doing so creates useful feedback, but later language expansion should not distract from proving the current Zig foundations first.

---

## 15. Definition of full stack

For this project, "full stack" should eventually mean that the corpus can provide canonical, agent-readable foundations across:

```text
machine
→ virtualization
→ operating system
→ native runtime
→ application core
→ portable Wasm compute
→ browser frontend
→ backend service
→ network/cloud deployment
```

When a new project crosses several of these layers, the agent should be able to compose them using shared contracts and cross-language recipes rather than treating each layer as a separate engineering expedition.

---

## 16. Final aspiration

`zig-reference` should aim to become more than a Zig tutorial, more than a module collection, and more than one flagship system.

It should become the seed of a general engineering corpus designed around a simple proposition:

> **A coding agent should never have to rediscover a solved engineering fact when the repository can state that fact once, expose it in a deterministic format, and prove it continuously.**

The ambition is to make nearly any software project easier to construct because the known parts of the problem are already canonical, machine-readable, composable, and validated.

Zig remains the foundational systems language because it lets the project reach from low-level machine control to portable application cores with unusually little abstraction debt.

WebAssembly extends those cores across execution environments.

TypeScript provides the browser and application surface.

Go provides a highly regular service and cloud surface.

Cross-language recipes bind them into one engineering vocabulary.

The end goal is not to force every problem into one language.

The end goal is to make the **best known implementation of each recurring problem easy for an agent to find, understand, compose, validate, and reuse**.

If that succeeds, the corpus can stretch from hardware to browser while preserving the same operating philosophy:

> **Solved once. Documented completely. Reused forever.**

And at application scale:

> **Build almost anything. Rediscover almost nothing.**
