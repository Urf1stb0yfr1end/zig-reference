#!/usr/bin/env python3
"""Strict Batch 21C bidirectional real user-memory proof."""
import importlib.util,re,shutil,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND="python3 tools/verify-freestanding-riscv64-user-memory-transfer.py"; BEGIN=b"ZIGREF_USER_COPY_OUT_BEGIN"; END=b"ZIGREF_USER_COPY_OUT_END"; RETURNED=b"ZIGREF_USER_COPY_OUT_RETURNED"; TIMEOUT=300
spec=importlib.util.spec_from_file_location("copyin",ROOT/"tools/verify-freestanding-riscv64-user-copy-in.py"); prior=importlib.util.module_from_spec(spec);spec.loader.exec_module(prior)
def run(c,t=None):return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=t).stdout
def elf_truth(path):
 names=("userCopyOutProbeTemplateBegin","userCopyOutProbeServiceEcall","userCopyOutProbeAfterService","userCopyOutProbePermissionRejectEcall","userCopyOutProbeAfterPermissionReject","userCopyOutProbeAtomicRejectEcall","userCopyOutProbeAfterAtomicReject","userCopyOutProbeTerminalEcall","userCopyOutProbeTemplateEnd")
 out=run(["readelf","-sW",str(path)]).decode();d={}
 for line in out.splitlines():
  p=line.split()
  if len(p)>1 and p[-1] in names:d[p[-1]]=int(p[1],16)
 if not set(names)<=set(d):raise RuntimeError("Batch 21C ELF symbols missing")
 d.update(prior.elf_truth(path))
 return d
def hx(d,k):
 if k not in d or not re.fullmatch(r"[0-9a-f]{16}",d[k]):raise RuntimeError("malformed "+k)
 return int(d[k],16)
def leafmap(rows):
 out={}
 for r in rows:
  if set(r)!={'leaf_va','pa','pte','level'}:raise RuntimeError('malformed leaf')
  x=tuple(hx(r,k) for k in ('leaf_va','pa','pte','level'))
  if x[0] in out:raise RuntimeError('duplicate leaf')
  out[x[0]]=x[1:]
 return out
def parse(raw,truth):
 if any(raw.count(x)!=1 for x in (BEGIN,END,RETURNED)):raise RuntimeError('wrong framing')
 if not(prior.RETURNED in raw and raw.find(prior.RETURNED)<raw.find(BEGIN)<raw.find(END)<raw.find(RETURNED)<raw.find(b'ZIGREF_MORPHIC_BEGIN')):raise RuntimeError('wrong order')
 prior.parse(raw,truth)
 d,rows=prior.prior.parse_fields(raw,BEGIN,END);old_d,oldrows=prior.prior.parse_fields(raw,prior.BEGIN,prior.END)
 nums='user_code_va user_code_pa user_stack_va user_stack_pa satp_before satp_after root_physical physical_allocated_before physical_allocated_after page_table_count_before page_table_count_after template_begin service_ecall after_service permission_ecall after_permission atomic_ecall after_atomic terminal_ecall template_end destination_va length segment_count segment_pa segment_offset segment_bytes segment_coverage guard_before guard_before_after guard_after guard_after_after permission_va permission_length code_guard_before code_guard_after atomic_va atomic_length valid_prefix_length prefix_before prefix_after trap_count return_count stvec_after sscratch_after final_u_leaves final_wx_leaves final_leaf_count trap0_frame trap0_sepc trap0_sstatus trap1_frame trap1_sepc trap1_sstatus trap2_frame trap2_sepc trap2_sstatus trap3_frame trap3_sepc trap3_sstatus prepared0_sepc prepared1_sepc prepared2_sepc trap0_scause trap1_scause trap2_scause trap3_scause prepared0_sstatus prepared1_sstatus prepared2_sstatus'.split();n={k:hx(d,k) for k in nums}
 syms=[truth[k] for k in ('userCopyOutProbeTemplateBegin','userCopyOutProbeServiceEcall','userCopyOutProbeAfterService','userCopyOutProbePermissionRejectEcall','userCopyOutProbeAfterPermissionReject','userCopyOutProbeAtomicRejectEcall','userCopyOutProbeAfterAtomicReject','userCopyOutProbeTerminalEcall','userCopyOutProbeTemplateEnd')]
 if [n[k] for k in ('template_begin','service_ecall','after_service','permission_ecall','after_permission','atomic_ecall','after_atomic','terminal_ecall','template_end')]!=syms:raise RuntimeError('ELF symbol contradiction')
 pcs=[0x80401000+x-syms[0] for x in syms[1:-1]]
 traps=[n[f'trap{i}_sepc'] for i in range(4)];statuses=[n[f'trap{i}_sstatus'] for i in range(4)];causes=[n[f'trap{i}_scause'] for i in range(4)];prepared=[n[f'prepared{i}_sepc'] for i in range(3)];prepared_status=[n[f'prepared{i}_sstatus'] for i in range(3)];frames=[n[f'trap{i}_frame'] for i in range(4)]
 if traps!=[pcs[0],pcs[2],pcs[4],pcs[6]] or causes!=[8]*4 or prepared!=[pcs[1],pcs[3],pcs[5]] or any(x&(0x100|0x40000) for x in statuses):raise RuntimeError('trap origin/cause/SUM contradiction')
 if any(x & 0x40122 for x in prepared_status):raise RuntimeError('prepared SPP/SUM/SIE/SPIE contradiction')
 trusted_frame=hx(old_d,'first_frame')
 if frames != [trusted_frame]*4 or hx(old_d,'second_frame')!=trusted_frame:raise RuntimeError('trusted trap-frame contradiction')
 if (n['satp_before']!=n['satp_after'] or n['satp_before']!=hx(old_d,'satp_after') or n['root_physical']!=hx(old_d,'root_physical') or n['stvec_after']!=hx(old_d,'stvec_after') or n['physical_allocated_before']!=n['physical_allocated_after'] or n['page_table_count_before']!=n['page_table_count_after'] or n['trap_count']!=4 or n['return_count']!=3 or n['sscratch_after']!=0):raise RuntimeError('conservation contradiction')
 if (n['destination_va'],n['length'],n['segment_count'],n['segment_pa'],n['segment_offset'],n['segment_bytes'],n['segment_coverage'])!=(0x80402fc8,16,1,n['user_stack_pa']+0xfc8,0,16,16):raise RuntimeError('successful plan contradiction')
 if d.get('trusted_hex')!='6b65726e656c2d746f2d757365722121' or d.get('observed_hex')!=d['trusted_hex'] or n['guard_before']!=n['guard_before_after'] or n['guard_after']!=n['guard_after_after']:raise RuntimeError('payload/guard contradiction')
 old=leafmap(oldrows);new=leafmap([r for r in rows if 'leaf_va' in r])
 if old!=new or n['final_u_leaves']!=2 or n['final_wx_leaves']!=0 or len(new)!=n['final_leaf_count']:raise RuntimeError('leaf drift')
 code=new.get(0x80401000);stack=new.get(0x80402000)
 if not code or not stack or code[1]&0x4 or not(code[1]&0x10) or not(stack[1]&0x14)==0x14:raise RuntimeError('real permission truth contradiction')
 if (n['permission_va'],n['permission_length'],d.get('permission_result'))!=(0x80401000,16,'NotWritable') or n['code_guard_before']!=n['code_guard_after']:raise RuntimeError('permission rejection contradiction')
 if (n['atomic_va'],n['atomic_length'],n['valid_prefix_length'],d.get('atomic_result'))!=(0x80402ff8,16,8,'Unmapped') or n['prefix_before']!=n['prefix_after']:raise RuntimeError('atomic rejection contradiction')
 if any(x in new for x in (0x80403000,)) or d.get('translation_change')!='none' or d.get('sfence_vma')!='not-required-no-pte-change' or d.get('fence_i')!='local-hart-executed' or d.get('sum')!='observed-zero' or d.get('complete')!='PASS':raise RuntimeError('policy contradiction')
 return d
def reject(raw,truth,a,b):
 try:parse(raw.replace(a,b,1),truth)
 except RuntimeError:return
 raise AssertionError('mutation accepted '+repr(a))
def fixture():
 p=tempfile.TemporaryDirectory();subprocess.run(['zig','build','install-freestanding-riscv64-morphic-runtime','--prefix',p.name],cwd=ROOT,check=True);art=Path(p.name)/'bin/morphic-freestanding-riscv64';q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 return p,art,elf_truth(art),run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(art)],TIMEOUT)
def self_test():
 p,art,t,raw=fixture();d=parse(raw,t)
 muts=[(BEGIN,b'BAD'),(RETURNED,b'BAD'),(b'trap_count=0000000000000004',b'trap_count=0000000000000005'),(b'length=0000000000000010',b'length=000000000000000f'),(b'observed_hex=6b65726e656c2d746f2d757365722121',b'observed_hex=0065726e656c2d746f2d757365722121'),(b'permission_result=NotWritable',b'permission_result=Unmapped'),(b'atomic_result=Unmapped',b'atomic_result=NotWritable'),(b'prefix_after=8877665544332211',b'prefix_after=8877665544332210'),(b'final_u_leaves=0000000000000002',b'final_u_leaves=0000000000000003'),(b'sfence_vma=not-required-no-pte-change',b'sfence_vma=global')]
 _,rows=prior.prior.parse_fields(raw,BEGIN,END)
 for key in ('trap0_scause','trap1_scause','trap2_scause','trap3_scause'):
  value=f'{key}=0000000000000008'.encode();muts.append((value,value[:-1]+b'9'))
 for key in ('prepared0_sstatus','prepared1_sstatus','prepared2_sstatus'):
  value=f'{key}={d[key]}'.encode();muts.append((value,f'{key}={int(d[key],16)|0x20:016x}'.encode()))
 for key in ('trap0_frame','trap1_frame','trap2_frame','trap3_frame','stvec_after','satp_before','root_physical','segment_offset','segment_bytes','segment_coverage'):
  value=f'{key}={d[key]}'.encode();muts.append((value,f'{key}={int(d[key],16)+1:016x}'.encode()))
 for a,b in muts:reject(raw,t,a,b)
 p.cleanup();print('PASS: Batch 21C strict rejection matrix',flush=True)
def handoff(status, command, summary, failure=None, next_command=None):
 args=[sys.executable,'tools/developer-minimus.py','--command',command,'--status',status,'--summary',summary,
       '--location','source=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig',
       '--location','verifier=tools/verify-freestanding-riscv64-user-memory-transfer.py',
       '--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_21C.md']
 if failure:args += ['--failure',failure]
 if next_command or failure:args += ['--next',next_command or command]
 sys.stdout.flush();sys.stderr.flush();subprocess.call(args,cwd=ROOT)
def main():
 self_mode=sys.argv[1:]==['--self-test'];command=COMMAND+(' --self-test' if self_mode else '')
 if sys.argv[1:] and not self_mode:
  print(f'usage: {COMMAND} [--self-test]',file=sys.stderr)
  handoff('FAIL',command,'Batch 21C verifier invocation was rejected','unsupported arguments')
  return 2
 try:
  if self_mode:
   self_test();summary='fixture=1 traps=4 causes=8 trusted-frame=PASS prepared-status=PASS segment-evidence=PASS mutations=rejected'
  else:
   p,art,t,a=fixture();q=shutil.which('qemu-system-riscv64');b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(art)],TIMEOUT);parse(a,t);parse(b,t);native=run(['zig','build','run-hosted-morphic-runtime']);fake=run(['zig','build','run-fake-morphic-runtime']);payload=[prior.prior.prior.perm.morphic.extract(x) for x in (a,b)]
   if not(native==fake==payload[0]==payload[1]) or len(native)!=765:raise RuntimeError('Morphic equality drift')
   p.cleanup();print('PASS: Batch 21C runs=2 traps=4 U=2 W+X=0 payload=kernel-to-user!! permission=NotWritable atomic=Unmapped prefix=unchanged Morphic=765',flush=True)
   summary='runs=2 traps=4 U=2 W+X=0 copy=16 NotWritable=PASS atomic-Unmapped=PASS prefix=unchanged Morphic=765'
 except (AssertionError,OSError,UnicodeError,subprocess.CalledProcessError,subprocess.TimeoutExpired,RuntimeError,ValueError) as error:
  traceback.print_exc();handoff('FAIL',command,'Batch 21C bounded user-memory verification failed',str(error))
  return error.returncode if isinstance(error,subprocess.CalledProcessError) else 1
 handoff('PASS',command,summary, next_command=COMMAND if self_mode else 'python3 tools/developer-command.py validate-repository')
 return 0
if __name__=='__main__':raise SystemExit(main())
