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
 assert_candidate("stale handle safe bounded object storage","fixed-capacity-object-pool")
 assert_candidate("deterministic bounded graph ordering with cycle detection","fixed-capacity-topological-sort")
 assert_candidate("exact bounded resource budget with deterministic initialization ordering","bounded-system-resource-plan")
 assert_candidate("fixed capacity deterministic normalized event recording with no timestamps or hidden allocation","bounded-deterministic-event-trace")
 _,d=run("compose","bounded-task-storage","bounded-priority-ordering","bounded-deterministic-event-tracing","fixed-memory-operation","bounded-deterministic-scheduling")
 assert {"bounded-system-resource-plan","fixed-capacity-priority-queue","bounded-deterministic-event-trace","fixed-bump-allocator"} <= set(d["results"]["solved_modules"]),d
 assert "bounded-deterministic-scheduling" in d["results"]["missing_capabilities"]
 _,d=run("diagnostic","ZIGREF-TOPO-CYCLE"); assert d["results"][0]["repair_strategy"]
 _,d=run("impact","fixed-capacity-vector"); assert d["results"]["direct_dependents"]
 index=ROOT/"generated/agent/modules.json"; original=index.read_text(); index.write_text(original+" ")
 try:
  p=subprocess.run([sys.executable,"tools/build-agent-index.py","--check"],cwd=ROOT,capture_output=True,text=True); assert p.returncode and "ZIGREF-INDEX-STALE" in p.stderr
 finally: index.write_text(original)
 print("PASS: zero-context bootstrap, selection/rejection, cards, composition/missing capability, repair, impact, drift, and determinism")
if __name__=="__main__": main()
