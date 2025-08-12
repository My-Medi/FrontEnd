import React, { useState } from 'react';
import FilterIcon from '/src/assets/MyMedicalReport/filter.svg';
import HealthConstantIcon from '/src/assets/health-constants/total-constant.svg';

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
  const shouldDisplayRoundSection = () => {
    // 배열이 존재하고, 길이가 0보다 크며, 실제 유효한 회차 데이터가 있을 때만 표시
    return Array.isArray(rounds) && rounds.length > 0 && rounds.some((round) => round > 0);
  };
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    onFilterClick();
  };

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
          {shouldDisplayRoundSection() && (
            <div className='flex mt-[10px] items-center gap-2 relative'>
              <button
                onClick={onAddRound}
                className='flex h-10 px-[30px] justify-center items-center gap-[10px] text-[#25282B] bg-white text-[16px] font-medium leading-[36px] tracking-[-0.48px] border border-[#D9D9D9] rounded-full'
              >
                + NEW
              </button>

              {[...rounds.slice(-2)].reverse().map((round) => (
                <button
                  key={round}
                  onClick={() => onRoundChange(round)}
                  className={`flex h-10 px-[30px] justify-center items-center gap-[10px] rounded-full border text-[16px] font-semibold leading-[22px] tracking-[-0.48px] ${
                    selectedRound === round
                      ? 'bg-[#82ABFD] border-[#82ABFD] text-white'
                      : 'bg-white border-[#D9D9D9] text-[#25282B]'
                  }`}
                >
                  {round}회차
                </button>
              ))}

              <div className='relative'>
                <img
                  src={FilterIcon}
                  width={88}
                  height={40}
                  onClick={toggleFilter}
                  className='cursor-pointer ml-2 mr-[-10px]'
                  alt='필터'
                />
                {isFilterOpen && (
                  <div className='absolute top-[45px] right-0 z-10 bg-white shadow-lg rounded-md py-2 px-4 max-h-[250px] overflow-y-auto border border-gray-200'>
                    {rounds.map((round) => (
                      <div
                        key={round}
                        onClick={() => {
                          onRoundChange(round);
                          setIsFilterOpen(false);
                        }}
                        className='text-[#121218] text-sm py-1 hover:bg-gray-100 cursor-pointer text-center'
                      >
                        {round}회차
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
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
