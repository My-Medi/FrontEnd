import React, { useState, useRef } from 'react';
import fileIcon from '@/assets/MyHome/Resume/file.svg';
import fileboxIcon from '@/assets/MyHome/Resume/filebox.svg';

const CertificateSection: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 자격증 row 데이터 상태로 관리
  const [certificateRows, setCertificateRows] = useState([
    {
      certificateName: '영양사 자격증',
      issueDate: '2022.05.24',
      issuingOrganization: '대한영양사협회',
    },
    {
      certificateName: '식품위생교육 이수증',
      issueDate: '2023.01.15',
      issuingOrganization: '식품의약품안전처',
    },
  ]);

  const handleAddCertificateRow = () => {
    setCertificateRows(prev => [
      ...prev,
      {
        certificateName: '',
        issueDate: '',
        issuingOrganization: '',
      },
    ]);
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
    }
  };

  const handleFileRemove = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-[19.2px] w-[780.6px]">
      <div className="flex items-center gap-[14.4px]">
        <div className="w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px]"></div>
        <span className="text-[16.8px] font-medium text-[#121218] font-pretendard">자격증</span>
      </div>
      
      {/* 파일 업로드 영역 */}
      <div 
        className={`w-[780.6px] h-[94.2px] border border-[#DBE6FF] rounded-[8.4px] flex items-center justify-center cursor-pointer transition-colors p-[12px] ${
          isDragOver ? 'bg-[#F0F4FF] border-[#1D68FF]' : 'bg-white'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadAreaClick}
      >
        <div className="flex items-center gap-[6px]">
          <img src={fileIcon} alt="파일 업로드" className="w-[14.4px] h-[18px]" />
          <p className="text-[14px] font-medium text-[#9DA0A3] font-pretendard leading-[1.714] tracking-[-0.03em] text-center">
            {isDragOver ? '파일을 여기에 놓으세요' : '여기에 파일을 마우스로 끌어오세요.'}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* 업로드된 파일들 */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-[9.6px]">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-[395.4px] h-[40.8px] bg-[#DBE6FF] rounded-[8.4px] flex items-center justify-between px-[14.4px]">
                <div className="flex items-center gap-[14.4px]">
                  <img src={fileboxIcon} alt="업로드된 파일" className="w-[34.8px] h-[25.75px]" />
                  <span className="text-[14px] font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
                    {file.name}
                  </span>
                </div>
                <button
                  onClick={() => handleFileRemove(index)}
                  className="text-[#9DA0A3] hover:text-[#1D68FF] transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 이미지 파일 업로드 안내 박스 */}
      <div className="flex justify-center">
        <div className="w-[395.4px] h-[40.8px] bg-[#DBE6FF] rounded-[8.4px] flex items-center justify-center gap-[14.4px]">
          <img src={fileboxIcon} alt="업로드된 파일" className="w-[34.8px] h-[25.75px]" />
          <span className="text-[14px] font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
            이미지 파일 업로드(png,jpg,pdf)
          </span>
        </div>
      </div>

      {/* 자격증 테이블 */}
      <div className="border border-[#DBE6FF] rounded-[8.4px] overflow-hidden mb-[9.6px]">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[246px_246px_246px] bg-white border-b border-[#DBE6FF]">
          <div className="px-[12px] py-[6px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] w-[246px] flex items-center justify-center">
            자격증명
          </div>
          <div className="px-[12px] py-[6px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] w-[246px] flex items-center justify-center">
            자격증 발급일
          </div>
          <div className="px-[12px] py-[6px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] w-[246px] flex items-center justify-center">
            자격증 내용
          </div>
        </div>

        {/* 테이블 데이터 */}
        {certificateRows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[246px_246px_246px] bg-white${idx !== certificateRows.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
          >
            <div className="px-[12px] py-[6px] text-center text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] w-[246px] flex items-center justify-center">
              <input
                type="text"
                value={row.certificateName}
                onChange={(e) => {
                  const newRows = [...certificateRows];
                  newRows[idx].certificateName = e.target.value;
                  setCertificateRows(newRows);
                }}
                className="w-full text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="자격증명 입력"
              />
            </div>
            <div className="px-[12px] py-[6px] text-center text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] w-[246px] flex items-center justify-center">
              <input
                type="text"
                value={row.issueDate}
                onChange={(e) => {
                  const newRows = [...certificateRows];
                  newRows[idx].issueDate = e.target.value;
                  setCertificateRows(newRows);
                }}
                className="w-full text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="발급일 입력"
              />
            </div>
            <div className="px-[12px] py-[6px] text-center text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] w-[246px] flex items-center justify-center">
              <input
                type="text"
                value={row.issuingOrganization}
                onChange={(e) => {
                  const newRows = [...certificateRows];
                  newRows[idx].issuingOrganization = e.target.value;
                  setCertificateRows(newRows);
                }}
                className="w-full text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
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
          className="w-[247.8px] h-[30px] border border-[#DBE6FF] rounded-[30px] flex items-center justify-center"
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