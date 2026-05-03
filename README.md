# Client Website Boilerplate

Astro + Sanity boilerplate voor MKB-websites. Zie `Functioneel Ontwerp` voor de volledige scope.

## Stack

- **Astro 5** — static-first frontend met islands
- **Sanity v3** — embedded Studio op `/studio`
- **Tailwind CSS** — styling met design tokens
- **TypeScript** — strict mode
- **pnpm workspaces** — monorepo

## Structuur

```
.
├── apps/
│   ├── web/        # Astro frontend (incl. embedded Sanity Studio)
│   └── studio/     # Standalone Sanity Studio (optioneel apart deploy-baar)
├── packages/
│   └── shared/     # Gedeelde Sanity schemas & desk structure
└── .env.example
```

## Aan de slag

### 1. Sanity-project aanmaken

```bash
pnpm dlx sanity@latest init --template clean --create-project "Client name" --dataset development
```

Noteer de project-ID — die heb je in stap 2 nodig.

### 2. Env vars

Kopieer `.env.example` naar `.env` (in de root **én** in `apps/studio/`):

```bash
cp .env.example .env
cp apps/studio/.env.example apps/studio/.env
```

Vul in:
- `PUBLIC_SANITY_PROJECT_ID` — uit stap 1
- `SANITY_STUDIO_PROJECT_ID` — zelfde waarde, in `apps/studio/.env`
- `SANITY_API_READ_TOKEN` — maak een token met "Viewer + draft" rechten in [sanity.io/manage](https://sanity.io/manage)

### 3. Installeren & starten

```bash
pnpm install
pnpm dev
```

Dit start parallel:
- Astro op http://localhost:4321
- Sanity Studio (standalone) op http://localhost:3333
- Embedded Studio op http://localhost:4321/studio

### 4. Eerste content

Open http://localhost:4321/studio en maak aan:
1. **Site instellingen** — titel, contact, default SEO
2. **Homepage** — voeg minstens één Hero block toe
3. (Optioneel) **Pagina's** en **Blog-artikelen**

## Scripts

| Commando | Beschrijving |
| --- | --- |
| `pnpm dev` | Start Astro + Studio parallel |
| `pnpm dev:web` | Alleen Astro |
| `pnpm dev:studio` | Alleen Studio |
| `pnpm build` | Build beide apps |
| `pnpm typegen` | Genereer typed queries vanuit Sanity schemas |
| `pnpm lint` | Lint alles |
| `pnpm format` | Prettier |

## Visual editing (preview mode)

1. Open `/studio` en klik op de **Presentation** tool (verschijnt automatisch via `studioBasePath`).
2. Wijzigingen in drafts verschijnen direct in de preview-iframe.
3. Klik-tot-bewerken werkt op velden die via stega-encoding gerenderd zijn.

Activeer preview op een live deploy via:

```
/api/preview/enable?secret=<SANITY_API_READ_TOKEN>&redirect=/
```

Deactiveer met:

```
/api/preview/disable
```

## Deploy

### Cloudflare Pages / Vercel

1. Connect de repo
2. Build command: `pnpm --filter web build`
3. Output dir: `apps/web/dist`
4. Voeg de env vars uit `.env.example` toe (let op `PUBLIC_*` zijn build-time, rest is runtime)

### Sanity Studio

De Studio is automatisch beschikbaar op `/studio` via de Astro app — geen aparte deploy nodig. Wil je hem toch los hosten:

```bash
cd apps/studio
pnpm sanity deploy
```

## Acceptatiecriteria

- [x] `pnpm install && pnpm dev` werkt zonder configuratie binnen 2 minuten (na env vars)
- [ ] Lighthouse 95+ op verse install met demo-content (verifieer per project)
- [x] Visual editing werkt out-of-the-box
- [ ] Contactformulier — _nog niet geïmplementeerd in deze scaffold_
- [x] Klant-overdrachtsdocumentatie aanwezig (`HANDOVER.md`)

## Wat zit er nog niet in (volgende iteraties)

- Contactformulier met Resend + Turnstile (FO §6.3)
- Extra page-builder blocks: features, testimonials, FAQ, CTA, gallery, logoCloud (FO §4.3)
- Sitemap-generator (`@astrojs/sitemap`)
- Privacy/cookies/AV templates
- Plausible/Umami analytics integration
- ESLint + Husky + lint-staged config
- TypeGen output (vereist `pnpm install` + Sanity schema)
