import nodemailer from 'nodemailer';

const RECIPIENT_EMAIL = 'info@meghrajexports.com';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body = req.body || {};
  if (typeof req.body === 'string') {
    try {
      body = JSON.parse(req.body || '{}');
    } catch {
      return res.status(400).json({ error: 'Invalid JSON payload.' });
    }
  }
  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const message = String(body.message || '').trim();
  const company = String(body.company || '').trim();
  const country = String(body.country || '').trim();
  const whatsapp = String(body.whatsapp || '').trim();
  const category = String(body.category || '').trim();
  const categories = Array.isArray(body.categories)
    ? body.categories
        .map((item) => String(item || '').trim())
        .filter(Boolean)
    : [];
  const categoryLabel = categories.length > 0 ? categories.join(', ') : category;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailHost = process.env.EMAIL_HOST;
  const emailPort = Number(process.env.EMAIL_PORT || 587);
  const emailSecure =
    process.env.EMAIL_SECURE === 'true' || (process.env.EMAIL_SECURE !== 'false' && emailPort === 465);

  if (!emailUser || !emailPass || !emailHost) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    await transporter.sendMail({
      from: `"MeghRaj Exports Website" <${emailUser}>`,
      replyTo: email,
      to: RECIPIENT_EMAIL,
      subject: `New Inquiry${categoryLabel ? ` - ${categoryLabel}` : ''}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5;color:#1f2937;">
          <h2 style="margin:0 0 16px 0;color:#111827;">New Website Inquiry</h2>
          <table style="border-collapse:collapse;width:100%;max-width:680px;">
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Name</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Email</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(email)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Company</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(company || '-')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Country</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(country || '-')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>WhatsApp</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(whatsapp || '-')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Categories</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(categoryLabel || '-')}</td></tr>
            <tr><td style="padding:8px;border:1px solid #e5e7eb;vertical-align:top;"><strong>Message</strong></td><td style="padding:8px;border:1px solid #e5e7eb;white-space:pre-wrap;">${escapeHtml(message)}</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown email error');
    const debugDetails = {
      message: err.message,
      code: error && typeof error === 'object' && 'code' in error ? error.code : undefined,
      command: error && typeof error === 'object' && 'command' in error ? error.command : undefined,
      response:
        error && typeof error === 'object' && 'response' in error ? error.response : undefined,
    };

    console.error('Email send failed:', debugDetails);

    const includeDebug = process.env.DEBUG_EMAIL_ERRORS === 'true' || process.env.NODE_ENV !== 'production';
    return res.status(500).json({
      error: 'Failed to send inquiry email.',
      ...(includeDebug ? { details: debugDetails } : {}),
    });
  }
}
