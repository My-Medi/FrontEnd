import React from "react";
import expertBg from "../../assets/Expert/ExpertBackground.svg";

const ExpertIntroSection = () => (
  <div
    className="w-full h-[220px] flex flex-col items-center justify-center relative overflow-hidden"
    style={{
      backgroundImage: `url(${expertBg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      backgroundPosition: "center",
    }}
  >
    {/* 흐린 효과(오버레이) 제거 */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <div className="text-2xl sm:text-3xl font-semibold text-[#121218] mb-2 text-center">
        마이메디의 전문가
      </div>
      <div className="text-lg sm:text-xl font-normal text-[#4D5053] text-center">
        나에게 맞는 맞춤 전문가를 만나보세요!
      </div>
    </div>
  </div>
);

export default ExpertIntroSection;