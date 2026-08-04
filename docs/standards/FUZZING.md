# Fuzzing

Fuzz targets must define input bounds, oracle/invariants, time budget, and failure minimization. Smoke runs use small textual or programmatically generated inputs. Raw corpora and crashes are not committed; a minimized textual regression may be committed when safe. Absence of eligible targets is reported, never presented as fuzz success.
