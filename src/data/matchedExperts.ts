import type { MatchedExpertApi } from '../types/expert';

// API 응답 구조와 동일한 타입 사용
export type MatchedExpert = MatchedExpertApi & {
  isAddCard?: boolean; // 플러스 카드용
  career?: string; // 경력사항 (모달용)
};



// 마지막 카드용 데이터 (플러스 아이콘 카드)
export const addExpertCard: MatchedExpert = {
  consultationId: 0,
  expertId: 0,
  status: 'REQUESTED',
  specialty: 'NUTRITIONIST',
  name: '',
  nickname: '',
  profileImgUrl: '',
  phoneNumber: '',
  introSentence: '',
  requestDate: '',
  isAddCard: true
}; 