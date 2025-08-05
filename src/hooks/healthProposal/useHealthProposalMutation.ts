import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthProposal } from '../../apis/healthProposalApi/healthProposal';
import type { HealthProposalRequest, HealthProposalCreateResponse } from '../../types/healthProposal';

interface UseHealthProposalMutationProps {
  onSuccess?: (data: HealthProposalCreateResponse) => void;
  onError?: (error: Error) => void;
}

export const useHealthProposalMutation = ({
  onSuccess,
  onError,
}: UseHealthProposalMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<HealthProposalCreateResponse, Error, HealthProposalRequest>({
    mutationFn: createHealthProposal,
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