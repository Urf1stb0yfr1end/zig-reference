#!/usr/bin/env python3
"""Generate compact deterministic Agent Fast Path v2 projections."""
import argparse, json, sys
from repository import ROOT, GENERATED, contracts, dependencies

OUT = GENERATED / "agent"
VERSION = "2.0.0"

# Authored compatibility/search metadata for published diagnostics. The module
# contracts remain authoritative for meaning and evidence; this table only adds
# stable lookup vocabulary that cannot be derived safely from prose.
DIAGNOSTIC_METADATA = {
    "ZIGREF-TOPO-CYCLE": {"aliases": ["ZIGREF-TOPOLOGICAL-CYCLE"], "category": "STATE", "native_error_aliases": ["error.Cycle", "cycle detected"]},
    "ZIGREF-TOPO-INVALID-VERTEX": {"aliases": [], "category": "INPUT", "native_error_aliases": ["error.InvalidNode", "invalid vertex"]},
    "ZIGREF-FREELIST-DOUBLE-RELEASE": {"aliases": [], "category": "STATE", "native_error_aliases": ["error.DoubleFree", "double free"]},
    "ZIGREF-POOL-DOUBLE-RELEASE": {"aliases": [], "category": "STATE", "native_error_aliases": ["double release"]},
    "ZIGREF-POOL-STALE-HANDLE": {"aliases": [], "category": "LIFETIME", "native_error_aliases": ["stale handle"]},
    "ZIGREF-BUMP-USE-AFTER-RESET": {"aliases": [], "category": "LIFETIME", "native_error_aliases": ["use after reset"]},
    "ZIGREF-PQUEUE-CAPACITY": {"aliases": [], "category": "RESOURCE", "native_error_aliases": ["error.Full", "queue full"]},
    "ZIGREF-RESOURCE-PLAN-ARITHMETIC-OVERFLOW": {"aliases": [], "category": "ARITH", "native_error_aliases": ["error.ArithmeticOverflow"]},
    "ZIGREF-RESOURCE-PLAN-INITIALIZATION-CYCLE": {"aliases": [], "category": "DEPENDENCY", "native_error_aliases": ["error.InitializationCycle"]},
    "ZIGREF-RESOURCE-PLAN-INVALID-ALIGNMENT": {"aliases": [], "category": "INPUT", "native_error_aliases": ["error.InvalidAlignment"]},
    "ZIGREF-RESOURCE-PLAN-INVALID-CAPACITY": {"aliases": [], "category": "RESOURCE", "native_error_aliases": ["error.InvalidCapacity"]},
    "ZIGREF-RESOURCE-PLAN-MEMORY-EXCEEDED": {"aliases": [], "category": "RESOURCE", "native_error_aliases": ["error.MemoryExceeded"]},
    "ZIGREF-EVENT-TRACE-FULL": {"aliases": [], "category": "RESOURCE", "native_error_aliases": ["error.TraceFull", "trace full"]},
    "ZIGREF-EVENT-TRACE-INVALID-CAPACITY": {"aliases": [], "category": "RESOURCE", "native_error_aliases": ["invalid trace capacity"]},
    "ZIGREF-EVENT-TRACE-OUTPUT-TOO-SMALL": {"aliases": [], "category": "BOUNDS", "native_error_aliases": ["error.OutputTooSmall"]},
    "ZIGREF-EVENT-TRACE-SEQUENCE-EXHAUSTED": {"aliases": [], "category": "ARITH", "native_error_aliases": ["error.SequenceExhausted"]},
}

def dump(value): return json.dumps(value, indent=2, sort_keys=True, ensure_ascii=False) + "\n"
def header(**values): return {"_generated": True, "_notice": "GENERATED FILE — DO NOT EDIT DIRECTLY", "generator": "tools/build-agent-index.py", "agent_index_version": VERSION, **values}

def build():
    cs = contracts(); names = [d["module"]["canonical_name"] for d in cs]
    direct = {d["module"]["canonical_name"]: dependencies(d) for d in cs}
    reverse = {n: [] for n in names}
    for n, ds in direct.items():
        for dep in ds: reverse.setdefault(dep, []).append(n)
    def closure(graph, name):
        seen = set()
        def visit(n):
            for child in graph.get(n, []):
                if child not in seen: seen.add(child); visit(child)
        visit(name); return sorted(seen)
    recipe_docs = [json.loads(p.read_text()) for p in sorted((ROOT / "recipes").glob("*/recipe.json"))]
    recipe_modules = {r["name"]: sorted(set(r.get("selected_modules", []) + r.get("direct_dependencies", []))) for r in recipe_docs}
    status_records = {x["module"]: x for x in json.loads((GENERATED / "status.json").read_text())["status"]}
    modules=[]; capabilities={}; symbols={}; diagnostics={}; recipes={}; deps={}
    for d in cs:
        n=d["module"]["canonical_name"]; a=d.get("agent_contract"); state="full" if a and a.get("schema_version")==VERSION else "partial"
        matching=sorted(r for r, ms in recipe_modules.items() if n in ms)
        focused=[f"zig build test-{n}", f"zig build smoke-{n}"]
        item={"id":d["module"]["id"],"module":n,"status":state,"details":d["locations"]["details_json"],"source":d["locations"]["public_entrypoint"],
              "direct_dependencies":direct[n],"transitive_dependencies":closure(direct,n),"direct_dependents":sorted(reverse[n]),"transitive_dependents":closure(reverse,n),
              "dependency_build_order":[x for x in json.loads((GENERATED/'build-order.json').read_text())["build_order"] if x in set(closure(direct,n)+[n])],
              "matching_recipes":matching,"focused_validation_commands":focused,"evidence_summary":status_records.get(n,{}),
              "change_impact":{"dependents":closure(reverse,n),"recipes":matching}}
        if a:
            for key in ("summary","search_aliases","capability_ids","public_symbols","use_when","do_not_use_when","selection_priority","alternatives","environment_constraints","resource_profile","construction","operation_map","error_map","composition","determinism","known_gaps","minimal_usage","integration_notes","ownership","borrowing","invalidation","failure_guarantees","thread_safety"):
                item[key]=a[key]
            item["aliases"]=item.pop("search_aliases"); item["capabilities"]=item.pop("capability_ids")
            item["diagnostic_ids"]=sorted(x["id"] for x in a["diagnostics"])
            for x in a["capability_ids"]: capabilities.setdefault(x,[]).append(n)
            for x in a["public_symbols"]: symbols.setdefault(x,[]).append(n)
            for x in matching: recipes.setdefault(x,[]).append(n)
            for x in a["diagnostics"]:
                metadata=DIAGNOSTIC_METADATA.get(x["id"], {"aliases":[],"category":"CONTRACT","native_error_aliases":[]})
                diagnostics[x["id"]]={"aliases":metadata["aliases"],"category":metadata["category"],"native_error_aliases":metadata["native_error_aliases"],"module":n,"operation":"module contract invariant","meaning":x["title"],"violated_rule":x["violated_rule"],"observed_condition":x["title"],"expected_condition":x["violated_rule"],"evidence_classification":x["fixture_classification"],"evidence_status":x["evidence_status"],"repair_status":"known" if x["repair_strategy"] else "unknown","misuse_fixture":x["fixture"],"repair_example":x["repair_example"],"repair_strategy":x["repair_strategy"],"focused_validation_command":focused[0],"locations":[d["locations"]["details_json"],x["fixture"],x["repair_example"]]}
        modules.append(item); deps[n]={"dependencies":direct[n],"status":state}
    modules.sort(key=lambda x:x["id"])
    return {"modules.json":dump(header(modules=modules)),"modules.jsonl":"\n".join(json.dumps(x,sort_keys=True,separators=(",",":")) for x in modules)+"\n",
      "capabilities.json":dump(header(capabilities={k:sorted(v) for k,v in sorted(capabilities.items())})),"symbols.json":dump(header(symbols={k:sorted(v) for k,v in sorted(symbols.items())})),
      "diagnostics.json":dump(header(diagnostics=dict(sorted(diagnostics.items())))),"recipes.json":dump(header(recipes={k:sorted(v) for k,v in sorted(recipes.items())})),"dependencies.json":dump(header(dependencies=dict(sorted(deps.items()))))}

def main():
    p=argparse.ArgumentParser(); p.add_argument("--check",action="store_true"); args=p.parse_args(); print("agent-index: deriving contracts and graph relationships",file=sys.stderr)
    output=build(); stale=[]
    if not args.check: OUT.mkdir(parents=True,exist_ok=True)
    for name,text in output.items():
        path=OUT/name
        if args.check and (not path.exists() or path.read_text()!=text): stale.append(str(path.relative_to(ROOT)))
        elif not args.check: path.write_text(text)
    if stale:
        print("ZIGREF-INDEX-STALE: generated agent index differs: "+", ".join(stale),file=sys.stderr); print("repair: PYTHONDONTWRITEBYTECODE=1 python3 tools/build-agent-index.py",file=sys.stderr); return 1
    full=sum(bool(d.get("agent_contract") and d["agent_contract"].get("schema_version")==VERSION) for d in contracts())
    print(f"PASS: {'checked' if args.check else 'generated'} {len(output)} deterministic agent indexes ({full} full, {len(contracts())-full} partial)",file=sys.stderr); return 0
if __name__=="__main__": raise SystemExit(main())
