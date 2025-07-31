import React from "react";
import defaultProfileImage from "../../../assets/MyHome/profile.svg";
import ActionButton from "../Common/ActionButton";

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
    <div className="w-full pt-12 pl-10 xl:pt-12 xl:pl-10 md:pt-8 md:pl-6 sm:pt-6 sm:pl-4">
      <div className="text-[#121212] text-xl font-medium leading-[1.19] tracking-[-0.66px] xl:text-xl md:text-lg sm:text-base">
        {userType === 'expert' ? (
          <>안녕하세요! <span className="text-[#1D68FF]">{nickname}</span>전문가님! 오늘도 마이메디와 함께 행복한 하루 보내세요.</>
        ) : (
          <>안녕하세요! <span className="text-[#1D68FF]">{nickname}</span>님! 오늘도 마이메디와 함께 행복한 하루 보내세요.</>
        )}
      </div>
      
      <div className="pt-6 flex items-start gap-6 xl:pt-6 xl:gap-6 md:pt-4 md:gap-6 sm:pt-3 sm:gap-4 xl:flex-row md:flex-row sm:flex-col sm:items-center">
        <div className="w-32 h-32 bg-[#EDF0F3] rounded-full flex items-center justify-center xl:w-32 xl:h-32 md:w-24 md:h-24 sm:w-20 sm:h-20">
          <img
            src={profileImageUrl || defaultProfileImage}
            alt="프로필 이미지"
            className="w-20 h-20 object-contain xl:w-20 xl:h-20 md:w-16 md:h-16 sm:w-14 sm:h-14"
          />
        </div>
        
        <div className="xl:flex-1 md:flex-1 sm:w-full">
          <div className="flex items-center gap-6 pt-6 xl:gap-6 md:gap-4 sm:gap-2 xl:flex-row md:flex-row sm:flex-col sm:items-start sm:pt-3">
            <div className="text-lg leading-[36px] tracking-[-0.54px] font-normal xl:text-lg md:text-base sm:text-sm">
              <span className="text-[#1D68FF]">{nickname}</span>
              <span className="text-[#121218]"> / {name}</span>
            </div>
            <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
              만 {age}세
            </div>
            <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
              {height}cm / {weight}kg
            </div>
          </div>
          <div className="pt-2 text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm">
            국가건강검진 <span className="text-[#DBE6FF]">| </span>{checkupCount}회
          </div>
        </div>
      </div>
      
      {onEditInfo && (
        <div className="block">
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