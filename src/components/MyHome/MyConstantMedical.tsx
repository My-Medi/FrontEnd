import React from "react";
import ActionButton from "./Common/ActionButton";
import { healthStatusMap, type HealthStatus } from "../../constants/healthStatus";

interface Props {
  status: HealthStatus;
  nickname: string;
}

const MyConstantMedical: React.FC<Props> = ({ status, nickname }) => {
  const current = healthStatusMap[status];

  return (
    <div className="w-full pt-[25px] pl-[39px] lg:pt-[25px] lg:pl-[39px] md:pt-6 md:pl-6 sm:pt-4 sm:pl-4">
      {/* 제목 */}
      <div className="text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm">
        내 건강은 지금!
      </div>
      
      {/* 건강상태 카드와 버튼 컨테이너 */}
      <div className="mt-4 lg:mt-4 md:mt-3 sm:mt-2">
        {/* 건강상태 카드 */}
        <div 
          className="w-[780px] h-[76px] flex items-center gap-6 px-8 py-2.5 lg:w-[780px] lg:h-[76px] lg:gap-6 lg:px-8 lg:py-2.5 md:w-full md:h-auto md:gap-4 md:px-6 md:py-4 sm:w-full sm:h-auto sm:gap-3 sm:px-4 sm:py-3"
          style={{
            backgroundColor: current.bgColor,
            borderTop: `1px solid ${current.borderColor}`,
            borderBottom: `1px solid ${current.borderColor}`,
          }}
        >
          {/* 아이콘 영역 */}
          <img
            src={current.iconPath}
            alt={`${status} 아이콘`}
            className="w-[58px] h-[49px] lg:w-[58px] lg:h-[49px] md:w-12 md:h-10 sm:w-10 sm:h-8"
          />
          
          {/* 설명 텍스트 */}
          <div 
            className="text-lg font-medium leading-[2] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm"
            style={{ color: current.textColor }}
          >
            {current.message(nickname)}
          </div>
        </div>
        
        {/* 링크 버튼 */}
        <div className="-mt-5 lg:-mt-5 md:-mt-4 sm:-mt-3 lg:block md:hidden sm:hidden">
          <ActionButton 
            text="마이 메디컬 리포트로 알아보기" 
            onClick={() => {}} 
          />
        </div>
      </div>
    </div>
  );
};

export default MyConstantMedical;