module.exports = {
  "schemaVersion": "1.0.0",
  "baseline": {
    "zigVersion": "0.14.0",
    "validated": false,
    "reason": "The Zig compiler was unavailable in the authoring environment."
  },
  "sourceFiles": [
    "build.zig"
  ],
  "structure": {
    "moduleRegistration": "The specs table creates one named module per implemented project.",
    "dependencyImports": "A second pass uses std.Build.Module.addImport so direct repository dependencies share module identity.",
    "unitTests": "std.Build.addTest uses each public module as root_module.",
    "smokeTests": "External smoke roots import the public named module and its direct dependencies.",
    "contractCommands": [
      "python3 tools/module-contract-consistency-checker.py",
      "node tools/check-port-contracts.js"
    ]
  },
  "buildApisUsed": [
    "std.Build.standardTargetOptions",
    "std.Build.standardOptimizeOption",
    "std.Build.addSystemCommand",
    "std.Build.step",
    "std.Build.createModule",
    "std.Build.Module.addImport",
    "std.Build.addTest",
    "std.Build.addRunArtifact",
    "std.Build.path",
    "std.Build.fmt"
  ],
  "configuration": {
    "target": "One standardTargetOptions result is shared by modules and smoke roots.",
    "optimize": "One standardOptimizeOption result is shared by modules and smoke roots.",
    "runArtifacts": "Unit and external smoke test artifacts are attached to individual and aggregate steps."
  },
  "manualReviewRequired": [
    "Confirm newer build APIs preserve named module identity and direct import sharing.",
    "Confirm system-command dependencies and aggregate-step edges still execute exactly once as intended.",
    "Confirm target and optimize configuration reaches every root module."
  ],
  "validationCommands": [
    "zig version",
    "zig build check-module-contracts",
    "zig build check-port-contracts",
    "zig build smoke-portability-infrastructure",
    "zig build smoke",
    "zig build test"
  ],
  "testedTargets": [],
  "untestedTargets": [
    ">0.14.0"
  ]
};
