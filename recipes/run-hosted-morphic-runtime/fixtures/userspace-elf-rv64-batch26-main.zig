pub export const batch26_interp_path: [24]u8 linksection(".interp") = "/lib/ld-batch26-rv64.so\x00".*;

pub export fn _start() linksection(".text.entry") callconv(.naked) noreturn {
    asm volatile ("1: unimp; j 1b");
}
