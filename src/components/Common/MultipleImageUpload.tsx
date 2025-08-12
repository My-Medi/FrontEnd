import React, { useRef, useState } from 'react';
import { useImageUploadMutation } from '../../hooks/images/useImageUploadMutation';
import fileboxIcon from '../../assets/MyHome/Resume/filebox.svg';

interface MultipleImageUploadProps {
  onUploadSuccess?: (imageUrls: string[], files: File[]) => void;
  onUploadError?: (error: any) => void;
  accept?: string;
  maxSize?: number; // MB 단위
  maxFiles?: number;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  onUploadSuccess,
  onUploadError,
  accept = 'image/*',
  maxSize = Infinity, // 용량 제한 없음 (요청에 따라 해제)
  maxFiles = 10,
  className = '',
  children,
  disabled = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const uploadMutation = useImageUploadMutation({
    onSuccess: (data) => {
      setIsUploading(false);
      onUploadSuccess?.(data.result, currentFiles);
      setCurrentFiles([]);
      // 파일 입력 초기화
      resetFileInput();
    },
    onError: (error) => {
      setIsUploading(false);
      onUploadError?.(error);
      setCurrentFiles([]);
      // 파일 입력 초기화
      resetFileInput();
    },
  });

  // 파일 입력을 강제로 초기화하는 함수
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateAndUploadFiles = (files: File[]) => {
    if (files.length === 0) return;

    // 파일 개수 검증 (파일 개수 제한은 유지, 필요 시 Infinity 전달)
    if (files.length > maxFiles) {
      alert(`최대 ${maxFiles}개의 파일만 업로드 가능합니다.`);
      resetFileInput();
      return;
    }

    // 파일 크기 및 타입 검증 (크기 제한 해제)
    const invalidFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/') || 
                         file.type === 'application/pdf' ||
                         file.type === 'application/vnd.hancom.hwp' ||
                         file.type === 'application/msword' ||
                         file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      return !isValidType; // 크기 제한은 체크하지 않음
    });

    if (invalidFiles.length > 0) {
      alert(`일부 파일이 조건에 맞지 않습니다.\n- 파일 타입: 이미지, PDF, 한글, Word 파일만 허용됩니다.`);
      resetFileInput();
      return;
    }

    setCurrentFiles(files);
    setIsUploading(true);
    uploadMutation.mutate(files);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    validateAndUploadFiles(files);
    // 파일 선택 후 입력 초기화
    resetFileInput();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    validateAndUploadFiles(files);
    // 드래그 앤 드롭 후 입력 초기화
    resetFileInput();
  };

  const handleClick = () => {
    if (!disabled && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  // 업로드 중일 때는 클릭 이벤트를 완전히 차단
  const handleContainerClick = (e: React.MouseEvent) => {
    if (isUploading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    handleClick();
  };

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />
      <div
        onClick={handleContainerClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer ${disabled || isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {children || (
          <div className={`flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg transition-colors ${
            isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}>
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-sm text-gray-600">업로드 중...</p>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img src={fileboxIcon} alt="파일 업로드" className="w-6 h-4" />
                <div className="text-center">
                  <p className="text-sm text-gray-600">이미지를 클릭하거나 드래그하여 업로드</p>
                  <p className="text-xs text-gray-400 mt-1">
                    최대 {maxFiles}개, 각 {maxSize}MB 이하
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 