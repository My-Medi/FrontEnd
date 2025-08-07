import React, { useState, useRef } from 'react';
import { useImageUploadMutation } from '../../../hooks/images/useImageUploadMutation';
import fileIcon from '../../../assets/MyHome/Resume/file.svg';
import fileboxIcon from '../../../assets/MyHome/Resume/filebox.svg';
import type { CertificateFormItem } from '../../../types/expert/resume';

interface CertificateSectionProps {
  certificates: CertificateFormItem[];
  onCertificatesChange: (certificates: CertificateFormItem[]) => void;
  existingFiles?: Array<{
    licenseImageId: number;
    imageUrl: string;
    imageTitle: string;
  }>;
  onNewImagesChange?: (images: Array<{ imageUrl: string; imageTitle: string }>) => void;
  onExistingFilesChange?: (files: Array<{ licenseImageId: number; imageUrl: string; imageTitle: string }>) => void;
}

const CertificateSection: React.FC<CertificateSectionProps> = ({ certificates, onCertificatesChange, existingFiles = [], onNewImagesChange, onExistingFilesChange }) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 이미지 업로드 뮤테이션
  const imageUploadMutation = useImageUploadMutation({
    onSuccess: (data) => {
      if (data.result && data.result.length > 0) {
        const newUrls = [...uploadedFileUrls, ...data.result];
        setUploadedFileUrls(newUrls);
        
        // 부모 컴포넌트에 새로운 이미지 정보 전달
        if (onNewImagesChange) {
          const newImages = data.result.map((url, index) => ({
            imageUrl: url,
            imageTitle: uploadedFiles[uploadedFileUrls.length + index]?.name || `자격증 파일 ${uploadedFileUrls.length + index + 1}`
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

  const handleAddCertificateRow = () => {
    onCertificatesChange([
      ...certificates,
      {
        certificateName: '',
        issueDate: '',
        issuingOrganization: '',
      },
    ]);
  };

  const handleCertificateChange = (index: number, field: keyof CertificateFormItem, value: string) => {
    const newCertificates = [...certificates];
    newCertificates[index] = {
      ...newCertificates[index],
      [field]: value,
    };
    onCertificatesChange(newCertificates);
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
    const validFiles = files.filter(file => 
      file.type === 'image/png' || 
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.type === 'application/pdf'
    );
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      // 이미지 업로드 API 호출
      setIsUploading(true);
      imageUploadMutation.mutate(validFiles);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => 
      file.type === 'image/png' || 
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.type === 'application/pdf'
    );
    
    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles]);
      // 이미지 업로드 API 호출
      setIsUploading(true);
      imageUploadMutation.mutate(validFiles);
    }
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setUploadedFileUrls(prev => prev.filter((_, i) => i !== index));
    
    // 부모 컴포넌트에 업데이트된 이미지 정보 전달
    if (onNewImagesChange) {
      const remainingUrls = uploadedFileUrls.filter((_, i) => i !== index);
      const remainingFiles = uploadedFiles.filter((_, i) => i !== index);
      const updatedImages = remainingUrls.map((url, urlIndex) => ({
        imageUrl: url,
        imageTitle: remainingFiles[urlIndex]?.name || `자격증 파일 ${urlIndex + 1}`
      }));
      onNewImagesChange(updatedImages);
    }
  };

  const handleExistingFileRemove = (index: number) => {
    const updatedExistingFiles = existingFiles.filter((_, i) => i !== index);
    if (onExistingFilesChange) {
      onExistingFilesChange(updatedExistingFiles);
    }
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-5 xl:space-y-[1.2rem] w-full xl:w-[48.8rem]">
      <div className="flex items-center gap-4 xl:gap-[0.9rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
        <span className="text-base xl:text-[1.05rem] font-medium text-[#121218] font-pretendard">자격증</span>
      </div>
      
      {/* 파일 업로드 영역 */}
      <div 
        className={`w-full xl:w-[48.8rem] h-auto min-h-[5.9rem] xl:h-[5.9rem] border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center transition-colors p-3 xl:p-3 ${
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
            {isUploading 
              ? '파일 업로드 중...' 
              : isDragOver 
                ? '파일을 여기에 놓으세요' 
                : '여기에 파일을 마우스로 끌어오세요.'
            }
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileSelect}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* 기존 업로드된 파일들 */}
      {existingFiles.length > 0 && (
        <div className="space-y-2 xl:space-y-[0.6rem]">
          {existingFiles.map((file, index) => (
            <div key={file.licenseImageId} className="flex justify-center">
              <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#F0F4FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]">
                <div className="flex items-center gap-4 xl:gap-[0.9rem]">
                  <img src={fileboxIcon} alt="기존 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
                  <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
                    {file.imageTitle || `자격증 파일 ${index + 1}`}
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
                  <button
                    onClick={() => handleExistingFileRemove(index)}
                    className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 새로 업로드된 파일들 */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2 xl:space-y-[0.6rem]">
          <div className="text-center text-sm xl:text-sm font-medium text-[#121218] mb-2 xl:mb-[0.5rem]">
            새로 업로드된 파일
          </div>
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]">
                <div className="flex items-center gap-4 xl:gap-[0.9rem]">
                  <img src={fileboxIcon} alt="업로드된 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
                  <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
                    {file.name}
                  </span>
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
                  <button
                    onClick={() => handleFileRemove(index)}
                    className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 이미지 파일 업로드 안내 박스 */}
      <div className="flex justify-center">
        <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center gap-4 xl:gap-[0.9rem]">
          <img src={fileboxIcon} alt="업로드된 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
          <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
            이미지 파일 업로드(png,jpg,pdf)
          </span>
        </div>
      </div>

      {/* 자격증 테이블 */}
      <div className="border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] overflow-hidden mb-2 xl:mb-[0.6rem] overflow-x-auto">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white border-b border-[#DBE6FF] min-w-[30rem] xl:min-w-0">
          <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
            자격증명
          </div>
          <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
            자격증 발급일
          </div>
          <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] flex items-center justify-center">
            자격증 내용
          </div>
        </div>

        {/* 테이블 데이터 */}
        {certificates.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white min-w-[30rem] xl:min-w-0${idx !== certificates.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
          >
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              <input
                type="text"
                value={row.certificateName}
                onChange={(e) => handleCertificateChange(idx, 'certificateName', e.target.value)}
                className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="자격증명 입력"
              />
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] flex items-center justify-center gap-2 xl:gap-[0.375rem] border-r border-[#DBE6FF] text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]">
              <input
                type="text"
                value={row.issueDate}
                onChange={(e) => handleCertificateChange(idx, 'issueDate', e.target.value)}
                className="w-[6.8rem] xl:w-[6.8rem] text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="발급일"
              />
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] flex items-center justify-center">
              <input
                type="text"
                value={row.issuingOrganization}
                onChange={(e) => handleCertificateChange(idx, 'issuingOrganization', e.target.value)}
                className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="발급기관 입력"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 자격증 추가 버튼 */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAddCertificateRow}
          className="w-[15.5rem] xl:w-[15.5rem] h-8 xl:h-[1.9rem] border border-[#DBE6FF] rounded-[1.9rem] xl:rounded-[1.9rem] flex items-center justify-center"
        >
          <svg width="13.76" height="13.76" viewBox="0 0 14 14" fill="none">
            <path d="M7 0V14" stroke="#75787B" strokeWidth="1.8"/>
            <path d="M0 7H14" stroke="#75787B" strokeWidth="1.8"/>
          </svg>
        </button>
      </div>

    </div>
  );
};

export default CertificateSection; 