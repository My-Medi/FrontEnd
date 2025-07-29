import React from 'react';

interface CompanySectionProps {
  companyName: string;
  onCompanyNameChange: (value: string) => void;
}

const CompanySection: React.FC<CompanySectionProps> = ({ companyName, onCompanyNameChange }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center gap-[14px]">
        <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded-[3px]"></div>
        <span className="text-[17px] font-medium text-[#121218]">소속 회사/기관명</span>
      </div>
      
      {/* 점선 구분선 */}
      <div className="w-[52.2px] h-[0px] border border-dashed border-[#DBE6FF] transform rotate-90 ml-[5px]"></div>
      
      <div className="flex items-center gap-[24px]">
        <input
          type="text"
          value={companyName}
          onChange={(e) => onCompanyNameChange(e.target.value)}
          placeholder="소속 회사/ 기관명을 입력하세요."
          className="w-[375px] h-[36px] px-[13px] border border-[#9DA0A3] rounded-[8px] text-[14px] font-medium placeholder-[#9DA0A3]"
        />
      </div>
    </div>
  );
};

export default CompanySection; 