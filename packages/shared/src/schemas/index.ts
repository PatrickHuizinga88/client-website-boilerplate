import { siteSettings } from './singletons/siteSettings';
import { homePage } from './singletons/homePage';
import { page } from './documents/page';
import { post } from './documents/post';
import { author } from './documents/author';
import { seo } from './objects/seo';
import { link } from './objects/link';
import { hero } from './blocks/hero';
import { richText } from './blocks/richText';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  // Documents
  page,
  post,
  author,
  // Reusable objects
  seo,
  link,
  // Page-builder blocks
  hero,
  richText,
];
