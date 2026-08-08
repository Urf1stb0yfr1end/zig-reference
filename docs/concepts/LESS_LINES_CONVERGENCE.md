# Less-Lines Convergence

The project uses the **Less-Lines Principle** to describe a simple idea: as a reusable engineering corpus matures, the amount of newly written code required for a comparable new capability should trend toward the actual novelty of the task.

But there is a second effect that matters just as much.

The amount of **instruction** required to mobilize the system should shrink too.

A mature engineering corpus should not merely contain more solved capability. It should require less explanation to make that capability useful.

The central intuition is:

> **The lines shrink while the consequence grows.**

## The shrinking-column picture

Imagine recording the instruction block required to complete a comparable class of task at different stages of corpus maturity. Each column is one run. As the system learns, canonicalizes, and exposes more solved capability, later runs should need fewer explicit lines.

```text
Run 1     Run 20     Run 100     Run 1000

||||||||  ||||||     ||||        ||
||||||||  ||||||     ||||
||||||||  ||||||
||||||||
||||||||
```

The point is not that every later request must literally contain fewer newline characters. The point is that less explicit engineering instruction should be required to obtain an equal or greater validated result.

Early in a project, an agent may need to be told how to construct, connect, configure, validate, and repair many individual pieces. Later, the repository should already know those decisions.

```text
early:
create A
implement B
wire C
initialize D
configure E
validate F
repair G

mature:
build X with policy Y
```

The missing lines did not disappear through magic. Their meaning moved into canonical capabilities, contracts, recipes, dependency closure, validation closure, diagnostics, and other settled repository knowledge.

## Instruction Compression

**Instruction Compression** is the reduction in explicit human or agent instruction required to produce a correct validated engineering result because the system can discover and compose settled knowledge on its own.

Conceptually:

```text
more canonical solved knowledge
→ fewer decisions must be restated
→ fewer explicit instructions
→ equal or greater validated consequence
```

Instruction Compression is not prompt cleverness. It must not depend on hidden assumptions, omitted requirements, or a model guessing what the repository failed to say.

Good Instruction Compression comes from making previously repeated engineering decisions explicit, canonical, discoverable, composable, and mechanically verifiable.

A useful way to state the design goal is:

> **Maturity is not merely having more code. Maturity is requiring less explanation to mobilize more of what has already been solved.**

## Less-Lines Convergence

**Less-Lines Convergence** is the combined tendency for both newly written implementation and required explicit instruction to shrink as a reusable engineering corpus matures.

It joins two effects:

```text
implementation compression:
new project code → Residual Novelty + unavoidable glue

instruction compression:
explicit request detail → only the user-specific intent and policy not already known
```

The ideal direction is therefore:

```text
required instruction
│\
│ \
│  \
│   \____
│        \___
│            \_
└──────────────────── corpus maturity

system consequence
│             /
│          __/
│       __/
│    __/
│___/
└──────────────────── corpus maturity
```

Less instruction should be able to mobilize more validated capability because the repository increasingly carries the engineering explanation that previously had to be reconstructed or restated.

This is not a claim that terse prompts are inherently desirable. If a requirement is genuinely novel or ambiguous, it must still be stated. The goal is to eliminate repeated instruction for **settled facts**, not to hide uncertainty.

## Relationship to the Less-Lines Principle

The **Less-Lines Principle** applies primarily to newly written implementation:

```text
new code should increasingly correspond to new knowledge
```

Instruction Compression applies to the command or specification surface:

```text
new instruction should increasingly correspond to new intent
```

Less-Lines Convergence is what happens when both improve together:

```text
less repeated instruction
+ less repeated implementation
+ more canonical reuse
+ preserved validation
= more engineering consequence per new line
```

That is the deeper sense in which a mature system can allow an agent or person to traverse an enormous project, or cause an enormous amount of correct engineering work, from only a few lines of new instruction.

## Relationship to 0-to-Done Speed

0-to-Done Speed is the whole-task consequence of these ideas.

```text
Less-Lines Principle
        ↓
less repeated implementation

Instruction Compression
        ↓
less repeated explanation

Snowball Yield + Reconstruction Coverage
        ↓
more of the requested system is already solved

Less-Lines Convergence
        ↓
small explicit request + small Residual Novelty

0-to-Done Speed
        ↓
large validated systems become feasible in increasingly short bounded runs
```

The long-horizon target is not that a sufficiently powerful coding agent becomes fast enough to type millions of lines from scratch.

It is almost the opposite:

> **The system becomes mature enough that the agent does not need to write those millions of lines again.**

A future request might be only:

```text
Build me an operating system.
RISC-V.
Linux userspace compatible.
Use these scheduling and security policies.
Optimize for this hardware envelope.
Call it Solace.
```

If the Foundation already contains most of the required mechanisms, contracts, compatibility knowledge, diagnostics, and validation paths, the agent's job becomes discovery, composition, Residual Novelty, and proof.

The important benchmark is not whether the prompt looked short. It is whether the final system satisfied a frozen specification with less new instruction, less new implementation, less rediscovery, and less validated completion time than before.

## What this principle is not

Less-Lines Convergence does not reward code golf, vague prompting, hidden dependencies, giant opaque generated artifacts, skipped validation, or moving complexity somewhere nobody can inspect it.

A shorter command that causes the agent to guess is worse.

A shorter implementation that obscures correctness is worse.

A faster completion that weakens evidence is worse.

The desired compression is achieved by **remembering solved engineering well enough that it no longer needs to be repeated**.

The simplest summary is:

> **Less instruction. More consequence.**
>
> **Less reimplementation. More composition.**
>
> **New instruction should increasingly correspond to new intent.**
>
> **New code should increasingly correspond to new knowledge.**
