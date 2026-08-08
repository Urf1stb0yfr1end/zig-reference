#!/usr/bin/env python3
"""Prove an owned active Sv39 continuation and translated alias on two machines."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-active-sv39.py"
TIMEOUT_SECONDS = 15
PAGE_SIZE = 4096
PAGES = 8
BEGIN = b"ZIGREF_SV39_ACTIVE_BEGIN"
END = b"ZIGREF_SV39_ACTIVE_END"
RETURNED = b"ZIGREF_SV39_ACTIVE_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

morphic = load("sv39_morphic", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("sv39_trap", "tools/verify-freestanding-riscv64-supervisor-trap.py")
timer = load("sv39_timer", "tools/verify-freestanding-riscv64-supervisor-timer.py")
ticks = load("sv39_ticks", "tools/verify-freestanding-riscv64-supervisor-ticks.py")
scheduler = load("sv39_scheduler", "tools/verify-freestanding-riscv64-scheduler-time.py")
physical = load("sv39_physical", "tools/verify-freestanding-riscv64-physical-memory.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return int(value, 16)


def canonical_sv39(value):
    return value < (1 << 38) or value >= (2**64 - (1 << 38))


def parse(raw, elf_pool=None, elf_mapping=None):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one active-Sv39 frame and return marker")
    begin_at, end_at, returned_at, morphic_at = raw.find(BEGIN), raw.find(END), raw.find(RETURNED), raw.find(b"ZIGREF_MORPHIC_BEGIN")
    if not (raw.find(b"ZIGREF_PHYSICAL_MEMORY_RETURNED") < begin_at < end_at < returned_at < morphic_at):
        raise RuntimeError("active Sv39 must follow Batch 16 and precede Morphic execution")
    record = raw.split(BEGIN, 1)[1].split(END, 1)[0]
    headers, rows = {}, []
    for line in record.strip().decode("ascii").splitlines():
        fields = {}
        for item in line.split(","):
            key, sep, value = item.partition("=")
            if not sep or not key or key in fields:
                raise RuntimeError("active-Sv39 evidence contains malformed or duplicate fields")
            fields[key] = value
        if "page_table" in fields:
            rows.append(fields)
        elif len(fields) != 1:
            raise RuntimeError("unexpected compound active-Sv39 header")
        else:
            key, value = next(iter(fields.items()))
            if key in headers: raise RuntimeError("duplicate active-Sv39 header")
            headers[key] = value
    required = {"page_size", "pool_begin", "pool_end", "satp_before", "root_physical",
                "page_table_count", "mapped_begin", "mapped_end", "mapping_count", "permissions",
                "alias", "alias_physical", "alias_permissions", "alias_query", "satp_after", "mode",
                "asid", "root_ppn", "sfence_vma", "stack_global_marker", "alias_wrote", "alias_read",
                "identity_read", "post_switch_morphic", "complete"}
    if set(headers) != required or any(set(row) != {"page_table", "address"} for row in rows):
        raise RuntimeError("active-Sv39 evidence field set is incomplete or unexpected")
    page_size = fixed(headers["page_size"], "page_size")
    pool_begin, pool_end = fixed(headers["pool_begin"], "pool_begin"), fixed(headers["pool_end"], "pool_end")
    if page_size != PAGE_SIZE or pool_begin % PAGE_SIZE or pool_end - pool_begin != PAGES * PAGE_SIZE:
        raise RuntimeError("active-Sv39 pool bounds violate the Batch 16 contract")
    if elf_pool and (pool_begin, pool_end) != elf_pool: raise RuntimeError("active-Sv39 pool disagrees with ELF")
    if fixed(headers["satp_before"], "satp_before") != 0: raise RuntimeError("active-Sv39 transition did not begin from Bare")
    count = fixed(headers["page_table_count"], "page_table_count")
    if count == 0 or count > PAGES - 1 or len(rows) != count: raise RuntimeError("page-table count exceeds owned capacity")
    pages = []
    for index, row in enumerate(rows):
        if fixed(row["page_table"], "page_table") != index: raise RuntimeError("page-table indexes are not exact")
        address = fixed(row["address"], "page-table address")
        if address % PAGE_SIZE or not pool_begin <= address < pool_end: raise RuntimeError("page-table frame is unaligned or outside owned pool")
        pages.append(address)
    if len(set(pages)) != count: raise RuntimeError("duplicate page-table frame")
    root = fixed(headers["root_physical"], "root_physical")
    if root != pages[0]: raise RuntimeError("root frame is not the first owned page-table frame")
    satp = fixed(headers["satp_after"], "satp_after")
    mode, asid, ppn = satp >> 60, (satp >> 44) & 0xffff, satp & ((1 << 44) - 1)
    if mode != 8 or asid != 0 or ppn != root // PAGE_SIZE: raise RuntimeError("installed satp is not Sv39 ASID 0 with the owned root PPN")
    if headers["mode"] != "8" or headers["asid"] != "0" or fixed(headers["root_ppn"], "root_ppn") != ppn:
        raise RuntimeError("decoded satp evidence contradicts raw satp")
    mapped_begin, mapped_end = fixed(headers["mapped_begin"], "mapped_begin"), fixed(headers["mapped_end"], "mapped_end")
    if mapped_begin % PAGE_SIZE or mapped_end % PAGE_SIZE or mapped_end <= mapped_begin:
        raise RuntimeError("kernel continuation mapping is malformed")
    if elf_mapping and (mapped_begin, mapped_end) != elf_mapping: raise RuntimeError("continuation mapping disagrees with ELF")
    mapping_count = fixed(headers["mapping_count"], "mapping_count")
    if mapping_count != (mapped_end - mapped_begin) // PAGE_SIZE + 1: raise RuntimeError("mapping count is inconsistent")
    alias, target, query = fixed(headers["alias"], "alias"), fixed(headers["alias_physical"], "alias_physical"), fixed(headers["alias_query"], "alias_query")
    if not canonical_sv39(alias) or alias % PAGE_SIZE: raise RuntimeError("alias is noncanonical or misaligned")
    if alias == target or mapped_begin <= alias < mapped_end: raise RuntimeError("alias is identity or overlaps continuation mappings")
    if target % PAGE_SIZE or not pool_begin <= target < pool_end or target in pages: raise RuntimeError("alias target is not a distinct owned data frame")
    if query != target: raise RuntimeError("walker query does not resolve alias target")
    sentinel = fixed(headers["alias_wrote"], "alias_wrote")
    if fixed(headers["alias_read"], "alias_read") != sentinel or fixed(headers["identity_read"], "identity_read") != sentinel:
        raise RuntimeError("alias and identity sentinel observations contradict")
    if headers["permissions"] != "kernel-rwx-ad" or headers["alias_permissions"] != "rw-ad": raise RuntimeError("mapping permissions are unexpected")
    if headers["sfence_vma"] != "global-executed": raise RuntimeError("SFENCE.VMA transition evidence is missing")
    if fixed(headers["stack_global_marker"], "stack_global_marker") != 0x51A918: raise RuntimeError("post-switch stack/global continuation is missing")
    if headers["post_switch_morphic"] != "next" or headers["complete"] != "PASS": raise RuntimeError("post-switch Morphic/completion evidence is missing")
    return {"root": root, "pages": pages, "alias": alias, "target": target, "satp": satp,
            "pool": (pool_begin, pool_end), "mapping": (mapped_begin, mapped_end)}


def sample():
    raw = physical.sample()
    begin, end, root, alias, target = 0x80220000, 0x80228000, 0x80220000, 0x80400000, 0x80227000
    satp = (8 << 60) | (root // PAGE_SIZE)
    frame = [BEGIN, f"\npage_size={PAGE_SIZE:016x}\npool_begin={begin:016x}\npool_end={end:016x}\nsatp_before={0:016x}\nroot_physical={root:016x}\npage_table_count={4:016x}".encode()]
    for i in range(4): frame.append(f"\npage_table={i:016x},address={begin+i*PAGE_SIZE:016x}".encode())
    frame.append(f"\nmapped_begin={0x80200000:016x}\nmapped_end={end:016x}\nmapping_count={41:016x}\npermissions=kernel-rwx-ad\nalias={alias:016x}\nalias_physical={target:016x}\nalias_permissions=rw-ad\nalias_query={target:016x}\nsatp_after={satp:016x}\nmode=8\nasid=0\nroot_ppn={root//PAGE_SIZE:016x}\nsfence_vma=global-executed\nstack_global_marker={0x51A918:016x}\nalias_wrote=a1175a39c0de0011\nalias_read=a1175a39c0de0011\nidentity_read=a1175a39c0de0011\npost_switch_morphic=next\ncomplete=PASS\n".encode())
    frame += [END, b"\n", RETURNED, b"\n"]
    return raw.replace(b"ZIGREF_MORPHIC_BEGIN", b"".join(frame) + b"ZIGREF_MORPHIC_BEGIN")


def self_test():
    valid = sample(); parse(valid, (0x80220000, 0x80228000), (0x80200000, 0x80228000))
    replacements = [
        (BEGIN, b""), (RETURNED, b""), (b"satp_before=0000000000000000", b"satp_before=0000000000000001"),
        (b"root_physical=0000000080220000", b"root_physical=0000000080228000"),
        (b"page_table_count=0000000000000004", b"page_table_count=0000000000000008"),
        (b"page_table=0000000000000001,address=0000000080221000", b"page_table=0000000000000001,address=0000000080220000"),
        (b"satp_after=8000000000080220", b"satp_after=0000000000080220"),
        (b"satp_after=8000000000080220", b"satp_after=8000100000080220"),
        (b"alias=0000000080400000", b"alias=0000000080227000"),
        (b"alias=0000000080400000", b"alias=0000008000000000"),
        (b"alias_physical=0000000080227000", b"alias_physical=0000000080228000"),
        (b"alias_query=0000000080227000", b"alias_query=0000000080226000"),
        (b"sfence_vma=global-executed", b"sfence_vma=missing"),
        (b"stack_global_marker=000000000051a918", b"stack_global_marker=0000000000000000"),
        (b"alias_read=a1175a39c0de0011", b"alias_read=a1175a39c0de0012"),
        (b"post_switch_morphic=next", b"post_switch_morphic=before"),
        (b"ZIGREF_PHYSICAL_MEMORY_RETURNED", b""), (b"ZIGREF_TRAP_RETURNED", b""),
    ]
    for old, new in replacements:
        bad = valid.replace(old, new, 1)
        try:
            parse(bad); physical.parse(bad); trap.parse_trap(bad); timer.parse_timer(bad); ticks.parse_ticks(bad); scheduler.parse_scheduler_time(bad); morphic.extract(bad)
        except (RuntimeError, ValueError): pass
        else: raise AssertionError("contradictory Sv39 or preservation evidence was accepted")
    try: parse(valid + BEGIN)
    except RuntimeError: pass
    else: raise AssertionError("duplicate Sv39 frame was accepted")
    print("PASS: active-Sv39 framing, owned page tables, satp decode, SFENCE.VMA, continuation, alias translation, ordering, preservation, and rejection paths")
    return 0


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "owned Sv39 continuation and non-identity translation execute on two real RISC-V machines",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_17.md"]
    if failure: args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]: return self_test()
    qemu, readelf = shutil.which("qemu-system-riscv64"), shutil.which("readelf")
    if not qemu or not readelf:
        handoff("FAIL", f"required command is missing: {'qemu-system-riscv64' if not qemu else 'readelf'}"); return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-active-sv39-") as prefix:
            print("phase: build and inspect active-Sv39 continuation footprint", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header, symbols = run([readelf, "-h", str(artifact)]).decode(), run([readelf, "-Ws", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC": raise RuntimeError("artifact is not RISC-V EXEC")
            pool = (trap.symbol_value(symbols, "__physical_page_pool_begin"), trap.symbol_value(symbols, "__physical_page_pool_end"))
            image = (trap.symbol_value(symbols, "__image_begin"), trap.symbol_value(symbols, "__image_end"))
            mapping = (image[0] & ~(PAGE_SIZE - 1), (image[1] + PAGE_SIZE - 1) & ~(PAGE_SIZE - 1))
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real active-Sv39 machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, TIMEOUT_SECONDS) for _ in range(2)]
            records = [parse(value, pool, mapping) for value in raw]
            wb, we = trap.symbol_value(symbols, "ticksWaitBegin"), trap.symbol_value(symbols, "ticksWaitEnd")
            tb, te = trap.symbol_value(symbols, "timerWaitBegin"), trap.symbol_value(symbols, "timerWaitEnd")
            bp = trap.symbol_value(symbols, "trapProbeBreakpoint")
            for value in raw:
                physical.parse(value, *pool); scheduler.parse_scheduler_time(value); ticks.parse_ticks(value, wb, we); timer.parse_timer(value, tb, te)
                if int(trap.parse_trap(value)["sepc"], 16) != bp: raise RuntimeError("Batch 12 breakpoint proof regressed")
            payloads = [morphic.extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]): raise RuntimeError("canonical Morphic bytes drifted")
            print(f"result: PASS: pool=[0x{pool[0]:x},0x{pool[1]:x}) root=0x{records[0]['root']:x} page_tables={len(records[0]['pages'])} runs=2", flush=True)
            print(f"result: PASS: satp=Sv39 ASID=0 alias=0x{records[0]['alias']:x}->0x{records[0]['target']:x} SFENCE.VMA=global", flush=True)
            print(f"result: PASS: Batch 12-16 preserved; native/fake/two post-Sv39 machines matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError, ValueError) as error:
        print(f"active-sv39-execution-lab: FAIL: {error}", file=sys.stderr); handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")

if __name__ == "__main__": raise SystemExit(main())
