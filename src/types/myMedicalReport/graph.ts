export interface HealthScoreResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: {
    totalScore: number;
    healthStatus: 'DANGER' | 'CAUTION' | 'WATCH' | 'NORMAL' | 'SAFE';
  };
}

// 백엔드 상태값을 한국어로 변환하는 매핑
export const healthStatusMap: Record<string, '안심' | '정상' | '관심' | '주의' | '위험'> = {
  SAFE: '안심',
  NORMAL: '정상',
  WATCH: '관심',
  CAUTION: '주의',
  DANGER: '위험',
};
