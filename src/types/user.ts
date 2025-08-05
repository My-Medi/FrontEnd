import type { ApiResponse } from './common';

// 개인 회원가입 요청 타입
export interface PersonalSignUpRequest {
  name: string;
  birthDate: string; // YYYY-MM-DD 형식
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
  password: string;
}

// 회원가입 응답 타입
export type SignUpResponse = ApiResponse<number>; // 사용자 ID

// 사용자 정보 타입
export interface UserInfo {
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
}

// 건강관리요청서 작성 요청 타입
export interface HealthProposalRequest {
  healthInterestsDto: {
    weightManagement: boolean;
    bloodSugarControl: boolean;
    cholesterolControl: boolean;
    bloodPressureControl: boolean;
    liverFunctionCare: boolean;
    sleepRecovery: boolean;
    dietImprovement: boolean;
    exerciseRoutine: boolean;
    stressAndLifestyle: boolean;
  };
  abnormalValueDto: {
    fastingBloodSugar: boolean;
    cholesterolLdl: boolean;
    bloodPressure: boolean;
    liverEnzymes: boolean;
    bmiOrBodyFat: boolean;
    noHealthCheckResult: boolean;
  };
  helpTopicDto: {
    dietitian: boolean;
    healthManager: boolean;
    wellnessCoach: boolean;
    exerciseTherapist: boolean;
    recommendForMe: boolean;
  };
  goal: string;
  lifeDescription: string;
}

// 건강관리요청서 조회 응답 타입
export interface HealthProposalResponse {
  id: number;
  userId: number;
  healthInterestsDto: {
    weightManagement: boolean;
    bloodSugarControl: boolean;
    cholesterolControl: boolean;
    bloodPressureControl: boolean;
    liverFunctionCare: boolean;
    sleepRecovery: boolean;
    dietImprovement: boolean;
    exerciseRoutine: boolean;
    stressAndLifestyle: boolean;
  };
  abnormalValueDto: {
    fastingBloodSugar: boolean;
    cholesterolLdl: boolean;
    bloodPressure: boolean;
    liverEnzymes: boolean;
    bmiOrBodyFat: boolean;
    noHealthCheckResult: boolean;
  };
  helpTopicDto: {
    dietitian: boolean;
    healthManager: boolean;
    wellnessCoach: boolean;
    exerciseTherapist: boolean;
    recommendForMe: boolean;
  };
  goal: string;
  lifeDescription: string;
}

export type HealthProposalApiResponse = ApiResponse<HealthProposalResponse>;
export type HealthProposalCreateResponse = ApiResponse<number>; // 생성된 요청서 ID 