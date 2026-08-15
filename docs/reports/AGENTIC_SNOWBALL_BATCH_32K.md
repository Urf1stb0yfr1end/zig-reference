# Agentic Snowball Batch 32K handoff

## Clock, inheritance, and persistence

- Visible clock start: `2026-08-15T09:59:07Z`.
- Inherited SHA: `5f8e348d67d5d26fea66bb0db3616784600f5505` on branch `work`. It contains authoring main merge `8df48924815f09da26ed399e13c4a24542e29c2b` plus the Batch 32K request.
- Sync was attempted first and failed closed: this checkout has no remote named `origin` and no local `main` branch. No inherited work was overwritten.
- GitHub-persisted PR #87 head: `335e8aa097e0740ff6cdad0b1b15b8a48c3e7247` (`morphic: complete Batch 32K ownership repair proof`). The persisted merge boundary is `47b3bb3b142edb4d931a8804d55e15ef98faf6f5` (`Merge PR #87: Batch 32K transactional open and F_DUPFD frontier`). The earlier agent-local `a39268b` identifier was not persisted in PR #87 and is not a reproducible history boundary.
- Push and PR creation are unavailable because `git remote -v` is empty. The successor must configure `origin`, push `work`, and open the PR.

## Mandatory inherited repairs

### O_APPEND fails closed

Linux/RV64 `O_APPEND` (`0x400`) is now rejected with `EINVAL` before runtime namespace lookup can commit create or truncate, resource creation, or descriptor binding. Ordinary non-append `O_CREAT` and `O_TRUNC` remain admitted. No false append guarantee is exposed.

### Runtime open is transactional

Runtime open now follows PREPARE -> COMMIT ordering. It first finds a free descriptor and checks resource-table capacity; only then does `RuntimeNamespace.openPrepared` create or truncate an object. Resource and binding creation follow the namespace commit in the single-threaded machine after both bounded capacities are proven. The focused namespace regression covers descriptor-full and resource-full create (object absent), descriptor-full and resource-full truncate (the existing `seed` bytes remain), successful create/truncate, and caller capacity remaining untouched. The resource-table tests separately prove failed bounded duplication does not alter reference ownership.

## Descriptor duplication advance

The neutral `BindingTable` now supports lowest-free selection at or above a caller minimum. The process binding bound is explicitly 16, enough for ash's observed minimum 10. Linux/RV64 `fcntl(25)` recognizes only `F_DUPFD` command zero, resolves the source binding, preflights the destination, retains the same resource description before binding, and returns `EBADF`, `EMFILE`, or `ENFILE` without leaking a binding/reference on failure. Aliases therefore share the resource-owned offset/state, and ordinary close releases only one retained reference.

Focused proof selects slot 11 when slot 10 is occupied, rejects an impossible minimum atomically, preserves the reference count, and retains the existing shared-state/close lifecycle tests.

## Validation actually completed

- `zig fmt` completed for all changed Zig sources.
- `zig build test-bounded-resource-table` passed.
- `zig build test-recipe-run-hosted-morphic-runtime` passed.
- Exact freestanding namespace build passed with Zig 0.14.0.
- `git diff --check` passed before implementation persistence.
- Agent bootstrap passed. Agent doctor reported only the inherited missing `.venv/bin/python` prerequisite.
- `qemu-system-riscv64` was absent. A bounded package-install attempt did not make it available, so real-QEMU evidence was not fabricated.

## Exact Alpine artifact and attempted pressure

The exact Alpine v3.22.0 RV64 minirootfs was reacquired from the canonical URL. Archive SHA-256 is `ae050812fadcde048e9553004d0d037b2b9c0ec6be09f303db95768a2e35551b`; 517 namespace objects contain 7,069,903 immutable bytes. BusyBox SHA-256 is `4567ce8a67afd045a9be46745236cf6fca0347f70871a2492c94c166eada856e`, musl SHA-256 is `f65dfa1e845af4d8c57f5274a8abac7a8c150372b014fb413e44f4cc70050de1`, and namespace data SHA-256 is `7672a8c49fbd75071a6390a55e227927254afe1eabdad969315414332e5b989b`.

Build command:

```text
zig build install-freestanding-riscv64-morphic-runtime -Dexternal-rv64-namespace-manifest=/tmp/b32k/ns/namespace.json -Dexternal-rv64-namespace-data=/tmp/b32k/ns/namespace.data -Dexternal-rv64-argv0=/bin/sh -Dexternal-rv64-live-console-input=true --prefix /tmp/b32k/install
```

Required QEMU command (not executable in this environment):

```text
qemu-system-riscv64 -machine virt -nographic -bios default -kernel /tmp/b32k/install/bin/morphic-freestanding-riscv64
```

There is no new QEMU output. The last inherited real output remains:

```text
/tmp
/bin/sh: fcntl(1,F_DUPFD,10): Function not implemented
```

## Earned milestone and next pressure

Highest genuinely earned real-runtime milestone remains **read-only Alpine plus bounded writable runtime state reached by real ash before descriptor duplication**. The F_DUPFD repair is compile- and focused-test-proven but not real-QEMU-proven. Redirection did not newly pass; runtime read-back did not pass; the real pipeline did not pass; the full one-shell Playable Alpine sequence did not pass.

Source namespace immutability, bounded runtime state, PREPARE -> COMMIT image replacement, mapping preflight, W+X=0, cwd semantics, resource ownership, and the documented relative-path limitations remain preserved. The `morphic-batch32g-openat-known-symlink-gap` limitation also remains relevant and non-causal.

**EXACTLY ONE NEXT CAUSAL BLOCKER:** real system-QEMU availability is required to retry unchanged `echo hello > /tmp/hello` and determine whether the implemented ownership-correct `F_DUPFD` crosses ash's inherited causal boundary or exposes the next real syscall.

## PR #87 focused review repair

- Repair inherited head: `e841a5a21de837482a421f817c5bd8ab3a0e868e`; branch sync was unavailable because this checkout still has no `origin` remote.
- The three new bounded-resource-table methods now have complete endpoint contracts. `port.js` was regenerated from canonical `details.json`, followed by canonical port, repository, endpoint, agent-index, and all-module validation-evidence regeneration.
- Runtime open now uses one testable `openResource` PREPARE -> COMMIT helper for the actual namespace mutation, resource-description creation, and descriptor installation path used by the Linux/RV64 edge.
- The combined regression fills descriptor capacity and resource capacity independently and proves failed create/truncate preserve object presence/bytes, resource count, binding topology, and reference counts. It also proves successful create and successful truncate each install exactly one new resource description and binding.
- `zig build check` passed. `python3 tools/developer-command.py validate-repository` passed all 350 build steps and 249 tests under Zig 0.14.0.
- `qemu-system-riscv64` remains unavailable, so the inherited real-QEMU milestone and exactly one next causal blocker above remain unchanged.
