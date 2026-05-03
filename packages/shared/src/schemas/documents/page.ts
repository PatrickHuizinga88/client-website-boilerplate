import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Pagina',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
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
    select: { title: 'title', slug: 'slug.current' },
    prepare: ({ title, slug }) => ({
      title,
      subtitle: slug ? `/${slug}` : 'Geen slug',
    }),
  },
});
