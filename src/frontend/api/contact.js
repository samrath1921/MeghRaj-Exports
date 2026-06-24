const RECIPIENT_EMAIL = 'info@meghrajexports.com';

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
// Note: Vercel may run multiple function instances; for strict distributed
// rate limiting, replace this with @vercel/kv. This is sufficient to stop
// casual abuse on a single instance.
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

  // SMTP config
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
    return res.status(500).json({ error: 'Email service is temporarily unavailable. Please contact us directly at info@meghrajexports.com' });
  }

  // Send
  try {
    const { default: nodemailer } = await import('nodemailer');
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: { user: emailUser, pass: emailPass },
    });

    await transporter.sendMail({
      from:    `"MeghRaj Exports Website" <${emailUser}>`,
      replyTo: email,   // user-supplied; validated above
      to:      RECIPIENT_EMAIL,
      subject: `New Enquiry${categoryLabel ? ` — ${escapeHtml(categoryLabel)}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1f2937;max-width:700px;">
          <h2 style="margin:0 0 16px;color:#111827;">New Website Enquiry</h2>
          <table style="border-collapse:collapse;width:100%;">
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;width:140px;"><strong>Name</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>Company</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(company || '—')}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>Country</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(country || '—')}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>WhatsApp</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(whatsapp || '—')}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;"><strong>Category</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(categoryLabel || '—')}</td></tr>
            <tr><td style="padding:8px 12px;border:1px solid #e5e7eb;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px 12px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('Email send failed:', {
      message: err.message,
      code:     error?.code,
      command:  error?.command,
    });
    return res.status(500).json({
      error: 'Failed to send your enquiry. Please try again or contact us directly at info@meghrajexports.com',
    });
  }
}
