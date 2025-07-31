import React from "react";
import expertBg from '../../../assets/Expert/ExpertBackground.svg';

const ExpertIntroSection = () => (
  <div className="relative w-full h-[7.5rem] sm:h-[8.8rem] xl:h-[10rem] flex flex-col items-center justify-center overflow-hidden">
    {/* 배경 이미지 */}
    <div 
      className="absolute inset-0 w-full"
      style={{
        backgroundImage: `url(${expertBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        zIndex: 1,
      }}
    />
    
    {/* 콘텐츠 */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <div className="max-w-md mx-auto text-center space-y-1 px-4">
        <div className="font-semibold text-2xl xl:text-[1.8rem] leading-tight sm:leading-10 tracking-tight text-[#121218]">
          마이메디의 전문가
        </div>
        <div
          className="font-normal text-base sm:text-lg leading-relaxed sm:leading-9 tracking-normal text-gray-700 text-center"
        >
          나에게 맞는 맞춤 전문가를 만나보세요!
        </div>
      </div>
    </div>
  </div>
);

export default ExpertIntroSection;