# Future Researcher Freedom Principle

## Status

QuirkM design principle.

## Principle

> **Morphic is supposed to prevent us from trapping future researchers in QuirkM's own baggage, too.**

QuirkM exists partly to learn from historical operating-system constraints without forcing new native software to inherit every compatibility obligation accumulated by older systems.

That principle must apply recursively.

QuirkM will make choices. Some will prove excellent. Some will age poorly. Some will become unnecessary as hardware, research practice, programming languages, security models, and human-computer interaction change.

A system built to escape inherited baggage must not become the next generation's inherited baggage by default.

Morphic therefore has a second responsibility beyond helping QuirkM inherit mature software civilization:

```text
preserve proven reusable mechanisms
        +
preserve compatibility knowledge
        +
preserve conformance and tests
        +
allow QuirkM policies to be replaced
        =
future researchers start ahead without being trapped by us
```

This is especially important for QuirkM's intended role as a serious research and knowledge-work environment. A future researcher should be able to inherit working filesystems, execution machinery, Linux compatibility, scientific software access, device support, test suites, and accumulated pressure knowledge while still rejecting a QuirkM scheduler, IPC model, native API, desktop policy, security model, or other decision that no longer deserves to survive.

The desired inheritance model is:

```text
past systems
    |
    v
Morphic preserves what was actually learned
    |
    v
QuirkM makes today's best attempt
    |
    v
future researchers
    |
    +-- keep what survived evidence
    +-- replace what did not
    +-- retain access to mature software civilization
    v
better successor systems
```

QuirkM should therefore be opinionated enough to be useful and beautiful, but never so architecturally final that disagreement requires rebuilding civilization from zero.

A concise companion rule is:

> **Inherit the civilization. Reconsider the kernel. Reconsider QuirkM too.**
