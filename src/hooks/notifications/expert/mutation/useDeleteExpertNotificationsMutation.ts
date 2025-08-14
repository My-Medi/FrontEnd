import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationAPI } from '../../../../apis/notificationApi/notification';

interface UseDeleteExpertNotificationsMutationProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useDeleteExpertNotificationsMutation = ({
  onSuccess,
  onError,
}: UseDeleteExpertNotificationsMutationProps = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationIds: number[]) => 
      notificationAPI.deleteExpertNotifications(notificationIds),
    onSuccess: () => {
      // 알림 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['expertNotifications'] });
      // 무한스크롤 캐시도 함께 무효화 (향후 전문가 무한스크롤이 추가될 경우를 대비)
      queryClient.invalidateQueries({ queryKey: ['expertNotificationsInfinite'] });
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 