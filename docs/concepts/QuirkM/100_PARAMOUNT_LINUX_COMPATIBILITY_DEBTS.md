# 100 Paramount Linux Compatibility Debts

## Status

QuirkM research seed. **Candidate ledger entries, not 100 adjudicated Linux bugs.**

These are the first 100 pressures QuirkM should study because they sit close to core operating-system semantics, have unusually high compatibility inertia, or have later Linux interfaces that mitigate limitations while older behavior remains part of the supported software world.

“Paramount” does **not** mean Linux maintainers universally want each behavior deleted. It means that a clean-sheet native personality has an unusually valuable opportunity to learn from the history while the Linux compatibility personality preserves what existing software requires.

The promotion rule is evidence first:

```text
candidate pressure
    -> authoritative Linux/POSIX evidence
    -> real application pressure
    -> classify: bug / historical debt / superseded design / tradeoff
    -> extract fundamental capability
    -> design QuirkM counter-contract
    -> preserve Linux behavior in compatibility personality
    -> prove both sides
```

## Resource identity, descriptors, and lifetime

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0001 | File descriptors are reusable small integers. | Fundamental Unix/POSIX ABI and enormous userspace dependence. | Typed generational `ResourceHandle<T>` identities. |
| Q-0002 | A descriptor number can name an unrelated object after close/reuse. | Numeric FD semantics cannot be changed without breaking programs. | Stale native handles remain permanently invalid. |
| Q-0003 | Retrying `close()` after an error can interact badly with descriptor reuse. | Existing close semantics and implementations are ABI-visible. | Identity-safe, explicit disposal result semantics. |
| Q-0004 | Closing an FD in one thread does not provide a universal cancellation model for I/O blocked elsewhere. | Old threading and open-file-description semantics are established. | Operation lifetime and cancellation separate from handle lifetime. |
| Q-0005 | FD identity and open-file-description identity are different concepts. | `dup`, fork, locks, offsets, and flags rely on the distinction. | Make reference, object, and shared-state identity explicit. |
| Q-0006 | `dup`-family descriptors can share offsets and status flags through one open-file description. | Required Unix behavior. | Explicit `share` versus independent-open semantics in native API. |
| Q-0007 | Traditional POSIX record-lock lifetime can be surprising when any FD for the file is closed. | Standardized historical lock semantics. | Locks as owned typed resources with explicit lifetime. |
| Q-0008 | Descriptor inheritance across `exec` historically defaults toward inheritance unless controlled. | Long-standing process ABI. | Native resources non-inheritable unless explicitly transferred. |
| Q-0009 | Setting close-on-exec in a separate operation can race in multithreaded code. | Older create-then-configure APIs cannot disappear. | All inheritance policy atomic at resource creation. |
| Q-0010 | Many Linux APIs needed `*_CLOEXEC` or flag additions to repair create/configure races. | Compatibility requires old entry points indefinitely. | One generic creation policy carried by all resource constructors. |

## Process identity and construction

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0011 | PIDs are reusable integer identities. | Core Unix ABI and textual tooling depend on them. | Stable `ProcessHandle` resource as primary identity. |
| Q-0012 | PID reuse creates race windows when a numeric PID is treated as durable identity. | Numeric PID behavior is fundamental compatibility surface. | Generation-safe process references. |
| Q-0013 | `/proc/<pid>` is often used as a process-object surrogate. | Huge tooling ecosystem depends on procfs paths. | Direct typed process introspection; procfs as compatibility view. |
| Q-0014 | Linux added pidfds to provide stable process references alongside PIDs. | PIDs cannot simply be replaced. | Make the pidfd-like stable reference the native starting point. |
| Q-0015 | `fork()` implicitly duplicates a very large amount of process state. | POSIX and enormous software dependence. | Explicit `ProcessBuilder`/spawn construction. |
| Q-0016 | Many programs fork only to immediately exec, paying conceptual complexity for copied state. | Fork/exec idiom is deeply entrenched. | Native spawn directly from executable/component description. |
| Q-0017 | Fork from a multithreaded process creates a child with a restricted safe-operation window before exec. | POSIX semantics cannot be casually changed. | No native requirement to duplicate a live multithreaded process. |
| Q-0018 | `pthread_atfork` exists to coordinate fragile pre/post-fork state. | User libraries rely on it. | Structured spawn transaction and explicit resource handoff. |
| Q-0019 | `vfork()` exposes dangerous temporary address-space sharing semantics. | Kept for compatibility/performance history. | Internal optimization only; no ordinary native semantic equivalent. |
| Q-0020 | `clone`/`clone3` expose a dense combination of sharing, namespace, signal, and lifecycle options. | Linux containers/threads depend on the feature matrix. | Typed builders that reject incoherent combinations before execution. |

## Signals and asynchronous interruption

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0021 | Signals may arrive at effectively arbitrary execution points. | Core Unix process model. | Structured event delivery through normal execution contexts. |
| Q-0022 | Some interrupted syscalls restart while others return `EINTR`. | Historical syscall-specific rules are application-visible. | One explicit cancellation/completion contract. |
| Q-0023 | `SA_RESTART` changes interruption behavior but not uniformly across interfaces. | Existing signal ABI. | Restart/cancel policy belongs to operation object, not global signal folklore. |
| Q-0024 | Timeout options can change whether an interrupted operation restarts. | Existing socket/syscall behavior. | Timeout and cancellation represented as independent typed policies. |
| Q-0025 | Partial I/O before interruption can return success/short count rather than `EINTR`. | Required observable I/O semantics. | Explicit partial-completion result type. |
| Q-0026 | Job-control stop/resume can interact with interrupted blocking calls in Linux-specific ways. | Compatibility behavior already visible to programs. | Process-control events do not implicitly redefine unrelated operation semantics. |
| Q-0027 | Signal handlers are restricted to async-signal-safe operations. | Fundamental consequence of asynchronous handler execution. | Deliver native events where ordinary safe APIs are available. |
| Q-0028 | Signal masks form inherited ambient process/thread state. | POSIX-compatible semantics. | Explicit subscriptions scoped to tasks/resources. |
| Q-0029 | Some signals have special uncatchable semantics unlike ordinary signals. | Core process-control contract. | Separate force-stop/terminate controls from event delivery. |
| Q-0030 | Linux added `signalfd` so signals can participate in descriptor-based event loops. | Classic signal ABI remains mandatory. | Native events/resources are waitable from the start. |

## Paths, names, mounts, and filesystem authority

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0031 | Relative path lookup depends on ambient current working directory. | POSIX process model and shell behavior. | Explicit directory/root capability passed to operations. |
| Q-0032 | Absolute path lookup depends on process root namespace state. | Fundamental Unix pathname behavior. | Explicit namespace/root resource. |
| Q-0033 | Symlink traversal policy is security-sensitive but historically implicit. | Existing path APIs assume traditional resolution. | Typed whole-resolution policy. |
| Q-0034 | `O_NOFOLLOW` historically controls only a narrow part of path traversal. | Old `open` semantics are fixed. | Native resolution policy applies to the complete traversal. |
| Q-0035 | procfs “magic links” can have semantics beyond ordinary symbolic links. | Linux tooling and namespace machinery use them. | Distinct typed reference class, not hidden pathname magic. |
| Q-0036 | Constraining path resolution beneath/in a directory required newer interfaces such as `openat2`. | Old path APIs cannot gain incompatible semantics. | Bounded resolution is a first-class native default. |
| Q-0037 | Bind mounts mean textual ancestry does not necessarily express object authority/identity simply. | Core mount namespace feature. | Separate stable object identity from path presentation. |
| Q-0038 | Crossing mount points during lookup is often implicit unless newer policy controls are used. | Traditional lookup semantics. | Explicit crossing policy in resolver contract. |
| Q-0039 | Path strings conflate naming with authority. | Unix API tradition. | Capability/resource + relative name. |
| Q-0040 | `AT_FDCWD` reintroduces ambient cwd behavior into otherwise directory-relative APIs. | Compatibility convenience constant. | No magic ambient pseudo-handle in native contracts. |

## Filesystem observation, mutation, and object semantics

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0041 | Inotify events generally do not identify the actor that caused a change. | Existing event ABI cannot simply grow universal provenance. | Optional actor/source metadata in typed events. |
| Q-0042 | Inotify can coalesce events, complicating event counting. | Documented ABI behavior. | Explicit sequence/coalescing metadata. |
| Q-0043 | Inotify queues can overflow and lose information. | Bounded kernel queues are fundamental; old API reports loss coarsely. | Sequence numbers plus explicit lost-range/rescan contract. |
| Q-0044 | Local filesystem notification does not imply complete remote filesystem observation. | Distributed filesystems have different guarantees. | Provider advertises observation guarantees explicitly. |
| Q-0045 | Pseudo-filesystems do not always behave like ordinary storage for notification/metadata operations. | Linux exposes many kernel objects through filesystem façades. | Typed object interfaces; filesystem view optional. |
| Q-0046 | Recursive directory-tree watching is not the primitive in classic inotify. | Existing watch ABI. | Atomic subtree subscription as a native capability where supported. |
| Q-0047 | Fanotify evolved over time to cover event classes absent in earlier versions. | Old ABI versions remain supported. | Versioned typed event interface from first release. |
| Q-0048 | Directory-tree monitoring can race with tree mutation during watch setup. | Incremental watch attachment semantics. | Snapshot/subscription boundary with explicit atomicity guarantee. |
| Q-0049 | File changes through mappings do not always correspond cleanly to ordinary write-operation notifications. | VM/filesystem semantics are separate historical paths. | Define state-change events independently of syscall route. |
| Q-0050 | Hard links, bind mounts, and namespaces mean one object may have multiple names/paths. | Fundamental Unix filesystem feature. | Events expose stable object identity separately from names. |

## Memory and virtual address space

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0051 | `brk` and `mmap` represent overlapping historical ways to obtain process memory. | libc/ABI compatibility. | One memory-object and mapping model underneath allocators. |
| Q-0052 | `mmap` accumulated many interacting flags with platform/filesystem-specific meaning. | Widely used Linux/POSIX ABI. | Typed mapping builder with capability discovery. |
| Q-0053 | `MAP_FIXED` can replace existing mappings destructively. | Existing ABI explicitly permits it. | Replacement requires an explicit destructive authority/policy. |
| Q-0054 | Reservation/overcommit means successful mapping does not always imply future physical backing. | Linux memory-management policy and compatibility. | Explicit reserve/commit guarantees. |
| Q-0055 | OOM policy may terminate processes asynchronously rather than fail one allocation deterministically. | System-wide overcommit/resource policy. | Resource domains with explicit memory commitment contracts. |
| Q-0056 | File-mapping coherence/durability behavior depends on mapping mode and backing filesystem. | POSIX/filesystem semantics. | Mapping object exposes coherence and persistence guarantees. |
| Q-0057 | Backing object identity, address-space placement, and protection are combined in mapping APIs. | Existing mmap contract. | Separate memory object from mapping instance and protection. |
| Q-0058 | `SIGSEGV` has historically been reused by applications to emulate demand paging/fault handling. | Signal/VM ABI cannot be repurposed wholesale. | First-class typed memory-fault channel. |
| Q-0059 | Linux added `userfaultfd` for controlled userspace fault handling. | Existing signal-based mechanisms remain. | Fault resource/event is native rather than an afterthought. |
| Q-0060 | Huge-page policy is exposed through several special interfaces/flags/configurations. | Hardware and legacy API diversity. | Discoverable page-size/placement policy on memory objects. |

## Waiting, readiness, and I/O completion

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0061 | `select` interfaces are constrained by descriptor-set representation in common libc environments. | POSIX API and source compatibility. | No bitmap tied to numeric handle range. |
| Q-0062 | `select` mutates fd sets in place, requiring callers to rebuild them. | Standardized interface semantics. | Immutable subscription description + separate result set. |
| Q-0063 | `select` requires the highest numeric FD plus one. | Historical descriptor-array optimization encoded in API. | Wait cost independent of identifier magnitude. |
| Q-0064 | `poll` repeatedly scans caller arrays rather than representing persistent subscriptions. | POSIX ABI. | Persistent wait-set/subscription objects. |
| Q-0065 | `epoll` introduced another API/object to address scaling and persistence pressure. | `select`/`poll` cannot be broken or removed. | One native wait/completion substrate with compatibility adapters. |
| Q-0066 | Edge-triggered epoll requires careful drain-until-`EAGAIN` discipline. | Existing readiness semantics. | Explicit readiness/completion mode and safer state transitions. |
| Q-0067 | Epoll semantics depend on FD versus open-file-description identity. | Descriptor compatibility behavior. | Subscribe to typed resource/object identity explicitly. |
| Q-0068 | Closing or duplicating monitored descriptors can produce non-obvious lifetime behavior. | Existing descriptor/epoll contracts. | Subscription lifetime explicitly owns/borrows resource references. |
| Q-0069 | Readiness can be advisory/spurious, so programs must still tolerate failed/nonblocking operations. | Readiness is not completion. | Prefer completion tokens where operations support true completion. |
| Q-0070 | Signals, timers, process events, and notifications gained separate `*fd` adapters to join FD-centric loops. | Existing APIs remain heterogeneous. | One waitable resource/event model natively. |

## Synchronization and threading

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0071 | Original futex ABI accumulated limitations later work tries to address. | pthreads and runtimes depend heavily on existing futex behavior. | Design native wait primitives around modern requirements. |
| Q-0072 | Waiting on multiple futexes required later interfaces such as futex2 wait vectors. | Original ABI shape cannot be incompatibly widened. | Wait-many is fundamental. |
| Q-0073 | Futex synchronization identity is based directly on userspace memory locations. | Key to futex efficiency and ABI. | Typed sync resources or explicit memory-key contract. |
| Q-0074 | Private/shared futex interpretation is expressed by low-level flags. | Existing API. | Sharing domain is an explicit typed property. |
| Q-0075 | Different wait APIs select clocks/timeouts differently. | Historical API-by-API evolution. | Clock and deadline are explicit common types. |
| Q-0076 | Priority inheritance uses specialized futex operation families. | Scheduler integration was added onto existing primitive. | Scheduling interaction declared in sync-object policy. |
| Q-0077 | Robust mutex owner-death recovery uses a specialized userspace/kernel protocol. | pthread ABI and crash-recovery needs. | Owner-death/recovery state as a first-class contract. |
| Q-0078 | Cancellation, timeout, signals, and futex waiting are difficult to compose uniformly. | Separate historical control systems. | Unified cancellation/deadline/completion token model. |
| Q-0079 | Linux task/thread IDs and process IDs have overlapping historical terminology and APIs. | Unix process model evolved into threading later. | Distinct typed `Process` and `Task/Thread` resources. |
| Q-0080 | Important threading semantics are split between kernel interfaces and libc conventions. | POSIX pthread abstraction intentionally lives partly in userspace. | Machine-readable native synchronization contracts independent of libc folklore. |

## ioctl and binary ABI extensibility

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0081 | `ioctl(fd, number, pointer)` is weakly typed at the syscall boundary. | Huge device ABI ecosystem. | Typed/versioned operation schemas. |
| Q-0082 | Ioctl command-number conventions can be defined inconsistently. | Existing driver ABIs cannot be renumbered. | Generated interface/operation identity. |
| Q-0083 | A poorly designed ioctl ABI becomes extremely difficult to repair after release. | Kernel userspace ABI stability. | Versionable contracts before first publication. |
| Q-0084 | 32-bit userspace on 64-bit kernels can require compatibility translation. | Multi-ABI support. | Canonical width-independent wire representations. |
| Q-0085 | C `long` and pointer-sized fields vary across ABIs. | C ABI history. | Fixed-width public scalar types. |
| Q-0086 | Raw pointers embedded in public ioctl structs complicate compatibility and validation. | Existing driver interfaces. | Handles, offsets, slices, or validated shared-memory references. |
| Q-0087 | Structure alignment/padding differs by architecture and compiler ABI. | Native C struct ABI dependence. | Explicit canonical layout/serialization. |
| Q-0088 | C bitfields/enums can carry implementation/ABI subtleties. | Existing C-language interfaces. | Explicit integer widths and generated bindings. |
| Q-0089 | Plain `char` signedness differs across architectures. | C implementation choice leaks into ABI if used carelessly. | Explicit byte/u8/i8 types. |
| Q-0090 | Unsupported ioctl requests have historical error-code inconsistencies across subsystems. | Old userspace may depend on observed behavior. | One typed unsupported-operation result, translated per Linux adapter. |

## Privilege, namespaces, introspection, and system control

| ID | Linux pressure / compatibility debt | Why it is sticky | QuirkM research direction |
|---|---|---|---|
| Q-0091 | Traditional uid-0/root represents extremely broad ambient authority. | Foundational Unix administration model. | Explicit delegated capabilities/resources. |
| Q-0092 | `CAP_SYS_ADMIN` accumulated an unusually broad collection of privileged operations. | Capability ABI cannot easily be repartitioned retroactively. | Small capability domains; resist catch-all authority bits. |
| Q-0093 | Linux process capabilities use multiple interacting sets: permitted, effective, inheritable, bounding, ambient. | Security ABI evolved incrementally while preserving compatibility. | Simpler explicit authority grants/attenuation model. |
| Q-0094 | Authority transformations across `execve` involve intricate inherited state. | Linux credential/capability compatibility. | Spawn receives an explicit final authority set. |
| Q-0095 | cgroup v1 allowed multiple independent hierarchies with difficult controller interactions. | Deployed systems required compatibility while cgroup v2 emerged. | One coherent typed resource-governance hierarchy natively. |
| Q-0096 | cgroup v1 controller placement and hierarchy choices could constrain later composition. | Existing v1 deployments remain supported. | Composition rules encoded in one common resource-domain model. |
| Q-0097 | `/proc` exposes system/process state through text-shaped pseudo-files. | Enormous tooling and script ecosystem. | Typed introspection as truth; procfs generated for compatibility. |
| Q-0098 | `/sys` exposes object/device state through a filesystem-shaped interface whose internal topology can tempt fragile dependencies. | Linux userspace ABI rules preserve established attributes. | Typed discoverable object interfaces; sysfs as compatibility view. |
| Q-0099 | System control is distributed across syscalls, procfs, sysfs, ioctls, netlink, special filesystems, and subsystem-specific mechanisms. | Decades of incremental subsystem growth. | Unified typed operation/introspection plane where concepts overlap. |
| Q-0100 | Once a Linux userspace ABI is depended upon, removal or incompatible cleanup is intentionally extremely difficult. | Stable userspace ABI is a core Linux strength and obligation. | Version native contracts from day one and quarantine compatibility debt instead of inheriting it. |

## What makes these “paramount”

The common pattern is not “Linux bad.” It is **compatibility gravity**:

```text
useful early interface
        -> enormous software adoption
        -> edge cases become observable contract
        -> better interface can be added
        -> old interface still cannot simply vanish
```

QuirkM has a different starting position. It can preserve the old behavior in its Linux personality while making the cleaner contract the native default.

For every Q-0001..Q-0100 entry, the eventual ledger should record evidence, classification, the exact Linux compatibility obligation, a QuirkM counterdesign, and two proofs:

```text
Linux compatibility proof
native counter-proof
```

The 100 entries above are the first research queue, not the final verdict.