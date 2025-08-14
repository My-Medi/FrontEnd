import API from '../axios';
import type { HealthCheckupRequest, HealthCheckupFormResponse } from '../../types/healthCheckupForm';
import type { ApiResponse } from '../../types/common';

// 건강리포트 생성 API
export const createHealthReport = async (data: HealthCheckupRequest): Promise<HealthCheckupFormResponse> => {
  // NOTE: BASE_URL already includes /api/v1
  const response = await API.post('/users/reports', data);
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

// 건강리포트 총 회차 수 조회
export const getHealthReportCount = async (): Promise<ApiResponse<number>> => {
  const response = await API.get('/users/reports/count');
  return response.data as ApiResponse<number>;
};

// 건강검진 결과지 이미지 파싱
export const parseHealthReportImage = async (
  imageFile: File,
): Promise<ApiResponse<HealthCheckupRequest>> => {
  const formData = new FormData();
  formData.append('imageFile', imageFile);
  const response = await API.post<ApiResponse<HealthCheckupRequest>>(
    '/users/reports/parsing',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
  return response.data;
};
