import { defineField, defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta titel',
      type: 'string',
      description: 'Max ~60 tekens. Valt terug op de pagina-titel als leeg.',
      validation: (rule) => rule.max(70).warning('Houd het onder 70 tekens.'),
    }),
    defineField({
      name: 'description',
      title: 'Meta beschrijving',
      type: 'text',
      rows: 3,
      description: 'Max ~160 tekens.',
      validation: (rule) => rule.max(180).warning('Houd het onder 180 tekens.'),
    }),
    defineField({
      name: 'image',
      title: 'Open Graph afbeelding',
      type: 'image',
      options: { hotspot: true },
      description: 'Aanbevolen 1200×630px.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Niet indexeren',
      type: 'boolean',
      description: 'Voegt een noindex meta tag toe.',
      initialValue: false,
    }),
  ],
});
