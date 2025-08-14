import React from 'react';
import type { CareerFormItem } from '../../../types/expert/resume';

interface CareerSectionProps {
  career: CareerFormItem[];
  onCareerChange: (career: CareerFormItem[]) => void;
}

const CareerSection: React.FC<CareerSectionProps> = ({ career, onCareerChange }) => {
  const handleAddCareerRow = () => {
    onCareerChange([
      ...career,
      {
        company: '',
        start: '',
        end: '',
        role: '',
      },
    ]);
  };

  const handleCareerChange = (index: number, field: keyof CareerFormItem, value: string) => {
    const newCareer = [...career];
    newCareer[index] = {
      ...newCareer[index],
      [field]: value,
    };
    onCareerChange(newCareer);
  };

  return (
    <div className="w-full">
      {/* 섹션 헤더 */}
      <div className="flex items-center gap-4 xl:gap-[0.9rem] mb-4 xl:mb-[0.9rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.225rem] xl:rounded-[0.225rem]"></div>
        <h3 className="text-base xl:text-[1.05rem] font-medium text-[#121218]">경력사항</h3>
      </div>

      {/* 경력사항 테이블 */}
      <div className="border border-[#DBE6FF] rounded-[0.525rem] xl:rounded-[0.525rem] overflow-hidden mb-2 xl:mb-[0.6rem] overflow-x-auto">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white border-b border-[#DBE6FF] min-w-[30rem] xl:min-w-0">
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
        {career.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[1fr_1fr_1fr] xl:grid-cols-[11.6rem_19.7rem_15.4rem] bg-white min-w-[30rem] xl:min-w-0${idx !== career.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
          >
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] flex items-center justify-center">
              <input
                type="text"
                value={row.company}
                onChange={(e) => handleCareerChange(idx, 'company', e.target.value)}
                className="w-full text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="회사명 입력"
              />
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] flex items-center justify-center gap-2 xl:gap-[0.375rem] border-r border-[#DBE6FF] text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]">
              <input
                type="text"
                value={row.start}
                onChange={(e) => handleCareerChange(idx, 'start', e.target.value)}
                className="w-[6.8rem] xl:w-[6.8rem] text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="시작일"
              />
              <div className="w-6 xl:w-[1.5rem] text-center">-</div>
              <input
                type="text"
                value={row.end}
                onChange={(e) => handleCareerChange(idx, 'end', e.target.value)}
                className="w-[6.8rem] xl:w-[6.8rem] text-center bg-transparent border-none outline-none text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="종료일"
              />
            </div>
            <div className="p-2 xl:p-[0.375rem_0.75rem] text-center text-sm xl:text-sm font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] flex items-center justify-center">
              <input
                type="text"
                value={row.role}
                onChange={(e) => handleCareerChange(idx, 'role', e.target.value)}
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
          onClick={handleAddCareerRow}
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

export default CareerSection; 