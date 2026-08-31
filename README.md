# Meghraj Exports — meghrajexports.com

Marketing and enquiry site for Meghraj Exports, a factory-direct bag manufacturer
and exporter in Jalandhar, Punjab, India. React + Vite single-page app, prerendered
at build time, deployed on Vercel.

Proprietary — see [LICENSE](LICENSE).

## Layout

```
src/frontend/            the app (this is the Vercel root directory)
  api/contact.js         serverless enquiry endpoint
  scripts/               build-time prerender, sitemap and verification
  src/data/              product catalogues — the source of truth for both the
                         rendered pages and the prerendered HTML
supabase/migrations/     database schema for enquiry storage
.github/workflows/       CI and the Supabase keep-alive
```

## Running locally

```bash
cd src/frontend
pnpm install
pnpm start          # http://localhost:3000
```

`/api/contact` is mounted by a Vite middleware in development, so the frontend
always calls the same relative path it does in production.

## Building

```bash
cd src/frontend
pnpm run build:skip-bindings
```

That runs three steps in order, and Vercel runs exactly the same command:

1. `vite build` — bundles the app into `dist/`
2. `scripts/prerender.mjs` — writes one HTML file per route
3. `scripts/generate-sitemap.mjs` — writes `dist/sitemap.xml`

Then verify with `node scripts/assert-prerender.mjs` (CI does this automatically).

## Why the prerender step exists

The app is client-rendered, so before this step every URL served the same HTML: an
empty `<div id="root">` with the homepage's metadata. Google renders JavaScript on a
delayed second pass and a limited budget; Bing, link unfurlers and the AI assistant
crawlers do not render it at all. Every page on the site was blank to them.

`scripts/prerender.mjs` now writes each route's real title, description, canonical,
Open Graph tags, JSON-LD **and a readable HTML body** built from the same data files
the React app renders from. It is safe because `src/main.tsx` uses `createRoot`, which
clears the container on mount — not `hydrateRoot`, which would mismatch. The script
asserts this and fails the build if it ever changes.

Nothing in the prerendered body is retyped copy. `scripts/lib/pageContent.mjs`
extracts it from the page components and `src/data/*.ts`, and throws if a source file's
shape changes, so a silently blank prerender cannot ship again.

## Environment variables

See [`src/frontend/.env.example`](src/frontend/.env.example). Set the same keys in the
Vercel project. Two things that have caused real outages:

- `VITE_GA_MEASUREMENT_ID` is compiled in **at build time**. Setting it only in
  `.env.local` means deployed builds ship the placeholder and analytics silently
  receives nothing. Vercel does not rebuild when a variable changes — trigger a build.
- Never prefix a secret with `VITE_`. Anything `VITE_`-prefixed ends up in the browser
  bundle. `SUPABASE_SERVICE_ROLE_KEY` in particular bypasses row level security.

## Enquiry handling

`api/contact.js` validates, then: stores the enquiry, pushes a notification, emails
the team, and auto-replies to the buyer with a reference number. Storage happens
first on purpose — a broken mailbox must not lose a lead. Every step after validation
is optional and degrades cleanly when its environment variables are unset.

Apply `supabase/migrations/0001_enquiries.sql` to create the table. Row level security
is on with no policies, so only the service role key can read or write it. Do not add a
permissive policy: the table holds buyer contact details.

## Deploying

Vercel builds from `main` with root directory `src/frontend`. Pull requests get a
preview URL. CI runs the type-check, lint and full build on every push.
