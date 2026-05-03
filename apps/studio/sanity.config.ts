import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { media } from 'sanity-plugin-media';
import { documentInternationalization } from '@sanity/document-internationalization';
import { schemaTypes, structure } from '@boilerplate/shared';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? '';
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'development';

if (!projectId) {
  throw new Error('Missing SANITY_STUDIO_PROJECT_ID env var. See .env.example.');
}

export default defineConfig({
  name: 'default',
  title: 'Client Website',
  projectId,
  dataset,
  basePath: '/studio',

  plugins: [
    structureTool({ structure }),
    visionTool(),
    media(),
    documentInternationalization({
      supportedLanguages: [{ id: 'nl', title: 'Nederlands' }],
      schemaTypes: ['page', 'post'],
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !['siteSettings', 'homePage', 'contactPage'].includes(schemaType)),
  },

  document: {
    actions: (input, { schemaType }) =>
      ['siteSettings', 'homePage', 'contactPage'].includes(schemaType)
        ? input.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action ?? ''))
        : input,
  },
});
