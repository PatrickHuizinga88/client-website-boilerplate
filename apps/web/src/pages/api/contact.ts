import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { sanityClient } from '@/lib/sanity/client';
import { contactPageQuery } from '@/lib/sanity/queries';
import type { ContactPage } from '@/lib/sanity/types';

export const prerender = false;

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const escapeHtml = (str: string) =>
  str.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return c;
    }
  });

const respond = (
  request: Request,
  ok: boolean,
  message: string,
  errorStatus = 400,
): Response => {
  const wantsJson = request.headers.get('accept')?.includes('application/json');
  if (wantsJson) {
    return new Response(JSON.stringify({ ok, message }), {
      status: ok ? 200 : errorStatus,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const referer = request.headers.get('referer');
  if (!referer) {
    return new Response(message, { status: ok ? 200 : errorStatus });
  }
  const url = new URL(referer);
  url.searchParams.set('status', ok ? 'success' : 'error');
  return Response.redirect(url.toString(), 303);
};

const verifyTurnstile = async (token: string, ip?: string): Promise<boolean> => {
  const secret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const params = new URLSearchParams();
  params.set('secret', secret);
  params.set('response', token);
  if (ip) params.set('remoteip', ip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: params });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const form = await request.formData();
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    const honeypot = String(form.get('website') ?? '').trim();
    const turnstileToken = String(form.get('cf-turnstile-response') ?? '');

    if (honeypot) {
      // Stilte tegenover bots — return success zodat ze geen retry doen.
      return respond(request, true, 'OK');
    }

    if (!name || !email || !message) {
      return respond(request, false, 'Vul alle verplichte velden in.', 400);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond(request, false, 'Ongeldig e-mailadres.', 400);
    }

    if (message.length > 5000) {
      return respond(request, false, 'Bericht is te lang.', 400);
    }

    const turnstileOk = await verifyTurnstile(turnstileToken, clientAddress);
    if (!turnstileOk) {
      return respond(request, false, 'Spam-controle gefaald.', 400);
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    const fromEmail = import.meta.env.RESEND_FROM_EMAIL;
    if (!apiKey || !fromEmail) {
      console.error('Contact form: RESEND_API_KEY of RESEND_FROM_EMAIL ontbreekt.');
      return respond(request, false, 'Server-configuratie ontbreekt.', 500);
    }

    const contactPage = await sanityClient.fetch<ContactPage | null>(contactPageQuery);
    const to = contactPage?.recipientEmail || import.meta.env.CONTACT_TO_EMAIL;
    if (!to) {
      console.error('Contact form: geen ontvanger ingesteld (Sanity of CONTACT_TO_EMAIL).');
      return respond(request, false, 'Server-configuratie ontbreekt.', 500);
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to,
      replyTo: email,
      subject: `Nieuw contactformulier: ${name}`,
      html: `
        <h2>Nieuw bericht via contactformulier</h2>
        <p><strong>Naam:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        <p><strong>Bericht:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return respond(request, false, 'Versturen mislukt.', 500);
    }

    return respond(request, true, 'OK');
  } catch (err) {
    console.error('Contact form error:', err);
    return respond(request, false, 'Onverwachte fout.', 500);
  }
};
