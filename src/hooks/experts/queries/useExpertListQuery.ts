import { useQuery } from '@tanstack/react-query';
import { getExpertList } from '../../../apis/expertApi/list';
import type { ExpertListRequestParams, ExpertListResponse } from '../../../types/expert/list';

/**
 * 전문가 목록 조회 훅
 * @param params - 조회 파라미터
 * @returns useQuery 결과
 */
export const useExpertListQuery = (params: ExpertListRequestParams) => {
  return useQuery<ExpertListResponse['result']>({
    queryKey: ['expertList', params.currentPage, params.pageSize, params.specialty],
    queryFn: async () => {
      const response = await getExpertList(params);
      
      if (!response.isSuccess) {
        throw new Error(response.message || '전문가 목록 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 0, // 캐시 제거
    gcTime: 0, // 캐시 제거
    retry: 2,
  });
};
