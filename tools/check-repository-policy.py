#!/usr/bin/env python3
import pathlib,subprocess,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
forbidden={".sqlite",".sqlite3",".db",".o",".obj",".a",".so",".dll",".dylib",".exe",".elf",".bin",".img",".iso",".qcow2",".raw",".core",".dmp",".profraw",".profdata",".pdf",".png",".jpg",".jpeg",".gif",".zip",".gz",".xz",".tar"}
# Curated project branding is intentionally tracked. This is an exact allowlist,
# not permission for generated images or arbitrary binary artifacts.
branding_allowlist={
    "Images/company-logo.png",
    "Images/jason made logo.png",
    "Images/logo.png",
    "Images/sticker logo.png",
}
tracked=subprocess.check_output(["git","ls-files","-z"],cwd=ROOT).split(b"\0")
errors=[]
for raw in tracked:
    if not raw: continue
    rel=raw.decode(); path=ROOT/rel
    allowed_branding=rel in branding_allowlist
    if path.suffix.lower() in forbidden and not allowed_branding: errors.append(f"forbidden tracked artifact: {rel}")
    if path.is_file() and b"\0" in path.read_bytes() and not allowed_branding: errors.append(f"tracked file contains NUL byte: {rel}")
if (ROOT/"generated/zig-reference.sqlite").exists(): errors.append("legacy generated/zig-reference.sqlite exists")
if (ROOT/"tools/build-repository-database.py").exists(): errors.append("database generator is forbidden by repository policy")
if 'b.step("database"' in (ROOT/"build.zig").read_text(): errors.append("zig build database is forbidden by repository policy")
if errors: print("\n".join(errors),file=sys.stderr); raise SystemExit(1)
print(f"repository policy passed: {len(tracked)-1} tracked files checked; only exact curated branding binaries are allowlisted")
