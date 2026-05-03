import type { APIRoute } from 'astro';
import { PREVIEW_COOKIE_NAME } from '@/lib/preview';

export const prerender = false;

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete(PREVIEW_COOKIE_NAME, { path: '/' });
  return redirect('/');
};
