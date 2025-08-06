import type { ApiResponse } from './common';

// 전문가 전문분야 타입
export type ExpertSpecialty = 'NUTRITIONIST' | 'HEALTH_MANAGER' | 'WELLNESS_COACH' | 'EXERCISE_THERAPIST' | 'ETC';

// 경력 요청 타입
export interface CareerRequest {
  companyName: string;
  jobTitle: string;
  startDate: string; // YYYY-MM-DD 형식
  endDate: string; // YYYY-MM-DD 형식
}

// 자격증 이미지 요청 타입
export interface LicenseImageRequest {
  imageUrl: string;
  imageTitle: string;
}

// 자격증 요청 타입
export interface LicenseRequest {
  licenseName: string;
  licenseDate: string; // YYYY-MM-DD 형식
  licenseDescription: string;
}

// 2단계: 기본 정보 + 전문가 정보
export interface ExpertSignUpStep2Request {
  // member 정보
  name: string;
  birthDate: string; // YYYY-MM-DD
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
  password: string;

  // expert 기본 정보
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string;
}

// 3단계: 경력 및 자격증 정보
export interface ExpertSignUpStep3Request {
  careers: CareerRequest[];
  licenseImages: LicenseImageRequest[];
  licenses: LicenseRequest[];
}

// 전문가 회원가입 최종 요청 타입 (2단계 + 3단계)
export interface ExpertSignUpRequest {
  member: {
    name: string;
    birthDate: string;
    gender: 'MALE' | 'FEMALE';
    nickname: string;
    email: string;
    phoneNumber: string;
    profileImgUrl?: string;
    loginId: string;
    password: string;
  };
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string;
  careers: CareerRequest[];
  licenseImages: LicenseImageRequest[];
  licenses: LicenseRequest[];
}

// 전문가 목록 조회 요청 파라미터
export interface ExpertListRequestParams {
  currentPage: number;
  pageSize: number;
}

// 전문가 목록 응답 타입
export interface ExpertListResponse extends ApiResponse<{
  content: Expert[];
  totalPages: number;
  page: number;
}> {}

// 전문가 정보 타입
export interface Expert {
  id: number;
  name: string;
  specialty: ExpertSpecialty;
  organizationName: string;
  introduction: string;
  introSentence: string;
  profileImgUrl?: string;
}

// 회원가입 응답 타입
export type SignUpResponse = ApiResponse<number>;

// 기존 타입 (하위 호환성을 위해 유지)
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
