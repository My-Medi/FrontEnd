import React from 'react';

interface ReportHeaderProps {
  currentTab: string;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ currentTab }) => {

  return (
    <div className="bg-white mt-[60px] px-16">
      {/* 상단 구분선 */}
      {/* 파란선 사이의 마이메디컬리포트 */}
      <div className="flex items-center justify-center mb-4">
            <div className="flex-1 h-[2px] bg-[#DBE6FF]"></div>
            <h1 className='px-4 text-[#25282B] text-[24px] font-semibold  text-center'>
          마이메디컬리포트
        </h1>
            <div className="flex-1 h-[2px] bg-[#DBE6FF]"></div>
          </div>
      
      <div className="flex justify-between items-start">
        {/* 왼쪽 섹션 - 사용자 정보 및 네비게이션 */}
        <div className="flex-1">
          {/* 사용자 정보 */}
          <div className="mb-4">
            <div className="flex gap-6">
              <span className="text-blue-600 font-medium">하나</span>
              <span className="text-black">만 23세</span>
              <span className="text-black">168cm/52kg</span>
              <span className="text-black">국가건강검진</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="2" height="23" viewBox="0 0 2 23" fill="none">
                <path d="M1 0.75V22.25" stroke="#DBE6FF" stroke-width="2"/>
              </svg>
              <span className="text-black">{currentTab}</span>
            </div>
          </div>
          
        </div>
        
        {/* 오른쪽 섹션 - 리포트 제목 및 건강 상태 범례 */}
        <div className="flex-1 text-right">
          
          
          {/* 건강 상태 설명 */}
          <p className="text-[#4D5053] text-[14px] font-normal mb-4">
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