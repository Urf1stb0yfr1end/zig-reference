#!/usr/bin/env python3
"""Prove bounded linker-owned physical frames on two real RISC-V machines."""
import importlib.util
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COMMAND = "python3 tools/verify-freestanding-riscv64-physical-memory.py"
TIMEOUT_SECONDS = 15
PAGES = 8
PAGE_SIZE = 4096
BEGIN = b"ZIGREF_PHYSICAL_MEMORY_BEGIN"
END = b"ZIGREF_PHYSICAL_MEMORY_END"
RETURNED = b"ZIGREF_PHYSICAL_MEMORY_RETURNED"


def load(name, path):
    spec = importlib.util.spec_from_file_location(name, ROOT / path)
    assert spec and spec.loader
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

morphic = load("physical_morphic", "tools/verify-freestanding-riscv64-morphic-runtime.py")
trap = load("physical_trap", "tools/verify-freestanding-riscv64-supervisor-trap.py")
timer = load("physical_timer", "tools/verify-freestanding-riscv64-supervisor-timer.py")
ticks = load("physical_ticks", "tools/verify-freestanding-riscv64-supervisor-ticks.py")
scheduler = load("physical_scheduler", "tools/verify-freestanding-riscv64-scheduler-time.py")


def run(command, timeout=None):
    return subprocess.run(command, cwd=ROOT, check=True, stdout=subprocess.PIPE,
                          stderr=subprocess.STDOUT, timeout=timeout).stdout


def fixed(value, name):
    if not re.fullmatch(r"[0-9a-f]{16}", value):
        raise RuntimeError(f"{name} is not fixed-width hexadecimal evidence")
    return int(value, 16)


def parse(raw, elf_begin=None, elf_end=None):
    if raw.count(BEGIN) != 1 or raw.count(END) != 1 or raw.count(RETURNED) != 1:
        raise RuntimeError("machine output requires exactly one physical-memory frame and return marker")
    if raw.find(b"ZIGREF_SCHEDULER_TIME_RETURNED") < 0 or raw.find(b"ZIGREF_SCHEDULER_TIME_RETURNED") > raw.find(BEGIN):
        raise RuntimeError("physical-memory scenario did not follow the preserved scheduler proof")
    record = raw.split(BEGIN, 1)[1].split(END, 1)[0]
    headers, frame_rows = {}, []
    for line in record.strip().decode("ascii").splitlines():
        fields = {}
        for item in line.split(","):
            key, sep, value = item.partition("=")
            if not sep or not key or key in fields:
                raise RuntimeError("physical-memory evidence contains malformed or duplicate fields")
            fields[key] = value
        if "frame" in fields:
            frame_rows.append(fields)
        else:
            if len(fields) != 1:
                raise RuntimeError("unexpected compound physical-memory header")
            key, value = next(iter(fields.items()))
            if key in headers:
                raise RuntimeError("duplicate physical-memory header")
            headers[key] = value
    required = {"pages", "page_size", "pool_begin", "pool_end", "satp", "translation",
                "region_count", "region_kind", "initial_free", "initial_allocated", "exhausted",
                "released_index", "double_free", "foreign_pfn", "foreign_release",
                "reacquired_pfn", "reacquired_matches", "final_free", "final_allocated", "complete"}
    row_required = {"frame", "pfn", "address", "offset", "wrote", "read"}
    if set(headers) != required or len(frame_rows) != PAGES or any(set(row) != row_required for row in frame_rows):
        raise RuntimeError("physical-memory evidence field set is incomplete or unexpected")
    pages, page_size = fixed(headers["pages"], "pages"), fixed(headers["page_size"], "page_size")
    begin, end = fixed(headers["pool_begin"], "pool_begin"), fixed(headers["pool_end"], "pool_end")
    if pages != PAGES or page_size != PAGE_SIZE:
        raise RuntimeError("wrong compiled pool page count or canonical page size")
    if begin == 0 or begin % PAGE_SIZE or end % PAGE_SIZE or end <= begin or end - begin != PAGES * PAGE_SIZE:
        raise RuntimeError("pool interval is zero, unaligned, reversed, or inconsistently sized")
    if elf_begin is not None and (begin != elf_begin or end != elf_end):
        raise RuntimeError("runtime pool bounds disagree with ELF symbols")
    if fixed(headers["satp"], "satp") != 0 or headers["translation"] != "bare":
        raise RuntimeError("direct physical access lacks actual Bare satp evidence")
    if (fixed(headers["region_count"], "region_count"), headers["region_kind"]) != (1, "usable"):
        raise RuntimeError("owned pool was not represented as exactly one usable region")
    if fixed(headers["initial_free"], "initial_free") != PAGES or fixed(headers["initial_allocated"], "initial_allocated") != 0:
        raise RuntimeError("allocator initial accounting is inconsistent")
    addresses = []
    for index, row in enumerate(frame_rows):
        values = {key: fixed(row[key], key) for key in row_required}
        if values["frame"] != index or values["address"] != values["pfn"] * PAGE_SIZE:
            raise RuntimeError("frame index or PFN/address conversion is inconsistent")
        if values["address"] % PAGE_SIZE or not begin <= values["address"] < end:
            raise RuntimeError("allocated frame is unaligned or outside the linker-owned pool")
        if values["offset"] != 64 or values["offset"] + 8 > PAGE_SIZE:
            raise RuntimeError("sentinel access is outside its bounded frame")
        if values["wrote"] != 0x5A17000000000000 | index or values["read"] != values["wrote"]:
            raise RuntimeError("sentinel write/read relationship is missing or contradictory")
        addresses.append(values["address"])
    if len(set(addresses)) != PAGES:
        raise RuntimeError("simultaneously allocated frames are not unique")
    released = fixed(headers["released_index"], "released_index")
    if headers["exhausted"] != "Exhausted" or released >= PAGES or headers["double_free"] != "DoubleFree":
        raise RuntimeError("exhaustion or release/double-free evidence is malformed")
    if fixed(headers["foreign_pfn"], "foreign_pfn") != end // PAGE_SIZE or headers["foreign_release"] != "ForeignFrame":
        raise RuntimeError("foreign-frame rejection does not identify the pool-end frame")
    reacquired = fixed(headers["reacquired_pfn"], "reacquired_pfn")
    if reacquired != fixed(frame_rows[released]["pfn"], "released pfn") or headers["reacquired_matches"] != "PASS":
        raise RuntimeError("released frame was not deterministically reacquired")
    if fixed(headers["final_free"], "final_free") != PAGES or fixed(headers["final_allocated"], "final_allocated") != 0 or headers["complete"] != "PASS":
        raise RuntimeError("final allocator accounting or completion is inconsistent")
    return {"begin": begin, "end": end, "addresses": addresses}


def sample():
    raw = scheduler.sample()
    begin = 0x80220000
    lines = [BEGIN, b"\npages=0000000000000008\npage_size=0000000000001000", f"\npool_begin={begin:016x}\npool_end={begin + PAGES * PAGE_SIZE:016x}".encode(),
             b"\nsatp=0000000000000000\ntranslation=bare\nregion_count=0000000000000001\nregion_kind=usable\ninitial_free=0000000000000008\ninitial_allocated=0000000000000000"]
    for i in range(PAGES):
        address = begin + i * PAGE_SIZE
        sentinel = 0x5A17000000000000 | i
        lines.append(f"\nframe={i:016x},pfn={address // PAGE_SIZE:016x},address={address:016x},offset=0000000000000040,wrote={sentinel:016x},read={sentinel:016x}".encode())
    lines.append(f"\nexhausted=Exhausted\nreleased_index=0000000000000002\ndouble_free=DoubleFree\nforeign_pfn={(begin + PAGES * PAGE_SIZE)//PAGE_SIZE:016x}\nforeign_release=ForeignFrame\nreacquired_pfn={(begin//PAGE_SIZE)+2:016x}\nreacquired_matches=PASS\nfinal_free=0000000000000008\nfinal_allocated=0000000000000000\ncomplete=PASS\n".encode())
    lines += [END, b"\n", RETURNED, b"\n"]
    return raw.replace(b"ZIGREF_MORPHIC_BEGIN", b"".join(lines) + b"ZIGREF_MORPHIC_BEGIN")


def self_test():
    valid = sample()
    parsed = parse(valid, 0x80220000, 0x80228000)
    invalid = [
        valid.replace(BEGIN, b"", 1), valid + BEGIN, valid.replace(RETURNED, b""),
        valid.replace(b"pages=0000000000000008", b"pages=0000000000000007"),
        valid.replace(b"page_size=0000000000001000", b"page_size=0000000000002000"),
        valid.replace(b"pool_begin=0000000080220000", b"pool_begin=0000000080220001"),
        valid.replace(b"pool_end=0000000080228000", b"pool_end=0000000080227000"),
        valid.replace(b"satp=0000000000000000", b"satp=8000000000000001"),
        valid.replace(b"translation=bare", b"translation=sv39"),
        valid.replace(b"frame=0000000000000001", b"frame=0000000000000000"),
        valid.replace(b"address=0000000080227000", b"address=0000000080228000"),
        valid.replace(b"read=5a17000000000003", b"read=5a17000000000004"),
        valid.replace(b"exhausted=Exhausted", b"exhausted=INVALID"),
        valid.replace(b"double_free=DoubleFree", b"double_free=INVALID"),
        valid.replace(b"foreign_release=ForeignFrame", b"foreign_release=INVALID"),
        valid.replace(b"final_free=0000000000000008", b"final_free=0000000000000007"),
        valid.replace(b"complete=PASS", b"complete=FAIL"),
        valid.replace(b"ZIGREF_TRAP_RETURNED", b""), valid.replace(b"ZIGREF_TICKS_RETURNED", b""),
        valid.replace(b"ZIGREF_SCHEDULER_TIME_RETURNED", b""), valid.replace(b"5a17000000000000", b"5a17000000000001", 1),
    ]
    for value in invalid:
        try:
            parse(value, parsed["begin"], parsed["end"])
            trap.parse_trap(value); timer.parse_timer(value); ticks.parse_ticks(value); scheduler.parse_scheduler_time(value); morphic.extract(value)
        except (RuntimeError, ValueError):
            pass
        else:
            raise AssertionError("contradictory physical-memory or preservation evidence was accepted")
    print("PASS: ELF bounds, Bare mode, allocation bounds/uniqueness, sentinel access, exhaustion, release, accounting, preservation, and rejection paths")
    return 0


def handoff(status, failure=None):
    args = [sys.executable, "tools/developer-minimus.py", "--command", COMMAND, "--status", status,
            "--summary", "bounded linker-owned physical frames execute on two real RISC-V machines",
            "--location", "source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig",
            "--location", "contract=recipes/run-hosted-morphic-runtime/recipe.json",
            "--location", "report=docs/reports/AGENTIC_SNOWBALL_BATCH_16.md"]
    if failure: args += ["--failure", failure, "--next", COMMAND]
    return subprocess.call(args, cwd=ROOT)


def main():
    if sys.argv[1:] == ["--self-test"]: return self_test()
    qemu, readelf = shutil.which("qemu-system-riscv64"), shutil.which("readelf")
    if not qemu or not readelf:
        handoff("FAIL", f"required command is missing: {'qemu-system-riscv64' if not qemu else 'readelf'}"); return 1
    try:
        with tempfile.TemporaryDirectory(prefix="zigref-physical-memory-") as prefix:
            print("phase: build and inspect linker-owned physical page pool", flush=True)
            subprocess.run(["zig", "build", "install-freestanding-riscv64-morphic-runtime", "--prefix", prefix], cwd=ROOT, check=True)
            artifact = Path(prefix) / "bin/morphic-freestanding-riscv64"
            header = run([readelf, "-h", str(artifact)]).decode()
            if morphic.field(header, "Machine") != "RISC-V" or morphic.elf_type(header) != "EXEC": raise RuntimeError("artifact is not RISC-V EXEC")
            symbols = run([readelf, "-Ws", str(artifact)]).decode()
            pool_begin = trap.symbol_value(symbols, "__physical_page_pool_begin")
            pool_end = trap.symbol_value(symbols, "__physical_page_pool_end")
            stack_begin = trap.symbol_value(symbols, "__stack_bottom")
            stack_end = trap.symbol_value(symbols, "__stack_top")
            if pool_begin % PAGE_SIZE or pool_end - pool_begin != PAGES * PAGE_SIZE: raise RuntimeError("ELF pool bounds violate the compiled contract")
            if not (stack_end <= pool_begin or pool_end <= stack_begin): raise RuntimeError("ELF pool overlaps the stack")
            native = [run(["zig", "build", "run-hosted-morphic-runtime"]) for _ in range(2)]
            fake = [run(["zig", "build", "run-fake-morphic-runtime"]) for _ in range(2)]
            command = [qemu, "-machine", "virt", "-nographic", "-bios", "default", "-kernel", str(artifact)]
            print(f"phase: execute two real physical-memory machines with timeout={TIMEOUT_SECONDS}s", flush=True)
            raw = [run(command, TIMEOUT_SECONDS) for _ in range(2)]
            records = [parse(value, pool_begin, pool_end) for value in raw]
            wb, we = trap.symbol_value(symbols, "ticksWaitBegin"), trap.symbol_value(symbols, "ticksWaitEnd")
            tb, te = trap.symbol_value(symbols, "timerWaitBegin"), trap.symbol_value(symbols, "timerWaitEnd")
            bp = trap.symbol_value(symbols, "trapProbeBreakpoint")
            for value in raw:
                scheduler.parse_scheduler_time(value); ticks.parse_ticks(value, wb, we); timer.parse_timer(value, tb, te)
                if int(trap.parse_trap(value)["sepc"], 16) != bp: raise RuntimeError("Batch 12 breakpoint proof regressed")
            payloads = [morphic.extract(value) for value in raw]
            if not (native[0] == native[1] == fake[0] == fake[1] == payloads[0] == payloads[1]): raise RuntimeError("canonical Morphic bytes drifted")
            print(f"result: PASS: ELF/runtime pool=[0x{pool_begin:x},0x{pool_end:x}) pages={PAGES} translation=Bare runs=2", flush=True)
            print(f"result: PASS: unique bounded frames, real sentinels, exhaustion/release/rejections, final free={PAGES} allocated=0", flush=True)
            print(f"result: PASS: Batch 12/13/14/15 preserved; native/fake/two machines matched at {len(payloads[0])} bytes", flush=True)
    except (OSError, UnicodeError, subprocess.CalledProcessError, subprocess.TimeoutExpired, RuntimeError, ValueError) as error:
        print(f"physical-memory-execution-lab: FAIL: {error}", file=sys.stderr); handoff("FAIL", str(error))
        return error.returncode if isinstance(error, subprocess.CalledProcessError) else 1
    return handoff("PASS")

if __name__ == "__main__": raise SystemExit(main())
