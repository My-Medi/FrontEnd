import axiosInstance from '../axios';
import type { MedicalReportLlmResponse } from '../../types/myMedicalReport/llm';

export const getMedicalReportLlmTotalByRound = async (
  round: number = 1,
): Promise<MedicalReportLlmResponse> => {
  // BASE_URL이 이미 /api/v1 로 끝나므로 여기서는 /users 이하만 붙입니다.
  const url = `/users/reports/total?round=${encodeURIComponent(round)}`;
  try {
    const response = await axiosInstance.get<MedicalReportLlmResponse>(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};


