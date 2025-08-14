import API from '../axios';
import type { ApiResponse } from '../../types';
import type { MyMedicalReportResponse } from '../../types/myMedicalReport/compare';

// GET /v1/users/reports/comparing
export async function getComparingReport(round?: number): Promise<MyMedicalReportResponse> {
  console.log('🔍 API 호출 시작:', { round });

  // 항상 round=1을 기본값으로 사용
  const params = { round: round || 1 };
  console.log('📡 API 요청 파라미터:', params);

  try {
    const { data } = await API.get<ApiResponse<MyMedicalReportResponse>>(
      '/users/reports/comparing', // /v1 제거 (baseURL에 이미 포함됨)
      { params },
    );

    console.log('📥 API 응답 받음:', data);

    if (!data?.isSuccess || !data.result) {
      console.error('❌ API 응답 에러:', data?.message || 'Unknown error');
      throw new Error(data?.message ?? 'Failed to fetch comparing report');
    }

    console.log('✅ API 응답 성공:', data.result);
    return data.result;
  } catch (error) {
    console.error('💥 API 호출 실패:', error);
    throw error;
  }
}
