import axiosInstance from '../axios';
import type { MyMedicalReportResponse } from '../../types/myMedicalReport/compare';

export const getMedicalReportCompare = async (): Promise<MyMedicalReportResponse> => {
  console.log('🌐 API 호출: GET /api/v1/users/reports/comparing');
  try {
    const response = await axiosInstance.get<MyMedicalReportResponse>(
      '/api/v1/users/reports/comparing',
    );
    console.log('✅ API 응답 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ API 호출 실패:', error);
    throw error;
  }
};
