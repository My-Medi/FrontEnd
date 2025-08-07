import { useQuery } from '@tanstack/react-query';
import { getExpertResume } from '../../../apis/expertApi/resume';
import type { ExpertResumeResponse } from '../../../types/expert/resume';

interface UseExpertResumeQueryProps {
  enabled?: boolean;
}

export const useExpertResumeQuery = ({
  enabled = true,
}: UseExpertResumeQueryProps = {}) => {
  return useQuery<ExpertResumeResponse>({
    queryKey: ['expertResume'],
    queryFn: async () => {
      const response = await getExpertResume();
      if (!response.result) {
        throw new Error('이력서 데이터를 불러올 수 없습니다.');
      }
      return response.result;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
