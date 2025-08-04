import { API } from '../axios';
import { AUTH_ENDPOINTS } from '../../types';
import type { LoginRequest, LoginResponse } from '../../types';

// 토큰 관련 API 함수들
export const tokenAPI = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await API.post(`${AUTH_ENDPOINTS.LOGIN}`, data);
    return response.data;
  },
};

export default tokenAPI; 