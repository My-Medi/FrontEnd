import { useQuery } from '@tanstack/react-query';
import { getCurrentHealthStatus } from '../../../apis/userApi/currentHealthStatus';
import type { CurrentHealthStatusResponse } from '../../../types/currentHealthStatus';

export const useCurrentHealthStatusQuery = () => {
  return useQuery<CurrentHealthStatusResponse>({
    queryKey: ['currentHealthStatus'],
    queryFn: getCurrentHealthStatus,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
