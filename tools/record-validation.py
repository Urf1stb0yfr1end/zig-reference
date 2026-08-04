#!/usr/bin/env python3
import argparse,datetime,json,pathlib,platform,subprocess
from repository import ROOT,GENERATED,dump
def main():
    p=argparse.ArgumentParser(description="Record only commands actually executed by this process")
    p.add_argument("module"); p.add_argument("--command",action="append",required=True); p.add_argument("--target",default="native"); p.add_argument("--optimize",default="Debug"); p.add_argument("--ci-id"); a=p.parse_args()
    commands=[]
    for command in a.command:
        r=subprocess.run(command,shell=True,text=True,capture_output=True); commands.append({"command":command,"exit_code":r.returncode,"stdout_sha256":__import__('hashlib').sha256(r.stdout.encode()).hexdigest(),"stderr_sha256":__import__('hashlib').sha256(r.stderr.encode()).hexdigest()})
    def result(word):
        matching=[x for x in commands if word in x["command"]]; return "not-executed" if not matching else "passed" if all(x["exit_code"]==0 for x in matching) else "failed"
    try: zig=subprocess.check_output(["zig","version"],text=True).strip()
    except Exception: zig="unavailable"
    try: commit=subprocess.check_output(["git","rev-parse","HEAD"],cwd=ROOT,text=True).strip()
    except Exception: commit="unknown"
    data={"module":a.module,"commit":commit,"zig_version":zig,"operating_system":platform.system(),"architecture":platform.machine(),"target_triple":a.target,"optimization_mode":a.optimize,"commands_executed":commands,"exit_codes":[x["exit_code"] for x in commands],"contract_result":result("contract"),"unit_test_result":result("test"),"smoke_test_result":result("smoke"),"property_test_result":result("property"),"fuzz_result":result("fuzz"),"timestamp":datetime.datetime.now(datetime.timezone.utc).isoformat(),"ci_identifier":a.ci_id,"hashes":{},"warnings":[],"skipped_commands":[]}
    out=GENERATED/"validation"; out.mkdir(parents=True,exist_ok=True); path=out/f"{a.module}.json"; path.write_text(dump(data)); print(path.relative_to(ROOT)); raise SystemExit(0 if all(x["exit_code"]==0 for x in commands) else 1)
if __name__=="__main__": main()
