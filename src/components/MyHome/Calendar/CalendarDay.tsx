import React from 'react';
import CalendarEvent from './CalendarEvent';

interface CalendarDayProps {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent?: string | string[];
  isSelected?: boolean;
  isDefaultSelected?: boolean; // 기본 선택된 날짜 (오늘)
  onDateSelect?: (date: number) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  isCurrentMonth, 
  isToday, 
  hasEvent,
  isSelected = false,
  isDefaultSelected = false,
  onDateSelect
}) => {
  const handleClick = () => {
    if (onDateSelect && isCurrentMonth) {
      onDateSelect(date);
    }
  };

  // 선택 상태에 따른 스타일 결정
  const getSelectionStyle = () => {
    if (isSelected) {
      return 'bg-[rgba(29,104,255,0.1)] outline outline-2 outline-[#1D68FF]';
    } else if (isDefaultSelected) {
      return 'bg-[rgba(219,230,255,0.5)] outline outline-2 outline-[#1D68FF]';
    }
    return '';
  };

  return (
    <div 
      className={`
        relative h-[130px] border-r border-[#DBE6FF] last:border-r-0
        flex flex-col items-start justify-start px-2
        ${getSelectionStyle()}
        hover:bg-gray-50 transition-colors cursor-pointer
        box-border
      `}
      onClick={handleClick}
    >
              <span 
          className={`
            text-[16px] font-light leading-[1.19] tracking-[-0.48px]
            ${isSelected || isDefaultSelected ? 'text-[#1D68FF] font-bold' : 
              isCurrentMonth ? 'text-[#121218]' : 'text-[#75787B]'}
          `}
        >
          {date}
        </span>

      {hasEvent && isCurrentMonth && (
        <div className="mt-1 w-full space-y-1">
          {Array.isArray(hasEvent) ? (
            hasEvent.slice(0, 3).map((event, index) => (
              <CalendarEvent key={index} eventText={event} />
            ))
          ) : (
            <CalendarEvent eventText={hasEvent} />
          )}
          {Array.isArray(hasEvent) && hasEvent.length > 3 && (
            <div className="text-xs text-gray-500 px-1">
              +{hasEvent.length - 3}개 더
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarDay; 