#!/usr/bin/env python3
"""Narrow regression coverage for appended developer handoffs."""
import subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def main():
    command = [sys.executable, "tools/developer-minimus.py", "--command", "test", "--summary", "ordinary output preserved", "--location", "contract=details.schema.json"]
    first = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    second = subprocess.run(command, cwd=ROOT, text=True, capture_output=True)
    assert first.returncode == second.returncode == 0
    assert first.stdout == second.stdout
    lines = first.stdout.splitlines()
    assert lines.index("LOCATIONS") < lines.index("MINIMUS")
    assert len(lines[lines.index("MINIMUS"):]) <= 200
    uris = [line.split("file://", 1)[1] for line in lines if "file://" in line]
    assert uris and all(Path(uri).exists() for uri in uris)
    doctor = subprocess.run([sys.executable,"tools/query-reference.py","agent","doctor"],cwd=ROOT,text=True,capture_output=True)
    assert doctor.returncode == 0
    assert doctor.stdout.startswith('{"diagnostics"')
    assert doctor.stdout.index("LOCATIONS") < doctor.stdout.index("MINIMUS")
    print("PASS: deterministic appended LOCATIONS and <=200-line MINIMUS preserve output and status")

if __name__ == "__main__": main()
