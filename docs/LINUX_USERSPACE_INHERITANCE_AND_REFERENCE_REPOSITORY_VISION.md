# Linux Userspace Inheritance and Reference-Repository Vision

Alpz provides an unusually demanding place to test whether these ideas continue to work after the repository stops being small.

The long-term kernel objective is not to rebuild an application ecosystem. It is to satisfy Linux userspace contracts accurately enough that existing software can run without Alpz-specific ports.

The intended relationship is:

```text
Linux userspace software
        ↓
Linux userspace contracts and ABI
        ↓
Alpz-native implementations whose compatibility is explicit and evidenced
```

Linux is the contract. Real distributions are the proofs.

A useful progression is to establish three materially different distribution families:

```text
Alpine
  musl + BusyBox + apk

Debian
  glibc + GNU userspace + apt/dpkg

Fedora
  glibc + RPM ecosystem + modern Linux interface pressure
```

These are not three independent kernel ABIs. They are three broad real-world consumers of the same Linux-facing kernel boundary. If Alpz can boot them, run dynamically linked applications from them, and use their native package managers without distribution-specific fakery, Alpz gains access to a vast body of existing userspace engineering rather than recreating it.

The desired leverage is:

```text
implement and prove kernel-facing contracts once
        ↓
inherit musl and glibc userspace
        ↓
inherit BusyBox and GNU tools
        ↓
inherit apk, apt/dpkg, and RPM package ecosystems
        ↓
inherit increasingly large portions of ordinary Linux software
```

This must never become a blanket claim that every Linux program works. Kernel modules, unusual ioctls, eBPF, KVM, advanced namespace behavior, GPU stacks, device-specific interfaces, and other deep Linux dependencies may remain unsupported long after normal applications work. Compatibility should therefore be earned by executable profiles and concrete evidence rather than inferred from resemblance.

The three-distribution milestone is important for Z-Ref for another reason. It would make Alpz a large, consequential systems specimen on which agent-engineering claims can be tested honestly.

The stronger ambition is not merely:

> Alpz can run Alpine, Debian, and Fedora userspaces.

It is:

> A fresh capable coding agent can make validated changes to that increasingly complicated system with less rediscovery, less instruction, fewer wrong hypotheses, fewer human interventions, and less unnecessary new code than would normally be expected from a system of comparable capability.

That claim must be measured rather than advertised into existence.

Useful comparisons should hold the model, task, starting revision, and acceptance criteria as constant as practical, then measure:

```text
0-to-Done time
source bytes read
files opened
searches performed
tool calls
wrong hypotheses
failed implementation attempts
human interventions
new lines required for already-solvable capability
regressions introduced
proof coverage
final acceptance evidence
```

The most revealing mature tests may start from frozen historical states rather than from artificial puzzles.

Examples:

```text
Port this repository across a breaking Zig release and restore every machine proof.

Take Alpz-Min and restore it to the frozen Alpine-Shell compatibility profile.

Bring Alpz-Min to a frozen higher Linux-userspace compatibility target.

Port Alpz-Min to another systems language while preserving externally observable contracts and machine evidence.
```

A single agent run may internally perform thousands of reads, edits, builds, emulator executions, failures, diagnoses, and retries. The important compression is at the human boundary: a small specification can mobilize a large body of already solved engineering without requiring the human to restate the route.

The desired long-term curve is therefore not simply “agents write more code.” It is:

```text
repository capability grows
        +
canonical knowledge grows
        +
contracts and evidence grow
        +
composition routes grow
        ↓
agent rediscovery cost grows slowly, stays flat, or falls
        ↓
small instructions can produce increasingly large validated consequences
```

If that result becomes reproducible, Z-Ref can aspire to become a reference for **agent-native repository engineering**: not because Alpz is the only kernel worth using, but because Alpz demonstrates how a serious system can explain enough of itself for new agents to begin above the work already completed.

The knowledge should eventually be portable beyond Alpz as well. A hobby-kernel author should not have to discard the kernel through which they learned operating systems merely to benefit from mature Linux userspace compatibility knowledge. Where contracts are sufficiently separated from Alpz internals, another kernel should be able to map its own memory manager, scheduler, process model, VFS, and device machinery onto the same externally tested compatibility obligations.

The community-facing principle is:

> **Keep your kernel. Bring the world to it.**

The research-facing principle is:

> **Make solved engineering remain solved, even for the next machine that arrives.**

The success condition is not that these phrases sound persuasive. It is that independent agents and engineers can reproduce the result.
