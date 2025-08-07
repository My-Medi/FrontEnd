import { useQuery } from '@tanstack/react-query';
import { getMatchedExperts } from '../../apis/expertApi/matching';

export const useMatchedExpertsQuery = () => {
  return useQuery({
    queryKey: ['matchedExperts'],
    queryFn: getMatchedExperts,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
