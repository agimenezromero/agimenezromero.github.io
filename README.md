# Àlex Giménez-Romero — Research Website

Source code for the personal research website of **Àlex Giménez-Romero**, built with [Astro](https://astro.build/) and deployed with GitHub Pages.

Live site: https://agimenezromero.github.io/

## Stack

* Astro 7
* TypeScript
* Native CSS
* Static site generation
* GitHub Pages
* BibTeX-based publication management
* Umami Analytics

## Run locally

Requires Node.js >= 22.12.

```bash
npm install
npm run dev
```

The local development server is normally available at:

```text
http://localhost:4321
```

To use another port:

```bash
npm run dev -- --port 4322
```

## Build

Create a production build with:

```bash
npm run build
```

The generated site is written to `dist/`.

A local production preview can be started with:

```bash
npm run preview
```

## Publications

Bibliographic information is stored in:

```text
src/data/publications.bib
```

Website-specific metadata is stored separately in:

```text
src/data/publication-meta.json
```

This metadata can contain information such as:

* research themes;
* featured status;
* short summaries;
* local PDF files;
* selected press coverage;
* article links when required.

Publication data are generated automatically by:

```text
scripts/sync-publications.mjs
```

The script combines the BibTeX bibliography with the website metadata and writes:

```text
src/data/publications.generated.json
```

To regenerate the publication data manually:

```bash
npm run sync:publications
```

Do not edit `publications.generated.json` manually.

Published article links are generated from DOI values whenever possible. Local PDF copies are served from:

```text
public/papers/
```

Press links are selected individually in `publication-meta.json`.

## Content

The main structured content is located in:

```text
src/data/
```

Important files include:

```text
research.ts           Research programmes
tools.ts              Interactive research tools and resources
outreach.ts           Outreach articles, briefs and media coverage
site.ts               Site metadata and profile links
publications.bib       Bibliographic source
publication-meta.json Website-specific publication metadata
```

Page templates are located under:

```text
src/pages/
```

Reusable components are located under:

```text
src/components/
```

Global styles are located under:

```text
src/styles/
```

Images used by Astro are primarily stored under:

```text
src/assets/images/
```

Static files that should be copied directly to the final site are stored under:

```text
public/
```

## CV

The downloadable CV is stored at:

```text
public/cv/Alex_Gimenez_Romero_CV.pdf
```

Replacing this file with an updated PDF while keeping the same filename automatically updates the CV served by the website.

## Deployment

The site is configured for:

```text
https://agimenezromero.github.io
```

GitHub Pages deployment is handled automatically through GitHub Actions.

The deployment workflow is located at:

```text
.github/workflows/deploy.yml
```

Pushes to the `main` branch trigger a new production build and deployment.

In the repository settings, GitHub Pages should use:

```text
Settings → Pages → Source → GitHub Actions
```

If a custom domain is introduced in the future, update the `site` value in:

```text
astro.config.mjs
```

and add the corresponding `CNAME` file under `public/`.

## Analytics

The website supports [Umami Analytics](https://umami.is/).

Analytics are enabled only when an Umami Website ID is provided.

For local analytics testing, create a `.env` file in the project root and configure:

```text
PUBLIC_UMAMI_WEBSITE_ID=
PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
PUBLIC_UMAMI_DOMAINS=agimenezromero.github.io
```

For production deployment, define the same values as GitHub repository variables under:

```text
Settings → Secrets and variables → Actions → Variables
```

The website tracks standard page views together with selected interactions, including publication links, research tools, research themes, CV access, outreach links and external academic profiles.

## License

Website content and research material remain the property of their respective authors unless otherwise stated.
