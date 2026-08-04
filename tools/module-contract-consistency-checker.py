#!/usr/bin/env python3
"""Detect module layout, contract, dependency, catalog, source, and build drift."""
import json,re,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
PROJECTS=ROOT/'projects'; REQUIRED=('README.md','MASTERY.md','DETAILS.md','details.json')
errors=[]
def fail(path,msg): errors.append(f'{path.relative_to(ROOT) if path.is_absolute() else path}: {msg}')
def check_schema(value,schema,path='$'):
 typ=schema.get('type')
 types={'object':dict,'array':list,'string':str,'boolean':bool}
 if typ in types and not isinstance(value,types[typ]): fail(ROOT/'details.schema.json',f'{path} must be {typ}'); return
 if isinstance(value,dict):
  for key in schema.get('required',[]):
   if key not in value: fail(ROOT/'details.schema.json',f'{path}.{key} is required')
  if schema.get('additionalProperties') is False:
   for key in value:
    if key not in schema.get('properties',{}): fail(ROOT/'details.schema.json',f'{path}.{key} is not allowed')
  for key,child in schema.get('properties',{}).items():
   if key in value: check_schema(value[key],child,f'{path}.{key}')
schema=json.loads((ROOT/'details.schema.json').read_text()); catalog=(ROOT/'MODULES.md').read_text(); build=(ROOT/'build.zig').read_text()
modules=[]
for directory in sorted(p for p in PROJECTS.iterdir() if p.is_dir()):
 srcs=sorted((directory/'src').glob('*.zig')) if (directory/'src').is_dir() else []
 if not srcs:
  fail(directory,'checked module has no src/*.zig implementation'); continue
 modules.append(directory)
 for name in REQUIRED:
  if not (directory/name).is_file(): fail(directory,f'missing {name}')
 if len(srcs)!=1: fail(directory,f'expected one public source entrypoint, found {len(srcs)}')
 try: data=json.loads((directory/'details.json').read_text())
 except Exception as e: fail(directory/'details.json',f'invalid JSON: {e}'); continue
 check_schema(data,schema)
 expected=directory.name.split('-',1)[1]
 if data.get('module',{}).get('canonical_name')!=expected: fail(directory/'details.json',f'canonical_name must be {expected!r}')
 if data.get('module',{}).get('directory')!=directory.relative_to(ROOT).as_posix(): fail(directory/'details.json','module.directory does not match canonical directory')
 loc=data.get('locations',{})
 for field in ('implementation','tests'):
  for item in loc.get(field,[]):
   if not (ROOT/item).is_file(): fail(directory/'details.json',f'{field} path does not exist: {item}')
 for field in ('readme','mastery','details_markdown','details_json','public_entrypoint'):
  item=loc.get(field,'')
  if not item or not (ROOT/item).is_file(): fail(directory/'details.json',f'{field} path does not exist: {item}')
 source='\n'.join(p.read_text() for p in srcs)
 declared=set(data.get('public_surface',{}).get('root_symbols',[]))
 actual=set(re.findall(r'^pub\s+(?:const|fn|var)\s+([A-Za-z_]\w*)',source,re.M))
 if declared!=actual: fail(directory/'details.json',f'root_symbols mismatch: metadata={sorted(declared)}, source={sorted(actual)}')
 for dep in data.get('dependencies',{}).get('repository',[]):
  depdir=dep.get('module',''); path=dep.get('path',''); symbol=dep.get('symbol','')
  candidates=list(PROJECTS.glob(f'*-{depdir}'))
  if len(candidates)!=1: fail(directory/'details.json',f'dependency module does not exist uniquely: {depdir}')
  if not path or not (ROOT/path).is_file(): fail(directory/'details.json',f'dependency path does not exist: {path}')
  elif symbol and not re.search(rf'^pub\s+(?:const|fn|var)\s+{re.escape(symbol)}\b',(ROOT/path).read_text(),re.M): fail(directory/'details.json',f'dependency symbol {symbol} is not public in {path}')
  rel=Path(path).relative_to(directory.relative_to(ROOT)/'src') if False else None
  if path and Path(path).name not in source and str(Path(path).parent.parent.relative_to(directory)) not in source:
   # Imports are relative strings; require the dependency source basename at minimum.
   if Path(path).name not in source: fail(directory/'details.json',f'declared dependency path is not imported: {path}')
 if f'| `{directory.name}` |' not in catalog: fail(ROOT/'MODULES.md',f'missing unique row for {directory.name}')
 if sum(line.startswith(f'| `{directory.name}` |') for line in catalog.splitlines())!=1: fail(ROOT/'MODULES.md',f'module must appear exactly once: {directory.name}')
 source_path=srcs[0].relative_to(ROOT).as_posix(); step=data.get('testing',{}).get('build_step','')
 if source_path not in build: fail(ROOT/'build.zig',f'missing source registration {source_path}')
 if not step or f'"{step}"' not in build: fail(ROOT/'build.zig',f'missing dedicated step {step}')
 val=data.get('validation',{})
 if val.get('compiler_validated') and (not val.get('compiler_version') or not val.get('last_validated_commit') or val.get('last_validation_result')!='pass'):
  fail(directory/'details.json','compiler validation claimed without version, commit, and pass evidence')
# Duplicate numeric prefixes are numbering drift.
prefixes={}
for d in modules: prefixes.setdefault(d.name.split('-',1)[0],[]).append(d.name)
for prefix,names in prefixes.items():
 if len(names)>1: fail(PROJECTS,f'duplicate numeric prefix {prefix}: {names}')
if errors:
 print('\n'.join(f'ERROR: {e}' for e in errors)); print(f'FAILED: {len(errors)} consistency error(s)'); sys.exit(1)
print(f'PASS: {len(modules)} module contracts are schema-valid, complete, cataloged, dependency-resolvable, and build-registered.')
