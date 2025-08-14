import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUserAdvice } from '../../../apis/expertApi/advices';

export const useRegisterAdviceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, adviceComment }: { userId: number; adviceComment: string }) =>
      registerUserAdvice(userId, adviceComment),
    onSuccess: () => {
      // 등록 후 사용자 상세/요약 관련 쿼리 무효화 (있다면)
      queryClient.invalidateQueries({ queryKey: ['expertUserInfo'] });
      queryClient.invalidateQueries({ queryKey: ['expertReportSummary'] });
    },
  });
};


