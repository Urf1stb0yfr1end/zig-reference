#!/usr/bin/env python3
"""Create a strict, exhaustive, deliberately unverified module contract template."""
import argparse,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SCHEMA=json.loads((ROOT/'details.schema.json').read_text())
def resolve(s):
 if '$ref' in s:
  n=SCHEMA
  for p in s['$ref'].removeprefix('#/').split('/'): n=n[p]
  return n
 if 'anyOf' in s:return resolve(s['anyOf'][0])
 return s
def blank(s):
 s=resolve(s);t=s.get('type')
 if isinstance(t,list):t=t[0]
 if t=='object':return {k:blank(s['properties'][k]) for k in s.get('required',[])}
 if t=='array':return []
 if t=='boolean':return False
 if t in ('integer','number'):return 0
 if t=='null':return None
 return ''
def main():
 p=argparse.ArgumentParser();p.add_argument('--module-id',required=True);p.add_argument('--canonical-name',required=True);p.add_argument('--force',action='store_true');a=p.parse_args()
 mid=a.module_id.zfill(2);name=a.canonical_name;directory=ROOT/'projects'/f'{mid}-{name}';out=directory/'details.json'
 if out.exists() and not a.force:raise SystemExit(f'refusing to overwrite {out}; pass --force explicitly')
 d=blank(SCHEMA); rel=directory.relative_to(ROOT).as_posix();src=f'{rel}/src/{name.replace("-","_")}.zig';smoke=f'{rel}/tests/smoke_test.zig'
 d.update(schema_version='3.0.0',contract_version='0.1.0')
 d['module'].update(id=mid,canonical_name=name,display_name=name.replace('-',' ').title(),directory=rel,status='planned-unverified',maturity='planned')
 d['locations'].update(module_root=rel,implementation=[src],public_entrypoint=src,unit_tests=[src],smoke_tests=[smoke],readme=f'{rel}/README.md',mastery=f'{rel}/MASTERY.md',details_markdown=f'{rel}/DETAILS.md',details_json=f'{rel}/details.json')
 d['composition'].update(import_name=name,import_path=src)
 d['testing'].update(build_step=f'test-{name}',smoke_test_commands=[f'zig build smoke-{name}'])
 d['smoke_test'].update(required=True,implemented=False,status='not-implemented',source_path=smoke,build_step=f'smoke-{name}',commands=[f'zig build smoke-{name}'],public_import_used=name,forbidden_private_access=True,last_result='unverified')
 d['validation']['status_dimensions'].update(implementation_present=False,contract_complete=False,contract_formatted=True,unit_tests_present=False,smoke_test_present=False,contract_checker_passed=False,compiler_validated=False,unit_tests_passed=False,smoke_tests_passed=False)
 directory.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(d,indent=2)+'\n');print(out.relative_to(ROOT))
if __name__=='__main__':main()
