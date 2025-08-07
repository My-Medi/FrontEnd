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
