# Mastery

An `AddressSpace` records page-aligned non-overlapping mappings. Validation precedes every mutation and writable-executable mappings are unrepresentable through its API. `ExecPlan.prepare` validates all supplied ELF bytes before returning a replacement candidate. When an interpreter is present, `entry` is its entry while `main_entry` remains available for startup metadata. Commit into page tables is deliberately a separate orchestration step.

`MaterializedImage.prepare` is the neutral bridge from validated segment ranges to complete owned pages. Fresh pages start at zero, all segment and page boundaries are traversed, and shared pages retain earlier byte contributions. Permission union is the least page-level composition that preserves every contribution; a union that becomes writable and executable is rejected. Because preparation changes no live mappings or physical ownership, capacity and arithmetic failures preserve the old image.
