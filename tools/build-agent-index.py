#!/usr/bin/env python3
"""Generate compact deterministic agent projections from canonical details.json contracts."""
import argparse, json, sys
from repository import ROOT, GENERATED, contracts, dependencies
OUT=GENERATED/'agent'; VERSION='1.0.0'
def dump(x): return json.dumps(x,indent=2,sort_keys=True,ensure_ascii=False)+'\n'
def header(**values): return {'_generated':True,'_notice':'GENERATED FILE — DO NOT EDIT DIRECTLY','generator':'tools/build-agent-index.py','agent_index_version':VERSION,**values}
def build():
 cs=contracts(); modules=[]; capabilities={}; symbols={}; diagnostics={}; recipes={}; deps={}
 for d in cs:
  n=d['module']['canonical_name']; a=d.get('agent_contract'); status='agent-readable' if a else 'pending-migration'
  item={'id':d['module']['id'],'module':n,'status':status,'details':d['locations']['details_json'],'source':d['locations']['public_entrypoint']}
  if a:
   item.update({'summary':a['summary'],'aliases':sorted(a['search_aliases']),'capabilities':sorted(a['capability_ids']),'effects':sorted(a['effects']),'ownership':a['ownership'],'borrowing':a['borrowing'],'invalidation':a['invalidation'],'proof_contract':a['proof_contract']})
   for x in a['capability_ids']: capabilities.setdefault(x,[]).append(n)
   for x in a['public_symbols']: symbols.setdefault(x,[]).append(n)
   for x in a['recipes']: recipes.setdefault(x,[]).append(n)
   for x in a['diagnostics']: diagnostics[x['id']]={'module':n,'title':x['title'],'classification':x['fixture_classification'],'evidence_status':x['evidence_status'],'fixture':x['fixture'],'repair_example':x['repair_example'],'repair_strategy':x['repair_strategy'],'details':d['locations']['details_json']}
  modules.append(item); deps[n]={'dependencies':dependencies(d),'status':status}
 modules.sort(key=lambda x:x['id'])
 return {'modules.json':dump(header(modules=modules)),'modules.jsonl':'\n'.join(json.dumps(x,sort_keys=True,separators=(',',':')) for x in modules)+'\n','capabilities.json':dump(header(capabilities={k:sorted(v) for k,v in sorted(capabilities.items())})),'symbols.json':dump(header(symbols={k:sorted(v) for k,v in sorted(symbols.items())})),'diagnostics.json':dump(header(diagnostics={k:v for k,v in sorted(diagnostics.items())})),'recipes.json':dump(header(recipes={k:sorted(v) for k,v in sorted(recipes.items())})),'dependencies.json':dump(header(dependencies={k:v for k,v in sorted(deps.items())}))}
def main():
 p=argparse.ArgumentParser(); p.add_argument('--check',action='store_true'); a=p.parse_args(); out=build(); stale=[]
 if not a.check: OUT.mkdir(parents=True,exist_ok=True)
 for name,text in out.items():
  path=OUT/name
  if a.check:
   if not path.exists() or path.read_text()!=text: stale.append(str(path.relative_to(ROOT)))
  else: path.write_text(text)
 if stale: print('stale agent indexes: '+', '.join(stale),file=sys.stderr); return 1
 print(('checked' if a.check else 'generated')+f' {len(out)} deterministic agent indexes (5 agent-readable, 45 pending)')
 return 0
if __name__=='__main__': raise SystemExit(main())
