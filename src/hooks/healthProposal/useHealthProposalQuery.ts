import { useQuery } from '@tanstack/react-query';
import { getHealthProposal } from '../../apis/healthProposalApi/healthProposal';
import type { HealthProposalApiResponse } from '../../types/healthProposal';

export const useHealthProposalQuery = () => {
  return useQuery<HealthProposalApiResponse>({
    queryKey: ['healthProposal'],
    queryFn: getHealthProposal,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}; 