import { useQuery } from '@tanstack/react-query';
import { getExpertUserLatestHealthStatus } from '../../../apis/expertApi/report';

export const useExpertUserLatestHealthStatusQuery = (userId: number | null) => {
  return useQuery({
    queryKey: ['expertUserLatestHealthStatus', userId],
    queryFn: async () => {
      const response = await getExpertUserLatestHealthStatus(userId!);
      return response.result;
    },
    enabled: !!userId,
    staleTime: 30_000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
  });
};
