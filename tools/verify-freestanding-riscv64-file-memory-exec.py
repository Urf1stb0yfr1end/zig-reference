#!/usr/bin/env python3
import hashlib,importlib.util,shutil,subprocess,sys,tempfile,traceback
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]; COMMAND='python3 tools/verify-freestanding-riscv64-file-memory-exec.py'; BEGIN=b'ZIGREF_BATCH26_BEGIN'; END=b'ZIGREF_BATCH26_END'; TIMEOUT=300
spec=importlib.util.spec_from_file_location('b25',ROOT/'tools/verify-freestanding-riscv64-linux-fd-lifecycle.py');b25=importlib.util.module_from_spec(spec);spec.loader.exec_module(b25)
def run(c):return subprocess.run(c,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=TIMEOUT).stdout
def fields(raw):
 if raw.count(BEGIN)!=1 or raw.count(END)!=1:raise RuntimeError('Batch 26 framing')
 d={}
 for line in raw.split(BEGIN,1)[1].split(END,1)[0].splitlines():
  if not line:continue
  k,v=line.decode().split('=',1)
  if k in d:raise RuntimeError('duplicate '+k)
  d[k]=v
 return d
def parse(raw,fixture_hash):
 d=fields(raw)
 exact={'artifact':'userspace-elf-rv64-file-memory-exec','openat':'PASS','file_hex':'626174636832362d66696c65','missing_errno':'0000000000000002','efault_errno':'000000000000000e','resource_generation':'0000000000000002','mmap_va':'0000000080404000','mmap_access':'PASS','mprotect':'PASS','post_protect_write_fault':'PASS','munmap':'PASS','post_unmap_fault':'PASS','program_a':'userspace-elf-rv64-file-memory-exec','program_b':'dynamic-main','execve':'PASS','interp_path':'/lib/ld-musl-riscv64.so.1','main_entry':'0000000080601000','interp_raw_entry':'0000000000001000','interp_bias':'0000000080800000','interp_entry':'0000000080801000','at_entry':'0000000080601000','at_base':'0000000080800000','pt_interp':'PASS','et_dyn_bias':'PASS','user_leaf_count':'0000000000000003','wx_leaf_count':'0000000000000000','complete':'PASS'}
 if d!=exact:raise RuntimeError('Batch 26 semantic relation')
 if int(d['interp_raw_entry'],16)+int(d['interp_bias'],16)!=int(d['interp_entry'],16):raise RuntimeError('ET_DYN bias relation')
 if d['at_entry']!=d['main_entry'] or d['at_base']!=d['interp_bias']:raise RuntimeError('auxv relation')
 if len(fixture_hash)!=64:raise RuntimeError('fixture identity')
 return d
def fixture():
 td=tempfile.TemporaryDirectory();run(['zig','build','install-userspace-rv64-elf','install-userspace-rv64-data-bss-elf','install-userspace-rv64-initial-stack-elf','install-userspace-rv64-linux-syscalls-elf','install-userspace-rv64-file-memory-exec-elf','install-freestanding-riscv64-morphic-runtime','--prefix',td.name]);p=Path(td.name)/'bin';q=shutil.which('qemu-system-riscv64')
 if not q:raise RuntimeError('qemu-system-riscv64 required')
 raw=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')]);h=hashlib.sha256((p/'userspace-elf-rv64-file-memory-exec').read_bytes()).hexdigest();return td,p,raw,h
def reject(raw,h,a,b):
 head,body=raw.split(BEGIN,1)
 try:parse(head+BEGIN+body.replace(a,b,1),h)
 except (RuntimeError,ValueError):return
 raise AssertionError('mutation accepted '+repr(a))
def handoff(status,summary,failure=None):
 a=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',status,'--summary',summary,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-file-memory-exec.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-file-memory-exec.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_26.md']
 if failure:a+=['--failure',failure,'--next',COMMAND]
 subprocess.call(a,cwd=ROOT)
def main():
 if sys.argv[1:] not in ([],['--self-test']):handoff('FAIL','invocation rejected','unsupported arguments');return 2
 try:
  td,p,a,h=fixture();parse(a,h)
  if sys.argv[1:]:
   for x,y in [(b'openat=PASS',b'openat=FAIL'),(b'efault_errno=000000000000000e',b'efault_errno=0000000000000002'),(b'mprotect=PASS',b'mprotect=FAIL'),(b'munmap=PASS',b'munmap=FAIL'),(b'execve=PASS',b'execve=FAIL'),(b'interp_path=/lib/ld-musl-riscv64.so.1',b'interp_path=/bad'),(b'interp_entry=0000000080801000',b'interp_entry=0000000000001000'),(b'resource_generation=0000000000000002',b'resource_generation=0000000000000001'),(b'wx_leaf_count=0000000000000000',b'wx_leaf_count=0000000000000001')]:reject(a,h,x,y)
   print('PASS: Batch 26 one-QEMU proof and decisive mutations rejected');summary='fixture=1 mutations=9 rejected'
  else:
   q=shutil.which('qemu-system-riscv64');b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')]);da=parse(a,h);db=parse(b,h)
   if da!=db:raise RuntimeError('two-machine evidence drift')
   print('PASS: Batch 26 runs=2 openat mmap mprotect munmap execve PT_INTERP ET_DYN-bias generation=2 W+X=0');summary='runs=2 openat=PASS mmap=PASS mprotect=PASS munmap=PASS execve=PASS pt_interp=PASS et_dyn_bias=PASS generation=2 W+X=0'
  td.cleanup()
 except Exception as e:traceback.print_exc();handoff('FAIL','Batch 26 verification failed',str(e));return getattr(e,'returncode',1)
 handoff('PASS',summary);return 0
if __name__=='__main__':raise SystemExit(main())
