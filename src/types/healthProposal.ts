import type { ApiResponse } from './common';

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
    other: boolean;
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
  requestNote: string;
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
    other: boolean;
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
  requestNote: string;
}

export type HealthProposalApiResponse = ApiResponse<HealthProposalResponse>;
export type HealthProposalCreateResponse = ApiResponse<number>; // 생성된 요청서 ID 