import { defineField, defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Interne titel',
      type: 'string',
      description: 'Alleen zichtbaar in de Studio.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blocks',
      title: 'Pagina-onderdelen',
      type: 'array',
      of: [{ type: 'hero' }, { type: 'richText' }, { type: 'contactBlock' }],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
});
