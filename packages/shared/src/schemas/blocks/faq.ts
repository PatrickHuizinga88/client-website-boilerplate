import { defineField, defineType } from 'sanity';

export const faq = defineType({
  name: 'faq',
  title: 'Veelgestelde vragen',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Kop', type: 'string' }),
    defineField({
      name: 'items',
      title: 'Vragen',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({
              name: 'question',
              title: 'Vraag',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'answer',
              title: 'Antwoord',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'question', subtitle: 'answer' },
            prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle?.slice(0, 80) }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', items: 'items' },
    prepare: ({ title, items }) => ({
      title: title || 'FAQ',
      subtitle: `${items?.length ?? 0} vragen`,
    }),
  },
});
