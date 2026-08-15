# Agentic Snowball Batch 32Q handoff

## Persistence boundary

This run inherited local current-main content at
`8186007babc78be21af0d5c2e588bfa37be986fe`; the repository has no configured
remote, so the requested fetch/switch/pull could not execute. The coherent
pipe/runtime implementation is commit
`c002de2845f16970661eec7fde9d61b5a20eaf1a`. This report and milestone
documentation are persisted by the following documentation commit. Push is
unavailable without a remote; PR creation state is recorded below.

## Opening reproduction and neutral repair

The inherited exact pressure was `echo hello | cat`, with Linux/RV64
`pipe2(59)` reported as unsupported and ash printing `can't create pipe: Bad
file descriptor`. The repair adds an ABI-neutral allocation-free pipe store:
two possible streams, 4096 bytes per stream, FIFO/wraparound behavior, explicit
full/invalid failures, and no command, pathname, or payload knowledge. The
Linux edge accepts the observed flags-zero request, allocates distinct read and
write capability resources plus the two lowest descriptors, and includes the
checked pair copy-out in one rollback transaction. Flag, descriptor, resource,
pipe, and guest-copy failures do not leave bindings, resources, or pipe state.

Pipe bytes flow only through ordinary read/write/writev resource dispatch.
F_DUPFD and dup3 retain the existing resource reference, close releases exactly
one binding/reference, and the final endpoint close retires the neutral pipe.
Clone/exec use the existing bounded process snapshot. An empty read is EOF only
when no write-capable endpoint for the same pipe remains bound; buffered bytes
are consumed first. The current serialized child-first process model therefore
carried the writer child's bytes through shared pipe state, restored the parent,
then carried the reader endpoint into real BusyBox cat without fabricating
completion.

## Real-QEMU causal advancement and acceptance

The canonical Alpine v3.22.0 RV64 artifact was freshly downloaded and verified:
517 objects, 7,069,903 regular-file bytes, namespace SHA-256
`7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`,
BusyBox SHA-256
`4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`,
and musl SHA-256
`f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`.
QEMU 8.2.2 first proved the inherited cwd/redirection/read-back sequence, then
crossed pipe creation, endpoint duplication/inheritance/close, writer byte
flow, reader byte flow, EOF, both child completions, parent restoration, and
printed `hello` followed by `still-alive`.

A second fresh machine executed the complete persistent-shell sequence:

```text
echo morphic                 -> morphic
echo second                  -> second
pwd                          -> /
ls /                         -> genuine serialized root entries
cat /etc/alpine-release      -> 3.22.0
cd /tmp                      -> success
pwd                          -> /tmp
echo hello > /tmp/hello      -> success
cat /tmp/hello               -> hello
echo hello | cat             -> hello
echo still-alive             -> still-alive
```

Thus pipe creation, actual pipe byte flow, EOF/writer lifetime, parent-shell
survival, and **★ PLAYABLE ALPINE UNDER MORPHIC ★** are all **EARNED**.

## Permanent tests and validation

Focused tests cover FIFO order, buffer wraparound/full behavior, bounded pipe
allocation/reuse, invalid identities, capability-separated endpoints,
unsupported flags, descriptor exhaustion, and complete rollback after guest
copy-out failure. `zig build test-recipe-run-hosted-morphic-runtime` and the
namespace-backed freestanding build passed under Zig 0.14.0. Both real-QEMU
runs were host-bounded and ended with timeout status 124 only after the final
expected live-shell output. The opening doctor reported an absent
`.venv/bin/python`; the documented virtual-environment repair was applied and a
second doctor run passed every prerequisite. Remaining aggregate commands and
their exact result are recorded in the final response/commit state.

Inherited limitations remain: incomplete component-wise symlink semantics, a
tiny four-object/256-byte runtime overlay, serialized single-child execution,
bounded 4096-byte pipe buffering without a scheduler, and deliberately narrow
Linux ABI coverage. They do not invalidate the exact acceptance proof.

## Next causal pressure and PR state

Playable Alpine is complete, so there is no remaining Playable-Alpine blocker.
The next single causal pressure is to run the real Alpine `/sbin/apk --version`
(then help only after retry) and classify its first unchanged Linux/runtime
boundary before adding any package-manager facility.

The original Batch 32Q run had no configured remote. During the PR #93 review
follow-up, the public `origin` was configured and the existing PR branch was
fetched; the ownership correction was rebased onto its actual head and
persisted locally as commit `48b0123`. Push was attempted but could not
authenticate in this runner (`could not read Username`), so no remote update or
PR success is fabricated.

## PR #93 ownership review correction

The focused review follow-up repaired two lifetime omissions without changing
the earned milestone. Endpoint and writer discovery now examines both the
active child descriptor/resource tables and, while a fork-shaped snapshot is
live, `external_fork_bindings` with `external_fork_resources`. Consequently a
suspended parent's writer prevents false EOF, and any suspended endpoint keeps
the neutral pipe alive. Once the snapshot is no longer meaningful it does not
extend lifetime.

The generic `linux_rv64_dup3.replace` contract remains pipe-independent. The
runtime captures the target description before a successful replacement and
runs the same cross-process pipe-retirement decision afterward, closing the
orphaned-slot path when the displaced resource was the genuinely final
endpoint. Focused tests prove suspended-writer EOF protection, suspended-parent
retention, exactly-once final retirement, dup3 final displacement, active-alias
retention, suspended-snapshot retention, reference counts, and binding/resource
conservation.

The canonical Alpine artifact was freshly verified and the namespace-backed
machine rebuilt under Zig 0.14.0. QEMU 8.2.2 re-proved `echo hello | cat ->
hello` followed by `echo still-alive -> still-alive`, then a fresh machine
re-proved every line of the complete one-shell acceptance sequence recorded
above. Both machines remained live until the intentional host timeout. Thus
**★ PLAYABLE ALPINE UNDER MORPHIC ★ remains earned with corrected ownership.**
