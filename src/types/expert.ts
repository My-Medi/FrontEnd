import type { ApiResponse } from './common';

// 전문가 요약 프로필
export interface ExpertSummaryProfile {
  expertId: number;
  specialty: 'NUTRITIONIST' | 'DOCTOR' | 'NURSE' | 'PHARMACIST' | 'THERAPIST';
  name: string;
  nickname: string | null;
  introduction: string;
  organizationName: string;
}

// 전문가 조회 요청 파라미터
export interface ExpertListRequestParams {
  currentPage: number;
  pageSize: number;
}

// 전문가 조회 응답 결과
export interface ExpertListResult {
  expertSummaryProfileDtoList: ExpertSummaryProfile[];
  page: number;
  totalPages: number;
}

// 전문가 조회 API 응답 타입
export type ExpertListResponse = ApiResponse<ExpertListResult>; 