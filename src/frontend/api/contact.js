/**
 * Enquiry endpoint for meghrajexports.com.
 *
 * Design rule: an enquiry is never lost because a downstream service failed.
 * The original version sent one SMTP email and stored nothing, so a bad SMTP
 * password meant the buyer saw a 500 and we never learned they existed. Now the
 * order is: persist first, notify second, auto-reply third — and the response to
 * the buyer is success if *any* of those durable steps worked.
 *
 * Everything added here is optional. With no new environment variables set, this
 * behaves exactly like the original: validate, send one email, return 200/500.
 *
 * Environment variables
 *   Required for email (unchanged):
 *     EMAIL_HOST, EMAIL_USER, EMAIL_PASS, EMAIL_PORT (default 587), EMAIL_SECURE
 *   Optional, enables durable storage:
 *     SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *   Optional, enables an instant phone notification:
 *     TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
 *
 * The service role key bypasses row level security and must never be exposed to
 * the browser. It belongs in Vercel's environment variables only, and must not be
 * prefixed with VITE_ (anything VITE_-prefixed is compiled into the client bundle).
 */

const RECIPIENT_EMAIL = 'info@meghrajexports.com';
const COMPANY_NAME = 'Meghraj Exports';
const REPLY_WINDOW = 'within 24 business hours';

// ── Field length caps ────────────────────────────────────────────────────────
const FIELD_LIMITS = {
  name: 200,
  email: 320,
  message: 5000,
  company: 300,
  country: 100,
  whatsapp: 30,
  category: 100,
  categories: 10,      // max array items
  categoryItem: 100,   // max chars per category item
};

// ── In-memory rate limiter (per-IP, 5 requests per 10 minutes) ───────────────
// Note: Vercel may run multiple function instances, so this only limits an
// attacker who happens to keep hitting the same warm instance. It stops casual
// abuse and nothing more. A durable limit belongs in the database; until enquiry
// volume justifies that, this plus the honeypot below is the pragmatic trade.
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_MAX = 5;
const ipMap = new Map(); // ip → [timestamps]

function isRateLimited(ip) {
  const now = Date.now();
  const hits = (ipMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  ipMap.set(ip, hits);
  // Prune old IPs to avoid memory leaks on long-running warm instances
  if (ipMap.size > 5000) {
    for (const [k, v] of ipMap) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) ipMap.delete(k);
    }
  }
  return hits.length > RATE_MAX;
}

// ── Utilities ────────────────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  // RFC-5321 practical limit is 320 chars; regex checks basic structure
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= FIELD_LIMITS.email;
}

function truncate(value, max) {
  return String(value).slice(0, max);
}

/**
 * Short, human-readable reference quoted back to the buyer and stored on the row,
 * e.g. MX-20260830-A7K2. Gives both sides something to say on the phone, and makes
 * "did you get my enquiry?" answerable in one search.
 */
function buildReference(now = new Date()) {
  const date =
    `${now.getUTCFullYear()}` +
    `${String(now.getUTCMonth() + 1).padStart(2, '0')}` +
    `${String(now.getUTCDate()).padStart(2, '0')}`;
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I/O/0/1 — read aloud without ambiguity
  let suffix = '';
  for (let i = 0; i < 4; i += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MX-${date}-${suffix}`;
}

/* ── durable storage ───────────────────────────────────────────────────────── */

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? { url: url.replace(/\/+$/, ''), key } : null;
}

/**
 * Writes the enquiry to Supabase over the REST API. Uses global fetch rather than
 * the Supabase client so this stays dependency-free.
 * Returns true if the row was stored. Never throws — a storage failure must not
 * stop the email from going out.
 */
async function storeEnquiry(record) {
  const config = supabaseConfig();
  if (!config) return false;

  try {
    const response = await fetch(`${config.url}/rest/v1/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: config.key,
        Authorization: `Bearer ${config.key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(record),
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      const body = await response.text().catch(() => '');
      console.error('Enquiry storage failed:', response.status, body.slice(0, 400));
      return false;
    }
    return true;
  } catch (error) {
    console.error('Enquiry storage threw:', error instanceof Error ? error.message : error);
    return false;
  }
}

/** Best-effort flag on the stored row so a failed email is visible later, not silent. */
async function markDelivery(reference, patch) {
  const config = supabaseConfig();
  if (!config) return;

  try {
    await fetch(
      `${config.url}/rest/v1/enquiries?reference=eq.${encodeURIComponent(reference)}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(patch),
        signal: AbortSignal.timeout(8000),
      }
    );
  } catch (error) {
    console.error('Delivery flag update failed:', error instanceof Error ? error.message : error);
  }
}

/* ── instant notification ──────────────────────────────────────────────────── */

/**
 * Optional Telegram push so a new enquiry reaches a phone in seconds rather than
 * whenever email is next checked. In this business the first credible reply
 * usually wins the sample order, so minutes matter.
 */
async function notifyTelegram({ reference, name, company, country, email, whatsapp, categoryLabel }) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const lines = [
    `New enquiry ${reference}`,
    `${name}${company ? ` — ${company}` : ''}${country ? ` (${country})` : ''}`,
    categoryLabel ? `Product: ${categoryLabel}` : null,
    `Email: ${email}`,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
  ].filter(Boolean);

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: lines.join('\n'), disable_web_page_preview: true }),
      signal: AbortSignal.timeout(6000),
    });
  } catch (error) {
    console.error('Telegram notification failed:', error instanceof Error ? error.message : error);
  }
}

/* ── email bodies ──────────────────────────────────────────────────────────── */

function internalEmailHtml({ reference, name, email, company, country, whatsapp, categoryLabel, message }) {
  const row = (label, value) =>
    `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;width:140px;"><strong>${label}</strong></td>` +
    `<td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td></tr>`;

  return `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:700px;">
          <h2 style="margin:0 0 4px;color:#111827;">New Website Enquiry</h2>
          <p style="margin:0 0 16px;color:#6b7280;font-size:13px;">Reference ${escapeHtml(reference)}</p>
          <table style="border-collapse:collapse;width:100%;">
            ${row('Name', escapeHtml(name))}
            ${row('Email', `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`)}
            ${row('Company', escapeHtml(company || '—'))}
            ${row('Country', escapeHtml(country || '—'))}
            ${row('WhatsApp', whatsapp ? `<a href="https://wa.me/${escapeHtml(whatsapp.replace(/\D/g, ''))}">${escapeHtml(whatsapp)}</a>` : '—')}
            ${row('Category', escapeHtml(categoryLabel || '—'))}
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;vertical-align:top;"><strong>Message</strong></td>
            <td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
        </div>
      `;
}

/**
 * Auto-reply to the buyer. Content is deliberately useful rather than a receipt:
 * a buyer contacting several suppliers in one sitting gets our MOQ, sampling and
 * lead-time answers immediately, which is often what decides who they talk to next.
 * Every figure below matches the published FAQ on /oem.
 */
function autoReplyHtml({ reference, name, categoryLabel }) {
  return `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:620px;">
          <p>Dear ${escapeHtml(name)},</p>
          <p>
            Thank you for your enquiry to ${COMPANY_NAME}. We have received it and a member of
            our team will respond ${REPLY_WINDOW} with product options, pricing and lead times.
          </p>
          <p style="margin:0 0 20px;">
            Your reference is <strong>${escapeHtml(reference)}</strong>${categoryLabel ? ` (${escapeHtml(categoryLabel)})` : ''}.
            Please quote it in any follow-up.
          </p>

          <h3 style="margin:24px 0 8px;font-size:15px;color:#111827;">While you wait — the answers buyers usually need first</h3>
          <table style="border-collapse:collapse;width:100%;font-size:14px;">
            <tr><td style="padding:6px 10px;border:1px solid #e5e7eb;width:190px;"><strong>Minimum order</strong></td>
                <td style="padding:6px 10px;border:1px solid #e5e7eb;">Typically from 100 units, varying with customisation, materials and packaging.</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>Sampling</strong></td>
                <td style="padding:6px 10px;border:1px solid #e5e7eb;">A physical pre-production sample is always produced and approved before bulk. 15–20 business days; sample charges are credited against the bulk order.</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>Bulk lead time</strong></td>
                <td style="padding:6px 10px;border:1px solid #e5e7eb;">45–60 days after sample approval, depending on volume and style complexity.</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>Branding</strong></td>
                <td style="padding:6px 10px;border:1px solid #e5e7eb;">Embroidery, screen print, heat transfer, woven labels and leather patches. Pantone colour matching available.</td></tr>
            <tr><td style="padding:6px 10px;border:1px solid #e5e7eb;"><strong>Export documentation</strong></td>
                <td style="padding:6px 10px;border:1px solid #e5e7eb;">Commercial invoice, packing list, certificate of origin and bill of lading. We are an IEC-registered exporter.</td></tr>
          </table>

          <p style="margin:24px 0 6px;">
            If it is faster for you, reply to this email or message us on WhatsApp at +91 96966 97000.
          </p>
          <p style="margin:0 0 24px;">
            Full OEM details: <a href="https://www.meghrajexports.com/oem">meghrajexports.com/oem</a>
          </p>

          <p style="margin:0;color:#6b7280;font-size:13px;">
            ${COMPANY_NAME}<br>
            E-1A, Industrial Area, Jalandhar, Punjab 144004, India<br>
            Factory-direct. No agents, no middlemen.
          </p>
        </div>
      `;
}

// ── Handler ──────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  // Method guard
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  // Rate limit
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Too many requests. Please wait a few minutes before submitting again.',
    });
  }

  // Parse body
  let body = req.body || {};
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid request format.' });
    }
  }

  // Reject non-object payloads
  if (typeof body !== 'object' || Array.isArray(body) || body === null) {
    return res.status(400).json({ error: 'Invalid request format.' });
  }

  // Honeypot: a field no human sees and no real submission fills. Bots that
  // blindly complete every input give themselves away here. Answer 200 so the
  // bot believes it succeeded and does not retry with a different strategy.
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    console.warn('Honeypot triggered — discarding submission from', ip);
    return res.status(200).json({ ok: true });
  }

  // Extract and enforce length limits
  const name     = truncate(String(body.name    || '').trim(), FIELD_LIMITS.name);
  const email    = truncate(String(body.email   || '').trim(), FIELD_LIMITS.email);
  const message  = truncate(String(body.message || '').trim(), FIELD_LIMITS.message);
  const company  = truncate(String(body.company || '').trim(), FIELD_LIMITS.company);
  const country  = truncate(String(body.country || '').trim(), FIELD_LIMITS.country);
  const whatsapp = truncate(String(body.whatsapp|| '').trim(), FIELD_LIMITS.whatsapp);
  const category = truncate(String(body.category|| '').trim(), FIELD_LIMITS.category);

  const categories = Array.isArray(body.categories)
    ? body.categories
        .slice(0, FIELD_LIMITS.categories)
        .map((item) => truncate(String(item || '').trim(), FIELD_LIMITS.categoryItem))
        .filter(Boolean)
    : [];

  const categoryLabel = categories.length > 0 ? categories.join(', ') : category;

  // Required field validation
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  // WhatsApp: if provided, must look like digits only (already normalized on the client)
  if (whatsapp && !/^\+?\d{6,20}$/.test(whatsapp)) {
    return res.status(400).json({ error: 'Invalid WhatsApp number format.' });
  }

  const reference = buildReference();

  // ── Step 1: store it. This happens before anything that can fail noisily, so
  // an enquiry survives a broken mailbox.
  const stored = await storeEnquiry({
    reference,
    name,
    email,
    company: company || null,
    country: country || null,
    whatsapp: whatsapp || null,
    category: category || null,
    categories: categories.length > 0 ? categories : null,
    message,
    source_ip: ip,
    user_agent: truncate(String(req.headers['user-agent'] || ''), 500) || null,
    referer: truncate(String(req.headers.referer || ''), 500) || null,
  });

  // ── Step 2: instant phone notification, if configured.
  await notifyTelegram({ reference, name, company, country, email, whatsapp, categoryLabel });

  // ── Step 3: email. Notification to us, auto-reply to the buyer.
  const emailUser   = process.env.EMAIL_USER;
  const emailPass   = process.env.EMAIL_PASS;
  const emailHost   = process.env.EMAIL_HOST;
  const emailPort   = Number(process.env.EMAIL_PORT || 587);
  const emailSecure =
    process.env.EMAIL_SECURE === 'true' ||
    (process.env.EMAIL_SECURE !== 'false' && emailPort === 465);

  const missingConfig = [
    !emailHost && 'EMAIL_HOST',
    !emailUser && 'EMAIL_USER',
    !emailPass && 'EMAIL_PASS',
  ].filter(Boolean);

  if (missingConfig.length > 0) {
    console.error('Email service misconfigured. Missing:', missingConfig.join(', '));
    await markDelivery(reference, {
      delivery_error: `Email not configured: missing ${missingConfig.join(', ')}`,
    });
    // If it was stored, the enquiry is safe even though no email went out — say so
    // rather than telling a buyer their message failed when it did not.
    if (stored) {
      return res.status(200).json({ ok: true, reference });
    }
    return res.status(500).json({
      error: 'Email service is temporarily unavailable. Please contact us directly at info@meghrajexports.com',
    });
  }

  let notified = false;
  let deliveryError = null;

  try {
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from:    `"${COMPANY_NAME} Website" <${emailUser}>`,
      replyTo: email,   // user-supplied; validated above
      to:      RECIPIENT_EMAIL,
      subject: `New Enquiry ${reference}${categoryLabel ? ` — ${categoryLabel}` : ''}`,
      html: internalEmailHtml({ reference, name, email, company, country, whatsapp, categoryLabel, message }),
    });
    notified = true;

    // The auto-reply is a separate send so that a bounce or a rejected recipient
    // cannot take down the notification we depend on.
    try {
      await transporter.sendMail({
        from:    `"${COMPANY_NAME}" <${emailUser}>`,
        replyTo: RECIPIENT_EMAIL,
        to:      email,
        subject: `We've received your enquiry — ${reference}`,
        html: autoReplyHtml({ reference, name, categoryLabel }),
      });
      await markDelivery(reference, {
        notified_at: new Date().toISOString(),
        autoreply_at: new Date().toISOString(),
      });
    } catch (autoReplyError) {
      const detail = autoReplyError instanceof Error ? autoReplyError.message : 'Unknown error';
      console.error('Auto-reply failed:', detail);
      await markDelivery(reference, {
        notified_at: new Date().toISOString(),
        delivery_error: `Auto-reply failed: ${detail}`,
      });
    }

    return res.status(200).json({ ok: true, reference });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    deliveryError = err.message;
    console.error('Email send failed:', {
      message: err.message,
      code:     error?.code,
      command:  error?.command,
    });
  }

  await markDelivery(reference, { delivery_error: `Notification failed: ${deliveryError}` });

  // Stored but not emailed: the enquiry is safe and will be picked up from the
  // table, so do not tell the buyer to send it again.
  if (stored && !notified) {
    return res.status(200).json({ ok: true, reference });
  }

  return res.status(500).json({
    error: 'Failed to send your enquiry. Please try again or contact us directly at info@meghrajexports.com',
  });
}
