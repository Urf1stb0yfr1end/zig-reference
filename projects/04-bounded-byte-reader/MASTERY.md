# Mastery: Bounded Byte Reader

## Mental model

The reader is a borrowed slice plus a cursor. It does not interpret an entire file. It answers a smaller question:

> Can this exact number of bytes be consumed from the current position?

If yes, it advances and returns a slice. If no, it changes nothing.

## The foundational operation

Every public read reduces to:

```text
verify count <= remaining
remember start
compute end
advance cursor
return input[start..end]
```

The order matters. Mutation occurs only after the request has been proven valid.

## What must always be true

- `cursor` never exceeds `input.len`.
- subtraction in `remaining()` is therefore valid.
- failed reads do not partially consume data.
- returned slices borrow the original input.
- integer byte order is never implicit.

## Why compare `count` with `remaining`

A tempting check is:

```text
cursor + count <= input.len
```

But `cursor + count` itself may overflow before the comparison. This implementation checks:

```text
count <= input.len - cursor
```

Because the cursor invariant guarantees `cursor <= input.len`, the subtraction is valid and the comparison avoids addition overflow.

This is a reusable systems principle:

> Arrange boundary checks so the check itself cannot overflow.

## Borrowing and lifetime

The reader does not allocate. Returned byte slices refer to the original input. They remain valid only as long as that input remains valid and unmoved.

This is efficient, but it is a real contract. A later owned parser model must copy any data that needs to outlive the source buffer.

## Failure atomicity

Suppose one byte remains and a parser requests four. The operation returns `error.UnexpectedEnd` with the cursor unchanged.

That allows a caller to:

- report the exact failing position;
- attempt an alternative interpretation;
- preserve deterministic parser state;
- test failure without reconstructing the reader.

## Sub-readers as structural boundaries

A length-prefixed binary section should not receive the entire remaining file. It should receive a child reader over exactly the declared section.

This converts a format rule into a memory boundary:

```text
parent bytes
├── section reader: exactly N bytes
└── following data: inaccessible to section parser
```

The child parser cannot overconsume into the next record even if its internal logic is wrong.

## Explicit endianness

`readU32Le` and `readU32Be` are separate operations because byte order is part of the format, not a machine default to be guessed.

The manual shifts are intentionally visible in this early reference. A later implementation may use a standard-library integer reader after the student understands the representation.

## Tests to understand

1. Sequential reads prove cursor and remaining-byte behavior.
2. A failed read proves the cursor is unchanged.
3. Little- and big-endian reads prove byte order explicitly.
4. A sub-reader proves nested structural confinement.
5. A zero-length read proves the smallest valid request.

## Exercises

1. Add `peekBytes(count)` without advancing.
2. Add `seekAbsolute(position)` with checked bounds.
3. Add signed integer reads.
4. Add `readUntilByte(delimiter)` with clear delimiter-consumption semantics.
5. Parse a tiny header containing magic bytes, version, and payload length.
6. Add a checkpoint type that can explicitly restore a prior cursor.
7. Explain which operations are safe for attacker-controlled input and why.

## Readiness questions

You understand this project when you can explain:

- why checking `count > remaining()` avoids addition overflow;
- why failed reads must not advance;
- what owns a returned slice;
- how sub-readers prevent cross-section consumption;
- why parsing and ownership should remain separate concerns.
