import API from '../axios';
import type { ApiResponse } from '../../types/common';
import type { ExpertResumeResponse } from '../../types/expert/resume';

// 이력서 수정 요청 타입
export interface ResumeUpdateRequest {
  specialty: string;
  organizationName: string;
  introduction: string;
  introSentences: string;
  careers: Array<{
    companyName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
  }>;
  licenses: Array<{
    licenseName: string;
    licenseDate: string;
    licenseDescription: string;
  }>;
  licenseImages: Array<{
    imageUrl: string;
    imageTitle: string;
  }>;
}

/**
 * 전문가 이력서 조회 API
 * @returns Promise<ApiResponse<ExpertResumeResponse>>
 */
export const getExpertResume = async (): Promise<ApiResponse<ExpertResumeResponse>> => {
  try {
    // 서버 스펙: GET /experts/resume
    const response = await API.get<ApiResponse<ExpertResumeResponse>>('/experts/resume');
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * 전문가 이력서 수정 API
 * @param resumeData - 수정할 이력서 데이터
 * @returns Promise<ApiResponse<any>>
 */
export const updateExpertResume = async (resumeData: ResumeUpdateRequest): Promise<ApiResponse<any>> => {
  try {
    // 서버 스펙: PATCH /experts/resume
    const response = await API.patch<ApiResponse<any>>('/experts/resume', resumeData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
