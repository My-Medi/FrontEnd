// 매칭 전문가 API 타입
export interface MatchedExpertApi {
  consultationId: number;
  expertId: number;
  status: 'REQUESTED' | 'ACCEPTED' | 'REJECTED';
  specialty: 'NUTRITIONIST' | 'HEALTH_MANAGER' | 'WELLNESS_COACH' | 'EXERCISE_THERAPIST' | 'ETC';
  name: string;
  nickname: string;
  profileImgUrl: string;
  phoneNumber: string;
  introSentence: string;
  requestDate: string;
}

export interface MatchedExpertApiResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: MatchedExpertApi[];
}

// 매칭된 전문가 상세 정보 타입 (GET /users/consultations/experts/{expertId})
export interface MatchedExpertDetail {
  expertId: number;
  name: string;
  nickname: string;
  phoneNumber: string;
  introSentence: string;
  profileImageUrl: string;
  matchedAt: string; // YYYY-MM-DD
  introduction: string;
  organization: string;
  specialty: 'NUTRITIONIST' | 'HEALTH_MANAGER' | 'WELLNESS_COACH' | 'EXERCISE_THERAPIST' | 'ETC';
  career: string[];
}

export interface MatchedExpertDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: MatchedExpertDetail;
}

// 요청중인 전문가 상세 정보 타입 (GET /users/consultations/experts/{expertId}/requested)
export interface RequestedExpertDetail {
  expertId: number;
  name: string;
  nickname: string;
  introSentence: string;
  profileImageUrl: string;
  requestedAt: string; // YYYY-MM-DD
  introduction: string;
  organization: string;
  specialty: 'NUTRITIONIST' | 'HEALTH_MANAGER' | 'WELLNESS_COACH' | 'EXERCISE_THERAPIST' | 'ETC';
  career: string[];
  requestCount: number;
}

export interface RequestedExpertDetailResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: RequestedExpertDetail;
}
