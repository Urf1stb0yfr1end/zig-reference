# Mastery: Semantic Version

## Mental model
Version components are separate ordered fields, not decimal digits packed into one integer or compared as strings.

## Invariants
- comparison checks major, then minor, then patch;
- values are copied and immutable by convention;
- compatibility policy is explicit and replaceable.

## C pain
Packed integers truncate component ranges, string comparison orders `1.10` before `1.2`, and compatibility rules drift across callers.

## Zig answer
A structured value and one comparison function centralize the policy.

## Remaining danger
Real semantic-version specifications include prerelease and build metadata. This foundational module intentionally covers only the numeric core.