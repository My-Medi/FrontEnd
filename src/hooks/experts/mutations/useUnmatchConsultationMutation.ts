import { useMutation, useQueryClient } from '@tanstack/react-query';
import { unmatchConsultation } from '../../../apis/expertApi/matching';

interface UseUnmatchConsultationMutationProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useUnmatchConsultationMutation = ({
  onSuccess,
  onError
}: UseUnmatchConsultationMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (consultationId: number) => unmatchConsultation(consultationId),
    onSuccess: () => {
      // 매칭 전문가 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['matchedExperts'] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('매칭 끊기 실패:', error);
      onError?.(error);
    },
  });
};
