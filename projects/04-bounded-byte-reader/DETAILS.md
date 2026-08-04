# Bounded Byte Reader Details

## Purpose
Read typed values and subranges from borrowed bytes without allowing the cursor to leave the input.

## C pain addressed
C parsers often duplicate pointer arithmetic, trust external lengths, overflow during bounds checks, consume partial input on failure, and hide byte-order assumptions.

## Public surface
- `BoundedReader.init(input)`
- `remaining() usize`
- `position() usize`
- `readByte() !u8`
- `readBytes(count) ![]const u8`
- `skip(count) !void`
- `readU16Le`, `readU16Be`
- `readU32Le`, `readU32Be`
- `subReader(count) !BoundedReader`

## Inputs
- Borrowed immutable byte slice whose lifetime covers the reader and every returned slice or child reader.
- Requested byte counts and field widths.

## Outputs
- Copied integer values.
- Borrowed byte slices.
- Child readers confined to selected subranges.

## Invariants
- `cursor <= input.len`.
- Remaining bytes equal `input.len - cursor`.
- A failed operation leaves the cursor unchanged.
- Every integer operation names its byte order.
- A child reader cannot access bytes outside its assigned subrange.

## Failure behavior
Insufficient input returns `error.UnexpectedEnd` without consuming bytes.

## Ownership
The reader owns no input. All slices and child readers borrow from the original input.

## Dependencies
None.

## Expected dependents
- binary format parsers
- protocol decoders
- ELF and executable loaders
- archive inspectors
- database record readers
- virtual-device command decoders

## Adaptation notes
Suitable for hosted and freestanding code. Semantic validation belongs in a higher parser layer. Callers must keep the original byte storage alive.

## Test command
```sh
zig build test-bounded-reader
```

## Source map
- implementation: `src/bounded_reader.zig`
- introduction: `README.md`
- study guide: `MASTERY.md`
