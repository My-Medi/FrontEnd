import React from 'react';
import HealthConstantIcon from '/src/assets/health-constants/total-constant.svg';
import MyMedicalReportRoundSelector from './MyMedicalReportRoundSelector';

interface HeaderProps {
  nickname: string;
  age: number;
  height: number;
  weight: number;
  checkupCount: number;
  rounds: number[];
  selectedRound: number;
  onRoundChange: (round: number) => void;
  onAddRound: () => void;
  onFilterClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  nickname,
  age,
  height,
  weight,
  checkupCount,
  rounds,
  selectedRound,
  onRoundChange,
  onAddRound,
  onFilterClick,
}) => {
  

  return (
    <div className='w-[1301px] mx-auto pt-6'>
      {/* 상단 제목 영역 */}
      <div className='flex items-center justify-center relative mb-6 mt-[45px]'>
        <div className='absolute left-0 top-1/2 -translate-y-1/2 w-[556.5px] h-0 border-t-[2px] border-[#DBE6FF]' />
        <h1 className='text-[#25282B] text-[24px] font-semibold leading-[36px] tracking-[-0.72px] text-center'>
          마이메디컬리포트
        </h1>
        <div className='absolute right-0 top-1/2 -translate-y-1/2 w-[556.5px] h-0 border-t-[2px] border-[#DBE6FF]' />
      </div>

      {/* 유저 정보 & 회차 & 상태 색상 가이드 */}
      <div className='inline-flex mt-[-20px] items-start ml-[30px] gap-[424px] w-full relative'>
        {/* 왼쪽 - 유저 정보 및 회차 */}
        <div>
          {/* 유저 정보 */}
          <div className='inline-flex ml-[10px] items-center gap-[22px] h-[23px] mb-3'>
            <span className='text-[#1D68FF] font-medium text-[18px] leading-[36px] tracking-[-0.54px]'>
              {nickname}
            </span>
            <span className='text-[#121218] font-medium text-[18px] leading-[36px] tracking-[-0.54px]'>
              만 {age}세
            </span>
            <span className='text-[#121218] font-medium text-[18px] leading-[36px] tracking-[-0.54px]'>
              {height}cm / {weight}kg
            </span>
            <span className='text-[#121218] font-[Pretendard] font-medium text-[18px] leading-[36px] tracking-[-0.54px]'>
              국가건강검진
            </span>
            <div className='w-[2px] h-[21.5px] font-[Pretendard] ml-[-12px] bg-[#DBE6FF]' />
            <span className='text-[#121218] font-medium text-[18px] ml-[-12px] leading-[36px] tracking-[-0.54px]'>
              {checkupCount}회
            </span>
          </div>

          {/* 회차 버튼 영역 */}
          <MyMedicalReportRoundSelector
            rounds={rounds}
            selectedRound={selectedRound}
            onRoundChange={onRoundChange}
            onAddRound={onAddRound}
            onFilterClick={onFilterClick}
          />
        </div>

        {/* 오른쪽 - 텍스트 + 색상 이미지 */}
        <div className='flex flex-col gap-2'>
          <p className='text-[#4D5053] text-[16px] font-light leading-[22px] tracking-[-0.48px]'>
            마이메디컬리포트에서는 건강 상태를 5단계의 색으로 표현합니다.
          </p>
          <img
            src={HealthConstantIcon}
            alt='건강상태 색상 레벨'
            className='w-[253px] h-auto mt-[5px] ml-[135px]'
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
