import React from 'react';

const ActionButtons: React.FC = () => {
  return (
    <div className="flex justify-center items-center gap-[92px] mt-[60px]">
      <button className="w-[300px] h-[60px] border border-[#FFFFFF] rounded-[36px] text-[20px] font-medium text-[#25282B] shadow-lg" style={{
        boxShadow: '0px 0px 4px 4px rgba(29, 104, 255, 0.04), 0px 0px 2px 2px rgba(29, 104, 255, 0.06)'
      }}>
        수정하기
      </button>
      <button className="w-[300px] h-[60px] bg-[#1D68FF] rounded-[36px] text-[20px] font-semibold text-white shadow-lg" style={{
        boxShadow: '0px 0px 3px 3px rgba(29, 104, 255, 0.04), 0px 0px 2px 2px rgba(29, 104, 255, 0.08)'
      }}>
        등록하기
      </button>
    </div>
  );
};

export default ActionButtons; 