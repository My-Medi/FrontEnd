import React from 'react';

interface RequestHealthHeaderProps {
  expertNickname: string;
  expertName: string;
}

const RequestHealthHeader: React.FC<RequestHealthHeaderProps> = ({
  expertNickname,
  expertName,
}) => {
  return (
    <>
      {/* 데스크탑 UI */}
      <div className='hidden lg:flex flex-col justify-center items-center gap-[14.4px] font-[Pretendard] w-[245px] h-[74.4px]'>
        <div className='text-center font-semibold text-[24px] leading-[36px] tracking-[-0.72px] text-[#121218]'>
          받은 건강관리요청서
        </div>
        <div className='text-[14px] font-medium leading-[24px] tracking-[-0.42px]'>
          <span className='text-[#1D68FF]'>{expertNickname}</span>
          <span className='text-[#121218]'> / {expertName}</span>
        </div>
      </div>

      {/* 모바일 UI */}
      <div className='lg:hidden flex flex-col justify-center items-center gap-[10px] font-[Pretendard] w-full py-[12px]'>
        <div className='text-center font-semibold text-[18px] leading-[28px] tracking-[-0.5px] text-[#121218]'>
          받은 건강관리요청서
        </div>
        <div className='text-[13px] font-medium leading-[20px] tracking-[-0.3px]'>
          <span className='text-[#1D68FF]'>{expertNickname}</span>
          <span className='text-[#121218]'> / {expertName}</span>
        </div>
      </div>
    </>
  );
};

export default RequestHealthHeader;
