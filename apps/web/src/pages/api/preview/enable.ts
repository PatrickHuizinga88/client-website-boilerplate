import type { APIRoute } from 'astro';
import { PREVIEW_COOKIE_NAME } from '@/lib/preview';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const secret = url.searchParams.get('secret');
  const expected = import.meta.env.SANITY_API_READ_TOKEN;

  if (!expected || secret !== expected) {
    return new Response('Invalid secret', { status: 401 });
  }

  cookies.set(PREVIEW_COOKIE_NAME, '1', {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
    path: '/',
  });

  const target = url.searchParams.get('redirect') || '/';
  return redirect(target);
};
