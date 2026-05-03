import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site instellingen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sitenaam',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschrijving',
      type: 'text',
      rows: 3,
      description: 'Wordt gebruikt als fallback voor SEO en in de footer.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contact',
      title: 'Contactgegevens',
      type: 'object',
      fields: [
        defineField({ name: 'email', title: 'E-mail', type: 'string' }),
        defineField({ name: 'phone', title: 'Telefoon', type: 'string' }),
        defineField({ name: 'address', title: 'Adres', type: 'text', rows: 3 }),
      ],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              type: 'string',
              options: {
                list: ['LinkedIn', 'Instagram', 'Facebook', 'X', 'YouTube'],
              },
            }),
            defineField({ name: 'url', type: 'url' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Standaard SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site instellingen' }),
  },
});
