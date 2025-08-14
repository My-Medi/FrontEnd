import API from '../axios';
import type { CurrentHealthStatusResponse } from '../../types/currentHealthStatus';

export const getCurrentHealthStatus = async (): Promise<CurrentHealthStatusResponse> => {
  const response = await API.get('/users/reports/result/summary');
  return response.data;
};
