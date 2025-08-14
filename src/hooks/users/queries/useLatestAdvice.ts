import { useQuery } from '@tanstack/react-query';
import { getLatestAdvice } from '../../../apis/userApi/advice';

export const USER_LATEST_ADVICE_QK = 'userLatestAdvice';

export function useLatestAdvice() {
  return useQuery({
    queryKey: [USER_LATEST_ADVICE_QK],
    queryFn: getLatestAdvice,
    select: (r) => (r as any).result ?? (r as any).data,
    staleTime: 30_000,
  });
}


