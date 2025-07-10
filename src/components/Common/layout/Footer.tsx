import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="w-7/8 bg-white mx-auto pb-[104px]">
      <div className="w-full">
        <div className="h-[0.2rem] bg-[#1D68FF]"></div>
      </div>

      <div className="w-full pl-0">
        <div className="py-6">
          <div className="flex flex-col md:flex-row md:gap-16 lg:gap-24 xl:gap-32 space-y-8 md:space-y-0 max-w-md md:max-w-none">
            <div className="space-y-4">
              <h3 className="font-pretendard font-semibold text-[#121218] text-xl sm:text-2xl leading-[1.5em]">
                ABOUT US
              </h3>
              <nav className="space-y-4">
                <a
                  href="#"
                  className="block text-[#121218] text-lg sm:text-[1.375rem] font-normal leading-[1.636em] hover:text-[#1D68FF] transition-colors duration-200"
                >
                  MYMEDi 소개
                </a>
                <a
                  href="#"
                  className="block text-[#121218] text-lg sm:text-[1.375rem] font-normal leading-[1.636em] hover:text-[#1D68FF] transition-colors duration-200"
                >
                  마이 홈
                </a>
              </nav>
            </div>

            <div className="space-y-4">
              <h3 className="font-pretendard font-semibold text-[#121218] text-xl sm:text-2xl leading-[1.5em]">
                MY ACCOUNT
              </h3>
              <nav className="space-y-4">
                <a
                  href="#"
                  className="block text-[#121218] text-lg sm:text-[1.375rem] font-normal leading-[1.636em] hover:text-[#1D68FF] transition-colors duration-200"
                >
                  회원정보수정
                </a>
              </nav>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="h-px bg-[#C5C8CB]"></div>
        </div>
        <div className="w-full pl-0 pt-8">
          <div className="w-full pl-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <a
                href="#"
                className="text-[#121218] font-semibold text-lg sm:text-2xl leading-[1.5em] hover:text-[#1D68FF] transition-colors duration-200"
              >
                개인정보처리방침
              </a>
              <span className="text-[#9DA0A3] text-lg sm:text-[1.375rem] hidden sm:inline">
                |
              </span>
              <a
                href="#"
                className="text-[#121218] font-medium text-lg sm:text-2xl leading-[1.19em] tracking-[-0.03em] hover:text-[#1D68FF] transition-colors duration-200"
              >
                이용약관
              </a>
            </div>
          </div>
          <div className="w-full pl-0">
            <div className="text-[#121218] text-sm sm:text-base md:text-[1.25rem] font-normal leading-[1.8em] space-y-1 text-left pt-4">
              <p className="break-words">
                <span className="inline-block">회사명 : My Medi 마이메디</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">대표자 : 신윤서</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">
                  주소: 서울특별시 영등포구 여의도동
                </span>
              </p>
              <p className="break-words">
                <span className="inline-block">전화: 02 –1234 –567</span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">
                  사업자 등록번호 : 123-45-67890
                </span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">
                  개인정보 보호책임자 : 신윤서
                </span>
                <span className="hidden sm:inline mx-2">|</span>
                <span className="block sm:inline">
                  copyright ©My Medi All Rights Reserved
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
