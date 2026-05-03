import { defineField, defineType } from 'sanity';

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contactformulier',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Kop',
      type: 'string',
      initialValue: 'Neem contact op',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({
      title: title || 'Contactformulier',
      subtitle: 'Embedded form',
    }),
  },
});
