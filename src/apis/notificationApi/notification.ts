import API from '../axios';
import type { ApiResponse } from '../../types/common';
import type { NotificationListResponse } from '../../types/notification';

/**
 * 사용자 알림 목록 조회 API
 * @param currentPage - 현재 페이지 (0부터 시작)
 * @param pageSize - 페이지 크기
 * @returns Promise<NotificationListResponse>
 */
export const getUserNotifications = async (currentPage: number = 0, pageSize: number = 10): Promise<NotificationListResponse> => {
  try {
    const response = await API.get<NotificationListResponse>(`/users/notifications?currentPage=${currentPage}&pageSize=${pageSize}`);
    return response.data;
  } catch (error) {
    console.error('사용자 알림 목록 조회 실패:', error);
    throw error;
  }
};

/**
 * 사용자 알림 읽음 처리 API
 * @param notificationId - 알림 ID
 * @returns Promise<ApiResponse<void>>
 */
export const markNotificationAsRead = async (notificationId: number): Promise<ApiResponse<void>> => {
  try {
    const response = await API.patch<ApiResponse<void>>(`/users/notifications/${notificationId}`);
    return response.data;
  } catch (error) {
    console.error('알림 읽음 처리 실패:', error);
    throw error;
  }
};

/**
 * 사용자 알림 삭제 API
 * @param notificationIds - 삭제할 알림 ID 배열
 * @returns Promise<ApiResponse<void>>
 */
export const deleteNotifications = async (notificationIds: number[]): Promise<ApiResponse<void>> => {
  try {
    const queryParams = notificationIds.map(id => `notificationId=${id}`).join('&');
    const response = await API.delete<ApiResponse<void>>(`/users/notifications?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('알림 삭제 실패:', error);
    throw error;
  }
};

export const notificationAPI = {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotifications,
}; 