import React, { useState, useMemo, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import WeekdayHeader from './WeekdayHeader';
import CalendarGrid from './CalendarGrid';
import { generateCalendarData } from './calendarUtils';
import type { UserScheduleSummaryResponse } from '../../../types/schedule';

interface CalendarProps {
  selectedDate?: number;
  defaultSelectedDate?: number; // 기본 선택된 날짜 (오늘)
  onDateSelect?: (date: number) => void;
  monthlyApi?: UserScheduleSummaryResponse; // 월간 스케줄 요약 (선택)
  onMonthChange?: (year: number, month: number) => void; // 월 변경 시 호출되는 콜백
}

const Calendar: React.FC<CalendarProps> = ({ 
  selectedDate, 
  defaultSelectedDate, 
  onDateSelect, 
  monthlyApi,
  onMonthChange 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = useMemo(() => {
    const now = new Date();
    const koreaTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Seoul"}));
    return koreaTime;
  }, []);
  
  // 현재 월이 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    if (onMonthChange) {
      onMonthChange(currentDate.getFullYear(), currentDate.getMonth() + 1);
    }
  }, [currentDate, onMonthChange]);
  
  const calendarData = useMemo(() => {
    return generateCalendarData(currentDate, today, monthlyApi);
  }, [currentDate, today, monthlyApi]);

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="w-full pt-[44px] px-[39px]">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={goToPrevMonth}
        onNextMonth={goToNextMonth}
      />
      <WeekdayHeader />
      <CalendarGrid 
        calendarData={calendarData} 
        selectedDate={selectedDate}
        defaultSelectedDate={defaultSelectedDate}
        onDateSelect={onDateSelect}
      />
    </div>
  );
};

export default Calendar; 