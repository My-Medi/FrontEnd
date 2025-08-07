import React from 'react';

interface NotificationItemSkeletonProps {
  showCheckbox?: boolean;
}

export const NotificationItemSkeleton: React.FC<NotificationItemSkeletonProps> = ({ 
  showCheckbox = false 
}) => {
  return (
    <div className='flex items-center w-full ml-[-10px] gap-[16px]'>
      {/* 체크박스 스켈레톤 */}
      {showCheckbox && (
        <div className='relative w-[22.5px] h-[22.5px] shrink-0'>
          <div className='w-full h-full rounded-[6px] bg-gray-200 animate-pulse' />
        </div>
      )}

      {/* 알림 상자 스켈레톤 */}
      <div className='flex items-center h-[97px] w-full rounded-[20px] bg-gray-200 animate-pulse shadow-[0px_0px_5px_5px_rgba(29,104,255,0.05)]'>
        <div className='flex items-center h-full w-full px-[32px] py-[10px] gap-[10px] rounded-[50px_20px_20px_20px] border-2 border-gray-200 bg-gray-100'>
          <div className='w-full h-6 bg-gray-300 rounded animate-pulse'></div>
        </div>
      </div>
    </div>
  );
};
