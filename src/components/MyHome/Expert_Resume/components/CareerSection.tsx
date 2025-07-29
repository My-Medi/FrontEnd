import React, { useState } from 'react';

const CareerSection: React.FC = () => {
  // 경력 row 데이터 상태로 관리
  const [careerRows, setCareerRows] = useState([
    {
      company: '대한영양사협회',
      start: '2022.05.24',
      end: '2025.05.12',
      role: '식단 계획 및 조리',
    },
    {
      company: '대한영양사협회',
      start: '2022.05.24',
      end: '2025.05.12',
      role: '식단 계획 및 조리',
    },
  ]);

  const handleAddCareerRow = () => {
    setCareerRows(prev => [
      ...prev,
      {
        company: '',
        start: '',
        end: '',
        role: '',
      },
    ]);
  };

  return (
    <div className="w-full">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-[14.4px] mb-[14.4px]">
        <div className="w-[11.4px] h-[11.4px] bg-[#1D68FF] rounded-[3.6px]"></div>
        <h3 className="text-[16.8px] font-medium text-[#121218]">경력사항</h3>
      </div>

      {/* 경력사항 테이블 */}
      <div className="w-full border border-[#DBE6FF] rounded-[8.4px] overflow-hidden">
        {/* 테이블 헤더 */}
        <div className="flex bg-white border-b border-[#DBE6FF]">
          <div className="flex-1 flex justify-center items-center py-[6px] px-[12px] border-r border-[#DBE6FF]">
            <span className="text-[14px] font-medium text-[#121218]">회사/기관명</span>
          </div>
          <div className="flex-1 flex justify-center items-center py-[6px] px-[12px] border-r border-[#DBE6FF]">
            <span className="text-[14px] font-medium text-[#121218]">근무기간</span>
          </div>
          <div className="flex-1 flex justify-center items-center py-[6px] px-[12px]">
            <span className="text-[14px] font-medium text-[#121218]">역할입력</span>
          </div>
        </div>

        {/* 테이블 데이터 행 */}
        {careerRows.map((row, idx) => (
          <div key={idx} className={`flex bg-white${idx !== careerRows.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}>
            <div className="flex-1 flex justify-center items-center py-[6px] px-[12px] border-r border-[#DBE6FF]">
              <span className="text-[14px] font-light text-[#121218]">{row.company}</span>
            </div>
            <div className="flex-1 flex justify-center items-center py-[6px] px-[12px] border-r border-[#DBE6FF]">
              <div className="flex items-center gap-[6px]">
                <span className="text-[14px] font-light text-[#121218]">{row.start}</span>
                <span className="text-[14px] font-light text-[#121218]">-</span>
                <span className="text-[14px] font-light text-[#121218]">{row.end}</span>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center py-[6px] px-[12px]">
              <span className="text-[14px] font-light text-[#121218]">{row.role}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 버튼 */}
      <div className="flex justify-center mt-[9.6px]">
        <button
          type="button"
          onClick={handleAddCareerRow}
          className="flex items-center justify-center gap-[6px] px-[6px] py-[6px] w-[247.8px] h-[30px] bg-white border border-[#DBE6FF] rounded-[30px]"
        >
          <div className="w-[13.96px] h-[13.96px] flex items-center justify-center relative">
            <div className="w-[11.96px] h-[0px] border-t-[2px] border-[#75787B]"></div>
            <div className="w-[0px] h-[11.96px] border-l-[2px] border-[#75787B] absolute"></div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CareerSection; 