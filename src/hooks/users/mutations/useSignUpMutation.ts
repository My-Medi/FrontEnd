import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { userAPI } from '../../../apis/userApi/user';
import type { PersonalSignUpRequest, SignUpResponse } from '../../../types/user';

interface UseSignUpMutationProps {
  onSuccess?: (data: SignUpResponse) => void;
  onError?: (error: AxiosError) => void;
}

export const useSignUpMutation = ({ onSuccess, onError }: UseSignUpMutationProps = {}) => {
  return useMutation<SignUpResponse, AxiosError, PersonalSignUpRequest>({
    mutationFn: async (data: PersonalSignUpRequest) => {
      return userAPI.signUpUser(data);
    },
    onSuccess: (data) => {
      console.log('회원가입 성공:', data);
      
      // 추가 성공 콜백 실행
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
      console.log('에러 상세 정보:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });
      console.log('서버 에러 응답:', error.response?.data);
      onError?.(error);
    },
  });
};
