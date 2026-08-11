# Bounded resource table integration contract

Import `bounded-resource-table`. Create a `ResourceTable(capacity)`, then `create` a backend identity and semantic read/write capabilities. Handles contain slot and generation, reject stale use, and borrow no external storage. `retain` and `release` model aliases; the final release destroys the entry. `BindingTable(ResourceRef, capacity)` maps process-local numeric slots to references, allocates the lowest empty duplicate slot deterministically, and does not interpret those slots as Linux descriptors.

All storage is inline and compile-time bounded. Operations allocate nothing and are not synchronized. Failed create, retain, release, bind, duplicate, or unbind operations leave state unchanged. Generation wrap has the bounded limitation inherited from project 08.
