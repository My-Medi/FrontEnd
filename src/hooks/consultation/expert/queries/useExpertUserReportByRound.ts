import { useQuery } from '@tanstack/react-query';
import { getExpertUserReportByRound } from '../../../../apis/expertApi/consultation';
import type { HealthCheckupFormResponse } from '../../../../types/healthCheckupForm';

export const EXPERT_USER_REPORT_QK = 'expertUserReportByRound';

export function useExpertUserReportByRound(userId: number | null, round: number | null, enabled: boolean = true) {
  return useQuery<HealthCheckupFormResponse>({
    queryKey: [EXPERT_USER_REPORT_QK, userId, round],
    queryFn: () => getExpertUserReportByRound(userId as number, round as number),
    enabled: !!userId && !!round && enabled,
    staleTime: 60 * 1000,
    retry: false,
  });
}


