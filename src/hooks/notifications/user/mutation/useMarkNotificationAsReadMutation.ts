import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markNotificationAsRead } from '../../../../apis/notificationApi/notification';
import type { ApiResponse } from '../../../../types/common';

interface UseMarkNotificationAsReadMutationProps {
  onSuccess?: (data: ApiResponse<void>) => void;
  onError?: (error: Error) => void;
}

export const useMarkNotificationAsReadMutation = ({
  onSuccess,
  onError,
}: UseMarkNotificationAsReadMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, number>({
    mutationFn: (notificationId: number) => markNotificationAsRead(notificationId),
    onSuccess: (data) => {
      // 알림 목록 캐시 무효화하여 최신 상태로 업데이트
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      // 무한스크롤 캐시도 함께 무효화
      queryClient.invalidateQueries({ queryKey: ['userNotificationsInfinite'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 