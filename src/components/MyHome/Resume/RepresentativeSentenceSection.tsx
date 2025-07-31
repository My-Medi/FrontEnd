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
    <div className="space-y-4 xl:space-y-[0.875rem]">
      <div className="flex items-center gap-4 xl:gap-[0.875rem]">
        <div className="w-3 h-3 xl:w-[0.7rem] xl:h-[0.7rem] bg-[#1D68FF] rounded-[0.2rem] xl:rounded-[0.2rem]"></div>
        <span className="text-base xl:text-[1.1rem] font-medium text-[#121218]">나를 소개하는 대표 문장 한줄</span>
      </div>
      <div className="border border-[#DBE6FF] rounded-lg xl:rounded-lg p-4 xl:p-[0.875rem] h-16 xl:h-[4rem] flex">
        <textarea
          value={representativeSentence}
          onChange={(e) => onRepresentativeSentenceChange(e.target.value)}
          className="flex-1 resize-none border-none outline-none text-sm xl:text-sm font-light text-[#121218]"
          placeholder="ex) 매일 1%의 건강을 쌓아가요."
        />
      </div>
    </div>
  );
};

export default RepresentativeSentenceSection; 