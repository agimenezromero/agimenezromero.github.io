# Àlex Giménez-Romero — research website

A ground-up Astro rebuild of the personal research website. The design is intentionally research-led rather than CV-led: scientific questions and outputs are foregrounded, while the complete academic record remains available in the CV.

## Stack

- Astro 7
- TypeScript
- Native CSS (no Tailwind or UI framework)
- Static output
- GitHub Pages deployment through the official Astro action
- BibTeX as the publication source of truth

## Run locally

Requires Node.js >= 22.12.

```bash
npm install
npm run dev
```

The project runs `scripts/sync-publications.mjs` before development and production builds. This parses `src/data/publications.bib`, merges website-specific metadata from `src/data/publication-meta.json`, and writes `src/data/publications.generated.json`.

## Update publications

1. Replace or edit `src/data/publications.bib`.
2. Add website-specific metadata in `src/data/publication-meta.json` as needed: tags, summaries, `featured`, local `pdf`, selected `press`, or an `article` DOI URL for records without a DOI field in the BibTeX source.
3. Run:

```bash
npm run sync:publications
```

Do not manually edit `publications.generated.json`. Article links are generated from DOI values by default; PDFs are served from `public/papers/`, and press links are deliberately selected rather than exhaustive.

## Main content files

- `src/data/research.ts` — the four research programmes
- `src/data/tools.ts` — dashboards/tools
- `src/data/outreach.ts` — authored outreach, management briefs and media
- `src/data/about.ts` — positions, education, teaching and supervision
- `src/data/site.ts` — identity and profile links

## Images

The first version reuses a small number of existing research images and the current portrait from the previous website. These are deliberately easy to replace under `src/assets/images/`.

## Deploy

The repository is configured for `agimenezromero.github.io`, so no `base` path is needed. In GitHub repository settings, set **Pages → Source → GitHub Actions**. Pushes to `main` will build and deploy the site.

If you later use a custom domain, update `site` in `astro.config.mjs` and add `public/CNAME`.

## Content decisions in this first draft

The homepage is deliberately selective. Conference lists, funding applications, reviewer counts, certifications and exhaustive skills remain in the CV rather than becoming top-level web content. Teaching and supervision are included within About. Publications, tools and outreach have their own pages because they are active research outputs.

Some media/outreach entries in the CV did not include stable URLs; these are rendered as text until a canonical URL is added.

## Standalone previews

The `preview/` folder contains dependency-free HTML previews that can be opened directly in a browser:

- `preview/index.html` — homepage
- `preview/research.html` — Research page, including the corrected Selected work ordering

These previews are only for design inspection; the Astro source under `src/` is canonical.

## Analytics

The site is prepared for **Umami Analytics**, a lightweight, cookieless analytics platform. Analytics is disabled automatically until a website ID is configured, so local development does not send any data by default.

The tracker is added once in `src/layouts/BaseLayout.astro`. It automatically records page views and standard visit/referrer/device metrics. The site also contains custom event tracking for:

- publication `Article`, `PDF` and `Press` clicks;
- research-theme and research-tool opens;
- CV downloads;
- outbound ORCID, Google Scholar, GitHub and Bluesky profile links;
- outreach/media opens;
- email/contact clicks.

### Local activation

1. Create the website in Umami and copy its Website ID.
2. Copy `.env.example` to `.env`.
3. Set `PUBLIC_UMAMI_WEBSITE_ID`.
4. Optionally set `PUBLIC_UMAMI_DOMAINS` to the production domain(s), comma-separated. Keeping this set prevents localhost traffic from being counted.

For Umami Cloud, leave `PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js`. Change it only for a self-hosted Umami instance.

### GitHub Pages activation

In **GitHub repository → Settings → Secrets and variables → Actions → Variables**, add:

- `PUBLIC_UMAMI_WEBSITE_ID`
- `PUBLIC_UMAMI_SCRIPT_URL` = `https://cloud.umami.is/script.js`
- `PUBLIC_UMAMI_DOMAINS` = `agimenezromero.github.io` (or the future custom domain)

The deployment workflow already exposes these repository variables to the Astro build.
