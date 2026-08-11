#!/usr/bin/env python3
import importlib.util,re,shutil,struct,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND='python3 tools/verify-freestanding-riscv64-linux-fd-lifecycle.py'; BEGIN=b'ZIGREF_LINUX_RV64_SYSCALL_BEGIN'; END=b'ZIGREF_LINUX_RV64_SYSCALL_END'; MESSAGE=b'stdin-25b'; TIMEOUT=300
spec=importlib.util.spec_from_file_location('b24',ROOT/'tools/verify-freestanding-riscv64-initial-stack.py');b24=importlib.util.module_from_spec(spec);spec.loader.exec_module(b24)
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
 if seg[0][0]!=5 or seg[0][2]!=0x80401000 or seg[1][0]!=6 or seg[1][2]!=0x80403000 or seg[1][4]<=seg[1][3]:raise RuntimeError('segments')
 sites=[seg[0][2]+i for i in range(0,len(seg[0][6])-3,2) if seg[0][6][i:i+4]==b'\x73\0\0\0']
 if len(sites)!=15 or not(seg[0][2]<=entry<seg[0][2]+seg[0][4]):raise RuntimeError('ECALL sites')
 return {'entry':entry,'sites':sites}
def fields(raw):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1:raise RuntimeError('framing')
 body=raw.split(BEGIN,1)[1].split(END,1)[0];d={};events=[]
 for line in body.splitlines():
  if not line:continue
  if line.startswith(b'event='):
   e={k:v for k,v in (part.decode().split('=',1) for part in line.split(b','))};events.append(e);continue
  k,v=line.decode().split('=',1)
  if k in d:raise RuntimeError('duplicate '+k)
  d[k]=v
 return d,events
def num(v):
 if not re.fullmatch('[0-9a-f]{16}',v):raise RuntimeError('malformed number')
 return int(v,16)
def parse(raw,t,t24,old,kt):
 b24.parse(raw,t24,old,kt);d,ev=fields(raw)
 if d.get('artifact')!='userspace-elf-rv64-linux-syscalls' or d.get('whole_range_before_output')!='PASS' or d.get('translation_change')!='none' or d.get('complete')!='PASS':raise RuntimeError('policy')
 if num(d['entry'])!=t['entry'] or num(d['initial_sp'])!=0x80402f50 or num(d['trap_cause'])!=8 or num(d['terminal_status'])!=37 or num(d['stdin_cursor'])!=9 or num(d['resource_count'])!=2 or num(d['stdin_generation'])!=2:raise RuntimeError('header relation')
 if len(ev)!=15:raise RuntimeError('event count/order')
 exp=[
  (0,0x7fff,'unsupported',-38,(0x1111,0x2222,0x3333)),
  (1,63,'read_bytes',5,(0,None,5)), (2,23,'duplicate',3,(0,None,5)),
  (3,57,'close',0,(0,None,5)), (4,63,'read_bytes',-9,(0,None,1)),
  (5,63,'read_bytes',-14,(3,0x90000000,4)), (6,63,'read_bytes',4,(3,None,4)),
  (7,64,'write_bytes',9,(1,None,9)), (8,57,'close',0,(3,None,9)),
  (9,63,'read_bytes',-9,(3,None,1)), (10,57,'close',-9,(3,None,1)),
  (11,64,'write_bytes',-9,(99,None,1)), (12,64,'write_bytes',-14,(1,0x90000000,1)),
  (13,63,'read_bytes',-9,(1,None,1)), (14,94,'terminate',37,(37,None,1))]
 for i,(idx,nr,sem,res,args) in enumerate(exp):
  e=ev[i]
  if num(e['event'])!=idx or num(e['nr'])!=nr or e['semantic']!=sem or num(e['result'])!=(res&((1<<64)-1)):raise RuntimeError('event semantic/result')
  got=tuple(num(e[x]) for x in ('a0','a1','a2'))
  if any(want is not None and got[j]!=want for j,want in enumerate(args)):raise RuntimeError('event args')
  if num(e['pc'])!=t['sites'][i] or (i<14 and num(e['resume'])!=t['sites'][i]+4) or (i==14 and num(e['resume'])!=0):raise RuntimeError('PC/resume')
  if num(e['sstatus'])&0x100:raise RuntimeError('SPP')
 if bytes.fromhex(d['output_hex'])!=MESSAGE or raw.count(MESSAGE)!=1:raise RuntimeError('exact output bytes')
 code,stack,data=map(lambda k:num(d[k]),('code_pte','stack_pte','data_pte'))
 if code&0x1e!=0x1a or stack&0x1e!=0x16 or data&0x1e!=0x16 or num(d['wx_leaf_count'])!=0 or num(d['user_leaf_count'])!=3:raise RuntimeError('PTE')
 for a,b in (('allocated_before','allocated_after'),('tables_before','tables_after'),('satp_before','satp_after')):
  if num(d[a])!=num(d[b]):raise RuntimeError('resource mutation')
 return {'fields':d,'events':ev}
def fixture():
 td=tempfile.TemporaryDirectory();run(['zig','build','install-userspace-rv64-elf','install-userspace-rv64-data-bss-elf','install-userspace-rv64-initial-stack-elf','install-userspace-rv64-linux-syscalls-elf','install-freestanding-riscv64-morphic-runtime','--prefix',td.name],180)
 p=Path(td.name)/'bin';t=elf(p/'userspace-elf-rv64-linux-syscalls');t24=b24.elf(p/'userspace-elf-rv64-initial-stack');old=b24.b23.elf(p/'userspace-elf-rv64-data-bss');old['old']=b24.b23.batch22b.elf(p/'userspace-elf-rv64');kt=b24.b23.batch22b.prior.elf_truth(p/'morphic-freestanding-riscv64');q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 raw=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')],TIMEOUT);return td,t,t24,old,kt,raw,p/'morphic-freestanding-riscv64'
def reject(raw,t,t24,o,k,a,b):
 try:parse(raw.replace(a,b,1),t,t24,o,k)
 except (RuntimeError,ValueError):return
 raise AssertionError('mutation accepted '+repr(a))
def selftest():
 td,t,t24,o,k,r,_=fixture();d=parse(r,t,t24,o,k);f=d['fields'];e=d['events']
 muts=[(b'nr='+e[2]['nr'].encode(),b'nr=0000000000000040'),(b'resume='+e[6]['resume'].encode(),b'resume=0000000080401000'),(b'result='+e[2]['result'].encode(),b'result=0000000000000004'),(b'result='+e[4]['result'].encode(),b'result=fffffffffffffff8'),(b'result='+e[5]['result'].encode(),b'result=fffffffffffffff3'),(b'semantic='+e[6]['semantic'].encode(),b'semantic=write_bytes'),(MESSAGE,b'X'+MESSAGE[1:]),(b'stdin_cursor='+f['stdin_cursor'].encode(),b'stdin_cursor=000000000000000a'),(b'resource_count='+f['resource_count'].encode(),b'resource_count=0000000000000003'),(b'stdin_generation='+f['stdin_generation'].encode(),b'stdin_generation=0000000000000001'),(b'argc=0000000000000002',b'argc=0000000000000001')]
 for a,b in muts:reject(r,t,t24,o,k,a,b)
 td.cleanup();print('PASS: Batch 25B one-QEMU proof and decisive mutations rejected')
def handoff(st,s,f=None,n=None):
 a=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',st,'--summary',s,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-linux-syscalls.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-linux-fd-lifecycle.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_25B.md']
 if f:a+=['--failure',f]
 if n or f:a+=['--next',n or COMMAND]
 subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:] not in ([],['--self-test']):handoff('FAIL','invocation rejected','unsupported arguments');return 2
 try:
  if sys.argv[1:]:selftest();s='fixture=1 mutations=rejected'
  else:
   td,t,t24,o,k,a,kernel=fixture();q=shutil.which('qemu-system-riscv64');b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(kernel)],TIMEOUT);da=parse(a,t,t24,o,k);db=parse(b,t,t24,o,k)
   if da!=db:raise RuntimeError('two-machine evidence drift')
   native=run(['zig','build','run-hosted-morphic-runtime']);fake=run(['zig','build','run-fake-morphic-runtime']);payload=[b24.b23.batch22b.prior.prior.prior.prior.perm.morphic.extract(x) for x in (a,b)]
   if not(native==fake==payload[0]==payload[1]):raise RuntimeError('Morphic equality drift')
   print('PASS: Batch 25B runs=2 syscalls=15 returns=14 terminal=37 stdin_generation=2 U=3 W+X=0 Morphic=765');s='runs=2 syscalls=15 returns=14 terminal=37 stdin_generation=2 Morphic=765';td.cleanup()
 except Exception as e:traceback.print_exc();handoff('FAIL','Batch 25B verification failed',str(e));return getattr(e,'returncode',1)
 handoff('PASS',s,n=COMMAND if sys.argv[1:] else 'python3 tools/developer-command.py validate-repository');return 0
if __name__=='__main__':raise SystemExit(main())
