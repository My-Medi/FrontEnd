import API from '../axios';
import type { HealthProposalApiResponse, HealthProposalCreateResponse, HealthProposalRequest } from '../../types/healthProposal';

/**
 * 건강관리요청서 조회 API
 * @returns Promise<HealthProposalApiResponse>
 */
export const getHealthProposal = async (): Promise<HealthProposalApiResponse> => {
  try {
    const response = await API.get<HealthProposalApiResponse>('/users/proposals');
    return response.data;
  } catch (error) {
    console.error('건강관리요청서 조회 실패:', error);
    // 400 에러는 제안서가 없는 경우로 처리
    if ((error as any)?.response?.status === 400) {
      throw new Error('제안서를 찾을 수 없습니다');
    }
    throw error;
  }
};

/**
 * 건강관리요청서 작성 API
 * @param data - 건강관리요청서 데이터
 * @returns Promise<HealthProposalCreateResponse>
 */
export const createHealthProposal = async (data: HealthProposalRequest): Promise<HealthProposalCreateResponse> => {
  try {
    console.log('건강관리요청서 작성 API 호출 데이터:', data);
    const response = await API.post<HealthProposalCreateResponse>('/users/proposals', data);
    console.log('건강관리요청서 작성 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('건강관리요청서 작성 실패:', error);
    throw error;
  }
};

/**
 * 건강관리요청서 수정 API
 * @param data - 건강관리요청서 데이터
 * @returns Promise<HealthProposalCreateResponse>
 */
export const updateHealthProposal = async (data: HealthProposalRequest): Promise<HealthProposalCreateResponse> => {
  try {
    console.log('건강관리요청서 수정 API 호출 데이터:', data);
    const response = await API.patch<HealthProposalCreateResponse>('/users/proposals', data);
    console.log('건강관리요청서 수정 API 응답:', response.data);
    return response.data;
  } catch (error) {
    console.error('건강관리요청서 수정 실패:', error);
    throw error;
  }
};

export const healthProposalAPI = {
  getHealthProposal,
  createHealthProposal,
  updateHealthProposal,
}; 