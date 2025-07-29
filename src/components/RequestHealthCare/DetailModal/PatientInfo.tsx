import React from 'react';
import defaultProfile from '@/assets/MyHome/profile.svg';

interface PatientInfoProps {
  profileImageUrl?: string;
  nickname: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  testDate: string;
  healthInterest: string;
}

const PatientInfo: React.FC<PatientInfoProps> = ({
  profileImageUrl,
  nickname,
  age,
  weight,
  height,
  healthInterest,
  testDate,
  gender,
}) => {
  return (
    <div className='flex items-center w-[824px] h-[154px] px-[56px] gap-[40px] rounded-[20px] border border-[#DBE6FF] bg-white flex-shrink-0'>
      {/* 프로필 이미지 */}
      <div className='w-[124px] h-[124px] flex-shrink-0 rounded-full border-[2px] border-[#1D68FF] overflow-hidden'>
        <img
          src={profileImageUrl || defaultProfile}
          alt='프로필 이미지'
          className='w-full h-full object-cover'
        />
      </div>

      {/* 회원 정보 텍스트 */}
      <div className='text-[14px] font-medium font-[Pretendard] leading-[24px] tracking-[-0.42px] text-[#121218] font-pretendard'>
        <p className='text-[#1D68FF]'>{nickname}</p>
        <p>
          만 {age}세 / {gender}
        </p>
        <p>
          {height}cm / {weight}kg
        </p>
        <p>최근 국가건강검진일 : {testDate}</p>
        <p>건강 관심 분야 : {healthInterest}</p>
      </div>
    </div>
  );
};

export default PatientInfo;
