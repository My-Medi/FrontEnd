import type { ApiResponse } from './common';

export interface ExpertRequestedConsultation {
  consultationId: number;
  userId: number;
  comment: string;
  nickname: string;
  age: string;
  gender: 'MALE' | 'FEMALE' | string;
  weight: number;
  height: number;
}

export interface ExpertRequestedConsultationList {
  content: ExpertRequestedConsultation[];
  totalPages: number;
}

export type ExpertRequestedConsultationListResponse = ApiResponse<ExpertRequestedConsultationList>;

/** 상태 변경/삭제 공통 응답 (result = 변경/삭제 건수 or 코드) */
export type ConsultationAffectResponse = ApiResponse<number>;
