import { useMutation } from '@tanstack/react-query';

interface InquiryFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  country?: string;
  whatsapp?: string;
  category?: string;
  categories?: string[];
  /**
   * Honeypot. Always sent empty by the real form — the input is hidden from
   * sighted users and skipped by keyboard focus. Bots that fill every field in
   * the DOM populate it, and the API silently discards those submissions.
   */
  website?: string;
}

export interface InquiryResult {
  /** Reference the buyer can quote, e.g. MX-20260830-A7K2. Absent on older deployments. */
  reference?: string;
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (data: InquiryFormData): Promise<InquiryResult> => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        let message = 'Failed to submit enquiry. Please try again.';

        if (contentType.includes('application/json')) {
          const payload = (await response.json().catch(() => ({}))) as { error?: string };
          if (payload.error) {
            message = payload.error;
          }
        } else {
          const text = (await response.text().catch(() => '')).trim();
          if (text) {
            message = text;
          }
        }

        throw new Error(message);
      }

      // The API returns { ok: true, reference }. Older deployments returned an
      // empty body, so treat a parse failure as "succeeded, no reference".
      const result = (await response.json().catch(() => ({}))) as InquiryResult;
      return result;
    },
  });
}
