import { defineField, defineType } from 'sanity';

export const textImage = defineType({
  name: 'textImage',
  title: 'Tekst + afbeelding',
  type: 'object',
  fields: [
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
      rows: 5,
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
      name: 'imagePosition',
      title: 'Positie afbeelding',
      type: 'string',
      options: {
        list: [
          { title: 'Rechts', value: 'right' },
          { title: 'Links', value: 'left' },
        ],
        layout: 'radio',
      },
      initialValue: 'right',
    }),
    defineField({ name: 'cta', title: 'Call-to-action', type: 'link' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'body', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title: title || 'Tekst + afbeelding',
      subtitle: subtitle?.slice(0, 80),
      media,
    }),
  },
});
