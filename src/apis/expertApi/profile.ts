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
    console.error('전문가 프로필 조회 실패:', error);
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
    const response = await API.patch<ApiResponse<any>>(`${EXPERT_ENDPOINTS.PROFILE}/profiles`, updateData);
    return response.data;
  } catch (error) {
    console.error('전문가 프로필 업데이트 실패:', error);
    throw error;
  }
};
