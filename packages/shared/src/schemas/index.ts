import { siteSettings } from './singletons/siteSettings';
import { homePage } from './singletons/homePage';
import { contactPage } from './singletons/contactPage';
import { page } from './documents/page';
import { post } from './documents/post';
import { author } from './documents/author';
import { seo } from './objects/seo';
import { link } from './objects/link';
import { hero } from './blocks/hero';
import { richText } from './blocks/richText';
import { contactBlock } from './blocks/contactBlock';

export const schemaTypes = [
  // Singletons
  siteSettings,
  homePage,
  contactPage,
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
  contactBlock,
];
