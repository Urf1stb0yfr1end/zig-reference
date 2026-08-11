#!/usr/bin/env python3
import importlib.util,re,shutil,struct,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND='python3 tools/verify-freestanding-riscv64-initial-stack.py'; BEGIN=b'ZIGREF_USERSPACE_INITIAL_STACK_BEGIN'; END=b'ZIGREF_USERSPACE_INITIAL_STACK_END'; RET=b'ZIGREF_USERSPACE_INITIAL_STACK_RETURNED'; TIMEOUT=300
spec=importlib.util.spec_from_file_location('b23',ROOT/'tools/verify-freestanding-riscv64-userspace-elf-data-bss.py'); b23=importlib.util.module_from_spec(spec);spec.loader.exec_module(b23)
def run(c,t=None):return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=t).stdout
def elf(p):
 b=p.read_bytes()
 if len(b)<64 or b[:7]!=b'\x7fELF\x02\x01\x01':raise RuntimeError('ELF identity')
 typ,mach=struct.unpack_from('<HH',b,16);entry,phoff=struct.unpack_from('<QQ',b,24);_,pe,pn=struct.unpack_from('<HHH',b,52)
 if (typ,mach,pe,pn)!=(2,243,56,2):raise RuntimeError('ELF shape')
 seg=[]
 for i in range(2):
  pt,fl,off,va,pa,fs,ms,al=struct.unpack_from('<IIQQQQQQ',b,phoff+i*pe)
  if pt!=1 or va!=pa or off+fs>len(b):raise RuntimeError('PT_LOAD')
  seg.append((fl,off,va,fs,ms,al,b[off:off+fs]))
 if seg[0][0]!=5 or seg[0][2]!=0x80401000 or seg[1][0]!=6 or seg[1][2]!=0x80403000 or seg[1][4]<=seg[1][3]:raise RuntimeError('ELF permissions/BSS')
 sites=[seg[0][2]+i for i in range(0,len(seg[0][6])-3,2) if seg[0][6][i:i+4]==b'\x73\0\0\0']
 if len(sites)!=1 or not(seg[0][2]<=entry<seg[0][2]+seg[0][4]):raise RuntimeError('entry/ECALL')
 return {'entry':entry,'ecall':sites[0]}
def expected(entry):
 argv=[b'alpz-24b',b'stack-proof'];env=[b'ALPZ_BATCH=24B',b'MODE=qemu-proof']; strings=b''.join(x+b'\0' for x in argv+env)
 words=15; raw=words*8+len(strings);sp=(0x80403000-raw)&~15; image=bytearray(0x80403000-sp); so=len(image)-len(strings);image[so:]=strings
 add=[];c=sp+so
 for x in argv+env:add.append(c);c+=len(x)+1
 vals=[2,add[0],add[1],0,add[2],add[3],0,6,4096,9,entry,31,add[0],0,0]
 for i,v in enumerate(vals):struct.pack_into('<Q',image,i*8,v)
 return sp,bytes(image)
def fields(raw):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1 or raw.count(RET)!=1:raise RuntimeError('framing')
 d={}
 for line in raw.split(BEGIN,1)[1].split(END,1)[0].splitlines():
  if not line:continue
  k,v=line.decode().split('=',1)
  if k in d:raise RuntimeError('duplicate '+k)
  d[k]=v
 return d
def num(d,k):
 if not re.fullmatch('[0-9a-f]{16}',d.get(k,'')):raise RuntimeError('malformed '+k)
 return int(d[k],16)
def parse(raw,t,old,kt):
 b23.parse(raw,old,kt);d=fields(raw);sp,img=expected(t['entry'])
 fixed={'artifact':'userspace-elf-rv64-initial-stack','stack_exact':'PASS','stack_policy':'project-55','supervisor_resume':'PASS','complete':'PASS','translation_change':'none','sfence_vma':'not-required-no-pte-change'}
 if any(d.get(k)!=v for k,v in fixed.items()):raise RuntimeError('policy')
 pairs={'entry':t['entry'],'ecall_pc':t['ecall'],'initial_sp':sp,'used_start':sp,'used_end':0x80403000,'stack_sanitized_bytes':4096,'argc':2,'argv_count':2,'envp_count':2,'auxv_count':3,'trap_cause':8,'marker_a0':0x24b0,'marker_t0':0x24b024b024b024b0,'marker_t1':0x23b55a5aa55ac33c,'user_leaf_count':3,'wx_leaf_count':0}
 if any(num(d,k)!=v for k,v in pairs.items()):raise RuntimeError('machine relationship')
 try:actual=bytes.fromhex(d['stack_bytes'])
 except Exception:raise RuntimeError('stack hex')
 if actual!=img:raise RuntimeError('exact stack bytes')
 if sp%16 or len(actual)!=0x80403000-sp:raise RuntimeError('range/alignment')
 code,numstack,data=map(lambda k:num(d,k),('code_pte','stack_pte','data_pte'))
 if code&0x1e!=0x1a or numstack&0x1e!=0x16 or data&0x1e!=0x16:raise RuntimeError('PTE')
 if num(d,'trap_sstatus')&0x100:raise RuntimeError('SPP')
 return d
def fixture():
 td=tempfile.TemporaryDirectory();run(['zig','build','install-userspace-rv64-elf','install-userspace-rv64-data-bss-elf','install-userspace-rv64-initial-stack-elf','install-freestanding-riscv64-morphic-runtime','--prefix',td.name],180)
 p=Path(td.name)/'bin';t=elf(p/'userspace-elf-rv64-initial-stack');old=b23.elf(p/'userspace-elf-rv64-data-bss');old['old']=b23.batch22b.elf(p/'userspace-elf-rv64');kt=b23.batch22b.prior.elf_truth(p/'morphic-freestanding-riscv64');q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 raw=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')],TIMEOUT);return td,t,old,kt,raw,p/'morphic-freestanding-riscv64'
def reject(raw,t,o,k,a,b):
 try:parse(raw.replace(a,b,1),t,o,k)
 except RuntimeError:return
 raise AssertionError('mutation accepted '+repr(a))
def selftest():
 td,t,o,k,r,_=fixture();d=parse(r,t,o,k); muts=[(b'argc='+d['argc'].encode(),b'argc=0000000000000001'),(b'stack_bytes='+d['stack_bytes'].encode(),b'stack_bytes=00'+d['stack_bytes'].encode()[2:]),(b'initial_sp='+d['initial_sp'].encode(),b'initial_sp=0000000080402f51'),(b'stack_pte='+d['stack_pte'].encode(),b'stack_pte=000000002008bcdf'),(b'trap_cause='+d['trap_cause'].encode(),b'trap_cause=0000000000000009'),(b'marker_a0='+d['marker_a0'].encode(),b'marker_a0=0000000000000000')]
 for a,b in muts:reject(r,t,o,k,a,b)
 td.cleanup();print('PASS: Batch 24B one-QEMU proof and decisive mutations rejected')
def handoff(st,s,f=None,n=None):
 a=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',st,'--summary',s,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-initial-stack.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-initial-stack.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_24B.md']
 if f:a+=['--failure',f]
 if n or f:a+=['--next',n or COMMAND]
 subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:] not in ([],['--self-test']):handoff('FAIL','invocation rejected','unsupported arguments');return 2
 try:
  if sys.argv[1:]:selftest();s='fixture=1 exact-stack mutations=rejected'
  else:
   td,t,o,k,a,kernel=fixture();q=shutil.which('qemu-system-riscv64');b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(kernel)],TIMEOUT);da=parse(a,t,o,k);db=parse(b,t,o,k)
   if da!=db:raise RuntimeError('two-machine evidence drift')
   native=run(['zig','build','run-hosted-morphic-runtime']);fake=run(['zig','build','run-fake-morphic-runtime']);payload=[b23.batch22b.prior.prior.prior.prior.perm.morphic.extract(x) for x in (a,b)]
   if not(native==fake==payload[0]==payload[1]):raise RuntimeError('Morphic equality drift')
   print('PASS: Batch 24B runs=2 exact planner stack U-parse=PASS U=3 W+X=0 Morphic=765');s='runs=2 exact-stack=176 U=3 W+X=0 Morphic=765';td.cleanup()
 except Exception as e:traceback.print_exc();handoff('FAIL','Batch 24B verification failed',str(e));return getattr(e,'returncode',1)
 handoff('PASS',s,n=COMMAND if sys.argv[1:] else 'python3 tools/developer-command.py validate-repository');return 0
if __name__=='__main__':raise SystemExit(main())
