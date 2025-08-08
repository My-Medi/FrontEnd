import React from 'react';
import { useUserMonthlySchedules, useUserSchedulesByDate } from '../../../hooks/users/queries/useUserSchedules';
import { useExpertMonthlySchedules, useExpertSchedulesByDate } from '../../../hooks/experts/queries/useExpertSchedules';
import Calendar from '../Calendar';
import { getColorIndicesForDate } from '../Calendar/calendarUtils';
import ScheduleCard from './ScheduleCard';
import ScheduleCardSkeleton from './ScheduleCardSkeleton';
 

interface HomeCalendarProps {
  selectedDate?: number;
  today: Date;
  onDateSelect: (date: number) => void;
  userType?: 'patient' | 'expert';
}

const HomeCalendar: React.FC<HomeCalendarProps> = ({
  selectedDate,
  today,
  onDateSelect,
  userType = 'patient',
}) => {
  // 월별 스케줄 요약 API
  const { data: monthlyUser,    isFetching: fetchingUserMonthly }    = useUserMonthlySchedules(today.getFullYear(), today.getMonth() + 1, userType !== 'expert');
  const { data: monthlyExpert,  isFetching: fetchingExpertMonthly }  = useExpertMonthlySchedules(today.getFullYear(), today.getMonth() + 1, userType === 'expert');
  const monthlyData = userType === 'expert' ? monthlyExpert : monthlyUser;
  // 특정 날짜 상세 API (선택된 날짜 기준)
  const selectedDateISO = React.useMemo(() => {
    const d = selectedDate ? new Date(today.getFullYear(), today.getMonth(), selectedDate) : today;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }, [selectedDate, today]);
  const { data: byDateUser } = useUserSchedulesByDate(selectedDateISO, userType !== 'expert');
  const { data: byDateExpert } = useExpertSchedulesByDate(selectedDateISO, userType === 'expert');
  const byDateData = userType === 'expert' ? byDateExpert : byDateUser;
  const schedules = byDateData?.result ?? [];

  // 달력과 동일한 전역 순번 규칙을 따라, 선택된 날짜의 색상 인덱스 배열 계산
  const colorIndicesForSelectedDate = React.useMemo(() => (
    getColorIndicesForDate(today, monthlyData, selectedDateISO)
  ), [today, monthlyData, selectedDateISO]);

  // 선택된 날짜가 오늘인지 확인
  const isSelectedDateToday = selectedDate === today.getDate();

  return (
    <>
      <Calendar 
        selectedDate={selectedDate}
        defaultSelectedDate={selectedDate ? undefined : today.getDate()}
        onDateSelect={onDateSelect}
        monthlyApi={monthlyData}
      />
      <div className='flex flex-col gap-[22px] mt-8 px-4 sm:px-6 xl:px-[39px]'>
        {((userType === 'expert' && fetchingExpertMonthly) || (userType !== 'expert' && fetchingUserMonthly)) ? (
          // 로딩 시 스켈레톤 3개 노출
          <>
            <ScheduleCardSkeleton />
            <ScheduleCardSkeleton />
            <ScheduleCardSkeleton />
          </>
        ) : schedules.length > 0 ? (
          schedules.map((schedule, index) => (
            <div key={index} className={index === schedules.length - 1 ? 'mb-[50px]' : ''}>
              <ScheduleCard 
                date={{
                  year: new Date(schedule.meetingDate).getFullYear(),
                  month: new Date(schedule.meetingDate).getMonth() + 1,
                  day: new Date(schedule.meetingDate).getDate(),
                }}
                title={schedule.title}
                description={schedule.memo}
                source={{ text: schedule.location }}
                time={{ text: `${schedule.am ? '오전' : '오후'} ${schedule.hour}:${String(schedule.minute).padStart(2,'0')}` }}
                type={'etc' as any}
                colorIndex={colorIndicesForSelectedDate[index] ?? index}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            {selectedDate ? (
              <div>
                <div className="text-lg font-medium mb-2">
                  {isSelectedDateToday ? '오늘' : `${selectedDate}일`}
                </div>
                <div>예정된 스케줄이 없습니다.</div>
              </div>
            ) : (
              <div>
                <div className="text-lg font-medium mb-2">오늘</div>
                <div>예정된 스케줄이 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default HomeCalendar; 