# Another 400 Linux Issues

## Status

QuirkM research backlog, Q-0101 through Q-0500.

These are **candidate design pressures**, not 400 proven Linux defects and not a claim that every item is uniquely Linux. They include historical ABI debt, sharp edges, subsystem-specific conventions, portability traps, superseded interfaces, composability problems, and places where a clean native contract may be able to make a safer or simpler default.

An entry earns promotion only after evidence classifies it as one or more of:

```text
BUG                 demonstrably incorrect behavior
HISTORICAL_DEBT     awkward behavior retained for compatibility
SUPERSEDED          newer interface mitigates an older limitation
TRADEOFF            reasonable Linux choice; QuirkM may choose differently
ECOSYSTEM_PRESSURE  kernel + libc + distro/userspace interaction worth simplifying
QUIRKM_OPPORTUNITY  clean-sheet native contract can plausibly improve the default
```

The list is deliberately broad. The first 100 paramount debts live in `100_PARAMOUNT_LINUX_COMPATIBILITY_DEBTS.md`; those should receive research priority.

---

## Q-0101–Q-0125 — descriptor and I/O edge cases

- **Q-0101** — Descriptor flags and open-file status flags live at different identity levels. QuirkM: make per-handle and per-object state visibly different types.
- **Q-0102** — `fcntl` multiplexes unrelated descriptor, locking, signal, lease, pipe, and sealing operations. QuirkM: typed operation families.
- **Q-0103** — `fcntl` command arguments vary in type despite one variadic-looking API surface. QuirkM: generated strongly typed calls.
- **Q-0104** — Nonblocking mode is often object/open-description state rather than operation-local policy. QuirkM: allow explicit per-operation nonblocking/deadline policy.
- **Q-0105** — `O_ASYNC`/SIGIO mixes descriptor I/O with asynchronous signal delivery. QuirkM: completion subscriptions instead of signals.
- **Q-0106** — File offsets are shared by duplicated descriptors referencing one open description. QuirkM: explicit shared cursor objects or offset-at-operation APIs.
- **Q-0107** — `pread`/`pwrite` exist partly to escape shared file-offset races. QuirkM: positional I/O is a first-class operation, not a corrective variant.
- **Q-0108** — `readv`/`writev` add scatter/gather through separate syscall families. QuirkM: slices/vectors as ordinary buffer descriptors.
- **Q-0109** — `preadv2`/`pwritev2` add flags after earlier vector APIs could not express new policy. QuirkM: extensible typed request objects.
- **Q-0110** — `sendfile`, `splice`, `tee`, and `copy_file_range` expose several zero-copy-ish transfer shapes. QuirkM: one resource-to-resource transfer abstraction with capability discovery.
- **Q-0111** — Not every FD supports every apparently generic operation. QuirkM: interface discovery on typed resources.
- **Q-0112** — `lseek` has special meanings such as `SEEK_DATA`/`SEEK_HOLE` whose support varies by filesystem. QuirkM: queryable sparse-file interface.
- **Q-0113** — `fsync`, `fdatasync`, and sync-related open/write flags expose multiple durability levels inconsistently across storage stacks. QuirkM: explicit durability contract.
- **Q-0114** — Short reads/writes require every caller to understand partial progress. QuirkM: make partial completion structurally explicit and provide exact helpers in userspace.
- **Q-0115** — `EAGAIN` and `EWOULDBLOCK` overlap historically. QuirkM: one semantic would-block result.
- **Q-0116** — Error reporting can be delayed until later write/fsync/close operations. QuirkM: operation and durability completion objects carry deferred failures explicitly.
- **Q-0117** — Pipe capacity and atomic-write guarantees are separate details callers must learn. QuirkM: queryable stream guarantees.
- **Q-0118** — Pipe/FIFO open semantics can block depending on peer state. QuirkM: explicit endpoint creation/connect phases.
- **Q-0119** — `eventfd` exists as a specialized counter-shaped FD. QuirkM: typed counter/event resource.
- **Q-0120** — `timerfd` exists as a specialized timer-shaped FD. QuirkM: typed timer resource that is inherently waitable.
- **Q-0121** — `memfd` repurposes FD semantics for anonymous memory objects. QuirkM: memory object is a native resource class.
- **Q-0122** — Seals on memfd are expressed through `fcntl`. QuirkM: rights attenuation/sealing is native resource policy.
- **Q-0123** — `close_range` was added because iterating guessed FD ranges is awkward and racy. QuirkM: resource-table operations as first-class process operations.
- **Q-0124** — `/dev/fd`, procfs fd paths, and numeric descriptors create multiple representations of one resource reference. QuirkM: typed reference is canonical; textual forms are views.
- **Q-0125** — Descriptor exhaustion errors expose process/global limits but not necessarily actionable structured quota information. QuirkM: explicit resource-domain quota introspection.

## Q-0126–Q-0150 — paths, directories, mounts, and naming

- **Q-0126** — `PATH_MAX` assumptions are unreliable across real path-resolution scenarios. QuirkM: bounded path objects with dynamic lengths and provider limits.
- **Q-0127** — `NAME_MAX` varies by filesystem. QuirkM: namespace provider exposes exact naming limits.
- **Q-0128** — `getcwd` can fail or produce surprising states after directory renames/unlinks. QuirkM: current-directory handle remains primary; textual path is optional presentation.
- **Q-0129** — Deleted-but-open files remain usable without a pathname. QuirkM: object identity explicitly independent of names.
- **Q-0130** — Rename atomicity guarantees vary by filesystem and operation variant. QuirkM: capability query for atomic namespace transactions.
- **Q-0131** — `renameat2` adds flags because classic rename could not express exchange/noreplace/whiteout semantics. QuirkM: typed rename transaction options from v1.
- **Q-0132** — Hard-link semantics complicate assumptions that a file has one parent/name. QuirkM: identity and names are separate concepts.
- **Q-0133** — Symlink contents are untyped path text. QuirkM: native resolver can expose link object separately from traversal.
- **Q-0134** — Mount operations historically use path strings to identify both source and target. QuirkM: mount graph manipulates resource handles.
- **Q-0135** — Newer mount APIs add FD-based mount objects alongside old path-based mount syscalls. QuirkM: object-based mounting is native.
- **Q-0136** — Lazy unmount semantics can detach namespace visibility while references remain alive. QuirkM: explicit detach versus destroy lifecycle states.
- **Q-0137** — Mount propagation (`shared`, `slave`, `private`, `unbindable`) is powerful but conceptually dense. QuirkM: typed propagation graph with introspection.
- **Q-0138** — Overlay/union filesystems expose whiteout and copy-up semantics that applications may accidentally observe. QuirkM: provider advertises overlay semantics explicitly.
- **Q-0139** — Case sensitivity is filesystem-dependent and sometimes configurable. QuirkM: namespace comparison/canonicalization policy discoverable per directory.
- **Q-0140** — Unicode normalization behavior is not one universal Linux pathname rule. QuirkM: byte-name versus text-name contracts are explicit.
- **Q-0141** — Filename encoding is convention rather than a universally enforced kernel text model. QuirkM: distinguish opaque byte names from validated text APIs.
- **Q-0142** — `chroot` is historically path/credential based and not a complete isolation primitive. QuirkM: namespace/root capability is explicit and composable.
- **Q-0143** — Pivoting/changing process root interacts with mounts and working directories in subtle ways. QuirkM: construct namespace before spawn rather than mutate ambient root state.
- **Q-0144** — Directory iteration uses cookie/offset semantics that can be unstable under concurrent mutation. QuirkM: explicit snapshot or weak-iteration contract.
- **Q-0145** — `readdir` exposes filesystem-provided `d_type` that may be unknown. QuirkM: type query guarantees are explicit.
- **Q-0146** — Path-based metadata operations have race windows between lookup and action. QuirkM: resolve to resource then operate on identity.
- **Q-0147** — `stat`, `lstat`, `fstat`, `fstatat`, and `statx` reflect generations of metadata API evolution. QuirkM: one extensible typed metadata query.
- **Q-0148** — `statx` masks are needed because not every filesystem can supply every field. QuirkM: capability/missing-field representation built into metadata types.
- **Q-0149** — Device numbers embedded in filesystem metadata expose historical major/minor identity schemes. QuirkM: stable device resource identity separate from compatibility numbers.
- **Q-0150** — Automount and network mount lookup may turn path traversal into blocking external work. QuirkM: resolver exposes potentially asynchronous provider transitions.

## Q-0151–Q-0175 — storage and filesystem semantics

- **Q-0151** — `fsync` on a file may not imply directory-entry durability. QuirkM: durability scope named explicitly.
- **Q-0152** — Application crash consistency often requires subtle sequences of write/fsync/rename/fsync-directory. QuirkM: transactional persistence helpers/contracts.
- **Q-0153** — Sparse files may report logical size far larger than physical allocation. QuirkM: logical and allocated extents are distinct typed properties.
- **Q-0154** — Hole punching uses specialized `fallocate` flags. QuirkM: extent manipulation interface.
- **Q-0155** — `fallocate` modes differ in support across filesystems. QuirkM: query operation support before use.
- **Q-0156** — Direct I/O alignment rules vary by filesystem/device/kernel path. QuirkM: resource advertises exact buffer/alignment constraints.
- **Q-0157** — `O_DIRECT` semantics and cache coherence require application-specific knowledge. QuirkM: explicit cached/direct I/O modes with coherence contract.
- **Q-0158** — `O_SYNC`, `O_DSYNC`, `RWF_SYNC`, and related flags encode overlapping durability choices. QuirkM: one durability policy type.
- **Q-0159** — File leases combine file access coordination with signals. QuirkM: lease resource + waitable event channel.
- **Q-0160** — Mandatory locking existed historically with surprising semantics and poor portability. QuirkM: no implicit mandatory locking; explicit lock service only.
- **Q-0161** — POSIX locks and open-file-description locks have different ownership/lifetime models. QuirkM: one explicit lock-owner identity.
- **Q-0162** — BSD `flock` and POSIX record locks historically differ and interact differently across filesystems. QuirkM: typed lock families or one coherent native model.
- **Q-0163** — Network filesystems can weaken or reinterpret local locking assumptions. QuirkM: lock provider states guarantee level.
- **Q-0164** — Extended attributes are namespaced byte blobs with subsystem conventions. QuirkM: typed metadata interfaces layered over a generic attribute store.
- **Q-0165** — ACL semantics span POSIX mode bits, POSIX ACLs, NFSv4-style ACLs, and filesystem capabilities. QuirkM: explicit authorization policy objects.
- **Q-0166** — File mode bits conflate owner/group/other policy with executable and special bits. QuirkM: compatibility mode bits mapped onto richer rights policy.
- **Q-0167** — setuid/setgid file semantics make privilege transitions depend on executable metadata. QuirkM: authority transitions explicit in spawn policy.
- **Q-0168** — File capabilities likewise attach execution authority to filesystem metadata. QuirkM: signed/delegated execution capability descriptors with explicit acceptance.
- **Q-0169** — `umask` is ambient process state affecting future creations. QuirkM: creation permissions are explicit per operation or builder default object.
- **Q-0170** — Timestamp update rules (`atime`, `relatime`, `noatime`, lazytime) vary by mount/filesystem policy. QuirkM: timestamp behavior queryable and opt-in where possible.
- **Q-0171** — Nanosecond timestamps do not imply equal actual clock/storage resolution. QuirkM: metadata includes precision/accuracy guarantees.
- **Q-0172** — inode numbers are filesystem-local and may be reused. QuirkM: stable live object handle, optional persistent provider identity.
- **Q-0173** — Filesystem freeze/snapshot behavior is subsystem-specific. QuirkM: explicit snapshot/freeze capability interface.
- **Q-0174** — Copy-on-write/reflink behavior requires filesystem-specific support and ioctl/history. QuirkM: native clone-range capability.
- **Q-0175** — Error handling after storage-device failure varies across filesystem and block layers. QuirkM: structured health/failure provenance on persistent resources.

## Q-0176–Q-0200 — memory and VM follow-on pressures

- **Q-0176** — `mprotect` mutates protection on address ranges without object-level ownership vocabulary. QuirkM: mapping handle owns protection transitions.
- **Q-0177** — W+X policy is largely process/security-policy dependent rather than a capability distinction in the mapping type. QuirkM: executable mapping requires explicit executable-memory authority.
- **Q-0178** — JITs often need writable-then-executable transitions with platform-specific hardening rules. QuirkM: dedicated JIT memory contract.
- **Q-0179** — `mremap` exposes Linux-specific mapping-resize/move semantics. QuirkM: resize/move as memory-object/mapping operations with explicit invalidation.
- **Q-0180** — `madvise` multiplexes many unrelated VM policy hints. QuirkM: typed policy interfaces by concern.
- **Q-0181** — Some `madvise` choices are hints; others have strong destructive semantics. QuirkM: separate advisory and state-changing operations.
- **Q-0182** — `mlock`/`mlockall` interact with quotas and privilege limits. QuirkM: pinned-memory resource budget explicit.
- **Q-0183** — Locked memory accounting is process/user-policy dependent. QuirkM: resource-domain reservation object.
- **Q-0184** — NUMA policy is exposed through specialized calls and bitmask representations. QuirkM: topology-aware placement policy object.
- **Q-0185** — NUMA node IDs are numeric topology identities that may not be portable. QuirkM: topology resources with properties.
- **Q-0186** — Transparent huge pages can change behavior/performance without application-level explicit allocation. QuirkM: explicit or queryable page-promotion policy.
- **Q-0187** — Memory pressure notification and reclamation are spread across cgroups, procfs, PSI, OOM, and subsystem interfaces. QuirkM: unified memory-domain telemetry/events.
- **Q-0188** — `mincore`/residency information has security and portability caveats. QuirkM: explicit introspection right and defined granularity.
- **Q-0189** — `/proc/<pid>/mem` and process_vm_* expose different mechanisms for cross-process memory access. QuirkM: one rights-bearing process-memory interface.
- **Q-0190** — ptrace can read/write process memory while also serving debugger/control roles. QuirkM: debugger, memory, register, and stop-control rights are separable.
- **Q-0191** — Shared anonymous memory has multiple creation paths (`mmap`, shm, memfd, tmpfs). QuirkM: one native shared-memory object.
- **Q-0192** — SysV shared memory remains alongside POSIX and mmap-based mechanisms. QuirkM: compatibility adapter over one memory-object substrate.
- **Q-0193** — SysV IPC IDs are reusable integers with global/namespace tables. QuirkM: generational resource handles.
- **Q-0194** — HugeTLB has separate reservation/accounting interfaces from ordinary VM. QuirkM: page class as memory-object policy.
- **Q-0195** — Memory deduplication/KSM can create cross-process side effects/security considerations. QuirkM: explicit dedup domain and consent policy.
- **Q-0196** — Secret memory and protected mappings require specialized APIs. QuirkM: confidentiality is a memory-object property/capability.
- **Q-0197** — Device memory mappings use subsystem-specific validation and cacheability rules. QuirkM: typed device-memory region with explicit mapping attributes.
- **Q-0198** — DMA buffers use specialized heaps, dma-buf FDs, and synchronization conventions. QuirkM: transferable buffer resource with coherent ownership/sync contract.
- **Q-0199** — Page-fault outcomes can surface as multiple signals/error modes depending on cause. QuirkM: structured memory-fault reasons.
- **Q-0200** — Address-space randomization and fixed-address compatibility requirements pull mapping policy in opposite directions. QuirkM: loader/mapping policy explicitly declares relocation/fixed-address needs.

## Q-0201–Q-0225 — processes, threads, lifecycle, and credentials

- **Q-0201** — Process groups, sessions, and controlling terminals form overlapping historical job-control abstractions. QuirkM: explicit job/session resources.
- **Q-0202** — Orphaned process-group rules are surprising outside shell/job-control specialists. QuirkM: lifecycle policy attached to job resource.
- **Q-0203** — Double-fork daemonization is a user-space ritual built around session/parent semantics. QuirkM: spawn a detached service directly.
- **Q-0204** — Reparenting traditionally targets init/subreapers through implicit lifecycle rules. QuirkM: explicit supervisor ownership.
- **Q-0205** — Zombie processes exist until parent wait/reap behavior consumes status. QuirkM: process completion is a resource result with bounded retention policy.
- **Q-0206** — `wait`, `waitpid`, `waitid`, pidfds, and SIGCHLD offer several ways to observe child state. QuirkM: one completion interface plus compatibility adapters.
- **Q-0207** — SIGCHLD configuration changes zombie/reaping semantics. QuirkM: reaping policy belongs to supervisor/job resource.
- **Q-0208** — Exit status is compressed into historical wait-status encodings. QuirkM: structured termination reason/status.
- **Q-0209** — Core-dump state is folded into process termination conventions. QuirkM: crash artifact is explicit optional resource.
- **Q-0210** — Credential changes use many uid/gid calls with real/effective/saved IDs. QuirkM: immutable credential object replaced transactionally.
- **Q-0211** — Supplementary groups are ambient process credential state. QuirkM: authority set explicit in process builder.
- **Q-0212** — User namespaces reinterpret uid/gid values through mappings. QuirkM: identity is namespace-qualified typed data.
- **Q-0213** — `/proc` exposes several representations of task/thread/process relationships. QuirkM: typed process/task graph query.
- **Q-0214** — `prctl` multiplexes many unrelated per-process controls. QuirkM: typed process-control interfaces.
- **Q-0215** — `personality(2)` changes process execution quirks through a bitfield. QuirkM: explicit compatibility personality descriptor.
- **Q-0216** — Seccomp mode and filters are installed through process-global mutation. QuirkM: sandbox policy finalized in spawn builder or attenuated explicitly.
- **Q-0217** — `no_new_privs` is a corrective security state needed to constrain later exec transitions. QuirkM: no implicit privilege growth by default.
- **Q-0218** — Thread creation through clone semantics exposes implementation details beneath pthreads. QuirkM: native thread/task constructor.
- **Q-0219** — Thread-local storage setup differs by architecture ABI. QuirkM: one architecture-neutral native runtime contract with machine adapter.
- **Q-0220** — Thread cancellation in POSIX is largely libc-level and interacts awkwardly with syscalls. QuirkM: cancellation token integrated with waits/operations.
- **Q-0221** — Thread names have multiple interfaces/length limits. QuirkM: metadata property with one contract.
- **Q-0222** — CPU affinity is represented through architecture/size-sensitive masks. QuirkM: topology set object.
- **Q-0223** — Scheduling attributes span multiple syscalls/policies with privilege rules. QuirkM: typed scheduling contract and resource-domain policy.
- **Q-0224** — Nice values, real-time priorities, deadline scheduling, and cgroups form multiple control planes. QuirkM: composable scheduling policy hierarchy.
- **Q-0225** — Process death can leave external resources requiring ad-hoc cleanup protocols. QuirkM: ownership/supervision model supports deterministic resource revocation.

## Q-0226–Q-0250 — signals, timers, clocks, and events

- **Q-0226** — Standard signals coalesce while real-time signals queue. QuirkM: event type declares queue/coalesce semantics explicitly.
- **Q-0227** — Signal numbers and default actions are historical global conventions. QuirkM: typed event/control identifiers.
- **Q-0228** — Real-time signal number ranges can be affected by libc/runtime reservations. QuirkM: no application-visible numeric allocation game.
- **Q-0229** — Signal payload types depend on union-like `siginfo_t` interpretation. QuirkM: tagged structured event payloads.
- **Q-0230** — Alternate signal stacks are needed because handlers may run when the ordinary stack is unusable. QuirkM: crash/fault handlers run on dedicated runtime-managed context.
- **Q-0231** — `sigaction` flags combine unrelated handler policies. QuirkM: typed subscription options.
- **Q-0232** — `alarm`, `setitimer`, POSIX timers, timerfd, and clock_nanosleep overlap historically. QuirkM: one timer object family.
- **Q-0233** — Interval timers can deliver through signals. QuirkM: timer completion is waitable without asynchronous signal injection.
- **Q-0234** — CLOCK_REALTIME jumps with wall-clock adjustment while monotonic clocks do not. QuirkM: clock types are non-interchangeable at type level.
- **Q-0235** — Multiple monotonic-ish clocks (`MONOTONIC`, `BOOTTIME`, raw variants) encode subtle inclusion/adjustment differences. QuirkM: clock properties discoverable and named by semantics.
- **Q-0236** — CPU-time clocks have special process/thread identity forms. QuirkM: timing interface hangs from process/task resources.
- **Q-0237** — Absolute versus relative timeout semantics vary across APIs. QuirkM: deadline and duration are different types.
- **Q-0238** — Timeout structures historically use different field widths and Y2038 compatibility paths. QuirkM: fixed-width time representation from v1.
- **Q-0239** — Leap seconds and wall-clock corrections can surprise naive elapsed-time code. QuirkM: elapsed-time APIs cannot accidentally accept civil-time clocks.
- **Q-0240** — Time namespaces alter selected clocks for containers. QuirkM: clock resource can be virtualized explicitly.
- **Q-0241** — `nanosleep` interruption requires remainder handling. QuirkM: wait result carries deadline/cancellation state directly.
- **Q-0242** — Timer overrun accounting varies by timer delivery mechanism. QuirkM: timer event includes missed-expiration count consistently.
- **Q-0243** — File timestamp clocks and application timer clocks are separate conceptual worlds. QuirkM: timestamp provenance/clock domain explicit.
- **Q-0244** — `epoll_pwait`/`pselect` exist to atomically combine waiting with temporary signal masks. QuirkM: subscriptions and cancellation/events compose without signal-mask races.
- **Q-0245** — Self-pipe tricks historically turn signals into pollable bytes. QuirkM: native event resources eliminate the ritual.
- **Q-0246** — Wakeup descriptors can overflow/coalesce according to mechanism. QuirkM: event queue capacity/loss behavior explicit.
- **Q-0247** — `inotify`, fanotify, netlink, signalfd, timerfd, eventfd, and pidfd all feed event loops differently. QuirkM: common wait/completion interface over typed resources.
- **Q-0248** — System suspend affects clocks and timers differently. QuirkM: clock/timer type declares suspend behavior.
- **Q-0249** — Realtime clock changes can unexpectedly expire absolute timers. QuirkM: timer policy explicitly declares response to clock adjustment.
- **Q-0250** — Timer slack is a process/thread tuning mechanism with obscure power/performance effects. QuirkM: scheduler/power tolerance is explicit optional deadline metadata.

## Q-0251–Q-0275 — synchronization, readiness, and concurrency

- **Q-0251** — `epoll` cannot represent all completion-oriented I/O semantics by itself. QuirkM: readiness and completion are separate interfaces sharing one wait set.
- **Q-0252** — io_uring introduces a second major async execution/completion model beside epoll. QuirkM: asynchronous operation submission is foundational rather than bolted beside readiness.
- **Q-0253** — io_uring feature availability varies by kernel version and operation. QuirkM: operation capabilities/version discovery is mandatory.
- **Q-0254** — io_uring has complex registered-buffer/file optimization paths. QuirkM: resource registration/pinning expressed generically.
- **Q-0255** — Async I/O cancellation is operation-specific and race-sensitive. QuirkM: every cancellable operation has stable operation identity.
- **Q-0256** — Completion can race with cancellation. QuirkM: terminal operation state machine defined once.
- **Q-0257** — `poll` readiness flags mix normal, error, hangup, priority, and invalid-descriptor states. QuirkM: typed readiness facets.
- **Q-0258** — HUP/EOF semantics vary by stream/socket/pipe type. QuirkM: stream shutdown state is explicit.
- **Q-0259** — File descriptors for regular files are often always “ready,” making readiness abstraction semantically uneven. QuirkM: resource advertises whether readiness is meaningful.
- **Q-0260** — Exclusive epoll wakeups were added to reduce thundering-herd behavior. QuirkM: wait subscription includes consumer/arbitration policy.
- **Q-0261** — Condition-variable spurious wakeups require caller loops by contract. QuirkM: distinguish state predicate from wake notification explicitly.
- **Q-0262** — Mutex types and robustness/priority protocols are largely pthread configuration layered over futex. QuirkM: typed synchronization objects and policies.
- **Q-0263** — Readers-writer locks can have implementation-specific fairness behavior. QuirkM: fairness/starvation policy discoverable.
- **Q-0264** — Semaphores exist in POSIX named/unnamed and SysV forms. QuirkM: one typed semaphore/counter primitive with compatibility adapters.
- **Q-0265** — SysV semaphore operations include complex atomic multi-op semantics. QuirkM: if needed, expose transactional wait/update explicitly rather than inherit opaque arrays.
- **Q-0266** — File locks are sometimes abused for interprocess synchronization. QuirkM: native IPC synchronization resources.
- **Q-0267** — Robust-futex lists depend on userspace data structures the kernel must walk after thread death. QuirkM: kernel/runtime-owned owner-death registration.
- **Q-0268** — Priority inversion mitigation is split between scheduler and mutex/futex conventions. QuirkM: declared scheduler-aware lock policy.
- **Q-0269** — RCU is extremely powerful inside the kernel but has no simple general userspace analogue. QuirkM research: userspace epoch/version resources where beneficial, without exposing kernel implementation detail.
- **Q-0270** — Memory ordering remains language/CPU territory while syscall synchronization adds another layer of guarantees. QuirkM: native ABI documents exact happens-before boundaries machine-readably.
- **Q-0271** — CPU topology changes/hotplug can invalidate affinity assumptions. QuirkM: topology subscriptions/versioned sets.
- **Q-0272** — Thread priorities and cgroup scheduling controls can conflict. QuirkM: effective scheduling policy introspection.
- **Q-0273** — Blocking syscalls hide scheduler participation behind ordinary function-call shape. QuirkM: contracts indicate `may_block`, cancellation, and deadline support.
- **Q-0274** — Async-safety/thread-safety attributes are often documentation rather than machine-readable interface metadata. QuirkM: encode concurrency traits in contracts.
- **Q-0275** — Resource lifetime across concurrent operations is frequently library convention. QuirkM: borrowed/owned operation references formalized.

## Q-0276–Q-0300 — networking and sockets

- **Q-0276** — `socket` returns an FD whose actual protocol capabilities are discovered through domain/type/protocol conventions. QuirkM: typed endpoint resource.
- **Q-0277** — Socket options are a large numeric name/value namespace with heterogeneous value types. QuirkM: typed/versioned endpoint options.
- **Q-0278** — `setsockopt` option payload layouts depend on option identity. QuirkM: generated schemas/bindings.
- **Q-0279** — Address families use union-like `sockaddr` structures and lengths. QuirkM: tagged address types.
- **Q-0280** — IPv4 and IPv6 APIs coexist with dual-stack corner cases. QuirkM: protocol-neutral endpoint API with explicit v4/v6 policy.
- **Q-0281** — `SO_REUSEADDR` and `SO_REUSEPORT` have subtle, platform-specific semantics. QuirkM: explicit binding-sharing policy.
- **Q-0282** — Blocking connect completion is often inferred through writability plus `SO_ERROR`. QuirkM: connect is an operation with direct completion result.
- **Q-0283** — Nonblocking accept/connect/read/write encode “in progress” through errno and readiness. QuirkM: operation handles/futures.
- **Q-0284** — Half-close uses `shutdown` states layered over stream reads/writes/close. QuirkM: duplex stream directions are distinct stateful facets.
- **Q-0285** — EOF, reset, broken pipe, and local/remote shutdown can be difficult to distinguish uniformly. QuirkM: structured stream termination reasons.
- **Q-0286** — SIGPIPE is a surprising side effect of writing to a closed pipe/socket unless suppressed. QuirkM: write returns typed peer-closed error; no implicit signal.
- **Q-0287** — `MSG_NOSIGNAL` exists to locally suppress SIGPIPE. QuirkM: no signal side effect to suppress.
- **Q-0288** — Ancillary data (`cmsg`) is a manually aligned extensible byte protocol. QuirkM: typed message metadata list.
- **Q-0289** — Passing FDs over Unix sockets requires SCM_RIGHTS conventions. QuirkM: resource transfer is a native IPC operation.
- **Q-0290** — Peer credentials on Unix sockets are exposed through specialized option/message conventions. QuirkM: authenticated channel metadata.
- **Q-0291** — Abstract Unix-domain sockets use Linux-specific non-filesystem names. QuirkM: endpoint namespaces are typed rather than overloaded pathname structures.
- **Q-0292** — Network namespaces make endpoint identity/context process-ambient. QuirkM: network-domain resource passed explicitly.
- **Q-0293** — Interface identification relies on names and numeric indices that can change/reuse. QuirkM: stable live interface handles.
- **Q-0294** — Netlink mixes transport mechanics with many subsystem-specific protocols. QuirkM: typed system-service channels generated from schemas.
- **Q-0295** — Netlink message attributes are extensible TLVs but protocol conventions differ. QuirkM: one canonical versioned schema system.
- **Q-0296** — Route/address state is often managed through netlink while legacy ioctl interfaces remain. QuirkM: one native networking control plane; adapters for both Linux paths.
- **Q-0297** — DNS is userspace rather than kernel, creating resolver behavior differences across libc/configuration. QuirkM platform: resolver capability/service with explicit policy and replaceable provider.
- **Q-0298** — `/etc/resolv.conf`, NSS, mDNS, systemd-resolved, and container setup can create multiple name-resolution paths. QuirkM: typed name-resolution contract independent of configuration-file folklore.
- **Q-0299** — Socket timestamping has many option/message variants. QuirkM: timestamp metadata is a typed receive property with clock provenance.
- **Q-0300** — Zero-copy networking APIs require specialized flags/buffers/completion handling. QuirkM: transferable/pinned buffer resource + completion contract.

## Q-0301–Q-0325 — security, credentials, namespaces, and sandboxing

- **Q-0301** — Unix DAC mode bits are ambient identity-based authorization rather than explicit object capabilities. QuirkM: capabilities as native option while Linux DAC remains compatibility.
- **Q-0302** — ACLs and capabilities add layers atop traditional uid/gid checks. QuirkM: one authorization decision model with adapter-defined compatibility inputs.
- **Q-0303** — LSM hooks let multiple security models interpose but userspace sees subsystem-specific policy tooling. QuirkM: security policy provider interface with typed decisions/events.
- **Q-0304** — SELinux labels are often exposed through xattrs and policy-specific tools. QuirkM: security labels are typed metadata interfaces.
- **Q-0305** — AppArmor path-based policy inherits pathname/mount complexity. QuirkM: policies can target stable resource/interface identities.
- **Q-0306** — seccomp filters reason about raw syscall numbers/arguments. QuirkM: sandbox policies reason about semantic operations/capabilities.
- **Q-0307** — Architecture-specific syscall numbers complicate portable seccomp policy. QuirkM: semantic operation IDs architecture-neutral.
- **Q-0308** — Seccomp user notification adds another broker path for syscall mediation. QuirkM: operation broker/provider is a native composable interface.
- **Q-0309** — Namespace creation/joining uses clone/unshare/setns plus namespace FDs. QuirkM: namespace objects and process builder use the same resource model.
- **Q-0310** — Namespace types have different rules for creation, ownership, and hierarchy. QuirkM: typed namespace interfaces with common lifecycle traits.
- **Q-0311** — User namespaces complicate privilege reasoning because “root” is namespace-relative. QuirkM: authority always resource/domain-qualified.
- **Q-0312** — Mount namespaces and user namespaces have subtle privilege interactions. QuirkM: builder validates cross-domain authority before construction.
- **Q-0313** — PID namespaces change visible numeric IDs. QuirkM: stable process handles; numeric compatibility views are namespace-local.
- **Q-0314** — Network namespaces move devices/endpoints between isolated stacks through specialized tools/APIs. QuirkM: domain membership is resource transfer.
- **Q-0315** — IPC namespaces preserve legacy SysV/POSIX object models under another isolation layer. QuirkM: native IPC resources already scoped by domain.
- **Q-0316** — UTS namespace isolates hostname/domainname as special global strings. QuirkM: system identity configuration provided as namespace metadata.
- **Q-0317** — Time namespaces cover only selected clocks. QuirkM: virtualized clocks are explicit resources.
- **Q-0318** — Landlock adds another security model because traditional ambient filesystem authority is hard to restrict incrementally. QuirkM: directory/resource capabilities make least authority a default composition model.
- **Q-0319** — Chroot, namespaces, seccomp, capabilities, LSMs, and cgroups must be combined correctly for containers. QuirkM: one declarative sandbox/process-domain builder composes policies.
- **Q-0320** — Privilege dropping requires carefully ordered uid/gid/capability/prctl calls. QuirkM: one transactional authority attenuation operation.
- **Q-0321** — Ambient capabilities were added to handle exec inheritance use cases not served cleanly by older sets. QuirkM: explicit spawn grants replace ambient inheritance.
- **Q-0322** — setuid helpers are high-risk because authority transition is entangled with executable loading/environment. QuirkM: brokered capability grants with explicit contracts.
- **Q-0323** — Environment variables can influence privileged program behavior unless scrubbed carefully. QuirkM: privileged spawn declares accepted environment schema.
- **Q-0324** — `/proc` visibility can leak process/system information unless mounted/configured carefully. QuirkM: introspection requires explicit rights; textual views are filtered projections.
- **Q-0325** — Security-relevant state is scattered across procfs, prctl, capabilities, namespaces, LSMs, seccomp, and cgroups. QuirkM: typed `security.inspect(process/domain)` aggregation.

## Q-0326–Q-0350 — devices, control planes, procfs/sysfs, and observability

- **Q-0326** — Character/block device nodes encode device identity in filesystem metadata. QuirkM: devices discovered as resources; nodes are compatibility aliases.
- **Q-0327** — Udev rules reconstruct high-level device policy from sysfs/events/properties. QuirkM: typed device-discovery event stream.
- **Q-0328** — Stable device naming is a userspace policy layered over unstable probe order/numeric identity. QuirkM: persistent device identity fields from provider.
- **Q-0329** — Hotplug races force applications to handle devices disappearing between discovery and open. QuirkM: discovery yields a live revocable handle or explicit stale result.
- **Q-0330** — Device power management lives across sysfs, ioctls, runtime PM, subsystem APIs. QuirkM: common power-state interface where hardware supports it.
- **Q-0331** — Driver-specific sysfs attributes can become de facto ABI. QuirkM: versioned typed driver interfaces before publication.
- **Q-0332** — Debugfs is intentionally not a stable userspace ABI yet tools may still grow dependencies on it. QuirkM: diagnostic interfaces clearly carry stability class in metadata.
- **Q-0333** — Tracefs/procfs/debugfs/sysfs expose overlapping observability/control surfaces. QuirkM: separate typed telemetry, diagnostics, and control planes.
- **Q-0334** — `/proc/sys` presents sysctls as text files while programmatic consumers need parsing and type knowledge. QuirkM: typed configuration keys; text view generated.
- **Q-0335** — Sysctl names/types/ranges are largely documentation conventions. QuirkM: schema includes type, range, units, mutability, stability.
- **Q-0336** — Hardware counters/perf events use a powerful but complex attr struct and ioctl/read/mmap model. QuirkM: typed telemetry-session resource.
- **Q-0337** — Perf event attributes evolve through size-versioned C structures. QuirkM: schema-versioned canonical request encoding.
- **Q-0338** — BPF program loading/control has evolved through a large command multiplexor. QuirkM: typed verifier/program/map operations if a programmable instrumentation subsystem exists.
- **Q-0339** — BPF map/program types carry many subtype-specific semantics behind numeric enums. QuirkM: discoverable typed interfaces.
- **Q-0340** — Tracing ecosystems (ftrace, perf, BPF, uprobes, kprobes) overlap. QuirkM: common trace-event model with multiple providers.
- **Q-0341** — Kernel logs historically flow through ring buffers, syslog interfaces, `/dev/kmsg`, journaling userspace. QuirkM: structured log/event stream with compatibility text view.
- **Q-0342** — Kernel log records are mostly text and parsing conventions. QuirkM: structured fields + stable event IDs.
- **Q-0343** — Device firmware loading and policy involve userspace filesystem paths and driver conventions. QuirkM: firmware provider capability.
- **Q-0344** — Input devices expose event structs/numeric code spaces that applications typically consume through higher libraries. QuirkM: typed input event schema with generated compatibility adapter.
- **Q-0345** — TTY ioctl surface is historically large and special-case heavy. QuirkM: terminal is a typed stream/session interface; Linux ioctl preserved in adapter.
- **Q-0346** — Terminal line discipline is kernel-resident historical machinery with many flags. QuirkM: minimal kernel stream, richer terminal policy in userspace where feasible.
- **Q-0347** — Pseudo-terminal creation has accumulated several APIs/devpts conventions. QuirkM: one terminal-pair constructor.
- **Q-0348** — Console, VT, framebuffer, DRM, and modern compositor stacks reflect generations of display interfaces. QuirkM: native graphics resource model stays separate from compatibility generations.
- **Q-0349** — Device-specific error information often arrives through logs rather than structured operation errors. QuirkM: structured causal error chain attached to device operations.
- **Q-0350** — Subsystem ABI stability expectations differ among sysfs, debugfs, tracefs, ioctl, netlink, and device files. QuirkM: every interface declares stability/version class machine-readably.

## Q-0351–Q-0375 — resource control, cgroups, scheduling, and pressure

- **Q-0351** — cgroup v1 and v2 coexist, forcing tooling to understand two models. QuirkM: one native hierarchy; Linux personalities emulate required generations.
- **Q-0352** — Controller files expose configuration/status through filesystem text/value conventions. QuirkM: typed resource-domain interface.
- **Q-0353** — Delegating cgroup administration safely requires detailed subtree/control rules. QuirkM: delegation is an explicit rights-bearing domain handle.
- **Q-0354** — CPU shares/weights/quotas/deadlines use different units and semantics. QuirkM: scheduling budget types with units and conversion rules.
- **Q-0355** — Memory limits, high/low/min thresholds, swap, OOM group behavior form a complex policy surface. QuirkM: structured memory-domain policy object.
- **Q-0356** — I/O controllers depend on underlying device topology and scheduler support. QuirkM: resource policy references typed storage endpoints/topology.
- **Q-0357** — Pressure Stall Information is another telemetry interface separate from cgroup limits. QuirkM: pressure metrics are native domain telemetry.
- **Q-0358** — OOM score adjustment is a separate process-level heuristic control. QuirkM: memory-domain victim policy is explicit, auditable, and typed.
- **Q-0359** — CPUsets overlap with scheduler affinity and NUMA placement. QuirkM: one topology allocation object shared by scheduler/memory policies.
- **Q-0360** — Real-time scheduling can starve ordinary tasks without carefully configured limits. QuirkM: real-time authority requires bounded budget policy.
- **Q-0361** — Deadline scheduling uses specialized parameter validation and admission control. QuirkM: scheduler capability reports admissible contracts before spawn.
- **Q-0362** — Scheduler policy is often mutated after thread creation. QuirkM: initial policy set transactionally in task builder.
- **Q-0363** — Nice values are relative historical priorities with weak cross-workload meaning. QuirkM: use explicit weight/budget semantics natively.
- **Q-0364** — Load averages are legacy aggregate signals that do not directly map to container/resource domains. QuirkM: per-domain structured load/pressure metrics.
- **Q-0365** — `/proc/stat`, `/proc/loadavg`, cgroup stats, PSI, perf, and scheduler tracing provide overlapping performance views. QuirkM: unified telemetry schema with provider-specific extensions.
- **Q-0366** — Huge process-wide limits (`rlimit`) coexist with cgroup/resource-domain limits. QuirkM: one hierarchical quota model, with POSIX rlimit adapter.
- **Q-0367** — Different rlimits count fundamentally different things under one numeric API family. QuirkM: typed quota keys and units.
- **Q-0368** — `RLIMIT_NOFILE` constrains numeric descriptor-table slots, not a general resource budget. QuirkM: per-resource-class quotas plus overall handle budget.
- **Q-0369** — RLIMIT_MEMLOCK interacts with capabilities and cgroups. QuirkM: pinned-memory budget derived from one resource domain.
- **Q-0370** — Resource exhaustion often returns generic errno without structured quota source. QuirkM: error names limiting domain/quota.
- **Q-0371** — Container orchestrators must translate high-level resource intent into several kernel knobs. QuirkM: declarative resource-domain contract is native.
- **Q-0372** — Freeze/thaw of cgroups is separate from process signal stopping. QuirkM: domain suspension is a first-class lifecycle state.
- **Q-0373** — Per-process accounting and per-cgroup accounting can disagree in perspective. QuirkM: telemetry records scope/domain explicitly.
- **Q-0374** — Resource controls vary by kernel configuration/controller availability. QuirkM: feature discovery is mandatory and machine-readable.
- **Q-0375** — Control-plane files can appear/disappear depending on controller state/version. QuirkM: stable interface introspection returns supported properties rather than requiring filesystem probing.

## Q-0376–Q-0400 — ABI, ELF, libc, syscalls, and compatibility evolution

- **Q-0376** — Syscall numbers are architecture-specific. QuirkM: semantic operation IDs are architecture-neutral; Linux numbers stay in adapter.
- **Q-0377** — Some architectures historically expose slightly different syscall sets/argument conventions. QuirkM: one native contract with machine lowering.
- **Q-0378** — libc may emulate, wrap, or choose different syscalls depending on kernel support. QuirkM: explicit runtime capability query rather than hidden fallback where possible.
- **Q-0379** — vDSO provides selected kernel services through a separate ELF-mapped fast path. QuirkM: fast-call providers are discoverable implementation details behind stable native calls.
- **Q-0380** — vsyscall remains a historical compatibility concern on x86 despite newer vDSO mechanisms. QuirkM: no fixed legacy fast-call address baked into native ABI.
- **Q-0381** — `errno` is thread-local library state layered over negative/raw syscall results. QuirkM: typed result values are direct native ABI/runtime contract.
- **Q-0382** — Many syscalls use sentinel values/flags to overload behavior. QuirkM: tagged option types.
- **Q-0383** — New syscalls often appear because old argument structures or flag spaces cannot safely evolve. QuirkM: versioned extensible request schemas.
- **Q-0384** — Size-versioned C structs are a recurring Linux extension pattern. QuirkM: canonical self-describing versioned record encoding.
- **Q-0385** — Reserved zero fields must often remain zero for future extension. QuirkM: schema-managed optional fields rather than manual padding protocol.
- **Q-0386** — 32-bit compat layers must translate time, pointer, long, and struct layouts. QuirkM: fixed-width wire ABI independent of compiler data model.
- **Q-0387** — Y2038 required substantial time ABI work on 32-bit systems. QuirkM: wide time type from first stable release.
- **Q-0388** — ELF program headers, dynamic tags, relocations, TLS, auxv, and interpreters encode decades of binary ABI conventions. QuirkM: keep ELF compatibility while native component metadata can be higher-level and self-describing.
- **Q-0389** — `PT_INTERP` delegates executable startup to a dynamic linker path with libc/toolchain assumptions. QuirkM: native loader contract can name runtime/component provider explicitly.
- **Q-0390** — ELF symbol interposition permits powerful but surprising runtime replacement semantics. QuirkM: dependency/provider replacement is explicit in manifests/contracts.
- **Q-0391** — `LD_PRELOAD` is convenient but ambient and difficult to reason about securely. QuirkM: explicit provider override with capability declaration.
- **Q-0392** — Dynamic-linker search paths combine binary metadata, environment, caches, defaults, and filesystem layout. QuirkM: content/package identity resolves dependencies deterministically.
- **Q-0393** — ABI symbol versioning is complex but necessary for long-lived libraries. QuirkM: interface version negotiation built into component/native-unit contracts.
- **Q-0394** — C ABI exposes compiler/layout conventions as ecosystem foundation. QuirkM: C is supported, but native stable interfaces use generated canonical contracts.
- **Q-0395** — Variadic APIs are difficult to introspect/bind safely across languages. QuirkM: no variadic stable system interfaces.
- **Q-0396** — `ioctl`/`fcntl`/`prctl`/`bpf` demonstrate command-multiplexor growth patterns. QuirkM: typed operation namespaces, not generic integer command funnels.
- **Q-0397** — Kernel feature detection often relies on trying a syscall and receiving `ENOSYS`/`EINVAL`. QuirkM: explicit capability/version discovery.
- **Q-0398** — Distribution/library kernel-minimum assumptions complicate portable binaries. QuirkM: package manifest declares required semantic capabilities, not guessed kernel versions.
- **Q-0399** — Static and dynamic binaries exercise very different compatibility dependencies. QuirkM tooling: dependency scanner classifies binary/runtime boundary before migration.
- **Q-0400** — Linux ABI compatibility is intentionally additive and conservative, causing permanent surface growth. QuirkM: compatibility surface may grow, while native surface can version/deprecate through explicit migration contracts.

## Q-0401–Q-0425 — IPC, messages, shared resources, and service boundaries

- **Q-0401** — SysV message queues coexist with POSIX message queues, pipes, sockets, and newer IPC mechanisms. QuirkM: one small set of typed channel/queue primitives with adapters.
- **Q-0402** — SysV IPC objects use keys/IDs and global namespace conventions. QuirkM: capability handles, no ambient key lookup by default.
- **Q-0403** — POSIX named IPC objects often appear through filesystem-like namespaces. QuirkM: service/resource directories are explicit capability namespaces.
- **Q-0404** — Unix sockets mix byte streams, datagrams, sequencing, credential transfer, and FD passing under socket APIs. QuirkM: channel facets declare messaging/stream/transfer capabilities.
- **Q-0405** — Pipe byte streams lack message framing. QuirkM: choose stream or message channel explicitly.
- **Q-0406** — `SOCK_SEQPACKET` provides message boundaries but is less universally used than streams. QuirkM: message channels are first-class, not a niche socket subtype.
- **Q-0407** — Shared memory needs separate synchronization/lifetime protocols. QuirkM: shared region can bundle/advertise synchronization and ownership contract.
- **Q-0408** — Passing descriptors transfers ambient authority without an interface contract describing what the receiver should do with them. QuirkM: resource transfer includes typed interface/capability metadata.
- **Q-0409** — D-Bus and other userspace buses build typed/service semantics above generic kernel IPC. QuirkM: typed service interfaces can map efficiently onto native channels.
- **Q-0410** — Service discovery is mostly a userspace convention outside the kernel. QuirkM platform: explicit capability/provider registry with replaceable implementation.
- **Q-0411** — PID-based service supervision is vulnerable to numeric identity pitfalls without pidfds or careful tooling. QuirkM: supervisor stores `ProcessHandle`.
- **Q-0412** — Socket activation depends on inherited FDs and environment/process conventions. QuirkM: startup resources are named typed capabilities in process manifest.
- **Q-0413** — Daemon protocols often invent framing/versioning independently. QuirkM: common IDL/schema tooling.
- **Q-0414** — Shared-library calls and IPC calls have very different replacement/isolation properties. QuirkM: component contract can choose local, Wasm, Linux-provider, or IPC implementation without changing caller interface.
- **Q-0415** — Cross-namespace resource transfer requires subsystem-specific rules. QuirkM: transfer validates destination domain and rights uniformly.
- **Q-0416** — IPC credential checking is mechanism-specific. QuirkM: channel creation/accept returns authenticated peer principal/resource.
- **Q-0417** — Abstract socket names, filesystem socket paths, and inherited sockets are three discovery models. QuirkM: endpoint discovery separated from endpoint transport.
- **Q-0418** — Message truncation behavior differs by datagram/sequence APIs. QuirkM: receive result explicitly reports full message length and truncation policy.
- **Q-0419** — Ancillary control-message parsing is alignment-sensitive and easy to get wrong in C. QuirkM: generated typed metadata decoding.
- **Q-0420** — Shared-memory ABI often exposes raw struct layout between processes. QuirkM: canonical shared schema or generated layout contracts with versioning.
- **Q-0421** — Shared-memory pointers are process-address-space relative and cannot be transferred directly. QuirkM: offsets/handles are the canonical cross-process reference.
- **Q-0422** — Crash recovery for shared-memory data structures is application-defined. QuirkM: optional transactional/versioned shared-object helpers in userspace.
- **Q-0423** — IPC backpressure semantics differ across pipes, sockets, queues, and buses. QuirkM: channel contract declares capacity and flow-control behavior.
- **Q-0424** — Cancellation of an IPC request is normally protocol-specific. QuirkM: operation/request IDs and cancellation are common service traits.
- **Q-0425** — Observability of which service/provider satisfied a request is usually external tooling. QuirkM: provider identity/provenance is introspectable.

## Q-0426–Q-0450 — graphics, input, audio, and desktop-facing Linux stack pressures

These are broader Linux-system/ecosystem pressures, not claims about the kernel alone.

- **Q-0426** — Linux graphics spans DRM/KMS kernel APIs plus Mesa, GBM, EGL, Vulkan/OpenGL, Wayland/X11 layers. QuirkM: native graphics contracts should clearly separate device, presentation, rendering, and compositor roles.
- **Q-0427** — DRM ioctl ABIs are subsystem-specific and complex. QuirkM: typed graphics-device operations generated from versioned schemas.
- **Q-0428** — Buffer sharing across GPU/display/media relies heavily on dma-buf plus fences/modifiers conventions. QuirkM: buffer resource includes format/layout/synchronization interfaces.
- **Q-0429** — Pixel format/modifier negotiation uses multiple code spaces across subsystems. QuirkM: canonical typed format descriptors with conversion/provider negotiation.
- **Q-0430** — Explicit versus implicit GPU synchronization has been an evolving ecosystem boundary. QuirkM: synchronization ownership is explicit in native graphics contracts.
- **Q-0431** — X11 carries decades of network-transparent global-server semantics many modern desktops no longer want by default. QuirkM: compositor-scoped capabilities with explicit sharing.
- **Q-0432** — Wayland deliberately leaves many desktop protocols to extensions, creating version/availability discovery needs. QuirkM: machine-readable interface discovery and generated bindings are foundational.
- **Q-0433** — Clipboard/data-transfer behavior crosses compositor, toolkit, MIME, portal, and sandbox boundaries. QuirkM: typed transfer capability with explicit authority/lifetime.
- **Q-0434** — Screen capture under modern sandboxed desktops requires portal/protocol coordination. QuirkM: capture is an explicit user-mediated capability.
- **Q-0435** — Global hotkeys are difficult to reconcile with compositor/security isolation. QuirkM: user-approved shortcut capability rather than ambient global input access.
- **Q-0436** — Input device access ranges from raw evdev to compositor/toolkit abstractions. QuirkM: raw device rights separate from application input event capability.
- **Q-0437** — Keyboard layout/input-method behavior is spread across libraries/protocols/services. QuirkM: text input contract separated from physical key events.
- **Q-0438** — Accessibility APIs are userspace bus/protocol layers rather than a single composable application contract. QuirkM: accessibility tree/event interface is a first-class native platform contract.
- **Q-0439** — Audio historically spans ALSA kernel API and multiple user-space sound servers. QuirkM: hardware audio resource versus session/mixing service are separate contracts.
- **Q-0440** — Application audio routing/policy is not something raw ALSA solves. QuirkM: native app API targets a replaceable audio-session provider.
- **Q-0441** — Device hotplug/routing changes require applications or servers to adapt across APIs. QuirkM: provider emits typed route/device change events.
- **Q-0442** — Multimedia zero-copy paths require coordination among V4L2, DRM, dma-buf, codecs, and userspace frameworks. QuirkM: shared buffer/resource contracts aim to remove redundant translation layers.
- **Q-0443** — Camera access is often raw-device oriented unless portals/sandbox layers mediate it. QuirkM: camera is user-authorized service capability by default.
- **Q-0444** — Linux desktop notification APIs are desktop-environment conventions. QuirkM: notification service contract is platform-level and provider-replaceable.
- **Q-0445** — File chooser portals exist partly to let sandboxed apps receive selected files without broad filesystem authority. QuirkM: selected-file resource handoff is the native default model.
- **Q-0446** — Desktop settings/theme discovery varies across toolkit/environment. QuirkM: typed preferences/theme provider contract.
- **Q-0447** — GPU feature discovery often requires traversing several API/library layers. QuirkM: resource interfaces expose concise machine-readable capability cards.
- **Q-0448** — Display color-management behavior spans kernel properties, compositor protocols, ICC tooling, and desktop policy. QuirkM: display color capability contract separates calibration data, transform, and presentation policy.
- **Q-0449** — HDR/VRR/color-space support depends on end-to-end negotiation across device/compositor/app. QuirkM: presentation contract carries explicit negotiated display properties.
- **Q-0450** — Desktop APIs are often tied to a particular toolkit/session bus/compositor convention. QuirkM: small native contracts permit multiple toolkit/compositor implementations.

## Q-0451–Q-0475 — boot, services, packaging, distro and userspace fragmentation

These are ecosystem-level pressures that matter if Morphic wants Linux software compatibility without copying every convention into QuirkM.

- **Q-0451** — Linux has several init/service-management traditions and service assumptions. QuirkM: native service manifest is independent of Linux init compatibility.
- **Q-0452** — Daemons often assume FHS paths for configuration/state/runtime sockets. QuirkM: explicit resource/configuration injection; compatibility filesystem supplies FHS where needed.
- **Q-0453** — `/run`, `/var`, `/tmp`, home directories, and XDG locations represent several generations of state-location convention. QuirkM: applications receive typed state/cache/config directories.
- **Q-0454** — Environment variables are heavily used for runtime discovery/configuration. QuirkM: typed manifest/configuration first, environment compatibility second.
- **Q-0455** — `PATH` command discovery is ambient and order-sensitive. QuirkM: executable/provider resolution can be content/package identity based.
- **Q-0456** — `LD_LIBRARY_PATH` is ambient and order-sensitive. QuirkM: dependency closure declared in package/component manifest.
- **Q-0457** — pkg-config files are text metadata whose paths affect build discovery. QuirkM SDK: machine-readable package interfaces; generate pkg-config for compatibility.
- **Q-0458** — Distribution package names/versions/features differ despite the same upstream project. QuirkM: capability/interface identity separate from distro package identity.
- **Q-0459** — glibc versus musl differences expose assumptions beyond the kernel ABI. QuirkM: Linux personality supports libc expectations while native API avoids libc-specific ontology.
- **Q-0460** — Dynamic linker paths differ by architecture/libc/distro. QuirkM: loader/provider manifest resolves runtime explicitly.
- **Q-0461** — Shebang execution depends on textual interpreter paths and kernel limits. QuirkM: native package manifest can name interpreter provider by capability; shebang remains compatibility.
- **Q-0462** — Locale behavior depends on libc/data packages/environment. QuirkM: locale service/data version is explicit runtime dependency.
- **Q-0463** — Time-zone behavior depends on userspace tzdata paths/version. QuirkM: time-zone data provider/version explicit.
- **Q-0464** — NSS lets identity/name services vary through libc configuration/plugins. QuirkM: typed identity/name-resolution services with explicit provider selection.
- **Q-0465** — PAM authentication is a pluggable user-space convention with application-specific integration. QuirkM: authentication/authorization broker contract, with PAM provider for Linux compatibility.
- **Q-0466** — Desktop portals, polkit, D-Bus services, and filesystem permissions form multiple authority-broker paths. QuirkM: common capability-request/broker model where semantics overlap.
- **Q-0467** — Linux application distribution formats (distro packages, Flatpak, Snap, AppImage, containers) solve different dependency/isolation problems. QuirkM: one self-describing native unit can carry contracts, payloads, capabilities, provenance, and optional Linux/Wasm implementations.
- **Q-0468** — Container images duplicate large filesystem trees to capture userspace expectations. QuirkM: content-addressed resources/components can represent dependencies without requiring the native model to be a rootfs image.
- **Q-0469** — Build systems repeatedly probe host features through shell/compiler tests. QuirkM SDK: machine-readable target capability manifest can eliminate known probes.
- **Q-0470** — Autoconf-style feature tests often encode decades of Unix variation. QuirkM: compatibility toolchain can answer Linux/POSIX probes while native packages depend on explicit interface versions.
- **Q-0471** — Shell scripting assumes text streams, exit codes, paths, environment, and process inheritance. QuirkM: preserve shell compatibility but offer typed composition APIs to agents/native tools.
- **Q-0472** — System configuration is spread across many text formats and directories. QuirkM: typed schema configuration with text import/export adapters.
- **Q-0473** — Service logs are fragmented among stdout/stderr, syslog, journald, files, kernel ring, and app-specific logs. QuirkM: structured log stream with sink providers and compatibility adapters.
- **Q-0474** — Software often infers platform identity from `/etc/os-release`, uname, libc, filesystem paths, and feature probes. QuirkM: explicit compatibility personality report plus semantic capability query.
- **Q-0475** — “Linux compatibility” is not one surface: kernel ABI, libc, filesystem layout, devices, proc/sys, init, distro packaging, and desktop protocols all matter. QuirkM: ledger tracks each compatibility layer separately instead of claiming binary compatibility from syscall count alone.

## Q-0476–Q-0500 — agentic portability, introspection, migration, and maintainability pressures

These entries deliberately convert recurring Linux-porting friction into QuirkM tooling goals. They are QuirkM opportunities, not accusations that Linux was designed for autonomous agents.

- **Q-0476** — Interface semantics are scattered across man pages, kernel docs, headers, source, libc behavior, and folklore. QuirkM: every stable native interface has one machine-readable canonical contract.
- **Q-0477** — A syscall name alone does not tell an agent whether it blocks, restarts, owns memory, transfers authority, or mutates shared state. QuirkM: those traits are contract fields.
- **Q-0478** — Error codes are broad enums whose exact applicability is often only prose. QuirkM: per-operation typed error sets with Linux errno translation metadata.
- **Q-0479** — API feature availability depends on kernel/libc/configuration versions. QuirkM: direct version/capability negotiation.
- **Q-0480** — Header constants expose numeric ABI details agents can mistakenly treat as conceptual architecture. QuirkM: semantic names/contracts separated from compatibility encodings.
- **Q-0481** — Porting often begins with compile errors rather than an explicit dependency inventory. QuirkM tooling: manifest declares required interfaces before build.
- **Q-0482** — Runtime failures may reveal missing semantics long after compilation succeeds. QuirkM: preflight compatibility analysis against declared contracts.
- **Q-0483** — Programs can depend on undocumented Linux behavior accidentally. QuirkM: differential test harness records observed dependency before migration.
- **Q-0484** — Compatibility shims can silently accumulate permanent complexity. QuirkM: every shim carries owner, quirk ID, scope, tests, and removal/replacement status.
- **Q-0485** — The same compatibility workaround gets rediscovered across applications. QuirkM: solved quirk transformations are reusable ledger artifacts.
- **Q-0486** — Porting documentation often describes an application, not the general semantic difference it encountered. QuirkM: extract general quirk class from every port.
- **Q-0487** — Compatibility percentage is usually vague. QuirkM: report semantic dependency coverage, unknowns, native mappings, and Linux-only remainder.
- **Q-0488** — Agents can waste context reading giant platform manuals to solve one narrow port. QuirkM: task-specific context capsules generated from ledger/dependency graph.
- **Q-0489** — A compatibility workaround may preserve tests while accidentally broadening authority/security. QuirkM: migration proof includes rights/capability delta.
- **Q-0490** — A native replacement may be faster/cleaner but subtly change observable edge behavior. QuirkM: differential oracle declares exactly what must match and what intentionally differs.
- **Q-0491** — Binary-only software cannot always be source-migrated. QuirkM: Linux personality remains a permanent fallback rather than forcing unsafe binary rewriting.
- **Q-0492** — Dynamically linked software may be adaptable at library/provider boundaries without rewriting the whole program. QuirkM tooling: identify safe interposition/relink boundaries explicitly.
- **Q-0493** — Wasm/componentized software can expose clearer replaceable boundaries than opaque native binaries. QuirkM: Wasm is an early peer consumer of the same semantic resources.
- **Q-0494** — Native ports can drift from Linux behavior as both implementations evolve. QuirkM: shared conformance corpora and recurring differential tests.
- **Q-0495** — Compatibility fixes can regress unrelated applications. QuirkM: each quirk solution records affected dependency graph and focused regression set.
- **Q-0496** — A large compatibility implementation can become impossible for one person/agent to comprehend. QuirkM: MinMax Memo requires high capability leverage per permanent mechanism.
- **Q-0497** — Documentation can claim compatibility beyond evidence. QuirkM: every compatibility claim links to deterministic proof/nonclaim records.
- **Q-0498** — Multiple agents can produce conflicting migrations for the same semantic class. QuirkM: canonical quirk identity + conformance oracle decides reusable promotion.
- **Q-0499** — Automated migration can become dangerous if “compiles” is treated as “equivalent.” QuirkM: acceptance requires contract tests, differential evidence where meaningful, and explicit nonclaims.
- **Q-0500** — The central long-term portability problem is repeated novel work. QuirkM: organize the system so every solved semantic difference can reduce the novel work required by the next program.

---

# How to use the 400

Do not implement Q-0101 through Q-0500 in numerical order.

The intended pipeline is:

```text
real Linux compatibility pressure
        |
        v
find matching Q-ID or create candidate
        |
        v
research and classify
        |
        +--> fundamental mechanism -> Morphic core
        +--> Linux-only semantics -> Linux quarantine
        +--> clean native exposure -> QuirkM
        +--> too expensive -> Linux provider / hypervisor
        |
        v
prove compatibility + native counterdesign
        |
        v
record reusable agent migration rule when justified
```

The backlog is valuable only if it narrows engineering work. A candidate that turns out not to be a problem should be corrected, downgraded, or removed. QuirkM should be defined by evidence and better contracts, not by hostility to Linux.