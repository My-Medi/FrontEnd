import type { ApiResponse } from './common';

// 알림 관련 타입
export interface UserNotification {
  userNotificationId: number;
  userId: number;
  notificationContent: string;
  sourceId: number;
  isRead: boolean;
}

export interface NotificationListResult {
  content: UserNotification[];
  totalPages: number;
  page: number;
}

export type NotificationListResponse = ApiResponse<NotificationListResult>;
export type NotificationDeleteResponse = ApiResponse<number>; // 삭제된 알림 개수 