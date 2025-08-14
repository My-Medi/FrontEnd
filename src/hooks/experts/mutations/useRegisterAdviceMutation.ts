import { useMutation, useQueryClient } from '@tanstack/react-query';
import { registerUserAdvice } from '../../../apis/expertApi/advices';
import { EXPERT_USER_ADVICES_QK } from '../../experts/queries/useExpertUserAdvices';
import { USER_LATEST_ADVICE_QK } from '../../users/queries/useLatestAdvice';

export const useRegisterAdviceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, adviceComment }: { userId: number; adviceComment: string }) =>
      registerUserAdvice(userId, adviceComment),
    onSuccess: () => {
      // 등록 후 관련 목록/요약 즉시 갱신
      // 환자관리 모달의 조언 리스트
      queryClient.invalidateQueries({ queryKey: [EXPERT_USER_ADVICES_QK] });
      // 사용자 마이홈 최신 조언 카드
      queryClient.invalidateQueries({ queryKey: [USER_LATEST_ADVICE_QK] });
      // 기타 관련 화면들 (있다면)
      queryClient.invalidateQueries({ queryKey: ['expertUserInfo'] });
      queryClient.invalidateQueries({ queryKey: ['expertReportSummary'] });
    },
  });
};


