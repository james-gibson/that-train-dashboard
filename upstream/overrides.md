# Local overrides

A rule from the upstream list that this child replaces, with the reason. The
guard refuses an override that names a rule the upstream does not define, and
the build publishes the effective list at `/rules.md`.

- RULES-06: provenance is checked by review, not by the guard — run records are
  not committed yet, so the build cannot verify a version, seed or scenario.

- RULES-09: this child has no contrast pass; Pouf's ink is measured by hand and
  recorded beside the pair in `src/components/pouf/pouf.css`, so the claim is in
  the repository but is not recomputed at build time. Enumerating the pairs the
  components actually paint — rather than the pairs a script would guess — is a
  `contrast` cycle of its own, and until it lands this seed does not claim the
  rule is kept.
