#!/usr/bin/env python3
"""Deterministic zero-context acceptance coverage for Agent Fast Path v2."""
import json, subprocess, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
QUERY=[sys.executable,"tools/query-reference.py","agent"]
def run(*args, ok=True):
 p=subprocess.run(QUERY+list(args),cwd=ROOT,capture_output=True,text=True,timeout=30)
 if ok and p.returncode: raise RuntimeError(f"{args}: {p.stderr}{p.stdout}")
 return p,json.loads(p.stdout)
def assert_candidate(text,module):
 _,d=run("decide",text); assert d["results"]["candidates"][0]["module"]==module,d

def main():
 for args in [("bootstrap",),("card","fixed-bump-allocator","--view","select"),("card","fixed-bump-allocator","--view","integrate"),("impact","fixed-capacity-vector"),("diagnostic","ZIGREF-TOPO-CYCLE")]:
  a=run(*args)[0].stdout; b=run(*args)[0].stdout; assert a==b,args
 assert_candidate("aligned allocation from caller-owned fixed memory with no hidden heap","fixed-bump-allocator")
 _,d=run("decide","arbitrary independent deallocation"); assert any(x["module"]=="fixed-bump-allocator" for x in d["results"]["rejected"])
 # Batch 03 semantic regressions: borrowed DynamicArray views and the functional Sv39 PTE entry point.
 _,d=run("card","dynamic-array","--view","integrate")
 borrows=d["results"]["borrowing"]["borrows"]
 assert any("items()" in x and "mutable" in x for x in borrows),d
 assert any("constItems()" in x and "immutable" in x for x in borrows),d
 assert "capacity growth or deinit" in d["results"]["invalidation"],d
 _,d=run("card","riscv-sv39-page-table-entry","--view","integrate")
 assert d["results"]["construction"]["primary_symbol"]=="Entry",d
 assert "Entry.decode" in d["results"]["construction"]["initialization"],d
 assert d["results"]["construction"]["primary_symbol"]!="DecodeError",d
 batch04=("ring-buffer","stack","state-machine","nonzero-integer","saturating-counter","wrapping-sequence-number","optional-typed-handle","unit-safe-quantity","validated-ascii-byte","fourcc-code")
 for module in batch04:
  _,card=run("card",module,"--view","integrate"); result=card["results"]
  assert result["construction"]["primary_symbol"]
  guidance="\n".join([result["construction"]["initialization"],*result["minimal_usage"]])
  assert guidance.strip() and "std.testing.refAllDeclsRecursive" not in guidance
 _,stack=run("card","stack","--view","all"); stack=stack["results"]
 assert stack["resource_profile"]["storage_model"]=="caller_owned" and not stack["resource_profile"]["bounded"]
 assert stack["ownership"]["cleanup"]=="caller"
 _,ring=run("card","ring-buffer","--view","integrate"); assert ring["results"]["error_map"][0]["operation"]=="push"
 _,machine=run("card","state-machine","--view","integrate"); assert machine["results"]["error_map"][0]["operation"]=="apply"
 assert_candidate("stale handle safe bounded object storage","fixed-capacity-object-pool")
 assert_candidate("deterministic bounded graph ordering with cycle detection","fixed-capacity-topological-sort")
 assert_candidate("exact bounded resource budget with deterministic initialization ordering","bounded-system-resource-plan")
 assert_candidate("fixed capacity deterministic normalized event recording with no timestamps or hidden allocation","bounded-deterministic-event-trace")
 _,d=run("compose","bounded-task-storage","bounded-priority-ordering","bounded-deterministic-event-tracing","fixed-memory-operation","bounded-deterministic-scheduling")
 assert {"bounded-system-resource-plan","fixed-capacity-priority-queue","bounded-deterministic-event-trace","fixed-bump-allocator","bounded-deterministic-scheduler"} <= set(d["results"]["solved_modules"]),d
 assert "bounded-deterministic-scheduling" not in d["results"]["missing_capabilities"]
 _,d=run("diagnostic","ZIGREF-TOPO-CYCLE"); assert d["results"][0]["repair_strategy"]
 _,d=run("diagnostic","ZIGREF-TOPOLOGICAL-CYCLE"); assert d["results"][0]["canonical_id"]=="ZIGREF-TOPO-CYCLE"
 diagnostic=d["results"][0]
 for key in ("meaning","module","operation","violated_rule","repair_strategy","misuse_fixture","focused_validation_command","locations"): assert diagnostic[key],key
 _,d=run("diagnose","error.Cycle"); assert d["results"][0]["code"]=="ZIGREF-TOPO-CYCLE" and "native_error_alias" in d["results"][0]["matched_by"]
 _,d=run("diagnose","cycle detected"); assert d["results"] and len(d["results"])<=5
 _,d=run("diagnose","snowball-unknown-native-symptom"); assert d["status"]=="unknown" and not d["results"]
 final_modules=("semantic-version","tagged-result","source-span","owned-byte-buffer","intrusive-doubly-linked-list")
 for module in final_modules:
  _,card=run("card",module,"--view","integrate"); guidance="\n".join([card["results"]["construction"]["initialization"],*card["results"]["minimal_usage"]])
  assert "std.testing.refAllDeclsRecursive" not in guidance
 _,d=run("impact","fixed-capacity-vector"); assert d["results"]["direct_dependents"]
 index=ROOT/"generated/agent/modules.json"; original=index.read_text(); index.write_text(original+" ")
 try:
  p=subprocess.run([sys.executable,"tools/build-agent-index.py","--check"],cwd=ROOT,capture_output=True,text=True); assert p.returncode and "ZIGREF-INDEX-STALE" in p.stderr
 finally: index.write_text(original)
 print("PASS: zero-context bootstrap, selection/rejection, cards, composition/missing capability, repair, impact, drift, and determinism")
if __name__=="__main__": main()
