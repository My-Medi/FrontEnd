// apis/myMedicalReport/compare.ts
import axiosInstance from '@/utils/axiosInstance';
import type { ApiResponse } from '@/types/common';
import type { MyMedicalReportResponse } from '@/types/myMedicalReport/compare';

// GET /v1/users/reports/comparing
export async function getComparingReport() {
  const { data } = await axiosInstance.get<ApiResponse<MyMedicalReportResponse>>(
    '/v1/users/reports/comparing',
  );
  if (!data?.isSuccess) {
    throw new Error(data?.message ?? 'Failed to fetch comparing report');
  }
  return data.result;
}
