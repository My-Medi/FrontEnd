import { useInfiniteQuery } from '@tanstack/react-query';
import { getExpertNotifications } from '../../apis/notificationApi/notification';
import type { ExpertNotificationListResponse } from '../../types/notification';

interface UseExpertNotificationsInfiniteQueryProps {
  pageSize?: number;
  enabled?: boolean;
}

export const useExpertNotificationsInfiniteQuery = ({
  pageSize = 10,
  enabled = true,
}: UseExpertNotificationsInfiniteQueryProps = {}) => {
  return useInfiniteQuery<ExpertNotificationListResponse>({
    queryKey: ['expertNotificationsInfinite', pageSize],
    queryFn: ({ pageParam = 0 }) => getExpertNotifications(pageParam as number, pageSize),
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