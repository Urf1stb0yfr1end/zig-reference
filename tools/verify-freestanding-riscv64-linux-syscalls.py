#!/usr/bin/env python3
"""Compatibility entrypoint: Batch 25B's stronger proof subsumes Batch 25A."""
import subprocess
import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
command = [sys.executable, "tools/verify-freestanding-riscv64-linux-fd-lifecycle.py", *sys.argv[1:]]
raise SystemExit(subprocess.call(command, cwd=ROOT))
