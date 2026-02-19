export interface InquiryPayload {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  category: string;
  message: string;
}

// Priority:
// 1) VITE_INQUIRY_EMAIL_ENDPOINT (custom webhook/API)
// 2) FormSubmit fallback using VITE_INQUIRY_EMAIL_TO or default inbox
const DEFAULT_INQUIRY_EMAIL = 'info@meghrajexports.com';

export async function sendInquiryEmail(payload: InquiryPayload): Promise<void> {
  const customEndpoint = import.meta.env.VITE_INQUIRY_EMAIL_ENDPOINT as string | undefined;
  const toEmail =
    (import.meta.env.VITE_INQUIRY_EMAIL_TO as string | undefined)?.trim() || DEFAULT_INQUIRY_EMAIL;

  if (customEndpoint) {
    const response = await fetch(customEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Inquiry email endpoint failed with status ${response.status}`);
    }
    return;
  }

  // Fallback provider to avoid requiring a backend service immediately.
  const formSubmitUrl = `https://formsubmit.co/ajax/${encodeURIComponent(toEmail)}`;
  const response = await fetch(formSubmitUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `New inquiry - ${payload.category}`,
      _captcha: 'false',
      name: payload.name,
      company: payload.company,
      country: payload.country,
      email: payload.email,
      whatsapp: payload.whatsapp,
      category: payload.category,
      message: payload.message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Inquiry email sending failed with status ${response.status}`);
  }

  const result = await response.json().catch(() => ({}));
  if (result?.success === false) {
    throw new Error(result?.message || 'Inquiry email sending failed');
  }
}
