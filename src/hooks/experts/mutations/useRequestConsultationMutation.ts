import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestConsultation } from '../../../apis/expertApi/matching';

export const useRequestConsultationMutation = (options?: { skipQueryInvalidation?: boolean }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ expertId, comment }: { expertId: number; comment: string }) =>
      requestConsultation(expertId, comment),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화 (옵션으로 건너뜀)
      if (!options?.skipQueryInvalidation) {
        queryClient.invalidateQueries({ queryKey: ['matchedExperts'] });
      }
    },
    onError: (error) => {
      console.error('상담 요청 실패:', error);
    },
  });
};
