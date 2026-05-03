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

export type PageBlock = HeroBlock | RichTextBlock;

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
