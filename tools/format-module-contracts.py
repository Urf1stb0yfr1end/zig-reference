#!/usr/bin/env python3
"""Format module contracts using schema property order and two-space JSON."""
import argparse,json,sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SCHEMA=json.loads((ROOT/'details.schema.json').read_text())
def resolve(schema,value):
 if '$ref' in schema:
  node=SCHEMA
  for part in schema['$ref'].removeprefix('#/').split('/'): node=node[part]
  return node
 if 'anyOf' in schema:
  kinds={'object':dict,'array':list,'string':str,'boolean':bool,'integer':int,'null':type(None)}
  for choice in schema['anyOf']:
   candidate=resolve(choice,value); typ=candidate.get('type')
   if typ in kinds and isinstance(value,kinds[typ]) and not (typ=='integer' and isinstance(value,bool)): return candidate
 return schema
def ordered(value,schema):
 schema=resolve(schema,value)
 if isinstance(value,dict):
  props=schema.get('properties',{})
  return {k:ordered(value[k],props.get(k,{})) for k in props if k in value} | {k:ordered(v,{}) for k,v in value.items() if k not in props}
 if isinstance(value,list): return [ordered(v,schema.get('items',{})) for v in value]
 return value
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--check',action='store_true');args=ap.parse_args();bad=[]
 for path in sorted((ROOT/'projects').glob('*/details.json')):
  try:data=json.loads(path.read_text())
  except Exception as e: print(f'ERROR: {path.relative_to(ROOT)}: {e}',file=sys.stderr);bad.append(path);continue
  canonical=json.dumps(ordered(data,SCHEMA),indent=2,ensure_ascii=False)+'\n'
  if path.read_text()!=canonical:
   if args.check: bad.append(path);print(f'ERROR: {path.relative_to(ROOT)} is not in canonical two-space schema order',file=sys.stderr)
   else:path.write_text(canonical);print(f'formatted {path.relative_to(ROOT)}')
 if bad: return 1
 print(f'PASS: {len(list((ROOT/"projects").glob("*/details.json")))} contracts are canonically formatted.')
 return 0
if __name__=='__main__':raise SystemExit(main())
