#!/usr/bin/env python3
"""Deterministic Failure State Capsule and invariant diagnosis regressions."""
import json, subprocess, sys
from pathlib import Path
from jsonschema import Draft202012Validator
from repository import ROOT

schema=json.loads((ROOT/'schemas/failure-state-capsule.schema.json').read_text())
validator=Draft202012Validator(schema)
known=['scheduler-time-reversed.json','resource-plan-memory-exceeded.json','event-trace-full.json']
for name in known:
    path=ROOT/'fixtures/failure-state-capsules'/name
    validator.validate(json.loads(path.read_text()))
    command=[sys.executable,'tools/query-reference.py','agent','diagnose','--capsule',str(path.relative_to(ROOT))]
    first=subprocess.run(command,cwd=ROOT,capture_output=True,check=True).stdout
    second=subprocess.run(command,cwd=ROOT,capture_output=True,check=True).stdout
    assert first == second and json.loads(first)['results']['classification']=='KNOWN'
for name in ['scheduler-insufficient.json','unknown.json']:
    path=ROOT/'fixtures/failure-state-capsules'/name
    result=subprocess.run([sys.executable,'tools/query-reference.py','agent','diagnose','--capsule',str(path.relative_to(ROOT))],cwd=ROOT,capture_output=True,check=True)
    assert json.loads(result.stdout)['results']['classification']=='UNKNOWN'
malformed=subprocess.run([sys.executable,'tools/query-reference.py','agent','diagnose','--capsule','fixtures/failure-state-capsules/malformed.json'],cwd=ROOT,capture_output=True)
assert malformed.returncode != 0 and json.loads(malformed.stdout)['diagnostics'][0]['code']=='ZIGREF-FAILURE-CAPSULE-INVALID'
candidate=subprocess.run([sys.executable,'tools/query-reference.py','agent','diagnose','TimeReversed'],cwd=ROOT,capture_output=True,check=True)
assert 'classification' not in json.loads(candidate.stdout).get('results',[{}])[0]
print('PASS: Failure State Capsules validate; 3 known diagnoses repeat byte-for-byte; insufficient evidence stays UNKNOWN; malformed input fails closed.')
