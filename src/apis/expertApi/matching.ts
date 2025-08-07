import axiosInstance from '../axios';
import type { MatchedExpertApiResponse } from '../../types/expert/matching';

// 매칭 전문가 목록 조회
export const getMatchedExperts = async (): Promise<MatchedExpertApiResponse> => {
  const response = await axiosInstance.get('/users/consultations');
  console.log('API 응답 데이터:', response.data);
  console.log('API 응답 구조:', {
    isSuccess: response.data.isSuccess,
    code: response.data.code,
    message: response.data.message,
    resultLength: response.data.result?.length,
    firstItem: response.data.result?.[0]
  });
  return response.data;
};

// 상담요청 취소
export const cancelConsultation = async (consultationId: number): Promise<void> => {
  await axiosInstance.delete(`/users/consultations/${consultationId}`);
};
