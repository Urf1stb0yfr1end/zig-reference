#!/usr/bin/env python3
import hashlib,importlib.util,os,re,shutil,struct,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND='python3 tools/verify-freestanding-riscv64-userspace-elf.py'; BEGIN=b'ZIGREF_USERSPACE_ELF_BEGIN\n'; END=b'ZIGREF_USERSPACE_ELF_END\n'; RETURNED=b'ZIGREF_USERSPACE_ELF_RETURNED\n'; TIMEOUT=300
s=importlib.util.spec_from_file_location('prior',ROOT/'tools/verify-freestanding-riscv64-user-memory-transfer.py');prior=importlib.util.module_from_spec(s);s.loader.exec_module(prior)
def run(c,t=None):return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=t).stdout
def fnv(b):
 v=0xcbf29ce484222325
 for x in b:v=((v^x)*0x100000001b3)&0xffffffffffffffff
 return v
def elf(path):
 b=path.read_bytes()
 if len(b)<64 or b[:7]!=b'\x7fELF\x02\x01\x01':raise RuntimeError('guest ELF identity')
 typ,mach=struct.unpack_from('<HH',b,16);entry,phoff=struct.unpack_from('<QQ',b,24);eh,pe,pn=struct.unpack_from('<HHH',b,52)
 if (typ,mach,eh,pe,pn)!=(2,243,64,56,1):raise RuntimeError('guest ELF shape')
 if phoff+56>len(b):raise RuntimeError('program header bounds')
 pt,flags,off,va,pa,fs,ms,align=struct.unpack_from('<IIQQQQQQ',b,phoff)
 if (pt,flags,va,pa,fs,ms,align)!=(1,5,0x80401000,0x80401000,fs,fs,0x1000) or not(off+fs<=len(b)) or not(va<=entry<va+ms):raise RuntimeError('PT_LOAD policy')
 src=b[off:off+fs]; sites=[i for i in range(0,len(src)-3,2) if src[i:i+4]==b'\x73\x00\x00\x00']
 if len(sites)!=1:raise RuntimeError('unique ECALL')
 return {'bytes':len(b),'full':fnv(b),'entry':entry,'off':off,'va':va,'fs':fs,'ms':ms,'align':align,'source':fnv(src),'ecall':va+sites[0]}
def fields(raw):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1 or raw.count(RETURNED)!=1 or not(raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b'ZIGREF_MORPHIC_BEGIN')):raise RuntimeError('Batch 22B framing')
 body=raw[raw.find(BEGIN)+len(BEGIN):raw.find(END)];d={}
 for line in body.splitlines():
  if b'=' not in line:raise RuntimeError('malformed evidence')
  k,v=line.decode().split('=',1)
  if k in d:raise RuntimeError('duplicate evidence')
  d[k]=v
 return d
def num(d,k):
 if k not in d or not re.fullmatch('[0-9a-f]{16}',d[k]):raise RuntimeError('malformed '+k)
 return int(d[k],16)
def parse(raw,t,ktruth):
 prior.parse(raw,ktruth);d=fields(raw)
 expected={'artifact':'userspace-elf-rv64','permissions':'R-X','translation_change':'none','sfence_vma':'not-required-no-pte-change','fence_i':'local-hart-executed','supervisor_resume':'PASS','complete':'PASS'}
 if any(d.get(k)!=v for k,v in expected.items()):raise RuntimeError('policy evidence')
 pairs={'artifact_bytes':t['bytes'],'artifact_fnv1a64':t['full'],'source_start':t['off'],'source_end':t['off']+t['fs'],'entry':t['entry'],'prepared_entry':t['entry'],'memory_start':t['va'],'destination_va':t['va'],'memory_end':t['va']+t['ms'],'file_bytes':t['fs'],'memory_bytes':t['ms'],'copied_bytes':t['fs'],'zero_fill':0,'alignment':t['align'],'source_fnv1a64':t['source'],'loaded_fnv1a64':t['source'],'segment_count':1,'trap_cause':8,'trap_sepc':t['ecall'],'marker_a0':0x22b0,'marker_t0':0x22b1,'marker_t1':0x22b2,'user_leaf_count':2,'wx_leaf_count':0}
 if any(num(d,k)!=v for k,v in pairs.items()):raise RuntimeError('artifact-plan-load-entry-trap contradiction')
 for a,b in [('physical_allocated_before','physical_allocated_after'),('page_table_count_before','page_table_count_after'),('satp_before','satp_after')]:
  if num(d,a)!=num(d,b):raise RuntimeError('resource conservation')
 if num(d,'destination_pa')!=num(d,'user_code_pa') or num(d,'trap_frame')==0:raise RuntimeError('destination/trusted frame')
 code=num(d,'code_pte');stack=num(d,'stack_pte')
 if code&0x16!=0x12 or stack&0x16!=0x16 or stack&8 or code&4:raise RuntimeError('PTE permissions')
 return d
def reject(raw,t,k,a,b):
 try:parse(raw.replace(a,b,1),t,k)
 except RuntimeError:return
 raise AssertionError('mutation accepted')
def fixture():
 p=tempfile.TemporaryDirectory();run(['zig','build','install-userspace-rv64-elf','install-freestanding-riscv64-morphic-runtime','--prefix',p.name],150);g=Path(p.name)/'bin/userspace-elf-rv64';k=Path(p.name)/'bin/morphic-freestanding-riscv64';q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 return p,g,k,elf(g),prior.elf_truth(k),run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(k)],TIMEOUT)
def selftest():
 p,g,k,t,kt,raw=fixture();d=parse(raw,t,kt)
 muts=[(BEGIN,b'BAD\n'),(b'artifact_fnv1a64='+d['artifact_fnv1a64'].encode(),b'artifact_fnv1a64=0000000000000000'),(b'entry='+d['entry'].encode(),b'entry=0000000080401002'),(b'source_start='+d['source_start'].encode(),b'source_start=0000000000000000'),(b'destination_va='+d['destination_va'].encode(),b'destination_va=0000000080402000'),(b'permissions=R-X',b'permissions=RWX'),(b'loaded_fnv1a64='+d['loaded_fnv1a64'].encode(),b'loaded_fnv1a64=0000000000000000'),(b'prepared_entry='+d['prepared_entry'].encode(),b'prepared_entry=0000000080401002'),(b'fence_i=local-hart-executed',b'fence_i=missing'),(b'sfence_vma=not-required-no-pte-change',b'sfence_vma=global'),(b'trap_cause=0000000000000008',b'trap_cause=0000000000000009'),(b'marker_a0=00000000000022b0',b'marker_a0=00000000000022b1'),(b'physical_allocated_after='+d['physical_allocated_after'].encode(),b'physical_allocated_after=0000000000000008'),(b'wx_leaf_count=0000000000000000',b'wx_leaf_count=0000000000000001')]
 for a,b in muts:reject(raw,t,kt,a,b)
 p.cleanup();print('PASS: Batch 22B strict relationship mutations rejected')
def handoff(status,summary,failure=None,next=None):
 a=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',status,'--summary',summary,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-userspace-elf.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_22B.md']
 if failure:a+=['--failure',failure]
 if next or failure:a+=['--next',next or COMMAND]
 subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:] not in ([],['--self-test']):handoff('FAIL','invocation rejected','unsupported arguments');return 2
 try:
  if sys.argv[1:]:selftest();summary='fixture=1 decisive relationship mutations=rejected'
  else:
   p,g,k,t,kt,a=fixture();q=shutil.which('qemu-system-riscv64');b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(k)],TIMEOUT);parse(a,t,kt);parse(b,t,kt);native=run(['zig','build','run-hosted-morphic-runtime']);fake=run(['zig','build','run-fake-morphic-runtime']);payload=[prior.prior.prior.perm.morphic.extract(x) for x in (a,b)]
   if not(native==fake==payload[0]==payload[1]):raise RuntimeError('Morphic equality drift')
   print(f"PASS: Batch 22B runs=2 entry=0x{t['entry']:x} PT_LOAD={t['fs']} marker=22b0/22b1/22b2 U-ECALL=8 U=2 W+X=0 Morphic={len(native)}");summary=f"runs=2 entry=0x{t['entry']:x} PT_LOAD={t['fs']} U=2 W+X=0 Morphic={len(native)}";p.cleanup()
 except Exception as e:traceback.print_exc();handoff('FAIL','Batch 22B verification failed',str(e));return getattr(e,'returncode',1)
 handoff('PASS',summary,next=COMMAND if sys.argv[1:] else 'python3 tools/developer-command.py validate-repository');return 0
if __name__=='__main__':raise SystemExit(main())
