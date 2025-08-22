import API from '../axios';
import type { ApiResponse } from '../../types/common';
import { EXPERT_ENDPOINTS } from '../../types/common';

/**
 * 전문가 프로필 조회 API
 * @returns Promise<ApiResponse<any>>
 */
export const getExpertProfile = async (): Promise<ApiResponse<any>> => {
  try {
    const response = await API.get<ApiResponse<any>>(EXPERT_ENDPOINTS.PROFILE);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 프로필(홈 표출용) 조회 API (/experts/profiles)
 */
export const getExpertProfileOverview = async (): Promise<ApiResponse<any>> => {
  try {
    // 서버 스펙: GET /experts/profile
    const response = await API.get<ApiResponse<any>>(`${EXPERT_ENDPOINTS.PROFILE}/profile`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 프로필 업데이트 API
 * @param updateData - 업데이트할 전문가 정보
 * @returns Promise<ApiResponse<any>>
 */
export const updateExpertProfile = async (updateData: {
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  phoneNumber: string;
  profileImgUrl: string;
}): Promise<ApiResponse<any>> => {
  try {
    // 서버 스펙: PATCH /experts (단일 리소스 업데이트)
    const response = await API.patch<ApiResponse<any>>(EXPERT_ENDPOINTS.PROFILE, updateData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
