# le.gume rules

version: fa7f7a6
source: https://james-gibson.github.io/le.gume/rules.md

A child seed defers to this list until it records a local override.
An override names a rule id, gives a reason, and is published by the child.

- RULES-01: The path is the URL. A rename is a breaking public change.
- RULES-02: Navigation is derived from the content tree; there is no nav array.
- RULES-03: Content is Markdown, never MDX. A live widget is a route in src/pages/.
- RULES-04: llms.txt is generated; never hand-edit it.
- RULES-05: The guard is the gate. Weakening a check invalidates every other claim.
- RULES-06: A claim that the site does X must be checkable at the URL or in the repository.
- RULES-07: Child seeds ship back: package a new capability as an isotope and propose it upstream.
- RULES-08: A child seed defers to these rules until it records a local override, with a reason.
- RULES-09: An ink that carries meaning is measured as it lands: after any alpha, against its ground, and against the ink it touches.
- RULES-10: The publish workflow uses the current LTS Node and action majors that run on it; a deprecated action runtime is a build failure.
