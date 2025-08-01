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

export const useLoginMutation = ({ onSuccess, onError }: UseLoginMutationProps = {}) => {
  const navigate = useNavigate();
  
  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: (data: LoginRequest) => tokenAPI.login(data),
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