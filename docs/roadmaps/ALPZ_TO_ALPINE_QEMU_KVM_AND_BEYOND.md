# Alpz: From the User-Memory Boundary to Alpine, QEMU, KVM, and Beyond

This roadmap describes the intended progression after Batch 21C. It connects the current bounded user-memory work to real ELF execution, Linux ABI compatibility, BusyBox, musl, Alpine, QEMU/TCG, recursive differential testing, Debian/glibc, RISC-V hardware virtualization, `/dev/kvm`, QEMU/KVM, and later large workloads.

The batch numbers after Batch 21C are planning bands, not promises that every milestone will fit exactly into one batch. The governing rule remains: take the smallest step that exposes the next missing behavior, then compress each expensive discovery into a small permanent test.

Batch 21C is the current target at the time this document is written. Do not treat later milestones as already implemented.

## One-at-a-glance roadmap

```text
CURRENT TARGET
Batch 21C
safe bidirectional U <-> S memory
        |
        v
REAL ELF EXECUTION
loader -> mapped program -> argv/envp/auxv
        |
        v
MINIMAL LINUX ABI
syscalls -> fd/VFS -> mmap -> process -> signals/futex
        |
        v
BUSYBOX / SH
first recognizable Unix userspace
        |
        v
MUSL + DYNAMIC ELF
        |
        v
ALPINE BOOTS
        |
        v
USEFUL ALPINE
apk + networking + proc/dev + broader ABI
        |
        v
QEMU / TCG RUNS INSIDE ALPZ
        |
        v
SELF-HOSTED RECURSIVE ABI LAB
Golden Linux <-> newest Alpz differential probes
        |
        +---------------------------+
        |                           |
        v                           v
DEBIAN / GLIBC                RISC-V H EXTENSION
broader Linux/POSIX           native virtualization substrate
        |                           |
        v                           v
larger applications              VMM core
        |                           |
        |                           v
        |                       /dev/kvm
        |                           |
        +-------------+-------------+
                      v
                  QEMU + KVM
                      |
                      v
              hardware-accelerated guests
                      |
                      v
             recursive accelerated lab
                      |
                      v
          containers + huge real workloads
```

## Full roadmap view

```text
                          NOW
                           │
                      Batch 21C
                           │
            safe bidirectional user memory
                           │
                           ▼
                ┌────────────────────┐
                │ 22–24 REAL ELF     │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ 25–35 LINUX ABI    │
                │ fd/VFS/mmap/proc   │
                │ signals/futex/etc. │
                └─────────┬──────────┘
                          │
                          ▼
                     BUSYBOX / SH
                          │
                          ▼
                ┌────────────────────┐
                │ MUSL + DYNAMIC ELF │
                └─────────┬──────────┘
                          │
                          ▼
                     ★ ALPINE ★
                          │
                          ▼
                   USEFUL ALPINE
                  apk/network/proc
                          │
                          ▼
                     QEMU / TCG
                          │
                          ▼
            ★ RECURSIVE ABI LAB ★
                          │
            ┌─────────────┴──────────────┐
            │                            │
            ▼                            ▼
      DEBIAN / GLIBC              RISC-V H EXT
            │                            │
            ▼                            ▼
    broader Linux/POSIX              VMM CORE
            │                            │
            │                            ▼
            │                        /dev/kvm
            │                            │
            └────────────┬───────────────┘
                         ▼
                    QEMU + KVM
                         │
                         ▼
                 hardware guests
                         │
                         ▼
              recursive accelerated lab
                         │
                         ▼
              containers / huge workloads
```

## Phase I: real programs

### Batch 21C: close the bounded user-memory boundary

Target result:

- real copy-IN already exists from Batch 21B;
- real copy-OUT;
- write-permission rejection;
- later-page rejection with no partial mutation;
- SUM remains clear;
- no direct supervisor dereference of untrusted user virtual pointers;
- unchanged mapping/resource truth.

Once this is sealed, future ELF/syscall work can rely on a bounded native user-memory transfer boundary rather than growing one ad hoc inside each syscall.

### Batches 22–24: real ELF execution

Likely progression:

- bounded ELF64 parser/loader for RV64 userspace;
- map real program segments with truthful RX/RW/NX permissions;
- construct a user stack;
- enter the ELF entry point in U-mode;
- add `argc`, `argv`, `envp`, and the minimum useful auxiliary-vector state;
- prove the loaded program returns or traps through the existing trusted boundary.

Milestone:

```text
actual ELF file
      |
      v
  Alpz loader
      |
      v
 real U-mode program
```

This is where handcrafted copied U-mode probes stop being the only way to exercise userspace.

## Phase II: minimal Linux ABI and POSIX-like userspace

### Batches 25–35: the first useful Linux process contract

Indicative pressure order:

- `exit` / `exit_group` / `write` and a narrow syscall dispatcher;
- file-descriptor table and stdin/stdout/stderr;
- `read`, `write`, `close`, `dup` family;
- VFS skeleton and root filesystem;
- path walking, `openat`, stat/fstat, lseek, cwd;
- pipes and poll-like readiness;
- `brk`, anonymous `mmap`, `munmap`, `mprotect`;
- `execve`;
- process lifecycle, clone/fork-like behavior and wait;
- clocks, sleep and timers;
- signals;
- TLS, futexes, and basic threading.

The kernel target is the Linux ABI, not a separate POSIX syscall personality. POSIX-like behavior appears through libc and applications above that Linux ABI.

```text
POSIX application
       |
       v
   musl / glibc
       |
       v
    Linux ABI
       |
       v
      Alpz
```

## Phase III: BusyBox, musl, and first Alpine

### BusyBox / shell

A static BusyBox shell is the first major human-visible checkpoint.

Desired proof:

```text
Alpz
  |
  v
BusyBox
  |
  v
/bin/sh
```

Useful early commands should begin to work naturally rather than as kernel-specific demonstrations: `echo`, `ls`, `cat`, basic pipes, redirection, and simple process execution.

### musl + dynamic ELF

Alpine then pressures:

- dynamic ELF loading;
- TLS;
- stronger mmap/mprotect behavior;
- more complete process startup state;
- signal semantics;
- threading and futex behavior;
- shared-library mapping and loader expectations.

### First Alpine shell

The first Alpine milestone is intentionally narrower than "Alpine is complete":

```text
Alpz booting...
...
Welcome to Alpine Linux

/ #
```

This is the point where Alpz gains an existing real distribution as a development environment.

## Phase IV: useful Alpine

Booting Alpine and being a useful Alpine host are different milestones.

Pressure after first shell should include:

- stronger filesystem semantics;
- mature process lifecycle;
- futex/thread behavior;
- epoll/eventfd/timerfd-class facilities where required;
- sockets and networking;
- terminal/ioctl behavior;
- `/proc`, `/sys`, and `/dev` essentials;
- mount behavior;
- APK prerequisites and package installation.

A useful target looks more like:

```text
/ # cat /etc/alpine-release
/ # ps
/ # mount
/ # ip addr
/ # apk update
/ # apk add ...
```

At this point Alpine itself becomes a broad compatibility pressure source.

## Phase V: QEMU/TCG hosting

QEMU should not receive a special Alpz compatibility path. The goal is for it to run because the Linux ABI is sufficiently complete.

QEMU/TCG will aggressively pressure:

- mmap/mprotect and large address spaces;
- threads and futexes;
- signals;
- timers;
- poll/epoll;
- files and pipes;
- sockets;
- terminal/ioctl behavior.

Target progression:

```text
Alpz
  |
  v
Alpine
  |
  v
qemu-system-riscv64 -accel tcg
  |
  v
small guest -> normal Linux guest
```

This is the major inflection point described by the recursive ABI roadmap.

## Phase VI: the self-hosted recursive ABI lab

Once QEMU/TCG is reliable inside Alpine on Alpz:

```text
L0 real machine
      |
      v
    Alpz
      |
      v
   Alpine
      |
      v
  QEMU / TCG
   /       \
  v         v
Golden     newest
Linux      Alpz
  \         /
   \       /
      DIFF
       |
       v
 tiny reproducer
       |
       v
     Z-Ref
```

The intended loop is:

1. select a behavioral question;
2. construct a small executable probe;
3. execute it against a pinned reference Linux world;
4. execute the same probe against Alpz;
5. normalize nondeterminism;
6. compare semantic results;
7. reduce mismatches into tiny permanent tests;
8. repair Alpz;
9. preserve the discovered behavior in Z-Ref.

Before this milestone, Codex helps build the kernel. After it, the kernel increasingly helps Codex build the kernel.

## Phase VII: Debian and glibc

Debian is not a second distro-specific ABI. It is a second major pressure source against the same Linux contract.

```text
                 Linux ABI
                    |
                    v
                   Alpz
                  /    \
                 /      \
              musl      glibc
               |          |
            Alpine      Debian
```

Alpine first gives compact musl/BusyBox pressure. Debian/glibc then exposes broader assumptions, larger applications, different loader behavior, richer threading/TLS behavior, and additional `/proc` and compatibility expectations.

Indicative progression:

- glibc loader requirements;
- glibc TLS/thread pressure;
- errno/syscall edge behavior;
- larger `/proc` expectations;
- minimal Debian root filesystem;
- Debian userspace and init environment.

The real success criterion is not "two distro ports." It is one Linux ABI supporting both.

## Phase VIII: broader POSIX and Unix behavior

By the Alpine/Debian stage, POSIX-facing validation can become deliberate and systematic:

- files and directories;
- permissions;
- processes;
- signals;
- pipes;
- threads;
- mutexes and condition variables;
- clocks and time;
- terminals;
- sockets;
- environment and libc behavior.

Again, this remains inheritance through Linux libc contracts rather than a separate POSIX kernel personality.

## Phase IX: RISC-V hardware virtualization

KVM is not required to reach Alpine or QEMU/TCG. It begins a new hardware-virtualization branch after the userspace host is already mature.

For the RISC-V path, this means pressure around the H extension and related machine semantics:

- HS/VS/VU state model;
- guest CSR state;
- `hgatp` and guest-stage address translation;
- HFENCE operations;
- vCPU representation;
- VM entry and exit;
- virtual timers;
- virtual interrupts;
- guest-memory registration;
- bounded native VM execution.

Conceptually:

```text
M / firmware
     |
     v
HS: Alpz host
     |
     +---- VS: guest kernel
     |
     +---- VU: guest userspace
```

The Morphic goal is to share only semantics that are truly shared between the kernel and VMM while preserving real architectural differences.

## Phase X: `/dev/kvm` compatibility and QEMU/KVM

Native virtualization is not yet KVM compatibility. QEMU expects the userspace-facing KVM contract.

Indicative steps:

- `/dev/kvm`;
- API version/query surface;
- VM creation;
- guest memory regions;
- vCPU creation;
- register state;
- `KVM_RUN`-style execution;
- VM exits;
- interrupt/timer handling;
- enough architecture-specific ioctls for QEMU.

Target:

```text
RISC-V hardware
      |
      v
     Alpz
      |
      v
   Alpine
      |
      v
    QEMU
      |
      v
  /dev/kvm
      |
      v
RISC-V H extension
      |
      v
 Linux / Alpz guest
```

The milestone is ordinary QEMU believing Alpz is a usable KVM host.

## Phase XI: accelerated recursive worlds

Once QEMU/KVM is solid:

```text
physical RISC-V
      |
      v
     Alpz
      |
      v
   Alpine
      |
      v
  QEMU/KVM
      |
      v
     Alpz
      |
      v
   Alpine
```

Infinite nesting is not the objective. A few trustworthy levels prove that host/guest semantics are real and allow fast disposable reference worlds for automated experimentation.

The recursive ABI laboratory can then replace expensive TCG execution with hardware-accelerated guests where appropriate while retaining TCG and external Linux as independent oracles.

## Phase XII: containers and huge workloads

Containers belong late because they demand mature Linux process, filesystem, mount, isolation, and networking semantics.

Potential pressure includes:

- namespaces;
- cgroups;
- mount namespaces;
- pivot-root behavior;
- overlay filesystems;
- seccomp-like interfaces;
- network namespaces;
- containerd;
- OCI/Docker workloads.

Large applications then become compatibility-discovery tools rather than ends in themselves:

- Git;
- Zig compiler;
- Python;
- SQLite;
- OpenSSH;
- nginx;
- build systems;
- databases;
- language runtimes;
- container workloads.

Every large failure should be reduced to the smallest permanent reproducer that captures the missing semantic behavior.

## Milestones in plain language

```text
Batch 21C   The user/kernel memory boundary works both ways.

~22–24      A real ELF program runs.

~25         A Linux program can ask Alpz to do useful work.

~36         We have a real shell / BusyBox environment.

~44         Alpine reaches a shell.

~50s        Alpine becomes useful enough for packages/network workloads.

~QEMU       QEMU/TCG runs as an ordinary Linux application on Alpz.

Recursive   Alpz can create reference worlds and compare itself with Linux.

Debian      glibc and a second major distribution pressure the same ABI.

H extension Alpz becomes a native RISC-V virtualization host.

/dev/kvm    QEMU can use Alpz through a KVM-compatible interface.

QEMU/KVM    Hardware-accelerated guest Linux/Alpz runs under Alpz.

Later       Recursive accelerated labs, containers, and huge workloads.
```

The exact batch numbers should remain evidence-driven. If a supposedly later prerequisite is discovered earlier, isolate it as the smallest reusable primitive rather than pulling an entire future phase forward.
