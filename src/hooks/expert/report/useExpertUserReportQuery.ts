import { useQuery } from '@tanstack/react-query';
import { getExpertUserReport } from '../../../apis/expertApi/report';

export const useExpertUserReportQuery = (userId: number, round: number) => {
  return useQuery({
    queryKey: ['expertUserReport', userId, round],
    queryFn: async () => {
      const response = await getExpertUserReport(userId, round);
      return response.result;
    },
    enabled: !!userId && !!round,
  });
};
