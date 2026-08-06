# Mastery: bounded deterministic event trace

## Mental model
The trace is a finite append-only observation ledger. Event meaning lives in caller-owned domain/kind constants; mechanics live here. Sequence is logical order, never time.

## Invariants
Before committing an append, both a free slot and a representable successor sequence must exist. Therefore either error occurs before any write. Reset ends the old logical history and begins again at sequence zero. Any previously borrowed event slice must be treated as invalid after append or reset because mutation changes the logical view (even though inline addresses do not move).

## Canonical comparison
Semantic equality compares six fields per event. Canonical rendering uses LF lines, 16-digit decimal sequence/count/capacity and fixed-width lowercase hexadecimal event codes and arguments. Never compare native struct bytes: padding and endian representation are not the wire format.

## Reasoning exercises
1. Prove a failed append cannot consume a sequence.
2. Calculate the exact output bound for a chosen capacity.
3. Define stable codes for a subsystem without editing this module.
4. Explain why adding timestamps would destroy host-target equivalence.
