import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHealthReport, updateHealthReport } from '../../apis/healthCheckupApi/healthCheckup';
import type { HealthCheckupRequest } from '../../types/healthCheckupForm';

export const useHealthReportMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HealthCheckupRequest) => createHealthReport(data),
    onSuccess: () => {
      // 성공 시 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['healthReport'] });
    },
    onError: (error) => {
      console.error('건강리포트 생성 실패:', error);
    },
  });
};

// 수정 뮤테이션 훅
export const useHealthReportUpdateMutation = (round: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: HealthCheckupRequest) => updateHealthReport(round, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['healthReport', round] });
    },
    onError: (error) => {
      console.error('건강리포트 수정 실패:', error);
    },
  });
};

