import type { ApiResponse } from './common';

// 개인 회원가입 요청 타입
export interface PersonalSignUpRequest {
  name: string;
  birthDate: string; // YYYY-MM-DD 형식
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
  password: string;
}

// 회원가입 응답 타입
export type SignUpResponse = ApiResponse<number>; // 사용자 ID

// 사용자 정보 타입
export interface UserInfo {
  name: string;
  birthDate: string;
  gender: 'MALE' | 'FEMALE';
  nickname: string;
  email: string;
  phoneNumber: string;
  profileImgUrl?: string;
  loginId: string;
}

 