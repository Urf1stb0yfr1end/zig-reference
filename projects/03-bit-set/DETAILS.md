# Fixed Bit Set Details

## Purpose
Represent a compile-time number of Boolean states compactly in machine words.

## C pain addressed
C bit maps often scatter word selection, shift-width conversion, bounds checks, and final-word masking across callers. Invalid shifts and padding bits can silently corrupt state.

## Public surface
- `FixedBitSet(bit_count){}`
- `set(index) !void`
- `unset(index) !void`
- `toggle(index) !void`
- `isSet(index) !bool`
- `setAll()`
- `clearAll()`
- `count() usize`

## Inputs
- Compile-time logical bit count.
- Runtime logical indices checked against that count.

## Outputs
- Boolean membership results.
- Count of logically enabled bits.

## Invariants
- Only indices below `bit_count` are logically addressable.
- Padding bits in the final storage word remain clear after bulk operations.
- Word and bit-position calculations use valid integer widths.
- Failed indexed operations do not mutate storage.

## Failure behavior
Out-of-range indexed operations return `error.IndexOutOfBounds` and leave state unchanged.

## Ownership
All words are inline. No allocation or borrowed data.

## Dependencies
None.

## Expected dependents
- bitmap allocator
- page-frame tracking
- permission sets
- graph visited sets
- slot maps
- scheduler readiness maps

## Adaptation notes
Suitable for hosted and freestanding code. Concurrent use requires atomic-word operations or external synchronization. Very large compile-time bit counts increase value size.

## Test command
```sh
zig build test-bit-set
```

## Source map
- implementation: `src/bit_set.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
