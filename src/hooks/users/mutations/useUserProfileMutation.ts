import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserProfile } from '../../../apis/userApi/user';

/**
 * 사용자 프로필 업데이트 뮤테이션 훅
 */
export const useUserProfileUpdateMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      // 프로필 업데이트 후 관련 캐시 무효화 및 즉시 재요청
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['userProfileOverview'] });
    },
    onError: (error) => {
      console.error('사용자 프로필 업데이트 실패:', error);
    },
  });
};
