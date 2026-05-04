# CLAUDE.md

Context voor AI-agents (Claude Code) die in deze repo werken. **Houd dit
actueel** — bij architecturele wijzigingen de relevante secties bijwerken.

## Wat dit is

Astro + Sanity boilerplate voor Nederlandse MKB-websites. Per klant wordt
de repo geforkt met een eigen Sanity-project en content. Ontwerp-filosofie:
**minimale default styling**, structuur-first, design tokens per project in
`apps/web/tailwind.config.mjs`. Zie `Functioneel Ontwerp` (in de session-start
prompt) voor de volledige scope.

## Huidige staat

Werkend en geverifieerd: `pnpm install && pnpm lint && pnpm build` zijn schoon.
Headline-features:

- Monorepo (pnpm workspaces) met embedded Sanity Studio op `/studio`
- 10 page-builder blocks (hero, textImage, features, testimonials, faq, cta,
  logoCloud, gallery, richText, contactBlock)
- Contactformulier (Resend + honeypot + optionele Turnstile)
- Custom sitemap, legal-page templates (privacy/cookies/AV), Umami analytics
- ESLint 9 flat config + Husky pre-commit + lint-staged

**Niet getest in browser** — UI, Sanity Studio interactie, Lighthouse en
formulier end-to-end met echte Resend/Sanity zijn nog niet handmatig
geverifieerd.

## Architecturele beslissingen — niet ongedaan maken zonder reden

1. **Sanity-driven pages zijn SSR** (`export const prerender = false`).
   Vereist voor preview-cookie functionaliteit. Niet terug naar static
   tenzij je preview-mode opgeeft.
2. **`/[...slug]` handelt zowel Sanity-pagina's als legal-markdown af** —
   Sanity wordt eerst geprobeerd, dan de `legal` content collection. Niet
   splitsen naar aparte routes; dat introduceert URL-conflicten.
3. **Embedded `/studio` is bewust minimaal** (alleen structureTool +
   presentationTool). Rijke plugins (Vision, Media, i18n) zitten in
   `apps/studio` voor standalone deploy.
4. **Page-builder block lijst staat in
   `packages/shared/src/schemas/pageBuilderBlocks.ts`** — single source of
   truth, apart bestand om circulaire imports met homePage/page schemas
   te voorkomen.
5. **Styling is bewust minimaal** — Tailwind Typography plugin zit
   **niet** in de deps. Legal markdown gebruikt Tailwind arbitrary
   variants (`[&_h2]:mt-10` etc) voor opmaak. Per project wordt design
   toegevoegd via `tailwind.config.mjs`.
6. **`.env` op monorepo-root**, geladen via `dotenv` + `vite.envDir` in
   `astro.config.mjs`. Variant `apps/studio/.env` is alleen voor de
   standalone Studio.
7. **`SANITY_STUDIO_*` env vars worden gegenereerd door Vite's `define`**
   in `astro.config.mjs` op basis van `PUBLIC_SANITY_*`. Een gebruiker
   hoeft die `STUDIO_` keys niet zelf te zetten voor de embedded studio.

## Stack-constraints (versies/peer-deps)

- **Astro 5** met `@astrojs/node` (standalone). Adapter mag wisselen
  (Cloudflare/Vercel) — pas `astro.config.mjs` + `package.json` aan.
- **React 19** vereist door huidige Sanity-packages — niet downgraden.
- **`@sanity/client` 7+** — `groq` is sinds v7 een aparte package.
- **`@sanity/visual-editing` 5+** — API kan verschillen van oudere versies.

## Open TODO's (volgende sessies)

Lokaal verifiëren (kan ik niet vanuit web-sessie):

- [ ] Browser-test: alle 10 blocks visueel kloppen, responsive, a11y
- [ ] Sanity Studio login + content aanmaken werkt
- [ ] Visual editing (Presentation tool) klikbaar overlay werkt
- [ ] Contactformulier end-to-end met echte Resend
- [ ] Lighthouse 95+ op alle 4 categorieën (FO §8.1)

Restjes om later op te pakken:

- [ ] Build-warning: `Astro.request.headers` toegankelijk in prerendered
      `/404` — komt door cookie-check in `BaseLayout.astro` voor de Umami-
      gating. Functioneel ok, alleen build-noise.
- [ ] Rate-limiting op `/api/contact` — host-afhankelijk (Cloudflare Rate
      Limiting / Upstash); per project bepalen.
- [ ] Cache-Control headers op SSR pages — host-afhankelijk.
- [ ] `pnpm typegen` draaien na eerste echte Sanity-project (vervangt
      handmatige types in `apps/web/src/lib/sanity/types.ts`).

## Per-klant checklist (bij nieuw project)

- [ ] Sanity-project aanmaken in `sanity.io/manage`, project-ID noteren
- [ ] Sanity CORS: `http://localhost:4321` + productie-URL whitelisten
      (allow credentials aan)
- [ ] `.env` op monorepo-root vullen (`PUBLIC_SANITY_PROJECT_ID`,
      `SANITY_API_READ_TOKEN`, Resend creds)
- [ ] `apps/web/tailwind.config.mjs` — brand-kleuren onder
      `theme.extend.colors.brand`
- [ ] `apps/web/src/components/layout/Header.astro` — nav-items
- [ ] `apps/web/src/content/legal/*.md` — placeholders `[bedrijfsnaam]`,
      `[adres]`, `[KvK-nummer]` etc. vervangen + juridisch laten checken
- [ ] `HANDOVER.md` — alle `[...]` invullen
- [ ] `apps/web/sanity.config.ts` + `apps/studio/sanity.config.ts` —
      `title` aanpassen
- [ ] Resend domein verifiëren (DNS records)
- [ ] (Optioneel) Turnstile site/secret keys, Umami site aanmaken

## Bestand-locaties (snelkoppeling)

| Wat                          | Waar                                               |
| ---------------------------- | -------------------------------------------------- |
| Sanity schemas               | `packages/shared/src/schemas/`                     |
| Page-builder block lijst     | `packages/shared/src/schemas/pageBuilderBlocks.ts` |
| Block Astro components       | `apps/web/src/components/blocks/`                  |
| Sanity queries               | `apps/web/src/lib/sanity/queries.ts`               |
| TypeScript types (handmatig) | `apps/web/src/lib/sanity/types.ts`                 |
| Layout (BaseLayout, Header…) | `apps/web/src/layouts/`, `components/layout/`      |
| Forms (ContactForm)          | `apps/web/src/components/forms/`                   |
| Legal markdown templates     | `apps/web/src/content/legal/`                      |
| Sitemap endpoint             | `apps/web/src/pages/sitemap.xml.ts`                |
| Contact endpoint             | `apps/web/src/pages/api/contact.ts`                |
| Preview enable/disable       | `apps/web/src/pages/api/preview/`                  |

## Conventies

- **Code-identifiers in het Engels**, **UI-copy en comments in het
  Nederlands** (doelgroep NL/BE)
- Block component-naam: `PascalCase.astro` (`Hero.astro`)
- Block schema-naam: `camelCase.ts` (`hero.ts`)
- Schema export-naam matcht schema name:
  `export const hero = defineType({ name: 'hero', ... })`
- Geen emojis in code/copy tenzij expliciet gevraagd

## Een nieuw page-builder block toevoegen

1. Schema: `packages/shared/src/schemas/blocks/<name>.ts`
2. Registreer in `packages/shared/src/schemas/index.ts` (`schemaTypes` array)
3. Voeg toe aan `packages/shared/src/schemas/pageBuilderBlocks.ts` lijst
4. Type-union member in `apps/web/src/lib/sanity/types.ts` (`PageBlock`)
5. GROQ-projectie in `apps/web/src/lib/sanity/queries.ts`
   (`blocksProjection`)
6. Astro component: `apps/web/src/components/blocks/<Name>.astro`
7. Wire-up in `apps/web/src/components/blocks/BlockRenderer.astro`

## Commands

```bash
pnpm dev              # Astro + Studio parallel
pnpm dev:web          # Alleen Astro
pnpm dev:studio       # Alleen Studio (standalone)
pnpm build            # Build beide apps
pnpm lint             # ESLint + type-check (alle workspaces)
pnpm lint:fix         # ESLint --fix
pnpm format           # Prettier write
pnpm typegen          # Sanity TypeGen (vereist Sanity-project)
```

Pre-commit hook draait Prettier + ESLint --fix op staged bestanden.
Bypass alleen bij echte uitzondering: `git commit --no-verify`.
