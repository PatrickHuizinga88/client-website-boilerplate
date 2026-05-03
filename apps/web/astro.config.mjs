import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'development';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2025-01-01';

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID. Copy .env.example to .env and fill it in.');
}

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',

  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
      studioBasePath: '/studio',
      stega: { studioUrl: '/studio' },
    }),
    tailwind({ applyBaseStyles: true }),
    react(),
  ],

  vite: {
    define: {
      'process.env.SANITY_STUDIO_PROJECT_ID': JSON.stringify(projectId),
      'process.env.SANITY_STUDIO_DATASET': JSON.stringify(dataset),
    },
  },
});
