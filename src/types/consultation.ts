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

// 전문가가 보는 특정 사용자 요약 정보 (요청서 상세)
export interface ExpertUserInfo {
  userId: number;
  accountRegisterDate: string;
  nickname: string;
  age: number; // 또는 string이 올 수 있으나 현 스펙은 number
  gender: 'MALE' | 'FEMALE' | string;
  height: number;
  weight: number;
  goal?: string; // 관리 목표와 기대
  reportRegisterDate: string | null;
  requestNote: string;
  healthInterests: string[];
  abnormalCheckItems: string[];
}

export type ExpertUserInfoResponse = ApiResponse<ExpertUserInfo>;
