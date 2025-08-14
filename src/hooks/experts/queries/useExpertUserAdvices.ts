import { useQuery } from '@tanstack/react-query';
import { getUserAdvices } from '../../../apis/expertApi/advices';
import type { ExpertAdviceListResponse, ExpertAdviceList } from '../../../types/expert/advice';

export const EXPERT_USER_ADVICES_QK = 'expertUserAdvices';

const selectPayload = (r: ExpertAdviceListResponse): ExpertAdviceList => (r as any).result ?? (r as any).data;

export function useExpertUserAdvices(userId: number | null, currentPage = 0, pageSize = 2) {
  return useQuery<ExpertAdviceListResponse, unknown, ExpertAdviceList>({
    queryKey: [EXPERT_USER_ADVICES_QK, { userId, currentPage, pageSize }],
    queryFn: () => getUserAdvices(userId as number, currentPage, pageSize),
    enabled: !!userId,
    select: selectPayload,
    staleTime: 30_000,
  });
}


