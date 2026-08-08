#!/usr/bin/env python3
"""Regression for canonical dependency-backed Python interpreter selection."""
import os
from pathlib import Path
import subprocess
import sys
import tempfile

from repository import ROOT

launcher = [sys.executable, "tools/python-environment.py"]
healthy = subprocess.run([*launcher, "tools/validate-agent-contracts.py", "--quick"], cwd=ROOT, capture_output=True, text=True)
assert healthy.returncode == 0, healthy.stderr

with tempfile.TemporaryDirectory() as directory:
    environment = os.environ | {"ZIGREF_PYTHON_ENV": str(Path(directory) / "missing")}
    missing = subprocess.run([*launcher, "tools/validate-agent-contracts.py", "--quick"], cwd=ROOT, env=environment, capture_output=True, text=True)
assert missing.returncode == 2
assert "ZIGREF-PYTHON-ENV-UNUSABLE" in missing.stderr
assert "tools/requirements.txt" in missing.stderr
assert "python3 -m venv .venv" in missing.stderr
assert "ModuleNotFoundError" not in missing.stderr
print("PASS: canonical dependency-backed Python selects .venv without shell activation and fails early with its setup repair.")
