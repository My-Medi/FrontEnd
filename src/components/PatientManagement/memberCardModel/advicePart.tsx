import React, { useState } from 'react';
import openDataImg from '/src/assets/open-data.svg';
import { patientManagementAdviceList } from '../../../data/patientManagementAdvice';

interface AdviceItemProps {
  message: string;
  registerDate: string;
}

const AdviceItem: React.FC<AdviceItemProps> = ({ message, registerDate }) => {
  return (
    <>
      <div className='flex h-[76px] px-[32px] items-center border-y border-[#82ABFD]'>
        <div className='flex flex-col w-full'>
          <span className='text-[#121218] text-[16px] font-[Pretendard] font-medium leading-[36px] tracking-[-0.48px]'>
            {message}
          </span>
        </div>
      </div>
      <div className='flex flex-col items-end mb-[5px]'>
        <span className='text-[#4D5053] font-[Pretendard] text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
          {registerDate} 등록
        </span>
      </div>
    </>
  );
};

const AdvicePart = () => {
  const [showAll, setShowAll] = useState(false);

  const visibleAdvice = showAll
    ? patientManagementAdviceList
    : patientManagementAdviceList.slice(0, 2);

  return (
    <div className='flex flex-col mt-[-30px] font-[Pretendard]'>
      {/* 타이틀 */}
      <div className='hidden lg:flex w-[817px] h-[86px] flex-col items-start justify-center'>
        <div className='flex items-center'>
          <div className='w-[14.25px] h-[14.25px] bg-[#1D68FF] rounded-[4.5px] mr-[16px]' />
          <span className='text-[#121218] text-[16px] leading-[22.4px] tracking-[-0.48px] font-semibold'>
            등록한 한줄 조언
          </span>
        </div>
      </div>

      {/* 조언 리스트 */}
      <div className='flex flex-col mt-[-16px]'>
        {visibleAdvice.map((item, index) => (
          <AdviceItem key={index} message={item.message} registerDate={item.registerDate} />
        ))}
      </div>

      {/* 토글 버튼 */}
      <button
        onClick={() => setShowAll((prev) => !prev)}
        className='mt-[16px] flex flex-col items-center gap-[10px] px-[10px]'
      >
        <img
          src={openDataImg}
          alt={showAll ? '접기' : '펼치기'}
          className={`w-[81px] h-[13px] transition-transform duration-300 ${
            showAll ? 'rotate-180' : ''
          }`}
        />
      </button>
    </div>
  );
};

export default AdvicePart;
