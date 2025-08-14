import { useQuery } from '@tanstack/react-query';
import { getMedicalReportLlmTotalByRound } from '../../apis/myMedicalReportApi/llm';

export const useMedicalReportLlmQuery = (round: number = 1, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['medicalReportLlmTotal', round],
    queryFn: () => getMedicalReportLlmTotalByRound(round),
    enabled: enabled && Number.isFinite(round) && round > 0,
    staleTime: 60 * 1000,
  });
};

export default useMedicalReportLlmQuery;


