module.exports = {
  "schemaVersion": "1.0.0",
  "contractVersion": "1.0.0",
  "module": {
    "id": "37",
    "canonicalName": "elf64-file-header-parser",
    "displayName": "Elf64 File Header Parser",
    "directory": "projects/37-elf64-file-header-parser",
    "publicEntrypoint": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
    "detailsContract": "projects/37-elf64-file-header-parser/details.json",
    "humanContract": "projects/37-elf64-file-header-parser/DETAILS.md",
    "portContract": "projects/37-elf64-file-header-parser/port.js"
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
      "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
    ],
    "publicEntrypoints": [
      "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
    ],
    "internalUnitTests": [
      "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
    ],
    "externalSmokeTests": [
      "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
    ],
    "examples": [],
    "fixtures": [],
    "benchmarks": [],
    "fuzzTargets": [],
    "buildDefinitions": [
      "build.zig"
    ],
    "contracts": [
      "projects/37-elf64-file-header-parser/README.md",
      "projects/37-elf64-file-header-parser/MASTERY.md",
      "projects/37-elf64-file-header-parser/DETAILS.md",
      "projects/37-elf64-file-header-parser/details.json",
      "projects/37-elf64-file-header-parser/port.js"
    ]
  },
  "publicContract": {
    "publicSymbols": [
      "ElfEndian",
      "ElfType",
      "Elf64FileHeader",
      "ParseError",
      "parse"
    ],
    "publicTypes": [
      {
        "name": "ElfEndian",
        "kind": "public declaration"
      },
      {
        "name": "ElfType",
        "kind": "public declaration"
      },
      {
        "name": "Elf64FileHeader",
        "kind": "public declaration"
      },
      {
        "name": "ParseError",
        "kind": "public declaration"
      },
      {
        "name": "parse",
        "kind": "public declaration"
      }
    ],
    "publicFunctions": [],
    "publicMethods": [],
    "publicConstants": [],
    "publicErrors": [],
    "invariantsToPreserve": [
      "Preserve the documented elf64-file-header-parser public behavior, boundaries, and failure semantics."
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
        "canonicalName": "checked-half-open-range",
        "portContract": "projects/17-checked-half-open-range/port.js",
        "importName": "checked-half-open-range",
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
      }
    ],
    "standardLibrary": [
      "std.math.mul",
      "std.mem.eql",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "external": []
  },
  "zigLanguageFeatures": {
    "used": [],
    "versionSensitive": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf"
    ],
    "notes": []
  },
  "compilerBuiltins": {
    "used": [
      {
        "name": "@This",
        "files": [
          {
            "path": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
            "lines": [],
            "symbols": []
          }
        ],
        "baselineBehavior": "Zig 0.14.0 @This behavior as exercised by this module",
        "portingRisk": "medium",
        "likelyChangeCategory": "syntax_or_type_semantics",
        "notes": []
      },
      {
        "name": "@as",
        "files": [
          {
            "path": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
            "lines": [],
            "symbols": []
          },
          {
            "path": "projects/37-elf64-file-header-parser/tests/smoke_test.zig",
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
        "name": "@memcpy",
        "files": [
          {
            "path": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
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
            "path": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
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
        "path": "std.math.mul",
        "symbols": [
          "std.math.mul"
        ],
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ],
        "purpose": "implementation support",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      },
      {
        "path": "std.mem.eql",
        "symbols": [
          "std.mem.eql"
        ],
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ],
        "purpose": "implementation support",
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
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
          "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
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
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
          "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
        ],
        "purpose": "test assertions and test allocation",
        "versionSensitivity": "medium",
        "knownChanges": [],
        "migrationNotes": []
      }
    ],
    "testingApis": [
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "allocatorApis": [],
    "ioApis": [],
    "endianApis": [],
    "mathApis": [
      "std.math.mul"
    ],
    "metadataApis": []
  },
  "buildSystemUsage": {
    "unitTestStep": "test-elf64-file-header-parser",
    "smokeTestStep": "smoke-elf64-file-header-parser",
    "namedModuleImport": "elf64-file-header-parser",
    "sourcePath": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
    "directModuleDependencies": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "checked-half-open-range",
      "endian-integer-codec",
      "binary-cursor-checkpoint"
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
      "test-elf64-file-header-parser",
      "smoke-elf64-file-header-parser"
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
      "@as"
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
      "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
    ],
    "smokeTests": [
      "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
    ],
    "testingApis": [
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
        "ElfEndian",
        "ElfType",
        "Elf64FileHeader",
        "ParseError",
        "parse"
      ],
      "affectedFiles": [
        "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
      ],
      "questionsToAnswer": [
        "Do public errors, ownership, layout, and failure atomicity still match the contracts?"
      ],
      "requiredTests": [
        "zig build test-elf64-file-header-parser",
        "zig build smoke-elf64-file-header-parser"
      ]
    }
  ],
  "semanticPortingRisks": [
    {
      "risk": "Preserve the documented elf64-file-header-parser public behavior, boundaries, and failure semantics.",
      "consequence": "A syntactically successful port could violate the module contract.",
      "affectedEndpoints": [
        "ElfEndian",
        "ElfType",
        "Elf64FileHeader",
        "ParseError",
        "parse"
      ],
      "detectionTests": [
        "zig build test-elf64-file-header-parser",
        "zig build smoke-elf64-file-header-parser"
      ],
      "mitigation": "Compare DETAILS.md and details.json, then run boundary and failure-path tests."
    }
  ],
  "migrationOrder": {
    "portAfter": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "checked-half-open-range",
      "endian-integer-codec",
      "binary-cursor-checkpoint"
    ],
    "portBefore": [],
    "independentOf": [],
    "recommendedSequence": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "checked-half-open-range",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "elf64-file-header-parser"
    ],
    "cycleRisks": []
  },
  "validationPlan": {
    "baselineCommands": [
      "zig version",
      "zig build check-module-contracts",
      "zig build check-port-contracts",
      "zig build test-elf64-file-header-parser",
      "zig build smoke-elf64-file-header-parser"
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
      "projects/37-elf64-file-header-parser/port.js",
      "projects/37-elf64-file-header-parser/details.json",
      "projects/37-elf64-file-header-parser/DETAILS.md",
      "projects/04-bounded-byte-reader/port.js",
      "projects/10-checked-integer-cast/port.js",
      "projects/14-validated-enum-decoder/port.js",
      "projects/17-checked-half-open-range/port.js",
      "projects/22-endian-integer-codec/port.js",
      "projects/29-binary-cursor-checkpoint/port.js"
    ],
    "filesUsuallyNotRequired": [],
    "firstCommands": [
      "zig version",
      "zig build test-elf64-file-header-parser"
    ],
    "recommendedPortOrder": [
      "bounded-byte-reader",
      "checked-integer-cast",
      "validated-enum-decoder",
      "checked-half-open-range",
      "endian-integer-codec",
      "binary-cursor-checkpoint",
      "elf64-file-header-parser"
    ],
    "searchTerms": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf",
      "std.math.mul",
      "std.mem.eql",
      "std.testing.expectEqual",
      "std.testing.expectError"
    ],
    "likelyCompilerFailureAreas": [
      "@This",
      "@as",
      "@memcpy",
      "@sizeOf",
      "std.math.mul",
      "std.mem.eql",
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
        "builtin": "@This",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ]
      },
      {
        "builtin": "@as",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
          "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
        ]
      },
      {
        "builtin": "@memcpy",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ]
      },
      {
        "builtin": "@sizeOf",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ]
      }
    ],
    "standardLibraryToFiles": [
      {
        "api": "std.math.mul",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ]
      },
      {
        "api": "std.mem.eql",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
        ]
      },
      {
        "api": "std.testing.expectEqual",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
          "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
        ]
      },
      {
        "api": "std.testing.expectError",
        "files": [
          "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig",
          "projects/37-elf64-file-header-parser/tests/smoke_test.zig"
        ]
      }
    ],
    "symbolsToFiles": [
      {
        "symbol": "ElfEndian",
        "file": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
      },
      {
        "symbol": "ElfType",
        "file": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
      },
      {
        "symbol": "Elf64FileHeader",
        "file": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
      },
      {
        "symbol": "ParseError",
        "file": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
      },
      {
        "symbol": "parse",
        "file": "projects/37-elf64-file-header-parser/src/elf64_file_header_parser.zig"
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
