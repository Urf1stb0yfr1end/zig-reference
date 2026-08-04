# Binary Cursor Checkpoint Details

## Purpose
Capture and restore bounded-reader positions for speculative parsing.

## C pain addressed
The compact direct C implementation is useful, but bounds, rollback, ownership, stale-reference, and overflow conventions become duplicated and inconsistently enforced.

## Public surface
All `pub` declarations in `projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig` are supported. Exact signatures, structured inputs, outputs, errors, mutation, borrowing, and endpoint guarantees are indexed in `details.json`.

## Import and location
Named import: `binary-cursor-checkpoint`. Implementation: `projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig`. External test: `projects/29-binary-cursor-checkpoint/tests/smoke_test.zig`.

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
`bounded-byte-reader`. Exact paths and imported symbols are recorded in `details.json`.

## Expected dependents
optional-field parsers, union decoders, protocol backtracking.

## Composition examples
```zig
const component = @import("binary-cursor-checkpoint");
comptime { _ = component; }
```
Combine it only through named imports with the dependency modules above.

## Compatibility and adaptation
Targets Zig 0.14.0. Parser/fixed modules are hosted and freestanding; allocator ownership needs an allocator implementation. No internal synchronization; callers synchronize shared mutation. Endianness is explicit where applicable.

## Complexity and limits
O(1) scalar operations; O(n) search, sorting, table parsing, or iteration. Capacity is compile-time for fixed collections. Address storage uses repository `usize`-backed domain types.

## Validation
Unit: `zig build test-binary-cursor-checkpoint`. Smoke: `zig build smoke-binary-cursor-checkpoint`. Contract formatting/checking completed; Zig compiler execution is pending because Zig is unavailable.

## Source map
Implementation, unit tests: `projects/29-binary-cursor-checkpoint/src/binary_cursor_checkpoint.zig`. Smoke: `projects/29-binary-cursor-checkpoint/tests/smoke_test.zig`. Documentation: this file, `README.md`, `MASTERY.md`, and `details.json`. No examples, fixtures, benchmarks, or fuzz targets.
