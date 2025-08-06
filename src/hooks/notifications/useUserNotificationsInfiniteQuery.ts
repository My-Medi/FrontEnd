import { useInfiniteQuery } from '@tanstack/react-query';
import { getUserNotifications } from '../../apis/notificationApi/notification';
import type { NotificationListResponse } from '../../types/notification';

interface UseUserNotificationsInfiniteQueryProps {
  pageSize?: number;
  enabled?: boolean;
}

export const useUserNotificationsInfiniteQuery = ({
  pageSize = 10,
  enabled = true,
}: UseUserNotificationsInfiniteQueryProps = {}) => {
  return useInfiniteQuery<NotificationListResponse>({
    queryKey: ['userNotificationsInfinite', pageSize, 'all'],
    queryFn: ({ pageParam = 0 }) => getUserNotifications(pageParam as number, pageSize),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.result || {};
      return (page && totalPages && page < totalPages - 1) ? page + 1 : undefined;
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
    initialPageParam: 0,
  });
}; 