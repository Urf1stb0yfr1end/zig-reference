#!/usr/bin/env python3
"""Run dependency-backed repository tools with the repository virtual environment."""
import importlib.util
import os
from pathlib import Path
import re
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
VENV = Path(os.environ.get("ZIGREF_PYTHON_ENV", ROOT / ".venv"))
PYTHON = VENV / ("Scripts/python.exe" if os.name == "nt" else "bin/python")
REQUIREMENTS = ROOT / "tools/requirements.txt"


def requirement_imports() -> list[str]:
    names = []
    for raw in REQUIREMENTS.read_text().splitlines():
        line = raw.split("#", 1)[0].strip()
        if not line:
            continue
        match = re.match(r"([A-Za-z0-9_.-]+)", line)
        if match:
            names.append(match.group(1).replace("-", "_"))
    return names


def failure(reason: str) -> int:
    print(f"ZIGREF-PYTHON-ENV-UNUSABLE: {reason}", file=sys.stderr)
    print("dependency declaration: tools/requirements.txt", file=sys.stderr)
    print("repair: python3 -m venv .venv && .venv/bin/python -m pip install -r tools/requirements.txt", file=sys.stderr)
    return 2


def check() -> int:
    if not PYTHON.is_file():
        return failure(f"repository virtual environment interpreter is missing: {PYTHON}")
    probe = "import importlib.util,sys; missing=[x for x in sys.argv[1:] if importlib.util.find_spec(x) is None]; print('\\n'.join(missing)); raise SystemExit(bool(missing))"
    result = subprocess.run([str(PYTHON), "-c", probe, *requirement_imports()], text=True, capture_output=True)
    if result.returncode:
        missing = ", ".join(result.stdout.splitlines()) or "declared dependency probe failed"
        return failure(f"repository virtual environment cannot import required dependencies: {missing}")
    return 0


def main() -> int:
    status = check()
    if status or len(sys.argv) == 1 or sys.argv[1] == "--check":
        if not status:
            print(f"PASS: canonical validation interpreter is usable: {PYTHON.relative_to(ROOT)}")
        return status
    os.execv(str(PYTHON), [str(PYTHON), *sys.argv[1:]])


if __name__ == "__main__":
    raise SystemExit(main())
