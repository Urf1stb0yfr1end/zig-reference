#!/usr/bin/env python3
"""Query committed deterministic repository indexes without rescanning modules."""
import argparse
import json
import re
import subprocess
import sys
from repository import GENERATED, ROOT


def load(name):
    return json.loads((GENERATED / f"{name}.json").read_text())


def emit(value):
    print(json.dumps(value, sort_keys=True, separators=(",", ":")), flush=True)

def words(value): return set(re.findall(r"[a-z0-9]+", value.lower()))

def agent_query(argv):
    """Query the compact v2 projection without rescanning canonical contracts."""
    operations=("bootstrap","doctor","card","preflight","decide","compose","impact","capability","module","diagnostic","diagnose","symbol","pending")
    if not argv or argv[0] not in operations:
        raise SystemExit("usage: query-reference.py agent {"+"|".join(operations)+"} ...")
    kind = argv[0]
    term = argv[1] if len(argv) > 1 else ""
    directory = GENERATED / "agent"
    try: modules = json.loads((directory / "modules.json").read_text())["modules"]
    except Exception as exc:
        emit({"status":"error","query":{"operation":kind},"results":[],"diagnostics":[{"code":"ZIGREF-INDEX-UNUSABLE","reason":str(exc),"path":"generated/agent/modules.json","repair":"python3 tools/build-agent-index.py"}]}); return 2
    by_name={x["module"]:x for x in modules}
    if kind == "bootstrap":
        full=sum(x["status"]=="full" for x in modules)
        emit({"status":"ok","query":{"operation":"bootstrap"},"results":{"repository":"zig-reference","zig_baseline":"0.14.0","contracted_modules":len(modules),"full_fast_path_modules":full,"partial_modules":len(modules)-full,"operations":["bootstrap","doctor","decide","card","compose","impact","diagnostic","diagnose"],"workflow":["decide","card select","compose","card integrate","validate","diagnose","diagnostic repair"],"canonical_paths":["generated/agent/modules.json","generated/agent/diagnostics.json","docs/catalog/MODULES.md"],"doctor_command":"python3 tools/query-reference.py agent doctor"},"diagnostics":[]}); return 0
    if kind == "doctor":
        checks=[]; bad=False
        for component,path in [("agent modules",directory/"modules.json"),("agent diagnostics",directory/"diagnostics.json")]:
            ok=path.is_file(); bad|=not ok; checks.append({"component":component,"status":"ok" if ok else "error","path":str(path.relative_to(ROOT)),"reason":"readable" if ok else "missing","repair":"python3 tools/build-agent-index.py" if not ok else ""})
        validator_python = str(ROOT/".venv/bin/python") if (ROOT/".venv/bin/python").is_file() else sys.executable
        for component,cmd in [("agent index drift",[sys.executable,"tools/build-agent-index.py","--check"]),("agent contracts",[validator_python,"tools/validate-agent-contracts.py","--quick"])]:
            run=subprocess.run(cmd,cwd=ROOT,capture_output=True,text=True,timeout=30); ok=run.returncode==0; bad|=not ok
            checks.append({"component":component,"status":"ok" if ok else "error","reason":"check passed" if ok else (run.stderr.strip().splitlines()[-1] if run.stderr.strip() else "check failed"),"repair":"python3 tools/build-agent-index.py" if "index" in component and not ok else "python3 tools/validate-agent-contracts.py" if not ok else ""})
        zig=subprocess.run(["zig","version"],capture_output=True,text=True,timeout=5); version=zig.stdout.strip(); ok=zig.returncode==0 and version=="0.14.0"; bad|=not ok
        checks.append({"component":"zig","status":"ok" if ok else "error","reason":f"available version {version or 'unknown'}; expected 0.14.0","repair":"install Zig 0.14.0" if not ok else ""})
        emit({"status":"error" if bad else "ok","query":{"operation":"doctor"},"results":checks,"diagnostics":[] if not bad else [{"code":"ZIGREF-ENV-UNUSABLE","reason":"one or more fast-path prerequisites failed","component":"doctor","repair":"inspect failing results"}]})
        if not bad:
            subprocess.run([sys.executable,"tools/developer-minimus.py","--command","python3 tools/query-reference.py agent doctor","--summary","Agent Fast Path prerequisites, indexes, contracts, and Zig baseline are healthy.","--modules","--location","index=generated/agent/modules.json","--location","contracts=details.schema.json"],cwd=ROOT,check=True)
        return 1 if bad else 0
    if kind == "pending":
        result = [x["module"] for x in modules if x["status"] == "partial"]
    elif kind == "preflight":
        diagnostic_index=json.loads((directory/"diagnostics.json").read_text())["diagnostics"]
        def module_preflight(m):
            unknown=[]
            if not m.get("borrowing"): unknown.append("borrow obligations are unrepresented beyond the canonical contract's empty projection")
            if not m.get("failure_guarantees"): unknown.append("failure atomicity is unrepresented")
            diagnostics=[{"code":x,"meaning":diagnostic_index[x]["meaning"],"repair":diagnostic_index[x]["repair_strategy"],"validation":diagnostic_index[x]["focused_validation_command"]} for x in m.get("diagnostic_ids",[]) if x in diagnostic_index]
            return {"identity":{"kind":"module","name":m["module"],"public_symbols":m.get("public_symbols",[]),"construction":m.get("construction",{})},"zig_baseline":"0.14.0","environment":m.get("environment_constraints",{}),"dependency_build_order":m.get("dependency_build_order",[]),"ownership":m.get("ownership",{}),"cleanup":m.get("ownership",{}).get("cleanup","unknown"),"borrowing":m.get("borrowing",{}),"invalidation":m.get("invalidation",{}),"resources":m.get("resource_profile",{}),"state":{"thread_safety":m.get("thread_safety","unknown")},"failures":{"errors":m.get("error_map",[]),"guarantees":m.get("failure_guarantees",[])},"determinism":m.get("determinism",{}),"known_diagnostics":diagnostics,"validation_closure":{"focused":m.get("focused_validation_commands",[]),"aggregate":"python3 tools/developer-command.py validate-repository"},"minimum_useful_locations":[m["details"],m["source"]],"unknowns":unknown}
        if term in by_name:
            answer=module_preflight(by_name[term])
        else:
            recipe_path=ROOT/"recipes"/term/"recipe.json"
            if not recipe_path.is_file(): emit({"status":"error","query":{"operation":"preflight","subject":term},"results":[],"diagnostics":[{"code":"ZIGREF-MODULE-MISSING","reason":"module or recipe is not present","repair":"python3 tools/query-reference.py agent decide \"TASK\""}]}); return 2
            recipe=json.loads(recipe_path.read_text()); selected=[by_name[x] for x in recipe.get("selected_modules",[]) if x in by_name]
            answer={"identity":{"kind":"recipe","name":term,"public_endpoints_used":recipe.get("public_endpoints_used",[])},"zig_baseline":"0.14.0","environment":[{"module":m["module"],"constraints":m.get("environment_constraints",{})} for m in selected],"dependency_build_order":recipe.get("dependency_order",[]),"ownership":[{"module":m["module"],"obligations":m.get("ownership",{})} for m in selected],"cleanup":[{"module":m["module"],"obligation":m.get("ownership",{}).get("cleanup","unknown")} for m in selected],"borrowing":[{"module":m["module"],"obligations":m.get("borrowing",{})} for m in selected],"invalidation":[{"module":m["module"],"rules":m.get("invalidation",{})} for m in selected],"resources":[{"module":m["module"],"profile":m.get("resource_profile",{})} for m in selected],"failures":[{"module":m["module"],"errors":m.get("error_map",[]),"guarantees":m.get("failure_guarantees",[])} for m in selected],"determinism":[{"module":m["module"],"contract":m.get("determinism",{})} for m in selected],"known_diagnostics":sorted({x for m in selected for x in m.get("diagnostic_ids",[])}),"validation_closure":{"focused":recipe.get("intended_build_commands",[]),"serious_outer":f"python3 tools/developer-command.py verify-hosted-morphic-runtime" if term=="run-hosted-morphic-runtime" else None,"aggregate":"python3 tools/developer-command.py validate-repository"},"minimum_useful_locations":[str(recipe_path.relative_to(ROOT))]+[m["details"] for m in selected],"unknowns":["composition-level borrowing, cleanup, and failure atomicity are inherited module-by-module where recipe.json does not state stronger guarantees"]}
        emit({"status":"ok","query":{"operation":"preflight","subject":term},"results":answer,"diagnostics":[]}); return 0
    elif kind == "module":
        lowered = term.lower()
        result = [x for x in modules if x["module"] == lowered or lowered in [a.lower() for a in x.get("aliases", [])]]
    elif kind == "card":
        if term not in by_name: emit({"status":"error","query":{"operation":"card","module":term},"results":[],"diagnostics":[{"code":"ZIGREF-MODULE-MISSING","reason":"module is not present","component":term,"repair":"python3 tools/query-reference.py agent decide \"TASK\""}]}); return 2
        view="all"
        if "--view" in argv: view=argv[argv.index("--view")+1]
        m=by_name[term]
        select_keys=("module","summary","capabilities","selection_priority","use_when","do_not_use_when","environment_constraints","resource_profile","known_gaps","alternatives")
        integrate_keys=("module","construction","operation_map","direct_dependencies","dependency_build_order","ownership","borrowing","invalidation","error_map","minimal_usage","matching_recipes","focused_validation_commands","integration_notes")
        repair_keys=("module","error_map","diagnostic_ids","focused_validation_commands")
        keys=select_keys if view=="select" else integrate_keys if view=="integrate" else repair_keys if view=="repair" else tuple(dict.fromkeys(select_keys+integrate_keys+repair_keys))
        emit({"status":"ok","query":{"operation":"card","module":term,"view":view},"results":{k:m[k] for k in keys if k in m},"diagnostics":[]}); return 0
    elif kind == "decide":
        task=" ".join(argv[1:]); tw=words(task); candidates=[]; rejected=[]
        neg={"arbitrary","independent","unbounded","dynamic","concurrent","timestamp","persistence","replay"}
        for m in modules:
            if m["status"]!="full": continue
            positive=[]
            for value in m.get("capabilities",[])+m.get("aliases",[])+m.get("use_when",[]):
                overlap=tw & words(value)
                if overlap: positive.extend(sorted(overlap))
            contradictions=[]
            for phrase in m.get("do_not_use_when",[])+m.get("known_gaps",[]):
                overlap=(tw & words(phrase) & neg)
                if overlap: contradictions.extend(sorted(overlap))
            row={"module":m["module"],"matched_terms":sorted(set(positive)),"matched_capabilities":[c for c in m.get("capabilities",[]) if tw&words(c)],"satisfied_constraints":[],"explicit_contradictions":sorted(set(contradictions)),"selection_priority":m["selection_priority"]}
            if contradictions: rejected.append(row)
            elif positive: candidates.append((len(set(positive)),row))
        candidates=[x[1] for x in sorted(candidates,key=lambda x:(-x[0],x[1]["module"]))[:3]]
        emit({"status":"ok" if candidates else "partial","query":{"operation":"decide","task":task,"method":"deterministic contract matching; not proof of semantic compatibility"},"results":{"candidates":candidates,"rejected":rejected},"diagnostics":[]}); return 0
    elif kind == "compose":
        requested=argv[1:]; cap=json.loads((directory/"capabilities.json").read_text())["capabilities"]; chosen=[]; missing=[]; ambiguous=[]
        for q in requested:
            matches=sorted({m for c,ms in cap.items() if q==c or words(q)<=words(c) for m in ms})
            if not matches: missing.append(q)
            elif len(matches)>1: ambiguous.append({"capability":q,"modules":matches})
            else: chosen+=matches
        chosen=sorted(set(chosen)); closure=sorted({d for n in chosen for d in by_name[n].get("transitive_dependencies",[])})
        recipes=sorted({r for n in chosen for r in by_name[n].get("matching_recipes",[])})
        validations=sorted({v for n in chosen for v in by_name[n].get("focused_validation_commands",[])})
        emit({"status":"partial" if missing or ambiguous else "ok","query":{"operation":"compose","capabilities":requested},"results":{"solved_modules":chosen,"ambiguous":ambiguous,"dependency_closure":closure,"build_order":[x for x in load("build-order")["build_order"] if x in set(chosen+closure)],"recipes":recipes,"conflicts":[],"missing_capabilities":missing,"focused_validation_commands":validations},"diagnostics":[]}); return 0
    elif kind == "impact":
        if term not in by_name: emit({"status":"error","query":{"operation":"impact","module":term},"results":[],"diagnostics":[{"code":"ZIGREF-MODULE-MISSING","reason":"module is not present","component":term,"repair":"python3 tools/query-reference.py module TERM"}]}); return 2
        m=by_name[term]; emit({"status":"ok","query":{"operation":"impact","module":term},"results":{"direct_dependents":m["direct_dependents"],"transitive_dependents":m["transitive_dependents"],"recipes":m["matching_recipes"],"affected_contracts":[by_name[x]["details"] for x in m["transitive_dependents"]],"focused_module_tests":m["focused_validation_commands"],"recipe_tests":[f"zig build test-recipe-{r}" for r in m["matching_recipes"]],"aggregate_validation_commands":["zig build check","zig build test","zig build validate-repository"]},"diagnostics":[]}); return 0
    elif kind == "diagnose":
        values = json.loads((directory / "diagnostics.json").read_text())["diagnostics"]
        needle=term.casefold(); ranked=[]
        for code, record in values.items():
            exact=[]; loose=[]
            if needle==code.casefold(): exact.append("canonical_id")
            if any(needle==x.casefold() for x in record.get("aliases",[])): exact.append("alias")
            if any(needle==x.casefold() for x in record.get("native_error_aliases",[])): exact.append("native_error_alias")
            for field in ("meaning","module","operation","violated_rule"):
                if needle and needle in str(record.get(field,"")).casefold(): loose.append(field)
            for alias in record.get("native_error_aliases",[]):
                if needle and needle in alias.casefold(): loose.append("native_error_alias")
            reasons=exact or sorted(set(loose))
            if reasons: ranked.append((0 if exact else 1,code,reasons,record))
        ranked.sort(key=lambda x:(x[0],x[1])); result=[{"code":c,"matched_by":why,"summary":r["meaning"],"module":r["module"],"category":r["category"]} for _,c,why,r in ranked[:5]]
        emit({"status":"ok" if result else "unknown","query":{"operation":"diagnose","term":term},"results":result,"diagnostics":[] if result else [{"code":"ZIGREF-DIAGNOSIS-UNKNOWN","reason":"no authored diagnostic matched; cause is unclassified","repair":"preserve the native error and inspect the failing phase"}]}); return 0
    else:
        collection = {"capability": "capabilities", "diagnostic": "diagnostics", "symbol": "symbols"}[kind]
        values = json.loads((directory / f"{collection}.json").read_text())[collection]
        matches = [key for key in values if term.lower() in key.lower()]
        result = [{"key": key, "value": values[key]} for key in sorted(matches)]
    if kind=="diagnostic":
        exact = values.get(term)
        if exact is not None:
            result=[{"key":term,"value":exact}]
        else:
            aliases=[(code,record) for code,record in values.items() if term in record.get("aliases",[])]
            if len(aliases)==1:
                code,record=aliases[0]; result=[{"key":code,"value":record|{"requested_alias":term,"canonical_id":code}}]
        emit({"status":"ok" if result else "partial","query":{"operation":"diagnostic","term":term},"results":[x["value"]|{"code":x["key"]} for x in result],"diagnostics":[]}); return 0
    for item in result: print(item if isinstance(item, str) else json.dumps(item, sort_keys=True, separators=(",", ":")))
    return 0


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "agent":
        raise SystemExit(agent_query(sys.argv[2:]))
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
