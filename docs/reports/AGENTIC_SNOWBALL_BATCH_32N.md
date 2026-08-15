# Agentic Snowball Batch 32N handoff

## Inherited boundary

This run started from current `main` at `6993491f6c98e0f4b0a6627d384518b0c429b95c`.
The coherent persisted handoff content commit is `121c634d70d019c6cff46c43e72ef26feb73f6cf`; the final documentation commit follows it.
Batch 32M had proved real ash redirection and left unchanged external
`cat /tmp/hello` at a post-clone store-page fault. The pinned Alpine v3.22.0
namespace identities and all previously earned redirection, cwd, immutable-read,
PREPARE -> COMMIT, mapping-preflight, and W+X=0 claims remain unchanged.

## Exact real-QEMU reproduction

The canonical artifact-only namespace command verified 517 objects, 7,069,903
regular-file bytes, namespace-data SHA-256
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`,
BusyBox SHA-256 `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and musl SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.
The existing live-console build command passed under Zig 0.14.0. After installing
QEMU 8.2.2 in the runner, the unchanged system-machine command reproduced:

```text
cd /tmp
pwd                         -> /tmp
echo hello > /tmp/hello     -> returns without error
cat /tmp/hello
ZIGREF_LINUX_CLONE flags=0000000000000011 child_stack=0000000000000000
ZIGREF_LINUX_UNSUPPORTED nr=0000000000000060
ZIGREF_LINUX_UNSUPPORTED nr=0000000000000087
ZIGREF_LINUX_UNSUPPORTED nr=0000000000000087
ZIGREF_LINUX_UNSUPPORTED nr=0000000000000086
ZIGREF_LINUX_EDGE_TRAP cause=000000000000000f sepc=000000008020006e stval=00000000804026f8
```

A second run of `cat /tmp/hello` without the preceding runtime-file creation
reproduced the identical clone/setup/fault sequence. The failure is therefore
in the fork-shaped child setup path before `execve`, not runtime-file lookup or
read-back.

## Causal narrowing

Linux/RV64 numbers decode as `set_tid_address(96)`,
`rt_sigprocmask(135)` twice, and `rt_sigaction(134)`. Instrumentation observed
user stack pointers `0x80402720`, `0x80402730`, `0x804027d0`, and `0x80402700`
for those calls. At each call the stack leaf was the same valid user RW leaf,
raw PTE `0x202c04d7`; `service_trap_count` remained zero. Thus the evidence
rejects a missing stack leaf, lost write permission, and accidental terminal
branch selection at those four syscall returns.

ELF symbol inspection identifies `0x80200068` as `userServiceTrapEntry`;
`0x8020006e` is its first trap-frame store after the `sscratch` stack swap.
QEMU interrupt tracing reports no preceding user store fault: the recorded fault
is the supervisor trap-entry store itself, targeting the child user-stack area.
A diagnostic-only experiment that retained `sstatus.SUM` for the fork child
removed this exact nested trap, confirming that the entry store is attempting a
U page, but it intentionally was not retained: Morphic's established SUM-clear
boundary must not be weakened, and that experiment did not complete `cat`.
Returning success for syscall 134 alone also did not move the fault, rejecting
speculative `rt_sigaction` compatibility as the minimum repair.

The smallest next experiment is to trace the final return sequence after syscall
134 and prove the live `sscratch` value immediately before the next child trap.
The likely invariant defect is a trap-stack handoff/return problem in the
serialized fork child, not an ELF writable segment, brk, anonymous-memory, TLS,
or runtime-file semantic. Repair must preserve SUM clear rather than masking the
fault.

## Validation and limitations

`python3 tools/query-reference.py agent bootstrap` passed. Initial doctor failed
only because `.venv/bin/python` was absent; Zig 0.14.0 was present. Artifact
acquisition and the exact namespace-backed machine build passed. Multiple real
QEMU 8.2.2 reproductions and the bounded diagnostic experiments above executed.
No runtime implementation repair was retained, so focused and aggregate code
validation were not used to claim advancement. Command-reference validation was
run after documenting this handoff.

The highest earned milestone remains redirection without external read-back.
Pipelines and Playable Alpine remain unearned. The known intermediate-component
symlink limitation remains unchanged.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** preserve SUM clear while repairing the
fork-child trap return/`sscratch` invariant that makes `userServiceTrapEntry`
store its frame into the U stack after syscall 134; then retry unchanged
`cat /tmp/hello` before adding any syscall or attempting pipelines.
