import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { expertAPI } from '../../../apis/expertApi/expert';
import type { PersonalSignUpRequest, SignUpResponse, ExpertSignUpRequest } from '../../../types/expert';

interface UseSignUpMutationProps {
  onSuccess?: (data: SignUpResponse) => void;
  onError?: (error: AxiosError) => void;
}

export const useSignUpMutation = ({ onSuccess, onError }: UseSignUpMutationProps = {}) => {
  return useMutation<SignUpResponse, AxiosError, PersonalSignUpRequest>({
    mutationFn: async (data: PersonalSignUpRequest) => {
      return expertAPI.signUpExpert(data);
    },
    onSuccess: (data) => {
      console.log('전문가 회원가입 성공:', data);
      
      // 추가 성공 콜백 실행
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('전문가 회원가입 실패:', error);
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

// 새로운 2단계, 3단계 방식의 전문가 회원가입 훅
export const useExpertSignUpMutation = ({ onSuccess }: UseSignUpMutationProps = {}) => {
  return useMutation<SignUpResponse, AxiosError, ExpertSignUpRequest>({
    mutationFn: async (data: ExpertSignUpRequest) => {
      return expertAPI.signUpExpertNew(data);
    },
    onSuccess: (data) => {
      console.log('전문가 회원가입 성공 (새로운 방식):', data);
      
      // 추가 성공 콜백 실행
      onSuccess?.(data);
    },
    onError: (error: any) => {
      console.log('전문가 회원가입 실패 (새로운 방식):', error);
      console.log('에러 상세 정보:', {
        message: error.message,
        response: error.response,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers
      });
      
      // 서버 응답 데이터 확인
      if (error.response?.data) {
        console.log('서버 응답 데이터:', error.response.data);
      }
      
      // 요청 데이터 확인
      if (error.config?.data) {
        console.log('요청 데이터 (문자열):', error.config.data);
        try {
          const parsedData = JSON.parse(error.config.data);
          console.log('요청 데이터 (파싱됨):', parsedData);
        } catch (e) {
          console.log('요청 데이터 파싱 실패:', e);
        }
      }
      
      console.log('서버 에러 응답:', error.response?.data);
    },
  });
};
