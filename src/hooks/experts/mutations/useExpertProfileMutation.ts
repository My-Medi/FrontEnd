import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpertProfile } from '../../../apis/expertApi/profile';

/**
 * 전문가 프로필 업데이트 뮤테이션 훅
 */
export const useExpertProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateExpertProfile,
    onSuccess: () => {
      // 프로필 업데이트 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['expertProfile'] });
    },
    onError: (error) => {
      console.error('전문가 프로필 업데이트 실패:', error);
    },
  });
};
