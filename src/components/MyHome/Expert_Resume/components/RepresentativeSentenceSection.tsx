import React from 'react';

interface RepresentativeSentenceSectionProps {
  representativeSentence: string;
  onRepresentativeSentenceChange: (value: string) => void;
}

const RepresentativeSentenceSection: React.FC<RepresentativeSentenceSectionProps> = ({ 
  representativeSentence, 
  onRepresentativeSentenceChange 
}) => {
  return (
    <div className="space-y-[14px]">
      <div className="flex items-center gap-[14px]">
        <div className="w-[11px] h-[11px] bg-[#1D68FF] rounded-[3px]"></div>
        <span className="text-[17px] font-medium text-[#121218]">나를 소개하는 대표 문장 한줄</span>
      </div>
      <div className="border border-[#DBE6FF] rounded-[8px] p-[14px] h-[63.6px] flex">
        <textarea
          value={representativeSentence}
          onChange={(e) => onRepresentativeSentenceChange(e.target.value)}
          className="flex-1 resize-none border-none outline-none text-[14px] font-light text-[#75787B]"
          placeholder="ex) 매일 1%의 건강을 쌓아가요."
        />
      </div>
    </div>
  );
};

export default RepresentativeSentenceSection; 