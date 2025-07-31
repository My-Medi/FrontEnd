import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex flex-col xl:flex-row justify-center items-center gap-6 xl:gap-[5.8rem] mt-15 xl:mt-[3.8rem]">
      <button className="w-full xl:w-[18.8rem] h-15 xl:h-[3.8rem] border border-[#FFFFFF] rounded-[2.25rem] xl:rounded-[2.25rem] text-lg xl:text-xl font-medium text-[#25282B] shadow-lg" style={{
        boxShadow: '0px 0px 4px 4px rgba(29, 104, 255, 0.04), 0px 0px 2px 2px rgba(29, 104, 255, 0.06)'
      }}>
        수정하기
      </button>
      <button className="w-full xl:w-[18.8rem] h-15 xl:h-[3.8rem] bg-[#1D68FF] rounded-[2.25rem] xl:rounded-[2.25rem] text-lg xl:text-xl font-semibold text-white shadow-lg" style={{
        boxShadow: '0px 0px 3px 3px rgba(29, 104, 255, 0.04), 0px 0px 2px 2px rgba(29, 104, 255, 0.08)'
      }}>
        등록하기
      </button>
    </div>
  );
};

export default ActionButtons; 