import API from '../axios';
import type { ExpertListResponse, ExpertListRequestParams, PersonalSignUpRequest, SignUpResponse } from '../../types/expert';
import { USER_ENDPOINTS, EXPERT_ENDPOINTS } from '../../types/common';

/**
 * 전문가 목록 조회 API
 * @param params - 조회 파라미터 (페이지, 페이지 크기)
 * @returns Promise<ExpertListResponse>
 */
export const getExpertList = async (params: ExpertListRequestParams): Promise<ExpertListResponse> => {
  try {
    const response = await API.get<ExpertListResponse>(USER_ENDPOINTS.EXPERTS, {
      params: {
        currentPage: params.currentPage,
        pageSize: params.pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('전문가 목록 조회 실패:', error);
    throw error;
  }
}; 

/**
 * 전문가 회원가입 API
 * @param data - 전문가 회원가입 데이터
 * @returns Promise<SignUpResponse>
 */
export const signUpExpert = async (data: PersonalSignUpRequest): Promise<SignUpResponse> => {
  console.log('회원가입 API 호출 데이터:', data);
  const response = await API.post<SignUpResponse>(EXPERT_ENDPOINTS.SIGN_UP, data);
  console.log('회원가입 API 응답:', response.data);
  return response.data;
};

export const expertAPI = {
  signUpExpert,
  getExpertList
}; 