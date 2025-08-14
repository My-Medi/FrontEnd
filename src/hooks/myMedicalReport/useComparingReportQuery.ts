import { useQuery } from '@tanstack/react-query';
import { getComparingReport } from '../../apis/myMedicalReportApi/compare';
import type { MyMedicalReportResponse } from '../../types/myMedicalReport/compare';

export function useComparingReportQuery(round?: number) {
  console.log('🔄 Hook 호출됨:', { round });

  return useQuery<MyMedicalReportResponse>({
    queryKey: ['comparingReport', round],
    queryFn: () => getComparingReport(round),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
