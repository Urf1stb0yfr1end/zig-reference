#!/usr/bin/env python3
"""Independent Batch 26 RV64 artifact and machine-evidence verifier."""
import hashlib, shutil, struct, subprocess, sys, tempfile, traceback
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
COMMAND='python3 tools/verify-freestanding-riscv64-file-memory-exec.py'
BEGIN=b'ZIGREF_BATCH26_BEGIN'; END=b'ZIGREF_BATCH26_END'; TIMEOUT=300
EXPECTED_NRS=[56,63,56,56,222,226,215,221,93]

def run(argv):
    return subprocess.run(argv,cwd=ROOT,check=True,stdout=subprocess.PIPE,stderr=subprocess.STDOUT,timeout=TIMEOUT).stdout

def elf(path_or_bytes):
    data=path_or_bytes if isinstance(path_or_bytes,(bytes,bytearray)) else Path(path_or_bytes).read_bytes()
    if data[:6]!=b'\x7fELF\x02\x01': raise RuntimeError('not ELF64 little-endian')
    etype,machine=struct.unpack_from('<HH',data,16); entry,phoff=struct.unpack_from('<QQ',data,24)
    phentsize,phnum=struct.unpack_from('<HH',data,54)
    if machine!=243 or phentsize!=56: raise RuntimeError('not RV64 ELF')
    ph=[]
    for i in range(phnum):
        p=struct.unpack_from('<IIQQQQQQ',data,phoff+i*phentsize)
        ph.append(dict(type=p[0],flags=p[1],off=p[2],vaddr=p[3],filesz=p[5],memsz=p[6],align=p[7]))
    return dict(data=bytes(data),etype=etype,machine=machine,entry=entry,ph=ph,sha256=hashlib.sha256(data).hexdigest())

def vaddr_for_offset(info,off):
    for p in info['ph']:
        if p['type']==1 and p['off']<=off<p['off']+p['filesz']: return p['vaddr']+off-p['off']
    raise RuntimeError('instruction outside PT_LOAD')

def ecall_oracle(info):
    sites=[]; data=info['data']
    for off in range(4,len(data)-3,2):
        if data[off:off+4]!=b'\x73\x00\x00\x00': continue
        instruction=struct.unpack_from('<I',data,off-4)[0]
        if instruction&0x7f!=0x13 or (instruction>>7)&31!=17 or (instruction>>12)&7!=0 or (instruction>>15)&31!=0:
            raise RuntimeError('ECALL lacks adjacent li a7 immediate')
        sites.append((vaddr_for_offset(info,off),(instruction>>20)&0xfff))
    if [nr for _,nr in sites]!=EXPECTED_NRS[:-1]: raise RuntimeError('artifact syscall sequence')
    return sites

def interp_path(info):
    rows=[p for p in info['ph'] if p['type']==3]
    if len(rows)!=1: raise RuntimeError('main must contain one PT_INTERP')
    p=rows[0]; raw=info['data'][p['off']:p['off']+p['filesz']]
    if not raw.endswith(b'\0') or raw.count(b'\0')!=1: raise RuntimeError('malformed PT_INTERP')
    return raw[:-1].decode()

def symbols(path):
    out=run(['readelf','-Ws',str(path)]).decode(); result={}
    for line in out.splitlines():
        cols=line.split()
        if len(cols)>=8 and cols[1].isalnum():
            try: result[cols[7]]=int(cols[1],16)
            except ValueError: pass
    return result

def fields(raw):
    if raw.count(BEGIN)!=1 or raw.count(END)!=1: raise RuntimeError('Batch 26 framing')
    result={}; events=[]
    for line in raw.split(BEGIN,1)[1].split(END,1)[0].splitlines():
        if not line: continue
        text=line.decode()
        if text.startswith('syscall_index='):
            row=dict(piece.split('=',1) for piece in text.split(',')); events.append({k:int(v,16) for k,v in row.items()}); continue
        key,value=text.split('=',1)
        if key in result: raise RuntimeError('duplicate '+key)
        result[key]=value
    return result,events

def verify(raw,fixture_path,main_path,interp_pathname, overrides=None):
    f=elf(fixture_path); main=elf(main_path); interp=elf(interp_pathname)
    d,events=fields(raw)
    if overrides: d.update(overrides)
    if d.get('artifact')!=Path(fixture_path).name or d.get('main_artifact')!=Path(main_path).name or d.get('interp_artifact')!=Path(interp_pathname).name: raise RuntimeError('artifact identity names')
    if main['etype']!=2 or interp['etype']!=3: raise RuntimeError('main/interpreter ELF types')
    path=interp_path(main)
    if path!='/lib/ld-batch26-rv64.so' or d.get('interp_path')!=path: raise RuntimeError('PT_INTERP relationship')
    sites=ecall_oracle(f)
    if len(events)!=9: raise RuntimeError('machine syscall event count')
    for i,(event,(pc,nr)) in enumerate(zip(events[:8],sites)):
        if event['syscall_index']!=i or event['pc']!=pc or event['nr']!=nr: raise RuntimeError('ELF/machine syscall relationship')
        if i<7 and event.get('resume')!=pc+4: raise RuntimeError('returning sepc+4 relationship')
    syms=symbols(fixture_path)
    for name in ('batch26ProtectedStore','batch26UnmappedLoad'):
        if name not in syms: raise RuntimeError('missing fixture proof symbol '+name)
    hx=lambda key:int(d[key],16)
    if hx('open_fd')!=3 or bytes.fromhex(d['file_hex'])!=b'batch26-file': raise RuntimeError('open/read relationship')
    if hx('missing_result')!=(1<<64)-2 or hx('efault_result')!=(1<<64)-14: raise RuntimeError('open errno relationship')
    if hx('resource_generation')!=2: raise RuntimeError('resource generation')
    if hx('mmap_va')!=0x80404000 or hx('mmap_value')!=0x26: raise RuntimeError('live mmap access')
    if hx('protect_fault_cause')!=15 or hx('protect_fault_va')!=hx('mmap_va') or hx('protect_fault_pc')!=syms['batch26ProtectedStore']: raise RuntimeError('real protection fault')
    pte=hx('protected_pte')
    if pte&1==0 or pte&2==0 or pte&4 or pte&8 or pte&16==0: raise RuntimeError('protected PTE permissions')
    if hx('unmap_fault_cause')!=13 or hx('unmap_fault_va')!=hx('mmap_va') or hx('unmap_fault_pc')!=syms['batch26UnmappedLoad']: raise RuntimeError('real missing-mapping fault')
    interp_entry=hx('interp_entry')
    if hx('main_entry')!=main['entry'] or hx('interp_raw_entry')!=interp['entry'] or interp_entry!=interp['entry']+hx('interp_bias'): raise RuntimeError('ET_DYN bias relationship')
    if hx('at_entry')!=main['entry'] or hx('at_base')!=hx('interp_bias') or hx('at_phdr')!=next(p['vaddr'] for p in main['ph'] if p['type']==1)+64: raise RuntimeError('auxv relationship')
    if not 0x80402000 <= hx('initial_sp') < 0x80403000 or hx('initial_sp') % 16: raise RuntimeError('project-55 initial stack relationship')
    if hx('program_a_terminal_syscall')!=221 or hx('program_b_interpreter_marker')!=0x26b: raise RuntimeError('A-to-interpreter terminal transition')
    interp_sites=[vaddr_for_offset(interp,i) for i in range(len(interp['data'])-3) if interp['data'][i:i+4]==b'\x73\x00\x00\x00']
    if interp_sites!=[interp['entry']+8]: raise RuntimeError('interpreter ECALL identity')
    if events[8]['syscall_index']!=8 or events[8]['nr']!=93 or events[8]['pc']!=interp_sites[0]+hx('interp_bias'): raise RuntimeError('interpreter machine transition')
    if hx('wx_leaf_count')!=0 or d.get('complete')!='PASS': raise RuntimeError('completion/W+X')
    return {'fixture_hash':f['sha256'],'main_hash':main['sha256'],'interp_hash':interp['sha256'],'events':events,'fields':d}

def fixture():
    td=tempfile.TemporaryDirectory(); prefix=Path(td.name)
    run(['zig','build','install-userspace-rv64-elf','install-userspace-rv64-data-bss-elf','install-userspace-rv64-initial-stack-elf','install-userspace-rv64-linux-syscalls-elf','install-userspace-rv64-file-memory-exec-elf','install-userspace-rv64-batch26-main-elf','install-userspace-rv64-batch26-interp-elf','install-freestanding-riscv64-morphic-runtime','--prefix',td.name])
    p=prefix/'bin'; q=shutil.which('qemu-system-riscv64')
    if not q: raise RuntimeError('qemu-system-riscv64 required')
    raw=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')])
    return td,p,q,raw

def reject(raw,p,key,value):
    try: verify(raw,p/'userspace-elf-rv64-file-memory-exec',p/'userspace-elf-rv64-batch26-main',p/'userspace-elf-rv64-batch26-interp',{key:value})
    except (RuntimeError,ValueError,KeyError,struct.error): return
    raise AssertionError('mutation accepted '+key)

def handoff(status,summary,failure=None):
    args=[sys.executable,'tools/developer-minimus.py','--command',COMMAND+(' --self-test' if sys.argv[1:] else ''),'--status',status,'--summary',summary,'--location','guest=recipes/run-hosted-morphic-runtime/fixtures/userspace-elf-rv64-file-memory-exec.zig','--location','kernel=recipes/run-hosted-morphic-runtime/src/freestanding_riscv64.zig','--location','verifier=tools/verify-freestanding-riscv64-file-memory-exec.py','--location','report=docs/reports/AGENTIC_SNOWBALL_BATCH_26.md']
    if failure: args+=['--failure',failure,'--next',COMMAND]
    subprocess.call(args,cwd=ROOT)

def main():
    if sys.argv[1:] not in ([],['--self-test']): handoff('FAIL','invocation rejected','unsupported arguments'); return 2
    try:
        td,p,q,a=fixture(); first=verify(a,p/'userspace-elf-rv64-file-memory-exec',p/'userspace-elf-rv64-batch26-main',p/'userspace-elf-rv64-batch26-interp')
        if sys.argv[1:]:
            mutations={'protect_fault_cause':'000000000000000d','protect_fault_pc':'0000000080404000','protected_pte':'00000000000000d7','unmap_fault_va':'0000000080405000','interp_path':'/bad','interp_entry':'0000000000001000','at_phdr':'0000000000000000','program_b_interpreter_marker':'0000000000000000','resource_generation':'0000000000000001','wx_leaf_count':'0000000000000001'}
            for key,value in mutations.items(): reject(a,p,key,value)
            damaged=bytearray((p/'userspace-elf-rv64-file-memory-exec').read_bytes()); off=damaged.find(b'\x73\x00\x00\x00'); damaged[off]=0
            try: ecall_oracle(elf(damaged))
            except RuntimeError: pass
            else: raise AssertionError('mutated ECALL accepted')
            print('PASS: Batch 26 one-QEMU independent proof and 11 semantic mutations rejected'); summary='fixture=1 mutations=11 rejected hashes=3'
        else:
            b=run([q,'-machine','virt','-nographic','-bios','default','-kernel',str(p/'morphic-freestanding-riscv64')]); second=verify(b,p/'userspace-elf-rv64-file-memory-exec',p/'userspace-elf-rv64-batch26-main',p/'userspace-elf-rv64-batch26-interp')
            if first!=second: raise RuntimeError('two-machine evidence drift')
            print('PASS: Batch 26 runs=2 real open/read mmap faults execve PT_INTERP ET_DYN generation=2 W+X=0'); summary='runs=2 syscalls=9 faults=2 exec=PT_INTERP hashes=3 generation=2 W+X=0'
        td.cleanup()
    except Exception as exc:
        traceback.print_exc(); handoff('FAIL','Batch 26 verification failed',str(exc)); return getattr(exc,'returncode',1)
    handoff('PASS',summary); return 0
if __name__=='__main__': raise SystemExit(main())
