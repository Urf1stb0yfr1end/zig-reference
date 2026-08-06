# Construct and verify an Sv39 address space

This composition owns a bounded page model, maps 4 KiB, 2 MiB, and 1 GiB leaves, walks them, rejects conflict, proves allocation-failure rollback, unmaps a leaf, and checks the returned invalidation plan.
