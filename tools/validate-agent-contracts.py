#!/usr/bin/env python3
"""Validate the optional agent-readable pilot, proof claims, fixtures, and projections."""
import argparse
import copy
import json
import pathlib
import subprocess
import sys
import tempfile

from repository import ROOT, contracts, dependencies

PILOTS = {
    "fixed-capacity-object-pool",
    "fixed-free-list",
    "fixed-bump-allocator",
    "fixed-capacity-priority-queue",
    "fixed-capacity-topological-sort",
    "bounded-system-resource-plan",
}
CLASSES = {
    "runtime_negative_test",
    "zig_compile_fail",
    "future_analyzer_expectation",
    "documented_misuse_example",
}
ASSERTION_MARKERS = ("testing.expect(", "testing.expectEqual(", "testing.expectError(")


def validate_documents(cs):
    import jsonschema

    schema = json.loads((ROOT / "details.schema.json").read_text())
    proof_schema = json.loads((ROOT / "schemas/module-proof.schema.json").read_text())
    names = {d["module"]["canonical_name"] for d in cs}
    recipe_names = {json.loads(p.read_text())["name"] for p in (ROOT / "recipes").glob("*/recipe.json")}
    generated_symbols = {
        (x["module"], x["symbol"])
        for x in json.loads((ROOT / "generated/public-symbols.json").read_text())["symbols"]
    }
    seen = set()
    errors = []
    pilots = {d["module"]["canonical_name"] for d in cs if d.get("agent_contract")}
    if pilots != PILOTS:
        errors.append(f"pilot set differs: expected={sorted(PILOTS)} actual={sorted(pilots)}")
    if len(cs) - len(pilots) != 45:
        errors.append(f"expected 45 pending modules, found {len(cs) - len(pilots)}")
    build = (ROOT / "build.zig").read_text()
    commands = (ROOT / "COMMANDS.md").read_text()

    for d in cs:
        agent = d.get("agent_contract")
        name = d["module"]["canonical_name"]
        if not agent:
            continue
        try:
            jsonschema.Draft202012Validator(schema["properties"]["agent_contract"]).validate(agent)
        except Exception as exc:
            errors.append(f"{name}: agent schema: {exc.message}")
        if agent["entrypoint"] != d["locations"]["public_entrypoint"]:
            errors.append(f"{name}: entrypoint disagrees with canonical location")
        if sorted(agent["dependency_ids"]) != dependencies(d):
            errors.append(f"{name}: dependency_ids disagree with canonical dependencies")
        for dependency in agent["dependency_ids"]:
            if dependency not in names:
                errors.append(f"{name}: missing dependency {dependency}")
        for recipe in agent["recipes"]:
            if recipe not in recipe_names:
                errors.append(f"{name}: missing recipe {recipe}")
        for symbol in agent["public_symbols"]:
            if (name, symbol) not in generated_symbols:
                errors.append(f"{name}: symbol not in generated extraction: {symbol}")
        for command in agent["validation_commands"]:
            step = command.removeprefix("zig build ")
            if f'b.step("{step}"' not in build and command not in commands:
                errors.append(f"{name}: validation command is not declared: {command}")

        proof_path = agent["proof_contract"]
        proof = None
        if proof_path:
            path = ROOT / proof_path
            if not path.is_file():
                errors.append(f"{name}: missing proof contract {proof_path}")
            else:
                proof = json.loads(path.read_text())
                try:
                    jsonschema.Draft202012Validator(proof_schema).validate(proof)
                except Exception as exc:
                    errors.append(f"{name}: proof schema: {exc.message}")
                ids = [claim.get("id") for claim in proof.get("claims", [])]
                if len(ids) != len(set(ids)):
                    errors.append(f"{name}: duplicate proof claim ID")
                for claim in proof.get("claims", []):
                    if "formal proof" in claim.get("description", "").lower():
                        errors.append(f"{name}: unsupported formal-proof wording")
                    if not claim.get("evidence_references"):
                        errors.append(f"{name}: proof claim has no evidence reference: {claim.get('id')}")
                    for reference in claim.get("evidence_references", []):
                        if not (ROOT / reference).exists():
                            errors.append(f"{name}: missing evidence reference {reference}")

        expectations_path = ROOT / d["module"]["directory"] / "tests/agent/expectations.json"
        expectations = []
        if not expectations_path.is_file():
            errors.append(f"{name}: missing agent fixture expectations")
        else:
            expectations_doc = json.loads(expectations_path.read_text())
            expectations = expectations_doc.get("expectations", [])
            if expectations_doc.get("module") != name:
                errors.append(f"{name}: expectation module differs")
        expected_by_id = {item.get("diagnostic_id"): item for item in expectations}
        diagnostic_ids = {item["id"] for item in agent["diagnostics"]}
        if set(expected_by_id) != diagnostic_ids:
            errors.append(f"{name}: fixture expectations disagree with diagnostics")

        for diagnostic in agent["diagnostics"]:
            diagnostic_id = diagnostic["id"]
            if diagnostic_id in seen:
                errors.append(f"duplicate diagnostic ID {diagnostic_id}")
            seen.add(diagnostic_id)
            classification = diagnostic["fixture_classification"]
            if classification not in CLASSES:
                errors.append(f"{name}: unsupported evidence class {classification}")
            expectation = expected_by_id.get(diagnostic_id)
            if expectation and any(
                expectation.get(key) != diagnostic.get(target)
                for key, target in (
                    ("fixture", "fixture"),
                    ("classification", "fixture_classification"),
                    ("zig_rejects", "zig_rejects"),
                    ("repair_example", "repair_example"),
                )
            ):
                errors.append(f"{name}: expectation metadata differs for {diagnostic_id}")
            for key in ("fixture", "repair_example"):
                if not (ROOT / diagnostic[key]).is_file():
                    errors.append(f"{name}: missing {key} {diagnostic[key]}")
            fixture_path = ROOT / diagnostic["fixture"]
            if classification == "zig_compile_fail" and not diagnostic["zig_rejects"]:
                errors.append(f"{name}: compile-fail fixture not marked rejected")
            if classification == "future_analyzer_expectation":
                if diagnostic["zig_rejects"]:
                    errors.append(f"{name}: future-analyzer fixture falsely marked zig_rejects: true")
                if diagnostic["evidence_status"] != "future_analyzer_expectation":
                    errors.append(f"{name}: future-analyzer fixture awarded test evidence")
            if classification == "documented_misuse_example" and diagnostic["evidence_status"] == "tested":
                errors.append(f"{name}: documented misuse fixture awarded test evidence")
            if classification == "runtime_negative_test":
                if diagnostic["evidence_status"] != "tested":
                    errors.append(f"{name}: runtime-negative fixture lacks tested evidence status")
                if fixture_path.is_file() and not any(marker in fixture_path.read_text() for marker in ASSERTION_MARKERS):
                    errors.append(f"{name}: runtime-negative fixture contains no actual assertion")
    return errors


def self_test():
    baseline = contracts()

    def pilot(documents, name="fixed-capacity-object-pool"):
        return next(d for d in documents if d["module"]["canonical_name"] == name)

    cases = []
    broken = copy.deepcopy(baseline)
    pilot(broken, "fixed-free-list")["agent_contract"]["diagnostics"][0]["id"] = pilot(broken)["agent_contract"]["diagnostics"][0]["id"]
    cases.append(("duplicate diagnostic ID", broken, "duplicate diagnostic ID"))

    broken = copy.deepcopy(baseline)
    pilot(broken)["agent_contract"]["dependency_ids"] = ["missing-module"]
    cases.append(("nonexistent dependency", broken, "missing dependency"))

    broken = copy.deepcopy(baseline)
    pilot(broken)["agent_contract"]["diagnostics"][0]["fixture"] = "does/not/exist.zig"
    cases.append(("nonexistent fixture", broken, "missing fixture"))

    broken = copy.deepcopy(baseline)
    pilot(broken)["agent_contract"]["diagnostics"][0]["repair_example"] = "does/not/exist-repair.zig"
    cases.append(("nonexistent repair fixture", broken, "missing repair_example"))

    broken = copy.deepcopy(baseline)
    pilot(broken)["agent_contract"]["diagnostics"][0]["fixture_classification"] = "ceremonial_test"
    cases.append(("unsupported evidence class", broken, "unsupported evidence class"))

    broken = copy.deepcopy(baseline)
    bump = pilot(broken, "fixed-bump-allocator")
    bump["agent_contract"]["diagnostics"][0]["zig_rejects"] = True
    cases.append(("future analyzer marked rejected", broken, "falsely marked zig_rejects"))

    broken = copy.deepcopy(baseline)
    runtime = pilot(broken)["agent_contract"]["diagnostics"][0]
    cases.append(("runtime negative without assertion", broken, "runtime-negative fixture contains no actual assertion"))

    broken = copy.deepcopy(baseline)
    cases.append(("proof claim without evidence", broken, "proof claim has no evidence reference"))

    with tempfile.TemporaryDirectory(prefix="zigref-agent-validator-") as temporary:
        temporary = pathlib.Path(temporary)
        no_assertion = temporary / "no_assertion.zig"
        no_assertion.write_text('test "ceremonial" { _ = 1; }\n')
        pilot(cases[6][1])["agent_contract"]["diagnostics"][0]["fixture"] = str(no_assertion)

        proof = json.loads((ROOT / pilot(cases[7][1])["agent_contract"]["proof_contract"]).read_text())
        proof["claims"][0]["evidence_references"] = []
        malformed_proof = temporary / "PROOF.json"
        malformed_proof.write_text(json.dumps(proof))
        pilot(cases[7][1])["agent_contract"]["proof_contract"] = str(malformed_proof)

        for label, malformed, expected in cases:
            input_path = temporary / (label.replace(" ", "-") + ".json")
            input_path.write_text(json.dumps(malformed))
            errors = validate_documents(json.loads(input_path.read_text()))
            if not any(expected in error for error in errors):
                raise RuntimeError(f"self-test failed to reject {label}: {errors}")
            print(f"PASS: validator rejected {label}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args()
    try:
        if args.self_test:
            self_test()
            return 0
        errors = validate_documents(contracts())
        result = subprocess.run([sys.executable, "tools/build-agent-index.py", "--check"], cwd=ROOT)
        if result.returncode:
            errors.append("generated agent indexes are stale")
        if errors:
            print("\n".join("AGENT CONTRACT ERROR: " + error for error in errors), file=sys.stderr)
            return 1
        print(f"PASS: {len(PILOTS)} agent-readable contracts validated; 45 modules are pending migration (not invalid).")
        return 0
    except Exception as exc:
        print(f"AGENT CONTRACT ERROR: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
