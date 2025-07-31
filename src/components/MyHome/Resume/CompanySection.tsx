import React from 'react';

interface CompanySectionProps {
  companyName: string;
  onCompanyNameChange: (value: string) => void;
}

const CompanySection: React.FC<CompanySectionProps> = ({ companyName, onCompanyNameChange }) => {
  return (
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
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="소속 회사/ 기관명을 입력하세요."
          className="w-full xl:w-[23.4rem] h-9 xl:h-[2.25rem] px-3 xl:px-[0.8rem] border border-[#9DA0A3] rounded-lg xl:rounded-lg text-sm xl:text-sm font-medium placeholder-[#9DA0A3]"
        />
      </div>
    </div>
  );
};

export default CompanySection; 