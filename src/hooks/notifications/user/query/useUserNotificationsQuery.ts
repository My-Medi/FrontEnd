import { useQuery } from '@tanstack/react-query';
import { getUserNotifications } from '../../../../apis/notificationApi/notification';
import type { NotificationListResponse } from '../../../../types/notification';

interface UseUserNotificationsQueryProps {
  currentPage?: number;
  pageSize?: number;
  enabled?: boolean;
  refetchInterval?: number;
}

export const useUserNotificationsQuery = ({
  currentPage = 0,
  pageSize = 10,
  enabled = true,
  refetchInterval = 10000, // 10초마다 자동 새로고침
}: UseUserNotificationsQueryProps = {}) => {
  return useQuery<NotificationListResponse>({
    queryKey: ['userNotifications', currentPage, pageSize],
    queryFn: () => getUserNotifications(currentPage, pageSize),
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    refetchInterval, // 주기적 폴링
    refetchIntervalInBackground: true, // 백그라운드에서도 폴링
  });
}; 