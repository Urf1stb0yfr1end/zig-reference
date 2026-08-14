# QuirkM Non-Inheritance Proof Template

## Purpose

This is **not another Linux-issues list**.

QuirkM already has:

- `100_PARAMOUNT_LINUX_COMPATIBILITY_DEBTS.md` for Q-0001 through Q-0100;
- `ANOTHER_400_LINUX_ISSUES.md` for Q-0101 through Q-0500;
- `QUIRKM_NATIVE_API_AND_LINUX_QUIRK_QUARANTINE_PROPOSAL.md` for the architectural rule that Linux-only historical behavior should remain quarantined at the compatibility edge.

This document is the compact proof format for promoting a candidate Q-xxxx entry from a research pressure into a demonstrated QuirkM non-inheritance result.

The objective is not to prove that Linux is "bad." The objective is to prove, case by case, that QuirkM can preserve required Linux behavior through Morphic without making that historical behavior a native QuirkM dependency.

## Canonical entry format

### LEGACY PROPERTY

Linux/Unix convention being examined.

### WHY IT EXISTS

Historical / compatibility / architectural reason.

### WHY QUIRKM DOES NOT NEED TO INHERIT IT

Clean-slate argument.

### MORPHIC COMPATIBILITY STRATEGY

How foreign Linux software still receives the behavior it expects.

### QUIRKM NATIVE ALTERNATIVE

The simpler, safer, more explicit, or more general native mechanism.

### PROOF

Test showing Linux compatibility still works.

### NON-INHERITANCE TEST

Test proving native QuirkM does not depend on the legacy property.

## Promotion rule

A candidate should not be called a proven non-inheritance result merely because a cleaner alternative has been proposed.

Prefer this progression:

```text
Q-xxxx candidate
    -> identify the real Linux/Unix behavior
    -> establish why compatibility keeps it sticky
    -> isolate the fundamental capability underneath it
    -> provide the required Linux behavior at the Morphic compatibility edge
    -> expose the cleaner QuirkM-native mechanism
    -> prove Linux compatibility still works
    -> prove native QuirkM does not depend on the legacy property
    -> PROMOTED NON-INHERITANCE RESULT
```

The strongest result is therefore two-sided:

```text
foreign Linux software still works
            +
native QuirkM never had to inherit the quirk
```

That is the evidence standard for turning the existing Quirk Ledger into a demonstrated non-inheritance corpus.
