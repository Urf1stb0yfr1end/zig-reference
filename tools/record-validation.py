#!/usr/bin/env python3
"""Execute canonical module targets and write deterministic, reviewable evidence."""
import argparse, hashlib, json, subprocess, sys
from repository import ROOT, GENERATED, contracts, dump

SCHEMA_VERSION = "1.0.0"
BASELINE = "0.14.0"
SCHEMA = ROOT / "validation-evidence.schema.json"

def files_for(module):
    directory = ROOT / module["module"]["directory"]
    return sorted(["build.zig", module["locations"]["public_entrypoint"], module["locations"]["details_json"], str((directory / "tests/smoke_test.zig").relative_to(ROOT))])

def digest(paths):
    h = hashlib.sha256()
    for rel in paths:
        h.update(rel.encode() + b"\0" + (ROOT / rel).read_bytes() + b"\0")
    return h.hexdigest()

def load_records():
    path = GENERATED / "validation" / "modules.json"
    if not path.exists(): return {}
    return {r["module"]: r for r in json.loads(path.read_text())["records"]}

def validate_record(r, modules, zig_version):
    required = {"module","zig_version","target_triple","optimization_mode","validation_contract_version","source_revision","source_digest","source_files","unit_test","unit_target","smoke_test","smoke_target","conformance","conformance_target"}
    if set(r) != required: raise ValueError(f"{r.get('module','<unknown>')}: evidence fields differ (missing={sorted(required-set(r))}, extra={sorted(set(r)-required)})")
    name=r["module"]
    if name not in modules: raise ValueError(f"unknown evidence module: {name}")
    if r["validation_contract_version"] != SCHEMA_VERSION: raise ValueError(f"{name}: unsupported evidence contract")
    if r["zig_version"] != BASELINE or zig_version != BASELINE: raise ValueError(f"{name}: evidence/compiler Zig version mismatch (evidence {r['zig_version']}, installed {zig_version})")
    expected=files_for(modules[name])
    if r["source_files"] != expected or r["source_digest"] != digest(expected): raise ValueError(f"{name}: stale source digest; regenerate validation evidence")
    if r["unit_target"] != f"zig build test-{name}" or r["smoke_target"] != f"zig build smoke-{name}": raise ValueError(f"{name}: non-canonical validation target")
    if r["unit_test"] not in ("pass","not_run") or r["smoke_test"] not in ("pass","not_run"): raise ValueError(f"{name}: invalid result")
    if r["conformance"] != "not_applicable" or r["conformance_target"] is not None: raise ValueError(f"{name}: no dedicated maturity-crediting conformance adapter exists")

def check():
    if not SCHEMA.exists(): raise ValueError("validation evidence schema is missing")
    try:
        import jsonschema
    except ImportError as exc:
        raise ValueError("install tools/requirements.txt (jsonschema is required)") from exc
    document=json.loads((GENERATED / "validation" / "modules.json").read_text())
    jsonschema.Draft202012Validator(json.loads(SCHEMA.read_text())).validate(document)
    modules={d["module"]["canonical_name"]:d for d in contracts()}; records=load_records()
    zig=subprocess.check_output(["zig","version"],text=True).strip()
    if set(records) != set(modules): raise ValueError(f"evidence module set differs: missing={sorted(set(modules)-set(records))} extra={sorted(set(records)-set(modules))}")
    for r in records.values(): validate_record(r,modules,zig)
    print(f"validated {len(records)} deterministic module evidence records against {SCHEMA.name}")

def record(levels):
    zig=subprocess.check_output(["zig","version"],text=True).strip()
    if zig != BASELINE: raise SystemExit(f"refusing evidence: expected Zig {BASELINE}, found {zig}")
    old=load_records(); records=[]
    revision=subprocess.check_output(["git","rev-parse","HEAD"],cwd=ROOT,text=True).strip()
    for module in contracts():
        name=module["module"]["canonical_name"]; prior=old.get(name,{})
        unit=prior.get("unit_test","not_run"); smoke=prior.get("smoke_test","not_run")
        if "unit" in levels:
            subprocess.run(["zig","build",f"test-{name}"],cwd=ROOT,check=True); unit="pass"
        if "smoke" in levels:
            subprocess.run(["zig","build",f"smoke-{name}"],cwd=ROOT,check=True); smoke="pass"
        paths=files_for(module)
        records.append({"module":name,"zig_version":zig,"target_triple":"native","optimization_mode":"Debug","validation_contract_version":SCHEMA_VERSION,"source_revision":revision,"source_digest":digest(paths),"source_files":paths,"unit_test":unit,"unit_target":f"zig build test-{name}","smoke_test":smoke,"smoke_target":f"zig build smoke-{name}","conformance":"not_applicable","conformance_target":None})
    out=GENERATED/"validation"/"modules.json"; out.parent.mkdir(parents=True,exist_ok=True)
    out.write_text(dump({"schema":"validation-evidence.schema.json","validation_contract_version":SCHEMA_VERSION,"records":records}))
    check(); print(f"recorded {','.join(sorted(levels))} evidence in {out.relative_to(ROOT)}")

def main():
    p=argparse.ArgumentParser(); p.add_argument("--check",action="store_true"); p.add_argument("--level",choices=("unit","smoke","all"),default="all"); a=p.parse_args()
    try:
        check() if a.check else record({"unit","smoke"} if a.level=="all" else {a.level})
    except (ValueError, subprocess.CalledProcessError) as e: print(f"validation evidence error: {e}",file=sys.stderr); return 1
    return 0
if __name__=="__main__": raise SystemExit(main())
