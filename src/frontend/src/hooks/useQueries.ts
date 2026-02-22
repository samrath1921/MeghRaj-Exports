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
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (data: InquiryFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        let message = 'Failed to submit inquiry. Please try again.';

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
    },
  });
}
