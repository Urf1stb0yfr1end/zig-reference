# Morphic Appliance Mode and Workload Specialization

## Status

This document defines a proposed long-horizon Morphic operating mode and research direction. It is not evidence that this capability exists today.

Appliance Mode should be pursued only after ordinary compatibility is strong enough that real workloads already run correctly. It is an optimization and specialization layer above compatibility, not a substitute for compatibility.

## Core idea

A conventional general-purpose operating system shares a machine among applications, services, caches, daemons, background jobs, update agents, desktop components, indexing, logging, and other persistent activity.

Morphic can eventually explore a different question:

> What if the machine temporarily reorganizes itself around one chosen workload and gives that workload almost everything the machine can safely spare?

This is **Appliance Mode**.

In Appliance Mode, one workload effectively owns the machine. Unneeded services disappear, unused filesystem caches are reclaimed, unnecessary processes are killed or never launched, and the chosen workload receives almost the entire available RAM and CPU budget that is not required to keep Morphic and its necessary compatibility environment alive.

For Doom this would be hilarious overkill because Doom requires very little by modern standards. But the same architecture becomes much more interesting for a large compiler, database, AI inference workload, emulator, scientific application, renderer, media pipeline, simulation, or a modern memory-hungry game.

The broader research direction is therefore not merely:

> run Linux software.

It is:

> run existing software through a compatible environment, then specialize the machine around the chosen workload without forcing that workload to be rewritten for Morphic.

The target is **maximum useful machine output per unit of hardware**.

## The flagship selling point

A compelling public proof would be deliberately concrete:

> Take an ordinary 16 GB computer, dedicate the machine to one demanding application, and show that Morphic can give that application almost the entire usable machine budget with very little platform overhead.

For gaming, the eventual demonstration should not be "Morphic can technically launch a game." It should be:

> The same modest 16 GB machine runs a demanding real game unusually well because the operating environment has been reduced to exactly what the game needs.

That claim must be earned with measurements, not marketing language.

The comparison should use the same physical machine, the same game build, the same graphics settings, the same resolution, the same driver/hardware path where possible, and a repeatable benchmark scene or trace.

Useful measurements include:

- average FPS;
- 1% low FPS;
- 0.1% low FPS;
- frame-time distribution and stutter;
- total RAM used by the operating environment;
- RAM available to the workload;
- background CPU wakeups;
- context switches;
- I/O latency under load;
- application launch time;
- total machine power where measurable;
- workload output per GiB of physical memory;
- workload output per watt where measurable.

The strongest result would not necessarily be a huge average-FPS win. A lower-overhead system that preserves more RAM, produces better 1% lows, reduces stutter, or allows a heavier workload to fit comfortably on hardware where a conventional environment struggles would already be a significant result.

## Why Morphic is unusually suited to this

Morphic is being built from the substrate upward rather than as another user-space resource manager layered on top of a mature general-purpose kernel.

That means the project can eventually make resource specialization a first-class machine contract instead of merely asking an existing scheduler or memory manager for a higher priority.

The compatibility world seen by software and the resource policy used underneath it do not have to be identical.

A workload may continue to see the Linux-compatible interfaces it expects while Morphic chooses a much narrower physical execution policy beneath them.

Conceptually:

```text
ordinary Linux-compatible workload
              |
              v
      compatibility contract
              |
              v
           Morphic
              |
      specialized machine policy
              |
              v
     RAM / CPU / devices / I/O
```

The software should not need a Morphic-specific port merely to benefit from specialization.

## Three operating modes

### Normal mode

The machine behaves as a general-purpose system.

Multiple applications and services coexist. Memory, CPU time, caches, I/O, and devices are shared according to ordinary policy.

Normal mode is the compatibility baseline and should remain the default proof environment.

### Focus mode

One selected workload is favored without taking exclusive possession of the system.

Possible policy effects include:

- stronger CPU scheduling preference;
- preferential memory residency;
- aggressive reclamation of background caches;
- lower scheduling priority for nonessential tasks;
- reduced background service activity;
- preferential I/O scheduling where safe;
- optional CPU-core affinity or reservation;
- memory-pressure decisions biased toward preserving the selected workload.

The desktop and ordinary services remain available, but the selected workload becomes the machine's primary concern.

### Appliance mode

One workload becomes the machine's explicit purpose.

The system should reduce itself to the smallest environment necessary to keep that workload correct and usable.

Possible policy effects include:

- omit nonessential services at launch;
- terminate optional background processes before workload entry;
- reclaim caches not required for correctness or near-term workload progress;
- reserve only the kernel/substrate memory that Morphic actually requires;
- reserve only the compatibility processes and libraries required by the chosen workload;
- dedicate nearly all remaining physical memory to the workload and its directly required dependencies;
- dedicate available CPU cores to the workload where its execution model benefits;
- reduce scheduler competition to the minimum necessary set of system tasks;
- restrict optional daemons, update agents, indexing, telemetry, background timers, and incidental work;
- give the workload priority over optional cache retention and opportunistic background computation;
- preserve only the display, input, storage, network, audio, or other device infrastructure actually required by the workload.

The goal is not literal 100 percent ownership of RAM or CPU. Morphic, page tables, resource metadata, device queues, required compatibility state, and other irreducible mechanisms still consume resources.

The useful contract is:

> Everything not required to keep the machine and selected workload correct becomes available to that workload.

## A compatibility world that can shrink

A conventional desktop launch path might look like:

```text
kernel
  -> init
  -> services
  -> desktop session
  -> terminal
  -> workload
```

Morphic should eventually investigate whether a selected workload can instead receive only the compatibility world it actually needs:

```text
Morphic
  -> minimum compatible userspace environment
  -> workload
```

The workload may still believe it is executing inside a familiar Linux-compatible environment. Morphic does not need to permanently preserve every surrounding convention if the workload never observes or requires it.

This idea is closely aligned with Morphic's larger convergence question: how much permanent substrate is actually necessary beneath real software?

Appliance Mode extends that question into resource policy:

> Once compatibility has been learned, how much of the surrounding operating environment can disappear when the machine is dedicated to one purpose?

## Memory specialization

A naive description is "give the program all the RAM." The correct version is more careful.

Morphic must retain memory required for:

- trusted substrate state;
- page tables and address-space metadata;
- resource ownership tables;
- required device buffers and queues;
- compatibility state needed by the application;
- active shared libraries and runtime state;
- filesystem metadata needed for correctness;
- display/input/audio/network infrastructure if the workload uses it;
- safety margins needed to avoid deadlock or unrecoverable allocation failure.

Everything else can become a candidate for reclamation or direct workload use.

A future memory-specialization policy could:

1. measure the irreducible Morphic reservation;
2. measure the compatibility-environment reservation;
3. identify optional caches and background mappings;
4. reclaim or evict optional state under workload pressure;
5. expose the remaining budget to the selected process tree;
6. record exactly where every reserved byte went.

A 16 GB machine is a particularly useful benchmark target because it is large enough for demanding software but constrained enough for platform overhead to matter.

A future report should be able to show something like:

```text
physical RAM:              16.0 GiB
Morphic irreducible:          X MiB
required compatibility:      Y MiB
required graphics/input:     Z MiB
reclaimable/optional:         R MiB
workload-available budget:    N GiB
```

The number is not assumed in advance. The point is to make overhead visible and measurable.

## CPU specialization

The same principle applies to CPU time.

For a selected workload, Morphic could eventually experiment with:

- CPU-core reservation;
- CPU affinity;
- scheduler-class specialization;
- eliminating incidental background wakeups;
- minimizing context switching;
- reducing timer activity unrelated to the workload;
- prioritizing the selected process tree over optional system work;
- reserving a small control core or control slice while dedicating the remainder to the workload;
- topology-aware placement for multithreaded workloads;
- throughput mode versus latency mode.

A single-threaded workload may benefit from low interference rather than many cores. A compiler, renderer, scientific program, database, emulator, or AI runtime may benefit from coordinated use of many cores.

Appliance Mode should be workload-aware without hard-coding application names into neutral Morphic mechanisms.

## I/O and device specialization

A dedicated workload may also benefit from policy around:

- block-I/O queue priority;
- read-ahead and cache policy;
- network queue ownership;
- packet-buffer reservation;
- GPU command submission;
- input latency;
- audio scheduling;
- asynchronous I/O completion;
- device interrupt placement;
- DMA-buffer budgeting.

The same rule applies: the compatibility contract remains stable while the machine policy underneath it becomes narrower.

## Workload classes

### Game / interactive appliance

Priorities:

- low input latency;
- stable frame pacing;
- strong 1% and 0.1% lows;
- minimal background scheduling noise;
- predictable memory residency;
- graphics/audio continuity;
- rapid asset access;
- minimal non-game desktop overhead.

This is a strong public demonstration because the result is immediately visible.

### Compiler / build appliance

Priorities:

- high CPU utilization;
- filesystem metadata throughput;
- source/object cache behavior;
- parallel job scheduling;
- large temporary working sets;
- minimal interference from unrelated tasks.

### Database appliance

Priorities:

- predictable memory reservation;
- page cache versus application cache policy;
- storage latency;
- network latency;
- durability semantics;
- minimal jitter.

### AI inference appliance

Priorities:

- maximum model residency;
- pinned or stable buffers where appropriate;
- GPU/accelerator memory coordination;
- CPU preprocessing throughput;
- low background memory pressure;
- predictable accelerator submission.

### Emulator / VM appliance

Priorities:

- large guest memory reservation;
- stable CPU allocation;
- low timer jitter;
- fast virtual-device paths;
- host background activity reduced to the minimum.

### Scientific / simulation appliance

Priorities:

- deterministic CPU access;
- large contiguous or stable working sets where possible;
- high memory bandwidth;
- long-duration low-noise execution;
- reproducible performance conditions.

## Gaming pressure ladder

Gaming is a useful flagship because it combines graphics, input, audio, files, timers, threads, networking, memory pressure, and human-visible latency.

The ladder should progress from easy proof to increasingly demanding real software.

### Stage 1: Doom / Freedoom

Purpose:

- first complete graphical game loop;
- keyboard/mouse input;
- timers;
- files;
- audio if available;
- save/load state;
- clean exit back to the desktop or shell.

Doom is a beginning, not the performance demonstration.

### Stage 2: Quake-family engine

Use a legally distributable/free-data route where possible.

Purpose:

- higher-resolution real-time 3D;
- stronger input/timing pressure;
- OpenGL/SDL-class paths depending on selected engine;
- network and audio pressure;
- repeatable timedemo-style measurements where available.

### Stage 3: OpenArena / Quake III-class workload

Purpose:

- mature 3D engine workload;
- stronger renderer pressure;
- multiplayer/network paths;
- useful repeatable benchmark behavior;
- clear frame-time comparison against another OS on the same hardware.

### Stage 4: Xonotic

Xonotic is a particularly attractive intermediate target because it is a full fast-paced 3D FPS, is open source, and is packaged by Alpine on supported architectures.

Purpose:

- substantially richer renderer and asset load;
- SDL/GLX-class desktop integration;
- audio/network/input pressure;
- higher memory and CPU demand than the earlier stages;
- a visually credible public demonstration.

### Stage 5: SuperTuxKart

SuperTuxKart is also packaged by Alpine and pulls a broader graphical/media dependency stack.

Purpose:

- larger asset set;
- more complex scene/render behavior;
- SDL, OpenAL, image/font/media library pressure;
- broader package-manager and dynamic-library proof;
- frame-time and memory-overhead benchmarking.

### Stage 6: CPU-heavy simulation / strategy game

A game with significant simulation load is useful because it tests a different specialization axis than an FPS.

A suitable target should pressure:

- many active entities;
- pathfinding or simulation;
- memory allocation churn;
- multithreading where available;
- long-frame spikes and 1% lows.

The exact title should be chosen from software that is easy to reproduce and legally distribute at the time this milestone is reached.

### Stage 7: commercial native-Linux or compatibility-layer game

Only after the open-source ladder is stable should Morphic attempt a mainstream commercial title.

This is where the 16 GB Appliance Mode demonstration becomes genuinely compelling.

Requirements may include:

- Steam or another launcher/runtime;
- broader glibc/Linux assumptions or a compatibility container;
- Vulkan/OpenGL stack maturity;
- gamepad/input support;
- audio;
- networking;
- DRM/runtime dependencies;
- significantly larger memory footprints.

The title should be selected for reproducibility, benchmarkability, legal availability, and hardware fit rather than popularity alone.

### Stage 8: demanding 16 GB flagship

The eventual flagship is a game heavy enough that operating-system overhead matters on a 16 GB machine.

The experiment:

1. select one fixed 16 GB machine;
2. run the same game and scene under a conventional reference OS;
3. run the same workload under Morphic Normal Mode;
4. run it under Morphic Appliance Mode;
5. keep graphics settings, resolution, driver path, game version, and hardware fixed;
6. measure memory overhead and frame-time behavior;
7. publish both wins and losses.

Success should be phrased conservatively.

Examples of meaningful outcomes include:

- a workload fits without swapping where the reference environment does not;
- materially more RAM is available to the game;
- frame-time spikes are reduced;
- 1% lows improve;
- background CPU wakeups collapse;
- loading behavior improves due to workload-directed cache policy;
- equal performance is achieved with materially less platform overhead.

A claim such as "almost no performance loss" should mean measured near-parity relative to the best directly comparable execution path, not an assumption based on architectural simplicity.

## Browser-mediated desktop as an early bridge

A browser-accessible desktop can be an early development bridge before Morphic has a complete local graphics/input device stack.

Conceptually:

```text
host browser
    |
mouse + keyboard + display transport
    |
Morphic-hosted Alpine graphical session
    |
real X/desktop applications
```

This can provide genuine interactive mouse and keyboard control while the host browser temporarily handles presentation and input transport.

It should be labeled accurately: it proves the graphical userspace and interaction path, not yet native local GPU/input support.

This bridge can accelerate the gaming ladder because Doom, Quake, and later graphical applications can pressure real userspace semantics before native virtio-gpu/input work is complete.

## Relationship to apk

A working `apk` is a major prerequisite because it turns Alpine into a self-extending compatibility pressure source.

Once package installation is genuinely reliable, Morphic can use real packages rather than hand-porting each application.

The ideal story is not:

> Morphic contains a custom Doom port.

It is:

> Alpine installed an ordinary packaged application, Morphic supplied the general semantics it required, and the application ran without a Morphic-specific implementation path.

That principle should remain true as the workload ladder grows.

## Correctness before specialization

Appliance Mode must never become an excuse to cheat compatibility tests.

The sequence is:

```text
run correctly in Normal Mode
        |
        v
measure baseline
        |
        v
apply specialization policy
        |
        v
prove same externally visible correctness
        |
        v
measure the gain
```

A specialization that changes externally visible application semantics merely to improve a benchmark is invalid unless that behavior is explicitly part of the selected appliance contract and the workload knowingly opts into it.

No command-name, pathname, game-name, benchmark-scene, or expected-output special cases belong in neutral Morphic mechanisms.

## Research questions

Appliance Mode creates several measurable research questions:

1. How small can the irreducible Morphic reservation become?
2. How much RAM can a real workload receive on a fixed machine compared with a conventional general-purpose environment?
3. Can background CPU wakeups approach zero while an interactive workload remains correct?
4. Does specialization improve 1% and 0.1% frame-time lows more than average throughput?
5. Can Morphic dynamically infer which compatibility services a workload actually requires?
6. Can a compatibility environment be expanded on demand and later contracted again?
7. Can broad workload classes share neutral specialization mechanisms without application-specific policy code?
8. How much performance does the compatibility edge itself cost?
9. Can a 16 GB machine execute workloads normally associated with a materially larger practical memory budget because platform overhead is reduced?
10. Where does hardware, rather than OS overhead, become the dominant limit?

## Anti-claims

This document does not claim:

- that Morphic currently has Appliance Mode;
- that Morphic currently uses less memory than Linux or Windows;
- that a 16 GB system can substitute for arbitrary amounts of missing RAM;
- that reclaiming OS overhead can overcome an inadequate GPU or CPU;
- that a dedicated workload literally receives 100 percent of physical RAM;
- that a game will automatically run faster merely because the system is smaller;
- that commercial game compatibility exists;
- that specialization can ignore correctness, security, or device requirements.

The thesis must remain falsifiable.

If Morphic's compatibility edge consumes too much CPU, if device virtualization dominates latency, if graphics drivers require a large surrounding environment, or if a workload is overwhelmingly GPU-bound, Appliance Mode may provide little or no performance advantage. Those are valid outcomes and should be recorded.

## Proposed flagship milestone

A future milestone could be named:

```text
★ MORPHIC APPLIANCE MODE ★
```

A stronger gaming-specific demonstration could be:

```text
★ 16 GiB MORPHIC GAME APPLIANCE ★
```

A credible acceptance contract would require:

- one fixed physical 16 GB test machine;
- one demanding real game or equivalent interactive workload;
- real graphics, input, audio, filesystem, and runtime behavior;
- a repeatable benchmark scene or trace;
- a conventional reference environment on the same machine;
- Morphic Normal Mode on the same machine;
- Morphic Appliance Mode on the same machine;
- recorded average FPS and frame-time percentiles;
- recorded total system RAM overhead and workload RAM availability;
- recorded CPU/background-activity metrics;
- no workload-specific result fabrication;
- a written explanation of every major difference in the execution path;
- publication of negative results as well as positive ones.

If Morphic eventually demonstrates that a constrained 16 GB computer can devote nearly the whole useful machine to one demanding application while retaining ordinary software compatibility and near-reference performance, that would be a powerful expression of the project's core idea:

> inherit the software world, then discard the unnecessary operating-world overhead around the task at hand.

## Relationship to the Snowball principle

Appliance Mode should itself snowball.

A mechanism discovered for one workload should become reusable policy for many later workloads:

```text
bounded CPU reservation
    -> game
    -> compiler
    -> renderer
    -> scientific job

reclaimable compatibility service
    -> game appliance
    -> database appliance
    -> emulator appliance

measured memory accounting
    -> every specialization benchmark
```

The project succeeds if workload-specific experiments continually collapse into smaller general mechanisms that later applications inherit.
