import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthReport } from '../../apis/healthCheckupApi/healthCheckup';
import type { HealthCheckupRequest } from '../../types/healthCheckupForm';

export const useHealthReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HealthCheckupRequest) => createHealthReport(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['healthReports'] });
    },
    onError: (error) => {
      console.error('건강리포트 생성 실패:', error);
    },
  });
};

