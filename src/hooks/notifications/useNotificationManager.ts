import { useState, useCallback, useMemo } from 'react';
import { useUserNotificationsQuery } from './useUserNotificationsQuery';
import { useExpertNotificationsQuery } from './useExpertNotificationsQuery';
import { useUserNotificationsInfiniteQuery } from './useUserNotificationsInfiniteQuery';
import { useExpertNotificationsInfiniteQuery } from './useExpertNotificationsInfiniteQuery';
import { useMarkNotificationAsReadMutation } from './useMarkNotificationAsReadMutation';
import { useDeleteNotificationsMutation } from './useDeleteNotificationsMutation';
import { useMarkExpertNotificationAsReadMutation } from './useMarkExpertNotificationAsReadMutation';
import { useDeleteExpertNotificationsMutation } from './useDeleteExpertNotificationsMutation';
import type { UserNotification, ExpertNotification } from '../../types/notification';

type UserType = 'patient' | 'expert';

interface UseNotificationManagerProps {
  userType: UserType;
  showAllOld: boolean;
}

export const useNotificationManager = ({ userType, showAllOld }: UseNotificationManagerProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // 메인 화면용 쿼리
  const userQuery = useUserNotificationsQuery({
    currentPage: 0,
    pageSize: 20,
    enabled: userType === 'patient' && !showAllOld,
    refetchInterval: 10000,
  });

  const expertQuery = useExpertNotificationsQuery({
    currentPage: 0,
    pageSize: 20,
    enabled: userType === 'expert' && !showAllOld,
    refetchInterval: 10000,
  });

  // 무한스크롤 쿼리
  const userInfiniteQuery = useUserNotificationsInfiniteQuery({
    pageSize: 10,
    enabled: userType === 'patient' && showAllOld,
  });

  const expertInfiniteQuery = useExpertNotificationsInfiniteQuery({
    pageSize: 10,
    enabled: userType === 'expert' && showAllOld,
  });

  // Mutation
  const markAsReadMutation = useMarkNotificationAsReadMutation();
  const deleteNotificationsMutation = useDeleteNotificationsMutation();
  const markExpertAsReadMutation = useMarkExpertNotificationAsReadMutation();
  const deleteExpertNotificationsMutation = useDeleteExpertNotificationsMutation();

  // 현재 활성화된 쿼리들
  const currentQuery = userType === 'patient' ? userQuery : expertQuery;
  const currentInfiniteQuery = userType === 'patient' ? userInfiniteQuery : expertInfiniteQuery;

  // 유틸리티 함수들
  const getNotificationId = useCallback((notification: UserNotification | ExpertNotification): number => {
    return userType === 'patient' 
      ? (notification as UserNotification).userNotificationId 
      : (notification as ExpertNotification).expertNotificationId;
  }, [userType]);

  const markAsRead = useCallback((notification: UserNotification | ExpertNotification) => {
    if (!notification.isRead) {
      const notificationId = getNotificationId(notification);
      if (userType === 'patient') {
        markAsReadMutation.mutate(notificationId);
      } else {
        markExpertAsReadMutation.mutate(notificationId);
      }
    }
  }, [userType, getNotificationId, markAsReadMutation, markExpertAsReadMutation]);

  const deleteNotifications = useCallback((ids: number[]) => {
    if (userType === 'patient') {
      deleteNotificationsMutation.mutate(ids);
    } else {
      deleteExpertNotificationsMutation.mutate(ids);
    }
  }, [userType, deleteNotificationsMutation, deleteExpertNotificationsMutation]);

  // 데이터 변환
  const notifications = useMemo(() => {
    return currentQuery.data?.result?.content || [];
  }, [currentQuery.data]);

  const newNotices = useMemo(() => {
    return notifications.filter((n: UserNotification | ExpertNotification) => !n.isRead);
  }, [notifications]);

  const oldNotices = useMemo(() => {
    return notifications.filter((n: UserNotification | ExpertNotification) => n.isRead).slice(0, 8);
  }, [notifications]);

  const allNotifications = useMemo(() => {
    const pages = currentInfiniteQuery.data?.pages || [];
    return pages.flatMap((page: any) => page.result?.content || []);
  }, [currentInfiniteQuery.data]);

  // 선택 관련 함수들
  const handleSelect = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const toggleSelectAll = useCallback((currentNotices: (UserNotification | ExpertNotification)[]) => {
    if (selectedIds.length === currentNotices.length) {
      setSelectedIds([]);
    } else {
      const ids = currentNotices.map(getNotificationId);
      setSelectedIds(ids);
    }
  }, [selectedIds.length, getNotificationId]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  return {
    // 쿼리 상태
    currentQuery,
    currentInfiniteQuery,
    
    // 데이터
    notifications,
    newNotices,
    oldNotices,
    allNotifications,
    
    // 선택 상태
    selectedIds,
    handleSelect,
    toggleSelectAll,
    clearSelection,
    
    // 액션
    markAsRead,
    deleteNotifications,
    
    // 유틸리티
    getNotificationId,
  };
}; 