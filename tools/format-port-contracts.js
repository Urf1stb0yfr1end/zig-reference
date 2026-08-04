#!/usr/bin/env node
"use strict";
const fs = require("fs"); const path = require("path"); const lib = require("./port-lib"); let changed = false;
for (const dir of lib.implementedModules()) { const file = path.join(dir, "port.js"); const value = lib.parseContract(file); const expected = `module.exports = ${JSON.stringify(value, null, 2)};\n`; if (fs.readFileSync(file, "utf8") !== expected) { changed = true; if (!process.argv.includes("--check")) fs.writeFileSync(file, expected); } }
if (changed && process.argv.includes("--check")) { console.error("port contracts require formatting"); process.exit(1); }
console.log(`${process.argv.includes("--check") ? "checked" : "formatted"} ${lib.implementedModules().length} port contracts`);
