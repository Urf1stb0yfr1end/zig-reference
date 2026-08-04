module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "38",
    "canonicalName": "elf64-program-header-parser",
    "displayName": "Elf64 Program Header Parser",
    "directory": "projects/38-elf64-program-header-parser",
    "publicEntrypoint": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
    "detailsContract": "projects/38-elf64-program-header-parser/details.json",
    "humanContract": "projects/38-elf64-program-header-parser/DETAILS.md",
    "portContract": "projects/38-elf64-program-header-parser/port.js"
  },
  "baseline": {
    "zigVersion": "0.14.0",
    "minimumSupportedVersion": "0.14.0",
    "maximumTestedVersion": "",
    "baselineCompilerValidated": false,
    "baselineUnitTestsPassed": false,
    "baselineSmokeTestsPassed": false,
    "lastValidatedCommit": "",
    "validationEvidence": [
      "Zig compiler was unavailable in the authoring environment; claims remain unverified."
    ]
  },
  "sourceInventory": {
    "implementationFiles": [
      "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
    ],
    "publicEntrypoints": [
      "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
    ],
    "internalUnitTests": [
      "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
    ],
    "externalSmokeTests": [
      "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/38-elf64-program-header-parser/README.md",
      "projects/38-elf64-program-header-parser/MASTERY.md",
      "projects/38-elf64-program-header-parser/DETAILS.md",
      "projects/38-elf64-program-header-parser/details.json",
      "projects/38-elf64-program-header-parser/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "Permission",
      "SegmentType",
      "Segment",
      "ParseError",
      "parseOne",
      "parseTable"
    ],
    "publicTypes": [
      {
        "name": "Permission",
        "kind": "public declaration"
      },
      {
        "name": "SegmentType",
        "kind": "public declaration"
      },
      {
        "name": "Segment",
        "kind": "public declaration"
      },
      {
        "name": "ParseError",
        "kind": "public declaration"
      },
      {
        "name": "parseOne",
        "kind": "public declaration"
      },
      {
        "name": "parseTable",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented elf64-program-header-parser public behavior, boundaries, and failure semantics."
    ],
    "ownershipRulesToPreserve": [],
    "lifetimeRulesToPreserve": [],
    "cleanupRulesToPreserve": [],
    "invalidationRulesToPreserve": [],
    "failureAtomicityToPreserve": [],
    "binaryLayoutsToPreserve": [],
    "compatibilityPromisesToPreserve": [],
    "intentionallyUnstableDetails": []
  },
  "dependencies": {
    "repository": [
      {
        "canonicalName": "fixed-capacity-vector",
        "portContract": "projects/00-fixed-capacity-vector/port.js",
        "importName": "fixed-capacity-vector",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "bounded-byte-reader",
        "portContract": "projects/04-bounded-byte-reader/port.js",
        "importName": "bounded-byte-reader",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-integer-cast",
        "portContract": "projects/10-checked-integer-cast/port.js",
        "importName": "checked-integer-cast",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "validated-enum-decoder",
        "portContract": "projects/14-validated-enum-decoder/port.js",
        "importName": "validated-enum-decoder",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "aligned-address-and-size-helpers",
        "portContract": "projects/15-aligned-address-and-size-helpers/port.js",
        "importName": "aligned-address-and-size-helpers",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "validated-bit-flags",
        "portContract": "projects/16-validated-bit-flags/port.js",
        "importName": "validated-bit-flags",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "checked-half-open-range",
        "portContract": "projects/17-checked-half-open-range/port.js",
        "importName": "checked-half-open-range",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "distinct-memory-address-types",
        "portContract": "projects/18-distinct-memory-address-types/port.js",
        "importName": "distinct-memory-address-types",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "endian-integer-codec",
        "portContract": "projects/22-endian-integer-codec/port.js",
        "importName": "endian-integer-codec",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "binary-cursor-checkpoint",
        "portContract": "projects/29-binary-cursor-checkpoint/port.js",
        "importName": "binary-cursor-checkpoint",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "bounded-binary-sub-reader",
        "portContract": "projects/30-bounded-binary-sub-reader/port.js",
        "importName": "bounded-binary-sub-reader",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      },
      {
        "canonicalName": "elf64-file-header-parser",
        "portContract": "projects/37-elf64-file-header-parser/port.js",
        "importName": "elf64-file-header-parser",
        "symbolsUsed": [],
        "mustPortFirst": true,
        "reason": "The module imports this direct repository dependency in build.zig.",
        "guaranteesInherited": []
      }
    ],
    "standardLibrary": [
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@as",
      "@intCast",
      "@memcpy",
      "@sizeOf"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @as behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@intCast",
        "files": [
          {
            "path": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @intCast behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @memcpy behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@sizeOf",
        "files": [
          {
            "path": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @sizeOf behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      }
    ],
    "notUsed": []
  },
  "standardLibraryUsage": {
    "imports": [
      {
        "path": "std.math.maxInt",
        "symbols": [
          "std.math.maxInt"
        ],
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expect",
        "symbols": [
          "std.testing.expect"
        ],
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
          "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectEqual",
        "symbols": [
          "std.testing.expectEqual"
        ],
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.testing.expectError",
        "symbols": [
          "std.testing.expectError"
        ],
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
          "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.maxInt"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-elf64-program-header-parser",
    "smokeTestStep": "smoke-elf64-program-header-parser",
    "namedModuleImport": "elf64-program-header-parser",
    "sourcePath": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
    "directModuleDependencies": [
      "fixed-capacity-vector",
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "aligned-address-and-size-helpers",
      "validated-bit-flags",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "elf64-file-header-parser"
    ],
    "buildApisUsed": [
      "std.Build.createModule",
      "std.Build.addTest",
      "std.Build.addRunArtifact",
      "std.Build.Module.addImport",
      "std.Build.step"
    ],
    "rootModuleConfiguration": [
      "root_module"
    ],
    "targetConfiguration": [
      "standardTargetOptions"
    ],
    "optimizeConfiguration": [
      "standardOptimizeOption"
    ],
    "runArtifacts": [
      "test-elf64-program-header-parser",
      "smoke-elf64-program-header-parser"
    ],
    "systemCommands": [],
    "likelyPortingRisks": [
      "Named module identity and dependency imports must remain singular and ordered."
    ]
  },
  "targetAndPlatformUsage": {
    "hosted": "yes",
    "freestanding": "yes",
    "targets": [],
    "endianSensitive": false,
    "notes": []
  },
  "allocatorUsage": {
    "allocatorSensitive": false,
    "apis": [],
    "ownershipTransitions": [],
    "notes": []
  },
  "pointerAndMemoryUsage": {
    "pointerSensitive": true,
    "builtins": [
      "@memcpy"
    ],
    "borrowedMemoryRules": [],
    "notes": []
  },
  "integerAndCastUsage": {
    "builtins": [
      "@as",
      "@intCast"
    ],
    "overflowSemantics": [],
    "notes": []
  },
  "reflectionAndComptimeUsage": {
    "reflectionSensitive": false,
    "builtins": [],
    "comptimeParameters": [],
    "notes": []
  },
  "errorHandlingUsage": {
    "publicErrors": [],
    "failureGuarantees": [],
    "panicBehavior": "",
    "notes": []
  },
  "testingUsage": {
    "unitTests": [
      "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
    ],
    "smokeTests": [
      "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
    ],
    "testingApis": [
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "semanticCoverage": []
  },
  "knownVersionChanges": [],
  "possibleMechanicalTransforms": [],
  "manualReviewRequired": [
    {
      "topic": "semantic and build compatibility",
      "reason": "Unknown future Zig releases can change inference, standard-library contracts, or build graph identity.",
      "affectedSymbols": [
        "Permission",
        "SegmentType",
        "Segment",
        "ParseError",
        "parseOne",
        "parseTable"
      ],
      "affectedFiles": [
        "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-elf64-program-header-parser",
        "zig build smoke-elf64-program-header-parser"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented elf64-program-header-parser public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "Permission",
        "SegmentType",
        "Segment",
        "ParseError",
        "parseOne",
        "parseTable"
      ],
      "detectionTests": [
        "zig build test-elf64-program-header-parser",
        "zig build smoke-elf64-program-header-parser"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "fixed-capacity-vector",
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "aligned-address-and-size-helpers",
      "validated-bit-flags",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "elf64-file-header-parser"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "fixed-capacity-vector",
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "aligned-address-and-size-helpers",
      "validated-bit-flags",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "elf64-file-header-parser",
      "elf64-program-header-parser"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-elf64-program-header-parser",
      "zig build smoke-elf64-program-header-parser"
    ],
    "targetVersionCommands": [],
    "semanticTests": [],
    "layoutChecks": [],
    "compileErrorExpectations": [],
    "manualReviewSteps": [
      "Review compiler diagnostics against verified release notes.",
      "Compare public behavior, ownership, and failure semantics with the contracts."
    ],
    "successCriteria": [
      "All contract, unit, and smoke checks pass without semantic drift."
    ],
    "failureCriteria": [
      "Any unsupported-version claim, changed public behavior, or failing validation command."
    ]
  },
  "testedTargets": [],
  "untestedTargets": [
    {
      "zigVersion": ">0.14.0",
      "status": "not_tested",
      "expectedDifficulty": "unknown",
      "knownBlockers": [],
      "notes": [
        "Inspect verified release notes and compiler diagnostics before creating migration rules."
      ]
    }
  ],
  "agentInstructions": {
    "readFirst": [
      "projects/38-elf64-program-header-parser/port.js",
      "projects/38-elf64-program-header-parser/details.json",
      "projects/38-elf64-program-header-parser/DETAILS.md",
      "projects/00-fixed-capacity-vector/port.js",
      "projects/04-bounded-byte-reader/port.js",
      "projects/10-checked-integer-cast/port.js",
      "projects/14-validated-enum-decoder/port.js",
      "projects/15-aligned-address-and-size-helpers/port.js",
      "projects/16-validated-bit-flags/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/18-distinct-memory-address-types/port.js",
      "projects/22-endian-integer-codec/port.js",
      "projects/29-binary-cursor-checkpoint/port.js",
      "projects/30-bounded-binary-sub-reader/port.js",
      "projects/37-elf64-file-header-parser/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-elf64-program-header-parser"
    ],
    "recommendedPortOrder": [
      "fixed-capacity-vector",
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "aligned-address-and-size-helpers",
      "validated-bit-flags",
      "checked-half-open-range",
      "distinct-memory-address-types",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "bounded-binary-sub-reader",
      "elf64-file-header-parser",
      "elf64-program-header-parser"
    ],
    "searchTerms": [
      "@as",
      "@intCast",
      "@memcpy",
      "@sizeOf",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@as",
      "@intCast",
      "@memcpy",
      "@sizeOf",
      "std.math.maxInt",
      "std.testing.expect",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "doNotAssume": [
      "Compilation proves semantic or binary-layout compatibility.",
      "A newer std.Build API preserves module identity.",
      "Unknown future releases have a mechanical replacement path."
    ],
    "stopConditions": [
      "Stop before recording support when the exact target compiler and semantic tests have not run."
    ],
    "completionChecklist": [
      "Port dependencies first.",
      "Run contract checks, unit tests, and smoke tests.",
      "Record evidence without deleting baseline history."
    ]
  },
  "sourceMap": {
    "builtinsToFiles": [
      {
        "builtin": "@as",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      },
      {
        "builtin": "@intCast",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.maxInt",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      },
      {
        "api": "std.testing.expect",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
          "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig",
          "projects/38-elf64-program-header-parser/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "Permission",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      },
      {
        "symbol": "SegmentType",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      },
      {
        "symbol": "Segment",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      },
      {
        "symbol": "ParseError",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      },
      {
        "symbol": "parseOne",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      },
      {
        "symbol": "parseTable",
        "file": "projects/38-elf64-program-header-parser/src/elf64_program_header_parser.zig"
      }
    ]
  },
  "history": {
    "baselineEstablished": "Zig 0.14.0",
    "migrations": [],
    "notes": [
      "No later Zig target has been tested."
    ]
  }
};
