import type { ApiResponse } from '../common';
import type { ExpertSpecialty } from './common';

// 전문가 상세 정보 타입
export interface ExpertDetail {
  expertId: number;
  name: string;
  nickname: string | null;
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  profile: string | null;
  phone?: string;
  startDate?: string;
}

// 전문가 상세 조회 응답 타입
export interface ExpertDetailResponse extends ApiResponse<ExpertDetail> {}
