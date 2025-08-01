// 공통 응답 타입 정의
export interface ApiResponse<T = any> {
  isSuccess: boolean;
  code: number;
  message: string;
  result?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// 사용자 프로필 타입 정의
export interface UserProfile {
  id: number;
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  email: string;
  phoneNumber: string;
  profileImgUrl: string;
  username: string;
  role: 'USER' | 'EXPERT';
}

// 인증 관련 엔드포인트
export const AUTH_ENDPOINTS = {
  LOGIN: '/tokens/login',
  REISSUE: '/tokens/reissue'
} as const;

// 사용자 관련 엔드포인트
export const USER_ENDPOINTS = {
  PROFILE: '/users'
} as const;
