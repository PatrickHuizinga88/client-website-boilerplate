# Handover — [Klantnaam]

> Vervang alle `[...]` door projectspecifieke waardes voor je dit document oplevert.

## URLs

| Omgeving | URL |
| --- | --- |
| Productie | [https://www.klant.nl] |
| Sanity Studio | [https://www.klant.nl/studio] |
| Repository | [https://github.com/...] |
| Hosting dashboard | [https://dash.cloudflare.com/...] of [Vercel] |

## Logins

Alle wachtwoorden worden gedeeld via [1Password / Bitwarden]. Vraag de developer om toegang.

- **Sanity Studio** — log in met je e-mailadres, je krijgt een magic-link
- **Hosting** — alleen developer heeft toegang; vraag bij wijzigingen
- **Domein/DNS** — staat op naam van [klant / developer]

## Content bewerken

1. Ga naar `/studio` en log in.
2. In het linkermenu zie je: Site instellingen, Homepage, Pagina's, Blog-artikelen.
3. Klik op een item, pas de velden aan, en klik op **Publish** (rechtsboven).
4. Wijzigingen zijn direct live (binnen ~10 seconden).

### Visuele bewerking

1. Klik op de **Presentation** tool in de top-bar van de Studio.
2. Je ziet de live website naast de editor.
3. Klik op tekst of afbeelding om het juiste veld te openen.
4. Wisselen tussen desktop/mobiel via de buttons rechtsboven.

### Afbeeldingen

- Upload via het **media** tabblad of direct in een afbeeldingsveld.
- Gebruik de **hotspot/crop** tool om het focuspunt aan te wijzen — dit zorgt dat de afbeelding goed bijgesneden wordt op alle apparaten.
- **Alt-tekst is verplicht** — beschrijf kort wat er op de afbeelding staat.

## Veelgestelde acties

### Een nieuwe pagina maken

1. Klik op **Pagina's** → **Create**.
2. Vul titel + slug in (slug = URL, bijv. `over-ons` → `/over-ons`).
3. Voeg blocks toe via **Add item**.
4. Vul de **SEO** sectie onderaan voor betere vindbaarheid.
5. Publish.

### Een blog-artikel publiceren

1. **Blog-artikelen** → **Create**.
2. Titel, slug, datum en samenvatting invullen.
3. Cover-afbeelding uploaden + alt-tekst toevoegen.
4. Inhoud schrijven in de rich-text editor.
5. Publish.

### De homepage aanpassen

1. **Homepage** in het menu (singleton — er is er maar één).
2. Pas blocks aan, voeg toe, of versleep om volgorde te wijzigen.
3. Publish.

## Backups

- Sanity bewaart een volledige history per document — terugzetten via het kloktje rechtsboven.
- Maandelijkse export staat ingepland via [GitHub Action / cron].

## Onderhoud

| Wat | Wanneer | Door |
| --- | --- | --- |
| Dependency updates | Maandelijks | Developer |
| Sanity Studio update | Per kwartaal | Developer |
| Content review | [Afspraak met klant] | Klant |
| SSL/domein verlenging | Automatisch | Hosting-provider |

## Contact

Voor vragen of issues: [naam@developer.nl] — reactie binnen [1 werkdag].

## Hand-over checklist

- [ ] Klant heeft Sanity-login en kan content bewerken
- [ ] Klant is eigenaar van Sanity-project (overgedragen via sanity.io/manage)
- [ ] Klant heeft toegang tot domein en hosting (of read-only)
- [ ] Loom-video van 5–10 min over content-bewerken gemaakt en gedeeld
- [ ] Backup-flow getest (content terugzetten)
- [ ] SLA / onderhoudsafspraak ondertekend (optioneel)
