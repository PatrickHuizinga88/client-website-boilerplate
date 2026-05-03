import { defineField, defineType } from 'sanity';

export const richText = defineType({
  name: 'richText',
  title: 'Tekst',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Inhoud',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normaal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Vet', value: 'strong' },
              { title: 'Cursief', value: 'em' },
            ],
            annotations: [{ type: 'link' }],
          },
        },
      ],
    }),
  ],
  preview: {
    select: { content: 'content' },
    prepare: ({ content }) => {
      const first = Array.isArray(content)
        ? content.find((b: { _type?: string }) => b._type === 'block')
        : null;
      const text = first?.children?.map((c: { text?: string }) => c.text).join(' ') ?? '';
      return {
        title: 'Tekst',
        subtitle: text.slice(0, 80) || 'Geen inhoud',
      };
    },
  },
});
