import { useQuery } from '@tanstack/react-query';
import { getUserProfile, getUserProfileOverview } from '../../../apis/userApi/user';
import type { UserProfile, UserProfileOverview } from '../../../types/common';

/**
 * 사용자 프로필 조회 훅
 */
export const useUserProfileQuery = () => {
  return useQuery<UserProfile>({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const response = await getUserProfile();
      if (!response.isSuccess) {
        throw new Error(response.message || '사용자 프로필 조회에 실패했습니다.');
      }
      return response.result!;
    },
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    retry: 2,
  });
};

// 요약 사용자 프로필 조회 훅 (/users/profile)
export const useUserProfileOverviewQuery = (enabled: boolean = true) => {
  return useQuery<UserProfileOverview>({
    queryKey: ['userProfileOverview'],
    queryFn: async () => {
      const response = await getUserProfileOverview();
      if (!response.isSuccess) {
        throw new Error(response.message || '요약 사용자 프로필 조회에 실패했습니다.');
      }
      return response.result!;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
};
