import { useQuery } from '@tanstack/react-query';
import { getExpertReportSummary } from '../../../../apis/expertApi/consultation';
import type { ReportSummary } from '../../../../types/reportSummary';

export const EXPERT_REPORT_SUMMARY_QK = 'expertReportSummary';

export function useExpertReportSummary(userId: number | null, enabled: boolean = true) {
  return useQuery<{ result: ReportSummary } | any, unknown, ReportSummary>({
    queryKey: [EXPERT_REPORT_SUMMARY_QK, userId],
    queryFn: async () => {
      try {
        return await getExpertReportSummary(userId as number);
      } catch (err: any) {
        if (err?.response?.status === 404) {
          // 요약이 없을 때: 빈 결과 반환하여 UI에서 빈 상태 표시
          return { result: undefined } as any;
        }
        throw err;
      }
    },
    enabled: !!userId && enabled,
    select: (r: any) => r.result ?? r.data?.result ?? r,
    staleTime: 60 * 1000,
    retry: false,
  });
}


