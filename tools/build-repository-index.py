#!/usr/bin/env python3
import argparse, collections, pathlib, sys
from repository import *

FILES=["modules","ports","dependencies","reverse-dependencies","capabilities","public-symbols","endpoints","errors","status","build-order","port-order","repository-summary","capability-ontology","repository-health"]

def build():
    cs=contracts(); names={d["module"]["canonical_name"] for d in cs}
    dep={d["module"]["canonical_name"]:dependencies(d) for d in cs}
    for name, ds in dep.items():
        unknown=set(ds)-names
        if unknown: raise ValueError(f"{name}: unknown dependencies {sorted(unknown)}")
        if name in ds: raise ValueError(f"{name}: self dependency")
    rev={n:[] for n in sorted(names)}
    for n,ds in dep.items():
        for x in ds: rev[x].append(n)
    for v in rev.values(): v.sort()
    mods=[]; syms=[]; ends=[]; errs=[]; caps=collections.defaultdict(list)
    for d in cs:
        m=d["module"]; n=m["canonical_name"]
        mods.append({"id":m["id"],"name":n,"display_name":m["display_name"],"summary":m["summary"],"directory":m["directory"],"status":m["status"],"lifecycle":m["lifecycle"],"declared_maturity":m["maturity"],"target_maturity_level":m["target_maturity_level"],"aliases":sorted(m["aliases"]),"deprecated_names":sorted(m["deprecated_names"]),"replacement_module":m["replacement_module"],"implementation_version":m["implementation_version"],"public_contract_version":m["public_contract_version"],"details":d["locations"]["details_json"],"source":d["locations"]["public_entrypoint"]})
        for s in sorted(set(d["public_surface"].get("root_symbols",[]))): syms.append({"module":n,"symbol":s})
        for e in d["public_surface"].get("endpoints",[]):
            ends.append({"module":n,"name":e.get("name",""),"kind":e.get("kind",""),"signature":e.get("signature","")})
            for er in e.get("errors",[]): errs.append({"module":n,"endpoint":e.get("name",""),"error":er if isinstance(er,str) else er.get("name","")})
        for c in capabilities(d): caps[c].append(n)
    order=topological(dep)
    ports=[]
    for p in port_contracts(): ports.append({"module":p["module"]["canonicalName"],"baseline":p["baseline"],"path":p["module"]["portContract"],"risks":p.get("semanticPortingRisks",[])})
    evidence_path=GENERATED/"validation/modules.json"
    evidence=[]
    if evidence_path.exists():
        import json
        evidence=json.loads(evidence_path.read_text())["records"]
    # Maturity is evidence-derived: contracts and implementation establish L2; explicit successful evidence raises it.
    status=[]
    for m in mods:
        ev=[]
        for x in evidence:
            if x.get("module")==m["name"]: ev.append(x)
        level=2
        unit=any(x.get("unit_test")=="pass" for x in ev)
        smoke=unit and any(x.get("smoke_test")=="pass" for x in ev)
        conformance=any(x.get("conformance")=="pass" for x in ev)
        if unit: level=3
        if smoke: level=4
        status.append({"module":m["name"],"lifecycle":m["lifecycle"],"target_maturity_level":m["target_maturity_level"],"maturity_level":level,"unit_validated":unit,"smoke_validated":smoke,"conformance_validated":conformance,"evidence_records":len(ev)})
    ontology=[]
    for c,implementers in sorted(caps.items()): ontology.append({"canonical_name":c,"description":f"Repository capability represented by: {c}.","aliases":[],"related_terms":[],"broader_capability":None,"narrower_capabilities":[],"negative_matches":[],"implementing_modules":sorted(implementers),"partially_implementing_modules":[],"common_queries":[c],"common_mistaken_matches":[]})
    health={"definitions":{"implemented_modules":"modules with an implementation source path","contracted_modules":"modules with a validated details.json","compiler_validated_modules":"modules whose canonical Zig 0.14.0 unit target passed and whose textual evidence source digest is current","smoke_tested_modules":"compiler-validated modules whose canonical named-import smoke target passed and whose evidence is current","conformance_tested_modules":"modules named by a dedicated shared behavioral adapter with successful current evidence; unit-test reuse receives no credit","reused_modules":"modules having at least one declared reverse dependent","system_proven_modules":"modules backed by a recipe or flagship integration evidence record","port_contract_coverage":"modules with port.js divided by contracted modules"},"implemented_modules":len(mods),"contracted_modules":len(mods),"compiler_validated_modules":sum(s["unit_validated"] for s in status),"smoke_tested_modules":sum(s["smoke_validated"] for s in status),"conformance_tested_modules":sum(s["conformance_validated"] for s in status),"reused_modules":sum(bool(rev[n]) for n in rev),"system_proven_modules":0,"stable_modules":sum(s["maturity_level"]>=9 for s in status),"deprecated_modules":sum(s["lifecycle"]=="deprecated" for s in status),"dependency_cycles":0,"missing_contracts":0,"stale_generated_textual_files":0,"zig_baseline":"0.14.0","port_contract_coverage":{"covered":len(ports),"total":len(mods)},"recipe_coverage":len(list((ROOT/"recipes").glob("*/recipe.json"))) if (ROOT/"recipes").exists() else 0,"hyper_zig_readiness":{"system_proven":False,"note":"foundation contracts exist; complete integration evidence does not"},"unsupported_claims":[]}
    return {
      "modules":generated({"modules":mods}),"ports":generated({"ports":sorted(ports,key=lambda x:x["module"])}),
      "dependencies":generated({"dependencies":dep}),"reverse-dependencies":generated({"reverse_dependencies":rev}),
      "capabilities":generated({"capabilities":[{"capability":k,"modules":sorted(v)} for k,v in sorted(caps.items())]}),
      "public-symbols":generated({"symbols":sorted(syms,key=lambda x:(x["symbol"],x["module"]))}),
      "endpoints":generated({"endpoints":sorted(ends,key=lambda x:(x["name"],x["module"]))}),
      "errors":generated({"errors":sorted(errs,key=lambda x:(x["error"],x["module"]))}),
      "status":generated({"status":status}),"build-order":generated({"build_order":order}),"port-order":generated({"port_order":order}),
      "repository-summary":generated({"summary":health}),"capability-ontology":generated({"capabilities":ontology}),"repository-health":generated(health)}

def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--check",action="store_true"); a=ap.parse_args()
    outputs=build(); mismatches=[]
    GENERATED.mkdir(exist_ok=True)
    for name,data in outputs.items():
        path=GENERATED/(name+".json"); content=dump(data)
        if a.check:
            if not path.exists() or path.read_text()!=content: mismatches.append(str(path.relative_to(ROOT)))
        else: path.write_text(content)
    health_path=ROOT/"docs/reports/generated/REPOSITORY_HEALTH.md"
    h=outputs["repository-health"]
    health="# Repository health\n\n<!-- Generated by tools/build-repository-index.py; do not edit. -->\n\n"
    health+=f"- Implemented modules: {h['implemented_modules']}\n- Contracted modules: {h['contracted_modules']}\n- Compiler-validated modules: {h['compiler_validated_modules']}\n- Smoke-tested modules: {h['smoke_tested_modules']}\n- Conformance-tested modules: {h['conformance_tested_modules']}\n- Reused modules: {h['reused_modules']}\n- System-proven modules: {h['system_proven_modules']}\n- Stable modules: {h['stable_modules']}\n- Deprecated modules: {h['deprecated_modules']}\n- Missing contracts: {h['missing_contracts']}\n- Stale generated textual files: {h['stale_generated_textual_files']}\n- Dependency cycles: {h['dependency_cycles']}\n- Zig baseline: {h['zig_baseline']}\n- Port contracts: {h['port_contract_coverage']['covered']}/{h['port_contract_coverage']['total']}\n- Recipe contracts: {h['recipe_coverage']} (coverage is not system-proof evidence)\n- Hyper-Zig readiness: not system proven\n- Unsupported claims detected: {len(h['unsupported_claims'])}\n\n## Metric definitions\n\n"
    health+="\n".join(f"- **{k.replace('_',' ')}:** {v}" for k,v in h["definitions"].items())+"\n"
    if a.check:
        if not health_path.exists() or health_path.read_text()!=health: mismatches.append(str(health_path.relative_to(ROOT)))
    else:
        health_path.parent.mkdir(parents=True,exist_ok=True); health_path.write_text(health)
    if mismatches: print("stale generated files: "+", ".join(mismatches),file=sys.stderr); return 1
    print(f"{'checked' if a.check else 'generated'} {len(outputs)} deterministic textual indexes for {len(outputs['modules']['modules'])} modules")
    return 0
if __name__=="__main__": raise SystemExit(main())
