import React, { useMemo } from 'react';
import { getEventColor, getBgColorClass } from '../../../constants/colors';

interface CalendarEventProps {
  eventText: string;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ eventText }) => {
  // 공통 색상 팔레트에서 색상 가져오기
  const eventColor = getEventColor(eventText);

  return (
    <div 
      className={`px-[7px] text-[14px] font-medium leading-[1.71] tracking-[-0.42px] rounded-[5px] text-[#121218] ${getBgColorClass(eventColor)}`}
    >
      {eventText}
    </div>
  );
};

export default CalendarEvent; 