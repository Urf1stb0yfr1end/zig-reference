#!/usr/bin/env python3
"""Prove the bounded Batch 20 U-mode ECALL service/return boundary."""
import importlib.util, re, shutil, subprocess, sys, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND="python3 tools/verify-freestanding-riscv64-ecall-return.py"; TIMEOUT=15
BEGIN=b"ZIGREF_ECALL_RETURN_BEGIN"; END=b"ZIGREF_ECALL_RETURN_END"; RETURNED=b"ZIGREF_ECALL_RETURN_RETURNED"
def load(name,path):
 s=importlib.util.spec_from_file_location(name,ROOT/path); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
prior=load("batch19", "tools/verify-freestanding-riscv64-umode-round-trip.py")
def run(c,timeout=None): return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=timeout).stdout
def fixed(v,n):
 if not re.fullmatch(r"[0-9a-f]{16}",v): raise RuntimeError(f"{n} is not fixed hexadecimal evidence")
 return int(v,16)
def symbols(elf):
 out=run(["readelf","-sW",str(elf)]).decode(); wanted=["userServiceProbeTemplateBegin","userServiceProbeServiceEcall","userServiceProbeAfterService","userServiceProbeTerminalEcall","userServiceProbeTemplateEnd","supervisorTrapEntry","userServiceTrapEntry"]
 result={}
 for line in out.splitlines():
  p=line.split()
  if len(p)>=8 and p[-1] in wanted: result[p[-1]]=int(p[1],16)
 if set(result)!=set(wanted): raise RuntimeError("Batch 20 ELF symbols missing")
 return result
def parse(raw, elf=None):
 if any(raw.count(x)!=1 for x in (BEGIN,END,RETURNED)): raise RuntimeError("requires exactly one Batch 20 frame")
 if not raw.find(prior.RETURNED)<raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b"ZIGREF_MORPHIC_BEGIN"): raise RuntimeError("Batch 20 ordering contradiction")
 old=prior.parse(raw)
 body=raw.split(BEGIN,1)[1].split(END,1)[0].strip().decode("ascii"); h={}
 for line in body.splitlines():
  k,sep,v=line.partition("=")
  if not sep or k in h: raise RuntimeError("malformed or duplicate Batch 20 evidence")
  h[k]=v
 required={"page_size","satp_before","satp_after","root_physical","page_table_count_before","page_table_count_after","physical_allocated_before","physical_allocated_after","user_code_va","user_code_pa","user_stack_va","user_stack_pa","user_stack_top","template_begin","service_ecall","after_service","terminal_ecall","template_end","template_size","translation_change","sfence_vma","fence_i","stvec_before","trap_stvec","trap_stack_begin","trap_stack_end","first_trap_frame","second_trap_frame","first_scause","first_sepc","first_sstatus","first_user_sp","first_a0","first_a1","service_result","prepared_sepc","prepared_spp","prepared_sie","prepared_spie","prepared_sum","return_to_user_count","second_scause","second_sepc","second_sstatus","second_user_sp","user_observed_result","post_return_sentinel","terminal_marker","terminal_to_supervisor_count","trap_count","supervisor_resume","stvec_after","sscratch_after","final_u_leaves","final_wx_leaves","final_leaf_count","complete"}
 if set(h)!=required: raise RuntimeError(f"Batch 20 header set drift: {sorted(set(h)^required)}")
 if h["translation_change"]!="none" or h["sfence_vma"]!="not-required-no-pte-change" or h["fence_i"]!="local-hart-executed": raise RuntimeError("instruction/translation synchronization contradiction")
 nums={k:fixed(v,k) for k,v in h.items() if re.fullmatch(r"[0-9a-f]{16}",v)}
 if nums["satp_before"]!=nums["satp_after"] or nums["root_physical"]!=old["root"]: raise RuntimeError("satp/root drift")
 if nums["page_table_count_before"]!=nums["page_table_count_after"] or nums["physical_allocated_before"]!=nums["physical_allocated_after"]: raise RuntimeError("frame allocation growth")
 if (nums["user_code_va"],nums["user_stack_va"],nums["user_stack_top"])!=(0x80401000,0x80402000,0x80403000): raise RuntimeError("user layout drift")
 if elf:
  seq=[elf[x] for x in ("userServiceProbeTemplateBegin","userServiceProbeServiceEcall","userServiceProbeAfterService","userServiceProbeTerminalEcall","userServiceProbeTemplateEnd")]
  if seq!=[nums[x] for x in ("template_begin","service_ecall","after_service","terminal_ecall","template_end")] or not all(a<b for a,b in zip(seq,seq[1:])): raise RuntimeError("runtime template symbols disagree with ELF")
  if nums["stvec_before"]!=elf["supervisorTrapEntry"] or nums["trap_stvec"]!=elf["userServiceTrapEntry"]: raise RuntimeError("trap vectors disagree with ELF")
 else: seq=[nums[x] for x in ("template_begin","service_ecall","after_service","terminal_ecall","template_end")]
 expected=[nums["user_code_va"]+x-seq[0] for x in seq[1:4]]
 if [nums["first_sepc"],nums["prepared_sepc"],nums["second_sepc"]]!=expected: raise RuntimeError("ELF-derived ECALL/resume PC contradiction")
 if nums["first_scause"]!=8 or nums["second_scause"]!=8 or nums["first_sstatus"]&0x100 or nums["second_sstatus"]&0x100: raise RuntimeError("trap was not synchronous U-origin ECALL")
 b,e=nums["trap_stack_begin"],nums["trap_stack_end"]
 if any(not(b<=nums[k] and nums[k]+288<=e) for k in ("first_trap_frame","second_trap_frame")) or nums["first_trap_frame"]!=nums["second_trap_frame"]: raise RuntimeError("trusted rearmed trap-stack contradiction")
 if not(nums["user_stack_va"]<=nums["first_user_sp"]<nums["user_stack_top"]) or nums["first_user_sp"]!=nums["second_user_sp"]: raise RuntimeError("user stack contradiction")
 if (nums["first_a0"],nums["first_a1"],nums["service_result"],nums["user_observed_result"],nums["post_return_sentinel"],nums["terminal_marker"])!=(0x20,0x19,0x39,0x39,0x2020,0x20ee): raise RuntimeError("service/post-return evidence contradiction")
 if any(nums[k]!=v for k,v in {"return_to_user_count":1,"terminal_to_supervisor_count":1,"trap_count":2,"final_u_leaves":2,"final_wx_leaves":0}.items()): raise RuntimeError("count or leaf policy contradiction")
 if nums["stvec_after"]!=nums["stvec_before"] or nums["sscratch_after"]!=0: raise RuntimeError("CSR restoration contradiction")
 if any(h[k]!="0" for k in ("prepared_spp","prepared_sie","prepared_spie","prepared_sum")) or h["supervisor_resume"]!="PASS" or h["complete"]!="PASS": raise RuntimeError("unsafe return policy or incomplete proof")
 return nums
def self_test():
 with tempfile.TemporaryDirectory() as d:
  subprocess.run(["zig","build","install-freestanding-riscv64-morphic-runtime","--prefix",d],cwd=ROOT,check=True); elf=Path(d)/"bin/morphic-freestanding-riscv64"; q=shutil.which("qemu-system-riscv64"); raw=run([q,"-machine","virt","-nographic","-bios","default","-kernel",str(elf)],TIMEOUT); truth=symbols(elf); parse(raw,truth)
  for old,new in [(b"trap_count=0000000000000002",b"trap_count=0000000000000003"),(b"first_scause=0000000000000008",b"first_scause=0000000000000009"),(b"user_observed_result=0000000000000039",b"user_observed_result=0000000000000038"),(BEGIN,b"")]:
   try: parse(raw.replace(old,new,1),truth)
   except RuntimeError: pass
   else: raise AssertionError("contradictory Batch 20 evidence accepted")
 print("PASS: bounded ECALL service return, ELF PCs, trusted stack, CSR/frame/leaf rejection paths")
def main():
 if sys.argv[1:]==["--self-test"]: self_test(); return 0
 if sys.argv[1:]: return 2
 q=shutil.which("qemu-system-riscv64")
 try:
  with tempfile.TemporaryDirectory() as d:
   print("phase: build ELF and inspect Batch 20 symbols",flush=True); subprocess.run(["zig","build","install-freestanding-riscv64-morphic-runtime","--prefix",d],cwd=ROOT,check=True); elf=Path(d)/"bin/morphic-freestanding-riscv64"; truth=symbols(elf)
   native=[run(["zig","build","run-hosted-morphic-runtime"]) for _ in range(2)]; fake=[run(["zig","build","run-fake-morphic-runtime"]) for _ in range(2)]; cmd=[q,"-machine","virt","-nographic","-bios","default","-kernel",str(elf)]; raws=[run(cmd,TIMEOUT) for _ in range(2)]; records=[parse(x,truth) for x in raws]; payload=[prior.perm.morphic.extract(x) for x in raws]
   if not(native[0]==native[1]==fake[0]==fake[1]==payload[0]==payload[1]) or len(payload[0])!=765: raise RuntimeError("765-byte Morphic equality drift")
   print(f"result: PASS: runs=2 traps=2 frames=0x{records[0]['first_trap_frame']:x} U=2 W+X=0 Morphic=765",flush=True)
 except Exception as e: print(f"ecall-return-lab: FAIL: {e}",file=sys.stderr); return 1
 return subprocess.call([sys.executable,"tools/developer-minimus.py","--command",COMMAND,"--status","PASS","--summary","bounded U-mode ECALL service returns once to U-mode then terminates through a second ECALL","--location","source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig","--location","report=docs/reports/AGENTIC_SNOWBALL_BATCH_20.md"],cwd=ROOT)
if __name__=="__main__": raise SystemExit(main())
