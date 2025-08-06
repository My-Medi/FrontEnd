import type { ApiResponse } from './common';

// 사용자 알림 관련 타입
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

// 전문가 알림 관련 타입
export interface ExpertNotification {
  expertNotificationId: number;
  expertId: number;
  notificationContent: string;
  sourceId: number;
  isRead: boolean;
}

export interface ExpertNotificationListResult {
  content: ExpertNotification[];
  totalPages: number;
  page: number;
}

export type ExpertNotificationListResponse = ApiResponse<ExpertNotificationListResult>;
export type ExpertNotificationDeleteResponse = ApiResponse<number>; // 삭제된 알림 개수 