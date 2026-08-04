# Mastery: Validated ASCII Byte

## Mental model
Construction is the trust boundary. Once created, the stored `u7` proves the value lies in `0...127`.

## Invariants
- every instance is ASCII;
- `get` returns the exact original byte;
- classifiers operate without locale or signed-character ambiguity.

## C pain
`char` signedness varies, `ctype` functions have input preconditions, and locale can alter behavior.

## Zig answer
A precise `u7` representation preserves the range in the value itself.

## Remaining danger
ASCII validity is not UTF-8 semantic validity and does not imply printable text. Higher modules must define accepted character classes.