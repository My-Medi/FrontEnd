import React from "react";
import ActionButton from "../Common/ActionButton";
import { healthStatusMap, type HealthStatus } from "../../../constants/healthStatus";
import { useUserProfileQuery } from "../../../hooks/users/queries/useUserProfileQuery";

interface Props {
  status: HealthStatus;
}

const MyConstantMedical: React.FC<Props> = ({ status }) => {
  // API에서 사용자 프로필 데이터 가져오기
  const { data: profileData } = useUserProfileQuery();
  const nickname = profileData?.nickname || '사용자';
  const current = healthStatusMap[status];

  return (
    <div className="w-full pt-6 pl-10 xl:pt-6 xl:pl-10 md:pt-6 md:pl-6 sm:pt-4 sm:pl-4">
      {/* 제목 */}
      <div className="text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
        내 건강은 지금!
      </div>
      
      {/* 건강상태 카드와 버튼 컨테이너 */}
      <div className="mt-4 xl:mt-4 md:mt-3 sm:mt-2">
        {/* 건강상태 카드 */}
        <div 
          className="w-full max-w-[48.75rem] h-auto min-h-[4.75rem] flex items-center gap-6 px-8 py-2.5 xl:max-w-[48.75rem] xl:h-[4.75rem] xl:gap-6 xl:px-8 xl:py-2.5 md:gap-4 md:px-6 md:py-4 sm:gap-3 sm:px-4 sm:py-3"
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
            className="w-12 h-10 xl:w-[3.6rem] xl:h-[3.1rem] md:w-12 md:h-10 sm:w-10 sm:h-8 flex-shrink-0"
          />
          
          {/* 설명 텍스트 */}
          <div 
            className="text-lg font-medium leading-[2] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm flex-1"
            style={{ color: current.textColor }}
          >
            {current.message(nickname)}
          </div>
        </div>
        
        {/* 링크 버튼 */}
        <div className="-mt-5 xl:-mt-5 md:-mt-4 sm:-mt-3 block lg:block md:hidden sm:hidden">
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