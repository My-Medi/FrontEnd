import type { ExpertReportResponse, ExpertReportResultResponse } from '../../types/expert/report';
import API from '../axios';

interface ApiResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

// GET /api/v1/experts/reports/users/{userId}
export const getExpertUserReport = async (userId: number, round: number) => {
  const response = await API.get<ApiResponse<ExpertReportResponse>>(
    `/experts/reports/users/${userId}?round=${round}`,
  );
  return response.data;
};

// GET /api/v1/experts/reports/{users}/{userId}/result
export const getExpertUserReportResult = async (userId: number, round: number) => {
  const response = await API.get<ApiResponse<ExpertReportResultResponse>>(
    `/experts/reports/users/${userId}/result?round=${round}`,
  );
  return response.data;
};

// GET /api/v1/experts/reports/users/{userId}/result/latest
export const getExpertUserLatestHealthStatus = async (userId: number): Promise<ApiResponse<{ totalScore: number; healthStatus: string }>> => {
  const response = await API.get<ApiResponse<{ totalScore: number; healthStatus: string }>>(
    `/experts/reports/users/${userId}/result/latest`,
  );
  return response.data;
};
