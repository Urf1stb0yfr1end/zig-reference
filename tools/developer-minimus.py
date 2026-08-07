#!/usr/bin/env python3
"""Print the bounded, deterministic developer handoff used by serious checks."""
import argparse
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--command", required=True)
    parser.add_argument("--summary", required=True)
    parser.add_argument("--location", action="append", default=[])
    parser.add_argument("--modules", action="store_true")
    args = parser.parse_args()
    locations = [("repository", ROOT)]
    for item in args.location:
        label, relative = item.split("=", 1)
        path = (ROOT / relative).resolve()
        if not path.exists():
            raise SystemExit(f"MINIMUS location does not exist: {path}")
        locations.append((label, path))
    print("=" * 60)
    print("LOCATIONS")
    print("=" * 60)
    for label, path in locations:
        print(f"{label}: file://{path}")
    print("=" * 60)
    print("MINIMUS")
    print("=" * 60)
    print("status: PASS")
    print(f"command: {args.command}")
    if args.modules:
        import json
        data = json.loads((ROOT / "generated/agent/modules.json").read_text())["modules"]
        full = sum(row["status"] == "full" for row in data)
        print(f"modules: {len(data)} contracted; {full} full; {len(data) - full} partial")
    print("zig: 0.14.0")
    print(f"summary: {args.summary}")
    print("next: python3 tools/query-reference.py agent doctor")
    print("=" * 60)


if __name__ == "__main__":
    main()
