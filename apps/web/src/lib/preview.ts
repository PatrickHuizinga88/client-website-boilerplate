import type { AstroCookies } from 'astro';

const PREVIEW_COOKIE = 'sanity-preview';

export const isPreview = (cookies: AstroCookies): boolean =>
  cookies.get(PREVIEW_COOKIE)?.value === '1';

export const PREVIEW_COOKIE_NAME = PREVIEW_COOKIE;
