#!/usr/bin/env python3
"""Query committed deterministic repository indexes without rescanning modules."""
import argparse
import json
import sys
from repository import GENERATED, ROOT


def load(name):
    return json.loads((GENERATED / f"{name}.json").read_text())


def agent_query(argv):
    """Query the compact pilot projection without rescanning canonical contracts."""
    if not argv or argv[0] not in ("capability", "module", "diagnostic", "symbol", "pending"):
        raise SystemExit("usage: query-reference.py agent {capability|module|diagnostic|symbol|pending} [TERM]")
    kind = argv[0]
    term = argv[1] if len(argv) > 1 else ""
    directory = GENERATED / "agent"
    if kind == "pending":
        result = [x["module"] for x in json.loads((directory / "modules.json").read_text())["modules"] if x["status"] == "pending-migration"]
    elif kind == "module":
        modules = json.loads((directory / "modules.json").read_text())["modules"]
        lowered = term.lower()
        result = [x for x in modules if x["module"] == lowered or lowered in [a.lower() for a in x.get("aliases", [])]]
    else:
        collection = {"capability": "capabilities", "diagnostic": "diagnostics", "symbol": "symbols"}[kind]
        values = json.loads((directory / f"{collection}.json").read_text())[collection]
        matches = [key for key in values if term.lower() in key.lower()]
        result = [{"key": key, "value": values[key]} for key in sorted(matches)]
    for item in result:
        print(item if isinstance(item, str) else json.dumps(item, sort_keys=True, separators=(",", ":")))


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "agent":
        agent_query(sys.argv[2:])
        return
    parser = argparse.ArgumentParser()
    parser.add_argument("kind", choices=["module", "capability", "symbol", "endpoint", "error", "dependencies", "dependents", "build-order", "port-order", "status", "unvalidated", "maturity", "lifecycle", "deprecated", "replacement", "paths", "recipe"])
    parser.add_argument("term", nargs="?")
    parser.add_argument("--target", help="target version for port-order context; does not assert compatibility")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--compact", action="store_true")
    parser.add_argument("--paths-only", action="store_true")
    parser.add_argument("--symbols-only", action="store_true")
    parser.add_argument("--recursive", action="store_true")
    parser.add_argument("--explain-selection", action="store_true")
    args = parser.parse_args()
    term = (args.term or "").lower()
    modules = load("modules")["modules"]
    by_name = {item["name"]: item for item in modules}
    aliases = {alias.lower(): item["name"] for item in modules for alias in item.get("aliases", []) + item.get("deprecated_names", [])}
    canonical = term if term in by_name else aliases.get(term, term)
    explanation = None

    if args.kind == "module":
        exact = [item for item in modules if canonical == item["name"]]
        out = exact or [item for item in modules if term in item["name"] or term in item["display_name"].lower() or term in [str(x).lower() for x in item.get("aliases", [])]]
        explanation = "exact canonical identifier or declared alias" if exact else "case-insensitive textual candidate; inspect all matches"
    elif args.kind == "capability":
        words = set(term.split())
        candidates = load("capabilities")["capabilities"]
        out = [item for item in candidates if term in item["capability"] or (words and words & set(item["capability"].split()))]
        out.sort(key=lambda item: (-len(words & set(item["capability"].split())), item["capability"]))
        explanation = "ranked textual capability match; not proof of semantic compatibility"
    elif args.kind in ("symbol", "endpoint", "error"):
        file_name, collection = {"symbol": ("public-symbols", "symbols"), "endpoint": ("endpoints", "endpoints"), "error": ("errors", "errors")}[args.kind]
        out = [item for item in load(file_name)[collection] if term in item[args.kind].lower()]
        explanation = "case-insensitive generated contract-field match"
    elif args.kind in ("dependencies", "dependents"):
        key = "dependencies" if args.kind == "dependencies" else "reverse_dependencies"
        data = load("dependencies" if args.kind == "dependencies" else "reverse-dependencies")[key]
        seen = set()
        def visit(name):
            for dependency in data.get(name, []):
                if dependency not in seen:
                    seen.add(dependency)
                    if args.recursive:
                        visit(dependency)
        visit(canonical)
        out = sorted(seen)
        explanation = "canonical declared dependency edges" if canonical in data else "module identifier not found"
    elif args.kind in ("build-order", "port-order"):
        key = "build_order" if args.kind == "build-order" else "port_order"
        order = load("build-order" if args.kind == "build-order" else "port-order")[key]
        out = order if not term or term == "hyper-zig" else order[:order.index(canonical) + 1] if canonical in order else []
        explanation = "topological order from canonical dependencies"
        if args.target:
            explanation += f"; target {args.target} is query context only and remains unverified"
    elif args.kind == "status":
        out = load("repository-health")
    elif args.kind == "unvalidated":
        out = [item for item in load("status")["status"] if item["maturity_level"] < 3]
    elif args.kind == "maturity":
        levels = {"proposed": 0, "implemented": 1, "contracted": 2, "unit validated": 3, "externally smoke tested": 4, "stable": 9}
        try:
            level = int(term)
        except ValueError:
            level = levels.get(term, -1)
        out = [item for item in load("status")["status"] if item["maturity_level"] == level]
    elif args.kind == "lifecycle":
        out = [item for item in load("status")["status"] if item["lifecycle"] == term]
    elif args.kind == "deprecated":
        out = [item for item in modules if item["lifecycle"] in ("deprecated", "superseded")]
    elif args.kind == "replacement":
        item = by_name.get(canonical)
        out = [] if not item else [{"module": item["name"], "replacement_module": item.get("replacement_module", ""), "lifecycle": item["lifecycle"]}]
    elif args.kind == "paths":
        out = [{"module": item["name"], "source": item["source"], "details": item["details"]} for item in modules if term in item["name"]]
    else:
        out = []
        for path in sorted((ROOT / "recipes").glob("*/recipe.json")):
            item = json.loads(path.read_text())
            item["path"] = str(path.relative_to(ROOT))
            if term in item["name"]:
                out.append(item)

    if args.paths_only and isinstance(out, list):
        out = [item.get("source") or item.get("path") or item.get("details") for item in out if isinstance(item, dict)]
    if args.symbols_only and isinstance(out, list):
        out = [item["symbol"] for item in out if isinstance(item, dict) and "symbol" in item]
    result = {"query": {"kind": args.kind, "term": args.term, "recursive": args.recursive, "target": args.target}, "selection_explanation": explanation if args.explain_selection else None, "results": out}
    if args.json:
        print(json.dumps(result, separators=(",", ":") if args.compact else None, indent=None if args.compact else 2, sort_keys=True))
    elif isinstance(out, dict):
        print(json.dumps(out, indent=2, sort_keys=True))
    else:
        for item in out:
            print(item if isinstance(item, str) else json.dumps(item, sort_keys=True))


if __name__ == "__main__":
    main()
