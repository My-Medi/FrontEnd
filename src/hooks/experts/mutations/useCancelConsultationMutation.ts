import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelConsultation } from '../../../apis/expertApi/matching';

interface UseCancelConsultationMutationProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useCancelConsultationMutation = ({
  onSuccess,
  onError
}: UseCancelConsultationMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (consultationId: number) => cancelConsultation(consultationId),
    onSuccess: () => {
      // 매칭 전문가 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['matchedExperts'] });
      onSuccess?.();
    },
    onError: (error) => {
      console.error('상담요청 취소 실패:', error);
      onError?.(error);
    },
  });
};
