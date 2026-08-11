# QuirkM

QuirkM is the proposed native Morphic API/personality: **clean by default, Linux-compatible when explicitly requested, and designed to turn Linux compatibility pressure into reusable native counterdesigns.**

This directory is the canonical home for QuirkM documentation.

## Canonical documents

- `QUIRKM_NATIVE_API_AND_LINUX_QUIRK_QUARANTINE_PROPOSAL.md` — architecture, quirk quarantine, native/Linux dual personality, agentic migration, and design laws.
- `100_PARAMOUNT_LINUX_COMPATIBILITY_DEBTS.md` — Q-0001 through Q-0100, the highest-priority inherited Linux compatibility debts QuirkM should study first.
- `ANOTHER_400_LINUX_ISSUES.md` — Q-0101 through Q-0500, the broader research backlog of Linux pitfalls, sharp edges, legacy surfaces, and design pressures.

## Core rule

> **Implement the capability once. Preserve Linux behavior where compatibility requires it. Expose a cleaner QuirkM contract where history does not. Never confuse the compatibility adapter with the architecture.**

## QuirkM method

Every candidate issue should eventually record:

```text
Linux behavior
why it is sticky / compatibility-sensitive
fundamental capability underneath it
QuirkM counterdesign
Linux compatibility mapping
native counter-proof
Linux compatibility proof
agent migration rule, if one can be made safe and reusable
```

The Quirk Ledger is therefore not a list of insults aimed at Linux. It is a design and migration corpus.

Some entries are true bugs. Some are historical ABI debt. Some are superseded interfaces. Some are fundamental tradeoffs where QuirkM may choose a different default. Before a candidate becomes a QuirkM design law, evidence must separate those categories.

## Paramount versus broader backlog

The first 100 are deliberately stricter. They are intended to capture especially deep, sticky interfaces where Linux has strong compatibility obligations or where later Linux interfaces visibly mitigate earlier constraints. They are **not** a claim that Linux maintainers universally wish each item could simply be deleted.

The additional 400 are broader candidates. They are research prompts, not settled accusations. Each must earn promotion through authoritative documentation, real software pressure, Linux evolution, cross-system evidence, or direct Morphic compatibility experience.

## Agentic goal

QuirkM should turn compatibility debt into bounded work:

```text
large goal
    remove unnecessary Linux-semantic dependence
        |
        v
named quirk classes Q-xxxx
        |
        v
small migration tasks
        |
        v
contract tests + differential proofs
        |
        v
reusable transformation
        |
        v
future ports require less novel work
```

The strongest success metric is not merely “one application ported.” It is **one class of future porting work eliminated and preserved as verified reusable knowledge.**
