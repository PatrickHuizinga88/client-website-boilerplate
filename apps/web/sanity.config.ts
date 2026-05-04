import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes, structure } from '@boilerplate/shared';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.PUBLIC_SANITY_DATASET ?? 'development';

if (!projectId) {
  throw new Error('Missing PUBLIC_SANITY_PROJECT_ID env var.');
}

const SINGLETON_TYPES = ['siteSettings', 'homePage', 'contactPage'];

// Minimale Studio voor embedded /studio — voor de volledige variant
// (Vision, Media library, i18n) gebruik je apps/studio.
export default defineConfig({
  name: 'default',
  title: 'Client Website',
  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: { origin: 'same-origin', preview: '/' },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.includes(schemaType)),
  },

  document: {
    actions: (input, { schemaType }) =>
      SINGLETON_TYPES.includes(schemaType)
        ? input.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : input,
  },
});
