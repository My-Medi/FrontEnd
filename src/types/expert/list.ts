import type { ApiResponse } from '../common';
import type { ExpertSpecialty } from './common';

// 전문가 목록 조회 요청 파라미터
export interface ExpertListRequestParams {
  currentPage: number;
  pageSize: number;
  specialty?: string | string[]; // API key 문자열 또는 배열 (nutritionist, coach, manager, therapist, etc)
}

// 전문가 목록 응답 타입
export interface ExpertListResponse extends ApiResponse<{
  expertSummaryProfileDtoList: Expert[];
  totalPages: number;
  page: number;
}> {}

// 전문가 정보 타입
export interface Expert {
  expertId: number;
  name: string;
  nickname: string | null;
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  profile: string | null;
  career?: string[]; // 서버에서 문자열 배열로 오는 경력 요약 (예: ["학생 47개월"]) 
  careerResponseDtoList?: CareerResponse[];
}

// 경력 정보 타입
export interface CareerResponse {
  id: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
}
