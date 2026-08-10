#!/usr/bin/env python3
import importlib.util,re,shutil,struct,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND='python3 tools/verify-freestanding-riscv64-userspace-elf-data-bss.py'; BEGIN=b'ZIGREF_USERSPACE_ELF_DATA_BSS_BEGIN'; END=b'ZIGREF_USERSPACE_ELF_DATA_BSS_END'; RETURNED=b'ZIGREF_USERSPACE_ELF_DATA_BSS_RETURNED'; TIMEOUT=300
spec=importlib.util.spec_from_file_location('batch22b',ROOT/'tools/verify-freestanding-riscv64-userspace-elf.py'); batch22b=importlib.util.module_from_spec(spec); spec.loader.exec_module(batch22b)
def run(c,t=None): return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=t).stdout
def fnv(b):
 v=0xcbf29ce484222325
 for x in b:v=((v^x)*0x100000001b3)&0xffffffffffffffff
 return v
def elf(path):
 b=path.read_bytes()
 if len(b)<64 or b[:7]!=b'\x7fELF\x02\x01\x01':raise RuntimeError('guest ELF identity')
 typ,mach=struct.unpack_from('<HH',b,16); entry,phoff=struct.unpack_from('<QQ',b,24); eh,pe,pn=struct.unpack_from('<HHH',b,52)
 if (typ,mach,eh,pe,pn)!=(2,243,64,56,2):raise RuntimeError('guest ELF shape')
 seg=[]
 for i in range(2):
  pt,flags,off,va,pa,fs,ms,align=struct.unpack_from('<IIQQQQQQ',b,phoff+i*pe)
  if pt!=1 or off+fs>len(b) or va!=pa:raise RuntimeError('PT_LOAD bounds')
  seg.append({'flags':flags,'off':off,'va':va,'fs':fs,'ms':ms,'align':align,'source':fnv(b[off:off+fs]),'bytes':b[off:off+fs]})
 x,d=seg
 if x['flags']!=5 or x['va']!=0x80401000 or x['fs']!=x['ms'] or x['align']!=0x1000 or not(x['va']<=entry<x['va']+x['ms']):raise RuntimeError('R-X PT_LOAD')
 if d['flags']!=6 or d['va']!=0x80403000 or d['fs']!=8 or d['ms']!=16 or d['align']!=0x1000:raise RuntimeError('RW-/BSS PT_LOAD')
 sites=[i for i in range(0,len(x['bytes'])-3,2) if x['bytes'][i:i+4]==b'\x73\x00\x00\x00']
 if len(sites)!=1:raise RuntimeError('unique ECALL')
 return {'bytes':len(b),'full':fnv(b),'entry':entry,'x':x,'d':d,'ecall':x['va']+sites[0]}
def fields(raw):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1 or raw.count(RETURNED)!=1 or not(raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b'ZIGREF_MORPHIC_BEGIN')):raise RuntimeError('Batch 23 framing')
 body=raw[raw.find(BEGIN)+len(BEGIN):raw.find(END)]; d={}
 for line in body.splitlines():
  if not line:continue
  if b'=' not in line:raise RuntimeError('malformed evidence')
  k,v=line.decode().split('=',1)
  if k in d:raise RuntimeError('duplicate evidence')
  d[k]=v
 return d
def num(d,k):
 if k not in d or not re.fullmatch('[0-9a-f]{16}',d[k]):raise RuntimeError('malformed '+k)
 return int(d[k],16)
def parse(raw,t,ktruth):
 batch22b.parse(raw,t['old'],ktruth)
 d=fields(raw); x=t['x']; w=t['d']
 expected={'artifact':'userspace-elf-rv64-data-bss','permissions':'R-X','data_permissions':'RW-','loaded_bytes_equal':'PASS','data_loaded_bytes_equal':'PASS','bss_zero_before':'PASS','translation_change':'one-user-rw-leaf','sfence_vma':'global-executed','fence_i':'local-hart-executed','supervisor_resume':'PASS','complete':'PASS'}
 if any(d.get(k)!=v for k,v in expected.items()):raise RuntimeError('policy evidence')
 pairs={'artifact_bytes':t['bytes'],'artifact_fnv1a64':t['full'],'segment_count':2,'entry':t['entry'],'prepared_entry':t['entry'],'source_start':x['off'],'source_end':x['off']+x['fs'],'memory_start':x['va'],'memory_end':x['va']+x['ms'],'file_bytes':x['fs'],'memory_bytes':x['ms'],'zero_fill':0,'source_fnv1a64':x['source'],'loaded_fnv1a64':x['source'],'data_source_start':w['off'],'data_source_end':w['off']+w['fs'],'data_memory_start':w['va'],'data_memory_end':w['va']+w['ms'],'data_file_bytes':w['fs'],'data_memory_bytes':w['ms'],'data_zero_fill':w['ms']-w['fs'],'bss_mutation_address':w['va']+w['fs'],'bss_mutation_value':0x23b55a5aa55ac33c,'trap_cause':8,'trap_sepc':t['ecall'],'marker_a0':0x2300,'marker_t0':0x23da7a115eedc0de,'marker_t1':0x23b55a5aa55ac33c,'user_leaf_count':3,'wx_leaf_count':0}
 if any(num(d,k)!=v for k,v in pairs.items()):raise RuntimeError('artifact/plan/data/BSS/trap contradiction')
 if num(d,'physical_allocated_after')!=num(d,'physical_allocated_before')+1 or num(d,'page_table_count_before')!=num(d,'page_table_count_after') or num(d,'satp_before')!=num(d,'satp_after'):raise RuntimeError('resource accounting')
 if num(d,'data_destination_pa')==num(d,'user_code_pa') or num(d,'data_destination_pa')==num(d,'user_stack_pa') or num(d,'trap_frame')==0:raise RuntimeError('physical ownership')
 code=num(d,'code_pte'); stack=num(d,'stack_pte'); data=num(d,'data_pte')
 if code&0x16!=0x12 or code&4 or stack&0x16!=0x16 or stack&8 or data&0x16!=0x16 or data&8:raise RuntimeError('PTE permissions')
 return d
def reject(raw,t,k,a,b):
 try:parse(raw.replace(a,b,1),t,k)
 except RuntimeError:return
 raise AssertionError('mutation accepted')
def fixture():
 p=tempfile.TemporaryDirectory(); run(['zig','build','install-userspace-rv64-elf','install-userspace-rv64-data-bss-elf','install-freestanding-riscv64-morphic-runtime','--prefix',p.name],150)
 old=Path(p.name)/'bin/userspace-elf-rv64'; guest=Path(p.name)/'bin/userspace-elf-rv64-data-bss'; kernel=Path(p.name)/'bin/morphic-freestanding-riscv64'; q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 t=elf(guest); t['old']=batch22b.elf(old); kt=batch22b.prior.elf_truth(kernel); raw=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(kernel)],TIMEOUT)
 return p,t,kt,raw,kernel
def selftest():
 p,t,k,raw,_=fixture(); d=parse(raw,t,k)
 muts=[(BEGIN,b'BAD'),(b'data_loaded_bytes_equal=PASS',b'data_loaded_bytes_equal=FAIL'),(b'bss_zero_before=PASS',b'bss_zero_before=FAIL'),(b'data_permissions=RW-',b'data_permissions=RWX'),(b'bss_mutation_value='+d['bss_mutation_value'].encode(),b'bss_mutation_value=0000000000000000'),(b'trap_sepc='+d['trap_sepc'].encode(),b'trap_sepc=0000000080401000'),(b'physical_allocated_after='+d['physical_allocated_after'].encode(),b'physical_allocated_after='+d['physical_allocated_before'].encode()),(b'data_source_start='+d['data_source_start'].encode(),b'data_source_start=0000000000000000')]
 for a,b in muts:reject(raw,t,k,a,b)
 p.cleanup(); print('PASS: Batch 23 real fixture and decisive relationship mutations rejected')
def handoff(status,summary,failure=None,next=None):
 a=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',status,'--summary',summary,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-data-bss.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-userspace-elf-data-bss.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_23.md']
 if failure:a+=['--failure',failure]
 if next or failure:a+=['--next',next or COMMAND]
 subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:] not in ([],['--self-test']):handoff('FAIL','invocation rejected','unsupported arguments');return 2
 try:
  if sys.argv[1:]:selftest(); summary='fixture=1 writable-data/BSS relationship mutations=rejected'
  else:
   p,t,k,a,kernel=fixture(); q=shutil.which('qemu-system-riscv64'); b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(kernel)],TIMEOUT); parse(a,t,k);parse(b,t,k);native=run(['zig','build','run-hosted-morphic-runtime']);fake=run(['zig','build','run-fake-morphic-runtime']);payload=[batch22b.prior.prior.prior.prior.perm.morphic.extract(x) for x in (a,b)]
   if not(native==fake==payload[0]==payload[1]):raise RuntimeError('Morphic equality drift')
   print('PASS: Batch 23 runs=2 PT_LOAD=R-X+RW- data=8 BSS=8 mutation=23b55a5aa55ac33c U=3 W+X=0 Morphic=765'); summary='runs=2 PT_LOAD=2 data=8 BSS=8 U=3 W+X=0 Morphic=765';p.cleanup()
 except Exception as e:traceback.print_exc();handoff('FAIL','Batch 23 verification failed',str(e));return getattr(e,'returncode',1)
 handoff('PASS',summary,next=COMMAND if sys.argv[1:] else 'python3 tools/developer-command.py validate-repository');return 0
if __name__=='__main__':raise SystemExit(main())
