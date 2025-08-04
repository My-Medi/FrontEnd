import React from 'react';
import Calendar from '../Calendar';
import ScheduleCard from './ScheduleCard';
import { getSchedulesForDate, getTodaySchedules } from '../../../data/scheduleData';

interface HomeCalendarProps {
  selectedDate?: number;
  today: Date;
  onDateSelect: (date: number) => void;
}

const HomeCalendar: React.FC<HomeCalendarProps> = ({
  selectedDate,
  today,
  onDateSelect,
}) => {
  // 선택된 날짜의 스케줄 데이터 가져오기
  const currentSchedules = React.useMemo(() => {
    if (selectedDate) {
      // 선택된 날짜가 있는 경우 해당 날짜의 스케줄
      const selectedDateObj = new Date(today.getFullYear(), today.getMonth(), selectedDate);
      return getSchedulesForDate(selectedDateObj);
    } else {
      // 선택된 날짜가 없으면 오늘 날짜의 스케줄 (기본값)
      return getTodaySchedules();
    }
  }, [selectedDate, today]);

  // 선택된 날짜가 오늘인지 확인
  const isSelectedDateToday = selectedDate === today.getDate();

  return (
    <>
      <Calendar 
        selectedDate={selectedDate}
        defaultSelectedDate={selectedDate ? undefined : today.getDate()}
        onDateSelect={onDateSelect}
      />
      <div className='flex flex-col gap-[22px] mt-8'>
        {currentSchedules.length > 0 ? (
          currentSchedules.map((schedule, index) => (
            <div key={index} className={index === currentSchedules.length - 1 ? 'mb-[50px]' : ''}>
              <ScheduleCard {...schedule} />
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