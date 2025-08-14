import { useQuery } from '@tanstack/react-query';
import { getComparingReport } from '../../apis/myMedicalReportApi/compare';

export const useComparingReportQuery = (round?: number) => {
  return useQuery({
    queryKey: ['comparingReport', round],
    queryFn: () => getComparingReport(round),
  });
};
