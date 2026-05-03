import { defineField, defineType } from 'sanity';

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      description: 'Klein labeltje boven de titel.',
    }),
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitel',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Afbeelding',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call-to-action',
      type: 'link',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Hero',
      subtitle: subtitle?.slice(0, 80),
      media,
    }),
  },
});
