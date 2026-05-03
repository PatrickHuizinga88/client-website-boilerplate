import type { PortableTextBlock } from '@portabletext/types';

export type ImageRef = {
  _type: 'image';
  asset?: {
    _id: string;
    url?: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
      lqip?: string;
    };
  };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
};

export type Link = {
  label: string;
  type: 'internal' | 'external';
  href?: string | null;
};

export type HeroBlock = {
  _type: 'hero';
  _key: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: ImageRef;
  cta?: Link;
};

export type RichTextBlock = {
  _type: 'richText';
  _key: string;
  content?: PortableTextBlock[];
};

export type ContactBlock = {
  _type: 'contactBlock';
  _key: string;
  heading?: string;
  intro?: string;
};

export type CtaBlock = {
  _type: 'cta';
  _key: string;
  heading: string;
  body?: string;
  buttons?: Link[];
};

export type FeatureItem = {
  icon?: string;
  title: string;
  body?: string;
};

export type FeaturesBlock = {
  _type: 'features';
  _key: string;
  heading?: string;
  intro?: string;
  items?: FeatureItem[];
};

export type TestimonialItem = {
  quote: string;
  authorName: string;
  authorRole?: string;
  avatar?: ImageRef;
};

export type TestimonialsBlock = {
  _type: 'testimonials';
  _key: string;
  heading?: string;
  items?: TestimonialItem[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqBlock = {
  _type: 'faq';
  _key: string;
  heading?: string;
  items?: FaqItem[];
};

export type TextImageBlock = {
  _type: 'textImage';
  _key: string;
  title: string;
  body?: string;
  image?: ImageRef;
  imagePosition?: 'left' | 'right';
  cta?: Link;
};

export type LogoItem = {
  image?: ImageRef;
  url?: string;
};

export type LogoCloudBlock = {
  _type: 'logoCloud';
  _key: string;
  heading?: string;
  logos?: LogoItem[];
};

export type GalleryBlock = {
  _type: 'gallery';
  _key: string;
  heading?: string;
  columns?: number;
  images?: ImageRef[];
};

export type PageBlock =
  | HeroBlock
  | RichTextBlock
  | ContactBlock
  | CtaBlock
  | FeaturesBlock
  | TestimonialsBlock
  | FaqBlock
  | TextImageBlock
  | LogoCloudBlock
  | GalleryBlock;

export type Seo = {
  title?: string;
  description?: string;
  image?: ImageRef;
  noIndex?: boolean;
};

export type SiteSettings = {
  title: string;
  description?: string;
  logo?: ImageRef;
  contact?: { email?: string; phone?: string; address?: string };
  social?: Array<{ platform: string; url: string }>;
  defaultSeo?: Seo;
};

export type Page = {
  title: string;
  slug: string;
  blocks?: PageBlock[];
  seo?: Seo;
};

export type HomePage = {
  title: string;
  blocks?: PageBlock[];
  seo?: Seo;
};

export type Author = {
  name: string;
  slug?: { current: string };
  avatar?: ImageRef;
  bio?: string;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  coverImage?: ImageRef;
  body?: PortableTextBlock[];
  author?: Author;
  seo?: Seo;
};

export type ContactPage = {
  title: string;
  intro?: string;
  recipientEmail?: string;
  privacyNotice?: string;
  successMessage?: string;
  errorMessage?: string;
  seo?: Seo;
};
