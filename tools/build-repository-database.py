#!/usr/bin/env python3
"""Build a disposable SQLite acceleration index; never a canonical artifact."""
import argparse,json,pathlib,sqlite3,tempfile
from repository import ROOT, GENERATED

SCHEMA="""
CREATE TABLE modules(name TEXT PRIMARY KEY,id TEXT,directory TEXT,status TEXT);
CREATE TABLE lifecycle(module TEXT PRIMARY KEY,value TEXT);
CREATE TABLE maturity(module TEXT PRIMARY KEY,level INTEGER);
CREATE TABLE symbols(module TEXT,symbol TEXT,PRIMARY KEY(module,symbol));
CREATE TABLE endpoints(module TEXT,name TEXT,kind TEXT,signature TEXT);
CREATE TABLE endpoint_inputs(module TEXT,endpoint TEXT,name TEXT,type TEXT);
CREATE TABLE endpoint_outputs(module TEXT,endpoint TEXT,name TEXT,type TEXT);
CREATE TABLE endpoint_errors(module TEXT,endpoint TEXT,error TEXT);
CREATE TABLE dependencies(module TEXT,dependency TEXT,PRIMARY KEY(module,dependency));
CREATE TABLE reverse_dependencies(module TEXT,dependent TEXT,PRIMARY KEY(module,dependent));
CREATE TABLE capabilities(capability TEXT,module TEXT,PRIMARY KEY(capability,module));
CREATE TABLE capability_aliases(capability TEXT,alias TEXT,PRIMARY KEY(capability,alias));
CREATE TABLE tests(module TEXT,path TEXT,kind TEXT);
CREATE TABLE validation_evidence(module TEXT,path TEXT,result TEXT);
CREATE TABLE port_contracts(module TEXT PRIMARY KEY,path TEXT,baseline TEXT);
CREATE TABLE port_risks(module TEXT,risk TEXT);
CREATE TABLE source_paths(module TEXT,path TEXT,PRIMARY KEY(module,path));
CREATE TABLE documentation_paths(module TEXT,path TEXT,PRIMARY KEY(module,path));
CREATE TABLE recipes(name TEXT PRIMARY KEY,path TEXT);
CREATE TABLE recipe_modules(recipe TEXT,module TEXT,PRIMARY KEY(recipe,module));
"""
def load(name): return json.loads((GENERATED/f"{name}.json").read_text())
def create(path):
    db=sqlite3.connect(path); db.executescript(SCHEMA)
    modules=load("modules")["modules"]
    for m in modules:
        db.execute("INSERT INTO modules VALUES(?,?,?,?)",(m["name"],m["id"],m["directory"],m["status"]))
        db.execute("INSERT INTO source_paths VALUES(?,?)",(m["name"],m["source"]))
        db.execute("INSERT INTO documentation_paths VALUES(?,?)",(m["name"],m["details"]))
    for x in load("status")["status"]:
        db.execute("INSERT INTO lifecycle VALUES(?,?)",(x["module"],x["lifecycle"])); db.execute("INSERT INTO maturity VALUES(?,?)",(x["module"],x["maturity_level"]))
    for x in load("public-symbols")["symbols"]: db.execute("INSERT INTO symbols VALUES(?,?)",(x["module"],x["symbol"]))
    for x in load("endpoints")["endpoints"]: db.execute("INSERT INTO endpoints VALUES(?,?,?,?)",(x["module"],x["name"],x["kind"],x["signature"]))
    for x in load("errors")["errors"]: db.execute("INSERT INTO endpoint_errors VALUES(?,?,?)",(x["module"],x["endpoint"],x["error"]))
    for m,ds in load("dependencies")["dependencies"].items():
        for d in ds: db.execute("INSERT INTO dependencies VALUES(?,?)",(m,d))
    for m,ds in load("reverse-dependencies")["reverse_dependencies"].items():
        for d in ds: db.execute("INSERT INTO reverse_dependencies VALUES(?,?)",(m,d))
    for x in load("capabilities")["capabilities"]:
        for m in x["modules"]: db.execute("INSERT INTO capabilities VALUES(?,?)",(x["capability"],m))
    for x in load("ports")["ports"]:
        db.execute("INSERT INTO port_contracts VALUES(?,?,?)",(x["module"],x["path"],json.dumps(x["baseline"],sort_keys=True)))
        for risk in x["risks"]: db.execute("INSERT INTO port_risks VALUES(?,?)",(x["module"],json.dumps(risk,sort_keys=True)))
    for p in sorted((ROOT/"recipes").glob("*/recipe.json")):
        r=json.loads(p.read_text()); name=r["name"]; db.execute("INSERT INTO recipes VALUES(?,?)",(name,str(p.relative_to(ROOT))))
        for m in r.get("modules",[]): db.execute("INSERT INTO recipe_modules VALUES(?,?)",(name,m))
    db.commit(); return db
def main():
    ap=argparse.ArgumentParser(); ap.add_argument("--output",type=pathlib.Path,default=ROOT/"zig-cache/generated/zig-reference.sqlite"); ap.add_argument("--check",action="store_true"); a=ap.parse_args()
    if a.check:
        with tempfile.TemporaryDirectory() as td:
            db=create(pathlib.Path(td)/"index.sqlite")
            counts={t:db.execute(f"SELECT count(*) FROM {t}").fetchone()[0] for t in ("modules","dependencies","symbols","endpoints","port_contracts","recipes")}
            expected=len(load("modules")["modules"])
            if counts["modules"]!=expected or counts["port_contracts"]!=len(load("ports")["ports"]): raise SystemExit("database/index count mismatch")
            print(json.dumps({"database_consistent":True,"temporary":True,"counts":counts},indent=2,sort_keys=True)); db.close()
    else:
        a.output.parent.mkdir(parents=True,exist_ok=True); a.output.unlink(missing_ok=True); db=create(a.output); db.close(); print(f"generated ignored local database: {a.output.relative_to(ROOT)}")
if __name__=="__main__": main()
