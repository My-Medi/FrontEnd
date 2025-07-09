import React from "react";

const Stepper: React.FC = () => (
  <div className="flex flex-col items-center w-full mb-15 select-none">
    <div className="flex items-center w-full justify-center relative">
      {/* 1단계 */}
      <div className="flex flex-col items-center z-10">
        <div className="w-12 h-12 rounded-full bg-[#1D68FF] text-white flex items-center justify-center text-xl font-bold shadow-[0_0_16px_0_rgba(29,104,255,0.25)]">
          1
        </div>
        <span className="mt-2 text-lg font-semibold text-black">약관동의</span>
      </div>
      {/* 1→2 실선 */}
      <div className="h-1 w-35 bg-[#1D68FF] -ml-2 -mr-7 mb-[38px] z-0" />
      {/* 2단계 */}
      <div className="flex flex-col items-center z-10">
        <div className="w-12 h-12 rounded-full bg-[#1D68FF] text-white flex items-center justify-center text-xl font-bold shadow-[0_0_16px_0_rgba(29,104,255,0.25)]">
          2
        </div>
        <span className="mt-2 text-lg font-semibold text-black">회원정보입력</span>
      </div>
      {/* 2→3 점선 */}
      <div className="h-1 w-35 border-b-3 border-dashed border-[#B5D0FF] -ml-7 -mr-2 mb-[38px] z-0" />
      {/* 3단계 */}
      <div className="flex flex-col items-center z-10">
        <div className="w-12 h-12 rounded-full border-2 border-[#B5D0FF] text-[#888] flex items-center justify-center text-xl font-bold bg-white">
          3
        </div>
        <span className="mt-2 text-lg font-semibold text-[#888]">가입완료</span>
      </div>
    </div>
  </div>
);

export default Stepper; 