import React from "react";
import ActionButton from "./Common/ActionButton";

interface Props {
    adviceText: string;
    onMenuSelect?: (menuIndex: number) => void;
  }
  
  const ExpertAdvice: React.FC<Props> = ({ adviceText, onMenuSelect }) => {
    const handleExpertClick = () => {
      if (onMenuSelect) {
        onMenuSelect(2); // 매칭된 전문가 메뉴 (인덱스 2)
      }
    };

    return (
      <div className="w-full pt-[44px] pl-[39px]">
        {/* 제목 */}
        <div className="text-[#121212] text-[18px] font-[600] leading-[1.5] tracking-[-0.54px]">
          등록된 전문가의 조언!
        </div>
        
        {/* 카드와 버튼 컨테이너 */}
        <div className="mt-[17px] flex justify-between items-end">
          {/* 전문가 조언 카드 */}
          <div
            className="w-[780px] h-[76px] flex items-center px-8 py-2.5 border-t border-b border-[#82ABFD]"
          >
            <p className="text-[18px] font-medium leading-[2] tracking-[-0.54px] text-[#121218]">
              {adviceText}
            </p>
          </div>
          
          {/* 매칭된 전문가 보기 버튼 */}
          <ActionButton 
            text="매칭된 전문가 보기" 
            onClick={handleExpertClick} 
          />
        </div>
      </div>
    );
  };
  
  export default ExpertAdvice;