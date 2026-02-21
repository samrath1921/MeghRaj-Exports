import { useMutation } from '@tanstack/react-query';

interface InquiryFormData {
  name: string;
  email: string;
  message: string;
  company?: string;
  country?: string;
  whatsapp?: string;
  category?: string;
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

      let payload: { error?: string } = {};
      try {
        payload = (await response.json()) as { error?: string };
      } catch {
        payload = {};
      }

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to submit inquiry. Please try again.');
      }
    },
  });
}
