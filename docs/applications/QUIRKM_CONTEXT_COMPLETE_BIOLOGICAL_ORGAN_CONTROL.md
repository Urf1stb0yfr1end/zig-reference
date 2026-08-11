# QuirkM as a Context-Complete Control Substrate for Modeled Biological Organs

## Status

Application hypothesis and research direction.

This document does **not** claim that QuirkM is a medical-device operating system today, that it is safer than Linux today, that a language model should directly control a life-critical actuator, or that the architectural ideas below satisfy any medical-device regulatory or certification requirement.

The purpose is narrower:

> Ask whether a small, context-complete, explicitly modeled QuirkM system could be a useful computational substrate for a future artificial or biohybrid organ, particularly when the biological system is intrinsically uncertain and therefore the software should avoid adding unnecessary ambiguity of its own.

The core proposition is:

> **Do not promise to eliminate the unknowns of biology. Eliminate as many unnecessary unknowns of the machine as possible.**

This application remains interesting even under a deliberately conservative assumption: QuirkM does **not** somehow solve every historical systems-design problem. Suppose it merely produces materially cleaner native contracts for a substantial portion of the first 100 paramount Linux compatibility-debt candidates already cataloged by the project. That alone may be valuable in systems where fault localization, provenance, bounded authority, and explainable state matter more than broad legacy compatibility.

See:

- [`../concepts/QuirkM/100_PARAMOUNT_LINUX_COMPATIBILITY_DEBTS.md`](../concepts/QuirkM/100_PARAMOUNT_LINUX_COMPATIBILITY_DEBTS.md)
- [`../concepts/QuirkM/QUIRKM_NATIVE_API_AND_LINUX_QUIRK_QUARANTINE_PROPOSAL.md`](../concepts/QuirkM/QUIRKM_NATIVE_API_AND_LINUX_QUIRK_QUARANTINE_PROPOSAL.md)
- [`../project_vocab.md`](../project_vocab.md)

---

## Why this application is different from ordinary computing

A biological organ already contains difficult uncertainty:

```text
biological variation
sensor drift
inflammation
healing and remodeling
mechanical wear
fluid dynamics
individual anatomy
changing metabolism
measurement noise
rare physiological states
```

A control computer cannot make those uncertainties disappear.

It can, however, avoid unnecessarily adding a second class of uncertainty:

```text
unclear resource identity
implicit authority
ambient state
stale object references
surprising inheritance
asynchronous interruption folklore
unstructured event loss
unexplained state transitions
opaque compatibility translation
unbounded extension channels
poor provenance
```

For ordinary desktop software, these may be manageable engineering costs.

For a system trying to determine whether a ventricular-assist pump is experiencing a sensor fault, a mechanical obstruction, a power problem, a controller problem, or a genuine physiological deterioration, every avoidable software ambiguity enlarges the diagnostic search space.

The design goal is therefore not "zero uncertainty."

It is:

```text
TOTAL UNCERTAINTY

biology uncertainty       <- intrinsic; model and measure it
sensor uncertainty        <- characterize it
actuator uncertainty      <- characterize it
model uncertainty         <- expose it
hardware uncertainty      <- detect and bound it
software uncertainty      <- reduce as aggressively as practical
```

---

## Why the first 100 QuirkM pressures may already matter

The QuirkM ledger explicitly calls its first 100 entries **candidate compatibility debts, not 100 adjudicated Linux bugs**. That distinction must be preserved.

The application case does not require proving that Linux is generally bad or unsafe. Linux's compatibility stability is one of its practical strengths. The narrower argument is that a clean-sheet native personality can choose not to inherit compatibility behavior that is unnecessary for its native control plane.

Even if QuirkM never does more than successfully counterdesign the most valuable fraction of those first 100 pressures, several categories are unusually relevant to safety-oriented control systems.

### Resource identity and lifetime

The ledger begins with reusable integer file descriptors, descriptor reuse after close, shared open-file-description state, inheritance behavior, and create/configure races.

For a native organ-control system, the equivalent of a pressure sensor, pump actuator, watchdog, battery monitor, or diagnostic channel should not merely be "fd 17."

A preferable native shape is conceptually:

```text
Sensor<InletPressure>
Sensor<OutletPressure>
Sensor<MotorCurrent>
Actuator<PumpDrive>
Watchdog<PrimaryController>
PowerSource<ExternalBatteryA>
```

with stable identity, explicit lifetime, explicit authority, and machine-readable operation contracts.

The Linux personality may still expose descriptors where compatibility software needs them. QuirkM does not have to make descriptor semantics the native ontology.

### Process identity and construction

The ledger also records PID reuse, `/proc/<pid>` as an object surrogate, fork/exec complexity, `vfork`, and dense `clone` semantics.

A small life-critical controller does not inherently need a Unix process-construction model. Native services could instead receive explicit resources at construction with no ambient inheritance.

### Signals and interruption

The ledger records arbitrary asynchronous signal delivery, `EINTR`, restart rules, signal masks, async-signal-safe restrictions, and later descriptor-like alternatives such as `signalfd`.

A physiological control loop benefits from explicit event and completion semantics rather than having unrelated operations implicitly acquire interruption behavior.

### Names, paths, and authority

The ledger records ambient current directories, process-root state, symlink traversal rules, magic links, and pathname authority ambiguity.

An organ-control service should not need a global filesystem namespace merely to access the one calibration record, sensor stream, or immutable model artifact it is authorized to use.

### Memory, waiting, and failure behavior

The ledger includes overlapping historical memory interfaces, destructive mapping semantics, overcommit behavior, fault handling, select/poll-era descriptor assumptions, and event-loss pressures.

A native control system can instead start with explicit memory objects, explicit commitment, typed wait/completion objects, and explicit lost-event or stale-data states where appropriate.

The claim is not that these changes automatically make a medical device safe.

The claim is:

> **Fewer historically inherited semantic edge cases can produce a smaller causal state space that is easier to model, test, inspect, and fault-localize.**

That hypothesis is measurable.

---

## Context-complete architecture

The strongest form of this application depends on another Morphic/QuirkM goal: context completeness.

A system is **context-complete** when its complete essential architectural truth can be compressed into a representation small enough for a capable human or machine reasoner to hold and reason about as a whole.

This does not mean putting every source file into one prompt.

It means preserving enough machine-readable truth that a fresh maintainer can reconstruct:

```text
all important resource kinds
all authority relationships
all control loops
all safety gates
all dependency directions
all timing assumptions
all state machines
all fallback modes
all known failure classes
all current degraded components
all evidence supporting current claims
```

while retrieving detailed source only for the current task.

Conceptually:

```text
complete repository
      |
      v
Z-Ref contracts + dependency graph + proof records
      |
      v
context-complete architecture capsule
      |
      +--> whole-system reasoning
      |
      +--> task-specific source retrieval
      |
      +--> fault-localization queries
```

For an artificial organ, this would let a maintenance model reason over the whole control structure without granting it authority to improvise life-critical actuator commands.

---

## Real-world anchor: a ventricular-assist system already has a software-bearing controller

A useful real-world reference is the HeartMate 3 Left Ventricular Assist System.

Public FDA records describe the HeartMate 3 System Controller as the central power and communication hub for the LVAS. FDA PMA supplements also record updates to the HeartMate 3 System Controller Main Application software, including a documented upgrade from version 1.6 to 1.7.

This matters because the application imagined here is not based on the premise that an artificial heart pump is merely a passive motor. Modern ventricular-assist systems already combine a pump with a controller, power, communications, alarms, user interaction, and software lifecycle.

The public evidence also demonstrates why fault localization matters. A 2024 HeartMate 3 System Controller recall described a physical UI-membrane sealing problem that could permit fluid ingress and potentially produce unexpected or false-positive alarms, loss of visual alarms or UI, loss of power, and pump stop. That was not simply "a software bug." It was a physical/process fault whose effects propagated through the controller and alarm surface.

That is exactly the kind of situation in which a modeled architecture should help answer:

```text
Is the physiology failing?
Is the pump mechanically failing?
Is a sensor drifting?
Is the controller hardware degrading?
Is power unstable?
Is the alarm/UI path damaged?
Is the software invariant still intact?
```

QuirkM would not prevent water ingress or eliminate mechanical failure. Its proposed value is making the computational part of that fault tree unusually explicit.

---

# Likely reference scenario: a future ventricular-assist pump

The following is a **hypothetical research architecture**, not a description of HeartMate 3 internals and not a medical-device design recommendation.

Assume a future ventricular-assist system contains:

```text
                    PATIENT / CIRCULATION
                            |
               +------------+------------+
               |                         |
               v                         v
          PHYSIOLOGICAL              PUMP / MOTOR
             STATE                        |
               |                          |
               v                          v
             SENSORS                  ACTUATORS
               |                          ^
               v                          |
        QUIRKM RESOURCE LAYER             |
               |                          |
               v                          |
          STATE ESTIMATOR                 |
               |                          |
               v                          |
       DETERMINISTIC CONTROLLER           |
               |                          |
               v                          |
          SAFETY ENVELOPE ----------------+
               |
               +--> diagnostic/event evidence
               |
               +--> maintenance model
```

Possible measurements in such a future device might include pump speed, motor current, power state, temperature, pressure or flow-related measurements, and controller-health telemetry. The exact sensing set is device-specific.

The important QuirkM property is that these are explicit semantic resources rather than anonymous integers or ambient files.

For example:

```text
Observation<Pressure> {
    value
    timestamp
    sensor_identity
    calibration_epoch
    quality
    uncertainty
    sequence
}
```

and:

```text
Actuator<PumpDrive> {
    authority
    operating_envelope
    command_sequence
    acknowledged_state
}
```

The exact API is intentionally not frozen here. The property being sought is provenance and bounded authority.

---

## A plausible real-software split

A future research prototype could use real existing software while keeping the life-critical path small.

One plausible division is:

```text
HARD SAFETY / CONTROL PATH

QuirkM/Morphic core
    + native C or Rust control service
    + deterministic sensor acquisition
    + deterministic actuator safety gate
    + hardware watchdog
    + bounded event/provenance log

NON-ACTUATING EXTENSIBILITY

Wasm Micro Runtime (WAMR)
    + isolated diagnostic modules
    + model evaluators
    + telemetry transforms
    + upgradeable noncritical analysis

COMPATIBILITY / DEVELOPMENT WORLD

Linux personality / Alpine
    + existing test tools
    + Python analysis
    + NumPy/SciPy-class offline modeling where available
    + build/debug tooling
    + package ecosystem
```

This is deliberately asymmetric.

Linux compatibility is extremely useful for inherited development and analysis software, but it does not need to define the native safety contract.

WebAssembly is useful because a diagnostic or model component can be given a narrow import surface. WAMR is a real open-source WebAssembly runtime designed for embedded/IoT/edge environments; its published architecture supports interpreter and AOT modes, RISC-V, and embedded platforms. It is an example of the kind of existing runtime QuirkM could eventually host rather than inventing a new portable execution format.

A production medical system would require a separate safety and regulatory assessment of every component. The point here is architectural reuse, not certification-by-association.

---

# Scenario A: false low-flow indication caused by a degrading measurement path

Assume the system observes:

```text
flow-related sensor A:        low
pressure-related sensor B:    normal
motor speed:                  stable
motor current:                stable
pump command:                 unchanged
power rails:                  stable
recent control response:      within expected model envelope
sensor A drift history:       worsening
```

A poorly modeled system may expose only:

```text
LOW FLOW ALARM
```

A QuirkM-style modeled system could preserve the causal evidence:

```text
ALARM CANDIDATE: LOW FLOW

physiological agreement:       weak
independent sensor agreement:  weak
pump electrical evidence:      normal
power evidence:                normal
controller invariant status:   PASS
sensor-A health:               DEGRADED

LIKELY FAULT DOMAIN:
measurement path / sensor A

CONTROL ACTION:
remain inside deterministic safety envelope

MAINTENANCE ACTION:
exclude or down-weight sensor A only if the prevalidated policy permits it;
request service / recalibration;
preserve all evidence.
```

The maintenance language model may explain the evidence and propose a diagnosis, but it does not bypass the deterministic safety controller.

The benefit is not clairvoyance. It is reduction of ambiguity.

---

# Scenario B: likely real hydraulic/mechanical deterioration

Now assume:

```text
flow-related observations:    falling
pressure differential:        abnormal
motor current:                rising
motor speed command:          unchanged
power source:                 healthy
multiple sensors:             mutually consistent
controller invariant status:  PASS
```

The system now has cross-domain evidence that the problem is unlikely to be merely one drifting sensor.

A causal record might state:

```text
EVENT: ASSISTANCE DEGRADATION

software command path:        PASS
actuator command ack:          PASS
power delivery:               PASS
sensor quorum:                CONSISTENT
mechanical/electrical load:    ABNORMAL
physiological response:        OUTSIDE EXPECTED ENVELOPE

LIKELY FAULT DOMAIN:
pump / hydraulic / biological interface

REQUIRED RESPONSE:
execute only the prevalidated deterministic safe-state policy;
raise urgent alarm;
preserve evidence for clinical/technical review.
```

The software does not need to claim it has identified the exact biological cause. It has already done something valuable by excluding several software and controller fault domains with evidence.

---

# Scenario C: controller enclosure or electronics degradation

The 2024 HeartMate 3 controller recall is useful as a real reminder that alarms may be affected by physical controller faults. FDA described a condition involving a lifting UI membrane and possible fluid ingress that could lead to false-positive alarms, loss of visual alarms/UI, loss of power, or pump stop.

A future QuirkM-based controller cannot make sealing failures impossible.

It can attempt to make the resulting evidence separable:

```text
pump telemetry:               nominal
physiological sensors:        nominal
controller power rail B:      intermittent
UI subsystem self-test:       failing
alarm-path self-test:         degraded
main control invariant:       intact
secondary watchdog:           intact

LIKELY FAULT DOMAIN:
controller electronics / UI / power path
```

A redundant alarm or external controller could then react according to a prevalidated policy.

The important property is that a physical controller fault is not allowed to masquerade as unexplained physiological state merely because the software architecture lacks provenance.

---

# Scenario D: a software reference/lifetime fault that QuirkM tries to make impossible by construction

Suppose a sensor is replaced, reinitialized, or logically removed.

In an integer-reuse model, an old identifier may eventually refer to something else unless every layer handles lifetime perfectly.

QuirkM's candidate direction is a typed generational resource handle:

```text
old SensorHandle<Pressure>(slot=4, generation=91)

sensor replaced

new SensorHandle<Pressure>(slot=4, generation=92)
```

The stale generation-91 reference remains invalid.

A diagnostic module cannot accidentally begin reading an unrelated resource merely because a small integer was reused.

This corresponds directly to the first QuirkM ledger pressures around reusable descriptors and stale identity.

For a normal application this is a correctness improvement.

For a modeled control system it also improves fault attribution: the system can distinguish "stale reference rejected" from "valid sensor returned an impossible value."

---

## No important state without provenance

A bio-oriented QuirkM application should adopt a strong rule:

> **No important state without provenance.**

If the pump is commanded to a particular operating state, the system should be able to reconstruct why:

```text
PUMP COMMAND #882193

requested by:
    deterministic-assist-controller v12

based on:
    pressure/A observation #71821
    pressure/B observation #73190
    motor-current observation #99117
    estimator-state #1188

checked by:
    pump-safety-envelope v4

requested change:
    bounded control adjustment

approved change:
    bounded control adjustment

result:
    actuator acknowledgement #44109

observed response:
    within validated response envelope
```

Likewise:

```text
WHY WAS SENSOR A IGNORED?

-> failed plausibility invariant SENSOR-18
-> disagreement persisted beyond validated window
-> redundant evidence remained mutually consistent
-> prevalidated degradation policy moved A to DEGRADED
-> controller continued with approved degraded-mode policy
```

This makes troubleshooting causal instead of archaeological.

---

## The language model's proper role

The most ambitious version of this application uses a language model because the entire essential organ-control architecture may be small enough to fit in a context-complete representation.

The model could know:

```text
every sensor class
every actuator class
every resource authority
every control loop
every safety envelope
every fallback mode
every current degraded component
every known failure class
every validation artifact
every dependency relationship
```

That makes whole-system questions practical:

```text
"If inlet-pressure sensor A is drifting while motor current,
outlet pressure, power, and pump response remain normal,
which fault domains are still consistent with the evidence?"
```

or:

```text
"If this estimator threshold changes, which safety claims,
controller tests, and degraded-mode policies become stale?"
```

But the authority path should remain:

```text
language model / adaptive analysis
            |
            v
     proposes / explains
            |
            v
 deterministic controller
            |
            v
    deterministic safety gate
            |
            v
        actuator
```

not:

```text
language model -> unrestricted actuator
```

For a life-critical device, the model should be a maintainer, diagnostician, simulator, and explanation engine above a much smaller deterministic control and safety substrate.

---

## Why Linux compatibility still belongs in the system

This application is not an argument for throwing Linux away.

The most useful mature architecture may be:

```text
                    QUIRKM NATIVE CONTROL
                 explicit modeled contracts
                          |
                          v
                    MORPHIC CORE
                          |
             +------------+------------+
             |                         |
             v                         v
      life-critical native       Linux personality
       control services          compatibility tools
             |                         |
             |                  Alpine / packages
             |                  Python / compilers
             |                  test infrastructure
             |                  existing utilities
             |                         |
             +------------+------------+
                          |
                          v
                    same machine
```

Linux becomes an inheritance surface rather than the native safety ontology.

That is one of QuirkM's strongest possible applications:

> **Keep the enormous Linux software world available without requiring the most safety-sensitive native software to inherit every Linux semantic convention.**

---

## WebAssembly as a replaceable diagnostic boundary

WebAssembly is particularly attractive for non-actuating or narrowly actuating components because an embedded runtime can expose only the imports a module is permitted to use.

A diagnostic module might receive:

```text
requires:
    pressure.inlet.read
    pressure.outlet.read
    pump.motor_current.read
    clock.monotonic.read
    diagnostic.event.emit

not granted:
    pump.drive.command
    power.switch
    firmware.update
    arbitrary filesystem
    arbitrary network
```

A new diagnostic model can then be replaced without changing the kernel or granting broad authority.

The hard safety path can remain native and deterministic.

---

## Fault-domain narrowing as the primary metric

The useful claim to test is **not**:

```text
QuirkM always diagnoses correctly.
```

The useful claim is:

```text
QuirkM can make more failure causes explicitly distinguishable.
```

A research program should therefore measure things such as:

- percentage of important state transitions with complete provenance;
- percentage of resource relationships represented explicitly;
- number of unmodeled ambient dependencies in the native control path;
- number of important runtime states that cannot be mapped back to a contract;
- stale-reference and use-after-release rejection coverage;
- fault-injection localization accuracy;
- false-positive and false-negative alarm rates under known injected faults;
- time to distinguish sensor, actuator, power, software, and physiological fault domains;
- number of safety claims invalidated by a code/contract change;
- context tokens required to represent the complete essential architecture;
- percentage of maintainer tasks for which architecture + task dependency closure fits in one working context.

The point is to turn "simple" and "diagnosable" into measured properties.

---

## A concrete fault-injection research ladder

A future simulator could inject one fault at a time:

```text
1. pressure sensor bias
2. pressure sensor dropout
3. timestamp delay
4. duplicated/stale observation
5. motor-current sensor drift
6. actuator command acknowledgement loss
7. power-source degradation
8. controller reset
9. UI/alarm-path failure
10. mechanical pump-load increase
11. simultaneous sensor + power fault
12. software component crash
13. stale resource reference
14. event-queue loss
15. model artifact mismatch
```

For each experiment the system should answer:

```text
What changed?
Which invariant detected it?
Which resources are implicated?
Which resources are exonerated by evidence?
Which control path remained authoritative?
Did the safe-state policy execute?
What uncertainty remains?
Can the complete causal record be reconstructed?
```

This is where Z-Ref's evidence-carrying model and QuirkM's explicit resource semantics could reinforce each other.

---

## What QuirkM must prove before this application becomes credible

This document should not outrun the repository.

Before QuirkM could reasonably be proposed as a serious research substrate for bio-organ control, the project would need evidence for at least:

```text
bounded deterministic execution
strong memory isolation
explicit typed resource identity
stale-reference rejection
explicit authority/capabilities
bounded waits and deadlines
predictable scheduling / real-time behavior
fault containment
redundant watchdog paths
persistent evidence integrity
safe update/rollback model
machine-readable invariants
whole-system dependency introspection
fault injection and deterministic replay
hardware error reporting
independent safety monitor
```

And a real medical product would additionally face device-specific verification, validation, hazard analysis, cybersecurity, human factors, manufacturing, biocompatibility, reliability, clinical evidence, and regulatory requirements that are far outside this repository's present scope.

---

## What this application does not claim

This document does not claim:

- QuirkM is currently suitable for any implanted medical device;
- Linux is unsuitable for medical devices;
- the first 100 QuirkM ledger entries are proven Linux bugs;
- eliminating Linux compatibility debt eliminates biological uncertainty;
- a language model can safely improvise therapy;
- WebAssembly isolation alone is a safety certification;
- fault provenance guarantees correct diagnosis;
- a modeled organ can capture all patient physiology;
- any specific commercial LVAD should be redesigned around Morphic or QuirkM;
- the hypothetical sensors, control loops, or resource interfaces above describe HeartMate 3 internals.

The proposal is a research hypothesis about **architectural comprehensibility and diagnosability**.

---

## The case for QuirkM even if it only wins the first hundred battles

Suppose the grandest QuirkM ambitions fail.

Suppose it does not discover a perfect universal API.

Suppose it merely studies the first 100 paramount Linux compatibility pressures honestly and manages to produce cleaner native defaults for the subset that prove valuable.

That can still matter.

A life-critical native system does not need to defeat every historical operating-system problem. It benefits whenever one entire class of ambiguity disappears from its causal model.

If QuirkM can make resource identity generation-safe, ownership explicit, authority explicit, inheritance explicit, event delivery structured, cancellation explicit, path authority explicit, memory commitments more explicit, and important state provenance first-class, then the maintenance system has fewer unnecessary explanations to consider when something goes wrong.

That does not make the remaining explanation correct.

It makes the remaining uncertainty **more meaningful**.

In the strongest form:

```text
BIOLOGICAL UNKNOWN
        |
        v
measure / model / compare
        |
        v
MACHINE WITH EXPLICIT STATE
        |
        +--> known software invariant
        +--> known resource graph
        +--> known authority graph
        +--> known sensor provenance
        +--> known actuator provenance
        +--> known degradation state
        |
        v
SMALLER REMAINING FAULT DOMAIN
```

That may be enough to justify QuirkM as a distinct native personality even if Linux compatibility remains available beside it forever.

---

## Research principle

The application can be summarized in one sentence:

> **When the body is already uncertain, the computer should not be mysterious too.**

Or in the project's existing language:

> **Minimum machine ambiguity. Maximum modeled capability. Maximum whole-system mental model.**

The long-term research question is therefore:

> **Can a context-complete operating architecture make a complex artificial organ easier for humans and machines to diagnose, validate, maintain, and safely evolve because the computational half of the system remains small enough to be understood as a whole?**

That question is testable long before anyone implants anything.

---

## External evidence anchors

These references ground the real-world portions of the application scenario. They do not validate the proposed QuirkM architecture.

1. U.S. FDA, *Technical Considerations for Medical Devices with Physiologic Closed-Loop Control Technology* (final guidance, September 2023). The guidance treats physiological closed-loop devices as systems whose design/testing depend on sensor properties, control-algorithm design, delivery-system properties, environment, automation level, and patient population.
   - https://www.fda.gov/regulatory-information/search-fda-guidance-documents/technical-considerations-medical-devices-physiologic-closed-loop-control-technology

2. U.S. FDA PMA P160054/S011, HeartMate 3 LVAS. FDA records approval for an update to the HeartMate 3 System Controller Main Application software.
   - https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?ID=427981

3. U.S. FDA PMA P160054/S032, HeartMate 3 LVAS. FDA records a Controller Main Application software upgrade from version 1.6 to 1.7.
   - https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpma/pma.cfm?ID=P160054S032

4. U.S. FDA Recall Z-2583-2024, HeartMate 3 System Controllers. FDA describes a UI membrane condition permitting potential fluid ingress with possible false-positive alarms, loss of visual/UI function, loss of power, and pump stop.
   - https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfRes/res.cfm?ID=208997

5. U.S. FDA Recall Z-2519-2026, HeartMate 3 System Controller. FDA describes the System Controller as the central power and communication hub for the HeartMate 3 LVAS.
   - https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfres/res.cfm?id=220519

6. U.S. FDA, *Computation of Physiologic Closed-Loop Controller Response Metrics* (2026 regulatory science tool). FDA notes that measurement artifacts/errors can cause computed performance metrics not to reflect actual controller response performance.
   - https://cdrh-rst.fda.gov/computation-physiologic-closed-loop-controller-response-metrics

7. WebAssembly Micro Runtime (WAMR). WAMR is a real lightweight WebAssembly runtime aimed at embedded/IoT/edge use and supports interpreter/AOT modes, RISC-V, and multiple embedded operating environments.
   - https://github.com/wasm-micro-runtime/wasm-micro-runtime
