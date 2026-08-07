#!/usr/bin/env python3
"""Narrow regression coverage for final, truthful developer handoffs."""
import subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]

def run(*args): return subprocess.run(args,cwd=ROOT,text=True,capture_output=True)
def assert_handoff(text,status,command):
    lines=text.splitlines(); assert lines.count("LOCATIONS")==1; assert lines.count("MINIMUS")==1
    assert lines.index("LOCATIONS") < lines.index("MINIMUS")
    assert len(lines[lines.index("MINIMUS"):]) <= 200
    assert f"status: {status}" in lines and f"command: {command}" in lines
    uris=[x.split("file://",1)[1] for x in lines if "file://" in x]
    assert uris and all(Path(x).exists() for x in uris)
    assert text.rstrip().endswith("="*60)

def main():
    fmt=[sys.executable,"tools/developer-minimus.py","--command","test","--summary","ordinary output preserved","--location","contract=details.schema.json"]
    first,second=run(*fmt),run(*fmt); assert first.returncode==second.returncode==0 and first.stdout==second.stdout
    assert_handoff(first.stdout,"PASS","test")
    doctor=run(sys.executable,"tools/query-reference.py","agent","doctor"); assert doctor.returncode==0 and doctor.stdout.startswith('{"diagnostics"'); assert_handoff(doctor.stdout,"PASS","python3 tools/query-reference.py agent doctor")
    success=run(sys.executable,"tools/developer-command.py","smoke","--test-exit","0"); assert success.returncode==0; assert success.stdout.index("Build Summary:") < success.stdout.index("LOCATIONS"); assert_handoff(success.stdout,"PASS","python3 tools/developer-command.py smoke")
    failure=run(sys.executable,"tools/developer-command.py","validate-repository","--test-exit","7"); assert failure.returncode==7; assert failure.stdout.index("Build Summary:") < failure.stdout.index("LOCATIONS"); assert_handoff(failure.stdout,"FAIL","python3 tools/developer-command.py validate-repository"); assert failure.stdout.count("status: PASS")==0
    focused=run("zig","build","test-ring-buffer"); assert "MINIMUS" not in focused.stdout+focused.stderr
    print("PASS: final outer handoffs are deterministic, singular, ordered, and exit-status truthful")
if __name__ == "__main__": main()
