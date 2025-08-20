import axios from "axios";
import { AUTH_ENDPOINTS } from "../types";
import { saveTokens, clearTokens, getTokens } from "../utils/tokenStorage";

// 백엔드 API 기본 URL
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 요청 인터셉터 - 토큰 추가
API.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 토큰 갱신 및 에러 처리
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const apiCode = error.response?.data?.code; // 서버 커스텀 코드
    const apiResult = error.response?.data?.result;
    const isTokenExpired =
      status === 401 ||
      apiCode === 4352 ||
      apiResult === 'AUTH_TOKEN_HAS_EXPIRED';

    // 개발 환경에서만 에러 로깅 (사용자 콘솔 노이즈 방지)
    if (import.meta.env.DEV) {
      const errorInfo = {
        status,
        url: originalRequest?.url,
        method: originalRequest?.method,
        apiCode,
        message: error.response?.data?.message || error.message
      };
      
      // 중요한 에러만 콘솔에 표시 (토큰 관련 에러는 제외)
      if (status !== 401 && status !== 403) {
        console.warn('API Error:', errorInfo);
      }
    }

    // 토큰 만료(401 또는 서버 커스텀 코드)이고 토큰 갱신을 시도하지 않은 경우
    if (isTokenExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken } = getTokens();
        if (refreshToken) {
          // 서버 스펙에 맞춰 쿼리스트링 방식으로 통일
          const response = await axios.post(
            `${BASE_URL}${AUTH_ENDPOINTS.REISSUE}?refresh=${encodeURIComponent(refreshToken)}`
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.result;
          
          // 새로운 토큰 저장
          saveTokens(newAccessToken, newRefreshToken);

          // 원래 요청 재시도
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        clearTokens();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default API;