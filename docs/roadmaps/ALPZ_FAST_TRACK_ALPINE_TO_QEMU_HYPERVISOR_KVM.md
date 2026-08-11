# Alpz Fast Track: Alpine → QEMU/TCG → Native Hypervisor → KVM

This document records an aggressive, inheritance-first campaign roadmap from the current Linux syscall boundary to Alpine, QEMU/TCG, native RISC-V H-extension virtualization, and finally QEMU/KVM on Alpz.

It is deliberately optimized around the MinMax principle:

> **Implement the smallest permanent mechanism that unlocks the largest existing software world.**

The batch numbers below are campaign targets, not guarantees. If a real compatibility pressure exposes a prerequisite that cannot be compressed safely into the listed campaign, the roadmap may expand. Conversely, if one general mechanism unlocks multiple later requirements, campaigns should collapse rather than preserve numbering for its own sake.

The goal is not to implement hundreds of isolated features. The goal is to reach the surfaces that let Alpz inherit entire ecosystems as early as possible.

---

## Fast-track roadmap

```text
25A ✅ Linux syscall semantic boundary

25B    Resource / FD world

26     Files + mmap + exec/dynamic ELF

27     Processes + threads + futex + poll + pipes

28     BusyBox + musl pressure

29     ★ ALPINE SHELL ★

30     ★ APK WORKS ★
       Python / Node / Clang / Wasmtime begin entering

────────────────────────────────────────────

31     QEMU/TCG PRESSURE
       install/build QEMU from existing ecosystem
       repair only missing Linux surfaces

32     ★ FIRST QEMU GUEST ★
       qemu-system-riscv64 -accel tcg
       small RV64 guest boots

────────────────────────────────────────────

33     H-EXTENSION FOUNDATION
       HS/VS/VU model
       guest CSR state
       hgatp
       HFENCE
       VM/vCPU objects

34     STAGE-2 + VM ENTRY/EXIT
       guest physical memory
       stage-2 translation
       vCPU enter/exit
       bounded exit reasons

35     VIRTUAL INTERRUPTS / TIME
       virtual timer
       interrupts
       guest traps
       enough devices to boot tiny guest

36     ★ NATIVE ALPZ HYPERVISOR ★
       Alpz directly boots a real RV64 guest
       using RISC-V H extension

────────────────────────────────────────────

37     /dev/kvm CORE
       KVM API version
       create VM
       memory regions
       create vCPU
       register state

38     KVM_RUN
       exits
       interrupts
       timer/device pressure

39     ★ QEMU/KVM ON ALPZ ★

       QEMU
         ↓
       /dev/kvm
         ↓
       Alpz
         ↓
       RISC-V H
         ↓
       real guest
```

---

## What each gate is buying us

### Batch 25A — Linux syscall semantic boundary

Already completed.

The important result is not merely that a Linux/RV64 userspace ELF can issue `write`, receive Linux-style negative errno values, resume through exact `sepc + 4`, and terminate through `exit_group`.

The important architectural result is the seam:

```text
Linux ABI
   ↓
thin Linux adapter
   ↓
Morphic semantic operation
   ↓
bounded kernel execution
```

Linux syscall numbers, errno values, and RISC-V register identities stay at the compatibility edge rather than becoming Morphic's internal ontology.

That is the foundation the rest of this roadmap must preserve.

---

### Batch 25B — Resource / FD world

Target:

- bounded process-local resource table;
- Linux fd adapter;
- real stdin/stdout/stderr bindings;
- `read`, `write`, `close`, and one real duplication path;
- alias/lifetime semantics;
- invalid/closed descriptor behavior;
- continued separation between Linux fd identity and Morphic resource identity.

Desired inheritance shape:

```text
Linux fd ──────┐
QuirkM handle ─┼──→ Morphic resource reference → resource
Wasm resource ─┘
```

This is the first major reusable substrate shared by later Linux, QuirkM, Wasm, and virtualization work.

---

### Batch 26 — Files + memory + executable world

Target one campaign around the highest-leverage Linux execution surfaces:

- root filesystem / minimal VFS;
- path walking;
- `openat` and file-backed descriptors;
- metadata/stat/lseek/directory iteration pressure;
- anonymous/file-backed mapping as required;
- `mmap`, `munmap`, `mprotect`, `brk` pressure;
- `execve`;
- dynamic ELF / `PT_INTERP` pressure.

The goal is not a perfect POSIX filesystem. The goal is enough real file and executable semantics that existing userspace starts becoming the driver of what comes next.

---

### Batch 27 — Processes + threads + Unix execution pressure

Target:

- process lifecycle;
- process creation/wait as required by real pressure;
- pipes;
- poll/epoll-class waiting where required;
- clocks/time primitives;
- minimum signal semantics;
- TLS;
- futex;
- basic threading.

This is the campaign that should make shells, libc runtimes, build tools, and larger applications stop looking like isolated syscall demonstrations and start behaving like a genuine Unix userspace.

---

### Batch 28 — BusyBox + musl pressure

Use real upstream software as the compatibility oracle.

Primary pressure targets:

```text
static BusyBox
      ↓
/bin/sh
      ↓
real command execution
      ↓
musl dynamic loader
      ↓
dynamic musl-linked programs
```

Do not implement speculative Linux behavior simply because Linux has it. Let BusyBox and musl expose the smallest missing semantics required to make progress.

The purpose of this campaign is to cross from handcrafted userspace into recognizable existing Unix software.

---

### Batch 29 — ★ Alpine shell ★

Target a real Alpine rootfs and a real shell milestone:

```text
Alpz booting...
...
Welcome to Alpine Linux

/ #
```

This milestone is intentionally narrower than "Alpine compatibility complete."

Likely pressure includes:

- rootfs/init expectations;
- `/dev` essentials;
- `/proc` essentials;
- terminal/TTY behavior;
- remaining loader/process details exposed by Alpine startup.

The goal is a real Alpine environment, not a kernel-specific imitation of one.

---

### Batch 30 — ★ apk works ★

This is the strategic ecosystem gate.

Target:

```text
/ # apk update
/ # apk add ...
```

Once `apk` works against ordinary RISC-V Alpine packages, development strategy changes.

Instead of asking:

> What program should Alpz implement or port next?

ask:

> What smallest missing Linux behavior prevents the largest number of existing Alpine packages from running?

The desired inheritance tree becomes:

```text
                ALPZ
                  │
             Linux ABI
                  │
                musl
                  │
               Alpine
                  │
                 apk
                  │
    ┌─────────────┼─────────────┐
    ▼             ▼             ▼
  Python         Node         Clang
    │             │             │
   pip           npm           C/C++
                  │
             TypeScript

             + Wasmtime
                  │
                Wasm
```

The precise package set is evidence-driven, but Python, Node/npm, Clang/C/C++, and Wasmtime are especially valuable multiplier targets because they open additional software ecosystems rather than merely adding individual programs.

This is where Alpine becomes more than a distro milestone: it becomes a package inheritance mechanism and compatibility pressure source.

---

## QEMU/TCG phase

### Batch 31 — QEMU/TCG pressure

Do not create a special QEMU subsystem in Alpz.

Install or build existing QEMU through the software world unlocked by Alpine and repair only the general Linux compatibility surfaces that real QEMU execution proves are missing.

Likely pressure includes:

- large and complex mmap/mprotect behavior;
- threads and futexes;
- signals;
- timers;
- poll/epoll;
- files and pipes;
- sockets;
- terminal/ioctl behavior;
- dynamic linking and runtime expectations.

By this point most of these mechanisms should already exist because Alpine, package runtimes, shells, and build tooling have pressured them first.

QEMU should run because Alpz's Linux ABI is sufficiently real, not because QEMU receives a bespoke compatibility path.

---

### Batch 32 — ★ First QEMU guest ★

Target:

```text
Alpz
  ↓
Alpine
  ↓
qemu-system-riscv64 -accel tcg
  ↓
small RV64 guest boots
```

This is not hardware virtualization yet. It is nevertheless a major system milestone because Alpz can now host a software-emulated guest using an existing VMM.

It also enables the recursive compatibility laboratory:

```text
Alpz host
   ↓
QEMU/TCG
  /     \
Linux   Alpz-next
oracle  candidate
  \     /
   compare
      ↓
small reproducer
      ↓
Z-Ref
```

Once this works, Alpz can increasingly help test and qualify later Alpz generations and Linux-compatibility behavior.

---

## Native RISC-V H-extension phase

### Batch 33 — H-extension foundation

Introduce only the virtualization-specific machine concepts not already supplied by the kernel foundation:

- HS/VS/VU state model;
- guest CSR state;
- `hgatp`;
- HFENCE operations;
- VM resource/object;
- vCPU resource/object.

Reuse existing Morphic/kernel machinery where the semantics genuinely match, especially resource identity, memory ownership, lifetime, wait/completion, scheduler, timer, and trap infrastructure.

Do not pretend process and VM semantics are identical merely to maximize reuse. Share only mechanisms whose contracts really compose.

---

### Batch 34 — Stage-2 translation + VM entry/exit

Target:

- guest physical memory representation;
- stage-2 translation;
- guest-memory registration;
- vCPU entry;
- VM exits;
- bounded explicit exit reasons;
- deterministic evidence that guest execution crosses the virtualization boundary correctly.

The desired machine shape is:

```text
M / firmware
     ↓
HS: Alpz host
     ↓
VS: guest kernel
     ↓
VU: guest userspace
```

---

### Batch 35 — Virtual interrupts / time / minimum devices

Target enough virtual platform semantics to let a tiny real guest make meaningful forward progress:

- virtual timers;
- virtual interrupts;
- guest trap delivery;
- minimum interrupt-controller/device path required by the selected guest;
- bounded device model only as necessary for the proof.

Do not build a complete virtual hardware zoo. Choose the smallest guest/platform combination that proves native hardware virtualization end-to-end.

---

### Batch 36 — ★ Native Alpz hypervisor ★

Milestone:

```text
RISC-V hardware with H extension
            ↓
           Alpz
            ↓
     native VM/vCPU path
            ↓
       VS-mode guest
            ↓
       real RV64 guest
```

At this point Alpz is a genuine RISC-V hardware hypervisor independently of KVM compatibility.

This should be treated as a different achievement from QEMU/TCG: Batch 32 proves Alpz can host a software VMM; Batch 36 proves Alpz itself can directly virtualize a RISC-V guest through the H extension.

---

## KVM compatibility phase

### Batch 37 — `/dev/kvm` core

Once the native VM/vCPU substrate is real, expose the smallest KVM-compatible userspace surface needed by ordinary QEMU.

Target pressure:

- `/dev/kvm`;
- API version/query surface;
- VM creation;
- guest memory regions;
- vCPU creation;
- basic register state.

Architectural rule:

```text
QEMU KVM ABI
     ↓
thin KVM compatibility personality
     ↓
Morphic/Alpz VM + vCPU resources
     ↓
RISC-V H extension
```

Do not make KVM ioctl numbers or Linux device semantics the internal virtualization architecture.

---

### Batch 38 — `KVM_RUN`

Target the execution loop ordinary QEMU actually needs:

- run vCPU;
- explicit VM exits;
- interrupt handling;
- timer pressure;
- minimum device/exit behaviors required by the selected QEMU guest path;
- register synchronization as real pressure requires.

Again, implement only compatibility behavior that produces real leverage.

---

### Batch 39 — ★ QEMU/KVM on Alpz ★

Target:

```text
QEMU
  ↓
/dev/kvm
  ↓
Alpz
  ↓
RISC-V H
  ↓
real guest
```

This is the multiplier milestone: ordinary existing QEMU uses Alpz through a KVM-compatible interface and reaches Alpz's native RISC-V virtualization substrate.

The strategic value is inheritance again. Instead of teaching every VMM a bespoke Alpz virtualization API, support the compatibility surface that an enormous existing virtualization ecosystem already understands.

---

## Why this route is short

The native hypervisor phase comes after Alpine/QEMU not because virtualization logically requires a Linux distribution, but because the preceding work gives Alpz many general mechanisms a hypervisor also needs:

```text
physical memory
page ownership
page tables
traps
scheduler
resource handles
process/task state
waiting/completion
timers
interrupts
userspace isolation
bounded copy/validation
```

The genuinely new native-virtualization surface is much narrower:

```text
HS / VS / VU state
hgatp
stage-2 translation
HFENCE
guest CSRs
VM/vCPU state
VM entry/exit
virtual interrupts
virtual timers
guest-memory registration
```

Likewise, `/dev/kvm` is not the hypervisor itself. It is a compatibility personality over the native virtualization substrate, just as the Linux syscall personality is a compatibility edge over Morphic operations.

That separation is essential.

---

## Inheritance strategy

The whole roadmap follows one repeated pattern:

```text
Linux ABI     → inherit Linux software
Alpine + apk  → inherit packaged RISC-V userspace
Python / npm  → inherit scripting and package ecosystems
Clang         → inherit C/C++ source worlds
Wasmtime/Wasm → inherit portable component/language worlds
QEMU/TCG      → inherit an existing software VMM and recursive lab
KVM ABI       → inherit QEMU's hardware-virtualization backend ecosystem
```

The project should therefore prioritize **surfaces that multiply access** rather than count features or syscalls for their own sake.

A useful planning question for every future campaign is:

> **What is the smallest missing surface whose implementation causes the largest existing software world to become available?**

That is the fast-track criterion.

---

## Status and nonclaims

At the time this roadmap is written:

- Batch 25A is completed and merged;
- Batch 25B is planned;
- Alpine does not yet boot on Alpz;
- `apk` does not yet run on Alpz;
- QEMU/TCG does not yet run on Alpz;
- Alpz does not yet implement the RISC-V H-extension virtualization substrate;
- Alpz does not yet expose `/dev/kvm`;
- QEMU/KVM does not yet run on Alpz.

Everything after Batch 25A in this document is a pressure-oriented roadmap, not an implementation claim.

The success criterion is not preserving the batch numbers. The success criterion is reaching each inheritance gate with the smallest coherent permanent mechanism and the strongest available evidence.