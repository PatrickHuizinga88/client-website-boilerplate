import { defineField, defineType } from 'sanity';

export const logoCloud = defineType({
  name: 'logoCloud',
  title: 'Logobalk',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Kop', type: 'string' }),
    defineField({
      name: 'logos',
      title: "Logo's",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'logoItem',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt-tekst',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({ name: 'url', title: 'Link (optioneel)', type: 'url' }),
          ],
          preview: {
            select: { title: 'image.alt', media: 'image' },
            prepare: ({ title, media }) => ({ title: title || 'Logo', media }),
          },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', logos: 'logos' },
    prepare: ({ title, logos }) => ({
      title: title || 'Logobalk',
      subtitle: `${logos?.length ?? 0} logo's`,
    }),
  },
});
