import API from '../axios';
import type { HealthCheckupRequest, HealthCheckupFormResponse } from '../../types/healthCheckupForm';

// 건강리포트 생성 API
export const createHealthReport = async (data: HealthCheckupRequest): Promise<HealthCheckupFormResponse> => {
  // NOTE: BASE_URL already includes /api/v1
  const response = await API.post('/users/reports', data);
  return response.data;
};

// 건강리포트 조회 API (필요시)
export const getHealthReport = async (reportId: string): Promise<HealthCheckupFormResponse> => {
  // NOTE: BASE_URL already includes /api/v1
  const response = await API.get(`/users/reports/${reportId}`);
  return response.data;
};

// 건강리포트 회차별 조회 API
export const getHealthReportByRound = async (round: number): Promise<HealthCheckupFormResponse> => {
  const response = await API.get('/users/reports', { params: { round } });
  return response.data;
};

// 건강리포트 수정 API
export const updateHealthReport = async (
  round: number,
  data: HealthCheckupRequest,
): Promise<HealthCheckupFormResponse> => {
  // NOTE: BASE_URL already includes /api/v1
  const response = await API.patch('/users/reports', data, { params: { round } });
  return response.data;
};
