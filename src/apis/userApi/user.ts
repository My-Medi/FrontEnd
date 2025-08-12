import API from '../axios';
import type { ApiResponse, UserProfile, UserProfileOverview } from '../../types/common';
import type { UserScheduleSummaryResponse, UserSchedulesByDateResponse } from '../../types/schedule';
import { USER_ENDPOINTS } from '../../types/common';
import type { PersonalSignUpRequest, SignUpResponse } from '../../types/user';

/**
 * 사용자 프로필 조회 API
 * @returns Promise<ApiResponse<UserProfile>>
 */
export const getUserProfile = async (): Promise<ApiResponse<UserProfile>> => {
  try {
  
    const response = await API.get<ApiResponse<UserProfile>>(USER_ENDPOINTS.ME);
  
    return response.data;
  } catch (error) {
  
    throw error;
  }
};

/**
 * 요약 사용자 프로필 조회 API (/users/profile)
 */
export const getUserProfileOverview = async (): Promise<ApiResponse<UserProfileOverview>> => {
  try {
  
    const response = await API.get<ApiResponse<UserProfileOverview>>(USER_ENDPOINTS.PROFILE);
  
    return response.data;
  } catch (error) {
  
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
    // 새 스펙: PATCH /users
    const response = await API.patch<ApiResponse<UserProfile>>(USER_ENDPOINTS.ME, updateData);
    return response.data;
  } catch (error) {
  
    throw error;
  }
};

// 개인 회원가입 API
export const signUpUser = async (data: PersonalSignUpRequest): Promise<SignUpResponse> => {
  
  const response = await API.post<SignUpResponse>('/users', data);
  
  return response.data;
};

export const userAPI = {
  signUpUser,
  getUserProfile,
  getUserProfileOverview,
  updateUserProfile,
}; 

// 스케줄 요약(월별) 조회
export const getUserSchedulesMonthly = async (
  year: number,
  month: number
): Promise<UserScheduleSummaryResponse> => {
  const response = await API.get<UserScheduleSummaryResponse>(
    `/users/schedules`,
    { params: { year, month } }
  );
  return response.data;
};

// 특정 날짜 스케줄 상세 조회
export const getUserSchedulesByDate = async (
  date: string
): Promise<UserSchedulesByDateResponse> => {
  const response = await API.get<UserSchedulesByDateResponse>(
    `/users/schedules/date`,
    { params: { date } }
  );
  return response.data;
};