import React from 'react';

const ExpertCardSkeleton: React.FC = () => {
  return (
    <div 
      className="w-full max-w-[25rem] h-[31.25rem] bg-[rgba(255,255,255,0.8)] rounded-[15px] border border-[#DBE6FF] border-[0.5px] flex flex-col items-center justify-center gap-4 px-6 py-10 pl-[31px] animate-pulse"
      style={{ boxShadow: 'none' }}
    >
      <div className="flex flex-col items-center gap-4 w-full">
        {/* 역할 스켈레톤 */}
        <div className="h-[18px] bg-gray-200 rounded w-24"></div>
        
        {/* 슬로건 스켈레톤 */}
        <div className="h-[20px] bg-gray-200 rounded w-full max-w-[200px]"></div>
        
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-[171px] h-[171px] bg-gray-200 rounded-full border-[4.5px] border-[#1D68FF] flex items-center justify-center">
          <div className="w-[92px] h-[92px] bg-gray-300 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex flex-col items-start gap-1 pt-2 w-full">
        {/* 닉네임/실명 스켈레톤 */}
        <div className="w-full flex items-center">
          <div className="h-[20px] bg-gray-200 rounded w-16 mr-2"></div>
          <div className="h-[20px] bg-gray-200 rounded w-2 mx-2"></div>
          <div className="h-[20px] bg-gray-200 rounded w-20 ml-2"></div>
        </div>
        
        {/* 설명 스켈레톤 */}
        <div className="h-[18px] bg-gray-200 rounded w-full"></div>
        
        {/* 소속 스켈레톤 */}
        <div className="pt-1 h-[14px] bg-gray-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default ExpertCardSkeleton;
