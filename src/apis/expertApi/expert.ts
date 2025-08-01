import API from '../axios';
import type { ExpertListResponse, ExpertListRequestParams } from '../../types/expert';
import { USER_ENDPOINTS } from '../../types/common';

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