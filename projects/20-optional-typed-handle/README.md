# Optional Typed Handle

Creates opaque handle types distinguished by a compile-time tag and represents absence with Zig's optional type instead of magic integers.

Use separate tags for VMs, devices, timers, files, or any resource domain. Two handles with the same integer representation remain different concrete types.