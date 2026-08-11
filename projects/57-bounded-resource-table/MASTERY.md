# Mastery: bounded resource table

Keep four identities separate: a compatibility-visible descriptor, a process-local binding slot, a generational `ResourceRef`, and a backend identity. Aliases copy only the `ResourceRef`; `retain` makes their shared lifetime explicit. Closing an adapter binding means unbind then release, not destruction by descriptor fiat.

A future QuirkM typed handle can wrap `ResourceRef`, and a future Wasm adapter can store it in its own table. Both can call `resolve` directly without Linux integers or errno. The backend still owns device-specific state such as a deterministic input cursor.

Exercises: prove a stale handle fails after slot reuse; fill every binding; close one of two aliases; decide where synchronization belongs for a future concurrent process.

## Generation-preserving semantic identity

The semantic operation boundary carries `{ slot, generation }`, not merely the slot. `semanticIdentity` and `referenceFromIdentity` are the canonical lossless conversion. This means slot reuse changes identity without introducing Linux fd meaning, and stale requests remain rejectable by the same resource table.
