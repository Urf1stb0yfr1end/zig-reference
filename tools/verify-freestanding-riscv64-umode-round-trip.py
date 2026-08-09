#!/usr/bin/env python3
"""Prove one bounded Sv39 S-to-U-to-S round trip on two real machines."""
import importlib.util, re, shutil, subprocess, sys, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND="python3 tools/verify-freestanding-riscv64-umode-round-trip.py"; TIMEOUT=15; PAGE=4096
BEGIN=b"ZIGREF_UMODE_BEGIN"; END=b"ZIGREF_UMODE_END"; RETURNED=b"ZIGREF_UMODE_RETURNED"
def load(name,path):
 s=importlib.util.spec_from_file_location(name,ROOT/path); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
perm=load("umode_permissions","tools/verify-freestanding-riscv64-sv39-permissions.py")
def fixed(v,n):
 if not re.fullmatch(r"[0-9a-f]{16}",v): raise RuntimeError(f"{n} is not fixed hexadecimal evidence")
 return int(v,16)
def parse(raw, symbols=None, domains=None, pool=None):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1 or raw.count(RETURNED)!=1: raise RuntimeError("requires exactly one U-mode frame and return marker")
 if not (raw.find(perm.RETURNED)<raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b"ZIGREF_MORPHIC_BEGIN")): raise RuntimeError("Batch 19 ordering contradicts Batch 18 or Morphic")
 prior=perm.parse(raw,domains,pool)
 body=raw.split(BEGIN,1)[1].split(END,1)[0].strip().decode("ascii")
 h={}; rows=[]
 for line in body.splitlines():
  f=dict(item.split("=",1) for item in line.split(","))
  if "leaf_va" in f: rows.append(f)
  elif len(f)==1:
   k,v=next(iter(f.items()))
   if k in h: raise RuntimeError("duplicate U-mode header")
   h[k]=v
  else: raise RuntimeError("malformed U-mode evidence")
 required={"page_size","satp_before","satp_after","root_physical","page_table_count_before","page_table_count_after","stvec_before","user_stvec","stvec_after","sscratch_after","trap_stack_begin","trap_stack_end","trap_frame","user_code_va","user_code_pa","user_stack_va","user_stack_pa","user_stack_top","template_begin","template_end","template_ecall","expected_ecall","sfence_vma","fence_i","prepared_spp","prepared_sie","prepared_spie","prepared_sum","scause","interrupt","sepc","sstatus","trapped_spp","user_sp","user_a0","user_t0","user_t1","stack_sentinel","supervisor_resume","check_cause","check_sepc","check_frame","leaf_count","complete"}
 if set(h)!=required: raise RuntimeError(f"U-mode header set incomplete or unexpected: {sorted(set(h)^required)}")
 if fixed(h["page_size"],"page_size")!=PAGE or h["sfence_vma"]!="global-executed" or h["fence_i"]!="local-hart-executed": raise RuntimeError("required SFENCE.VMA/FENCE.I boundary missing")
 if fixed(h["satp_before"],"satp_before")!=fixed(h["satp_after"],"satp_after") or fixed(h["root_physical"],"root")!=prior["root"]: raise RuntimeError("satp/root drift")
 if h["page_table_count_before"]!=h["page_table_count_after"] or fixed(h["page_table_count_after"],"tables")!=4: raise RuntimeError("alias L0 subtree was not reused")
 if h["stvec_before"]!=h["stvec_after"] or h["sscratch_after"]!="0000000000000000": raise RuntimeError("supervisor trap state not restored")
 if any(h[k]!="0" for k in ("prepared_spp","prepared_sie","prepared_spie","prepared_sum")): raise RuntimeError("unsafe SRET status policy")
 tb,te,tf=(fixed(h[k],k) for k in ("trap_stack_begin","trap_stack_end","trap_frame"))
 if not tb<=tf or tf+288>te: raise RuntimeError("trap frame outside trusted supervisor trap stack")
 cv,cp,sv,sp,top=(fixed(h[k],k) for k in ("user_code_va","user_code_pa","user_stack_va","user_stack_pa","user_stack_top"))
 if (cv,sv,top)!=(0x80401000,0x80402000,0x80403000) or cp==sp: raise RuntimeError("bounded user layout or frame distinction changed")
 b,e,c=(fixed(h[k],k) for k in ("template_begin","template_end","template_ecall")); expected=cv+c-b
 if not b<c<e or fixed(h["expected_ecall"],"expected_ecall")!=expected or fixed(h["sepc"],"sepc")!=expected: raise RuntimeError("copied-template ECALL sepc contradiction")
 if fixed(h["scause"],"scause")!=8 or h["interrupt"]!="0" or h["trapped_spp"]!="0" or fixed(h["sstatus"],"sstatus")&0x100: raise RuntimeError("trap was not synchronous U-mode ECALL")
 if fixed(h["user_sp"],"user_sp")!=top-16 or (fixed(h["user_a0"],"a0"),fixed(h["user_t0"],"t0"),fixed(h["user_t1"],"t1"),fixed(h["stack_sentinel"],"sentinel"))!=(0x519,0x139,0x139,0x139): raise RuntimeError("user register/stack probe contradiction")
 if h["supervisor_resume"]!="PASS" or h["complete"]!="PASS": raise RuntimeError("supervisor continuation missing")
 if len(rows)!=fixed(h["leaf_count"],"leaf_count"): raise RuntimeError("final leaf count contradiction")
 seen={}; users=0
 for r in rows:
  if set(r)!={"leaf_va","pa","pte","level"}: raise RuntimeError("raw leaf row malformed")
  va,pa,pte,level=(fixed(r[k],k) for k in ("leaf_va","pa","pte","level"))
  if va in seen or level: raise RuntimeError("duplicate or non-L0 leaf")
  if ((pte>>10)&((1<<44)-1))<<12!=pa: raise RuntimeError("PTE PPN/PA contradiction")
  u=bool(pte&16); w=bool(pte&4); x=bool(pte&8); rr=bool(pte&2)
  if w and x: raise RuntimeError("W+X leaf")
  if u: users+=1
  if va==cv and not (u and rr and x and not w): raise RuntimeError("user code is not U RX")
  elif va==sv and not (u and rr and w and not x): raise RuntimeError("user stack is not U RW/NX")
  elif va not in (cv,sv) and u: raise RuntimeError("unexpected kernel/third user leaf")
  seen[va]=(pa,pte)
 if users!=2 or cv not in seen or sv not in seen: raise RuntimeError("exactly two user leaves required")
 if cp in [prior["root"],prior["target"]] or sp in [prior["root"],prior["target"]]: raise RuntimeError("user frame collides with root/alias")
 return {"root":prior["root"],"leaves":len(rows),"code":cv,"stack":sv}
def self_test():
 # Use a real freshly built one-machine transcript, then mutation-test every critical class.
 with tempfile.TemporaryDirectory() as p:
  subprocess.run(["zig","build","install-freestanding-riscv64-morphic-runtime","--prefix",p],cwd=ROOT,check=True)
  q=shutil.which("qemu-system-riscv64")
  if not q: raise RuntimeError("qemu-system-riscv64 required for rejection self-test fixture")
  raw=subprocess.run([q,"-machine","virt","-nographic","-bios","default","-kernel",str(Path(p)/"bin/morphic-freestanding-riscv64")],cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=TIMEOUT).stdout
  parse(raw)
  mutations=[(BEGIN,b""),(b"scause=0000000000000008",b"scause=0000000000000009"),(b"interrupt=0",b"interrupt=1"),(b"trapped_spp=0",b"trapped_spp=1"),(b"fence_i=local-hart-executed",b"fence_i=missing"),(b"page_table_count_after=0000000000000004",b"page_table_count_after=0000000000000005"),(b"supervisor_resume=PASS",b"supervisor_resume=FAIL"),(b"pte=000000002008705b",b"pte=000000002008705f"),(b"pte=00000000200874d7",b"pte=00000000200874df")]
  for old,new in mutations:
   prefix, frame_and_after = raw.split(BEGIN,1)
   bad = raw.replace(old,new,1) if old == BEGIN else prefix + BEGIN + frame_and_after.replace(old,new,1)
   try: parse(bad)
   except RuntimeError: pass
   else: raise AssertionError(f"accepted contradiction {old!r}")
 print("PASS: bounded U-mode framing, ECALL origin/sepc, trusted trap stack, exact U leaves, W^X, fences, continuation, and rejection paths"); return 0
def run(cmd,timeout=None): return subprocess.run(cmd,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=timeout).stdout
def handoff(status,failure=None):
 a=[sys.executable,"tools/developer-minimus.py","--command",COMMAND,"--status",status,"--summary","bounded SRET U-mode ECALL round trip executes on two real RISC-V machines","--location","source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig","--location","contract=recipes/run-hosted-morphic-runtime/recipe.json","--location","report=docs/reports/AGENTIC_SNOWBALL_BATCH_19.md"]
 if failure:a += ["--failure",failure,"--next",COMMAND]
 return subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:]==["--self-test"]: return self_test()
 if sys.argv[1:]: print(f"usage: {COMMAND} [--self-test]",file=sys.stderr); return 2
 q=shutil.which("qemu-system-riscv64")
 if not q: handoff("FAIL","required command is missing: qemu-system-riscv64"); return 1
 try:
  with tempfile.TemporaryDirectory(prefix="zigref-umode-") as p:
   print("phase: build ELF and execute native/fake baselines",flush=True); subprocess.run(["zig","build","install-freestanding-riscv64-morphic-runtime","--prefix",p],cwd=ROOT,check=True)
   native=[run(["zig","build","run-hosted-morphic-runtime"]) for _ in range(2)]; fake=[run(["zig","build","run-fake-morphic-runtime"]) for _ in range(2)]
   cmd=[q,"-machine","virt","-nographic","-bios","default","-kernel",str(Path(p)/"bin/morphic-freestanding-riscv64")]
   print("phase: execute and reject-check two bounded real U-mode machines",flush=True); raw=[run(cmd,TIMEOUT) for _ in range(2)]; records=[parse(x) for x in raw]
   payload=[perm.morphic.extract(x) for x in raw]
   if not(native[0]==native[1]==fake[0]==fake[1]==payload[0]==payload[1]) or len(payload[0])!=765: raise RuntimeError("canonical 765-byte Morphic equality drifted")
   print(f"result: PASS: runs=2 leaves={records[0]['leaves']} U=2 W+X=0 root=0x{records[0]['root']:x}",flush=True); print("result: PASS: scause=8 interrupt=0 SPP=0 exact sepc; trusted stack; SFENCE.VMA+FENCE.I",flush=True)
 except Exception as e: print(f"umode-round-trip-lab: FAIL: {e}",file=sys.stderr); handoff("FAIL",str(e)); return 1
 return handoff("PASS")
if __name__=="__main__": raise SystemExit(main())
