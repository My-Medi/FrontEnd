import axios from 'axios';
import { API } from '../axios';
import { AUTH_ENDPOINTS } from '../../types';
import type { LoginRequest, LoginResponse } from '../../types';
import type { ApiResponse } from '../../types/common';

// 토큰 재발급 응답 타입
export interface TokenReissueResponse {
  grantType?: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpire?: string; // ISO datetime string
  refreshTokenExpire?: string; // ISO datetime string
  role?: string; // e.g., "[ROLE_EXPERT]" or "[ROLE_USER]"
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
    // 토큰 리프레시는 인터셉터를 거치지 않도록 axios를 직접 사용
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}${AUTH_ENDPOINTS.REISSUE}?refresh=${refreshToken}`);
    return response.data;
  },
};

export default tokenAPI;