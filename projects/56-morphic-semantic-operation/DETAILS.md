# Integration contract

Import `morphic-semantic-operation`. Construct `Request.write_bytes` from opaque `ResourceId`, `GuestAddress`, and `byte_count`, or `Request.terminate`. `execute` synchronously borrows a caller-owned backend and returns `Completion.success`, `.failure`, or `.terminated`. There is no allocation, global state, retained borrow, OS ABI, or architecture ABI. The backend owns resource resolution, whole-range validation, output, and termination effects.
