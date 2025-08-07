import API from '../axios';
import type { ExpertListResponse, ExpertListRequestParams } from '../../types/expert/list';
import { USER_ENDPOINTS } from '../../types/common';

/**
 * 전문가 목록 조회 API
 * @param params - 조회 파라미터 (페이지, 페이지 크기, 전문분야)
 * @returns Promise<ExpertListResponse>
 */
export const getExpertList = async (params: ExpertListRequestParams): Promise<ExpertListResponse> => {
  try {
    console.log('전문가 목록 API 호출 파라미터:', params);
    
    // API 요청 파라미터 구성
    const requestParams: any = {
      currentPage: params.currentPage,
      pageSize: params.pageSize
    };
    
    // specialty 파라미터가 있으면 추가
    if (params.specialty) {
      requestParams.specialty = params.specialty;
    }
    
    const response = await API.get<ExpertListResponse>(USER_ENDPOINTS.EXPERTS, {
      params: requestParams
    });
    console.log('전문가 목록 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('전문가 목록 조회 실패:', error);
    throw error;
  }
};
