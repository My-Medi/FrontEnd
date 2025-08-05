import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHealthProposal } from '../../apis/userApi/user';
import type { HealthProposalRequest } from '../../types/user';

/**
 * 건강관리요청서 수정 훅
 */
export const useHealthProposalUpdateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateHealthProposal,
    onSuccess: (data) => {
      console.log('건강관리요청서 수정 성공:', data);
      // 성공 시 관련 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['healthProposal'] });
    },
    onError: (error) => {
      console.error('건강관리요청서 수정 실패:', error);
    },
  });
}; 