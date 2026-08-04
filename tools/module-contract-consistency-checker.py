#!/usr/bin/env python3
"""Validate JSON Schema separately from repository composition consistency."""
import json,re,subprocess,sys
from pathlib import Path
try:
 from jsonschema import Draft202012Validator
 from jsonschema.exceptions import SchemaError
except ImportError:
 print('SCHEMA ERROR: install tools/requirements.txt (jsonschema is required)',file=sys.stderr);raise SystemExit(2)
ROOT=Path(__file__).resolve().parents[1]; PROJECTS=ROOT/'projects'; errors=[]; schema_errors=[]
def rel(p):
 try:return p.relative_to(ROOT).as_posix()
 except ValueError:return str(p)
def fail(path,msg):errors.append(f'{rel(path)}: {msg}')
def jpath(parts):return '$'+''.join(f'[{p}]' if isinstance(p,int) else f'.{p}' for p in parts)
try:schema=json.loads((ROOT/'details.schema.json').read_text());Draft202012Validator.check_schema(schema)
except (json.JSONDecodeError,SchemaError) as e:
 print(f'SCHEMA ERROR: details.schema.json: {e}',file=sys.stderr);raise SystemExit(2)
validator=Draft202012Validator(schema);catalog=(ROOT/'MODULES.md').read_text();build=(ROOT/'build.zig').read_text();modules=[];contracts={}
for directory in sorted(p for p in PROJECTS.iterdir() if p.is_dir()):
 srcs=sorted((directory/'src').glob('*.zig')) if (directory/'src').is_dir() else []
 if not srcs:fail(directory,'implemented module has no src/*.zig');continue
 modules.append(directory); path=directory/'details.json'
 for name in ('README.md','MASTERY.md','DETAILS.md','details.json'):
  if not (directory/name).is_file():fail(directory,f'missing required file {name}')
 if len(srcs)!=1:fail(directory,f'expected one canonical public source entrypoint, found {len(srcs)}')
 if not (directory/'tests/smoke_test.zig').is_file():fail(directory,'missing external tests/smoke_test.zig')
 try:data=json.loads(path.read_text())
 except Exception as e:schema_errors.append(f'{rel(path)}: invalid JSON: {e}');continue
 contracts[directory.name]=data
 for e in sorted(validator.iter_errors(data),key=lambda x:list(x.absolute_path)):
  schema_errors.append(f'{rel(path)}:{jpath(e.absolute_path)}: {e.message}')
 expected_id,expected=directory.name.split('-',1);mod=data.get('module',{});loc=data.get('locations',{});testing=data.get('testing',{});smoke=data.get('smoke_test',{})
 if mod.get('id')!=expected_id:fail(path,f'module.id must match directory prefix {expected_id}')
 if mod.get('canonical_name')!=expected:fail(path,f'canonical_name must be {expected!r}')
 if mod.get('directory')!=rel(directory):fail(path,'module.directory does not match canonical directory')
 expected_src=f'{rel(directory)}/src/{expected.replace("-","_")}.zig'
 if loc.get('public_entrypoint')!=expected_src:fail(path,f'public_entrypoint must be {expected_src}')
 expected_unit=f'test-{expected}';expected_smoke=f'smoke-{expected}'
 if testing.get('build_step')!=expected_unit:fail(path,f'testing.build_step must be {expected_unit}')
 if smoke.get('build_step')!=expected_smoke:fail(path,f'smoke_test.build_step must be {expected_smoke}')
 # Every declared location path is verified, including lists.
 for field,value in loc.items():
  for item in value if isinstance(value,list) else [value]:
   if item and not (ROOT/item).exists():fail(path,f'locations.{field} path does not exist: {item}')
 source='\n'.join(p.read_text() for p in srcs)
 declared=set(data.get('public_surface',{}).get('root_symbols',[]));actual=set(re.findall(r'^pub\s+(?:const|fn|var)\s+([A-Za-z_]\w*)',source,re.M))
 if declared!=actual:fail(path,f'root_symbols mismatch: contract={sorted(declared)}, source={sorted(actual)}')
 endpoint_names={x.get('name') for x in data.get('public_surface',{}).get('endpoints',[])}
 public_fns=set(re.findall(r'^\s*pub\s+fn\s+([A-Za-z_]\w*)',source,re.M))
 missing=public_fns-endpoint_names
 if missing:fail(path,f'public functions/methods missing endpoint contracts: {sorted(missing)}')
 for ep in data.get('public_surface',{}).get('endpoints',[]):
  if not ep.get('inputs') and '(' in ep.get('signature','') and ep['signature'].split('(',1)[1].split(')',1)[0].strip() and ep.get('receiver') is None:fail(path,f'endpoint {ep.get("name")} has parameters but no structured inputs')
  if not ep.get('outputs'):fail(path,f'endpoint {ep.get("name")} has no structured output')
 for err in data.get('failure_behavior',{}).get('errors',[]):
  if err.get('name') and err['name'] not in source:fail(path,f'documented error {err["name"]} does not appear in source')
 if f'| `{directory.name}` |' not in catalog or sum(line.startswith(f'| `{directory.name}` |') for line in catalog.splitlines())!=1:fail(ROOT/'MODULES.md',f'{directory.name} must appear exactly once')
 if f'({rel(directory)}/DETAILS.md)' not in catalog or f'({rel(directory)}/details.json)' not in catalog:fail(ROOT/'MODULES.md',f'{directory.name} lacks human or machine contract link')
 if expected_src not in build or f'"{expected}"' not in build:fail(ROOT/'build.zig',f'missing named module/source registration for {expected}')
 if expected_unit not in json.dumps(data) or expected_smoke not in json.dumps(data):fail(path,'dedicated test step metadata is incomplete')
 smoke_source=(directory/'tests/smoke_test.zig').read_text() if (directory/'tests/smoke_test.zig').exists() else ''
 if f'@import("{expected}")' not in smoke_source:fail(directory/'tests/smoke_test.zig',f'must consume named public import {expected}')
 for dep in data.get('dependency_contracts',[]):
  name=dep.get('module',''); candidates=list(PROJECTS.glob(f'*-{name}'))
  if len(candidates)!=1:fail(path,f'dependency module is not unique: {name}');continue
  for key in ('import_path','contract_path'):
   if not dep.get(key) or not (ROOT/dep[key]).is_file():fail(path,f'dependency {key} does not exist: {dep.get(key)}')
  dep_source=(ROOT/dep['import_path']).read_text() if dep.get('import_path') and (ROOT/dep['import_path']).is_file() else ''
  for symbol in dep.get('symbols_used',[]):
   if not re.search(rf'^pub\s+(?:const|fn|var)\s+{re.escape(symbol)}\b',dep_source,re.M):fail(path,f'dependency symbol {symbol} is not public')
  if f'@import("{dep.get("import_name")}")' not in source:fail(path,f'named dependency import missing from source: {dep.get("import_name")}')
  if f'"{dep.get("import_name")}"' not in build:fail(ROOT/'build.zig',f'dependency not registered: {dep.get("import_name")}')
 val=data.get('validation',{});dims=val.get('status_dimensions',{})
 if val.get('compiler_validated') and (not val.get('compiler_version') or not val.get('last_validated_commit') or val.get('last_validation_result')!='pass'):fail(path,'compiler validation claimed without exact version, commit, and pass')
 for claim in ('unit_tests_passed','smoke_tests_passed','contract_checker_passed'):
  if dims.get(claim) and (not val.get('last_validated_commit') or not val.get('compiler_version')):fail(path,f'{claim} claimed without validation evidence')
# Generated fast manifest must exactly reflect contracts.
expected_manifest={"modules":[{"id":d["module"]["id"],"canonical_name":d["module"]["canonical_name"],"directory":d["module"]["directory"],"public_entrypoint":d["locations"]["public_entrypoint"],"details":d["locations"]["details_json"],"unit_test_step":d["testing"]["build_step"],"smoke_test_step":d["smoke_test"]["build_step"]} for _,d in sorted(contracts.items())]}
try: manifest=json.loads((ROOT/'modules.json').read_text())
except Exception as e:fail(ROOT/'modules.json',f'invalid or missing generated manifest: {e}');manifest=None
if manifest is not None and manifest!=expected_manifest:fail(ROOT/'modules.json','manifest drift; regenerate from details.json contracts')
# Canonical formatting is an independent repository consistency dimension.
fmt=subprocess.run([sys.executable,str(ROOT/'tools/format-module-contracts.py'),'--check'],cwd=ROOT,text=True,capture_output=True)
if fmt.returncode:errors.extend(line for line in fmt.stderr.splitlines() if line)
# Stale canonical path spellings are forbidden outside explicit history fields.
stale=('projects/02-'+'dynamic-array','projects/03-'+'ring-buffer','src/fixed_'+'vector.zig','src/bounded_'+'reader.zig','src/alignment_'+'helpers.zig','src/physical_page_frame_'+'conversion.zig')
for p in ROOT.rglob('*'):
 if not p.is_file() or '.git' in p.parts or p.name=='AGENTS.md':continue
 try:text=p.read_text()
 except UnicodeDecodeError:continue
 for old in stale:
  if old in text:fail(p,f'stale path/name remains: {old}')
prefixes={}
for d in modules:prefixes.setdefault(d.name.split('-',1)[0],[]).append(d.name)
for prefix,names in prefixes.items():
 if len(names)>1:fail(PROJECTS,f'duplicate numeric prefix {prefix}: {names}')
if schema_errors:
 print('\n'.join('SCHEMA ERROR: '+e for e in schema_errors));print(f'SCHEMA VALIDATION FAILED: {len(schema_errors)} error(s)')
if errors:
 print('\n'.join('CONSISTENCY ERROR: '+e for e in errors));print(f'REPOSITORY CONSISTENCY FAILED: {len(errors)} error(s)')
if schema_errors or errors:raise SystemExit(2 if schema_errors else 1)
print(f'PASS: {len(modules)} strict module contracts are schema-valid, canonically formatted, complete, cataloged, dependency-resolvable, smoke-present, and build-registered.')
print('NOTE: public-surface/signature checks are approximate static analysis; Zig compilation remains authoritative.')
