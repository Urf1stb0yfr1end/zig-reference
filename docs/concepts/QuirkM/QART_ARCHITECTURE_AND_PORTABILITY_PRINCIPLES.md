# QArt Architecture and Portability Principles

QArt is a proposed flagship creative application for the QuirkM ecosystem.

Its first architectural goal should not be to accumulate tools as quickly as possible. It should establish an internal model strong enough that thousands of future capabilities can be added without turning the application into a pile of special cases.

## Build the document model before drowning in tools

Many creative applications become difficult to evolve because features are added faster than the underlying document architecture is clarified.

QArt should deliberately reverse that order.

A useful starting shape is:

```text
Document
  └── Scene / Layer Graph
       ├── Raster Layer
       ├── Vector Layer
       ├── Text Layer
       ├── Adjustment
       ├── Mask
       ├── Group
       └── External Asset

Operations
  └── Nondestructive Graph

Renderer
  └── Tiles / GPU / Cache

History
  └── Transaction Graph
```

This is not a final implementation specification. It is a design constraint: the document, operation, rendering, and history models should be explicit and composable before the application grows a huge tool surface.

If the foundation is excellent, large numbers of tools can become new operations over a stable model.

If the foundation is weak, every new feature tends to become another exception.

## Nondestructive editing is a native principle

Nondestructive editing should be a default philosophy, not a compatibility feature added later.

Where practical, edits should be represented as reversible or recomputable operations rather than permanently flattening earlier state.

That implies first-class support for concepts such as:

- adjustment operations;
- masks;
- transform nodes;
- filter/effect nodes;
- editable parameters;
- reusable external assets;
- stable layer identity;
- transactional history;
- deterministic recomposition where possible.

The user should be able to change their mind without the application architecture fighting them.

## Separate model, operations, rendering, and history

The four major concerns should remain conceptually distinct.

### Document

The document graph describes what exists.

It should encode composition structure and semantic relationships without requiring a specific renderer or UI implementation.

### Operations

The operation graph describes how content is transformed.

Operations should be composable and inspectable, with destructive mutation used only where the workflow genuinely requires it.

### Renderer

The renderer decides how the document and operation graph become pixels.

It should be free to use tiling, caching, GPU execution, CPU fallback, partial invalidation, multiple quality levels, and future QuirkM-native graphics mechanisms without redefining the document format.

### History

History should be modeled as transactions over meaningful application state rather than a fragile pile of widget-level undo callbacks.

The goal is reliable undo/redo, autosave, recovery, collaboration-friendly evolution, and the ability to reason about large documents without cloning the entire world after every action.

## Build QArt portable first

QArt should be designed so that its core can be developed before QuirkM itself has a complete graphical desktop.

The intended shape is:

```text
QArt Core
    │
    ├── QuirkM frontend / native integration
    ├── Linux development host
    └── additional hosts later when useful
```

This is not a retreat from native QuirkM software.

It is a way to let the application and operating system grow in parallel.

The core document model, operation graph, image algorithms, file formats, tests, history engine, rendering abstractions, and much of the creative logic should be usable on a mature development host while QuirkM's native graphics, input, windowing, storage, and capability APIs are still being built.

Then QuirkM-native integrations can become progressively deeper without requiring the creative application to wait for the operating system to finish first.

## Why portability matters strategically

If QArt only becomes buildable after the entire QuirkM desktop stack is finished, the project creates a serial dependency:

```text
finish OS
  -> finish graphics stack
  -> finish native toolkit
  -> begin QArt
```

That wastes years of possible parallel work.

A portable core changes the dependency graph:

```text
           QArt Core
          /        \
         /          \
Linux development   QuirkM platform work
         \          /
          \        /
       native QuirkM QArt
```

This also provides several engineering benefits:

- algorithms can be tested independently of the young OS;
- rendering can be compared across backends;
- file-format regressions can be reproduced on ordinary developer machines;
- fuzzing and property tests can run in mature environments;
- contributors can work on QArt without needing a complete QuirkM installation;
- the application can become useful before the platform reaches final form;
- platform-specific code remains visible instead of contaminating the portable core.

## Portability must not become lowest-common-denominator design

Portable does not mean generic forever.

QArt should have a strong portable core while allowing QuirkM to provide better native mechanisms where they exist.

A useful layering rule is:

```text
portable semantic core
        ↓
explicit platform interfaces
        ↓
QuirkM-native implementation
Linux development implementation
other implementations when justified
```

The QuirkM frontend should be allowed to take advantage of native capabilities such as explicit resource ownership, foreground-workload scheduling, low-latency input, GPU resource accounting, capability-based file access, and future QuirkM graphics facilities.

Those advantages should enter through explicit interfaces rather than by making the document model itself depend on one operating system.

## QArt as a platform pressure source

QArt should eventually pressure QuirkM in the same way real Alpine currently pressures Morphic: with demanding real workloads rather than synthetic feature checklists.

A serious creative application can expose weaknesses in:

- large virtual-memory workloads;
- GPU scheduling and memory pressure;
- low-latency stylus and pointer input;
- color management;
- fonts and text shaping;
- high-throughput storage;
- crash recovery;
- shared memory;
- worker scheduling;
- image and video codecs;
- plugin isolation;
- filesystem capabilities;
- background/foreground resource policy.

The application and the operating system should therefore improve one another.

## Foreground work is sovereign

QArt should be one of the canonical applications used to prove QuirkM's foreground-workload philosophy.

When a user is working on a large creative document, the machine should prioritize the work the user chose to do.

QuirkM should aim to make CPU time, RAM, GPU capacity, storage bandwidth, input latency, and cache policy available to the active creative workload as aggressively as safety and system integrity permit.

Background services should have to justify their cost.

This should be measured, not merely advertised.

Relevant future benchmarks include:

- OS memory overhead before QArt launch;
- RAM available to a large QArt document;
- background CPU wakeups during active editing;
- pen/input latency;
- frame-time consistency while editing;
- GPU memory available to the document renderer;
- render throughput under memory pressure;
- scratch/cache I/O contention;
- recovery behavior after memory exhaustion or application failure.

## A foundation for a larger creative suite

QArt does not need to solve every creative category in its first version.

The first application should establish reusable foundations that future QuirkM creative applications can share: document primitives, color infrastructure, GPU/image pipelines, font/text systems, asset handling, plugin boundaries, history/transaction mechanisms, and creator-focused resource contracts.

The strategic objective is larger than one application:

> **Create a native creative software ecosystem whose architecture is good enough that new tools become easier to build instead of harder.**

The rule is simple:

> **Foundation first. Nondestructive by default. Portable core. Native QuirkM advantages where they matter.**
