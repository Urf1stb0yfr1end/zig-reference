#!/usr/bin/env python3
import pathlib,subprocess,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
forbidden={".sqlite",".sqlite3",".db",".o",".obj",".a",".so",".dll",".dylib",".exe",".elf",".bin",".img",".iso",".qcow2",".raw",".core",".dmp",".profraw",".profdata",".pdf",".png",".jpg",".jpeg",".gif",".zip",".gz",".xz",".tar"}
tracked=subprocess.check_output(["git","ls-files","-z"],cwd=ROOT).split(b"\0")
errors=[]
for raw in tracked:
    if not raw: continue
    rel=raw.decode(); path=ROOT/rel
    if path.suffix.lower() in forbidden: errors.append(f"forbidden tracked artifact: {rel}")
    if path.is_file() and b"\0" in path.read_bytes(): errors.append(f"tracked file contains NUL byte: {rel}")
if (ROOT/"generated/zig-reference.sqlite").exists(): errors.append("legacy generated/zig-reference.sqlite exists")
if errors: print("\n".join(errors),file=sys.stderr); raise SystemExit(1)
print(f"repository policy passed: {len(tracked)-1} tracked files are text and no prohibited artifact is tracked")
