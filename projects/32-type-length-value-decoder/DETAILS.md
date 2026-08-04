# Type-Length-Value Decoder Details

## Purpose
Iterate allocation-free TLV records while preserving unknown tags.

## C pain addressed
The compact direct C implementation is useful, but bounds, rollback, ownership, stale-reference, and overflow conventions become duplicated and inconsistently enforced.

## Public surface
All `pub` declarations in `projects/32-type-length-value-decoder/src/type_length_value_decoder.zig` are supported. Exact signatures, structured inputs, outputs, errors, mutation, borrowing, and endpoint guarantees are indexed in `details.json`.

## Import and location
Named import: `type-length-value-decoder`. Implementation: `projects/32-type-length-value-decoder/src/type_length_value_decoder.zig`. External test: `projects/32-type-length-value-decoder/tests/smoke_test.zig`.

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
`bounded-byte-reader`, `checked-integer-cast`, `endian-integer-codec`, `binary-cursor-checkpoint`, `bounded-binary-sub-reader`, `length-prefixed-binary-field`. Exact paths and imported symbols are recorded in `details.json`.

## Expected dependents
PCI capabilities, network options, device descriptors.

## Composition examples
```zig
const component = @import("type-length-value-decoder");
comptime { _ = component; }
```
Combine it only through named imports with the dependency modules above.

## Compatibility and adaptation
Targets Zig 0.14.0. Parser/fixed modules are hosted and freestanding; allocator ownership needs an allocator implementation. No internal synchronization; callers synchronize shared mutation. Endianness is explicit where applicable.

## Complexity and limits
O(1) scalar operations; O(n) search, sorting, table parsing, or iteration. Capacity is compile-time for fixed collections. Address storage uses repository `usize`-backed domain types.

## Validation
Unit: `zig build test-type-length-value-decoder`. Smoke: `zig build smoke-type-length-value-decoder`. Contract formatting/checking completed; Zig compiler execution is pending because Zig is unavailable.

## Source map
Implementation, unit tests: `projects/32-type-length-value-decoder/src/type_length_value_decoder.zig`. Smoke: `projects/32-type-length-value-decoder/tests/smoke_test.zig`. Documentation: this file, `README.md`, `MASTERY.md`, and `details.json`. No examples, fixtures, benchmarks, or fuzz targets.
