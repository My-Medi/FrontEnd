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
    <div className="flex items-center">
      <div className="flex items-center gap-[14.4px]">
        <div className="w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px]"></div>
        <span className="text-[16.8px] font-medium text-[#121218] font-pretendard">전문분야</span>
      </div>
      
      {/* 점선 구분선 */}
      <div className="w-[0px] h-[52.2px] border border-dashed border-[#DBE6FF] ml-[83px] mr-[37.8px]"></div>
      
      <div className="flex items-center gap-[19.2px] flex-shrink-0">
        {fields.map((field) => (
          <div key={field} className="flex items-center gap-[10.8px]">
            <button
              onClick={() => handleFieldToggle(field)}
              className={`w-[18px] h-[18px] rounded-[4.8px] border flex items-center justify-center ${
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
            <span className={`text-[16px] font-medium font-pretendard leading-[2.25] tracking-[-0.03em] ${
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