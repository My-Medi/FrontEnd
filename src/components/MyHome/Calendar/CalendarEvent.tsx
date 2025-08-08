import React from 'react';
import { getDeterministicColor, getBgColorClass, getCycledColor } from '../../../constants/colors';

interface CalendarEventProps {
  eventText: string;
  colorKey?: string; // 색상 계산을 위한 키 (표시 텍스트와 분리)
  colorIndex?: number; // 순환 색상용 인덱스 (우선순위 높음)
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ eventText, colorKey, colorIndex }) => {
  // colorIndex가 제공되면 순환 팔레트 사용, 아니면 결정적 매핑
  const eventColor =
    typeof colorIndex === 'number' ? getCycledColor(colorIndex) : getDeterministicColor(colorKey ?? eventText);

  return (
    <div 
      className={`px-[7px] text-[14px] font-medium leading-[1.71] tracking-[-0.42px] rounded-[5px] text-[#121218] ${getBgColorClass(eventColor)}`}
    >
      {eventText}
    </div>
  );
};

export default CalendarEvent; 