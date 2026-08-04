# Physical Page Frame Number and Address Conversion

Bridges physical page-frame indices and aligned physical addresses using one explicit 4 KiB page policy.

This is the first direct Hyper-Zig-oriented module in the new batch. It reuses the existing `PhysicalAddress` type instead of introducing another raw-address convention.