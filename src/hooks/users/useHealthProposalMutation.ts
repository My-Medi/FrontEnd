import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthProposal } from '../../apis/userApi/user';
import type { HealthProposalRequest } from '../../types/user';

/**
 * 건강관리요청서 작성 훅
 */
export const useHealthProposalMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createHealthProposal,
    onSuccess: (data) => {
      console.log('건강관리요청서 작성 성공:', data);
      // 성공 시 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['healthProposal'] });
    },
    onError: (error) => {
      console.error('건강관리요청서 작성 실패:', error);
    },
  });
}; 