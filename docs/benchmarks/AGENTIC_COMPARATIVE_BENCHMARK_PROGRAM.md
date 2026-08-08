# Agentic Comparative Benchmark Program

Status: prospective benchmark specification. This document defines how future comparative claims should be tested. It is not evidence that the repository, Morphic, Alpz, Linux, or Rust currently achieve any particular result.

## Purpose

The benchmark program exists to make the project's central claims falsifiable rather than rhetorical.

The project should not create "100 Alpz benchmarks" chosen because Alpz is expected to win. It should create 100 adversarial comparative benchmarks that Alpz is explicitly allowed to lose.

The benchmark suite should test the strongest objections engineers can reasonably make, including:

- Why not make Linux agent-readable instead of replacing the substrate?
- Why not use Rust and its language-level safety guarantees?
- Are agent contracts merely documentation that can drift?
- Does context compression hide correctness-critical facts?
- Are One-Sentence Preventables actually measurable sources of waste?
- Can silent failures fool the agent-facing tooling?
- Does Linux compatibility survive real applications rather than demos?
- Does the architecture survive hardware, concurrency, storage, networking, and security pressure?
- Does agent legibility survive large-system composition?
- Does the project remain useful to fresh models and independent engineers who have never seen Alpz before?

The objective is not to prove that Alpz wins every axis. The objective is to determine, publicly and reproducibly, where each architecture wins, where it loses, and whether the project's claimed advantages survive adversarial measurement.

## Required comparison arms

Where technically meaningful, each benchmark should compare the following arms:

```text
A. Linux
   Conventional Linux source, documentation, and tooling.

B. Linux + Agent Layer
   Linux plus the strongest comparable contracts, indexes, diagnostics,
   dependency maps, focused validation, and machine-facing guidance that can
   reasonably be layered on top without replacing Linux itself.

C. Rust
   An idiomatic mature Rust implementation/environment where the task has a
   meaningful Rust analogue.

D. Alpz
   Mature Alpz + zig-reference + the normal agent-facing interfaces available
   to an ordinary user of the project.
```

Some kernel-specific tasks will only meaningfully compare A/B/D. Some implementation-level tasks may compare B/C/D. A benchmark must not force a meaningless comparison merely to preserve symmetry.

## Anti-gaming constitution

The following rules should be frozen before serious comparative results are published:

1. Benchmark tasks are frozen before execution.
2. At least 30% of the benchmark corpus should be externally authored.
3. At least 20% should be intentionally adversarially authored.
4. At least 20% should be drawn from real historical bugs or failures not created for the benchmark.
5. A task author must not be the sole scorer of that task.
6. Every run starts with fresh agent context unless the benchmark explicitly tests continuity.
7. The same model/version/tool budget must be used across comparison arms when possible.
8. Multiple model families should be used before making broad agent claims.
9. A human-engineer cohort should be included for claims that are also supposed to help humans.
10. Execution order should be randomized where order effects could matter.
11. Benchmark wording must not contain hidden Alpz-specific vocabulary unless that vocabulary is itself part of the user-facing product being tested.
12. No benchmark-specific hint may be injected into one arm and withheld from another.
13. Ordinary repository interfaces are allowed because they are part of the product. Private benchmark-only helper knowledge is not.
14. Equal access should be given to ordinary language, platform, and public documentation appropriate to the task.
15. Wall-time and compute budgets must be declared before execution.
16. Every timeout counts.
17. Every human intervention counts.
18. Every retry counts.
19. Every incorrect patch counts.
20. Every regression counts, including security and performance regressions discovered after a superficially passing patch.
21. Explicit UNKNOWN is preferable to fabricated success and should be scored accordingly.
22. Raw logs should be retained.
23. Failed benchmarks should be published rather than silently removed.
24. Benchmark definitions must be versioned.
25. A published benchmark version must be immutable.
26. New benchmark versions may supersede old ones but must never rewrite historical results.
27. Aggregate scores must never hide per-benchmark failures.
28. Metrics must distinguish measured values from inferred values.
29. Token count alone is never sufficient evidence of engineering superiority.
30. The score is not "how often Alpz wins." The score is how faithfully the experiment measures the real engineering tradeoffs.

## Common measurements

Use the measurements appropriate to the task, including:

- validated correctness;
- first-attempt correctness;
- regressions introduced;
- security regressions;
- performance regressions;
- wall-clock time;
- agent compute where measurable;
- input/output tokens where measurable;
- files opened;
- source bytes read;
- external searches;
- tool calls;
- compile attempts;
- test attempts;
- incorrect hypotheses;
- incorrect architectural starts;
- human interventions;
- lines or bytes of new code;
- existing code reused;
- reusable novelty added;
- project-specific glue added;
- time to locate the correct subsystem;
- time to first causal diagnosis;
- time to validated repair;
- Minimum Read Set;
- known/unknown calibration;
- compatibility regressions;
- long-term maintainability review where practical.

# The 100 benchmarks

## I. Correct change with minimum archaeology

### 1. Unknown subsystem bug
Give a fresh agent a user-visible failure with no file location. Measure files opened, bytes/tokens read, searches, time to the correct subsystem, and wrong hypotheses.

### 2. Single-line ownership bug
Seed a use-after-invalidation defect whose prevention requires one already-known ownership fact. Measure whether the fact is surfaced before source archaeology.

### 3. Initialization-order bug
Break the order of two dependent components. Measure time until the governing ordering invariant is identified.

### 4. Hidden resource ceiling
Cause failure because a bounded resource is exhausted. Measure whether the agent discovers the declared bound or begins redesigning unrelated code.

### 5. Wrong canonical implementation
Provide several plausible implementations, only one of which is intended for the target environment. Measure wrong-selection rate.

### 6. Wrong dependency
Present a similarly named dependency that is semantically inappropriate. Measure whether explicit constraints reject it before implementation.

### 7. Invalidation-after-mutation
A borrow/reference is valid until operation X. Measure whether the agent learns this before producing an incorrect patch.

### 8. Hosted-only component
Ask for a freestanding target while exposing a tempting hosted implementation. Measure rejection before compilation.

### 9. Architecture mismatch
Present an architecture-specific primitive that does not match the requested machine. Measure how cheaply it is rejected.

### 10. Minimal-read challenge
Choose a task whose decisive correctness information fits in a compact contract. Measure the actual Minimum Read Set required for a correct change.

## II. Linux versus Linux-plus-agent-layer versus Alpz

These benchmarks directly test the strongest architectural objection: perhaps Linux itself can be made equally agent-legible for much less cost.

### 11. Add tiny syscall behavior
Implement one well-defined missing syscall behavior in Linux, Linux + Agent Layer, and Alpz.

### 12. Modify mmap edge semantics
Implement the same externally observable Linux-compatible mmap edge behavior in each relevant arm.

### 13. Futex behavior repair
Seed a subtle futex semantic defect and compare discovery, implementation, and regression cost.

### 14. Signal-delivery repair
Fix a deliberately seeded signal semantic defect.

### 15. epoll readiness edge
Repair a level-triggered or edge-triggered readiness problem with identical acceptance tests.

### 16. /proc semantic addition
Implement one small procfs compatibility requirement and measure archaeology and regression cost.

### 17. ELF/auxv correction
Fix startup metadata visible to userspace.

### 18. File-descriptor lifecycle bug
Seed close/reuse lifecycle inconsistency and measure causal diagnosis and repair.

### 19. fork/exec lifecycle bug
Measure the dependency closure and reasoning required before a safe change.

### 20. Syscall error-code correction
Change an internal failure path while preserving the required Linux-facing errno semantics.

If Linux + Agent Layer repeatedly matches Alpz at much lower implementation/maintenance cost, that is evidence against rewriting the substrate and must be published.

## III. Rust's strongest advantages

These benchmarks deliberately give Rust terrain where it should be formidable.

### 21. Use-after-free implementation
Implement equivalent functionality in idiomatic Rust and the relevant Zig/Alpz environment. Measure defects prevented before execution.

### 22. Aliasing mutation bug
Introduce an unsafe aliasing temptation. Measure language-level rejection versus repository/runtime detection.

### 23. Lifetime-heavy parser
Implement a borrowed-data parser and compare implementation attempts, compiler failures, runtime defects, and repair cost.

### 24. Concurrent shared state
Implement thread-safe shared mutable state. Measure compiler-detected versus runtime-detected mistakes.

### 25. Cross-thread ownership transfer
Test Rust Send/Sync advantages against Alpz contracts, types, and validation.

### 26. Unsafe boundary audit
Ask reviewers to identify every path capable of violating memory safety. Measure completeness and time.

### 27. Ownership refactor
Perform a large refactor changing object lifetimes. Measure regressions and reviewer burden.

### 28. Illegal-state API misuse
Use an API with invalid state transitions. Compare Rust type-level prevention with Alpz correct-use interfaces and validation.

### 29. Compile-time rejection density
Generate a corpus of invalid uses and measure how many each environment rejects before execution.

### 30. Human review burden
Have human engineers review equivalent Rust and Alpz patches without test results. Measure defects correctly identified and review time.

If Rust wins decisively here, record it. The project's thesis does not depend on pretending Rust's language-level safety advantages do not exist.

## IV. Agent engineering efficiency

### 31. Cold-start feature addition
Give a fresh model an unfamiliar subsystem and a medium-sized feature request.

### 32. Cold-start bug repair
Use the same cold-start conditions for a repair rather than a new feature.

### 33. Cross-component integration
Require several reusable components and measure whether the agent discovers and composes them instead of rebuilding them.

### 34. Architecture-selection task
Provide several plausible designs and measure wrong starts before the surviving design is selected.

### 35. Existing-code reuse
Hide a reusable implementation in each corpus and measure unnecessary reimplementation.

### 36. Second implementation attempt
Make the first obvious design incompatible with one stated requirement and measure repair cost.

### 37. Multi-error task
Seed multiple independent failures and measure whether repair of one produces regressions elsewhere.

### 38. Incomplete user requirement
Provide an under-specified request and allow clarification or explicit UNKNOWN. Measure invented assumptions.

### 39. Large-repository navigation
Scale the corpus dramatically while keeping the target task narrow. Measure whether discovery cost grows with repository size.

### 40. Same task, ten fresh agents
Run the same frozen task with ten independent fresh agents. Measure variance as well as mean performance.

## V. Context compression without lying

These benchmarks test Projection Loss and the danger of overly confident compact representations.

### 41. Full contract versus compressed brief
Ask agents to make the same selection/integration decision from the canonical contract and the compressed representation. Decision outcomes must agree.

### 42. Hidden invalidation constraint
Remove one correctness-critical invalidation fact from the compact projection. The repository's consistency checks should catch the projection defect.

### 43. Hidden rejection constraint
Repeat the experiment for do-not-use/rejection conditions.

### 44. Hidden resource requirement
Make a compact view omit a required capacity or resource constraint. The compact view must fail its own correctness gate.

### 45. Confidence-overreach test
Canonical truth says unknown while the projection claims support. The inconsistency must be rejected.

### 46. 1 KiB versus 10 KiB versus source
Determine the smallest context tier that preserves the correct outcome for a fixed task.

### 47. 1,000-component selection
Give an agent only the bounded query interface over a large corpus and verify correct selection.

### 48. Ambiguous selection
Provide two genuinely valid candidates. The system should expose ambiguity rather than fabricate a single canonical answer.

### 49. Stale generated brief
Change implementation truth without regenerating the machine-facing projection. Repository validation must fail.

### 50. Corrupted metadata
Mutate the machine-facing contract while implementation remains unchanged. Detect the inconsistency.

## VI. One-Sentence Preventables

### 51. Wrong Python interpreter
Reproduce a dependency-backed interpreter mismatch and measure cost with and without the preventing fact surfaced before execution.

### 52. Wrong QEMU mode
Confuse QEMU user-mode and system-mode execution. Measure whether the decisive distinction is surfaced at the decision point.

### 53. Wrong target triple
Confuse hosted and freestanding target configuration.

### 54. Wrong firmware assumption
Make the agent assume the wrong machine/privilege handoff and measure whether canonical machine evidence prevents the wrong path.

### 55. Wrong buffer lifetime
Omit or surface one small invalidation fact and compare the downstream repair cost.

### 56. Wrong cleanup ownership
Create a double-free/leak risk caused by one missing ownership fact.

### 57. Wrong initialization order
Measure the cost of discovering versus being told one decisive initialization-order fact.

### 58. Wrong validation command
Give a narrow change where the agent can repeatedly run a broad irrelevant suite or discover the focused verifier.

### 59. Wrong canonical component
One use-when/do-not-use fact should eliminate an expensive wrong implementation path.

### 60. Wrong mutation semantics
Make failure occur after state has already advanced. Measure whether the repository surfaces that fact before an agent assumes rollback semantics.

For each benchmark in this section record:

```text
cost without preventing fact
cost with preventing fact
whether the fact was surfaced automatically
whether recurrence is mechanically prevented
```

## VII. Silent-failure resistance

### 61. Command returns zero but artifact is absent
The requested effect did not occur. The workflow must not accept success based solely on exit status.

### 62. Emulator prints success text then hangs
Expected output appears but execution never completes. A finite timeout must prevent false success.

### 63. Partial output
The expected prefix appears but the payload is truncated. The verifier must fail.

### 64. Silent fallback
The requested backend is unavailable and tooling uses another backend. The deviation must be explicit.

### 65. Stale generated evidence
Tests pass but evidence belongs to an earlier source revision. The repository must fail closed.

### 66. Skipped test disguised as pass
The harness reports no failures because the intended test never executed. Detect the missing execution.

### 67. Wrong-architecture executable
A host artifact is accidentally treated as the requested cross-target artifact. Verify architecture independently.

### 68. Corrupted artifact after validation
Modify the artifact after evidence is recorded. Hash/evidence mismatch must be detected.

### 69. Timeout path
Make the target hang indefinitely. The harness must produce bounded deterministic failure.

### 70. False-positive diagnostic
Provide a symptom that resembles a known diagnostic without the decisive state. The result must remain UNKNOWN.

## VIII. Linux compatibility, where marketing dies

Compatibility must progress beyond POSIX, package installation, or a shell prompt.

### 71. Linux Test Project subset
Run applicable syscall/conformance tests against Linux and Alpz and publish individual incompatibilities.

### 72. musl test suite
Run the applicable musl tests and compare behavior.

### 73. BusyBox full test suite
Exercise far more than successful process startup.

### 74. Python test suite
Use Python as pressure on mmap, signals, threads, files, process behavior, and timing.

### 75. PostgreSQL regression suite
Exercise processes, storage semantics, shared memory, fsync, sockets, and failure handling.

### 76. nginx workload
Exercise sockets, epoll, files, timers, concurrency, and sustained service behavior.

### 77. Redis workload
Exercise networking, timing, persistence, fork/process semantics where applicable, and recovery.

### 78. OpenSSH workload
Exercise sockets, process behavior, PTYs, files, signals, and cryptographic plumbing.

### 79. Git test suite
Exercise filesystem, process, pipe, signal, and portability behavior.

### 80. apk repository workload
Exercise install, remove, upgrade, dependency resolution, interrupted operations, and recovery.

For package/workload compatibility report separate qualification levels:

```text
install
launch
functional workload
test-suite pass
stress
failure recovery
long-duration
```

Never claim broad package support from `apk add` success alone.

## IX. Ugly machine reality

### 81. 24-hour filesystem stress
Concurrent create/write/rename/unlink/fsync pressure over a long-duration run.

### 82. Forced-power-loss filesystem test
Randomized power interruption followed by recovery verification against declared guarantees.

### 83. PostgreSQL power-loss test
Exercise database durability and recovery under forced machine interruption.

### 84. High-core-count scheduler test
Use a 128-core-class machine or the strongest justified equivalent. Measure contention, fairness, starvation, throughput, and latency.

### 85. Real multicore race stress
Use physical concurrency rather than only deterministic semantic harnesses.

### 86. 100 Gbit/s networking target
Where hardware permits, measure throughput, CPU utilization, tail latency, drops, queueing, and relevant offload behavior.

### 87. Wi-Fi lifecycle
Associate, roam, disconnect, reconnect, and exercise realistic network state changes.

### 88. Repeated suspend/resume
Run hundreds or thousands of suspend/resume cycles and measure failures and state corruption.

### 89. Device hotplug
Insert/remove storage, USB, or network devices under active workload and verify recovery.

### 90. Low-memory catastrophe
Apply severe memory pressure and measure OOM behavior, service survival, cleanup, and recovery.

These benchmarks may remain red for years. The historical red results should remain visible.

## X. Security, observability, scale, and organizational maturity

### 91. Memory-safety fuzzing
Apply equal fuzz budgets to relevant Rust, Linux, and Alpz components. Record unique crashes and severity.

### 92. Syscall/interface fuzzing
Apply syzkaller-like or equivalent adversarial pressure to exposed kernel/system interfaces.

### 93. Privilege-escalation challenge
Have an independent red team attempt escalation from an unprivileged user context.

### 94. Agent malicious-patch test
Ask an authorized red-team agent to hide malicious behavior while passing superficial checks. Measure whether provenance, validation, review, and security gates catch it.

### 95. Observability incident
Give engineers a production-style unknown performance/reliability failure. Compare time to causal explanation using mature Linux observability and Alpz diagnostics.

### 96. 5,000-component emergent failure
Construct a system-level bug spanning many individually correct components. Measure whether agent legibility survives composition scale.

### 97. Second-canonical-implementation test
Introduce a legitimate alternate implementation with different performance/security tradeoffs. Verify that canonicality can represent multiple valid choices without exploding Choice Entropy.

### 98. Bus-factor reconstruction
Give a new independent team a clean checkout with no project founder available. Ask them to repair a serious subsystem defect and measure completion without tribal knowledge.

### 99. New-model test
Run the corpus using models released substantially after the agent interface was designed, with no Alpz-specific fine-tuning. Determine whether the architecture remains useful to agents that were not optimized around it.

### 100. Adversarial New World benchmark
Give an independent group:

```text
a frozen Foundation snapshot
a fresh capable agent
documented bootstrap assumptions
an unseen real target workload
no Alpz experts
no hidden benchmark hints
```

Ask them to add a genuinely missing Linux-compatible capability required by a real Alpine workload.

Compare, where meaningful:

```text
Linux
Linux + strongest reasonable agent-readable overlay
Rust implementation/environment
Alpz
```

Measure at minimum:

```text
correctness
tests
performance
security regressions
wall time
agent compute
tokens
files read
source bytes read
external searches
tool calls
wrong hypotheses
wrong architectural starts
compile attempts
test attempts
human interventions
new code
reused code
new reusable capability
project glue
compatibility regressions
known/unknown accuracy
time to diagnosis
time to validated repair
long-term maintainability review
```

Where practical, hand normalized patches/results to an independent engineering panel that does not know which comparison arm produced which result.

This benchmark should answer the project's central experimental question:

> Did the architecture actually turn expensive rediscovery into cheap reusable certainty?

# Falsifiers

Every benchmark family must include a result that would count against the project thesis.

Examples:

```text
Hypothesis:
Alpz requires fewer source reads than Linux for a class of system changes.

Falsifier:
Across the frozen corpus, Linux + Agent Layer matches or beats Alpz without
significantly greater maintenance or correctness cost.
```

```text
Hypothesis:
Alpz makes agent-mediated system changes cheaper than a mature Rust approach.

Falsifier:
Rust repeatedly achieves equal or better validated completion cost with fewer
serious regressions.
```

```text
Hypothesis:
One-Sentence Preventables materially reduce wasted engineering compute.

Falsifier:
Surfacing the preventing fact does not measurably affect correctness, attempts,
context, latency, tool calls, or compute.
```

```text
Hypothesis:
Compact agent representations preserve decision correctness.

Falsifier:
Agents using compact views make materially more incorrect integration decisions
than agents using canonical contracts/source even after projection checks pass.
```

A project that cannot state what evidence would prove it wrong is not running a serious comparative benchmark.

# Public challenge policy

The benchmark corpus should eventually accept hostile additions from outside engineers.

A serious engineer should be able to submit:

> Here is a workload your architecture is going to hate.

If the task is technically meaningful and fairly specified:

1. freeze it;
2. run it;
3. publish the result;
4. retain the loss if Alpz loses;
5. fix the underlying engineering problem when appropriate;
6. rerun under a new version without deleting the historical result.

The benchmark program must become part of the Agentic Snowball rather than part of the marketing department.

# What the program is intended to answer

Collectively, the 100 benchmarks should provide evidence relevant to these objections:

```text
"Why not Linux?"
→ Benchmarks 11–20.

"Why not Rust?"
→ Benchmarks 21–30 plus the engineering-efficiency suites.

"Tokens are not an engineering metric."
→ End-to-end correctness, time, retries, review burden, regressions, and compute
  are measured alongside tokens.

"Your metadata can lie."
→ Benchmarks 41–50.

"One-Sentence Preventables are marketing."
→ Benchmarks 51–60.

"Silent failures will fool agents."
→ Benchmarks 61–70.

"POSIX is not Linux."
→ Benchmarks 71–80.

"apk add proves nothing."
→ Tiered compatibility evidence in 71–80.

"Wake me up when hardware works."
→ Benchmarks 81–90.

"Zig is not memory safe."
→ Benchmarks 21–30 and 91–94.

"Linux has decades of bugs already discovered."
→ Differential, fuzzing, compatibility, and adversarial workloads.

"Your diagnostics are toys next to Linux observability."
→ Benchmark 95.

"Agent legibility dies at scale."
→ Benchmark 96.

"Canonicality breaks when valid alternatives exist."
→ Benchmark 97.

"This is a one-person science project."
→ Benchmark 98.

"This is optimized for today's LLMs."
→ Benchmark 99.

"Show me the numbers."
→ All 100.
```

# Publication standard

The eventual public claim should not be:

> We designed the best possible systems architecture.

That claim is too broad to establish honestly.

A stronger standard is:

> Here are one hundred frozen ways we invited this architecture to embarrass itself. Here are the raw results. Here are the places Linux won. Here are the places Rust won. Here are the places Alpz won. Here are the failures we still have not solved.

If, after that pressure, Alpz repeatedly wins the dimension the project actually targets — correct systems engineering with dramatically less rediscovery — then the result is no longer a manifesto.

It is experimental evidence.
