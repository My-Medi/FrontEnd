import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { tokenAPI } from '../../apis/tokenApi/token';
import type { LoginRequest, LoginResponse } from '../../types';
import { saveTokens } from '../../utils/tokenStorage';

interface UseLoginMutationProps {
  onSuccess?: (data: LoginResponse) => void;
  onError?: (error: AxiosError) => void;
}

// 로그인 요청 데이터에 isKeepLogin 추가
interface LoginRequestWithKeepLogin extends LoginRequest {
  isKeepLogin?: boolean;
}

export const useLoginMutation = ({ onSuccess, onError }: UseLoginMutationProps = {}) => {
  const navigate = useNavigate();
  
  return useMutation<LoginResponse, AxiosError, LoginRequestWithKeepLogin>({
    mutationFn: async (data: LoginRequestWithKeepLogin) => {
      // 로그인 API 호출
      return tokenAPI.login(data);
    },
    onSuccess: (data, variables) => {
      
      if (data.isSuccess && data.result) {
        // 로그인 유지 여부에 따라 토큰 저장
        saveTokens(data.result.accessToken, data.result.refreshToken, variables.isKeepLogin);
        
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