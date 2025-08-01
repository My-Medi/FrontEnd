import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../../apis/userApi/user';
import type { UserProfile } from '../../types/common';

/**
 * 사용자 프로필 업데이트 훅
 * @returns useMutation 결과
 */
export const useUserProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updateData: Partial<UserProfile>) => {
      const response = await updateUserProfile(updateData);
      if (!response.isSuccess) {
        throw new Error(response.message || '사용자 프로필 업데이트에 실패했습니다.');
      }
      return response.result!;
    },
    onSuccess: (updatedProfile) => {
      // 프로필 데이터 캐시 업데이트
      queryClient.setQueryData(['userProfile'], updatedProfile);
      
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('프로필 업데이트 에러:', error);
    },
  });
}; 