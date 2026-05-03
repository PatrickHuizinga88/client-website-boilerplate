import { defineField, defineType } from 'sanity';

export const cta = defineType({
  name: 'cta',
  title: 'Call-to-action',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttons',
      title: 'Knoppen',
      type: 'array',
      of: [{ type: 'link' }],
      validation: (rule) => rule.max(2).warning('Max 2 knoppen aanbevolen.'),
    }),
  ],
  preview: {
    select: { title: 'heading', subtitle: 'body' },
    prepare: ({ title, subtitle }) => ({
      title: title || 'CTA',
      subtitle: subtitle?.slice(0, 80),
    }),
  },
});
