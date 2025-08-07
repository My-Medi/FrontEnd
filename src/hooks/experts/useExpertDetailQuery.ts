import { useQuery } from '@tanstack/react-query';
import { getExpertDetail } from '../../apis/expertApi/detail';
import type { ExpertDetailResponse } from '../../types/expert/detail';

/**
 * 전문가 상세 조회 훅
 * @param expertId - 전문가 ID
 * @returns useQuery 결과
 */
export const useExpertDetailQuery = (expertId: number) => {
  return useQuery<ExpertDetailResponse['result']>({
    queryKey: ['expertDetail', expertId],
    queryFn: async () => {
      const response = await getExpertDetail(expertId);
      console.log('전문가 상세 API 응답:', response);
      console.log('전문가 상세 데이터:', response.result);
      
      if (!response.isSuccess) {
        throw new Error(response.message || '전문가 상세 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
    enabled: !!expertId, // expertId가 있을 때만 실행
  });
};
