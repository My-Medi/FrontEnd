import type { HealthStatus } from '../../constants/healthStatus';
import type { CurrentHealthStatusResult } from '../../types/currentHealthStatus';

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
