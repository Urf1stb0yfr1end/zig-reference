# Multi-Civilization Empirical Kernel Distillation Vocabulary

This document defines the project term **Empirical Kernel Distillation across multiple software civilizations** and the supporting vocabulary used when Morphic is pressured by more than one independent userspace world.

These are project terms, not claimed industry standards.

---

## 1. Empirical Kernel Distillation across Multiple Software Civilizations

**Empirical Kernel Distillation across multiple software civilizations** is the extension of Empirical Kernel Distillation in which the permanent kernel basis is inferred from recurring semantic requirements observed across multiple independent software worlds rather than from one compatibility ecosystem alone.

The current canonical peer worlds are:

```text
QuirkM native userspace
Linux ABI/personality userspace
WebAssembly/WASI userspace
```

All three are consumers of the Morphic foundation. None owns the center.

```text
                         SOFTWARE CIVILIZATIONS
                                  |
              ┌───────────────────┼───────────────────┐
              |                   |                   |
              v                   v                   v
        QuirkM native          Linux ABI          WebAssembly
           pressure             pressure             pressure
              |                   |                   |
              └───────────────────┼───────────────────┘
                                  |
                                  v
                       recurring semantic needs
                                  |
                                  v
                      candidate neutral mechanisms
                                  |
                                  v
                         MORPHIC FOUNDATION

      civilization-specific historical representation stays at its edge
```

The method asks not merely:

> What does Linux need?

but:

> What semantic capabilities keep reappearing when independent software civilizations are given access to the same small foundation?

The purpose is to make Architectural Neutrality empirically testable.

---

## 2. Cross-Civilization Pressure Triangulation

**Cross-Civilization Pressure Triangulation** is the use of two or more independent software worlds to determine whether an observed requirement is probably a general mechanism or merely compatibility residue.

For example:

```text
Linux: futex wait/wake
QuirkM: native waitable condition
WASI: pollable/resource wait
        |
        v
possible recurring need:
wait for state change and wake eligible execution contexts
```

The historical APIs differ. The semantic recurrence is what matters.

A repeated requirement is evidence, not automatic admission. The mechanism must still pass the normal Permanent Mechanism, MinMax, causal-proof, and irreversibility tests.

---

## 3. Civilization-Specific Residue

**Civilization-Specific Residue** is behavior required by one software world whose historical representation should remain in that world's personality, adapter, runtime, or library rather than becoming Morphic ontology.

Examples include:

- Linux fd numbering;
- Linux syscall numbers and negative errno encoding;
- a particular Linux `ioctl` number;
- `/proc` path conventions;
- WASI-specific handle or component-model representation;
- QuirkM-native presentation policy that is not required by the foundation.

```text
semantic capability         -> candidate foundation mechanism
historical representation   -> civilization-specific residue
```

---

## 4. Civilization Recurrence

**Civilization Recurrence** is the independent appearance of substantially the same semantic need in multiple software worlds even when each world expresses it through a different API.

Examples of possible recurring needs include:

- resource identity and lifetime;
- address-space or memory-region control;
- execution contexts;
- wait/wake and event observation;
- clocks and timers;
- message or byte transport;
- shared memory;
- capability delegation;
- isolation boundaries.

The project should compare semantics, not names. `fd`, `ResourceRef`, and a WASI resource handle are not automatically the same object merely because each can refer to something. The question is which lower-level properties genuinely recur.

---

## 5. Multi-Civilization Admission Rule

When pressure suggests a new permanent Morphic mechanism, ask:

1. **Which civilization exposed the need first?** Record the exact real pressure.
2. **Does the same semantic need appear, or plausibly belong, in another independent world?** Recurrence strengthens the case for generality.
3. **What representation is specific to the originating civilization?** Keep that representation out of the permanent center.
4. **What is the smallest semantic contract common to the independent uses?** Admit that contract, not the union of their APIs.
5. **Can each consuming world reach it through a replaceable adapter or native interface?** No personality should become architecture.
6. **What causal proof demonstrates the mechanism?** Prefer independent proof in each world as those worlds become executable.
7. **What would be expensive to reverse?** Apply the Irreversibility Budget before fossilizing shared ontology.

A mechanism does not have to be used by all three worlds before it may exist. The rule is a design and research test, not a voting system. Some genuinely general mechanisms will first be discovered by only one pressure source.

---

## 6. Canonical Relationship

```text
Empirical Kernel Distillation
        |
        +-- one software world can discover useful mechanisms
        |
        v
Empirical Kernel Distillation across multiple software civilizations
        |
        +-- compare independent pressure
        +-- identify semantic recurrence
        +-- quarantine civilization-specific residue
        +-- strengthen Architectural Neutrality
        |
        v
Minimum Generative Basis
```

The research ambition is not to compute the literal intersection of Linux, QuirkM, and WebAssembly APIs. A literal API intersection would be too weak and historically arbitrary.

The ambition is to discover the **smallest generative semantic basis** from which several independently designed software civilizations can be expressed without any one of them dictating the foundation's ontology.

---

## 7. Short Forms

> **Do not distill one civilization into the kernel. Distill the general basis revealed by several civilizations.**

> **Independent software worlds are stronger oracles for neutrality than one software world alone.**

> **QuirkM, Linux, and WebAssembly are parallel consumers. Morphic is the center.**

Related canonical documents:

- `docs/project_vocab.md`
- `docs/concepts/PRESSURE_ORACLE_INHERITANCE_ENGINEERING_VOCABULARY.md`
- `docs/papers/EMPIRICAL_KERNEL_DISTILLATION.md`
- `docs/research/MORPHIC_GENERAL_SYSTEMS_RESEARCH_SUBSTRATE_PROPOSAL.md`
