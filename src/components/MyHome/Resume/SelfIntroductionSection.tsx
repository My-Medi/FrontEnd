import React, { useRef, useEffect, useState } from 'react';

interface SelfIntroductionSectionProps {
  selfIntroduction: string;
  onSelfIntroductionChange: (value: string) => void;
}

const SelfIntroductionSection: React.FC<SelfIntroductionSectionProps> = ({ 
  selfIntroduction, 
  onSelfIntroductionChange 
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="space-y-4 xl:space-y-[0.875rem]">
      <div className="flex items-center gap-4 xl:gap-[0.875rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.2rem] xl:rounded-[0.2rem]"></div>
        <span className="text-base xl:text-[1.1rem] font-medium text-[#121218] font-pretendard">자기소개</span>
      </div>
      <div className="border border-[#DBE6FF] rounded-lg xl:rounded-lg p-4 xl:p-[0.875rem] h-40 xl:h-[10.1rem] flex">
        <textarea
          ref={textareaRef}
          value={selfIntroduction}
          onChange={(e) => onSelfIntroductionChange(e.target.value)}
          className="flex-1 resize-none border-none outline-none text-sm xl:text-sm font-light font-pretendard text-[#121218] h-full overflow-y-auto"
          placeholder="자기소개를 입력하세요."
        />
      </div>
    </div>
  );
};

export default SelfIntroductionSection; 