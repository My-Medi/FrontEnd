import React, { useState, useRef } from "react";
import fileboxIcon from '../../assets/MyHome/Resume/filebox.svg';

interface ExpertInputFormProps {
  onNext: () => void;
  onPrev: () => void;
}

interface CareerRow {
  id: number;
  company: string;
  start: string;
  end: string;
  role: string;
}

interface CertificateRow {
  certificateName: string;
  issueDate: string;
  issuingOrganization: string;
}

const ExpertInputForm: React.FC<ExpertInputFormProps> = ({ onNext, onPrev }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(['영양사']);
  const [companyName, setCompanyName] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [representativeSentence, setRepresentativeSentence] = useState("");
  const [careerRows, setCareerRows] = useState<CareerRow[]>([
    {
      id: 1,
      company: "건강관리센터",
      start: "2020.01",
      end: "2023.12",
      role: "영양 상담"
    }
  ]);
  const [certificateRows, setCertificateRows] = useState<CertificateRow[]>([
    {
      certificateName: "영양사 자격증",
      issueDate: "2022.05.24",
      issuingOrganization: "대한영양사협회",
    }
  ]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFieldToggle = (field: string) => {
    // 중복 체크 방지: 항상 단일 선택만 가능
    setSelectedFields(prev => 
      prev.includes(field) 
        ? [] // 이미 선택된 필드라면 선택 해제
        : [field] // 새로운 필드 선택 시 기존 선택을 모두 해제하고 새로 선택
    );
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/') || file.type === 'application/pdf'
      );
      setUploadedFiles(prev => [...prev, ...newFiles]);
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
    handleFileUpload(e.dataTransfer.files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleCareerChange = (id: number, field: keyof CareerRow, value: string) => {
    setCareerRows(prev => 
      prev.map(row => 
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addCareerRow = () => {
    const newId = Math.max(...careerRows.map(row => row.id)) + 1;
    setCareerRows(prev => [...prev, {
      id: newId,
      company: "",
      start: "",
      end: "",
      role: ""
    }]);
  };

  // const removeCareerRow = (id: number) => {
  //   if (careerRows.length > 1) {
  //     setCareerRows(prev => prev.filter(row => row.id !== id));
  //   }
  // };

  const addCertificateRow = () => {
    setCertificateRows(prev => [
      ...prev,
      {
        certificateName: '',
        issueDate: '',
        issuingOrganization: '',
      },
    ]);
  };

  const handleCertificateChange = (index: number, field: keyof CertificateRow, value: string) => {
    const newRows = [...certificateRows];
    newRows[index][field] = value;
    setCertificateRows(newRows);
  };

  return (
    <div className="w-full bg-white flex flex-col items-center py-[30px]">
             {/* 전문분야 */}
       <div className="w-[716px] mb-8">
         <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-0">
           <div className="flex items-center gap-4 xl:gap-[0.9rem]">
             <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
             <span className="text-base xl:text-[1.05rem] font-medium text-[#121218] font-pretendard">전문분야</span>
           </div>
           
           {/* 점선 구분선 */}
           <div className="hidden xl:block w-0 h-[3.3rem] border border-dashed border-[#DBE6FF] mx-5 xl:mx-[5.5rem] xl:mr-[2.4rem]"></div>
           
           <div className="flex flex-wrap xl:flex-nowrap items-center gap-4 xl:gap-[1.2rem] flex-shrink-0">
          {["영양사", "건강관리사", "웰니스 코치", "운동처방사", "기타"].map((field) => (
            <div key={field} className="flex items-center gap-3 xl:gap-[0.7rem]">
              <button
                onClick={() => handleFieldToggle(field)}
                className={`w-[1.1rem] h-[1.1rem] xl:w-[1.1rem] xl:h-[1.1rem] rounded-[0.3rem] xl:rounded-[0.3rem] border flex items-center justify-center ${
                  selectedFields.includes(field)
                    ? 'bg-[#1D68FF] border-[#1D68FF]'
                    : 'bg-white border-[#9DA0A3]'
                }`}
              >
                {selectedFields.includes(field) && (
                  <svg width="8" height="5" viewBox="0 0 7.2 4.2" fill="none">
                    <path d="M1 2L3 4L6.2 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
              <span className={`text-sm xl:text-base font-medium font-pretendard leading-[2.25] tracking-[-0.03em] ${
                selectedFields.includes(field) ? 'text-[#121218]' : 'text-[#4D5053]'
              }`}>
                {field}
              </span>
            </div>
          ))}
        </div>
        </div>
        
        
      </div>

             {/* 소속 회사/기관명 */}
       <div className="w-[716px] mb-8">
         <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-0">
           <div className="flex items-center gap-4 xl:gap-[0.875rem]">
             <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.2rem] xl:rounded-[0.2rem]"></div>
             <span className="text-base xl:text-[1.1rem] font-medium text-[#121218]">소속 회사/기관명</span>
           </div>
           
           {/* 점선 구분선 */}
           <div className="hidden xl:block w-[3.3rem] h-0 border border-dashed border-[#DBE6FF] transform rotate-90 mx-5 xl:mx-[0.3rem]"></div>
           
           <div className="flex items-center gap-6 xl:gap-[1.5rem]">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="소속 회사/ 기관명을 입력하세요."
            className="w-full xl:w-[23.4rem] h-9 xl:h-[2.25rem] px-3 xl:px-[0.8rem] border border-[#9DA0A3] rounded-lg xl:rounded-lg text-sm xl:text-sm font-medium placeholder-[#9DA0A3]"
          />
        </div>
        </div>
        
      </div>

      {/* 자격증 업로드 */}
      <div className="w-[716px] mb-8">
        <div className="flex items-center gap-4 xl:gap-[0.9rem] mb-4 xl:mb-[0.9rem]">
          <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
          <span className="text-base xl:text-[1.05rem] font-medium text-[#121218] font-pretendard">자격증</span>
        </div>
        
        {/* 파일 업로드 영역 */}
        <div 
          className={`w-full h-auto min-h-[5.9rem] xl:h-[5.9rem] border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center cursor-pointer transition-colors p-3 xl:p-3 mb-4 ${
            isDragOver ? 'bg-[#F0F4FF] border-[#1D68FF]' : 'bg-white'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileInputClick}
        >
          <div className="flex items-center gap-2 xl:gap-[0.375rem]">
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 7.2V2.88L14.4 7.2M2 0.4C1.068 0.4 0 1.468 0 2.8V18C0 18.6364 0.252857 19.247 0.702944 19.6971C1.15303 20.1471 1.76364 20.4 2.4 20.4H13.6C14.2364 20.4 14.847 20.1471 15.2971 19.6971C15.7471 19.247 16 18.6364 16 18V6L10 0.4H2Z" fill="#9DA0A3"/>
            </svg>
            <p className="text-sm xl:text-sm font-medium text-[#9DA0A3] font-pretendard leading-[1.714] tracking-[-0.03em] text-center">
              {isDragOver ? '파일을 여기에 놓으세요' : '여기에 파일을 마우스로 끌어오세요.'}
            </p>
          </div>
        </div>
        
        {/* 업로드된 파일들 */}
        {uploadedFiles.length > 0 && (
          <div className="space-y-2 xl:space-y-[0.6rem] mb-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-between px-4 xl:px-[0.9rem]">
                  <div className="flex items-center gap-4 xl:gap-[0.9rem]">
                    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 4H24C26.2091 4 28 5.79086 28 8V16C28 18.2091 26.2091 20 24 20H8C5.79086 20 4 18.2091 4 16V8C4 5.79086 5.79086 4 8 4Z" fill="#9DA0A3"/>
                      <path d="M12 8H20M12 12H20M12 16H16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
                      {file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
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
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-[24.7rem] xl:w-[24.7rem] h-auto min-h-[2.6rem] xl:h-[2.6rem] bg-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] flex items-center justify-center gap-4 xl:gap-[0.9rem]">
            <img src={fileboxIcon} alt="업로드된 파일" className="w-8 h-6 xl:w-[2.2rem] xl:h-[1.6rem]" />
            <span className="text-sm xl:text-sm font-medium text-[#25282B] font-pretendard leading-[1.714] tracking-[-0.03em]">
              이미지 파일 업로드(png,jpg,pdf)
            </span>
          </div>
        </div>

        {/* 자격증 테이블 */}
        <div className="border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] overflow-hidden mb-2 xl:mb-[0.6rem]">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[15.4rem_15.4rem_15.4rem] bg-white border-b border-[#DBE6FF]">
            <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              자격증명
            </div>
            <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              자격증 발급일
            </div>
            <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] flex items-center justify-center">
              자격증 내용
            </div>
          </div>

          {/* 테이블 데이터 */}
          {certificateRows.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[15.4rem_15.4rem_15.4rem] bg-white${idx !== certificateRows.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
            >
              <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
                <input
                  type="text"
                  value={row.certificateName}
                  onChange={(e) => handleCertificateChange(idx, 'certificateName', e.target.value)}
                  className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="자격증명 입력"
                />
              </div>
              <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
                <input
                  type="text"
                  value={row.issueDate}
                  onChange={(e) => handleCertificateChange(idx, 'issueDate', e.target.value)}
                  className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="발급일 입력"
                />
              </div>
              <div className="px-3 xl:px-3 py-2 xl:py-[0.375rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] flex items-center justify-center">
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
            onClick={addCertificateRow}
            className="w-[15.5rem] xl:w-[15.5rem] h-8 xl:h-[1.9rem] border border-[#DBE6FF] rounded-[1.9rem] xl:rounded-[1.9rem] flex items-center justify-center"
          >
            <svg width="13.76" height="13.76" viewBox="0 0 14 14" fill="none">
              <path d="M7 0V14" stroke="#75787B" strokeWidth="1.8"/>
              <path d="M0 7H14" stroke="#75787B" strokeWidth="1.8"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 경력사항 */}
      <div className="w-[716px] mb-8">
        <div className="flex items-center gap-4 xl:gap-[0.9rem] mb-4 xl:mb-[0.9rem]">
          <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
          <h3 className="text-base xl:text-[1.05rem] font-medium text-[#121218]">경력사항</h3>
        </div>

        {/* 경력사항 테이블 */}
        <div className="border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] overflow-hidden mb-2 xl:mb-[0.6rem]">
          {/* 테이블 헤더 */}
          <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white border-b border-[#DBE6FF]">
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              회사/기관명
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              근무기간
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] flex items-center justify-center">
              역할입력
            </div>
          </div>

          {/* 테이블 데이터 */}
          {careerRows.map((row, idx) => (
            <div
              key={row.id}
              className={`grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white${idx !== careerRows.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
            >
              <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
                <input
                  type="text"
                  value={row.company}
                  onChange={(e) => handleCareerChange(row.id, 'company', e.target.value)}
                  className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="회사명 입력"
                />
              </div>
              <div className="p-2 xl:p-[0.375rem_0.75rem] flex items-center justify-center gap-2 xl:gap-[0.375rem] border-r border-[#DBE6FF] text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]">
                <input
                  type="text"
                  value={row.start}
                  onChange={(e) => handleCareerChange(row.id, 'start', e.target.value)}
                  className="w-[6.8rem] xl:w-[6.8rem] text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="시작일"
                />
                <div className="w-6 xl:w-[1.5rem] text-center">-</div>
                <input
                  type="text"
                  value={row.end}
                  onChange={(e) => handleCareerChange(row.id, 'end', e.target.value)}
                  className="w-[6.8rem] xl:w-[6.8rem] text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="종료일"
                />
              </div>
              <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] flex items-center justify-center">
                <input
                  type="text"
                  value={row.role}
                  onChange={(e) => handleCareerChange(row.id, 'role', e.target.value)}
                  className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                  placeholder="역할 입력"
                />
              </div>
            </div>
          ))}
        </div>

        {/* 경력 추가 버튼 */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addCareerRow}
            className="w-[15.5rem] xl:w-[15.5rem] h-8 xl:h-[1.9rem] border border-[#DBE6FF] rounded-[1.9rem] xl:rounded-[1.9rem] flex items-center justify-center p-2 xl:p-[0.375rem]"
          >
            <svg width="13.76" height="13.76" viewBox="0 0 14 14" fill="none">
              <path d="M7 0V14" stroke="#75787B" strokeWidth="1.8"/>
              <path d="M0 7H14" stroke="#75787B" strokeWidth="1.8"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 자기소개 */}
      <div className="w-[716px] mb-8">
        <div className="space-y-4 xl:space-y-[0.875rem]">
          <div className="flex items-center gap-4 xl:gap-[0.875rem]">
            <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.2rem] xl:rounded-[0.2rem]"></div>
            <span className="text-base xl:text-[1.1rem] font-medium text-[#121218] font-pretendard">자기소개</span>
          </div>
          <div className="border border-[#DBE6FF] rounded-lg xl:rounded-lg p-4 xl:p-[0.875rem] h-40 xl:h-[10.1rem] flex">
            <textarea
              value={selfIntroduction}
              onChange={(e) => setSelfIntroduction(e.target.value)}
              className="flex-1 resize-none border-none outline-none text-sm xl:text-sm font-light font-pretendard text-[#121218] h-full overflow-y-auto"
              placeholder="자기소개를 입력하세요."
            />
          </div>
        </div>
      </div>

      {/* 대표 문장 */}
      <div className="w-[716px] mb-12">
        <div className="space-y-4 xl:space-y-[0.875rem]">
          <div className="flex items-center gap-4 xl:gap-[0.875rem]">
            <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.2rem] xl:rounded-[0.2rem]"></div>
            <span className="text-base xl:text-[1.1rem] font-medium text-[#121218]">나를 소개하는 대표 문장 한줄</span>
          </div>
          <div className="border border-[#DBE6FF] rounded-lg xl:rounded-lg p-4 xl:p-[0.875rem] h-16 xl:h-[4rem] flex">
            <textarea
              value={representativeSentence}
              onChange={(e) => setRepresentativeSentence(e.target.value)}
              className="flex-1 resize-none border-none outline-none text-sm xl:text-sm font-light text-[#121218]"
              placeholder="ex) 매일 1%의 건강을 쌓아가요."
            />
          </div>
        </div>
      </div>

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.pdf"
        onChange={(e) => handleFileUpload(e.target.files)}
        className="hidden"
      />

      {/* 버튼 */}
      <div className="flex gap-[200px]">
        <button onClick={onPrev} className="px-10 py-3 ml-[20px] rounded-[30px] cursor-pointer bg-[#dbe6ff] text-[18px] text-[#121218] font-medium">이전</button>
        <button onClick={onNext} className="w-[216px] px-10 py-3 rounded-[30px] cursor-pointer bg-[#1d68ff] text-[18px] text-white font-semibold">완료</button>
      </div>
    </div>
  );
};

export default ExpertInputForm; 