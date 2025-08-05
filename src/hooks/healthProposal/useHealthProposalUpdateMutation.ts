import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateHealthProposal } from '../../apis/healthProposalApi/healthProposal';
import type { HealthProposalRequest, HealthProposalCreateResponse } from '../../types/healthProposal';

interface UseHealthProposalUpdateMutationProps {
  onSuccess?: (data: HealthProposalCreateResponse) => void;
  onError?: (error: Error) => void;
}

export const useHealthProposalUpdateMutation = ({
  onSuccess,
  onError,
}: UseHealthProposalUpdateMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<HealthProposalCreateResponse, Error, HealthProposalRequest>({
    mutationFn: updateHealthProposal,
    onSuccess: (data) => {
      // 건강관리요청서 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['healthProposal'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 