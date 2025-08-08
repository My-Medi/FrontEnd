import React from 'react';

interface ReportHeaderProps {
  currentTab: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ currentTab }) => {

  return (
    <div className="mt-[60px] px-16 max-w-[1427px] mx-auto">
      {/* 상단 구분선 */}
      {/* 파란선 사이의 마이메디컬리포트 */}
      <div className="max-w-[1301px] flex items-center justify-center mb-4">
            <div className="flex-1 h-[2px] bg-[#DBE6FF]"></div>
            <h1 className='px-4 text-[#25282B] text-[24px] font-semibold  text-center'>
          마이메디컬리포트
        </h1>
            <div className="flex-1 h-[2px] bg-[#DBE6FF]"></div>
          </div>
      
      <div className="max-w-[1214px] w-full mx-auto flex justify-between items-start">
        {/* 왼쪽 섹션 - 사용자 정보 및 네비게이션 */}
        <div className="flex-1">
          {/* 사용자 정보 */}
          <div className="mb-4">
            <div className="flex gap-6 font-[Pretendard] font-medium text-[18px] leading-[36px] tracking-[-3%]">
              <span className="text-[#1D68FF] font-medium">하나</span>
              <span className="text-[#121218]">만 23세</span>
              <span className="text-[#121218]">168cm/52kg</span>
              <div className="flex items-center">
                <span className="text-[#121218]">국가건강검진</span>
                <span aria-hidden className="h-[23px] border-l-2 border-[#DBE6FF] mx-2"></span>
                <span className="text-[#121218]">{currentTab}</span>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* 오른쪽 섹션 - 리포트 제목 및 건강 상태 범례 */}
        <div className="flex-1 text-right">
          
          
          {/* 건강 상태 설명 */}
          <p className="font-[Pretendard] font-light text-[16px] leading-[22px] tracking-[-3%] text-[#4D5053] mb-4">
            마이메디컬리포트에서는 건강 상태를 5단계의 색으로 표현합니다.
          </p>
          
          {/* 건강 상태 범례 - SVG */}
          <div className="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="241" height="40" viewBox="0 0 241 40" fill="none" className="w-full max-w-xs">
              <path d="M10.793 8L232.793 8.00002" stroke="url(#paint0_linear_2347_15078)" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
              <circle cx="8.79297" cy="8" r="8" fill="#ED5151"/>
              <circle cx="64.793" cy="8" r="8" fill="#FF732D"/>
              <circle cx="120.793" cy="8" r="8" fill="#FFCC00"/>
              <circle cx="176.793" cy="8" r="8" fill="#64DF48"/>
              <circle cx="232.793" cy="8" r="8" fill="#1D68FF"/>
              
              {/* 라벨들 */}
              <text x="8.79297" y="30" textAnchor="middle" className="text-[14px] font-normal fill-[#4D5053]">위험</text>
              <text x="64.793" y="30" textAnchor="middle" className="text-[14px] font-normal fill-[#4D5053]">주의</text>
              <text x="120.793" y="30" textAnchor="middle" className="text-[14px] font-normal fill-[#4D5053]">관심</text>
              <text x="176.793" y="30" textAnchor="middle" className="text-[14px] font-normal fill-[#4D5053]">정상</text>
              <text x="232.793" y="30" textAnchor="middle" className="text-[14px] font-normal fill-[#4D5053]">안심</text>
              
              <defs>
                <linearGradient id="paint0_linear_2347_15078" x1="10.793" y1="8.5" x2="232.793" y2="8.50002" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ED5151"/>
                  <stop offset="0.25" stopColor="#FF732D"/>
                  <stop offset="0.495192" stopColor="#FFCC00"/>
                  <stop offset="0.75" stopColor="#A1F68E"/>
                  <stop offset="1" stopColor="#1D68FF"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader; 