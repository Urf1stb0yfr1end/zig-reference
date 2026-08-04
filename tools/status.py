#!/usr/bin/env python3
import json,pathlib
p=pathlib.Path(__file__).resolve().parents[1]/"generated/repository-health.json"
d=json.loads(p.read_text()); print(json.dumps({k:v for k,v in d.items() if k not in ("generated","generator","definitions")},indent=2,sort_keys=True))
