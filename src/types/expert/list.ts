import type { ApiResponse } from '../common';
import type { ExpertSpecialty } from './common';

// 전문가 목록 조회 요청 파라미터
export interface ExpertListRequestParams {
  currentPage: number;
  pageSize: number;
  specialty?: ExpertSpecialty; // 카테고리 필터링을 위한 전문분야 파라미터 추가
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
}
