import API from '../axios';
import type { PersonalSignUpRequest, SignUpResponse, ExpertSignUpRequest } from '../../types/expert/signup';
import { EXPERT_ENDPOINTS } from '../../types/common';

/**
 * 전문가 회원가입 API (기존 방식 - 하위 호환성)
 * @param data - 전문가 회원가입 데이터
 * @returns Promise<SignUpResponse>
 */
export const signUpExpert = async (data: PersonalSignUpRequest): Promise<SignUpResponse> => {
  console.log('전문가 회원가입 API 호출 데이터:', data);
  const response = await API.post<SignUpResponse>(EXPERT_ENDPOINTS.SIGN_UP, data);
  console.log('전문가 회원가입 API 응답:', response.data);
  return response.data;
};

/**
 * 전문가 회원가입 API (새로운 방식 - 2단계 + 3단계)
 * @param data - 전문가 회원가입 데이터
 * @returns Promise<SignUpResponse>
 */
export const signUpExpertNew = async (data: ExpertSignUpRequest): Promise<SignUpResponse> => {
  console.log('전문가 회원가입 API 호출 데이터 (새로운 방식):', data);
  const response = await API.post<SignUpResponse>(EXPERT_ENDPOINTS.SIGN_UP, data);
  console.log('전문가 회원가입 API 응답:', response.data);
  return response.data;
};
