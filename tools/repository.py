"""Shared, deterministic readers for zig-reference's canonical contracts."""
from __future__ import annotations
import json, pathlib, re, subprocess

ROOT = pathlib.Path(__file__).resolve().parents[1]
GENERATED = ROOT / "generated"

def contracts():
    result=[]
    for path in sorted((ROOT / "projects").glob("*/details.json")):
        data=json.loads(path.read_text())
        required={"module","locations","public_surface","dependencies","testing","validation","security"}
        missing=required-data.keys()
        if missing: raise ValueError(f"{path.relative_to(ROOT)}: missing {sorted(missing)}")
        name=data["module"]["canonical_name"]
        if path.parent.name.split("-",1)[1] != name:
            raise ValueError(f"{path}: directory/name mismatch")
        result.append(data)
    names=[d["module"]["canonical_name"] for d in result]
    if len(names)!=len(set(names)): raise ValueError("duplicate canonical module name")
    return result

def port_contracts():
    out=[]
    for path in sorted((ROOT / "projects").glob("*/port.js")):
        text=subprocess.check_output(["node","-e",f"console.log(JSON.stringify(require({json.dumps(str(path))})))"],text=True)
        out.append(json.loads(text))
    return out

def dependencies(d):
    raw=d.get("dependencies",{})
    values=(raw.get("repository",raw.get("direct",[]))) if isinstance(raw,dict) else raw
    out=[]
    for item in values:
        if isinstance(item,str): out.append(item)
        elif isinstance(item,dict):
            name=item.get("module") or item.get("canonical_name") or item.get("name")
            if name: out.append(name)
    return sorted(set(out))

def generated(data):
    return {
        "_generated": True,
        "_notice": "GENERATED FILE — DO NOT EDIT DIRECTLY",
        "generator": "tools/build-repository-index.py",
        "repository_index_version": "1.0.0",
        **data,
    }

def dump(data): return json.dumps(data,indent=2,sort_keys=True,ensure_ascii=False)+"\n"

def topological(depmap):
    remaining={k:set(v) for k,v in depmap.items()}; result=[]
    while remaining:
        ready=sorted(k for k,v in remaining.items() if not v)
        if not ready: raise ValueError("dependency cycle: "+", ".join(sorted(remaining)))
        result.extend(ready)
        for k in ready: remaining.pop(k)
        for v in remaining.values(): v.difference_update(ready)
    return result

def capabilities(d):
    discovery=d.get("discovery",{})
    vals=[]
    for key in ("capabilities","search_terms","keywords"):
        if isinstance(discovery.get(key),list): vals += discovery[key]
    vals += d["module"].get("tags",[])
    vals += d.get("purpose",{}).get("problems_solved",[])
    return sorted(set(str(x).strip().lower() for x in vals if str(x).strip()))
