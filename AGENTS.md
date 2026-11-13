# Agent hints

## This repository

`that-train-dashboard` is a child seed of `le.gume`: React + Vite + Tailwind v4, Markdown content,
derived navigation, a prerender step and a publish guard. Live:
https://james-gibson.github.io/that-train-dashboard/

## The one instruction that matters when standing this up

**Change the UI library.** The parent seed uses `fancy-ui-react`; this site uses **1st-Pouf**
(`src/components/pouf/`, claymorphism, copied source). That swap is the proof the process is not
UI-dependent: the content model, the guard, the prerender and the derived navigation survived a
different component system with no changes to the pipeline.

If you are configuring a new child seed, pick a different library again. Do not port the parent's
components; port the pattern.

## Pouf rules

- **No `className` or `style` on a pouf component.** TypeScript omits them on purpose. Use
  `tone`, `size`, `variant`, `gap`, `cols` and the layout primitives.
- Semantic tones for meaning (`up`, `down`, `warn`, `info`, `idle`); raw pastels for decoration.
- Status is text, not colour. Unknown is not zero: `Metric` renders `null` as an em dash.
- The copied source is yours: to change a look, edit the component or add a cva variant.

## Rules: defer to upstream, override on the record

The rules are **the upstream's** — `https://james-gibson.github.io/le.gume/rules.md`, vendored into
`upstream/rules.md` by `node scripts/sync-upstream.mjs`. Do not copy them into this file; a copy
drifts and nobody can tell which is current.

When this site must do something different, add a line to `upstream/overrides.md` naming the rule id
and the reason. The guard refuses an override for a rule upstream does not define, and the build
publishes the effective list at `/rules.md`.

Sync on a cadence, not once: a child pinned to a version it never updates is following rules that no
longer exist.

## Commands

```bash
npm run dev
npm run build   # tsc --noEmit && vite build && prerender && postbuild && guard
npm run guard
```

`npm run build` is the gate. Do not weaken a check to get green.

## Content

- One page = one file: `src/content/<section>/<slug>.md`, frontmatter `title` + `description`
  (plus `order`, `updated`, `stage`).
- Sections live in `src/lib/content.ts`; the nav is derived, never listed.
- Markdown only. A live widget is a component in `src/pages/`.
- Internal links are root-absolute (`/studies/…`); the mount is applied at build time.
- Voice: dry, specific, cost-first. A claim without a run is a hypothesis and says so.

## Ship improvements back

When you build something this site does not have — a page type, a check, a component, a way of
recording provenance — consider **packaging it as an isotope and proposing it upstream** to
[le.gume](https://james-gibson.github.io/le.gume/), rather than leaving it in this fork.

An isotope is the parent's unit of reuse: a name, `slots`, `presumes`, a cost section and an agent
prompt. A child-specific preference is not an isotope; say no on the record instead. If nobody
upstreams, this improvement dies when this site does and the next child re-derives it.

The rule is stated in the parent's skill and checked by its guard. It is a norm, not a mechanism —
which is why it is written here, where the feature is built.

## Provenance

Every study page names its OpenTTD version, map seed, scenario file and commit. A finding without
all four is labelled inconclusive rather than softened.
