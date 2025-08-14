import { useInfiniteQuery, keepPreviousData, type InfiniteData } from '@tanstack/react-query';
import type {
  ExpertRequestedConsultationList,
  ExpertRequestedConsultationListResponse,
} from '../../../../types/consultation';
import { getExpertRequestedConsultations } from '../../../../apis/expertApi/consultation';

export const EXP_REQ_INF_QK = 'expertRequestedConsultationsInfinite';

// ApiResponse(data/result) → payload로 변환
const pick = (res: ExpertRequestedConsultationListResponse): ExpertRequestedConsultationList =>
  (res as any).data ?? (res as any).result;

export function useExpertRequestedConsultationsInfinite(size = 10, enabled = true) {
  return useInfiniteQuery<
    // TQueryFnData
    ExpertRequestedConsultationListResponse,
    // TError
    unknown,
    // TData (select 이후 최종 타입)
    InfiniteData<ExpertRequestedConsultationList, number>,
    // TQueryKey
    [string, { size: number }],
    // TPageParam
    number
  >({
    queryKey: [EXP_REQ_INF_QK, { size }],
    queryFn: ({ pageParam = 0 }) => getExpertRequestedConsultations(pageParam, size),
    initialPageParam: 0,
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: keepPreviousData,

    // InfiniteData<API응답> → InfiniteData<payload> 로 변환
    select: (data) => {
      const d = data as InfiniteData<ExpertRequestedConsultationListResponse, number>;
      return {
        pages: d.pages.map(pick),
        pageParams: d.pageParams,
      };
    },

    // getNextPageParam의 lastPage 타입은 "원본" (= TQueryFnData, API 응답)
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const payload = (lastPage as any).data ?? (lastPage as any).result;
      const totalPages: number = payload?.totalPages ?? 0;
      const next = (lastPageParam ?? 0) + 1;
      return next < totalPages ? next : undefined;
    },
  });
}
