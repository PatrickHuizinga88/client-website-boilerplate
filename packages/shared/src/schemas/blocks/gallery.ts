import { defineField, defineType } from 'sanity';

export const gallery = defineType({
  name: 'gallery',
  title: 'Galerij',
  type: 'object',
  fields: [
    defineField({ name: 'heading', title: 'Kop', type: 'string' }),
    defineField({
      name: 'columns',
      title: 'Kolommen',
      type: 'number',
      options: { list: [2, 3, 4] },
      initialValue: 3,
    }),
    defineField({
      name: 'images',
      title: 'Afbeeldingen',
      type: 'array',
      of: [
        {
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
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'heading', images: 'images' },
    prepare: ({ title, images }) => ({
      title: title || 'Galerij',
      subtitle: `${images?.length ?? 0} afbeeldingen`,
    }),
  },
});
