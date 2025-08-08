import React from 'react';

const ScheduleCardSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 lg:gap-[30px] p-4 sm:p-6 lg:px-[39px] lg:py-[10px] border border-[#DBE6FF] rounded-[20px] w-full max-w-[1101px] mx-auto xl:mx-0 bg-white">
      {/* Month/Day skeleton */}
      <div className="flex-shrink-0 text-center w-full sm:w-[67px] h-auto sm:h-[72px] flex sm:block justify-center">
        <div className="h-[36px] w-[58px] sm:w-[58px] rounded-md bg-[#EEF3FF]" />
        <div className="mt-2 h-[36px] w-[58px] sm:w-[58px] rounded-md bg-[#EEF3FF]" />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col flex-grow w-full sm:w-auto">
        <div className="h-[27px] w-1/3 sm:w-1/4 rounded-md bg-[#EEF3FF]" />
        <div className="mt-2 h-[36px] w-2/3 sm:w-1/2 rounded-md bg-[#F3F6FF]" />

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 lg:gap-[20px] mt-2 sm:mt-0">
          <div className="flex items-center gap-2 sm:gap-[10px]">
            <div className="w-[16px] h-[20px] rounded bg-[#EEF3FF]" />
            <div className="h-[20px] sm:h-[24px] lg:h-[36px] w-[120px] rounded bg-[#EEF3FF]" />
          </div>
          <div className="flex items-center gap-2 sm:gap-[10px]">
            <div className="w-[20px] h-[20px] rounded bg-[#EEF3FF]" />
            <div className="h-[20px] sm:h-[24px] lg:h-[36px] w-[90px] rounded bg-[#EEF3FF]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCardSkeleton;


