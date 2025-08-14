import { useQuery } from '@tanstack/react-query';
import { getMatchedExperts } from '../../../apis/expertApi/matching';

export const useMatchedExpertsQuery = () => {
  return useQuery({
    queryKey: ['matchedExperts'],
    queryFn: getMatchedExperts,
    staleTime: 0,
    gcTime: 10 * 60 * 1000, // 10분
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
  });
};
