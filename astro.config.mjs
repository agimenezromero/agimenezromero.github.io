import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agimenezromero.github.io',
  trailingSlash: 'never',
  integrations: [sitemap()],
});
