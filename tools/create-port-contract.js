#!/usr/bin/env node
"use strict";
const fs = require("fs"); const path = require("path"); const lib = require("./port-lib");
const args = process.argv.slice(2); const at = args.indexOf("--module");
if (at < 0 || !args[at + 1]) throw new Error("usage: node tools/create-port-contract.js --module projects/NN-name [--force]");
const dir = path.resolve(lib.root, args[at + 1]); const out = path.join(dir, "port.js");
if (fs.existsSync(out) && !args.includes("--force")) throw new Error(`${lib.rel(out)} exists; pass --force to replace it`);
lib.writeContract(out, lib.contractFor(dir)); console.log(`wrote ${lib.rel(out)}`);
