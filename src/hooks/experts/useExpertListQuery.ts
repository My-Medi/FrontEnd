import { useQuery } from '@tanstack/react-query';
import { getExpertList } from '../../apis/expertApi/expert';
import type { ExpertListRequestParams, ExpertListResult } from '../../types/expert';

/**
 * 전문가 목록 조회 훅
 * @param params - 조회 파라미터
 * @returns useQuery 결과
 */
export const useExpertListQuery = (params: ExpertListRequestParams) => {
  return useQuery<ExpertListResult>({
    queryKey: ['expertList', params.currentPage, params.pageSize],
    queryFn: async () => {
      const response = await getExpertList(params);
      console.log('전문가 목록 API 응답:', response);
      console.log('전문가 목록 데이터:', response.result);
      
      if (!response.isSuccess) {
        throw new Error(response.message || '전문가 목록 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
  });
}; 