import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full bg-white">
      {/* 메인 텍스트 */}
      <div className="flex justify-center items-center px-4 py-[51px] w-full bg-white/70 border-t border-b border-[#1D68FF] lg:py-[51px] md:py-12 sm:py-8">
        <div className="text-center lg:px-4 md:px-6 sm:px-4">
          <p className="text-[24px] font-semibold text-[#25282B] leading-[180%] tracking-[3%] text-center capitalize lg:text-[24px] md:text-xl sm:text-lg lg:leading-[180%] md:leading-[160%] sm:leading-[150%]">
            의학용어가 가득한 건강검진표, 해석하기 어렵고 어디가 문제인지 혼란스러우셨나요?<br />
            MyMedi는 복잡한 건강검진 결과를 자동으로 분석하여 내 건강상태 분석부터 전문가 연결까지 한 번에!<br />
            의료 지식이 없어도 내 몸 상태를 명확히 이해할 수 있도록 MyMedi가 함께합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 