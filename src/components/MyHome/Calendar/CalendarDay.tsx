import React from 'react';
import CalendarEvent from './CalendarEvent';

interface CalendarDayProps {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent?: { text: string; colorIndex: number }[];
  isSelected?: boolean;
  isDefaultSelected?: boolean; // 기본 선택된 날짜 (오늘)
  onDateSelect?: (date: number) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({ 
  date, 
  isCurrentMonth, 
  // isToday, 
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
        relative h-[7.75rem] border-r border-[#DBE6FF] last:border-r-0
        flex flex-col items-start justify-start px-2
        ${getSelectionStyle()}
        hover:bg-gray-50 transition-colors cursor-pointer
        box-border
      `}
      onClick={handleClick}
    >
              <div className="flex items-center justify-between w-full pt-2">
        <span 
          className={`
            text-[16px] font-light leading-[100%] tracking-[-3%] text-[#121218]
            ${isSelected || isDefaultSelected ? 'text-[#1D68FF] font-bold' : 
              isCurrentMonth ? 'text-[#121218]' : 'text-[#75787B]'}
          `}
        >
          {date}
        </span>
        {Array.isArray(hasEvent) && hasEvent.length > 3 && (
          <span className="text-xs text-gray-500">
            +{hasEvent.length - 3}
          </span>
        )}
      </div>

      {hasEvent && isCurrentMonth && (
        <div className="mt-1 w-full space-y-1">
          {hasEvent.slice(0, 3).map((ev, index) => (
            <CalendarEvent key={index} eventText={ev.text} colorIndex={ev.colorIndex} />
          ))}

        </div>
      )}
    </div>
  );
};

export default CalendarDay; 