import { useQuery } from '@tanstack/react-query';
import { getExpertUserLatestHealthStatus } from '../../../apis/expertApi/report';

export const useExpertUserLatestHealthStatusQuery = () => {
  return useQuery({
    queryKey: ['expertUserLatestHealthStatus'],
    queryFn: async () => {
      const response = await getExpertUserLatestHealthStatus();
      return response.result;
    },
    staleTime: 30_000, // 30초
    gcTime: 5 * 60 * 1000, // 5분
  });
};
