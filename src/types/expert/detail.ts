import type { ApiResponse } from '../common';
import type { ExpertSpecialty } from './common';

// 전문가 상세 정보 타입
export interface ExpertDetail {
  expertId: number;
  name: string;
  email: string;
  birthDate: string;
  gender: string;
  nickname: string | null;
  phoneNumber: string;
  profileImgUrl: string | null;
  role: string;
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string | null;
  careers: Career[];
  licenseImages: string[];
  licenses: License[];
  matchedAt?: string; // 매칭된 날짜 (매칭 상세에서 제공될 경우)
  requestCount?: number; // 요청 횟수 (요청중 상세에서 제공될 경우)
}

// 경력 정보 타입
export interface Career {
  careerId: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate: string;
}

// 자격증 정보 타입
export interface License {
  id: number;
  licenseName: string;
  licenseDate: string;
  licenseDescription: string;
}

// 전문가 상세 조회 응답 타입
export interface ExpertDetailResponse extends ApiResponse<ExpertDetail> {}
