import React, { memo } from 'react';

const Footer: React.FC = memo(() => {
  return (
    <footer className="w-full bg-white pb-12">
      {/* 파란선: 패딩 없이 w-full, 아래 mb-8(32px) */}
      <div className="w-full">
        <div className="w-full h-[0.0625rem] bg-[#DBE6FF] mb-8" />
      </div>
      {/* 컨텐츠: max-w + 패딩 */}
      <div className="w-full px-4 sm:px-6 md:px-8">
        <div className="max-w-[1299px] mx-auto">
          {/* ABOUT US 등 컨텐츠: 파란선과 32px, 아래 구분선과 16px 간격 */}
          <div className="pt-0 pb-0 mb-4">
            <div className="flex flex-col md:flex-row md:gap-26 space-y-8 md:space-y-0">
              {/* ABOUT US */}
              <div className="space-y-2">
                <h3 className="font-semibold text-[#121218] text-[1.25rem] leading-[1.8em]">ABOUT US</h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-[#121218] text-[0.875rem] font-normal leading-[1.57em] tracking-[0.01em] hover:text-[#1D68FF] transition-colors duration-200">MYMEDi 소개</a>
                  <a href="#" className="block text-[#121218] text-[0.875rem] font-normal leading-[1.57em] tracking-[0.01em] hover:text-[#1D68FF] transition-colors duration-200">마이 홈</a>
                </nav>
              </div>
              {/* MY ACCOUNT */}
              <div className="space-y-2">
                <h3 className="font-semibold text-[#121218] text-[1.25rem] leading-[1.8em]">MY ACCOUNT</h3>
                <nav className="space-y-2">
                  <a href="#" className="block text-[#121218] text-[0.875rem] font-normal leading-[1.57em] tracking-[0.01em] hover:text-[#1D68FF] transition-colors duration-200">회원정보수정</a>
                </nav>
              </div>
            </div>
          </div>
          {/* 회색 구분선: 위 mb-4(16px) */}
          <div className="w-full">
            <div className="h-px bg-[#EDF0F3]" />
          </div>
          {/* 정책/회사정보 */}
          <div className="w-full pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4">
              <a href="#" className="text-[#121218] font-semibold text-[1rem] leading-[1.375em] tracking-[0.01em] hover:text-[#1D68FF] transition-colors duration-200">개인정보처리방침</a>
              <span className="text-[#C5C8CB] text-[1rem] font-light leading-[2.25em]">|</span>
              <a href="#" className="text-[#121218] font-semibold text-[1rem] leading-[2.25em] tracking-[0.01em] hover:text-[#1D68FF] transition-colors duration-200">이용약관</a>
            </div>
            <div className="text-[#121218] text-[0.75rem] font-light leading-[1.83em] space-y-2 text-left pt-4">
              <p className="break-words">
                <span className="inline-block">회사명 : My Medi 마이메디</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">대표자 : 신윤서</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">주소: 서울특별시 영등포구 여의도동</span>
              </p>
              <p className="break-words">
                <span className="inline-block">전화: 02 –1234 –567</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">사업자 등록번호 : 123-45-67890</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">개인정보 보호책임자 : 신윤서</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">copyright ©My Medi All Rights Reserved</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
