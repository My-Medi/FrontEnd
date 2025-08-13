import React, { useRef, useState } from 'react';
import { useImageUploadMutation } from '../../hooks/images/useImageUploadMutation';
import fileIcon from '../../assets/MyHome/Resume/file.svg';
import fileboxIcon from '../../assets/MyHome/Resume/filebox.svg';

interface ExistingFileItem {
  licenseImageId: number;
  imageUrl: string;
  imageTitle: string;
}

interface FileUploadSectionProps {
  existingFiles?: ExistingFileItem[];
  onExistingFilesChange?: (files: ExistingFileItem[]) => void;
  onNewImagesChange?: (images: Array<{ imageUrl: string; imageTitle: string }>) => void;
  accept?: string; // e.g. ".png,.jpg,.jpeg,.pdf"
  uploadFiles?: (files: File[]) => Promise<string[]>;
  newFileTitlePrefix?: string;
  guideText?: string;
  allowMultiple?: boolean;
  itemWidthClass?: string;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  existingFiles = [],
  onExistingFilesChange,
  onNewImagesChange,
  accept = '.png,.jpg,.jpeg,.pdf',
  uploadFiles,
  newFileTitlePrefix = '파일',
  guideText = '이미지 파일 업로드(png,jpg,pdf)',
  allowMultiple = true,
  itemWidthClass = 'w-full max-w-[279px] xl:w-[24.7rem]',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const imageUploadMutation = useImageUploadMutation({
    onSuccess: (data) => {
      if (data.result && data.result.length > 0) {
        const newUrls = [...uploadedFileUrls, ...data.result];
        setUploadedFileUrls(newUrls);
        if (onNewImagesChange) {
          const newImages = data.result.map((url, index) => ({
            imageUrl: url,
            imageTitle:
              uploadedFiles[uploadedFileUrls.length + index]?.name || `${newFileTitlePrefix} ${uploadedFileUrls.length + index + 1}`,
          }));
          onNewImagesChange(newImages);
        }
      }
      setIsUploading(false);
    },
    onError: () => {
      setIsUploading(false);
      alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    },
  });

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  const isAcceptedType = (file: File) => {
    if (!accept) return true;
    const acceptList = accept.split(',').map((s) => s.trim().toLowerCase());
    const mime = (file.type || '').toLowerCase();
    const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;

    // Exact matches: mime or extension
    if (acceptList.includes(mime) || acceptList.includes(ext)) return true;

    // Wildcard mime types like image/*, video/*, audio/*
    if (mime) {
      const [mimeType] = mime.split('/');
      const acceptsWildcard = acceptList.some((token) => {
        if (!token.includes('/')) return false;
        const [type, subtype] = token.split('/');
        return subtype === '*' && type === mimeType;
      });
      if (acceptsWildcard) return true;
    }

    return false;
  };

  const handleFiles = (files: File[]) => {
    // 업로드 중이면 무시하여 중복 업로드 방지
    if (isUploading) return;

    const validFiles = files.filter(isAcceptedType);
    if (validFiles.length === 0) return;

    // 이미 선택/업로드된 파일과 이번 선택 내의 중복 제거 (name|size|lastModified 기준)
    const existingKeys = new Set(
      uploadedFiles.map((f) => `${f.name}|${f.size}|${f.lastModified}`)
    );
    const seen = new Set<string>();
    const uniqueFiles = validFiles.filter((f) => {
      const key = `${f.name}|${f.size}|${f.lastModified}`;
      if (existingKeys.has(key) || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    if (uniqueFiles.length === 0) return;

    setUploadedFiles((prev) => [...prev, ...uniqueFiles]);
    setIsUploading(true);
    if (uploadFiles) {
      uploadFiles(uniqueFiles)
        .then((urls) => {
          const newUrls = [...uploadedFileUrls, ...urls];
          setUploadedFileUrls(newUrls);
          if (onNewImagesChange) {
            const newImages = urls.map((url, index) => ({
              imageUrl: url,
              imageTitle: uniqueFiles[index]?.name || `${newFileTitlePrefix} ${uploadedFileUrls.length + index + 1}`,
            }));
            onNewImagesChange(newImages);
          }
        })
        .catch(() => {
          alert('파일 업로드에 실패했습니다. 다시 시도해주세요.');
        })
        .finally(() => setIsUploading(false));
    } else {
      imageUploadMutation.mutate(uniqueFiles);
    }
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
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedFileUrls((prev) => prev.filter((_, i) => i !== index));
    if (onNewImagesChange) {
      const remainingUrls = uploadedFileUrls.filter((_, i) => i !== index);
      const remainingFiles = uploadedFiles.filter((_, i) => i !== index);
      const updatedImages = remainingUrls.map((url, urlIndex) => ({
        imageUrl: url,
        imageTitle: remainingFiles[urlIndex]?.name || `${newFileTitlePrefix} ${urlIndex + 1}`,
      }));
      onNewImagesChange(updatedImages);
    }
  };

  const handleExistingFileRemove = (index: number) => {
    const updatedExistingFiles = existingFiles.filter((_, i) => i !== index);
    if (onExistingFilesChange) onExistingFilesChange(updatedExistingFiles);
  };

  return (
    <div className="space-y-5 xl:space-y-[0.6rem]">
      {/* 업로드 영역 (드래그 앤 드롭 + 클릭 선택) */}
      <div
        className={`w-full h-auto min-h-[5.9rem] xl:h-[5.9rem] border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center transition-colors p-3 xl:p-3 ${
          isDragOver ? 'bg-[#F0F4FF] border-[#1D68FF]' : 'bg-white'
        } ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!isUploading ? handleUploadAreaClick : undefined}
      >
        <div className="flex items-center gap-2 xl:gap-[0.375rem]">
          <img src={fileIcon} alt="파일 업로드" className="w-4 h-5 xl:w-[0.9rem] xl:h-[1.1rem]" />
          <p className="text-sm xl:text-sm font-medium text-[#9DA0A3] font-pretendard leading-[1.714] tracking-[-0.03em] text-center">
            {isUploading ? '파일 업로드 중...' : isDragOver ? '파일을 여기에 놓으세요' : '여기에 파일을 마우스로 끌어오세요.'}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple={allowMultiple}
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* 파일 가이드/기존/새 파일 가로 배치 + 줄바꿈 */}
      <div className="flex flex-wrap gap-2 xl:gap-[0.6rem]">
        {/* 안내 박스 (클릭 시 파일 선택) */}
        <div
          className={`${itemWidthClass} h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center gap-4 xl:gap-[0.9rem] select-none ${
            isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          onClick={!isUploading ? handleUploadAreaClick : undefined}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (!isUploading && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              handleUploadAreaClick();
            }
          }}
          aria-label="이미지 파일 선택"
          aria-disabled={isUploading}
        >
          <img src={fileboxIcon} alt="업로드 안내" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
          <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
            {guideText}
          </span>
        </div>

        {/* 기존 업로드된 파일들 */}
        {existingFiles.map((file, index) => (
          <div key={file.licenseImageId} className={`${itemWidthClass} h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[rgba(219,230,255,0.5)] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]`}>
            <div className="flex items-center gap-4 xl:gap-[0.9rem]">
              <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
                {file.imageTitle || `${newFileTitlePrefix} ${index + 1}`}
              </span>
            </div>
            <div className="flex items-center gap-2 xl:gap-[0.5rem]">
              <a
                href={file.imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1D68FF] hover:text-[#0056CC] transition-colors text-xs xl:text-xs"
              >
                보기
              </a>
              <button onClick={() => handleExistingFileRemove(index)} className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors">
                ✕
              </button>
            </div>
          </div>
        ))}

        {/* 새로 업로드된 파일들 */}
        {uploadedFiles.map((file, index) => (
          <div key={`${file.name}-${index}`} className={`${itemWidthClass} h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[rgba(219,230,255,0.5)] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]`}>
            <div className="flex items-center gap-4 xl:gap-[0.9rem]">
              <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">{file.name}</span>
            </div>
            <div className="flex items-center gap-2 xl:gap-[0.5rem]">
              {uploadedFileUrls[index] && (
                <a
                  href={uploadedFileUrls[index]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1D68FF] hover:text-[#0056CC] transition-colors text-xs xl:text-xs"
                >
                  보기
                </a>
              )}
              <button onClick={() => handleFileRemove(index)} className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadSection;


