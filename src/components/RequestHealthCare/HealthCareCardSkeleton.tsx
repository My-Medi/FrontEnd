import React from 'react';

const HealthCareCardSkeleton: React.FC = () => {
  return (
    <>
      {/* 데스크탑 전용 스켈레톤 UI */}
      <div className='hidden lg:block'>
        {/* 날짜 텍스트 스켈레톤 */}
        <div className='ml-[34px] mb-2'>
          <div className='w-20 h-6 bg-gray-200 rounded animate-pulse' />
        </div>

        {/* 요청 카드 박스 스켈레톤 */}
        <div className='w-[771px] bg-white rounded-[12px] px-[30px] py-[24px] flex flex-col justify-center items-center gap-[16px] mx-auto mb-10 border border-[#DBE6FF]'>
          <div className='flex w-[621px] max-h-[491px] flex-col items-center gap-8px'>
            {/* 제목 스켈레톤 */}
            <div className='w-full'>
              <div className='h-[36px] bg-gray-200 rounded animate-pulse mb-2' />
            </div>

            {/* 기본 정보 스켈레톤 */}
            <div className='w-full flex flex-col items-start mt-[8px]'>
              <div className='mb-[4px] w-16 h-[22px] bg-gray-200 rounded animate-pulse' />
              <div className='flex items-start gap-[9.6px] h-[22px]'>
                <div className='w-8 h-[14px] bg-gray-200 rounded animate-pulse' />
                <div className='w-2 h-[14px] bg-gray-200 rounded animate-pulse' />
                <div className='w-12 h-[14px] bg-gray-200 rounded animate-pulse' />
                <div className='w-2 h-[14px] bg-gray-200 rounded animate-pulse' />
                <div className='w-20 h-[14px] bg-gray-200 rounded animate-pulse' />
              </div>
            </div>

            {/* 요청 사항 스켈레톤 */}
            <div className='w-full flex flex-col items-start gap-4px mt-[8px]'>
              <div className='mb-[4px] w-16 h-[22px] bg-gray-200 rounded animate-pulse' />
              <div className='max-w-[618px] max-h-[214px] w-full'>
                <div className='space-y-2'>
                  <div className='w-full h-[22px] bg-gray-200 rounded animate-pulse' />
                  <div className='w-3/4 h-[22px] bg-gray-200 rounded animate-pulse' />
                  <div className='w-1/2 h-[22px] bg-gray-200 rounded animate-pulse' />
                  <div className='w-5/6 h-[22px] bg-gray-200 rounded animate-pulse' />
                </div>
              </div>
            </div>

            {/* 건강데이터 보기 버튼 스켈레톤 */}
            <div className='w-full mt-[8px] flex justify-center items-center'>
              <div className='w-32 h-[22px] bg-gray-200 rounded animate-pulse' />
            </div>
          </div>

          {/* 하단 버튼 영역 스켈레톤 */}
          <div className='w-[615px] flex flex-col items-center border-t-[1.2px] border-[#DBE6FF] pt-8'>
            <div className='flex gap-[105.6px]'>
              <div className='w-[180px] h-[42px] bg-gray-200 rounded-full animate-pulse' />
              <div className='w-[180px] h-[42px] bg-gray-200 rounded-full animate-pulse' />
            </div>
          </div>
        </div>
      </div>

      {/* 모바일 전용 스켈레톤 UI */}
      <div className='lg:hidden px-4 mb-10'>
        {/* 날짜 스켈레톤 */}
        <div className='mb-2'>
          <div className='w-20 h-6 bg-gray-200 rounded animate-pulse' />
        </div>
        
        {/* 카드 스켈레톤 */}
        <div className='w-full bg-white rounded-xl px-4 py-5 flex flex-col gap-4 border border-[#DBE6FF]'>
          {/* 제목 스켈레톤 */}
          <div className='h-6 bg-gray-200 rounded animate-pulse' />
          
          {/* 기본 정보 스켈레톤 */}
          <div>
            <div className='w-16 h-4 bg-gray-200 rounded animate-pulse mb-1' />
            <div className='flex gap-2'>
              <div className='w-8 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-2 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-12 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-2 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-20 h-4 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
          
          {/* 요청사항 스켈레톤 */}
          <div>
            <div className='w-16 h-4 bg-gray-200 rounded animate-pulse mb-1' />
            <div className='space-y-2'>
              <div className='w-full h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-3/4 h-4 bg-gray-200 rounded animate-pulse' />
              <div className='w-1/2 h-4 bg-gray-200 rounded animate-pulse' />
            </div>
          </div>
          
          {/* 건강데이터 보기 버튼 스켈레톤 */}
          <div className='flex items-center justify-center'>
            <div className='w-24 h-4 bg-gray-200 rounded animate-pulse' />
          </div>
          
          {/* 하단 버튼 스켈레톤 */}
          <div className='flex justify-between pt-4 border-t border-[#DBE6FF]'>
            <div className='w-[45%] h-[38px] bg-gray-200 rounded-full animate-pulse' />
            <div className='w-[45%] h-[38px] bg-gray-200 rounded-full animate-pulse' />
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthCareCardSkeleton;
