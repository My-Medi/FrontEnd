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
    <div className="space-y-[14px]">
      <div className="flex items-center gap-[14px]">
        <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded-[3px]"></div>
        <span className="text-[17px] font-medium text-[#121218] font-pretendard">자기소개</span>
      </div>
      <div className="border border-[#DBE6FF] rounded-[8px] p-[14px] h-[161px] flex">
        <textarea
          ref={textareaRef}
          value={selfIntroduction}
          onChange={(e) => onSelfIntroductionChange(e.target.value)}
          className="flex-1 resize-none border-none outline-none text-[14px] font-light font-pretendard text-[#121218] h-full overflow-y-auto"
          placeholder="자기소개를 입력하세요."
        />
      </div>
    </div>
  );
};

export default SelfIntroductionSection; 