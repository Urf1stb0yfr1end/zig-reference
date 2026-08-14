# Agentic Snowball Batch 32D handoff

## State and regression-floor classification

- Inherited main SHA: `302761105e0efa70e5eadb18cb005a5793fd4153`; this continuation branch also retains the later documentation commits through `69f79d12ce2b344a088d7edb458dfcf6579cd4dc`.
- Environment: Zig 0.14.0 and `qemu-system-riscv64` 8.2.2 (`1:8.2.2+ds-0ubuntu1.18`).
- The first current Batch 25B run reached the literal guest output `stdin-25b` and then shut down before its evidence frame. This was a real Batch 32D regression: after the guest's final close retired stdin, the new final proof attempted to resolve the stale `stdin_ref` in order to read its resource-owned state.
- The repair keeps backend state resource-owned and derives the retired fixture's completed-read boundary from its two retained successful read completions. It does not restore a global input cursor or keep a resource alive after its final close.
- After that repair the machine emits the Batch 25B evidence, but the inherited verifier next rejects the current active-Sv39 evidence because six caller-artifact page-table frames are outside its historical eight-page owned-pool interval. The machine explicitly reports ten page tables, with the first four inside `0x802b1000..0x802b9000` and six reserved tables at `0x80700000..0x80706000`. This is a verifier/evidence-model mismatch independent of the repaired process-I/O lifecycle, not evidence of a QEMU-version failure. The verifier was not broadly relaxed in this handoff.

## Exact Alpine live-console pressure

The hash-pinned Alpine v3.22.0 RV64 minirootfs was freshly acquired by the canonical pressure tool. It verified 517 objects, 7,069,903 regular-file bytes, `/bin/sh -> /bin/busybox`, BusyBox SHA-256 `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`, PT_INTERP `/lib/ld-musl-riscv64.so.1`, interpreter SHA-256 `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`, and namespace-data SHA-256 `7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.

The exact build succeeded:

```text
zig build install-freestanding-riscv64-morphic-runtime \
  -Dexternal-rv64-namespace-manifest=/tmp/batch32d-ns/namespace.json \
  -Dexternal-rv64-namespace-data=/tmp/batch32d-ns/namespace.data \
  -Dexternal-rv64-argv0=/bin/sh \
  -Dexternal-rv64-live-console-input=true \
  --prefix /tmp/batch32d-machine
```

The resulting machine was run with system QEMU using `-machine virt -nographic -bios default -kernel`. It preserved interpreter-first preparation, reached COMMIT and execute, and reported W+X=0. The unchanged real shell did **not** become interactive: it exited with status 127, no captured command output, after 41 syscalls. The trace includes unsupported Linux/RISC-V compatibility calls, notably syscall 29 (`ioctl`) with request `0x5413` (`TIOCGWINSZ`), as well as startup/metadata calls. Input sent as `echo morphic` and `pwd` therefore produced no shell round trip. No synthetic prompt, banner, or success marker was added.

## Validation

- `PYTHONDONTWRITEBYTECODE=1 python3 tools/pressure-real-rv64-alpine-minirootfs.py --artifact-only --namespace-output-dir /tmp/batch32d-ns`: PASS.
- Exact live-console machine build: PASS.
- Exact QEMU run: FAIL to reach a persistent shell; machine proof reached execute and terminated status 127.
- `python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py --self-test`: PARTIAL after the lifecycle repair; Batch 25B evidence now completes, then the inherited active-Sv39 parser rejects reserved caller-artifact table frames outside its historical pool.

## One next causal blocker

**Add bounded diagnostic classification for the exact Alpine status-127 path so the first fatal startup syscall is distinguished from tolerated ENOSYS calls; begin with the observed RV64 `ioctl(fd=0, request=TIOCGWINSZ/0x5413, argp)` and implement it only if the unchanged shell proves it causal.**

## Final status

| Result | Status |
|---|---|
| Batch 32C real Alpine regression | NOT RUN |
| Batch 25B QEMU floor classified | PASS |
| deterministic fixture regression | FAIL (verifier/evidence-model mismatch after repaired lifecycle completion) |
| resource-owned process I/O | PASS |
| explicit live-console selection | PASS |
| live fd0 input | NOT RUN |
| fd1/fd2 console output | NOT RUN |
| exact Alpine namespace | PASS |
| real Alpine `/bin/sh` entered | PASS (execute reached; shell then exited 127) |
| real musl interpreter-first | PASS |
| PREPARE/COMMIT | PASS |
| W+X=0 | PASS |
| persistent interactive shell | FAIL |
| `echo morphic` round-trip | FAIL |
| second interactive command | NOT RUN |
| `pwd` | NOT RUN |
| `ls /` | NOT RUN |
| `cat /etc/alpine-release` | NOT RUN |
| writable `/tmp` | NOT RUN |
| redirection | NOT RUN |
| pipe | NOT RUN |
| PLAYABLE ALPINE | NOT REACHED |
| repository validation | NOT RUN at this early handoff |
| remote persistence | BLOCKED (origin configured; HTTPS credentials unavailable in this non-interactive checkout) |
