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
      // 배열인 경우 (여러 카테고리 선택)
      if (Array.isArray(params.specialty)) {
        // 배열의 각 값을 개별 파라미터로 추가
        params.specialty.forEach((specialty: string) => {
          if (!requestParams.specialty) {
            requestParams.specialty = [];
          }
          if (Array.isArray(requestParams.specialty)) {
            requestParams.specialty.push(specialty);
          }
        });
      } else {
        // 단일 값인 경우
        requestParams.specialty = params.specialty;
      }
    }
    
    // URLSearchParams를 사용하여 배열 파라미터를 올바르게 처리
    const searchParams = new URLSearchParams();
    searchParams.append('currentPage', requestParams.currentPage.toString());
    searchParams.append('pageSize', requestParams.pageSize.toString());
    
    if (requestParams.specialty) {
      if (Array.isArray(requestParams.specialty)) {
        // 배열인 경우 각 값을 개별 파라미터로 추가
        requestParams.specialty.forEach((specialty: string) => {
          searchParams.append('specialty', specialty);
        });
      } else {
        // 단일 값인 경우
        searchParams.append('specialty', requestParams.specialty);
      }
    }
    
    const response = await API.get<ExpertListResponse>(`${USER_ENDPOINTS.EXPERTS}?${searchParams.toString()}`);
    console.log('전문가 목록 API 응답:', response.data);
    console.log('필터링된 전문가 수:', response.data.result?.expertSummaryProfileDtoList?.length || 0);
    console.log('필터링된 전문가 목록:', response.data.result?.expertSummaryProfileDtoList?.map(expert => ({
      id: expert.expertId,
      name: expert.name,
      specialty: expert.specialty
    })));
    return response.data;
  } catch (error) {
    console.error('전문가 목록 조회 실패:', error);
    throw error;
  }
};
