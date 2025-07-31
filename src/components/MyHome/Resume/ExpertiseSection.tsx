import React from 'react';

interface ExpertiseSectionProps {
  selectedFields: string[];
  onFieldToggle: (field: string) => void;
}

const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ selectedFields, onFieldToggle }) => {
  const fields = ['영양사', '건강관리사', '웰니스 코치', '운동처방사', '기타'];

  const handleFieldToggle = (field: string) => {
    // 중복 체크 방지: 항상 단일 선택만 가능
    onFieldToggle(field);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-0">
      <div className="flex items-center gap-4 xl:gap-[0.9rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
        <span className="text-base xl:text-[1.05rem] font-medium text-[#121218] font-pretendard">전문분야</span>
      </div>
      
      {/* 점선 구분선 */}
      <div className="hidden xl:block w-0 h-[3.3rem] border border-dashed border-[#DBE6FF] mx-5 xl:mx-[5.2rem] xl:mr-[2.4rem]"></div>
      
      <div className="flex flex-wrap xl:flex-nowrap items-center gap-4 xl:gap-[1.2rem] flex-shrink-0">
        {fields.map((field) => (
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
  );
};

export default ExpertiseSection; 