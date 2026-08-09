#!/usr/bin/env python3
"""Strict Batch 21B real U-mode copy-IN proof."""
import importlib.util, re, shutil, subprocess, sys, tempfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; BEGIN=b"ZIGREF_USER_COPY_IN_BEGIN"; END=b"ZIGREF_USER_COPY_IN_END"; RETURNED=b"ZIGREF_USER_COPY_IN_RETURNED"; PAGE=4096; TIMEOUT=20
spec=importlib.util.spec_from_file_location("batch20", ROOT/"tools/verify-freestanding-riscv64-ecall-return.py"); prior=importlib.util.module_from_spec(spec); spec.loader.exec_module(prior)
def run(c,t=None): return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=t).stdout
def elf_truth(path):
 out=run(["readelf","-sW",str(path)]).decode(); names=("userCopyInProbeTemplateBegin","userCopyInProbeServiceEcall","userCopyInProbeAfterService","userCopyInProbeTerminalEcall","userCopyInProbeTemplateEnd")
 found={}
 for line in out.splitlines():
  p=line.split()
  if len(p)>=2 and p[-1] in names: found[p[-1]]=int(p[1],16)
 if set(found)!=set(names): raise RuntimeError("Batch 21B ELF symbols missing")
 return found
def fields(raw):
 body=raw.split(BEGIN,1)[1].split(END,1)[0].strip(); d={}
 for line in body.splitlines():
  if b"=" not in line: continue
  k,v=line.split(b"=",1); k=k.decode(); v=v.decode()
  if k in d: raise RuntimeError("duplicate evidence field")
  d[k]=v
 return d
def hx(d,k):
 if k not in d or not re.fullmatch(r"[0-9a-f]{16}",d[k]): raise RuntimeError("malformed "+k)
 return int(d[k],16)
def parse(raw,truth):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1 or raw.count(RETURNED)!=1: raise RuntimeError("wrong Batch 21B framing")
 if not(raw.find(prior.RETURNED)<raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b"ZIGREF_MORPHIC_BEGIN")): raise RuntimeError("wrong Batch 21B order")
 old=prior.parse(raw, None); d=fields(raw)
 numeric=("user_code_va user_code_pa user_stack_va user_stack_pa satp_before satp_after root_physical physical_allocated_before physical_allocated_after page_table_count_before page_table_count_after template_begin service_ecall after_service terminal_ecall template_end payload_va payload_length segment_count segment_va segment_pa segment_request_offset segment_byte_count segment_coverage copied_length trap_count first_frame second_frame first_scause first_sepc first_sstatus second_scause second_sepc second_sstatus prepared_sstatus service_result post_return_marker terminal_marker return_count terminal_count stvec_after sscratch_after").split()
 n={k:hx(d,k) for k in numeric}
 if (n['user_code_va'],n['user_stack_va'])!=(0x80401000,0x80402000) or (n['user_code_pa'],n['user_stack_pa'])!=(int(old['headers']['user_code_pa'],16),int(old['headers']['user_stack_pa'],16)): raise RuntimeError("user frame drift")
 if n['satp_before']!=n['satp_after'] or n['root_physical']!=old['root'] or n['physical_allocated_before']!=n['physical_allocated_after'] or n['page_table_count_before']!=n['page_table_count_after']: raise RuntimeError("allocation, page-table, satp, or root drift")
 syms=[truth[k] for k in ("userCopyInProbeTemplateBegin","userCopyInProbeServiceEcall","userCopyInProbeAfterService","userCopyInProbeTerminalEcall","userCopyInProbeTemplateEnd")]
 if [n[k] for k in ('template_begin','service_ecall','after_service','terminal_ecall','template_end')]!=syms or not all(a<b for a,b in zip(syms,syms[1:])): raise RuntimeError("ELF-derived symbol contradiction")
 pcs=[0x80401000+x-syms[0] for x in syms[1:4]]
 if [n['first_sepc'],0x80401000+syms[2]-syms[0],n['second_sepc']]!=pcs: raise RuntimeError("ELF-derived PC contradiction")
 if n['trap_count']!=2 or n['first_scause']!=8 or n['second_scause']!=8 or n['first_sstatus']&(0x100|0x40000) or n['second_sstatus']&(0x100|0x40000) or n['prepared_sstatus']&(0x100|0x40000): raise RuntimeError("trap origin/cause/SUM contradiction")
 expected_pa=n['user_stack_pa']+PAGE-48
 if (n['payload_va'],n['payload_length'])!=(0x80403000-48,16) or (n['segment_count'],n['segment_va'],n['segment_pa'],n['segment_request_offset'],n['segment_byte_count'],n['segment_coverage'])!=(1,n['payload_va'],expected_pa,0,16,16): raise RuntimeError("planner segment contradiction")
 if d.get('copied_hex')!='7a69672d757365722d6d656d6f727921' or n['copied_length']!=16 or d.get('scratch_tail')!='poison-preserved': raise RuntimeError("copy or poison contradiction")
 if (n['service_result'],n['post_return_marker'],n['terminal_marker'],n['return_count'],n['terminal_count'])!=(0x21b,0x21c0,0x21ee,1,1): raise RuntimeError("return marker contradiction")
 if n['first_frame']!=n['second_frame'] or n['stvec_after']!=int(old['headers']['stvec_before'],16) or n['sscratch_after']!=0: raise RuntimeError("trap stack or CSR restoration contradiction")
 if d.get('translation_change')!='none' or d.get('sfence_vma')!='not-required-no-pte-change' or d.get('fence_i')!='local-hart-executed' or d.get('sum')!='observed-zero' or d.get('complete')!='PASS': raise RuntimeError("policy evidence contradiction")
 return d
def reject(raw,truth,old,new):
 bad=raw.replace(old,new,1)
 try: parse(bad,truth)
 except RuntimeError:return
 raise AssertionError("mutation accepted: "+repr(old))
def self_test():
 with tempfile.TemporaryDirectory() as p:
  subprocess.run(["zig","build","install-freestanding-riscv64-morphic-runtime","--prefix",p],cwd=ROOT,check=True); art=Path(p)/"bin/morphic-freestanding-riscv64"; truth=elf_truth(art); q=shutil.which("qemu-system-riscv64")
  if not q: raise RuntimeError("qemu-system-riscv64 required")
  raw=run([q,"-machine","virt","-nographic","-bios","default","-kernel",str(art)],TIMEOUT); d=parse(raw,truth)
  muts=[(BEGIN,b"BAD"),(RETURNED,b"BAD"),(b"trap_count=0000000000000002",b"trap_count=0000000000000003"),(b"first_scause=0000000000000008",b"first_scause=0000000000000009"),(b"payload_length=0000000000000010",b"payload_length=000000000000000f"),(b"segment_count=0000000000000001",b"segment_count=0000000000000002"),(b"segment_request_offset=0000000000000000",b"segment_request_offset=0000000000000001"),(b"segment_byte_count=0000000000000010",b"segment_byte_count=000000000000000f"),(b"copied_hex=7a69672d757365722d6d656d6f727921",b"copied_hex=0069672d757365722d6d656d6f727921"),(b"copied_length=0000000000000010",b"copied_length=0000000000000011"),(b"scratch_tail=poison-preserved",b"scratch_tail=modified"),(b"service_result=000000000000021b",b"service_result=0000000000000000"),(b"post_return_marker=00000000000021c0",b"post_return_marker=0000000000000000"),(b"terminal_marker=00000000000021ee",b"terminal_marker=0000000000000000"),(b"sscratch_after=0000000000000000",b"sscratch_after=0000000000000001"),(b"fence_i=local-hart-executed",b"fence_i=missing"),(b"sfence_vma=not-required-no-pte-change",b"sfence_vma=global-executed")]
  for a,b in muts: reject(raw,truth,a,b)
 print("PASS: Batch 21B strict rejection matrix")
def main():
 if sys.argv[1:]==['--self-test']: self_test(); return 0
 if sys.argv[1:]: return 2
 q=shutil.which('qemu-system-riscv64')
 if not q: raise RuntimeError('qemu-system-riscv64 required')
 with tempfile.TemporaryDirectory() as p:
  subprocess.run(['zig','build','install-freestanding-riscv64-morphic-runtime','--prefix',p],cwd=ROOT,check=True); art=Path(p)/'bin/morphic-freestanding-riscv64'; truth=elf_truth(art); cmd=[q,'-machine','virt','-nographic','-bios','default','-kernel',str(art)]; raws=[run(cmd,TIMEOUT) for _ in range(2)]; [parse(x,truth) for x in raws]; native=run(['zig','build','run-hosted-morphic-runtime']); fake=run(['zig','build','run-fake-morphic-runtime']); payload=[prior.perm.morphic.extract(x) for x in raws]
  if not(native==fake==payload[0]==payload[1]) or len(native)!=765: raise RuntimeError('Morphic equality drift')
 print('PASS: Batch 21B runs=2 traps=2 U=2 W+X=0 Morphic=765')
 return 0
if __name__=='__main__': raise SystemExit(main())
