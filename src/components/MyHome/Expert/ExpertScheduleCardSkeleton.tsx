import React from 'react';

const ExpertScheduleCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex items-center gap-[30px] p-[10px_40px] bg-white border border-[#DBE6FF] rounded-[20px] w-[876px] lg:w-[876px] md:w-full sm:w-full">
      {/* Month/Day skeleton */}
      <div className="flex-shrink-0 text-center w-[67px] h-[72px]">
        <div className="h-[32px] w-[58px] rounded bg-[#EEF3FF] mx-auto" />
        <div className="mt-2 h-[32px] w-[58px] rounded bg-[#EEF3FF] mx-auto" />
      </div>
      {/* Content skeleton */}
      <div className="flex flex-col flex-grow">
        <div className="h-[26px] w-1/3 rounded bg-[#EEF3FF]" />
        <div className="mt-2 h-[30px] w-1/2 rounded bg-[#F3F6FF]" />
        <div className="flex items-center gap-[20px] mt-2">
          <div className="flex items-center gap-[10px]">
            <div className="w-[16px] h-[20px] rounded bg-[#EEF3FF]" />
            <div className="h-[20px] w-[120px] rounded bg-[#EEF3FF]" />
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[20px] h-[20px] rounded bg-[#EEF3FF]" />
            <div className="h-[20px] w-[90px] rounded bg-[#EEF3FF]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertScheduleCardSkeleton;


