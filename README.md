# That Train Dashboard

A research team's dashboard for economic studies run as OpenTTD simulations. It is a **child seed**
of [le.gume](https://james-gibson.github.io/le.gume/): the same content model, the same derived
navigation and the same publish gate, with a different audience, a different question and a
different design system.

## What it is

- One page = one Markdown file in `src/content/<section>/<slug>.md`. The path is the URL.
- Navigation, section indexes, `llms.txt` and the sitemap are derived from the file tree.
- Every route is prerendered, so the page is in the initial HTML.
- The guard refuses a broken link, a missing shell or a page that never reached `llms.txt`.

## The context we run against

We do not control the environment we study. [le.railhead](https://james-gibson.github.io/le.railhead/)
is the shared context we publish against: Railhead as it was measured, at a pinned commit, with the
limits and the verifier's open gaps stated. Our study pages keep the argument; the stage, the pin and
the log of every research change we publish are kept there, in
[the register](https://james-gibson.github.io/le.railhead/studies/).

## What it deliberately is not

No accounts, no analytics, no search, no CMS, no database. The audience reads studies and checks
provenance; nothing here needs a service.

## Run it

```bash
npm install
npm run dev      # vite
npm run build    # type-check, bundle, prerender, shells, llms.txt, guard
```

## The UI library

This site uses **1st-Pouf** (claymorphism) instead of the parent's component library, on purpose: the
pattern is the reusable part, not the components. The components are copied into
`src/components/pouf/` and owned here.

## Licence

AGPL-3.0-only.
