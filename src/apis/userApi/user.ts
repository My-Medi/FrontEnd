import API from '../axios';
import type { ApiResponse, UserProfile } from '../../types/common';
import { USER_ENDPOINTS } from '../../types/common';

/**
 * 사용자 프로필 조회 API
 * @returns Promise<ApiResponse<UserProfile>>
 */
export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await API.get<ApiResponse<UserProfile>>(USER_ENDPOINTS.PROFILE);
    return response.data;
  } catch (error) {
    console.error('사용자 프로필 조회 실패:', error);
    throw error;
  }
};

/**
 * 사용자 프로필 업데이트 API
 * @param updateData - 업데이트할 사용자 정보
 * @returns Promise<ApiResponse<UserProfile>>
 */
export const updateUserProfile = async (updateData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> => {
  try {
    const response = await API.put<ApiResponse<UserProfile>>(USER_ENDPOINTS.PROFILE, updateData);
    return response.data;
  } catch (error) {
    console.error('사용자 프로필 업데이트 실패:', error);
    throw error;
  }
}; 