#!/usr/bin/env python3
"""Check the canonical command manual against repository command definitions."""
from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
MANUAL = ROOT / "COMMANDS.md"
BEGIN = "<!-- BEGIN GENERATED MODULE COMMANDS -->"
END = "<!-- END GENERATED MODULE COMMANDS -->"


def module_rows() -> str:
    modules = json.loads((ROOT / "generated/modules.json").read_text())["modules"]
    rows = [
        "| Module import | Unit test | External smoke test | Contract |",
        "|---|---|---|---|",
    ]
    for module in sorted(modules, key=lambda item: item["id"]):
        name = module["name"]
        rows.append(
            f"| `{name}` | `zig build test-{name}` | `zig build smoke-{name}` | `{module['details']}` |"
        )
    return "\n".join(rows)


def expected_section() -> str:
    return f"{BEGIN}\n{module_rows()}\n{END}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="accepted compatibility flag; checking is always non-writing")
    parser.parse_args()
    errors: list[str] = []
    if not MANUAL.exists():
        errors.append("COMMANDS.md is missing")
        text = ""
    else:
        text = MANUAL.read_text()

    match = re.search(re.escape(BEGIN) + r".*?" + re.escape(END), text, re.S)
    if not match or match.group(0) != expected_section():
        errors.append("generated module-command section is missing or stale")

    build = (ROOT / "build.zig").read_text()
    literal_steps = set(re.findall(r'b\.step\("([a-z0-9-]+)"', build))
    for step in sorted(literal_steps):
        if f"zig build {step}" not in text:
            errors.append(f"build step absent from COMMANDS.md: {step}")

    cli_tools = sorted(
        path.relative_to(ROOT).as_posix()
        for pattern in ("*.py", "*.js")
        for path in (ROOT / "tools").glob(pattern)
        if path.name not in {"repository.py", "port-lib.js"}
    )
    for tool in cli_tools:
        if tool not in text:
            errors.append(f"tool entrypoint absent from COMMANDS.md: {tool}")

    for path in sorted((ROOT / "recipes").glob("*/recipe.json")):
        recipe = json.loads(path.read_text())
        if recipe["name"] not in text:
            errors.append(f"recipe absent from COMMANDS.md: {recipe['name']}")
    for path in sorted((ROOT / "conformance").glob("*/suite.json")):
        suite = json.loads(path.read_text())
        name = suite.get("name", path.parent.name)
        if name not in text:
            errors.append(f"conformance suite absent from COMMANDS.md: {name}")

    available_paths = re.findall(r"`(?:python3|node) ([^` ]+)", text)
    for value in available_paths:
        if value.startswith("tools/") and not (ROOT / value).exists():
            errors.append(f"documented tool path does not exist: {value}")
    if "zig build database" in text or "build-repository-database.py" in text:
        errors.append("forbidden database command appears in COMMANDS.md")

    if errors:
        print("\n".join(errors), file=sys.stderr)
        return 1
    module_count = len(json.loads((ROOT / "generated/modules.json").read_text())["modules"])
    print(f"command reference passed: {len(literal_steps)} aggregate steps, {module_count} module command pairs, {len(cli_tools)} tool entrypoints")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
