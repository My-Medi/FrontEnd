import API from '../axios';
import type { ExpertDetailResponse } from '../../types/expert/detail';
import { USER_ENDPOINTS } from '../../types/common';

/**
 * 전문가 상세 조회 API
 * @param expertId - 전문가 ID
 * @returns Promise<ExpertDetailResponse>
 */
export const getExpertDetail = async (expertId: number): Promise<ExpertDetailResponse> => {
  try {
    // 상세 모달은 /users/experts/{id} 응답 스펙을 사용 (careers 포함)
    const response = await API.get<ExpertDetailResponse>(`${USER_ENDPOINTS.EXPERTS}/${expertId}`);
    return response.data;
  } catch (error) {
    console.error('전문가 상세 조회 실패:', error);
    throw error;
  }
};
