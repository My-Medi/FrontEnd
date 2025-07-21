import React from "react";
import expertBg from "../../assets/Expert/ExpertBackground.svg";

const ExpertIntroSection = () => (
  <div
    className="w-full h-[120px] sm:h-[140px] lg:h-[160px] flex flex-col items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: `url(${expertBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    }}
  >
    {/* 흐린 효과(오버레이) 제거 */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <div className="max-w-md mx-auto text-center space-y-1 px-4">
        <div className="font-pretendard font-semibold text-2xl sm:text-3xl leading-tight sm:leading-10 tracking-tight text-[#121218]">
          마이메디의 전문가
        </div>
        <div
          className="font-pretendard font-normal text-base sm:text-lg leading-relaxed sm:leading-9 tracking-normal text-gray-700 text-center"
        >
          나에게 맞는 맞춤 전문가를 만나보세요!
        </div>
      </div>
    </div>
  </div>
);

export default ExpertIntroSection;