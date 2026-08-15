# Morphic roadmap: current Alpine frontier -> Playable Alpine -> apk

This roadmap starts from the highest state actually proved after Batch 32M and separates three milestones that should not be conflated:

1. **Playable Alpine** — one persistent real Alpine shell can perform basic navigation, immutable reads, writable `/tmp` redirection/read-back, a real pipeline, and remain alive afterward.
2. **Local apk** — the Alpine package manager can operate against local package/database inputs without networking being required.
3. **Networked apk** — `apk add` can resolve repositories and install packages from real Alpine mirrors through ordinary DNS/TCP/TLS/filesystem/process semantics.

The governing rule is unchanged:

```text
observe real failure
      -> classify
      -> minimum general repair
      -> prove causality
      -> retry the same artifact
```

Do not implement a speculative Linux subsystem merely because Linux has one. Real Alpine and apk pressure decide what enters Morphic and what remains Linux-personality translation.

## Current proved frontier

As of Batch 32M / PR #89, real Alpine v3.22.0 RV64 under system QEMU has proved:

```text
real dynamic musl + BusyBox /bin/sh             PASS
persistent interactive shell                    PASS
clone(220) / execve(221) external commands      PASS
openat(56) namespace-backed opens                PASS
getdents64(61) root enumeration                  PASS
ls /                                             PASS
cat /etc/alpine-release -> 3.22.0                PASS
chdir(49) + getcwd(17)                           PASS
cd /tmp ; pwd -> /tmp                            PASS
bounded writable runtime namespace               PASS
transactional create/truncate                     PASS
F_DUPFD fallback / ownership                      PASS
dup3(24)-backed shell descriptor replacement     PASS
echo hello > /tmp/hello                          PASS

cat /tmp/hello                                   CURRENT BLOCKER
```

The immediate unchanged `cat /tmp/hello` path resolves `/bin/cat`, enters the existing clone/exec path, observes unsupported Linux/RV64 calls `96`, `135`, `135`, and `134`, and then reaches a post-exec store page fault:

```text
ZIGREF_LINUX_EDGE_TRAP cause=000000000000000f sepc=000000008020006e stval=00000000804026f8
```

Read-back is therefore not yet earned. Pipelines are not yet earned. Playable Alpine is not yet earned.

Batch 32N reproduced this boundary under QEMU 8.2.2 and narrowed it before `execve`: the same fault occurs for `cat /tmp/hello` even when the runtime file was not first created. Calls 96/135/135/134 run with a valid unchanged user-RW stack leaf, while `0x8020006e` is the first `userServiceTrapEntry` frame store. The next repair target is therefore the fork-child trap return/`sscratch` invariant with SUM remaining clear, not speculative signal/TLS syscalls or a writable-ELF mapping.

## Phase A — close the external `cat` child-runtime fault

### A1. Reproduce the exact fault unchanged

Pressure:

```text
cd /tmp
pwd
echo hello > /tmp/hello
cat /tmp/hello
```

Preserve the exact Alpine v3.22.0 namespace and real BusyBox/musl binaries. Capture the child transition around clone, exec, unsupported setup calls, memory mappings, stack/TLS state, and the first store-page fault.

### A2. Classify syscalls 96 / 135 / 134 before implementing them

On Linux/RV64 these numbers must be identified from the actual ABI and observed arguments. The existence of an unsupported call does not itself prove it is causal. Determine whether ash/cat/musl can legally continue after the current errno result or whether one of these calls establishes memory/thread/process state required before the fault.

Only the first proven causal missing semantic should be implemented.

### A3. Repair the post-exec writable-memory invariant

The fault address and page-table state should determine whether the real bug is:

- missing writable mapping,
- lost writable permission across exec,
- incorrect program break / anonymous mapping state,
- TLS/thread-pointer setup,
- child snapshot/restore contamination,
- interpreter/main-image mapping interaction,
- or another concrete mechanism exposed by the trace.

Requirements:

- preserve PREPARE -> COMMIT;
- preserve mapping/table-capacity preflight;
- preserve W+X=0;
- preserve parent shell liveness;
- preserve exact source namespace immutability;
- add a focused permanent regression for the causal failure.

### A4. Earn runtime read-back

The gate is literal:

```text
cat /tmp/hello
```

must print:

```text
hello
```

through a real external BusyBox `cat` operating on the runtime object created by ash.

This proves more than a runtime-namespace unit test: pathname lookup, open resource creation, clone/exec, descriptor inheritance, runtime-object read semantics, checked user-memory copying, offsets/EOF, child termination, and parent restoration must all survive one real command.

## Phase B — pipes and simultaneous process/FD lifetime

Once external `cat` read-back succeeds, immediately pressure:

```text
echo hello | cat
```

This is expected to expose the first truly pipeline-specific boundary.

### B1. Add pipe creation only when observed

Likely Linux pressure may involve `pipe2`, descriptor duplication, close, fork/clone, wait, and EOF behavior, but the exact trace decides the implementation order.

The neutral mechanism should represent a bounded pipe/channel object with:

- explicit read and write endpoints;
- finite bounded buffering;
- exact endpoint ownership/reference counts;
- EOF only after the final writer disappears;
- broken-pipe behavior only when the final reader disappears;
- no descriptor or resource leaks on failed setup;
- deterministic bounded wake/read/write semantics appropriate to the current serialized runtime.

Do not invent broad poll/epoll readiness merely for completeness if the unchanged pipeline does not require it.

### B2. Preserve coherent descriptor inheritance

The shell's setup may duplicate pipe endpoints onto stdin/stdout and close originals before exec. The existing F_DUPFD/dup3 ownership model should be reused rather than bypassed.

Prove:

- child A owns the writer needed for `echo`;
- child B owns the reader needed for `cat`;
- the parent does not accidentally keep a writer alive and suppress EOF;
- displaced stdio resources retire exactly once;
- failed setup leaves the shell/resource topology coherent.

### B3. Earn the pipeline gate

```text
echo hello | cat
```

must produce:

```text
hello
```

and return control to the same shell.

## Phase C — ★ PLAYABLE ALPINE UNDER MORPHIC ★

Playable Alpine is intentionally a small, reproducible acceptance milestone rather than a claim of general Linux compatibility.

The complete sequence must succeed in one persistent real shell:

```text
echo morphic
echo second
pwd
ls /
cat /etc/alpine-release
cd /tmp
echo hello > /tmp/hello
cat /tmp/hello
echo hello | cat
echo still-alive
```

Expected user-visible core:

```text
morphic
second
/
...
3.22.0
/tmp
hello
hello
still-alive
```

Only when that sequence genuinely passes under real QEMU is the project entitled to mark:

```text
★ PLAYABLE ALPINE UNDER MORPHIC ★
```

At that point freeze the proof as a named report/tag and use Playable Alpine as the inherited pressure baseline for package-manager work.

---

# From Playable Alpine to apk

`apk` is deliberately a separate milestone. A working shell plus pipes does not imply package-management semantics.

The package-manager campaign should be pressure-driven in increasing order of external dependence:

```text
PLAYABLE ALPINE
      |
      v
apk binary starts
      |
      v
apk --version / help
      |
      v
local package database reads
      |
      v
local package metadata parsing
      |
      v
local .apk verification + extraction
      |
      v
local package install transaction
      |
      v
★ LOCAL APK ★
      |
      v
DNS + sockets + clocks
      |
      v
TLS / CA files / entropy
      |
      v
repository index download
      |
      v
apk update
      |
      v
apk add <small package>
      |
      v
★ NETWORKED APK ★
```

## Phase D — start the real apk binary

First use Alpine's existing `/sbin/apk` or canonical path from the exact namespace. Do not substitute a mock package manager.

Initial pressure ladder:

```text
apk --version
apk --help
apk info
```

Each command should reveal the next ABI requirement without introducing network complexity yet.

Likely pressure areas include richer stat/access semantics, directory traversal, symlink/path semantics, mmap/mprotect, clocks, entropy, ioctl/terminal behavior, and process cleanup. These are possibilities, not pre-authorized implementation work.

## Phase E — make the filesystem package-manager capable

`apk` exercises a filesystem much harder than `cat` and shell redirection.

Expect pressure for general mechanisms such as:

- creating directories;
- unlink/rename replacement;
- metadata/stat variants;
- atomic temp-file -> rename transactions;
- directory-relative operations;
- permission/mode representation where causally required;
- fsync-like durability policy or a bounded compatibility treatment;
- complete component-wise symlink resolution when the real package layout makes the inherited Batch 32G limitation causal;
- larger runtime-object capacity than the tiny Playable-Alpine overlay.

The current four-object / 256-byte runtime overlay is a proof mechanism, not a plausible package installation store. The next storage layer should remain bounded and explicit but must scale to the measured package transaction rather than hiding arbitrary allocation.

## Phase F — local apk database and package inspection

Before networking, prove that apk can consume local state.

Candidate gates:

```text
apk info
apk info --who-owns /bin/busybox
apk policy busybox
```

Exact availability depends on the minirootfs database contents, so the commands should be adjusted to what the pinned Alpine artifact actually contains.

Success means the real apk binary can read its database, traverse package metadata, and return normally in the persistent shell.

## Phase G — install a local `.apk`

Acquire a hash-pinned RV64 Alpine package outside the guest as a test artifact and expose it through the same verified namespace mechanism. Prefer a tiny package with limited dependencies for the first install.

Pressure conceptually:

```text
apk add --allow-untrusted /tmp/example.apk
```

or the stricter signature-valid form once key verification is supported.

The goal is not the `--allow-untrusted` option itself. The goal is to isolate package extraction and filesystem transaction semantics before DNS/TCP/TLS are introduced.

A successful local install should prove:

- package archive reading/decompression;
- file and directory creation;
- overwrite/rename semantics;
- metadata updates;
- package database update;
- cleanup on success;
- bounded rollback/failure behavior where required;
- installed executable/data visible to later ordinary shell commands.

This earns:

```text
★ LOCAL APK UNDER MORPHIC ★
```

## Phase H — networking substrate for repository apk

Only after local apk works should the campaign add the mechanisms needed for real repositories.

Pressure likely includes:

### H1. sockets

- socket creation;
- connect;
- send/recv or read/write over sockets;
- close/shutdown semantics;
- bounded descriptor/resource ownership.

### H2. DNS

Either ordinary musl resolver traffic or a minimal compatible resolver path should work through the same socket substrate. Do not special-case Alpine hostnames in the kernel.

### H3. clocks and time

TLS and networking commonly need monotonic/realtime clock behavior and timeout semantics. Add only the clocks observed by the real stack.

### H4. entropy

TLS may require `getrandom` or equivalent entropy pressure. Keep the Linux ABI translation at the edge and represent the underlying entropy capability neutrally.

### H5. TLS and CA trust

Prefer letting the existing Alpine userspace TLS stack run rather than implementing TLS in the kernel. Morphic should provide the file, socket, clock, entropy, and memory/process semantics the userspace implementation actually needs.

The minirootfs may not contain every certificate/networking package needed for remote HTTPS. That is part of the experiment and may require bootstrapping a local package first.

## Phase I — repository indexes and `apk update`

First remote-package milestone:

```text
apk update
```

Success requires the real apk/userspace stack to:

- resolve repository hosts;
- connect;
- negotiate the repository transport actually configured;
- fetch index data;
- validate it according to Alpine policy;
- write/update local cache/database state;
- return to the shell alive.

Record the exact repository configuration and package-index hashes where practical so the experiment remains reproducible despite changing public mirrors.

## Phase J — ★ `apk add` FROM REAL ALPINE REPOSITORIES ★

Choose a deliberately small first package with a compact dependency graph.

Acceptance example:

```text
apk update
apk add <small-package>
<installed-command> --version
```

The installed command must execute as an ordinary inherited Alpine binary; package installation is not complete merely because apk exits zero.

This milestone earns:

```text
★ NETWORKED APK UNDER MORPHIC ★
```

## What comes immediately after apk

Once real package installation works, Alpine becomes a dramatically stronger compatibility-pressure generator. The next workloads should be chosen for semantic diversity, not just size:

```text
apk add sqlite
apk add python3
apk add git
apk add openssh
```

Each new workload should record:

- the exact package/version/artifacts;
- the first causal failure;
- new neutral semantics admitted;
- Linux-edge-only translations admitted;
- mechanisms reused without change;
- permanent Morphic growth;
- whether the Morphic convergence curve is flattening.

That is where the package manager stops being merely a milestone and becomes the delivery mechanism for the next phase of the Morphic experiment.
