import { useQuery } from '@tanstack/react-query';
import { getHealthReportByRound } from '../../apis/healthCheckupApi/healthCheckup';

export const useHealthReportQuery = (round: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['healthReport', round],
    queryFn: () => getHealthReportByRound(round),
    enabled: enabled && Number.isFinite(round) && round > 0,
    staleTime: 60 * 1000,
  });
};

export default useHealthReportQuery;

