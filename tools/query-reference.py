#!/usr/bin/env python3
import argparse,json
from repository import GENERATED,ROOT
def load(n): return json.loads((GENERATED/f"{n}.json").read_text())
def main():
    p=argparse.ArgumentParser(); p.add_argument("kind",choices=["module","capability","symbol","endpoint","error","dependencies","dependents","build-order","status","unvalidated","maturity","paths","recipe"]); p.add_argument("term",nargs="?"); p.add_argument("--json",action="store_true"); p.add_argument("--compact",action="store_true"); p.add_argument("--paths-only",action="store_true"); p.add_argument("--symbols-only",action="store_true"); p.add_argument("--recursive",action="store_true"); p.add_argument("--explain-selection",action="store_true"); a=p.parse_args(); term=(a.term or "").lower(); out=[]
    mods=load("modules")["modules"]
    if a.kind=="module": out=[x for x in mods if term in x["name"] or term in x["display_name"].lower()]
    elif a.kind=="capability":
        words=set(term.split())
        candidates=load("capabilities")["capabilities"]
        out=[x for x in candidates if term in x["capability"] or (words and words & set(x["capability"].split()))]
        out.sort(key=lambda x:(-len(words & set(x["capability"].split())),x["capability"]))
    elif a.kind in ("symbol","endpoint","error"): out=[x for x in load({"symbol":"public-symbols","endpoint":"endpoints","error":"errors"}[a.kind])[{"symbol":"symbols","endpoint":"endpoints","error":"errors"}[a.kind]] if term in x[a.kind].lower()]
    elif a.kind in ("dependencies","dependents"):
        key="dependencies" if a.kind=="dependencies" else "reverse_dependencies"; data=load("dependencies" if a.kind=="dependencies" else "reverse-dependencies")[key]; seen=set()
        def visit(n):
            for x in data.get(n,[]):
                if x not in seen: seen.add(x); visit(x) if a.recursive else None
        visit(a.term); out=sorted(seen)
    elif a.kind=="build-order":
        order=load("build-order")["build_order"]; out=order if not term else order[:order.index(a.term)+1] if a.term in order else []
    elif a.kind=="status": out=load("repository-health")
    elif a.kind=="unvalidated": out=[x for x in load("status")["status"] if x["maturity_level"]<3]
    elif a.kind=="maturity":
        levels={"proposed":0,"implemented":1,"contracted":2,"unit validated":3,"externally smoke tested":4,"stable":9}; out=[x for x in load("status")["status"] if x["maturity_level"]==levels.get(term,-1)]
    elif a.kind=="paths": out=[{"module":x["name"],"source":x["source"],"details":x["details"]} for x in mods if term in x["name"]]
    else:
        for path in sorted((ROOT/"recipes").glob("*/recipe.json")):
            x=json.loads(path.read_text()); x["path"]=str(path.relative_to(ROOT));
            if term in x["name"]: out.append(x)
    if a.paths_only and isinstance(out,list): out=[x.get("source") or x.get("path") or x.get("details") for x in out if isinstance(x,dict)]
    if a.symbols_only and isinstance(out,list): out=[x["symbol"] for x in out if isinstance(x,dict) and "symbol" in x]
    result={"query":{"kind":a.kind,"term":a.term,"recursive":a.recursive},"selection_explanation":"case-insensitive match against committed generated textual indexes" if a.explain_selection else None,"results":out}
    if a.json: print(json.dumps(result,separators=(",",":") if a.compact else None,indent=None if a.compact else 2,sort_keys=True))
    else:
        if isinstance(out,dict): print(json.dumps(out,indent=2,sort_keys=True))
        else:
            for x in out: print(x if isinstance(x,str) else json.dumps(x,sort_keys=True))
if __name__=="__main__": main()
