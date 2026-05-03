import { defineField, defineType } from 'sanity';

export const features = defineType({
  name: 'features',
  title: 'Features',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Kop', type: 'string' }),
    defineField({ name: 'intro', title: 'Intro', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icoon (emoji)',
              type: 'string',
              description: 'Plak een emoji, bv. ⚡ — laat leeg als je geen icoon wilt.',
              validation: (rule) => rule.max(4),
            }),
            defineField({
              name: 'title',
              title: 'Titel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'body',
              title: 'Tekst',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'body', icon: 'icon' },
            prepare: ({ title, subtitle, icon }) => ({
              title: icon ? `${icon} ${title}` : title,
              subtitle: subtitle?.slice(0, 80),
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
      title: title || 'Features',
      subtitle: `${items?.length ?? 0} items`,
    }),
  },
});
