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
