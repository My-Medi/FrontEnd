import { API } from '../axios';
import { AUTH_ENDPOINTS } from '../../types';
import type { LoginRequest, LoginResponse } from '../../types';
import type { ApiResponse } from '../../types/common';

// 토큰 재발급 응답 타입
export interface TokenReissueResponse {
  accessToken: string;
  refreshToken: string;
}

// 토큰 관련 API 함수들
export const tokenAPI = {
  // 로그인
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await API.post(`${AUTH_ENDPOINTS.LOGIN}`, data);
    return response.data;
  },

  // 토큰 재발급
  reissue: async (refreshToken: string): Promise<ApiResponse<TokenReissueResponse>> => {
    const response = await API.post(`${AUTH_ENDPOINTS.REISSUE}?refresh=${refreshToken}`);
    return response.data;
  },
};

export default tokenAPI; 