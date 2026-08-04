# Mastery Guides

`zig-reference` is written for students and programmers who want to understand systems software deeply enough to rebuild, adapt, and defend it.

Each project may contain a `MASTERY.md` file. It is not a shortcut, generated summary, or substitute for reading the code. It is a compact statement of the knowledge required to use the implementation responsibly.

A mastery guide should answer:

1. What problem does this project solve?
2. What are its invariants?
3. What does it own and borrow?
4. How can each operation fail?
5. Which references can become invalid, and when?
6. Why is the implementation shaped this way?
7. Which tempting alternatives fail under pressure?
8. What must change in freestanding, concurrent, persistent, or adversarial environments?
9. Which tests demonstrate the important guarantees?
10. What should the student be able to build next?

## Required structure

Every project-level `MASTERY.md` should use these sections:

- **Mental model** — the smallest correct way to picture the structure.
- **Invariants** — statements that must remain true after every public operation.
- **Ownership** — owned resources, borrowed views, and destruction duties.
- **Failure behavior** — errors and the state left behind after failure.
- **Invalidation** — operations that invalidate pointers, slices, handles, or iterators.
- **Why not the obvious C version?** — where a direct implementation depends on unwritten discipline.
- **Proof through tests** — which tests establish which guarantees.
- **Adaptation notes** — what changes when used in another environment.
- **Mastery exercises** — extensions that preserve rather than discard the design.
- **Readiness check** — questions a student should answer before proceeding.

## Machine-readable without becoming machine-oriented

The guides use consistent headings, precise vocabulary, explicit paths, and direct statements of constraints. This benefits readers first. It also allows documentation tools, search systems, and coding assistants to locate and combine the repository's design knowledge without requiring special-purpose files.

A future project may generate another form of repository guidance from these documents. The `MASTERY.md` files remain the human source of truth.

## Standard

A mastery guide is complete only when a reader can:

- explain the implementation without reciting it line by line;
- predict its failure behavior;
- identify unsafe modifications;
- adapt it while preserving its invariants;
- recognize the same archetype inside a larger system.

The objective is not familiarity. It is transferable understanding.
