// hooks/consultation/expert/query/useExpertRequestedConsultations.ts
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type {
  ExpertRequestedConsultationList,
  ExpertRequestedConsultationListResponse,
} from '../../../../types/consultation';
import { getExpertRequestedConsultations } from '../../../../apis/consultationApi/consultation';

// ====== 쿼리 키 상수 ======
export const EXP_REQ_QK = 'expertRequestedConsultations';
export const EXP_REQ_INF_QK = 'expertRequestedConsultationsInfinite';
// (승인된 목록 키가 나중에 생길 경우를 대비)
export const EXP_APPROVED_QK = 'expertApprovedConsultations';
export const EXP_APPROVED_INF_QK = 'expertApprovedConsultationsInfinite';
// =======================

// ApiResponse 래핑(data/result) 어느 쪽이든 payload만 뽑아 쓰도록 정규화
const selectResult = (
  r: ExpertRequestedConsultationListResponse,
): ExpertRequestedConsultationList => (r as any).data ?? (r as any).result;

export function useExpertRequestedConsultations(page = 0, size = 10, enabled = true) {
  return useQuery<
    ExpertRequestedConsultationListResponse,
    unknown,
    ExpertRequestedConsultationList
  >({
    queryKey: [EXP_REQ_QK, { page, size }],
    queryFn: () => getExpertRequestedConsultations(page, size),
    select: selectResult,
    enabled,
    staleTime: 30_000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
