import { useQuery } from '@tanstack/react-query';
import { getHealthProposal } from '../../apis/userApi/user';

/**
 * 건강관리요청서 조회 훅
 */
export const useHealthProposalQuery = () => {
  return useQuery({
    queryKey: ['healthProposal'],
    queryFn: getHealthProposal,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: (failureCount, error) => {
      // 400 에러는 재시도하지 않음
      if (error instanceof Error && error.message === '제안서를 찾을 수 없습니다') {
        return false;
      }
      return failureCount < 3;
    },
  });
}; 