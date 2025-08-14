import { useQuery } from '@tanstack/react-query';
import { getHealthScore } from '../../apis/myMedicalReportApi/graph';

export const useHealthScoreQuery = (round: number) => {
  return useQuery({
    queryKey: ['healthScore', round],
    queryFn: () => getHealthScore(round),
    enabled: !!round,
  });
};
