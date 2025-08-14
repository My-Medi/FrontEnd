import React from 'react';
import ActionButton from '../Common/ActionButton';
import { healthStatusMap, type HealthStatus } from '../../../constants/healthStatus';
import { useUserProfileQuery } from '../../../hooks/users/queries/useUserProfileQuery';
import { useCurrentHealthStatusQuery } from '../../../hooks/users/queries/useCurrentHealthStatusQuery';
import { mapApiResultToHealthStatus } from '../../../utils/mappers/healthStatusMapper';

const MyConstantMedical: React.FC = () => {
  // API에서 사용자 프로필 데이터 가져오기
  const { data: profileData } = useUserProfileQuery();
  // API에서 현재 건강 상태 데이터 가져오기
  const { data: healthStatusData, isLoading, error } = useCurrentHealthStatusQuery();

  const nickname = profileData?.nickname || '사용자';

  // API 응답이 없거나 로딩 중인 경우 기본값 사용
  const status: HealthStatus = healthStatusData?.result
    ? mapApiResultToHealthStatus(healthStatusData.result)
    : '정상'; // 기본값

  // status가 유효한지 확인하고, 유효하지 않으면 기본값 사용
  const current = healthStatusMap[status];

  // current가 undefined인 경우를 대비한 안전 처리
  if (!current) {
    console.warn(`Invalid health status: ${status}, falling back to '정상'`);
    return (
      <div className='w-full pt-6 pl-10 xl:pt-6 xl:pl-10 md:pt-6 md:pl-6 sm:pt-4 sm:pl-4'>
        <div className='text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm'>
          내 건강은 지금!
        </div>
        <div className='mt-4 xl:mt-4 md:mt-3 sm:mt-2'>
          <div className='w-full max-w-[48.75rem] h-[4.75rem] bg-yellow-50 border border-yellow-200 flex items-center justify-center'>
            <span className='text-yellow-600'>건강 상태 정보를 불러오는 중입니다.</span>
          </div>
        </div>
      </div>
    );
  }

  // 로딩 중이거나 에러가 있는 경우 처리
  if (isLoading) {
    return (
      <div className='w-full pt-6 pl-10 xl:pt-6 xl:pl-10 md:pt-6 md:pl-6 sm:pt-4 sm:pl-4'>
        <div className='text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm'>
          내 건강은 지금!
        </div>
        <div className='mt-4 xl:mt-4 md:mt-3 sm:mt-2'>
          <div className='w-full max-w-[48.75rem] h-[4.75rem] bg-gray-100 animate-pulse rounded'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full pt-6 pl-10 xl:pt-6 xl:pl-10 md:pt-6 md:pl-6 sm:pt-4 sm:pl-4'>
        <div className='text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm'>
          내 건강은 지금!
        </div>
        <div className='mt-4 xl:mt-4 md:mt-3 sm:mt-2'>
          <div className='w-full max-w-[48.75rem] h-[4.75rem] bg-red-50 border border-red-200 flex items-center justify-center'>
            <span className='text-red-600'>건강 상태를 불러오는데 실패했습니다.</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full pt-6 pl-10 xl:pt-6 xl:pl-10 md:pt-6 md:pl-6 sm:pt-4 sm:pl-4'>
      {/* 제목 */}
      <div className='text-[#121212] text-lg font-semibold leading-[1.5] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm'>
        내 건강은 지금!
      </div>

      {/* 건강상태 카드와 버튼 컨테이너 */}
      <div className='mt-4 xl:mt-4 md:mt-3 sm:mt-2'>
        {/* 건강상태 카드 */}
        <div
          className='w-full max-w-[48.75rem] h-auto min-h-[4.75rem] flex items-center gap-6 px-8 py-2.5 xl:max-w-[48.75rem] xl:h-[4.75rem] xl:gap-6 xl:px-8 xl:py-2.5 md:gap-4 md:px-6 md:py-4 sm:gap-3 sm:px-4 sm:py-3'
          style={{
            backgroundColor: current.bgColor,
            borderTop: `1px solid ${current.borderColor}`,
            borderBottom: `1px solid ${current.borderColor}`,
          }}
        >
          {/* 아이콘 영역 */}
          <img
            src={current.iconPath}
            alt={`${status} 아이콘`}
            className='w-12 h-10 xl:w-[3.6rem] xl:h-[3.1rem] md:w-12 md:h-10 sm:w-10 sm:h-8 flex-shrink-0'
          />

          {/* 설명 텍스트 */}
          <div
            className='text-lg font-medium leading-[2] tracking-[-0.54px] xl:text-lg md:text-base sm:text-sm flex-1'
            style={{ color: current.textColor }}
          >
            {current.message(nickname)}
          </div>
        </div>

        {/* 링크 버튼 */}
        <div className='-mt-5 xl:-mt-5 md:-mt-4 sm:-mt-3 block lg:block md:hidden sm:hidden'>
          <ActionButton text='마이 메디컬 리포트로 알아보기' onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default MyConstantMedical;
