import { defineConfig } from 'astro/config';
import { config as loadDotenv } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// .env staat in de monorepo-root zodat één bestand volstaat voor de Astro
// frontend én de embedded /studio.
const monorepoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
loadDotenv({ path: resolve(monorepoRoot, '.env') });

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'development';
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION ?? '2025-01-01';

if (!projectId) {
  throw new Error(
    'Missing PUBLIC_SANITY_PROJECT_ID. Copy .env.example to .env in the monorepo root.',
  );
}

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL ?? 'http://localhost:4321',
  // Hybrid: pages are static-by-default; API routes opt out via `export const prerender = false`.
  // Swap adapter (Cloudflare/Vercel) per project — see README.
  adapter: node({ mode: 'standalone' }),

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
    // Zelfde root voor client-side import.meta.env.PUBLIC_*.
    envDir: monorepoRoot,
    define: {
      // Sanity Studio (embedded onder /studio) leest deze keys; Vite vervangt ze
      // bij build door de waarde — geen aparte SANITY_STUDIO_* vars nodig.
      'process.env.SANITY_STUDIO_PROJECT_ID': JSON.stringify(projectId),
      'process.env.SANITY_STUDIO_DATASET': JSON.stringify(dataset),
    },
  },
});
