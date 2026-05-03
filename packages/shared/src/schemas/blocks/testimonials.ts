import { defineField, defineType } from 'sanity';

export const testimonials = defineType({
  name: 'testimonials',
  title: 'Klantverhalen',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Kop', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorName',
              title: 'Naam',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'authorRole',
              title: 'Rol / bedrijf',
              type: 'string',
            }),
            defineField({
              name: 'avatar',
              title: 'Foto',
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
          ],
          preview: {
            select: { title: 'authorName', subtitle: 'quote', media: 'avatar' },
            prepare: ({ title, subtitle, media }) => ({
              title,
              subtitle: subtitle?.slice(0, 80),
              media,
            }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare: ({ title, items }) => ({
      title: title || 'Klantverhalen',
      subtitle: `${items?.length ?? 0} items`,
    }),
  },
});
