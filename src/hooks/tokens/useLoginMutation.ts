import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { tokenAPI } from '../../apis/tokenApi/token';
import type { LoginRequest, LoginResponse } from '../../types';
import { saveTokens } from '../../utils/tokenStorage';

interface UseLoginMutationProps {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError) => void;
}

// 우회 로그인 계정 설정
const BYPASS_ACCOUNTS = {
  'expert': 'password123'
};

export const useLoginMutation = ({ onSuccess, onError }: UseLoginMutationProps = {}) => {
  const navigate = useNavigate();
  
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: async (data: LoginRequest) => {
      // 우회 계정 확인
      if (BYPASS_ACCOUNTS[data.loginId as keyof typeof BYPASS_ACCOUNTS] === data.password) {
        console.log('우회 로그인 성공:', data.loginId);
        
        // 가짜 토큰 생성 (실제 API 응답 형식)
        const fakeResponse: LoginResponse = {
          isSuccess: true,
          code: 2000,
          message: '성공',
          result: {
            grantType: 'Bearer',
            accessToken: 'fake-access-token-' + Date.now(),
            refreshToken: 'fake-refresh-token-' + Date.now(),
            accessTokenExpire: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            refreshTokenExpire: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            role: 'ROLE_EXPERT' // 전문가 역할
          }
        };
        
        return fakeResponse;
      }
      
      // 일반 로그인 API 호출
      return tokenAPI.login(data);
    },
    onSuccess: (data) => {
      
      if (data.isSuccess && data.result) {
        // 토큰 저장
        saveTokens(data.result.accessToken, data.result.refreshToken);
        
        // 기본 성공 처리
        navigate('/myhome');
        
        // 추가 성공 콜백 실행
        onSuccess?.(data);
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
      console.log('에러 상세 정보:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        response: error.response?.data,
        status: error.response?.status
      });
      onError?.(error);
    },
  });
}; 