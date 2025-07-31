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
}) => {
  return (
          <div className="w-full pt-[50px] pl-[39px]">
        <div className="text-[#121212] text-[22px] font-[500] leading-[1.19] tracking-[-0.66px]">
          안녕하세요! <span className="text-[#1D68FF]">{nickname}</span>님! 오늘도 마이메디와 함께 행복한 하루 보내세요.
        </div>
        
        <div className="pt-6 flex items-start gap-[24px]">
          <div className="w-32 h-32 bg-[#EDF0F3] rounded-full flex items-center justify-center">
            <img
              src={profileImageUrl || defaultProfileImage}
              alt="프로필 이미지"
              className="w-[82px] h-[83px] object-contain"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-[24px] pt-6">
              <div className="text-lg leading-[36px] tracking-[-0.54px] font-normal">
                <span className="text-[#1D68FF]">{nickname}</span>
                <span className="text-[#121218]"> / {name}</span>
              </div>
              <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px]">
                만 {age}세
              </div>
              <div className="text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px]">
                {height}cm / {weight}kg
              </div>
            </div>
            <div className="pt-2 text-[#121218] font-normal text-lg leading-[36px] tracking-[-0.54px]">
              국가건강검진 <span className="text-[#DBE6FF]">| </span>{checkupCount}회
            </div>
          </div>
        </div>
        
        {onEditInfo && (
          <ActionButton 
            text="회원정보 수정하기" 
            onClick={onEditInfo} 
          />
        )}
      </div>
  );
};

export default PatientInfoSection; 