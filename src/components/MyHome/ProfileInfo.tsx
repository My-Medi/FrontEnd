import React from "react";
import defaultProfileImage from "../../assets/MyHome/profile.svg";
import ActionButton from "./Common/ActionButton";

interface PatientInfoProps {
  nickname: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  checkupCount: number;
  profileImageUrl?: string;
  onEditInfo?: () => void;
  userType?: 'patient' | 'expert';
}

const PatientInfoSection: React.FC<PatientInfoProps> = ({
  nickname,
  name,
  age,
  height,
  weight,
  checkupCount,
  profileImageUrl,
  onEditInfo,
  userType = 'patient',
}) => {
  return (
    <div className="w-full pt-[50px] pl-[39px] lg:pt-[50px] lg:pl-[39px] md:pt-8 md:pl-6 sm:pt-6 sm:pl-4">
      <div className="text-[#121212] text-[22px] font-medium leading-[1.19] tracking-[-0.66px] lg:text-[22px] md:text-xl sm:text-lg">
        {userType === 'expert' ? (
          <>안녕하세요! <span className="text-[#1D68FF]">{nickname}</span>전문가님! 오늘도 마이메디와 함께 행복한 하루 보내세요.</>
        ) : (
          <>안녕하세요! <span className="text-[#1D68FF]">{nickname}</span>님! 오늘도 마이메디와 함께 행복한 하루 보내세요.</>
        )}
      </div>
      
      <div className="pt-6 flex items-start gap-[24px] lg:pt-6 lg:gap-[24px] md:pt-4 md:gap-6 sm:pt-3 sm:gap-4 lg:flex-row md:flex-row sm:flex-col sm:items-center">
        <div className="w-32 h-32 bg-[#EDF0F3] rounded-full flex items-center justify-center lg:w-32 lg:h-32 md:w-24 md:h-24 sm:w-20 sm:h-20">
          <img
            src={profileImageUrl || defaultProfileImage}
            alt="프로필 이미지"
            className="w-[82px] h-[83px] object-contain lg:w-[82px] lg:h-[83px] md:w-16 md:h-16 sm:w-14 sm:h-14"
          />
        </div>
        
        <div className="lg:flex-1 md:flex-1 sm:w-full">
          <div className="flex items-center gap-[24px] pt-6 lg:gap-[24px] md:gap-4 sm:gap-2 lg:flex-row md:flex-row sm:flex-col sm:items-start sm:pt-3">
            <div className="text-lg leading-[36px] tracking-[-0.54px] font-normal lg:text-lg md:text-base sm:text-sm">
              <span className="text-[#1D68FF]">{nickname}</span>
              <span className="text-[#121218]"> / {name}</span>
            </div>
            <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm">
              만 {age}세
            </div>
            <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm">
              {height}cm / {weight}kg
            </div>
          </div>
          <div className="pt-2 text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] lg:text-lg md:text-base sm:text-sm">
            국가건강검진 <span className="text-[#DBE6FF]">| </span>{checkupCount}회
          </div>
        </div>
      </div>
      
      {onEditInfo && (
        <div className="lg:block md:block sm:hidden">
          <ActionButton 
            text="회원정보 수정하기" 
            onClick={onEditInfo} 
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfoSection; 