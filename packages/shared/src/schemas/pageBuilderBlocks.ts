// List of block types beschikbaar in de page-builder.
// Apart bestand om circulaire imports met homePage/page schemas te voorkomen.
export const pageBuilderBlocks = [
  { type: 'hero' },
  { type: 'textImage' },
  { type: 'features' },
  { type: 'testimonials' },
  { type: 'faq' },
  { type: 'cta' },
  { type: 'logoCloud' },
  { type: 'gallery' },
  { type: 'richText' },
  { type: 'contactBlock' },
] as const;
