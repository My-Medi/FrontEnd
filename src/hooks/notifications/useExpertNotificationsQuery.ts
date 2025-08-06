import { useQuery } from '@tanstack/react-query';
import { notificationAPI } from '../../apis/notificationApi/notification';

interface UseExpertNotificationsQueryProps {
  currentPage?: number;
  pageSize?: number;
  enabled?: boolean;
  refetchInterval?: number;
}

export const useExpertNotificationsQuery = ({
  currentPage = 0,
  pageSize = 10,
  enabled = true,
  refetchInterval,
}: UseExpertNotificationsQueryProps = {}) => {
  return useQuery({
    queryKey: ['expertNotifications', currentPage, pageSize],
    queryFn: () => notificationAPI.getExpertNotifications(currentPage, pageSize),
    enabled,
    refetchInterval,
  });
}; 