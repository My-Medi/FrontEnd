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

    // 401 에러이고 토큰 갱신을 시도하지 않은 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refreshToken, accessToken } = getTokens();
        if (refreshToken) {
          // 토큰 재발급 요청 (GET 방식, 쿼리 파라미터로 refreshToken 전달)
          const response = await axios.get(`${BASE_URL}${AUTH_ENDPOINTS.REISSUE}?refresh=${refreshToken}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

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