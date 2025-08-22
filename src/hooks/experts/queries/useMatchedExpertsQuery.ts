import { useQuery } from '@tanstack/react-query';
import { getMatchedExperts } from '../../../apis/expertApi/matching';

export const useMatchedExpertsQuery = () => {
  return useQuery({
    queryKey: ['matchedExperts'],
    queryFn: getMatchedExperts,
    staleTime: 0,
    gcTime: 0, // 캐시 제거
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
