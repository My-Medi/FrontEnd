import React from 'react';
import ExpertScheduleCard from './ExpertScheduleCard';
import ActionButton from '../Common/ActionButton';
import { useExpertUpcomingSchedules } from '../../../hooks/experts/queries/useExpertSchedules';
import { getColorIndicesForDate } from '../Calendar/calendarUtils';
import { useExpertMonthlySchedules } from '../../../hooks/experts/queries/useExpertSchedules';
import ExpertScheduleCardSkeleton from './ExpertScheduleCardSkeleton';

interface Props {
  onGoPatientManagement?: () => void;
}

const ExpertSchedule: React.FC<Props> = ({ onGoPatientManagement }) => {
  const { data, isFetching } = useExpertUpcomingSchedules(true);
  const nearestSchedule = data?.result?.[0] ?? null;

  // 월별 요약은 HomeCalendar와 동일 포맷을 재사용(전문가용도 동일 포맷)
  const baseDate = React.useMemo(() => nearestSchedule ? new Date(nearestSchedule.meetingDate) : new Date(), [nearestSchedule]);
  const { data: monthly } = useExpertMonthlySchedules(baseDate.getFullYear(), baseDate.getMonth() + 1, true);
  const targetISO = React.useMemo(() => nearestSchedule ? nearestSchedule.meetingDate : '', [nearestSchedule]);
  const colorIndices = React.useMemo(() => (
    nearestSchedule ? getColorIndicesForDate(baseDate, monthly, targetISO) : []
  ), [baseDate, monthly, targetISO, nearestSchedule]);

  return (
    <div className='pt-[25px] pl-[41px] lg:pt-[25px] lg:pl-[41px] md:pt-6 md:pl-6 sm:pt-4 sm:pl-4'>
      {/* 제목 */}
      <div className="text-[#121212] text-[18px] font-semibold leading-[1.5] tracking-[-0.54px] mb-[16px] lg:text-[18px] md:text-base sm:text-sm">
        다가온 일정을 확인하세요!
      </div>
      
      {/* 전문가 일정 */}
      {isFetching ? (
        <div className="mb-[16px] lg:mb-[16px] md:mb-4 sm:mb-3">
          <ExpertScheduleCardSkeleton />
        </div>
      ) : nearestSchedule ? (
        <div className="mb-[16px] lg:mb-[16px] md:mb-4 sm:mb-3">
          <ExpertScheduleCard 
            type={'consultation'}
            date={{
              year: new Date(nearestSchedule.meetingDate).getFullYear(),
              month: new Date(nearestSchedule.meetingDate).getMonth() + 1,
              day: new Date(nearestSchedule.meetingDate).getDate(),
            }}
            title={nearestSchedule.title}
            description={nearestSchedule.memo}
            source={{ text: nearestSchedule.location }}
            time={{ text: `${nearestSchedule.am ? '오전' : '오후'} ${nearestSchedule.hour}:${String(nearestSchedule.minute).padStart(2,'0')}` }}
            // 달력 이벤트와 동일 인덱스 색상 적용을 위해 index 0 사용
            colorIndex={(colorIndices[0] ?? 0)}
          />
        </div>
      ) : (
        <div className="mb-[16px] text-center py-8 text-gray-500 lg:mb-[16px] md:mb-4 sm:mb-3">
          <div className="text-lg font-medium mb-2 lg:text-lg md:text-base sm:text-sm">다가오는 일정이 없습니다</div>
          <div className="lg:text-base md:text-sm sm:text-xs">새로운 일정을 등록해보세요</div>
        </div>
      )}
      
      {/* 예약 환자의 건강 섹션 */}
      <div className="flex justify-between items-center mb-1 lg:mb-1 md:mb-2 sm:mb-2">
        <div className="text-[#121212] text-[14px] font-medium leading-[24px] tracking-[-0.42px] lg:text-[14px] md:text-sm sm:text-xs">
          예약 환자의 건강
        </div>
      </div>
      <div className="bg-white border border-[#DBE6FF] rounded-[12px] p-[7px] w-[876px] lg:w-[876px] md:w-full sm:w-full">
        <div className="text-[#9DA0A3] text-[14.4px] font-medium leading-[100%] tracking-[-0.432px] text-center py-[28px] lg:text-[14.4px] md:text-sm sm:text-xs lg:py-[28px] md:py-6 sm:py-4">
          아직 연결된 환자가 없습니다
        </div>
      </div>
      <div className="flex justify-end -mt-5 lg:-mt-5 md:-mt-4 sm:-mt-3 lg:flex md:hidden sm:hidden">
        <ActionButton 
          text="환자 관리보기" 
          onClick={() => (onGoPatientManagement ? onGoPatientManagement() : undefined)}
        />
      </div>
    </div>
  );
};

export default ExpertSchedule; 