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
import { cta } from './blocks/cta';
import { features } from './blocks/features';
import { testimonials } from './blocks/testimonials';
import { faq } from './blocks/faq';
import { textImage } from './blocks/textImage';
import { logoCloud } from './blocks/logoCloud';
import { gallery } from './blocks/gallery';

export { pageBuilderBlocks } from './pageBuilderBlocks';

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
  cta,
  features,
  testimonials,
  faq,
  textImage,
  logoCloud,
  gallery,
];
