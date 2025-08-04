import React from "react";
import ActionButton from "../Common/ActionButton";

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
      <div className="w-full pt-[44px] pl-[39px] lg:pt-[44px] lg:pl-[39px] md:pt-8 md:pl-6 sm:pt-6 sm:pl-4">
        {/* 제목 */}
        <div className="text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm">
          등록된 전문가의 조언!
        </div>
        
        {/* 카드와 버튼 컨테이너 */}
        <div className="mt-[17px] flex justify-between items-end lg:mt-[17px] lg:flex-row lg:justify-between lg:items-end md:mt-4 md:flex-col md:justify-start md:items-start md:gap-4 sm:mt-3 sm:flex-col sm:justify-start sm:items-start sm:gap-3">
          {/* 전문가 조언 카드 */}
          <div
            className="w-[780px] h-[76px] flex items-center px-8 py-2.5 border-t border-b border-[#82ABFD] lg:w-[780px] lg:h-[76px] lg:px-8 lg:py-2.5 md:w-full md:h-auto md:px-6 md:py-4 sm:w-full sm:h-auto sm:px-4 sm:py-3"
          >
            <p className="text-lg font-medium leading-[2] tracking-[-0.54px] text-[#121218] lg:text-lg md:text-base sm:text-sm">
              {adviceText}
            </p>
          </div>
          
          {/* 매칭된 전문가 보기 버튼 */}
          <div className="lg:block md:hidden sm:hidden">
            <ActionButton 
              text="매칭된 전문가 보기" 
              onClick={handleExpertClick} 
            />
          </div>
        </div>
      </div>
    );
  };
  
  export default ExpertAdvice;