# Mastery: Source Span

## Mental model
A source span is a half-open byte interval `[start,end)` into a separate source buffer.

## Invariants
- `start <= end`;
- length is `end - start` without overflow;
- slicing requires `end <= source.len`;
- the span owns offsets, not source bytes.

## C pain
Pointer pairs, offset-length pairs, and line/column caches drift apart. Empty ranges and endpoint conventions vary by caller.

## Zig answer
One value states the half-open convention and slices through a checked boundary.

## Remaining danger
The source buffer must remain the same logical text. Byte spans do not automatically track edits or Unicode character boundaries.