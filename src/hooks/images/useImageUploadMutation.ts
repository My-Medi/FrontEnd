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
      onSuccess?.(data);
    },
    onError: (error) => {
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
      onSuccess?.({ isSuccess: true, code: 2000, message: '성공', result: [imageUrl] });
    },
    onError: (error) => {
      onError?.(error);
    },
  });
}; 