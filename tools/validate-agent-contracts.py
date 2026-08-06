#!/usr/bin/env python3
"""Validate the optional agent-readable pilot, proof claims, fixtures, and projections."""
import argparse,json,pathlib,re,subprocess,sys,tempfile
from repository import ROOT, contracts, dependencies
PILOTS={'fixed-capacity-object-pool','fixed-free-list','fixed-bump-allocator','fixed-capacity-priority-queue','fixed-capacity-topological-sort'}
def validate_documents(cs):
 import jsonschema
 schema=json.loads((ROOT/'details.schema.json').read_text()); proof_schema=json.loads((ROOT/'schemas/module-proof.schema.json').read_text()); names={d['module']['canonical_name'] for d in cs}; recipe_names={json.loads(p.read_text())['name'] for p in (ROOT/'recipes').glob('*/recipe.json')}; generated_symbols={(x['module'],x['symbol']) for x in json.loads((ROOT/'generated/public-symbols.json').read_text())['symbols']}; seen=set(); errors=[]
 pilots={d['module']['canonical_name'] for d in cs if d.get('agent_contract')}
 if pilots!=PILOTS: errors.append(f'pilot set differs: expected={sorted(PILOTS)} actual={sorted(pilots)}')
 if len(cs)-len(pilots)!=45: errors.append(f'expected 45 pending modules, found {len(cs)-len(pilots)}')
 build=(ROOT/'build.zig').read_text(); commands=(ROOT/'COMMANDS.md').read_text()
 for d in cs:
  a=d.get('agent_contract'); n=d['module']['canonical_name']
  if not a: continue
  try: jsonschema.Draft202012Validator(schema['properties']['agent_contract']).validate(a)
  except Exception as e: errors.append(f'{n}: agent schema: {e.message}')
  if a['entrypoint']!=d['locations']['public_entrypoint']: errors.append(f'{n}: entrypoint disagrees with canonical location')
  if sorted(a['dependency_ids'])!=dependencies(d): errors.append(f'{n}: dependency_ids disagree with canonical dependencies')
  for dep in a['dependency_ids']:
   if dep not in names: errors.append(f'{n}: missing dependency {dep}')
  for recipe in a['recipes']:
   if recipe not in recipe_names: errors.append(f'{n}: missing recipe {recipe}')
  for symbol in a['public_symbols']:
   if (n,symbol) not in generated_symbols: errors.append(f'{n}: symbol not in generated extraction: {symbol}')
  for command in a['validation_commands']:
   step=command.removeprefix('zig build ')
   if f'b.step("{step}"' not in build and command not in commands: errors.append(f'{n}: validation command is not declared: {command}')
  proofpath=a['proof_contract']
  if proofpath:
   pp=ROOT/proofpath
   if not pp.is_file(): errors.append(f'{n}: missing proof contract {proofpath}')
   else:
    proof=json.loads(pp.read_text())
    try: jsonschema.Draft202012Validator(proof_schema).validate(proof)
    except Exception as e: errors.append(f'{n}: proof schema: {e.message}')
    ids=[x.get('id') for x in proof.get('claims',[])]
    if len(ids)!=len(set(ids)): errors.append(f'{n}: duplicate proof claim ID')
    for claim in proof.get('claims',[]):
     if 'formal proof' in claim.get('description','').lower(): errors.append(f'{n}: unsupported formal-proof wording')
     for ref in claim.get('evidence_references',[]):
      if not (ROOT/ref).exists(): errors.append(f'{n}: missing evidence reference {ref}')
  exp_path=ROOT/d['module']['directory']/'tests/agent/expectations.json'
  if not exp_path.is_file(): errors.append(f'{n}: missing agent fixture expectations')
  for dg in a['diagnostics']:
   if dg['id'] in seen: errors.append(f'duplicate diagnostic ID {dg["id"]}')
   seen.add(dg['id'])
   for key in ('fixture','repair_example'):
    if not (ROOT/dg[key]).is_file(): errors.append(f'{n}: missing {key} {dg[key]}')
   if dg['fixture_classification']=='zig_compile_fail' and not dg['zig_rejects']: errors.append(f'{n}: compile-fail fixture not marked rejected')
 return errors
def self_test():
 cs=contracts(); broken=json.loads(json.dumps(cs)); pilots=[d for d in broken if d.get('agent_contract')]; pilots[1]['agent_contract']['diagnostics'][0]['id']=pilots[0]['agent_contract']['diagnostics'][0]['id']; e=validate_documents(broken)
 if not any('duplicate diagnostic' in x for x in e): raise RuntimeError('negative test failed to reject duplicate diagnostic ID')
 broken=json.loads(json.dumps(cs)); next(d for d in broken if d.get('agent_contract'))['agent_contract']['dependency_ids']=['missing-module']; e=validate_documents(broken)
 if not any('dependency_ids disagree' in x or 'missing dependency' in x for x in e): raise RuntimeError('negative test failed to reject missing dependency')
 print('PASS: negative validator tests rejected duplicate diagnostics and invalid dependencies')
def main():
 p=argparse.ArgumentParser(); p.add_argument('--self-test',action='store_true'); a=p.parse_args()
 try:
  if a.self_test: self_test(); return 0
  errors=validate_documents(contracts())
  result=subprocess.run([sys.executable,'tools/build-agent-index.py','--check'],cwd=ROOT)
  if result.returncode: errors.append('generated agent indexes are stale')
  if errors:
   print('\n'.join('AGENT CONTRACT ERROR: '+x for x in errors),file=sys.stderr); return 1
  print('PASS: 5 agent-readable contracts validated; 45 modules are pending migration (not invalid).')
  return 0
 except Exception as e: print(f'AGENT CONTRACT ERROR: {e}',file=sys.stderr); return 1
if __name__=='__main__': raise SystemExit(main())
