import React from 'react';
import FileUploadSection from '../../Common/FileUploadSection';
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
  // 업로드된 새 파일 목록/URL은 공용 업로드 컴포넌트에서 관리합니다.

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

  // no-op: FileUploadSection에서 자체 관리

  return (
    <div className="space-y-5 xl:space-y-[1.2rem] w-full xl:w-[48.8rem]">
      <div className="flex items-center gap-4 xl:gap-[0.9rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
        <span className="text-base xl:text-[1.05rem] font-medium text-[#121218] font-pretendard">자격증</span>
      </div>
      
      <FileUploadSection
        existingFiles={existingFiles}
        onExistingFilesChange={onExistingFilesChange}
        onNewImagesChange={onNewImagesChange}
        accept=".png,.jpg,.jpeg,.pdf"
      />

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