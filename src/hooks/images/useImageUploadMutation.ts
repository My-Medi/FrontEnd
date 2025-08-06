import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { imageAPI } from '../../apis/imageApi/image';
import type { ImageUploadResponse } from '../../apis/imageApi/image';

interface UseImageUploadMutationProps {
  onSuccess?: (data: ImageUploadResponse) => void;
  onError?: (error: AxiosError) => void;
}

export const useImageUploadMutation = ({ onSuccess, onError }: UseImageUploadMutationProps = {}) => {
  return useMutation<ImageUploadResponse, AxiosError, File[]>({
    mutationFn: async (files: File[]) => {
      return imageAPI.uploadImages(files);
    },
    onSuccess: (data) => {
      console.log('이미지 업로드 성공:', data);
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      console.log('에러 상세 정보:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      onError?.(error);
    },
  });
};

export const useSingleImageUploadMutation = ({ onSuccess, onError }: UseImageUploadMutationProps = {}) => {
  return useMutation<string, AxiosError, File>({
    mutationFn: async (file: File) => {
      return imageAPI.uploadSingleImage(file);
    },
    onSuccess: (imageUrl) => {
      console.log('단일 이미지 업로드 성공:', imageUrl);
      onSuccess?.({ isSuccess: true, code: 2000, message: '성공', result: [imageUrl] });
    },
    onError: (error) => {
      console.error('단일 이미지 업로드 실패:', error);
      console.log('에러 상세 정보:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      onError?.(error);
    },
  });
}; 