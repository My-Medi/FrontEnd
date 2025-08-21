import { useQuery } from '@tanstack/react-query';
import { getExpertUserReportResult } from '../../../apis/expertApi/report';

export const useExpertUserReportResultQuery = (userId: number, round: number) => {
  return useQuery({
    queryKey: ['expertUserReportResult', userId, round],
    queryFn: async () => {
      const response = await getExpertUserReportResult(userId, round);
      return response.result;
    },
    enabled: !!userId && !!round,
  });
};
