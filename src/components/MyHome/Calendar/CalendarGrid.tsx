import React from 'react';
import CalendarDay from './CalendarDay';
import type { CalendarDay as CalendarDayType } from './calendarUtils';

interface CalendarGridProps {
  calendarData: CalendarDayType[][];
  selectedDate?: number;
  defaultSelectedDate?: number; // 기본 선택된 날짜 (오늘)
  onDateSelect?: (date: number) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ 
  calendarData, 
  selectedDate, 
  defaultSelectedDate,
  onDateSelect 
}) => {
  return (
    <div>
      {calendarData.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7 border-b border-[#DBE6FF] last:border-b-0">
          {week.map((day, dayIndex) => (
            <CalendarDay
              key={dayIndex}
              date={day.date}
              isCurrentMonth={day.isCurrentMonth}
              isToday={day.isToday}
              hasEvent={day.hasEvent}
              isSelected={selectedDate === day.date && day.isCurrentMonth}
              isDefaultSelected={defaultSelectedDate === day.date && day.isCurrentMonth}
              onDateSelect={onDateSelect}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid; 