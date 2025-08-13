import { useQuery } from '@tanstack/react-query';
import { getExpertUserInfo } from '../../../../apis/consultationApi/consultation';
import type { ExpertUserInfoResponse, ExpertUserInfo } from '../../../../types/consultation';

export const EXP_USER_INFO_QK = 'expertUserInfo';

export function useExpertUserInfo(
  userId: number | null,
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'ACCEPTED' = 'REQUESTED',
) {
  return useQuery<ExpertUserInfoResponse, unknown, ExpertUserInfo>({
    queryKey: [EXP_USER_INFO_QK, userId, status],
    queryFn: () => getExpertUserInfo(userId as number, status),
    enabled: !!userId,
    select: (r) => (r as any).data ?? (r as any).result,
    staleTime: 30_000,
    gcTime: 10 * 60 * 1000,
  });
}
