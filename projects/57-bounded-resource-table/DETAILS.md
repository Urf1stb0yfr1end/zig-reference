# Bounded resource table integration contract

Import `bounded-resource-table`. Create a `ResourceTable(capacity)`, then `create` a backend identity and semantic read/write capabilities. Handles contain slot and generation, reject stale use, and borrow no external storage. `retain` and `release` model aliases; the final release destroys the entry. `BindingTable(ResourceRef, capacity)` maps process-local numeric slots to references, allocates the lowest empty duplicate slot deterministically, and does not interpret those slots as Linux descriptors.

For semantic I/O, call `semanticIdentity(reference)` and carry that complete value in `Request.read_bytes` or `Request.write_bytes`. A backend uses `referenceFromIdentity` before `ResourceTable.resolve`. Both slot and generation survive this round trip, so a fresh generation-2-or-later resource works after slot reuse while the stale prior generation fails. Never convert a `ResourceRef` to its index alone or reconstruct generation 1.

All storage is inline and compile-time bounded. Operations allocate nothing and are not synchronized. Failed create, retain, release, bind, duplicate, or unbind operations leave state unchanged. Generation wrap has the bounded limitation inherited from project 08.
