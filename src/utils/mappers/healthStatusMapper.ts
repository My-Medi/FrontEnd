import type { HealthStatus } from '../../constants/healthStatus';
import type { CurrentHealthStatusResult } from '../../types/currentHealthStatus';
import type { HealthStatus as CompareHealthStatus } from '../../types/myMedicalReport/compare';

export const mapApiResultToHealthStatus = (
  result: CurrentHealthStatusResult['result'],
): HealthStatus => {
  const mapping: Record<CurrentHealthStatusResult['result'], HealthStatus> = {
    DANGER: '위험',
    CAUTION: '주의',
    INTEREST: '관심',
    NORMAL: '정상',
    SAFE: '안심',
  };

  // 매핑되지 않은 값이 들어올 경우 기본값 반환
  return mapping[result] || '정상';
};

// compare.ts의 HealthStatus를 LeftPatientCard의 stage로 변환하는 매퍼
export const mapCompareHealthStatusToStage = (
  healthStatus: CompareHealthStatus,
): '정상' | '주의' | '위험' | '안심' | '관심' | '알수없음' => {
  const mapping: Record<
    CompareHealthStatus,
    '정상' | '주의' | '위험' | '안심' | '관심' | '알수없음'
  > = {
    SAFE: '안심',
    WATCH: '관심',
    DANGER: '위험',
    NORMAL: '정상',
    CAUTION: '주의',
    UNKNOWN: '알수없음',
  };

  return mapping[healthStatus] || '알수없음';
};
