# Self-hosted recursive ABI laboratory

## Purpose

The Linux-ABI effort should not treat Alpine merely as the first distribution to boot. Alpine should become the smallest useful host environment from which the kernel can test itself.

The key milestone is to push the Zig kernel far enough that an Alpine userspace can run QEMU in TCG mode. At that point the system gains a new development capability: it can create virtual machines from inside the Linux-compatible environment that it is itself providing.

That changes the development model from a one-way compatibility port into a recursive differential-testing laboratory.

## Target architecture

```text
             L0: real machine
                   │
                   ▼
             host Linux/KVM
                   │
                   ▼
        L1: OUR ZIG KERNEL
                   │
                Alpine
                   │
                QEMU/TCG
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
   L2 GOLDEN LINUX     L2 OUR KERNEL
     known kernel       newest build
          │                 │
         test              test
          │                 │
          └────────┬────────┘
                   ▼
                 DIFF
                   │
                 failure
                   │
                   ▼
              Codex fixes
                   │
                   └──── ↺
```

The L2 golden guest is a pinned, known Linux kernel and userspace used as the behavioral oracle. The second L2 guest boots the newest build of our Zig kernel. Both receive the same test input. Their observable results are normalized and compared.

A mismatch becomes a concrete implementation task rather than a vague compatibility failure.

## Why Alpine comes first

Alpine is valuable because narrowness is a feature.

The first host environment should contain only enough Linux userspace to exercise the ABI and support the development loop. Alpine gives us a compact musl-based system, BusyBox, APK, ordinary ELF binaries, shell behavior, filesystem activity, process creation, networking tools, and a real package ecosystem without dragging a large general-purpose distribution into every test iteration.

The objective is not to reproduce an entire workstation inside the guest. The objective is to reach the minimum self-hosting threshold at which Alpine can reliably launch QEMU/TCG and the test controller.

## Why QEMU/TCG is the enabling milestone

Hardware virtualization support in our kernel is not required for the first recursive laboratory.

QEMU's TCG execution path can emulate the guest CPU in software. Therefore the first version can be:

```text
our Zig kernel
    ↓
Alpine
    ↓
QEMU/TCG
    ↓
inner x86-64 virtual machine
```

This avoids making KVM compatibility, VMX/SVM support, nested virtualization, or a custom hypervisor prerequisites for Linux-ABI development.

QEMU itself is also an excellent compatibility target. Running it successfully stresses a wide range of kernel facilities at once, including threads, futexes, virtual memory, signals, timers, file descriptors, filesystem operations, polling, event notification, terminal I/O, and networking.

Therefore `qemu-system-x86_64` running under Alpine on our kernel is not merely a convenience. It is a major Linux-ABI milestone.

## Recursive development loop

Once the self-hosted laboratory exists, Codex should be able to perform the following loop mechanically:

```text
build newest kernel
       ↓
boot L2 golden Linux
       ↓
run probe
       ↓
record expected behavior
       ↓
boot L2 newest Zig kernel
       ↓
run identical probe
       ↓
normalize outputs
       ↓
compare
       ↓
PASS ───────────────► retain regression
       │
       └─ FAIL
            ↓
      isolate mismatch
            ↓
      modify implementation
            ↓
          rebuild
            ↓
            ↺
```

The loop should prefer structured outputs over terminal-text comparisons. A syscall probe should report values such as return code, errno, flags, ordering constraints, and semantic properties in a normalized form.

For example:

```json
{
  "test": "pipe2/cloexec",
  "result": "success",
  "read_fd_cloexec": true,
  "write_fd_cloexec": true
}
```

Nondeterministic values such as PIDs, addresses, timestamps, inode numbers, and random data should normally be converted into properties such as `pid_positive`, `page_aligned`, `monotonic`, or `same_inode_on_repeat` before comparison.

## Failure distillation

Large workloads are discovery tools, not permanent inner-loop dependencies.

If an Alpine program, Debian program, QEMU workload, or later container workload exposes a bug, reduce that bug to the smallest reproducer possible and keep the reproducer permanently.

```text
large userspace failure
        ↓
identify ABI disagreement
        ↓
reduce to tiny probe
        ↓
run on golden Linux
        ↓
record expected semantics
        ↓
fix Zig kernel
        ↓
retain tiny regression forever
```

Over time, the repository should accumulate compact executable knowledge rather than an ever-growing pile of heavyweight test environments.

This follows the snowball principle: every expensive discovery is compressed into a cheap permanent test.

## Trust model

The self-hosted oracle must not immediately become the only source of truth.

A bug in our kernel could corrupt QEMU or otherwise perturb the inner Linux guest. During early and middle development, retain an external authoritative oracle on the L0 host:

```text
external real Linux
       ↓
canonical expected result

self-hosted Linux under QEMU/TCG
       ↓
secondary expected result

our newest Zig kernel
       ↓
actual result
```

When the external oracle and self-hosted golden guest agree, confidence in the comparison is high. As the kernel matures, most routine work can move into the recursive laboratory while periodic external validation remains available.

## Suggested milestone order

### M0 — native execution foundation

- x86-64 kernel entry
- userspace transition
- ELF execution
- basic Linux syscall dispatch

### M1 — BusyBox baseline

- shell execution
- file descriptors
- pipes
- process lifecycle
- basic filesystem semantics

### M2 — musl / dynamic ELF

- dynamic loader requirements
- TLS
- memory mapping
- signal basics
- thread primitives

### M3 — useful Alpine

- BusyBox utilities
- musl applications
- APK
- `/proc` and required pseudo-filesystem behavior
- networking sufficient for package retrieval and test control

### M4 — QEMU/TCG self-hosting

- `qemu-system-x86_64` executes reliably under Alpine on our kernel
- serial/headless guest control works
- inner VM can boot a known Linux kernel
- VM can be reset and reused automatically

This is the inflection point. The kernel now helps generate evidence about its own incompatibilities.

### M5 — recursive differential ABI testing

- golden Linux L2 guest
- newest-kernel L2 guest
- identical probes
- normalized semantic comparison
- automated failure capture
- permanent regression generation

### M6 — broader userspace compatibility

- Debian/glibc
- larger application workloads
- additional distro checkpoints only when they expose genuinely new behavior

### M7 — container infrastructure

Only after the corresponding Linux facilities are mature should the kernel attempt to host Docker/containerd directly. At that point Docker becomes another self-hosted compatibility stressor rather than a prerequisite for the earlier loop.

### M8 — hardware virtualization acceleration

Later, replace or supplement TCG with native VMX/SVM support or a KVM-compatible interface. This is initially a performance upgrade to an already functioning recursive laboratory, not a dependency for creating it.

The longer-term intention goes further than acceleration. The kernel should eventually grow into a full hypervisor-capable experimental platform: agents should be able to create isolated guest machines recursively, boot known-good implementations of systems or subsystems relevant to the capability they are currently building, issue the same queries or workloads against both the reference implementation and our implementation, compare observable behavior, and use any discrepancy as the next concrete engineering task.

In that model, virtualization is not merely a way to run another operating system. It becomes a general mechanism for executable inquiry. When an agent needs to know how a capability is supposed to behave, it should increasingly be able to ask a real implementation by running it in a controlled guest, capture the answer, test our implementation against it, and preserve the discovered behavior as a permanent regression.

Conceptually:

```text
agent seeks capability
        ↓
select known-good implementation
        ↓
instantiate reference guest
        ↓
issue controlled query / workload
        ↓
capture observable behavior
        ↓
run same query against our system
        ↓
compare
        ↓
match ───────────────► preserve test
  │
  └─ mismatch
        ↓
   agent fixes implementation
        ↓
        ↺
```

The ultimate goal is therefore not simply self-hosting and not simply nested virtualization. It is a recursively testable system in which agents can construct temporary reference worlds as needed, interrogate actual implementations, and progressively convert those observations into compact executable knowledge inside the repository.

## Design rule

Do not optimize for the largest possible compatibility corpus.

Optimize for the smallest environment that can discover the next missing behavior, then distill every discovery into a permanent narrow test.

The desired transition is:

```text
before QEMU/TCG milestone:
    Codex helps us build the kernel

after QEMU/TCG milestone:
    the kernel increasingly helps Codex build the kernel
```

The long-term result is a self-tightening Linux-ABI implementation process in which the system repeatedly compares itself against a known Linux implementation, reduces discrepancies, fixes them, and preserves the result as executable knowledge.
