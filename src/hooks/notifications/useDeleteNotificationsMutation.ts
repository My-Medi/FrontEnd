import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNotifications } from '../../apis/notificationApi/notification';
import type { ApiResponse } from '../../types/common';

interface UseDeleteNotificationsMutationProps {
  onSuccess?: (data: ApiResponse<void>) => void;
  onError?: (error: Error) => void;
}

export const useDeleteNotificationsMutation = ({
  onSuccess,
  onError,
}: UseDeleteNotificationsMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<void>, Error, number[]>({
    mutationFn: (notificationIds: number[]) => deleteNotifications(notificationIds),
    onSuccess: (data) => {
      // 알림 목록 캐시 무효화하여 최신 상태로 업데이트
      queryClient.invalidateQueries({ queryKey: ['userNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['userNotificationsInfinite'] });
      onSuccess?.(data);
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 