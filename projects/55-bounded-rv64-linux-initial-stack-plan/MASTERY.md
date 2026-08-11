# Mastery

## Mental model

The input range supplies address truth; the planner works backward from its exclusive top. It computes table and string sizes, aligns the resulting SP downward to 16 bytes, zeros the whole inline result, then fills strings and little-endian table words. Thus padding is data, not unspecified storage.

## Invariants

- The byte image and used range have identical length.
- SP and every table word are naturally aligned; SP is 16-byte aligned.
- Table, padding, and strings do not overlap.
- Every emitted pointer resolves inside the image to its intended NUL-terminated input.
- Required sentinels are planner policy, never caller bookkeeping.
- Errors return no partially usable plan and mutate no external state.

## C comparison

A direct C implementation is attractive because pointer tables and strings can be written with short loops. Its capacity arithmetic, pointer-width conversion, sentinel insertion, padding initialization, and failure-before-mutation discipline remain conventions spread across those loops. Zig makes capacities part of the result type, exposes checked errors, and uses a tagged union for symbolic pointers. Zig still cannot decide which auxv facts are truthful or ensure a later copier maps the image correctly.

## Exercises

1. Independently decode a plan without using its offsets except `initial_sp`.
2. Explain why the image includes alignment padding rather than returning only written fields.
3. Add an immediate aux entry and prove ordering remains unchanged.
