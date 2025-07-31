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
    <div className="w-full pt-[25px] pl-[39px]">
      {/* 제목 */}
      <div className="text-[#121212] text-[18px] font-[600] leading-[1.5] tracking-[-0.54px]">
        내 건강은 지금!
      </div>
      
      {/* 건강상태 카드와 버튼 컨테이너 */}
      <div className="mt-4">
        {/* 건강상태 카드 */}
        <div 
          className="w-[780px] h-[76px] flex items-center gap-6 px-8 py-2.5"
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
            className="w-[58px] h-[49px]"
          />
          
          {/* 설명 텍스트 */}
          <div 
            className="text-[18px] font-[500] leading-[2] tracking-[-0.54px]"
            style={{ color: current.textColor }}
          >
            {current.message(nickname)}
          </div>
        </div>
        
        {/* 링크 버튼 */}
        <div className="-mt-5">
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