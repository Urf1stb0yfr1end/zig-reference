#!/usr/bin/env python3
"""Canonical outer driver for serious build-backed developer checks."""
import argparse
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OPERATIONS = {
    "smoke": ("smoke", "aggregate external-consumer smoke checks", ["contracts=details.schema.json"], True),
    "validate-repository": ("validate-repository", "complete repository validation pipeline", ["contracts=details.schema.json", "commands=COMMANDS.md"], True),
    "verify-morphic-plan": ("verify-morphic-plan", "Morphic plan verification", ["recipe=recipes/plan-morphic-runtime/recipe.json"], False),
    "verify-morphic-trace": ("verify-morphic-trace", "Morphic trace verification", ["recipe=recipes/trace-morphic-example/recipe.json"], False),
}

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("operation", choices=OPERATIONS)
    parser.add_argument("--test-exit", type=int, help=argparse.SUPPRESS)
    args = parser.parse_args()
    step, summary, locations, modules = OPERATIONS[args.operation]
    outer = f"python3 tools/developer-command.py {args.operation}"
    if args.test_exit is None:
        command = ["zig", "build", step, "--summary", "all"]
    else:
        command = [sys.executable, "-c", f"print('Build Summary: controlled fixture'); raise SystemExit({args.test_exit})"]
    status = subprocess.call(command, cwd=ROOT)
    handoff = [sys.executable, "tools/developer-minimus.py", "--command", outer,
               "--status", "PASS" if status == 0 else "FAIL", "--summary", summary]
    if status:
        handoff += ["--failure", f"underlying command exited with status {status}",
                    "--next", f"zig build {step} --summary all"]
    if modules: handoff.append("--modules")
    for location in locations: handoff += ["--location", location]
    formatter_status = subprocess.call(handoff, cwd=ROOT)
    return status if status else formatter_status

if __name__ == "__main__":
    raise SystemExit(main())
