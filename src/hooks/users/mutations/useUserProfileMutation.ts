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
      // 프로필 업데이트 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (error) => {
      console.error('사용자 프로필 업데이트 실패:', error);
    },
  });
};
