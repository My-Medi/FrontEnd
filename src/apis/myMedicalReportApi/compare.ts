import API from '../axios';
import type { ApiResponse } from '../../types';
import type { MyMedicalReportResponse } from '../../types/myMedicalReport/compare';

// GET /v1/users/reports/comparing
export async function getComparingReport(round?: number): Promise<MyMedicalReportResponse> {
  // 항상 round=1을 기본값으로 사용
  const params = { round: round || 1 };

  try {
    const { data } = await API.get<ApiResponse<MyMedicalReportResponse>>(
      '/users/reports/comparing', // /v1 제거 (baseURL에 이미 포함됨)
      { params },
    );

    if (!data?.isSuccess || !data.result) {
      throw new Error(data?.message ?? 'Failed to fetch comparing report');
    }

    return data.result;
  } catch (error) {
    throw error;
  }
}
