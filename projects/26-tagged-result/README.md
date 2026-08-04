# Tagged Result

A generic exclusive success-or-failure value. It keeps the outcome tag and its matching payload together instead of pairing a status code with a possibly uninitialized output parameter.

Use it when both success and failure require structured data that should be inspected explicitly rather than collapsed into an error set.