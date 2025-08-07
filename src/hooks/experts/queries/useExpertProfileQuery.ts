import { useQuery } from '@tanstack/react-query';
import { getExpertProfile } from '../../../apis/expertApi/profile';

/**
 * 전문가 프로필 조회 훅
 */
export const useExpertProfileQuery = () => {
  return useQuery<any>({
    queryKey: ['expertProfile'],
    queryFn: async () => {
      const response = await getExpertProfile();
      if (!response.isSuccess) {
        throw new Error(response.message || '전문가 프로필 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
  });
};
