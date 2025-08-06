import API from '../axios';

/**
 * 이미지 업로드 응답 타입
 */
export interface ImageUploadResponse {
  isSuccess: boolean;
  code: number;
  message: string;
  result: string[]; // 업로드된 이미지 URL 배열
}

/**
 * 이미지 업로드 API
 * @param files - 업로드할 이미지 파일들
 * @returns Promise<ImageUploadResponse>
 */
export const uploadImages = async (files: File[]): Promise<ImageUploadResponse> => {
  try {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append('uploadImgFileList', file);
    });

    const response = await API.post<ImageUploadResponse>('/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('이미지 업로드 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

/**
 * 단일 이미지 업로드 API
 * @param file - 업로드할 이미지 파일
 * @returns Promise<string> - 업로드된 이미지 URL
 */
export const uploadSingleImage = async (file: File): Promise<string> => {
  try {
    const response = await uploadImages([file]);
    return response.result[0]; // 첫 번째 이미지 URL 반환
  } catch (error) {
    console.error('단일 이미지 업로드 실패:', error);
    throw error;
  }
};

export const imageAPI = {
  uploadImages,
  uploadSingleImage,
}; 