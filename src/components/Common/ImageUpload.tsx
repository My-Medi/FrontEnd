import React, { useRef, useState } from 'react';
import { useSingleImageUploadMutation } from '../../hooks/images/useImageUploadMutation';

interface ImageUploadProps {
  onUploadSuccess?: (imageUrl: string) => void;
  onUploadError?: (error: any) => void;
  accept?: string;
  maxSize?: number; // MB 단위
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  accept = 'image/*',
  maxSize = 5, // 5MB 기본값
  className = '',
  children,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadMutation = useSingleImageUploadMutation({
    onSuccess: (data) => {
      setIsUploading(false);
      const imageUrl = data.result[0];
      onUploadSuccess?.(imageUrl);
    },
    onError: (error) => {
      setIsUploading(false);
      onUploadError?.(error);
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 파일 크기 검증
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSize) {
      alert(`파일 크기는 ${maxSize}MB 이하여야 합니다.`);
      return;
    }

    // 파일 타입 검증
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);
    uploadMutation.mutate(file);
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
      <div
        onClick={handleClick}
        className={`cursor-pointer ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children || (
          <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">업로드 중...</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600">이미지를 클릭하여 업로드</p>
                <p className="text-xs text-gray-400 mt-1">최대 {maxSize}MB</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 