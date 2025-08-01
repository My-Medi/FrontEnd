import type { ApiResponse } from './common';

export interface LoginRequest {
  loginId: string;
  password: string;
}

export interface LoginResult {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpire: string;
  refreshTokenExpire: string;
  role: string;
}

export type LoginResponse = ApiResponse<LoginResult>; 