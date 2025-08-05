import type { ApiResponse } from './common';

// 전문 분야
export type ExpertSpecialty = 
  | 'NUTRITIONIST' 
  | 'HEALTH_MANAGER' 
  | 'WELLNESS_COACH' 
  | 'EXERCISE_THERAPIST' 
  | 'ETC';


// 전문가 요약 프로필
export interface ExpertSummaryProfile {
  expertId: number;
  specialty: ExpertSpecialty;
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

// 회원가입 응답 타입
export type SignUpResponse = ApiResponse<number>; // 사용자 ID

export interface PersonalSignUpRequest {
  // member
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
  password: string;

  // expert fields
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string;

  // careers
  careers: CareerRequest[];

  // license images
  licenseImages: LicenseImageRequest[];

  // licenses
  licenses: LicenseRequest[];
}

export interface CareerRequest {
  companyName: string;
  jobTitle: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface LicenseImageRequest {
  imageUrl: string;
  imageTitle: string;
}

export interface LicenseRequest {
  licenseName: string;
  licenseDate: string; // YYYY-MM-DD
  licenseDescription: string;
}
