import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Inquiry } from '../backend';
import { sendInquiryEmail } from '../utils/inquiryEmail';

interface InquiryFormData {
  name: string;
  company: string;
  country: string;
  email: string;
  whatsapp: string;
  category: string;
  message: string;
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InquiryFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      await actor.submitInquiry(
        data.name,
        data.company,
        data.country,
        data.email,
        data.whatsapp,
        data.category,
        data.message
      );

      try {
        await sendInquiryEmail(data);
      } catch (error) {
        // Keep inquiry persisted in backend; report email failure explicitly.
        const message =
          error instanceof Error ? error.message : 'Inquiry saved, but email sending failed.';
        throw new Error(`Inquiry saved, but email sending failed: ${message}`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inquiries'] });
    },
  });
}

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();

  return useQuery<Inquiry[]>({
    queryKey: ['inquiries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}
