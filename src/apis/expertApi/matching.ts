import axiosInstance from '../axios';
import type { MatchedExpertApiResponse, MatchedExpertDetailResponse, RequestedExpertDetailResponse } from '../../types/expert/matching';

// 매칭 전문가 목록 조회
export const getMatchedExperts = async (): Promise<MatchedExpertApiResponse> => {
  const response = await axiosInstance.get('/users/consultations');
  return response.data;
};

// 상담요청 취소
export const cancelConsultation = async (consultationId: number): Promise<void> => {
  await axiosInstance.delete(`/users/consultations/${consultationId}`);
};

// 전문가에게 상담 요청
export const requestConsultation = async (expertId: number, comment: string): Promise<any> => {
  try {
    // 서버 스펙: comment를 쿼리스트링으로 전달
    const response = await axiosInstance.post(
      `/users/consultations/experts/${expertId}`,
      undefined,
      { params: { comment } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 매칭된 전문가 상세 조회
export const getMatchedExpertDetail = async (expertId: number): Promise<MatchedExpertDetailResponse> => {
  const response = await axiosInstance.get(`/users/consultations/experts/${expertId}/matched`);
  return response.data;
};

// 요청중인 전문가 상세 조회
export const getRequestedExpertDetail = async (expertId: number): Promise<RequestedExpertDetailResponse> => {
  const response = await axiosInstance.get(`/users/consultations/experts/${expertId}/requested`);
  return response.data;
};
