# RISC-V SFENCE.VMA Invalidation

## Purpose
Testable SFENCE.VMA command planning with an explicit privileged execution boundary.

## C pain addressed
Direct C encodings are attractive and compact, but ownership, validation, rollback, and architectural legality otherwise remain conventions. Zig makes this module's boundary explicit; it cannot select policy or synchronize harts.

## Public surface
`Plan, global, forAddress, forAsid, forAddressAsid, executeUnsafe`. Exact signatures are authoritative in source.

## Import and location
Import `@import("riscv-sfence-vma-invalidation")`; implementation `projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig`; smoke `projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig`.

## Inputs
Scalars are copied. Provider and owner pointers are borrowed per call. Addresses must be canonical and aligned.

## Outputs
Copied results own no hidden allocation and require no cleanup.

## State and invariants
No hidden global state. Sv39 supports 4 KiB, 2 MiB, and 1 GiB leaves. Malformed encodings and noncanonical addresses are rejected.

## Failure behavior
Structured errors report failures. Builder construction rolls back newly allocated intermediate pages; no silent replacement, split, or merge occurs.

## Ownership and cleanup
Allocation is explicit and bounded. The caller owns synchronization, cleanup, and execution of invalidation plans. Copying a live owner is prohibited by contract; transfer invalidates its old binding.

## Dependencies
- `riscv-sv39-virtual-address-indexing` via its named build import.

## Expected dependents
Kernels, supervisors, bootloaders, debuggers, Hyper-Zig, and future adapted Sv39x4 layers.

## Composition examples
```zig
const module = @import("riscv-sfence-vma-invalidation");
_ = module;
```
See `construct-and-verify-sv39-address-space`.

## Compatibility and adaptation
Zig 0.14.0. Representation/planning are hosted and freestanding; actual SFENCE.VMA requires riscv64 privilege. No libc or hidden allocator. Caller synchronization is required. Sv39x4 root geometry remains an extension boundary.

## Complexity and limits
Value operations are O(1); walking reads at most three entries. Builder resources are bounded by its injected owner.

## Validation
Run `zig build test-riscv-sfence-vma-invalidation` and `zig build smoke-riscv-sfence-vma-invalidation`. Architectural source: RISC-V Privileged Architecture Specification snapshot 20260120, sections 11.1.4 and 11.1.2.1. Hosted tests never execute privileged instructions.

## Source map
- `projects/48-riscv-sfence-vma-invalidation/src/riscv_sfence_vma_invalidation.zig`
- `projects/48-riscv-sfence-vma-invalidation/tests/smoke_test.zig`
- `projects/48-riscv-sfence-vma-invalidation/README.md`
- `projects/48-riscv-sfence-vma-invalidation/MASTERY.md`
