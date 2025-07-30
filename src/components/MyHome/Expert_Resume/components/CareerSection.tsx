import React, { useState, useEffect } from 'react';

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

  // 디버깅을 위한 useEffect 추가
  useEffect(() => {
    console.log('CareerSection 렌더링됨, careerRows:', careerRows);
  }, [careerRows]);

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
      <div className="border border-[#DBE6FF] rounded-[8.4px] overflow-hidden mb-[9.6px]">
        {/* 테이블 헤더 */}
        <div className="grid grid-cols-[184.8px_314.4px_246px] bg-white border-b border-[#DBE6FF]">
          <div className="p-[6px_12px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] w-[184.8px] flex items-center justify-center">
            회사/기관명
          </div>
          <div className="p-[6px_12px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] border-r border-[#DBE6FF] w-[314.4px] flex items-center justify-center">
            근무기간
          </div>
          <div className="p-[6px_12px] text-center text-[14px] font-medium text-[#121218] font-pretendard leading-[1.714] tracking-[-0.03em] w-[246px] flex items-center justify-center">
            역할입력
          </div>
        </div>

        {/* 테이블 데이터 */}
        {careerRows.map((row, idx) => (
          <div
            key={idx}
            className={`grid grid-cols-[184.8px_314.4px_246px] bg-white${idx !== careerRows.length - 1 ? ' border-b border-[#DBE6FF]' : ''}`}
          >
            <div className="p-[6px_12px] text-center text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] border-r border-[#DBE6FF] w-[184.8px] flex items-center justify-center">
              <input
                type="text"
                value={row.company}
                onChange={(e) => {
                  const newRows = [...careerRows];
                  newRows[idx].company = e.target.value;
                  setCareerRows(newRows);
                }}
                className="w-full text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="회사명 입력"
              />
            </div>
            <div className="p-[6px_12px] flex items-center justify-center gap-[6px] border-r border-[#DBE6FF] w-[314.4px] text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]">
              <input
                type="text"
                value={row.start}
                onChange={(e) => {
                  const newRows = [...careerRows];
                  newRows[idx].start = e.target.value;
                  setCareerRows(newRows);
                }}
                className="w-[108px] text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="시작일"
              />
              <div className="w-[24px] text-center">-</div>
              <input
                type="text"
                value={row.end}
                onChange={(e) => {
                  const newRows = [...careerRows];
                  newRows[idx].end = e.target.value;
                  setCareerRows(newRows);
                }}
                className="w-[108px] text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
                placeholder="종료일"
              />
            </div>
            <div className="p-[6px_12px] text-center text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em] w-[246px] flex items-center justify-center">
              <input
                type="text"
                value={row.role}
                onChange={(e) => {
                  const newRows = [...careerRows];
                  newRows[idx].role = e.target.value;
                  setCareerRows(newRows);
                }}
                className="w-full text-center bg-transparent border-none outline-none text-[14px] font-light text-[#121218] font-pretendard leading-[1.571] tracking-[-0.03em]"
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
          className="w-[247.8px] h-[30px] border border-[#DBE6FF] rounded-[30px] flex items-center justify-center p-[6px]"
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