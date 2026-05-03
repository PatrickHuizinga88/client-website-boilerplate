import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sanityClient } from '@/lib/sanity/client';
import { sitemapEntriesQuery } from '@/lib/sanity/queries';

export const prerender = false;

type SitemapData = {
  pages: Array<{ slug: string; _updatedAt: string }>;
  posts: Array<{ slug: string; _updatedAt: string }>;
  homeUpdated: string | null;
  contactUpdated: string | null;
};

const escapeXml = (str: string) =>
  str.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ?? new URL(import.meta.env.PUBLIC_SITE_URL ?? 'http://localhost:4321')).toString().replace(/\/$/, '');

  const [data, legalEntries] = await Promise.all([
    sanityClient.fetch<SitemapData>(sitemapEntriesQuery),
    getCollection('legal'),
  ]);

  const entries: Array<{ loc: string; lastmod?: string; priority?: string }> = [
    { loc: `${baseUrl}/`, lastmod: data.homeUpdated ?? undefined, priority: '1.0' },
    { loc: `${baseUrl}/blog`, priority: '0.8' },
    { loc: `${baseUrl}/contact`, lastmod: data.contactUpdated ?? undefined, priority: '0.7' },
    ...data.pages.map((p) => ({
      loc: `${baseUrl}/${p.slug}`,
      lastmod: p._updatedAt,
      priority: '0.7',
    })),
    ...data.posts.map((p) => ({
      loc: `${baseUrl}/blog/${p.slug}`,
      lastmod: p._updatedAt,
      priority: '0.6',
    })),
    ...legalEntries.map((entry) => ({
      loc: `${baseUrl}/${entry.id}`,
      lastmod: entry.data.updatedAt,
      priority: '0.3',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${escapeXml(e.loc)}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}${e.priority ? `\n    <priority>${e.priority}</priority>` : ''}
  </url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
