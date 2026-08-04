# Physical Page-Frame Allocator Details

## Purpose
Allocate physical frames from a validated usable region with fixed metadata.

## C pain addressed
The compact direct C implementation is useful, but bounds, rollback, ownership, stale-reference, and overflow conventions become duplicated and inconsistently enforced.

## Public surface
All `pub` declarations in `projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig` are supported. Exact signatures, structured inputs, outputs, errors, mutation, borrowing, and endpoint guarantees are indexed in `details.json`.

## Import and location
Named import: `physical-page-frame-allocator`. Implementation: `projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig`. External test: `projects/36-physical-page-frame-allocator/tests/smoke_test.zig`.

## Inputs
Scalar policies and values are copied. Reader, slice, allocator, set, and collection pointers are borrowed for the operation or returned-view lifetime. Inputs are checked for relevant bounds, extent, conversion, alignment, overlap, capacity, format, and state constraints.

## Outputs
Value results are copied. Slices and pointers borrow their documented input or owner and require no cleanup. Owned byte storage must be released with `deinit`.

## State and invariants
No cursor escapes its extent; ranges are half-open and overflow checked; capacities are never exceeded; handles include generations; address domains remain typed; owned length never exceeds capacity.

## Failure behavior
Errors are enumerated in `details.json`. Parsing and failed insertion/allocation are failure atomic. Cleanup is required only for successfully initialized owned storage.

## Ownership and cleanup
No hidden allocation. Parser inputs are borrowed. Fixed-capacity state is inline. The owned buffer uses the caller allocator and requires exactly one `deinit` unless ownership is transferred.

## Dependencies
`bit-set`, `bitmap-allocator`, `checked-half-open-range`, `distinct-memory-address-types`, `physical-page-frame-number-and-address-conversion`, `physical-memory-region-set`. Exact paths and imported symbols are recorded in `details.json`.

## Expected dependents
page tables, EPT tables, guest-memory backing.

## Composition examples
```zig
const component = @import("physical-page-frame-allocator");
comptime { _ = component; }
```
Combine it only through named imports with the dependency modules above.

## Compatibility and adaptation
Targets Zig 0.14.0. Parser/fixed modules are hosted and freestanding; allocator ownership needs an allocator implementation. No internal synchronization; callers synchronize shared mutation. Endianness is explicit where applicable.

## Complexity and limits
O(1) scalar operations; O(n) search, sorting, table parsing, or iteration. Capacity is compile-time for fixed collections. Address storage uses repository `usize`-backed domain types.

## Validation
Unit: `zig build test-physical-page-frame-allocator`. Smoke: `zig build smoke-physical-page-frame-allocator`. Contract formatting/checking completed; Zig compiler execution is pending because Zig is unavailable.

## Source map
Implementation, unit tests: `projects/36-physical-page-frame-allocator/src/physical_page_frame_allocator.zig`. Smoke: `projects/36-physical-page-frame-allocator/tests/smoke_test.zig`. Documentation: this file, `README.md`, `MASTERY.md`, and `details.json`. No examples, fixtures, benchmarks, or fuzz targets.
