# Tagged Result

A generic exclusive success-or-failure value. It keeps the outcome tag and its matching payload together instead of pairing a status code with a possibly uninitialized output parameter.

Use it when both success and failure require structured data that should be inspected explicitly rather than collapsed into an error set.
## Version Portability

The current baseline is Zig 0.14.0. The module-specific [`port.js`](port.js) migration map inventories version-sensitive APIs, dependency order, semantic risks, and validation commands. Later Zig versions are unverified unless the contract records test evidence. Any port must preserve this module's semantic guarantees, and direct repository dependencies should normally be ported first.
